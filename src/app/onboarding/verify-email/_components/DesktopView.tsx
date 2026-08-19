'use client';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { VerifyEmailForm } from './VerifyEmailForm';

export default function VerifyEmailDesktopView() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar showSignIn />
      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={5} />
      </div>
      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-20">
        <h1 className="font-serif text-[48px] text-[#0F172A]">Verify your email</h1>
        <p className="mt-4 max-w-md text-center text-[#8C97AD]">
          After verification your provider account is created as unverified until admin approval.
        </p>
        <div className="mt-12">
          <VerifyEmailForm />
        </div>
      </main>
    </div>
  );
}
