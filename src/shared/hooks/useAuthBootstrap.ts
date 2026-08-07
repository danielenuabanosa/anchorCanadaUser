'use client';

import { useEffect, useState } from 'react';
import { ensureOfflineSession } from '@/lib/offlineAuth';
import { isOfflineProviderSession } from '@/lib/providerSession';
import { isStaticMode } from '@/lib/staticMode';
import { useAuthStore } from '@/store/authStore';

function hasAuthHydrated(): boolean {
  const persistApi = useAuthStore.persist;
  return typeof persistApi?.hasHydrated === 'function'
    ? persistApi.hasHydrated()
    : false;
}

/**
 * Waits for Zustand auth persistence to hydrate, then (in offline mode)
 * guarantees a provider session exists so every (app) route is reachable.
 * In live mode, clears stale local/guest tokens so the API is not called with fakes.
 */
export function useAuthBootstrap() {
  const [ready, setReady] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const token = useAuthStore((s) => s.token);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let cancelled = false;

    function finish() {
      if (cancelled) return;

      if (isStaticMode()) {
        ensureOfflineSession();
      } else {
        const current = useAuthStore.getState().token;
        if (isOfflineProviderSession(current)) {
          clearAuth();
        }
      }

      setReady(true);
    }

    const persistApi = useAuthStore.persist;
    const unsub =
      typeof persistApi?.onFinishHydration === 'function'
        ? persistApi.onFinishHydration(() => {
            finish();
          })
        : () => undefined;

    if (hasAuthHydrated()) {
      finish();
    }

    return () => {
      cancelled = true;
      unsub();
    };
  }, [clearAuth]);

  // Re-establish after logout while offline mode is still enabled.
  useEffect(() => {
    if (!ready || !isStaticMode()) return;
    if (!isAuthenticated) {
      ensureOfflineSession();
    }
  }, [ready, isAuthenticated]);

  const liveAuthenticated =
    isAuthenticated && !isOfflineProviderSession(token);

  return {
    ready,
    isAuthenticated: isStaticMode() ? isAuthenticated : liveAuthenticated,
    isOfflineMode: isStaticMode(),
  };
}
