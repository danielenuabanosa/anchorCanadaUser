'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { JourneySelectionCard } from '@/features/onboarding/components/JourneySelectionCard';
import { JOURNEY_CARDS, type JourneyId } from '@/features/onboarding/lib/onboardingData';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';

export default function MobileView() {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-2 pt-4">
        <StepProgress current={0} />
      </div>

      <main className="px-5 pb-4 pt-8">
        <div className="text-center">
          <h1 className="font-serif text-[26px] leading-tight text-[#0F172A]">How Would You Like To Use</h1>
          <p className="font-serif text-[30px] italic leading-tight text-[#2F66C8]">Anchor?</p>
          <p className="mt-3 font-sans text-[12px] leading-relaxed text-[#8C97AD]">
            Choose the path that best matches your goals.
            <br />
            You can switch anytime.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {JOURNEY_CARDS.map((card) => (
            <JourneySelectionCard
              key={card.id}
              card={card}
              selected={selected === card.id}
              onSelect={() => setSelected(card.id)}
              compact
            />
          ))}
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pb-8 pt-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selected}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
                selected ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <OnboardingInfoBar
            variant="mobile"
            message="Your journey can be updated anytime in your account settings."
          />
        </div>
      </main>
    </div>
  );
}
