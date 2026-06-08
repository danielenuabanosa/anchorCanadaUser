'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import anchorLogo from '@assets/icons/anchor-logo.png';

const STEPS = [
  { label: 'Profile synced', done: true },
  { label: 'Location detected', done: true },
  { label: 'Interests matched', done: true },
  { label: 'Finding opportunities in Toronto…', done: false },
  { label: 'Preparing your dashboard…', done: false },
];

export default function DashboardTransitionDesktop() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

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

  useEffect(() => {
    setStepIndex(Math.min(Math.floor(progress / 25), STEPS.length - 1));
  }, [progress]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="border-b border-[#D9E1EF] bg-white">
        <div className="mx-auto max-w-5xl px-10 pb-3 pt-4">
          <StepProgress current={7} />
        </div>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-10 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#EFF4FF]">
            <Image src={anchorLogo} alt="Anchor Canada" width={56} height={56} className="object-contain" />
          </div>

          <div className="mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-[#2F66C8]" />
            <span className="text-sm font-medium text-[#2F66C8]">Almost there</span>
          </div>

          <h1 className="font-instrument-serif text-[48px] leading-tight text-[#0F172A]">
            Welcome to
            <span className="block font-instrument-serif text-[52px] italic text-[#2F66C8]">
              Anchor Canada
            </span>
          </h1>
          <p className="mt-4 text-base text-[#8C97AD]">
            We&apos;re personalizing your dashboard based on your journey, interests, and location.
          </p>

          <div className="mt-10 rounded-2xl border border-[#EEF2F8] bg-white p-6 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] text-left">
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#EEF2F8]">
              <div
                className="h-full rounded-full bg-[#2F66C8] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex flex-col gap-3">
              {STEPS.map((step, i) => {
                const done = i < stepIndex || (i === stepIndex && progress >= (i + 1) * 20);
                const active = i === stepIndex;
                return (
                  <div key={step.label} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 ${
                        done ? 'text-[#22C55E]' : active ? 'text-[#2F66C8]' : 'text-[#D9E1EF]'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        done ? 'text-[#0F172A] font-medium' : active ? 'text-[#2F66C8] font-medium' : 'text-[#8C97AD]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#2F66C8] px-8 py-3 text-sm font-semibold text-white hover:bg-[#2454A4] transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
