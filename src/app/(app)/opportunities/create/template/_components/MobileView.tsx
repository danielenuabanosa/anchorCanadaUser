'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { TemplateOptionCard } from '@/features/opportunity-builder/components/TemplateOptionCard';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_PAGE_COPY, BUILDER_TEMPLATES } from '@/features/opportunity-builder/lib/builderData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const [selected, setSelected] = useState<string | null>(useOpportunityBuilderStore.getState().template);
  const router = useRouter();
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);
  const copy = BUILDER_PAGE_COPY.template;

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

  return (
    <main className="px-5 pb-8 pt-10">
      <BuilderPageHeading
        title={copy.title}
        titleAccent={copy.titleAccent}
        subtitleLines={copy.subtitleLines}
        mobile
      />

      <div className="mt-10 flex flex-col gap-2.5">
        {BUILDER_TEMPLATES.map((item) => (
          <TemplateOptionCard
            key={item.id}
            template={item}
            selected={selected === item.id}
            onSelect={() => setSelected(item.id)}
            compact
          />
        ))}
      </div>
    </main>
  );
}
