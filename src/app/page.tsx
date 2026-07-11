'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthBootstrap } from '@/shared/hooks/useAuthBootstrap';

export default function HomePage() {
  const router = useRouter();
  const { ready, isAuthenticated, isOfflineMode } = useAuthBootstrap();

  useEffect(() => {
    if (!ready) return;

    if (isOfflineMode || isAuthenticated) {
      router.replace('/dashboard');
      return;
    }

    router.replace('/onboarding');
  }, [ready, isAuthenticated, isOfflineMode, router]);

  return null;
}
