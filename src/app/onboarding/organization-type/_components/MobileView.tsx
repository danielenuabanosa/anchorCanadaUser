'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { ProviderOptionCard } from '@/features/onboarding/components/ProviderOptionCard';
import { ORG_TYPES } from '@/features/onboarding/lib/onboardingData';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';

export default function MobileView() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  function handleContinue() {
    if (!selected) return;
    setOnboardingData({ organizationType: selected });
    void saveOnboardingDraft('organization-type').catch(() => undefined);
    router.push('/onboarding/categories');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={1} />
      </div>

      <main className="px-5 pb-6 pt-6">
        <div className="text-center">
          <h1 className="font-serif text-[48px] font-normal leading-[56px] text-[#0F172A]">
            What Type of{' '}
            <span className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Organization</span>
            <br />
            Are You?
          </h1>
          <p className="mt-3 font-sans text-[14px] leading-[100%] text-[#8C97AD]">
            Help us personalize your provider experience and opportunity management tools.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ORG_TYPES.map((item) => (
            <ProviderOptionCard
              key={item.id}
              item={item}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
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
              href="/onboarding"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <OnboardingInfoBar
            variant="mobile"
            message="Your organization type helps personalize your provider dashboard and workflows."
          />
        </div>
      </main>
    </div>
  );
}
