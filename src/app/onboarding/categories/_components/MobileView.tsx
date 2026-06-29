'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { ProviderOptionCard } from '@/features/onboarding/components/ProviderOptionCard';
import { OPPORTUNITY_CATEGORIES } from '@/features/onboarding/lib/onboardingData';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import circleCheckIcon from '@assets/icons/circle-check.png';

export default function MobileView() {
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
    router.push('/onboarding/organization-info');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={2} />
      </div>

      <main className="px-5 pb-6 pt-6">
        <div className="text-center">
          <h1 className="font-serif text-[48px] font-normal leading-[56px] text-[#0F172A]">
            What{' '}
            <span className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Opportunities</span>
            <span className="ml-px text-[#E8242B]">|</span>
            <br />
            Will You Create?
          </h1>
          <p className="mt-3 font-sans text-[14px] leading-[100%] text-[#8C97AD]">
            Select the categories that best match your organization&apos;s focus areas.
            <br />
            These selections help you personalize your provider dashboard and publishing experience.
          </p>
        </div>

        <div className="mt-6 rounded-sm border border-[#D9E1EF] bg-white px-5 py-4 shadow-sm">
          <div className="relative flex items-center gap-3">
            <Search className="h-4 w-4 shrink-0 text-[#8C97AD]" />
            <input
              type="text"
              placeholder="Search interests..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-sm border-0 bg-white text-[14px] text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
          </div>
          <div className="mt-3">
            <div
              className={`inline-flex items-center gap-2 rounded-sm border px-4 py-2 font-sans text-[14px] font-medium ${
                hasSelected ? 'border-[#2F66C8] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#8C97AD]'
              }`}
            >
              <Image
                src={circleCheckIcon}
                alt=""
                width={14}
                height={14}
                className={`object-contain ${hasSelected ? 'opacity-100' : 'opacity-40'}`}
              />
              {hasSelected ? `${count} selected` : 'None Selected'}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4">
          {filtered.map((item) => (
            <ProviderOptionCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onSelect={() => toggle(item.id)}
              compact
              showFooter={false}
            />
          ))}
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pb-8 pt-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!hasSelected}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
                hasSelected ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding/organization-type"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <OnboardingInfoBar variant="mobile" message="You can update these anytime in your provider settings." />
        </div>
      </main>
    </div>
  );
}
