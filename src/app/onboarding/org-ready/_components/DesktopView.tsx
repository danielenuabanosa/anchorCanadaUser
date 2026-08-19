'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { finishActivation } from '@/features/provider/lib/completeOnboarding';
import {
  ACTIVATION_INFO_MESSAGE,
  ActivationActionButtons,
  ActivationFeatureCards,
  ActivationHeading,
  ActivationHeroIllustration,
  OrganizationStatusPanel,
  RecommendedStepsPanel,
} from '@/app/onboarding/activation/_components/ActivationShared';

import boxIcon from '@assets/icons/box.png';

export default function DesktopView() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleGoToDashboard() {
    setError('');
    try {
      await finishActivation();
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not complete onboarding.');
    }
  }

  return (
    <>
      {error ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
        <OnboardingNavbar showSignIn />

        <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
          <StepProgress current={7} />
        </div>

        <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-10 pt-10">
          <div className="flex flex-col items-center gap-[100px]">
            <ActivationHeading />

            <div className="flex w-full items-start gap-5">
              <div className="flex min-w-0 flex-1 flex-col gap-[60px]">
                <div className="flex flex-col gap-5">
                  <ActivationHeroIllustration />
                  <ActivationFeatureCards />
                </div>
                <ActivationActionButtons onDashboard={handleGoToDashboard} />
              </div>

              <aside className="sticky top-10 hidden w-[368px] shrink-0 flex-col gap-5 lg:flex">
                <OrganizationStatusPanel />
                <RecommendedStepsPanel />
              </aside>
            </div>
          </div>
        </main>

        <div className="mx-auto w-full max-w-[1548px] px-10 pb-10">
          <OnboardingInfoBar
            message={ACTIVATION_INFO_MESSAGE}
            icon={boxIcon}
            linkText="Explore Provider Tools"
            linkHref="/dashboard"
            className="mt-0"
          />
        </div>
      </div>
    </>
  );
}
