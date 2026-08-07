'use client';

import { useCallback, useEffect, useState } from 'react';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import { NOTIFICATION_PREFS } from '@/app/(app)/notifications/_components/notificationsData';

type PrefRow = (typeof NOTIFICATION_PREFS)[number] & { enabled: boolean };

export function useNotificationChannelPrefs() {
  const [prefs, setPrefs] = useState<PrefRow[]>(() =>
    NOTIFICATION_PREFS.map((p) => ({ ...p, enabled: p.enabled })),
  );

  const load = useCallback(async () => {
    if (isStaticMode()) return;
    try {
      const data = (await providerApi.getNotificationPreferences()) as {
        emailEnabled?: boolean;
        pushEnabled?: boolean;
        categories?: Record<string, boolean>;
      };
      setPrefs((current) =>
        current.map((pref) => {
          if (pref.id === 'email') return { ...pref, enabled: data.emailEnabled ?? pref.enabled };
          if (pref.id === 'push') return { ...pref, enabled: data.pushEnabled ?? pref.enabled };
          if (pref.id === 'in-app') {
            return {
              ...pref,
              enabled: data.categories?.inApp ?? data.categories?.['in-app'] ?? pref.enabled,
            };
          }
          return pref;
        }),
      );
    } catch {
      /* keep defaults */
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const togglePref = useCallback(async (id: string) => {
    setPrefs((current) => {
      const next = current.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
      );
      const email = next.find((p) => p.id === 'email')?.enabled ?? true;
      const push = next.find((p) => p.id === 'push')?.enabled ?? true;
      const inApp = next.find((p) => p.id === 'in-app')?.enabled ?? true;
      if (!isStaticMode()) {
        void providerApi.updateNotificationPreferences({
          emailEnabled: email,
          pushEnabled: push,
          categories: { inApp },
        });
      }
      return next;
    });
  }, []);

  return { prefs, togglePref, refetch: load };
}
