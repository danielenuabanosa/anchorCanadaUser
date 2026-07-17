'use client';

import { useEffect } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { getStoredToken } from '@/lib/apiError';
import { isOfflineProviderSession } from '@/lib/providerSession';
import { isStaticMode } from '@/lib/staticMode';

/**
 * Syncs persisted auth with the API when online auth is enabled.
 * Offline / demo sessions are left untouched.
 */
export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let mounted = true;

    async function syncSession() {
      const token = getStoredToken();

      if (isStaticMode() || isOfflineProviderSession(token)) {
        return;
      }

      try {
        const session = await authService.getSession();
        if (!mounted) return;

        if (session) {
          setAuth(session.user, session.token);
        } else if (token) {
          // Token exists but session is invalid — clear only when APIs are authoritative.
          clearAuth();
        }
      } catch {
        // Network failures must not wipe a usable local session while APIs are down.
        if (mounted && !getStoredToken()) {
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
