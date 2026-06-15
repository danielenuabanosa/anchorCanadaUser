'use client';

import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import {
  LiveFeedPanel,
  MapWithCards,
  PersonalizationHeading,
  ProgressBarSection,
  usePersonalizationProgress,
  VerificationShieldFooter,
} from '@/app/onboarding/_components/PersonalizationShared';

export default function DashboardTransitionDesktop() {
  const router = useRouter();
  const { progress, stepStatus } = usePersonalizationProgress(() => {
    setTimeout(() => router.push('/dashboard'), 800);
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={7} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col gap-10 px-10 py-12">
        <PersonalizationHeading />

        <div className="flex gap-9">
          <div className="w-[622px] shrink-0">
            <LiveFeedPanel stepStatus={stepStatus} />
          </div>
          <div className="min-w-0 flex-1">
            <MapWithCards />
          </div>
        </div>

        <ProgressBarSection progress={progress} />

        <VerificationShieldFooter />
      </main>
    </div>
  );
}
