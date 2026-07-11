'use client';

import { useEffect, useState } from 'react';
import { ensureOfflineSession } from '@/lib/offlineAuth';
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
 */
export function useAuthBootstrap() {
  const [ready, setReady] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    let cancelled = false;

    function finish() {
      if (cancelled) return;

      if (isStaticMode()) {
        ensureOfflineSession();
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
  }, []);

  // Re-establish after logout while offline mode is still enabled.
  useEffect(() => {
    if (!ready || !isStaticMode()) return;
    if (!isAuthenticated) {
      ensureOfflineSession();
    }
  }, [ready, isAuthenticated]);

  return {
    ready,
    isAuthenticated,
    isOfflineMode: isStaticMode(),
  };
}
