'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LandingNavbar } from '@/features/home/components/LandingNavbar';
import { HeroSection } from '@/features/home/components/HeroSection';
import { GetStartedSection } from '@/features/home/components/GetStartedSection';
import { LandingFooter } from '@/features/home/components/LandingFooter';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [mounted, isAuthenticated, router]);

  return (
    <>
      <LandingNavbar />
      <HeroSection />
      <GetStartedSection />

    </>
  );
}
