'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { CategorySelectCard } from '@/features/onboarding/components/CategorySelectCard';
import { mapCategoriesToOnboardingOptions } from '@/features/onboarding/lib/onboardingData';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';
import circleCheckIcon from '@assets/icons/circle-check.png';

export default function MobileView() {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar showSignIn />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={2} />
      </div>

      <main className="px-5 pb-6 pt-6">
        <div className="text-center">
          <h1 className="font-serif text-[40px] font-normal leading-[1.1] text-[#0F172A]">
            What{' '}
            <span className="italic text-[#2F66C8]">Opportunities</span>
            <br />
            Will You Create?
          </h1>
          <p className="mt-3 font-sans text-[14px] leading-normal text-[#8C97AD]">
            Select the categories that best match your organization&apos;s focus areas.
            <br />
            These selections help you personalize your provider dashboard and publishing experience.
          </p>
        </div>

        <div className="mt-6 rounded-[10px] border border-[#D9E1EF] bg-white p-4 shadow-[0_6px_8px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2.5">
            <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" />
            <input
              type="text"
              placeholder="Search interests..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="no-anchor-field min-w-0 flex-1 bg-transparent font-sans text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
          </div>
          <div className="mt-3">
            <div
              className={`inline-flex items-center gap-2 rounded-[6px] border px-4 py-2 font-sans text-sm ${
                hasSelected ? 'border-[#2F66C8] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#8C97AD]'
              }`}
            >
              <Image
                src={circleCheckIcon}
                alt=""
                width={16}
                height={16}
                className={`object-contain ${hasSelected ? 'opacity-100' : 'opacity-40'}`}
              />
              {hasSelected ? `${count} selected` : 'None Selected'}
            </div>
          </div>
        </div>

        {isLoading && categories.length === 0 ? (
          <p className="mt-5 text-center font-sans text-sm text-[#8C97AD]">Loading categories…</p>
        ) : isError ? (
          <p className="mt-5 text-center font-sans text-sm text-[#DE1735]">
            Couldn’t load categories. Please refresh and try again.
          </p>
        ) : categories.length === 0 ? (
          <p className="mt-5 text-center font-sans text-sm text-[#8C97AD]">No categories available yet.</p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((item) => (
              <CategorySelectCard
                key={item.id}
                item={item}
                selected={selected.has(item.id)}
                onSelect={() => toggle(item.id)}
                compact
              />
            ))}
          </div>
        )}

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
            <button
              type="button"
              onClick={handleSkip}
              className="flex h-12 w-full items-center justify-center text-[15px] font-medium text-[#2F66C8]"
            >
              Skip for Now
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
