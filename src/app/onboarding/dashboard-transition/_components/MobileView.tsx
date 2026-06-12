'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import anchorLogo from '@assets/icons/anchor-logo.png';

const STEPS = [
  'Profile synced',
  'Location detected',
  'Interests matched',
  'Finding opportunities…',
  'Preparing dashboard…',
];

export default function DashboardTransitionMobile() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push('/dashboard'), 800);
          return 100;
        }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [router]);

  const activeStep = Math.min(Math.floor(progress / 20), STEPS.length - 1);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-2 pt-4">
        <StepProgress current={7} />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF4FF]">
          <Image src={anchorLogo} alt="Anchor Canada" width={48} height={48} />
        </div>

        <h1 className="font-instrument-serif text-[28px] leading-tight text-[#0F172A]">
          Welcome to
          <span className="block text-[32px] italic text-[#2F66C8]">Anchor Canada</span>
        </h1>
        <p className="mt-3 text-sm text-[#8C97AD]">
          Personalizing your dashboard…
        </p>

        <div className="mt-8 w-full rounded-2xl border border-[#EEF2F8] bg-white p-5 shadow-sm text-left">
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-[#EEF2F8]">
            <div className="h-full rounded-full bg-[#2F66C8] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex flex-col gap-2.5">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <CheckCircle2
                  className={`h-4 w-4 shrink-0 ${
                    i <= activeStep ? 'text-[#22C55E]' : 'text-[#D9E1EF]'
                  }`}
                />
                <span className={`text-xs ${i <= activeStep ? 'text-[#0F172A] font-medium' : 'text-[#8C97AD]'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/dashboard"
          className="mt-8 flex w-full items-center justify-center rounded-[6px] bg-[#2F66C8] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2454A4]"
        >
          Go to Dashboard
        </Link>
      </main>
    </div>
  );
}
