'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import {
  FeatureGridWithProgress,
  LiveFeedPanel,
  MapWithCards,
  OpportunityBanner,
  PersonalizationHeading,
  PreferencesFooter,
  ProfileActiveCard,
  ProgressBarSection,
  usePersonalizationProgress,
  VerificationShieldFooter,
  WelcomeHero,
} from '@/app/onboarding/_components/PersonalizationShared';

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

function ActivationWelcomeDesktop({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={6} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-10">
        <div className="flex w-full gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <WelcomeHero />
            <ProfileActiveCard />
            <OpportunityBanner />
          </div>

          <div className="w-[622px] shrink-0">
            <div className="sticky top-24">
              <FeatureGridWithProgress />
            </div>
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Enter My Dashboard"
        footer={<PreferencesFooter />}
      />
    </div>
  );
}

export default function DesktopView() {
  const router = useRouter();
  const [phase, setPhase] = useState<'loading' | 'welcome'>('loading');
  const [loadingKey, setLoadingKey] = useState(0);

  if (phase === 'loading') {
    return (
      <ActivationLoadingDesktop
        key={loadingKey}
        onComplete={() => setPhase('welcome')}
      />
    );
  }

  return (
    <ActivationWelcomeDesktop
      onBack={() => {
        setLoadingKey((k) => k + 1);
        setPhase('loading');
      }}
      onContinue={() => router.push('/onboarding/dashboard-transition')}
    />
  );
}
