'use client';

import Link from 'next/link';
import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { AccountRegistrationForm } from './AccountRegistrationForm';

export default function DesktopView() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={0} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-[80px]">
        <div className="max-w-[688px] text-center">
          <h1 className="font-serif text-[60px] leading-[56px] text-[#0F172A]">Create Your</h1>
          <p className="font-serif text-[78px] italic leading-[73px] text-[#2F66C8]">Provider Account</p>
          <p className="mt-6 text-base text-[#8C97AD]">
            Register your organization. Your account starts as unverified until an admin approves it in Postman.
          </p>
        </div>

        <div className="mt-16">
          <AccountRegistrationForm />
        </div>
      </main>

      <div className="border-t border-[#D9E1EF] bg-[#EFF4FF] px-10 py-10">
        <OnboardingInfoBar message="Already have an account?" linkText="Sign in" linkHref="/login" className="mt-0" />
      </div>
    </div>
  );
}
