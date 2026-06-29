'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { BuilderSelectionBanner } from '@/features/opportunity-builder/components/BuilderSelectionBanner';
import { RequirementListBuilder } from '@/features/opportunity-builder/components/RequirementListBuilder';
import { RequirementTypeLibrary } from '@/features/opportunity-builder/components/RequirementTypeLibrary';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import { createRequirementFromType } from '@/features/opportunity-builder/lib/requirementsData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const router = useRouter();
  const requirementFields = useOpportunityBuilderStore((s) => s.requirementFields);
  const initRequirementsFromTemplate = useOpportunityBuilderStore((s) => s.initRequirementsFromTemplate);
  const addRequirement = useOpportunityBuilderStore((s) => s.addRequirement);
  const removeRequirement = useOpportunityBuilderStore((s) => s.removeRequirement);
  const reorderRequirements = useOpportunityBuilderStore((s) => s.reorderRequirements);
  const updateRequirement = useOpportunityBuilderStore((s) => s.updateRequirement);
  const copy = BUILDER_PAGE_COPY.requirements;

  useEffect(() => {
    initRequirementsFromTemplate();
  }, [initRequirementsFromTemplate]);

  const handleContinue = useCallback(() => {
    router.push('/opportunities/create/details');
  }, [router]);

  useRegisterBuilderNav({
    step: 3,
    backHref: '/opportunities/create/template',
    onContinue: handleContinue,
    continueDisabled: requirementFields.length === 0,
  });

  function handleAddType(typeId: string) {
    const field = createRequirementFromType(typeId);
    if (field) addRequirement(field);
  }

  return (
    <div className="mx-auto flex w-full flex-1 flex-col px-5 pb-16 pt-10">
      <BuilderPageHeading title={copy.title} titleAccent={copy.titleAccent} subtitle={copy.subtitle} mobile />

      <div className="mt-10 flex flex-col gap-6">
        <BuilderSelectionBanner />
        <RequirementListBuilder
          fields={requirementFields}
          onReorder={reorderRequirements}
          onUpdate={updateRequirement}
          onRemove={removeRequirement}
          onAdd={(fields) => fields.forEach(addRequirement)}
        />
        <RequirementTypeLibrary onAddType={handleAddType} />
      </div>
    </div>
  );
}
