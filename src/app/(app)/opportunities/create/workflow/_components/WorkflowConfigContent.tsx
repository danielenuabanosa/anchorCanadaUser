'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, GraduationCap, Sparkles, Star } from 'lucide-react';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { BuilderPageShell } from '@/features/opportunity-builder/components/BuilderPageShell';
import {
  WorkflowComparisonTable,
  WorkflowModelCard,
} from '@/features/opportunity-builder/components/WorkflowModelCard';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import {
  WORKFLOW_MODELS,
  WORKFLOW_RECOMMENDATION,
  WORKFLOW_SUB_ROUTES,
} from '@/features/opportunity-builder/lib/workflowData';
import { useOpportunityBuilderStore, type WorkflowType } from '@/store/opportunityBuilderStore';

export function WorkflowConfigContent() {
  const router = useRouter();
  const { workflowType, setBuilderData } = useOpportunityBuilderStore();
  const [selected, setSelected] = useState<WorkflowType | null>(workflowType);
  const [comparisonOpen, setComparisonOpen] = useState(true);

  function handleSelect(id: WorkflowType) {
    setSelected(id);
    setBuilderData({ workflowType: id });
  }

  function handleContinue() {
    if (!selected) return;
    router.push(WORKFLOW_SUB_ROUTES[selected]);
  }

  const recommended = WORKFLOW_MODELS.find((m) => m.id === WORKFLOW_RECOMMENDATION.workflow);

  return (
    <BuilderPageShell
      step={5}
      backHref="/opportunities/create/details"
      onContinue={handleContinue}
      continueDisabled={!selected}
    >
      <BuilderPageHeading
        title={BUILDER_PAGE_COPY.workflow.title}
        titleAccent={BUILDER_PAGE_COPY.workflow.titleAccent}
        subtitle={BUILDER_PAGE_COPY.workflow.subtitle}
      />

      <div className="rounded-[10px] border border-[#EAF0FD] bg-[#F5F8FE] p-5 hidden md:block">
        <div className="flex items-start gap-5">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#E5EEFF]">
            <Sparkles className="h-[26px] w-[26px] text-[#2F66C8]" />
          </div>
          <p className="font-sans text-[14px] leading-relaxed text-[#44516A] lg:text-[16px]">
            <span className="font-semibold text-[#0F172A]">Workflow powers the applicant experience.</span>{' '}
            This configuration determines how applicants apply, how submissions are managed, and how
            application statuses are tracked throughout the opportunity lifecycle.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="grid gap-2.5 lg:grid-cols-3">
            {WORKFLOW_MODELS.map((model) => (
              <WorkflowModelCard
                key={model.id}
                model={model}
                selected={selected === model.id}
                onSelect={() => handleSelect(model.id)}
              />
            ))}
          </div>

          <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white hidden md:block">
            <button
              type="button"
              onClick={() => setComparisonOpen((o) => !o)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-[16px] font-medium text-[#0F172A]">Workflow Comparison</span>
              <ChevronDown
                className={`h-[18px] w-[18px] text-[#44516A] transition-transform ${
                  comparisonOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {comparisonOpen && (
              <div className="border-t border-[#EEF2F8] px-5 pb-5">
                <WorkflowComparisonTable expanded />
              </div>
            )}
          </div>
        </div>

        <aside className="hidden w-full shrink-0 xl:block xl:w-[348px]">
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="flex items-center gap-5">
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[9px] bg-[#EAF1FE]">
                <Star className="h-6 w-6 text-[#2F66C8]" />
              </div>
              <p className="text-[16px] font-semibold text-[#0F172A]">Recommended For This Opportunity</p>
            </div>
            <p className="mt-2.5 text-[14px] leading-relaxed text-[#44516A]">
              Based on your selected template:
            </p>

            <div className="mt-4 overflow-hidden rounded-[10px] border border-[#EEF2F8]">
              <div className="bg-[#F8FAFC] p-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] border border-[#EEF2F8] bg-white">
                    <GraduationCap className="h-4 w-4 text-[#44516A]" />
                  </span>
                  <p className="text-[12px] font-medium text-[#0F172A]">
                    {WORKFLOW_RECOMMENDATION.templateName}
                  </p>
                </div>
              </div>
              <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-2.5">
                <p className="text-[12px] text-[#8C97AD]">Recommended Workflow:</p>
                <p className="mt-1.5 text-[16px] font-medium text-[#0F172A]">
                  {recommended?.title ?? 'Internal Workflow'}
                </p>
              </div>
            </div>

            <div className="mt-5 text-[14px] leading-[1.7] text-[#0F172A]">
              <p className="font-semibold">Reasons:</p>
              <p>{WORKFLOW_RECOMMENDATION.reason}</p>
            </div>
          </div>
        </aside>
      </div>
    </BuilderPageShell>
  );
}
