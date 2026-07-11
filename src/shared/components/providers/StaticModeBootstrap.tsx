'use client';

import { useAuthBootstrap } from '@/shared/hooks/useAuthBootstrap';

/**
 * Boots an offline provider session whenever static/demo mode is enabled.
 * Keeps dashboard and hub routes reachable without a live auth API.
 */
export function StaticModeBootstrap() {
  useAuthBootstrap();
  return null;
}
