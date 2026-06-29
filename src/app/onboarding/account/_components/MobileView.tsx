'use client';

import Link from 'next/link';
import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { AccountRegistrationForm } from './AccountRegistrationForm';

export default function MobileView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-2 pt-4">
        <StepProgress current={0} />
      </div>

      <main className="flex flex-col items-center px-5 pb-24 pt-10">
        <div className="text-center">
          <h1 className="font-serif text-[36px] leading-[44px] text-[#0F172A]">Create Provider Account</h1>
          <p className="mt-3 text-sm text-[#8C97AD]">
            Your organization starts unverified until approved via the admin API.
          </p>
        </div>

        <div className="mt-10 w-full">
          <AccountRegistrationForm />
        </div>

        <p className="mt-8 text-sm text-[#8C97AD]">
          Already registered?{' '}
          <Link href="/login" className="font-medium text-[#2F66C8] hover:underline">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
