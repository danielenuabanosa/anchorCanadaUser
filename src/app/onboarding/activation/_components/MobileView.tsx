'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import {
  FeatureGridWithProgress,
  LiveFeedPanel,
  MapWithCards,
  PersonalizationHeading,
  PreferencesFooter,
  OrganizationActiveCard,
  ProgressBarSection,
  usePersonalizationProgress,
  VerificationShieldFooter,
  WelcomeHero,
} from '@/app/onboarding/_components/PersonalizationShared';

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

function ActivationWelcomeMobile({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={6} />
      </div>

      <main className="flex flex-col gap-5 px-5 pb-10 pt-4">
        <WelcomeHero compact />
        <OrganizationActiveCard compact />
        <FeatureGridWithProgress compact showDescriptions={false} />

        <div className="mt-3 flex flex-col gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] text-[14px] font-normal text-white transition-colors hover:bg-[#2454A4]"
          >
            Enter Provider Dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[14px] text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <PreferencesFooter variant="mobile" />
      </main>
    </div>
  );
}

export default function MobileView() {
  const router = useRouter();
  const [phase, setPhase] = useState<'loading' | 'welcome'>('loading');
  const [loadingKey, setLoadingKey] = useState(0);

  if (phase === 'loading') {
    return (
      <ActivationLoadingMobile
        key={loadingKey}
        onComplete={() => setPhase('welcome')}
      />
    );
  }

  return (
    <ActivationWelcomeMobile
      onBack={() => {
        setLoadingKey((k) => k + 1);
        setPhase('loading');
      }}
      onContinue={() => router.push('/dashboard')}
    />
  );
}
