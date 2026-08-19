'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHelpCenterStore } from '@/store/helpCenterStore';

export default function HelpPage() {
  const router = useRouter();
  const open = useHelpCenterStore((s) => s.open);

  useEffect(() => {
    open();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.replace('/onboarding');
    }
 
  }, []);

  return null;
}
