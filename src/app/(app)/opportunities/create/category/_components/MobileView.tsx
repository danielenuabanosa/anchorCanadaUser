'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { CategoryGroupCard } from '@/features/opportunity-builder/components/CategoryGroupCard';
import { CategoryRecommendationBanner } from '@/features/opportunity-builder/components/CategoryRecommendationBanner';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_CATEGORY_GROUPS, BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const [selected, setSelected] = useState<string | null>(useOpportunityBuilderStore.getState().category);
  const router = useRouter();
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);

  const handleContinue = useCallback(() => {
    if (!selected) return;
    setBuilderData({ category: selected });
    router.push('/opportunities/create/requirements');
  }, [selected, setBuilderData, router]);

  useRegisterBuilderNav({
    step: 1,
    backHref: '/opportunities/create/type',
    onContinue: handleContinue,
    continueDisabled: !selected,
  });

  const copy = BUILDER_PAGE_COPY.category;

  return (
    <main className="px-5 pb-8 pt-10">
      <BuilderPageHeading
        title={copy.title}
        titleAccent={copy.titleAccent}
        subtitleLines={copy.subtitleLines}
        mobile
      />

      <div className="mt-10 flex flex-col gap-5">
        <CategoryRecommendationBanner />
        <div className="flex flex-col gap-3">
          {BUILDER_CATEGORY_GROUPS.map((group) => (
            <CategoryGroupCard
              key={group.id}
              group={group}
              selectedId={selected}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
