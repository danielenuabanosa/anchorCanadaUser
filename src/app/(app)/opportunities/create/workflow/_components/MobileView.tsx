'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { OpportunityConfigForm } from '@/features/opportunity-builder/components/OpportunityConfigForm';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import {
  findCategoryGroup,
  useBuilderCategoryGroups,
} from '@/features/opportunity-builder/hooks/useBuilderCategoryGroups';
import {
  getCategoryConfigSchema,
  isCategoryConfigComplete,
} from '@/features/opportunity-builder/lib/categoryConfigData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const router = useRouter();
  const category = useOpportunityBuilderStore((s) => s.category);
  const categoryConfig = useOpportunityBuilderStore((s) => s.categoryConfig);
  const setCategoryConfig = useOpportunityBuilderStore((s) => s.setCategoryConfig);
  const { groups } = useBuilderCategoryGroups();
  const copy = BUILDER_PAGE_COPY.workflow;

  const categoryGroup = useMemo(() => findCategoryGroup(groups, category) ?? null, [groups, category]);

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
    <div className="mx-auto flex w-full flex-1 flex-col px-5 pb-16 pt-10">
      <BuilderPageHeading
        title={copy.title}
        titleAccent={copy.titleAccent}
        subtitle={copy.subtitle}
        mobile
      />
      <div className="mt-10 w-full">
        <OpportunityConfigForm
          categoryGroup={categoryGroup}
          config={categoryConfig}
          onChange={setCategoryConfig}
        />
      </div>
    </div>
  );
}
