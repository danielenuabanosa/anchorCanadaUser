'use client';

import { useRouter } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  GripVertical,
  Info,
  MoreVertical,
  Plus,
  Shield,
  SlidersHorizontal,
} from 'lucide-react';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import {
  BuilderPageShell,
  BuilderSectionCard,
  FormLabel,
  RadioCard,
} from '@/features/opportunity-builder/components/BuilderPageShell';
import {
  INVITATION_METHOD_OPTIONS,
  QUESTION_TYPE_LABELS,
  REVIEW_METHOD_OPTIONS,
  type ExpressInterestConfig,
  type ExpressInterestQuestion,
  type QuestionType,
} from '@/features/opportunity-builder/lib/workflowData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

function createQuestion(): ExpressInterestQuestion {
  return {
    id: `q-${Date.now()}`,
    label: 'New question',
    type: 'short-text',
    required: false,
  };
}

export function ExpressInterestWorkflowContent() {
  const router = useRouter();
  const { expressInterestWorkflow, setBuilderData } = useOpportunityBuilderStore();

  function patch(patch: Partial<ExpressInterestConfig>) {
    setBuilderData({ expressInterestWorkflow: { ...expressInterestWorkflow, ...patch } });
  }

  function updateQuestion(id: string, questionPatch: Partial<ExpressInterestQuestion>) {
    patch({
      questions: expressInterestWorkflow.questions.map((q) =>
        q.id === id ? { ...q, ...questionPatch } : q,
      ),
    });
  }

  function addQuestion() {
    patch({ questions: [...expressInterestWorkflow.questions, createQuestion()] });
  }

  function removeQuestion(id: string) {
    if (expressInterestWorkflow.questions.length <= 1) return;
    patch({ questions: expressInterestWorkflow.questions.filter((q) => q.id !== id) });
  }

  return (
    <BuilderPageShell
      step={5}
      backHref="/opportunities/create/workflow"
      onContinue={() => router.push('/opportunities/create/review')}
    >
      <BuilderPageHeading
        title={BUILDER_PAGE_COPY.expressWorkflow.title}
        titleAccent={BUILDER_PAGE_COPY.expressWorkflow.titleAccent}
        subtitle={BUILDER_PAGE_COPY.expressWorkflow.subtitle}
      />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="w-full shrink-0 lg:w-[520px]">
          <BuilderSectionCard
            step={1}
            title={
              <span className="inline-flex items-center gap-2.5">
                Interest Form Builder
                <Info className="h-4 w-4 text-[#8C97AD]" />
              </span>
            }
            hint="Build the questions you want to collect from interested users."
          >
            <div className="flex flex-col gap-2.5">
              {expressInterestWorkflow.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-[10px] border border-[#EEF2F8] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] text-[14px] font-medium text-[#2F66C8]">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <input
                          value={question.label}
                          onChange={(e) => updateQuestion(question.id, { label: e.target.value })}
                          className="w-full border-0 bg-transparent p-0 text-[14px] font-medium text-[#0F172A] outline-none"
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                          {question.required && (
                            <span className="rounded-[4px] bg-[#EFF4FF] px-1.5 py-0.5 text-[12px] font-medium text-[#2F66C8]">
                              Required
                            </span>
                          )}
                          <span className="rounded-[4px] bg-[#F8FAFC] px-1.5 py-0.5 text-[12px] text-[#44516A]">
                            {QUESTION_TYPE_LABELS[question.type]}
                          </span>
                        </div>
                        <select
                          value={question.type}
                          onChange={(e) =>
                            updateQuestion(question.id, { type: e.target.value as QuestionType })
                          }
                          className="mt-2 rounded-[6px] border border-[#EEF2F8] px-2 py-1 text-[12px] text-[#44516A]"
                        >
                          {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                        <label className="mt-2 flex items-center gap-2 text-[12px] text-[#44516A]">
                          <input
                            type="checkbox"
                            checked={question.required}
                            onChange={(e) =>
                              updateQuestion(question.id, { required: e.target.checked })
                            }
                            className="h-3.5 w-3.5 rounded border-[#D9E1EF] text-[#2F66C8]"
                          />
                          Required field
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-[#8C97AD]" />
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        aria-label="Remove question"
                      >
                        <MoreVertical className="h-5 w-5 text-[#8C97AD]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-[#D9E1EF] py-3.5 text-[14px] font-medium text-[#2F66C8]"
            >
              <Plus className="h-4 w-4" />
              Add New Question
            </button>
            <p className="mt-3 text-center text-[13px] text-[#8C97AD]">
              Drag and drop to reorder questions
            </p>
          </BuilderSectionCard>
        </div>

        <div className="min-w-0 flex-1">
          <BuilderSectionCard
            step={2}
            title="Qualification & Invitation Settings"
            hint="Define how candidates are reviewed and invited."
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <FormLabel>Review Method</FormLabel>
                {REVIEW_METHOD_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.id}
                    title={opt.title}
                    description={opt.description}
                    selected={expressInterestWorkflow.reviewMethod === opt.id}
                    onSelect={() => patch({ reviewMethod: opt.id })}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <FormLabel>Invitation Method</FormLabel>
                {INVITATION_METHOD_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.id}
                    title={opt.title}
                    description={opt.description}
                    selected={expressInterestWorkflow.invitationMethod === opt.id}
                    onSelect={() => patch({ invitationMethod: opt.id })}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-[#EEF2F8] pt-5">
                <ConfigDrawerRow
                  icon={Shield}
                  title="Qualification Criteria"
                  subtitle={`${expressInterestWorkflow.qualificationCriteria.length} criteria selected`}
                />
                <ConfigDrawerRow
                  icon={Bell}
                  title="Notifications"
                  subtitle={`${expressInterestWorkflow.notificationsEnabled.length} notifications enabled`}
                />
                <ConfigDrawerRow
                  icon={SlidersHorizontal}
                  title="Additional Settings"
                  subtitle="Capacity, visibility & more"
                />
              </div>
            </div>
          </BuilderSectionCard>
        </div>
      </div>
    </BuilderPageShell>
  );
}

function ConfigDrawerRow({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Shield;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-[10px] border border-[#EEF2F8] px-4 py-3 text-left hover:bg-[#F8FAFC]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#F6F2FE]">
          <Icon className="h-4 w-4 text-[#573EBF]" />
        </span>
        <span>
          <span className="block text-[14px] font-medium text-[#0F172A]">{title}</span>
          <span className="block text-[13px] text-[#44516A]">{subtitle}</span>
        </span>
      </div>
      <ChevronDown className="h-4 w-4 text-[#8C97AD]" />
    </button>
  );
}
