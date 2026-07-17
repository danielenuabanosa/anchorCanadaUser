'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { OpportunityTypeCard } from '@/features/opportunity-builder/components/OpportunityTypeCard';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import {
  BUILDER_PAGE_COPY,
  SELECTABLE_OPPORTUNITY_TYPES,
} from '@/features/opportunity-builder/lib/builderData';
import { useOpportunityBuilderStore, type OpportunityType } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const router = useRouter();
  const storedType = useOpportunityBuilderStore((s) => s.opportunityType);
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);
  const [selected, setSelected] = useState<OpportunityType | null>(
    storedType === 'express-interest' ? null : storedType,
  );
  const copy = BUILDER_PAGE_COPY.type;

  useEffect(() => {
    if (storedType && storedType !== 'express-interest') setSelected(storedType);
  }, [storedType]);

  const handleContinue = useCallback(() => {
    if (!selected || selected === 'express-interest') return;
    setBuilderData({ opportunityType: selected, workflowType: selected });
    router.push('/opportunities/create/category');
  }, [selected, setBuilderData, router]);

  useRegisterBuilderNav({
    step: 0,
    backHref: '/opportunities',
    onContinue: handleContinue,
    continueDisabled: !selected || selected === 'express-interest',
  });

  return (
    <main className="px-5 pb-8 pt-10">
      <BuilderPageHeading
        title={copy.title}
        titleAccent={copy.titleAccent}
        subtitle={copy.subtitle}
        mobile
      />

      <div className="mt-10 flex flex-col gap-5">
        {SELECTABLE_OPPORTUNITY_TYPES.map((item) => (
          <OpportunityTypeCard
            key={item.id}
            item={item}
            selected={selected === item.id}
            onSelect={() => setSelected(item.id)}
            compact
          />
        ))}
      </div>
    </main>
  );
}
