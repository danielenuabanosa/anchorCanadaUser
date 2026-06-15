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

export default function DashboardTransitionMobile() {
  const router = useRouter();
  const { progress, stepStatus } = usePersonalizationProgress(() => {
    setTimeout(() => router.push('/dashboard'), 800);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={7} />
      </div>

      <main className="flex flex-col gap-6 px-5 pb-10 pt-6">
        <PersonalizationHeading compact />
        <MapWithCards compact />
        <LiveFeedPanel stepStatus={stepStatus} compact />
        <ProgressBarSection progress={progress} compact />
        <VerificationShieldFooter variant="mobile" />
      </main>
    </div>
  );
}
