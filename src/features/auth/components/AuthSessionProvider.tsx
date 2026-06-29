'use client';

import { useEffect } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { getStoredToken } from '@/lib/apiError';
import { isOfflineProviderSession } from '@/lib/providerSession';

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let mounted = true;

    async function syncSession() {
      const token = getStoredToken();
      if (isOfflineProviderSession(token)) {
        return;
      }

      try {
        const session = await authService.getSession();
        if (!mounted) return;

        if (session) {
          setAuth(session.user, session.token);
        } else {
          clearAuth();
        }
      } catch {
        if (mounted) clearAuth();
      }
    }

    syncSession();

    return () => {
      mounted = false;
    };
  }, [clearAuth, setAuth]);

  return children;
}
