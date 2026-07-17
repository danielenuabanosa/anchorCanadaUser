'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { OpportunityConfigForm } from '@/features/opportunity-builder/components/OpportunityConfigForm';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_CATEGORY_GROUPS, BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import {
  getCategoryConfigSchema,
  isCategoryConfigComplete,
} from '@/features/opportunity-builder/lib/categoryConfigData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function DesktopView() {
  const router = useRouter();
  const category = useOpportunityBuilderStore((s) => s.category);
  const categoryConfig = useOpportunityBuilderStore((s) => s.categoryConfig);
  const setCategoryConfig = useOpportunityBuilderStore((s) => s.setCategoryConfig);
  const copy = BUILDER_PAGE_COPY.workflow;

  const categoryGroup = useMemo(
    () =>
      BUILDER_CATEGORY_GROUPS.find(
        (g) => g.id === category || g.subcategories.some((s) => s.id === category),
      ) ?? null,
    [category],
  );

  const schema = useMemo(
    () => getCategoryConfigSchema(categoryGroup?.id ?? null),
    [categoryGroup?.id],
  );
  const continueDisabled = !isCategoryConfigComplete(schema, categoryConfig);

  const handleContinue = useCallback(() => {
    router.push('/opportunities/create/review');
  }, [router]);

  useRegisterBuilderNav({
    step: 4,
    backHref: '/opportunities/create/details',
    onContinue: handleContinue,
    continueDisabled,
  });

  return (
    <div className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
      <BuilderPageHeading title={copy.title} titleAccent={copy.titleAccent} subtitle={copy.subtitle} />
      <div className="mt-[60px] w-full">
        <OpportunityConfigForm
          categoryGroup={categoryGroup}
          config={categoryConfig}
          onChange={setCategoryConfig}
        />
      </div>
    </div>
  );
}
