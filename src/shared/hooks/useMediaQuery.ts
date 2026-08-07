'use client';

import { useSyncExternalStore } from 'react';

/**
 * Client media query. SSR snapshot should match the most common viewport
 * for the surface (provider portal defaults to desktop).
 */
export function useMediaQuery(query: string, ssrMatches = true): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => ssrMatches,
  );
}

export function useIsMdUp() {
  return useMediaQuery('(min-width: 768px)', true);
}
