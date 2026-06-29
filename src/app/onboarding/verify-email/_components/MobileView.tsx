'use client';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { VerifyEmailForm } from './VerifyEmailForm';

export default function MobileView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />
      <div className="px-5 pb-2 pt-4">
        <StepProgress current={0} />
      </div>
      <main className="flex flex-col items-center px-5 pb-24 pt-10">
        <h1 className="font-serif text-[36px] leading-[44px] text-[#0F172A]">Verify your email</h1>
        <p className="mt-3 text-center text-sm text-[#8C97AD]">
          Your provider account stays unverified until admin approval.
        </p>
        <div className="mt-10 w-full">
          <VerifyEmailForm />
        </div>
      </main>
    </div>
  );
}
