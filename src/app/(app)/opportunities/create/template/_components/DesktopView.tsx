'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { TemplateOptionCard } from '@/features/opportunity-builder/components/TemplateOptionCard';
import { TemplateRecommendationBanner } from '@/features/opportunity-builder/components/TemplateRecommendationBanner';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_PAGE_COPY, BUILDER_TEMPLATES } from '@/features/opportunity-builder/lib/builderData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function DesktopView() {
  const [selected, setSelected] = useState<string | null>(useOpportunityBuilderStore.getState().template);
  const router = useRouter();
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);

  const handleContinue = useCallback(() => {
    if (!selected) return;
    setBuilderData({ template: selected });
    router.push('/opportunities/create/requirements');
  }, [selected, setBuilderData, router]);

  useRegisterBuilderNav({
    step: 2,
    backHref: '/opportunities/create/category',
    onContinue: handleContinue,
    continueDisabled: !selected,
  });

  const copy = BUILDER_PAGE_COPY.template;

  return (
    <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
      <BuilderPageHeading
        title={copy.title}
        titleAccent={copy.titleAccent}
        subtitleLines={copy.subtitleLines}
      />

      <div className="mt-[60px] flex w-full flex-col gap-10">
        <TemplateRecommendationBanner />

        <div className="grid w-full grid-cols-3 gap-2.5">
          {BUILDER_TEMPLATES.map((item) => (
            <TemplateOptionCard
              key={item.id}
              template={item}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
