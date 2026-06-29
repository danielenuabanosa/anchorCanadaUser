'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  FileText,
  FolderOpen,
  GripVertical,
  Info,
  MoreVertical,
  Plus,
  Send,
} from 'lucide-react';
import { AddStageModal } from '@/features/opportunity-builder/components/AddStageModal';
import { BuilderDeleteModal } from '@/features/opportunity-builder/components/BuilderDeleteModal';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import {
  BuilderPageShell,
  BuilderSectionCard,
  FormLabel,
  RadioRow,
  SelectInput,
  TextArea,
  TextInput,
  ToggleRow,
} from '@/features/opportunity-builder/components/BuilderPageShell';
import {
  REVIEWER_OPTIONS,
  STAGE_ACTIONS,
  STAGE_TYPE_OPTIONS,
  STATUS_LABEL_OPTIONS,
  createDefaultStage,
  type ApplicantVisibility,
  type WorkflowStage,
} from '@/features/opportunity-builder/lib/workflowData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

const VISIBILITY_OPTIONS: { id: ApplicantVisibility; title: string; description: string }[] = [
  {
    id: 'visible',
    title: 'Visible to Applicant',
    description: 'Applicants can see this stage in their progress.',
  },
  {
    id: 'hidden',
    title: 'Hidden from Applicant',
    description: 'Applicants will not see this stage.',
  },
  {
    id: 'invite-only',
    title: 'Invite Only',
    description: 'Only invited applicants can apply.',
  },
];

const ACTION_ICONS: Record<string, typeof Calendar> = {
  'Schedule Interview': Calendar,
  'Request Documents': FolderOpen,
  'Leave Notes': FileText,
  'Assign Reviewer': Send,
};

function updateStage(stages: WorkflowStage[], stageId: string, patch: Partial<WorkflowStage>) {
  return stages.map((s) => (s.id === stageId ? { ...s, ...patch } : s));
}

