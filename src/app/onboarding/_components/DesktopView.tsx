'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { JourneySelectionCard } from '@/features/onboarding/components/JourneySelectionCard';
import { JOURNEY_CARDS, type JourneyId } from '@/features/onboarding/lib/onboardingData';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';

export default function DesktopView() {
  const [selected, setSelected] = useState<JourneyId | null>(null);
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  function handleContinue() {
    if (!selected) return;
    setOnboardingData({ journey: selected });
    void saveOnboardingDraft('journey').catch(() => undefined);
    if (selected === 'explore') {
      router.push('/guest');
      return;
    }
    router.push('/onboarding/organization-type');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={0} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-[120px]">
        <div className="max-w-[688px] text-center">
          <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
            How Would You Like To Use
          </h1>
          <p className="font-serif text-[78.83px] font-normal italic leading-[73.57px] text-[#2F66C8]">Anchor?</p>
          <p className="mt-6 font-sans text-[16px] text-[#8C97AD]">
            Choose the path that best matches your goals.
            <br />
            You can switch anytime.
          </p>
        </div>

        <div className="mt-[100px] flex w-full flex-wrap items-center justify-center gap-10">
          {JOURNEY_CARDS.map((card) => (
            <JourneySelectionCard
              key={card.id}
              card={card}
              selected={selected === card.id}
              onSelect={() => setSelected(card.id)}
            />
          ))}
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/"
        onContinue={handleContinue}
        continueDisabled={!selected}
        footer={
          <OnboardingInfoBar message="Your journey can be updated anytime in your account settings." />
        }
      />
    </div>
  );
}
