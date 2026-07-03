'use client';

import { useEffect } from 'react';
import { isStaticMode } from '@/lib/staticMode';
import { useAuthStore } from '@/store/authStore';
import { getStoredToken } from '@/lib/apiError';
import { GUEST_PROVIDER_TOKEN, isOfflineProviderSession } from '@/lib/providerSession';

const GUEST_USER = {
  id: 'guest-provider-001',
  name: 'Guest Provider',
  email: 'guest@provider.anchorcanada.ca',
  role: 'provider' as const,
};

/** Auto-signs in a guest provider when static mode is enabled so all routes are reachable. */
export function StaticModeBootstrap() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (!isStaticMode()) return;

    const token = getStoredToken();
    if (!isAuthenticated && !isOfflineProviderSession(token)) {
      setAuth(GUEST_USER, GUEST_PROVIDER_TOKEN);
    }
  }, [isAuthenticated, setAuth]);

  return null;
}
