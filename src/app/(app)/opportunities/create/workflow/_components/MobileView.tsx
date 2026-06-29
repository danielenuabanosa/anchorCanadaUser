'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { WorkflowModelCard } from '@/features/opportunity-builder/components/WorkflowModelCard';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import { WORKFLOW_MODELS, WORKFLOW_SUB_ROUTES } from '@/features/opportunity-builder/lib/workflowData';
import { useOpportunityBuilderStore, type WorkflowType } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const router = useRouter();
  const storedWorkflow = useOpportunityBuilderStore((s) => s.workflowType);
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);
  const [selected, setSelected] = useState<WorkflowType | null>(storedWorkflow);
  const copy = BUILDER_PAGE_COPY.workflow;

  const handleSelect = useCallback(
    (id: WorkflowType) => {
      setSelected(id);
      setBuilderData({ workflowType: id });
    },
    [setBuilderData],
  );

  const handleContinue = useCallback(() => {
    if (!selected) return;
    router.push(WORKFLOW_SUB_ROUTES[selected]);
  }, [selected, router]);

  useRegisterBuilderNav({
    step: 5,
    backHref: '/opportunities/create/details',
    onContinue: handleContinue,
    continueDisabled: !selected,
  });

  return (
    <main className="px-5 pb-8 pt-10">
      <BuilderPageHeading
        title={copy.title}
        titleAccent={copy.titleAccent}
        combinedTitle={copy.mobileTitle}
        subtitleLines={copy.subtitleLines}
        mobile
      />

      <div className="mt-10 flex flex-col gap-5">
        {WORKFLOW_MODELS.map((model) => (
          <WorkflowModelCard
            key={model.id}
            model={model}
            selected={selected === model.id}
            onSelect={() => handleSelect(model.id)}
            compact
          />
        ))}
      </div>
    </main>
  );
}
