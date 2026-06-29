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

function ActivationLoadingDesktop({ onComplete }: { onComplete: () => void }) {
  const { progress, stepStatus } = usePersonalizationProgress(onComplete);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={6} />
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

function ActivationWelcomeDesktop({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={6} />
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
              <ActivationActionButtons onDashboard={onContinue} />
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
  );
}

export default function DesktopView() {
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
      <ActivationLoadingDesktop
        key={loadingKey}
        onComplete={() => setPhase('welcome')}
      />
    );
  }

  return (
    <>
      {error ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}
      <ActivationWelcomeDesktop onContinue={handleGoToDashboard} />
    </>
  );
}
