'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { CategorySelectCard } from '@/features/onboarding/components/CategorySelectCard';
import { mapCategoriesToOnboardingOptions } from '@/features/onboarding/lib/onboardingData';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';
import circleCheckIcon from '@assets/icons/circle-check.png';

export default function DesktopView() {
  const { data: apiCategories, isLoading, isError } = useCategories();
  const categories = useMemo(
    () => mapCategoriesToOnboardingOptions(apiCategories ?? []),
    [apiCategories],
  );
  const storedCategories = useProviderOnboardingStore((s) => s.categories);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(storedCategories));
  const [query, setQuery] = useState('');
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  useEffect(() => {
    setSelected((prev) => {
      const valid = new Set(categories.map((item) => item.id));
      const next = new Set([...prev].filter((id) => valid.has(id)));
      for (const id of storedCategories) {
        if (valid.has(id)) next.add(id);
      }
      return next;
    });
  }, [categories, storedCategories]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.label.toLowerCase().includes(q)),
    );
  }, [categories, query]);

  const count = selected.size;
  const hasSelected = count > 0;

  function goNext() {
    setOnboardingData({ categories: Array.from(selected) });
    void saveOnboardingDraft('categories').catch(() => undefined);
    router.push('/onboarding/organization-info');
  }

  function handleContinue() {
    if (!hasSelected) return;
    goNext();
  }

  function handleSkip() {
    goNext();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar showSignIn />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={2} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="flex flex-wrap items-baseline justify-center gap-2.5 font-serif font-normal text-[#0F172A]">
            <span className="text-[60px] leading-[56px]">What</span>
            <span className="text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Opportunities</span>
            <span className="text-[60px] leading-[56px]">Will You Create?</span>
          </h1>
          <p className="max-w-[720px] font-sans text-[16px] leading-normal text-[#8C97AD]">
            Select the categories that best match your organization&apos;s focus areas.
            <br />
            These selections help you personalize your provider dashboard and publishing experience.
          </p>
        </div>

        <div className="mt-10 flex w-full flex-col gap-[60px]">
          <div className="flex w-full items-center justify-between gap-10 rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_6px_8px_rgba(0,0,0,0.08)]">
            <div className="flex min-w-0 flex-1 items-center gap-2.5 py-5">
              <Search className="h-[21px] w-[21px] shrink-0 text-[#8C97AD]" />
              <input
                type="text"
                placeholder="Search interests..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="no-anchor-field min-w-0 flex-1 bg-transparent text-[16px] text-[#0F172A] placeholder:text-[#8C97AD] outline-none focus:outline-none focus:ring-0"
              />
            </div>
            <div
              className={`flex shrink-0 items-center gap-2.5 rounded-[6px] border bg-white px-6 py-3.5 ${
                hasSelected ? 'border-[#2F66C8] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#8C97AD]'
              }`}
            >
              <Image
                src={circleCheckIcon}
                alt=""
                width={21}
                height={21}
                className={`object-contain transition-opacity ${hasSelected ? 'opacity-100' : 'opacity-40'}`}
              />
              <span className="whitespace-nowrap text-[16px] font-normal">
                {hasSelected ? `${count} selected` : 'None Selected'}
              </span>
            </div>
          </div>

          {isLoading && categories.length === 0 ? (
            <p className="font-sans text-sm text-[#8C97AD]">Loading categories…</p>
          ) : isError ? (
            <p className="font-sans text-sm text-[#DE1735]">
              Couldn’t load categories. Please refresh and try again.
            </p>
          ) : categories.length === 0 ? (
            <p className="font-sans text-sm text-[#8C97AD]">No categories available yet.</p>
          ) : (
            <div className="grid w-full grid-cols-4 gap-10">
              {filtered.map((item) => (
                <CategorySelectCard
                  key={item.id}
                  item={item}
                  selected={selected.has(item.id)}
                  onSelect={() => toggle(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/organization-type"
        onContinue={handleContinue}
        onSkip={handleSkip}
        continueDisabled={!hasSelected}
        footer={
          <OnboardingInfoBar message="You can update these anytime in your provider settings." />
        }
      />
    </div>
  );
}
