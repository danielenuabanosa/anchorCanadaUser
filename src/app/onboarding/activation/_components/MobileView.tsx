'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import {
  LiveFeedPanel,
  MapWithCards,
  PersonalizationHeading,
  ProgressBarSection,
  usePersonalizationProgress,
  VerificationShieldFooter,
} from '@/app/onboarding/_components/PersonalizationShared';
import { finishActivation } from '@/features/provider/lib/completeOnboarding';
import {
  ACTIVATION_INFO_MESSAGE,
  ActivationActionButtons,
  ActivationFeatureCards,
  ActivationHeading,
  ActivationHeroIllustration,
  OrganizationStatusPanel,
  RecommendedStepsPanel,
} from './ActivationShared';

import boxIcon from '@assets/icons/box.png';

function ActivationLoadingMobile({ onComplete }: { onComplete: () => void }) {
  const { progress, stepStatus } = usePersonalizationProgress(onComplete);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={6} />
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

function ActivationWelcomeMobile({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={6} />
      </div>

      <main className="flex flex-col gap-10 px-5 pb-6 pt-10">
        <ActivationHeading compact />

        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col gap-5">
            <ActivationHeroIllustration compact />
            <ActivationFeatureCards compact />
          </div>

          <div className="flex flex-col gap-5">
            <OrganizationStatusPanel compact />
            <RecommendedStepsPanel compact />
          </div>

          <ActivationActionButtons compact onDashboard={onContinue} />
        </div>
      </main>

      <div className="px-5 pb-10 pt-4">
        <OnboardingInfoBar
          variant="mobile"
          message={ACTIVATION_INFO_MESSAGE}
          icon={boxIcon}
          linkText=""
          linkHref="/dashboard"
        />
      </div>
    </div>
  );
}

export default function MobileView() {
  const router = useRouter();
  const [phase, setPhase] = useState<'loading' | 'welcome'>('loading');
  const [loadingKey, setLoadingKey] = useState(0);
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

  if (phase === 'loading') {
    return (
      <ActivationLoadingMobile
        key={loadingKey}
        onComplete={() => setPhase('welcome')}
      />
    );
  }

  return (
    <>
      {error ? (
        <div className="fixed bottom-6 left-5 right-5 z-50 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      ) : null}
      <ActivationWelcomeMobile onContinue={handleGoToDashboard} />
    </>
  );
}
