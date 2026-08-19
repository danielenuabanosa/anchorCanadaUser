'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { ProviderOptionCard } from '@/features/onboarding/components/ProviderOptionCard';
import { ORG_TYPES } from '@/features/onboarding/lib/onboardingData';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';

export default function DesktopView() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  function goNext(type: string | null) {
    if (type) setOnboardingData({ organizationType: type });
    void saveOnboardingDraft('organization-type').catch(() => undefined);
    router.push('/onboarding/categories');
  }

  function handleContinue() {
    if (!selected) return;
    goNext(selected);
  }

  function handleSkip() {
    goNext(selected);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar showSignIn />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={1} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
        <div className="text-center">
          <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
            What Type of <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Organization</span> Are You?
          </h1>
          <p className="mt-2.5 font-sans text-[16px] leading-relaxed text-[#8C97AD]">
            Help us personalize your provider experience and opportunity management tools.
          </p>
        </div>

        <div className="mt-10 flex w-full flex-col gap-10">
          <div className="grid grid-cols-3 gap-10">
            {ORG_TYPES.slice(0, 3).map((item) => (
              <ProviderOptionCard
                key={item.id}
                item={item}
                selected={selected === item.id}
                onSelect={() => setSelected(item.id)}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-10">
            {ORG_TYPES.slice(3).map((item) => (
              <ProviderOptionCard
                key={item.id}
                item={item}
                selected={selected === item.id}
                onSelect={() => setSelected(item.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding"
        onContinue={handleContinue}
        onSkip={handleSkip}
        continueDisabled={!selected}
        footer={
          <OnboardingInfoBar message="Your organization type helps personalize your provider dashboard and workflows." />
        }
      />
    </div>
  );
}