export function InternalWorkflowContent() {
  const router = useRouter();
  const { internalWorkflow, setBuilderData } = useOpportunityBuilderStore();
  const { stages, selectedStageId } = internalWorkflow;
  const [addStageOpen, setAddStageOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WorkflowStage | null>(null);

  const selectedStage = useMemo(
    () => stages.find((s) => s.id === selectedStageId) ?? stages[0] ?? null,
    [stages, selectedStageId],
  );

  const selectedIndex = selectedStage ? stages.findIndex((s) => s.id === selectedStage.id) : -1;

  function setStages(next: WorkflowStage[]) {
    setBuilderData({ internalWorkflow: { ...internalWorkflow, stages: next } });
  }

  function patchSelected(patch: Partial<WorkflowStage>) {
    if (!selectedStage) return;
    setStages(updateStage(stages, selectedStage.id, patch));
  }

  function addStageFromModal(partial: Partial<WorkflowStage> & { insertAfterId?: string }) {
    const stage = createDefaultStage({
      name: partial.name,
      description: partial.description,
      stageType: partial.stageType,
      applicantVisibility: partial.applicantVisibility,
    });
    const insertIndex = stages.findIndex((s) => s.id === partial.insertAfterId);
    const next = [...stages];
    if (insertIndex >= 0) next.splice(insertIndex + 1, 0, stage);
    else next.push(stage);
    setBuilderData({
      internalWorkflow: {
        stages: next,
        selectedStageId: stage.id,
      },
    });
  }

  function removeStage(stageId: string) {
    if (stages.length <= 1) return;
    const next = stages.filter((s) => s.id !== stageId);
    setBuilderData({
      internalWorkflow: {
        stages: next,
        selectedStageId: selectedStageId === stageId ? next[0]?.id ?? null : selectedStageId,
      },
    });
  }

  return (
    <BuilderPageShell
      step={5}
      backHref="/opportunities/create/workflow"
      onContinue={() => router.push('/opportunities/create/review')}
    >
      <BuilderPageHeading
        title={BUILDER_PAGE_COPY.internalWorkflow.title}
        titleAccent={BUILDER_PAGE_COPY.internalWorkflow.titleAccent}
        subtitle={BUILDER_PAGE_COPY.internalWorkflow.subtitle}
      />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="w-full shrink-0 lg:w-[520px]">
          <BuilderSectionCard
            step={1}
            title={
              <span className="inline-flex items-center gap-2.5">
                Workflow Stages
                <Info className="h-4 w-4 text-[#8C97AD]" />
              </span>
            }
            hint="Drag to reorder stages"
          >
            <div className="flex flex-col gap-2.5">
              {stages.map((stage, index) => {
                const isSelected = stage.id === selectedStage?.id;
                return (
                  <div
                    key={stage.id}
                    className={`flex items-center justify-between rounded-[10px] border p-4 ${
                      isSelected ? 'border-[#2F66C8] bg-[#F8FAFC]' : 'border-[#EEF2F8] bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setBuilderData({
                          internalWorkflow: { ...internalWorkflow, selectedStageId: stage.id },
                        })
                      }
                      className="flex min-w-0 flex-1 items-center gap-3.5 text-left"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[16px] font-medium ${
                          isSelected
                            ? 'border border-[#EEF2F8] bg-white text-[#0F172A]'
                            : 'border border-[#EEF2F8] bg-white text-[#0F172A]'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-medium text-[#0F172A]">
                          {stage.name}
                        </span>
                        <span className="mt-1.5 inline-flex rounded-[4px] border border-[#D1FAE5] bg-[#ECFDF5] px-1.5 py-0.5 text-[12px] font-medium text-[#15803D]">
                          {stage.applicantVisibility === 'hidden' ? 'Hidden' : 'Visible'}
                        </span>
                      </span>
                    </button>
                    <div className="flex items-center gap-4 pl-2">
                      <GripVertical className="h-6 w-6 text-[#8C97AD]" />
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(stage)}
                        className="text-[#8C97AD] hover:text-[#EF4444]"
                        aria-label={`Remove ${stage.name}`}
                      >
                        <MoreVertical className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setAddStageOpen(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#EEF2F8] py-3.5 text-[14px] font-medium text-[#2F66C8] hover:bg-[#F8FAFC]"
            >
              <Plus className="h-4 w-4" />
              Add New Stage
            </button>
          </BuilderSectionCard>
        </div>

        {selectedStage && (
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
              <div className="flex flex-col gap-3 border-b border-[#EEF2F8] px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[4px] bg-[#2F66C8] text-[16px] font-medium text-white">
                      2
                    </span>
                    <p className="font-sans text-[16px] font-medium text-[#0F172A]">Stage Configuration</p>
                  </div>
                  <span className="rounded-[4px] border border-[#E5E1FC] bg-[#F6F2FE] px-1.5 py-0.5 text-[14px] font-medium text-[#573EBF]">
                    Stage {selectedIndex + 1} of {stages.length}
                  </span>
                </div>
                <p className="text-[14px] text-[#44516A]">Configure the selected stage</p>
              </div>

              <div className="flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-2.5">
                  <FormLabel required>Stage Name</FormLabel>
                  <TextInput
                    value={selectedStage.name}
                    onChange={(name) => patchSelected({ name })}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <FormLabel>Description</FormLabel>
                  <TextArea
                    value={selectedStage.description}
                    onChange={(description) => patchSelected({ description })}
                    maxLength={250}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2.5">
                    <FormLabel required>Status Label</FormLabel>
                    <SelectInput
                      value={selectedStage.statusLabel}
                      onChange={(statusLabel) => patchSelected({ statusLabel })}
                    >
                      {STATUS_LABEL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <FormLabel required>Stage Type</FormLabel>
                    <SelectInput
                      value={selectedStage.stageType}
                      onChange={(stageType) => patchSelected({ stageType })}
                    >
                      {STAGE_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <FormLabel required>Assigned Reviewer</FormLabel>
                  <SelectInput
                    value={selectedStage.assignedReviewer}
                    onChange={(assignedReviewer) => patchSelected({ assignedReviewer })}
                  >
                    {REVIEWER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </SelectInput>
                  <button type="button" className="text-left text-[14px] font-medium text-[#2F66C8]">
                    + Add Backup Reviewer
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  <FormLabel>Applicant Visibility</FormLabel>
                  {VISIBILITY_OPTIONS.map((opt) => (
                    <RadioRow
                      key={opt.id}
                      title={opt.title}
                      description={opt.description}
                      selected={selectedStage.applicantVisibility === opt.id}
                      onSelect={() => patchSelected({ applicantVisibility: opt.id })}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-[#EEF2F8] pt-5">
                  <FormLabel>Automation & Notifications</FormLabel>
                  <ToggleRow
                    label="Notify applicant when they enter this stage"
                    checked={selectedStage.notifyApplicant}
                    onChange={(notifyApplicant) => patchSelected({ notifyApplicant })}
                  />
                  <ToggleRow
                    label="Notify assigned reviewer(s)"
                    checked={selectedStage.notifyReviewer}
                    onChange={(notifyReviewer) => patchSelected({ notifyReviewer })}
                  />
                  <ToggleRow
                    label="Notify organization admins"
                    checked={selectedStage.notifyAdmins}
                    onChange={(notifyAdmins) => patchSelected({ notifyAdmins })}
                  />
                  <ToggleRow
                    label="Custom notification message (optional)"
                    checked={selectedStage.customNotification}
                    onChange={(customNotification) => patchSelected({ customNotification })}
                  />
                  <ToggleRow
                    label="Require manual approval to move forward"
                    checked={selectedStage.requireManualApproval}
                    onChange={(requireManualApproval) => patchSelected({ requireManualApproval })}
                  />
                  <ToggleRow
                    label="Allow reviewer to move to the next stage"
                    checked={selectedStage.allowReviewerAdvance}
                    onChange={(allowReviewerAdvance) => patchSelected({ allowReviewerAdvance })}
                  />
                  <ToggleRow
                    label={`Auto advance after ${selectedStage.autoAdvanceDays ?? 3} days`}
                    checked={selectedStage.autoAdvanceDays != null}
                    onChange={(checked) =>
                      patchSelected({ autoAdvanceDays: checked ? selectedStage.autoAdvanceDays ?? 3 : null })
                    }
                  />
                  <ToggleRow
                    label="Skip stage if not applicable"
                    checked={selectedStage.skipIfNotApplicable}
                    onChange={(skipIfNotApplicable) => patchSelected({ skipIfNotApplicable })}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <FormLabel>Actions Available at This Stage</FormLabel>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                    {STAGE_ACTIONS.map((action) => {
                      const Icon = ACTION_ICONS[action] ?? FileText;
                      const active = selectedStage.actions.includes(action);
                      return (
                        <button
                          key={action}
                          type="button"
                          onClick={() => {
                            const actions = active
                              ? selectedStage.actions.filter((a) => a !== action)
                              : [...selectedStage.actions, action];
                            patchSelected({ actions });
                          }}
                          className={`flex flex-col items-center gap-2.5 rounded-[10px] border px-2.5 py-4 text-center ${
                            active
                              ? 'border-[#2F66C8] bg-[#F8FAFC]'
                              : 'border-[#EEF2F8] bg-white'
                          }`}
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-[#EFF4FF]">
                            <Icon className="h-6 w-6 text-[#2F66C8]" />
                          </span>
                          <span className="text-[12px] font-medium leading-tight text-[#0F172A]">
                            {action}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      className="flex flex-col items-center gap-2.5 rounded-[10px] border border-[#EEF2F8] bg-white px-2.5 py-4 text-center"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-[#EFF4FF]">
                        <Plus className="h-6 w-6 text-[#2F66C8]" />
                      </span>
                      <span className="text-[12px] font-medium leading-tight text-[#2F66C8]">Add Action</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-[#EEF2F8] bg-[#F8FAFC] px-5 py-4">
                <button
                  type="button"
                  className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-[14px] font-medium text-white shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddStageModal
        open={addStageOpen}
        onClose={() => setAddStageOpen(false)}
        onAdd={addStageFromModal}
        stages={stages}
      />

      <BuilderDeleteModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) removeStage(deleteTarget.id);
        }}
        accentWord="Stage"
        descriptionLines={[
          'This action may affect your application workflow and applicant experience.',
          'This action cannot be undone.',
        ]}
        itemTitle={deleteTarget?.name ?? ''}
        itemSubtitle={deleteTarget?.description}
        itemBadge={deleteTarget?.stageType}
        confirmLabel="Delete Stage"
      />
    </BuilderPageShell>
  );
}
