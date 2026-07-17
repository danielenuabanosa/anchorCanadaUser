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

export default function DesktopView() {
  const router = useRouter();
  const storedType = useOpportunityBuilderStore((s) => s.opportunityType);
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);
  const [selected, setSelected] = useState<OpportunityType | null>(
    storedType === 'express-interest' ? null : storedType,
  );

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

  const copy = BUILDER_PAGE_COPY.type;

  return (
    <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
      <BuilderPageHeading title={copy.title} titleAccent={copy.titleAccent} subtitle={copy.subtitle} />

      <div className="mt-10 grid w-full grid-cols-2 gap-10">
        {SELECTABLE_OPPORTUNITY_TYPES.map((item) => (
          <OpportunityTypeCard
            key={item.id}
            item={item}
            selected={selected === item.id}
            onSelect={() => setSelected(item.id)}
          />
        ))}
      </div>
    </main>
  );
}
