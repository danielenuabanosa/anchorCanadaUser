'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { ProviderOptionCard } from '@/features/onboarding/components/ProviderOptionCard';
import { OPPORTUNITY_CATEGORIES } from '@/features/onboarding/lib/onboardingData';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';
import circleCheckIcon from '@assets/icons/circle-check.png';

export default function DesktopView() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = useMemo(
    () => OPPORTUNITY_CATEGORIES.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const count = selected.size;
  const hasSelected = count > 0;

  function handleContinue() {
    if (!hasSelected) return;
    setOnboardingData({ categories: Array.from(selected) });
    void saveOnboardingDraft('categories').catch(() => undefined);
    router.push('/onboarding/organization-info');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={2} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
        <div className="text-center">
          <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
            What{' '}
            <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Opportunities</span>
            <span className="ml-px inline-block text-[#EF4444]">|</span> Will You Create?
          </h1>
          <p className="mt-2.5 font-sans text-[16px] leading-relaxed text-[#8C97AD]">
            Select the categories that best match your organization&apos;s focus areas.
            <br />
            These selections help you personalize your provider dashboard and publishing experience.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-[1548px] items-center justify-between rounded-2xl border border-[#D9E1EF] bg-white px-5 py-3.5 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-0 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#8C97AD]" />
            <input
              type="text"
              placeholder="Search interests..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="anchor-field anchor-field--icon-left w-full border-0 bg-transparent pl-7 shadow-none"
            />
          </div>
          <div className={`flex items-center gap-1.5 ${hasSelected ? 'text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
            <Image
              src={circleCheckIcon}
              alt=""
              width={16}
              height={16}
              className={`object-contain transition-opacity ${hasSelected ? 'opacity-100' : 'opacity-40'}`}
            />
            <span className="whitespace-nowrap text-[13px] font-medium">
              {hasSelected ? `${count} selected` : 'None Selected'}
            </span>
          </div>
        </div>

        <div className="mt-10 grid w-full grid-cols-3 gap-10">
          {filtered.map((item) => (
            <ProviderOptionCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onSelect={() => toggle(item.id)}
              showFooter={false}
            />
          ))}
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/organization-type"
        onContinue={handleContinue}
        continueDisabled={!hasSelected}
        footer={
          <OnboardingInfoBar message="You can update these anytime in your provider settings." />
        }
      />
    </div>
  );
}
