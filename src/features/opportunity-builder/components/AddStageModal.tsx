'use client';

import { useEffect, useState } from 'react';
import { TextCursorInput, X } from 'lucide-react';
import { STAGE_TYPE_OPTIONS } from '@/features/opportunity-builder/lib/workflowData';
import type { ApplicantVisibility, WorkflowStage } from '@/features/opportunity-builder/lib/workflowData';

interface AddStageModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (stage: Partial<WorkflowStage> & { insertAfterId?: string }) => void;
  stages: WorkflowStage[];
}

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
];

export function AddStageModal({ open, onClose, onAdd, stages }: AddStageModalProps) {
  const [name, setName] = useState('Assessment Review');
  const [description, setDescription] = useState('Assess application based on program criteria');
  const [stageType, setStageType] = useState<string>(STAGE_TYPE_OPTIONS[0] ?? 'Review');
  const [insertAfterId, setInsertAfterId] = useState(stages[stages.length - 1]?.id ?? '');
  const [visibility, setVisibility] = useState<ApplicantVisibility>('visible');

  useEffect(() => {
    if (!open) return;
    setInsertAfterId(stages[stages.length - 1]?.id ?? '');
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, stages]);

  if (!open) return null;

  function handleSubmit() {
    onAdd({
      name,
      description,
      stageType,
      applicantVisibility: visibility,
      insertAfterId,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-[5px]">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />

      <div className="relative flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-[26px] py-5">
          <h2 className="font-sans text-[20px] font-semibold text-[#0F172A]">Add New Stage</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[26px] py-6">
          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block font-sans text-[14px] font-medium text-[#0F172A]">
                Stage Name <span className="text-[#E8242B]">*</span>
              </label>
              <div className="relative">
                <TextCursorInput className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[8px] border border-[#D9E1EF] py-3 pl-10 pr-4 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-sans text-[14px] font-medium text-[#0F172A]">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 250))}
                rows={4}
                className="w-full resize-none rounded-[8px] border border-[#D9E1EF] px-4 py-3 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
              />
              <p className="mt-1 text-right text-[12px] text-[#8C97AD]">{description.length} / 250</p>
            </div>

            <div>
              <label className="mb-2 block font-sans text-[14px] font-medium text-[#0F172A]">
                Stage Type <span className="text-[#E8242B]">*</span>
              </label>
              <select
                value={stageType}
                onChange={(e) => setStageType(e.target.value)}
                className="w-full rounded-[8px] border border-[#D9E1EF] px-4 py-3 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
              >
                {STAGE_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-sans text-[14px] font-medium text-[#0F172A]">
                Insert After <span className="text-[#E8242B]">*</span>
              </label>
              <select
                value={insertAfterId}
                onChange={(e) => setInsertAfterId(e.target.value)}
                className="w-full rounded-[8px] border border-[#D9E1EF] px-4 py-3 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
              >
                {stages.map((stage, index) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name} (Stage {index + 1})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-sans text-[14px] font-medium text-[#0F172A]">Applicant Visibility</p>
              {VISIBILITY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-[10px] border p-4 ${
                    visibility === option.id ? 'border-[#2F66C8] bg-[#F8FAFC]' : 'border-[#EEF2F8] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="stage-visibility"
                    checked={visibility === option.id}
                    onChange={() => setVisibility(option.id)}
                    className="mt-1 h-4 w-4 accent-[#2F66C8]"
                  />
                  <span>
                    <span className="block text-[14px] font-medium text-[#0F172A]">{option.title}</span>
                    <span className="mt-1 block text-[13px] text-[#44516A]">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-[14px] font-medium text-[#44516A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-[14px] font-medium text-white hover:bg-[#2454A4]"
          >
            Add Stage
          </button>
        </div>
      </div>
    </div>
  );
}
