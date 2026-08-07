'use client';

import { useEffect } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { getRawStoredToken } from '@/lib/apiError';
import { isOfflineProviderSession } from '@/lib/providerSession';
import { isStaticMode } from '@/lib/staticMode';

/**
 * Syncs persisted auth with the API when online auth is enabled.
 * Offline / demo sessions are only kept when STATIC_MODE is on.
 */
export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let mounted = true;

    async function syncSession() {
      const rawToken = getRawStoredToken() ?? useAuthStore.getState().token;

      // Live API mode cannot use local/guest placeholders — force a real login.
      if (!isStaticMode() && isOfflineProviderSession(rawToken)) {
        if (mounted) clearAuth();
        return;
      }

      if (isStaticMode() || isOfflineProviderSession(rawToken)) {
        return;
      }

      try {
        const session = await authService.getSession();
        if (!mounted) return;

        if (session) {
          setAuth(session.user, session.token, session.refreshToken);
        } else if (rawToken) {
          clearAuth();
        }
      } catch {
        if (mounted && !getRawStoredToken()) {
          clearAuth();
        }
      }
    }

    const unsub = useAuthStore.persist.onFinishHydration(() => {
      void syncSession();
    });

    if (useAuthStore.persist.hasHydrated()) {
      void syncSession();
    }

    return () => {
      mounted = false;
      unsub();
    };
  }, [clearAuth, setAuth]);

  return children;
}
