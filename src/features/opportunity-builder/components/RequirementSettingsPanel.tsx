'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { RequirementField } from '@/features/opportunity-builder/lib/requirementsData';
import { FILE_FORMAT_OPTIONS, getRequirementType } from '@/features/opportunity-builder/lib/requirementsData';
import { cn } from '@/lib/utils';
interface RequirementSettingsPanelProps {
  field: RequirementField | null;
  open: boolean;
  onClose: () => void;
  onSave: (patch: Partial<RequirementField>) => void;
}

export function RequirementSettingsPanel({
  field,
  open,
  onClose,
  onSave,
}: RequirementSettingsPanelProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [helpText, setHelpText] = useState('');
  const [required, setRequired] = useState(true);
  const [formats, setFormats] = useState<string[]>([]);

  const isFileType = field?.typeId.includes('upload') || field?.typeId === 'resume' || field?.typeId === 'cover-letter' || field?.typeId === 'portfolio' || field?.typeId === 'proposal';

  useEffect(() => {
    if (!field) return;
    setTitle(field.title);
    setDescription(field.description);
    setHelpText(field.helpText ?? '');
    setRequired(field.required);
    setFormats(field.acceptedFormats ?? ['PDF', 'DOCX', 'DOC']);
  }, [field]);

  if (!open || !field) return null;

  const typeDef = getRequirementType(field.typeId);
  const TypeIcon = typeDef?.icon;

  function toggleFormat(fmt: string) {    setFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt],
    );
  }

  function handleSave() {
    onSave({
      title,
      description,
      helpText,
      required,
      acceptedFormats: isFileType ? formats : undefined,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-[#0F172A]/60 backdrop-blur-[5px]">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close settings" />
      <aside className="relative flex h-full w-full max-w-[480px] flex-col overflow-hidden rounded-l-[20px] border-l border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-4">
          <h2 className="font-sans text-[20px] font-semibold text-[#0F172A]">Requirement Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-[#EEF2F8] bg-[#F8FAFC] px-5 py-4">
          <div className="flex items-center gap-4">
            {TypeIcon ? (
              <div
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[10px]"
                style={{ backgroundColor: typeDef?.iconBg ?? '#EFF4FF' }}
              >
                <TypeIcon className="h-6 w-6" style={{ color: typeDef?.iconColor ?? '#2F66C8' }} />
              </div>
            ) : null}
            <div className="min-w-0">
              <p className="truncate font-sans text-[16px] font-medium text-[#0F172A]">{field.title}</p>
              <p className="mt-1 font-sans text-[13px] text-[#8C97AD]">{typeDef?.title ?? field.typeId}</p>
            </div>
            <span
              className={cn(
                'ml-auto shrink-0 rounded-[6px] px-2.5 py-1 text-[12px] font-medium',
                field.required
                  ? 'border border-[#D1FAE5] bg-[#ECFDF5] text-[#15803D]'
                  : 'border border-[#EEF2F8] bg-white text-[#44516A]',
              )}
            >
              {field.required ? 'Required' : 'Optional'}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] font-medium text-[#0F172A]">
                Requirement Label <span className="text-[#E8242B]">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-[8px] border border-[#D9E1EF] px-4 py-3 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] font-medium text-[#0F172A]">
                Description <span className="text-[13px] font-normal text-[#8C97AD]">(Shown To Applicants)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={250}
                rows={4}
                className="w-full resize-none rounded-[8px] border border-[#D9E1EF] px-4 py-3 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
              />
              <p className="text-right text-[12px] text-[#8C97AD]">{description.length} / 250</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] font-medium text-[#0F172A]">
                Help Text <span className="text-[13px] font-normal text-[#8C97AD]">(Optional)</span>
              </label>
              <textarea
                value={helpText}
                onChange={(e) => setHelpText(e.target.value)}
                maxLength={120}
                rows={3}
                placeholder="Provide guidance to help applicants complete this requirement."
                className="w-full resize-none rounded-[8px] border border-[#D9E1EF] px-4 py-3 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
              />
              <p className="text-right text-[12px] text-[#8C97AD]">{helpText.length} / 120</p>
            </div>

            {isFileType && (
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[14px] font-medium text-[#0F172A]">
                  Accepted File Formats <span className="text-[#E8242B]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {FILE_FORMAT_OPTIONS.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => toggleFormat(fmt)}
                      className={cn(
                        'rounded-[6px] border px-3 py-1.5 text-[13px] font-medium transition-colors',
                        formats.includes(fmt)
                          ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                          : 'border-[#D9E1EF] bg-white text-[#44516A]',
                      )}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="font-sans text-[14px] font-medium text-[#0F172A]">Requirement Type</label>
              <div className="flex gap-2">
                {(['Required', 'Optional'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRequired(opt === 'Required')}
                    className={cn(
                      'flex-1 rounded-[6px] border py-2.5 text-[14px] font-medium',
                      (opt === 'Required') === required
                        ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                        : 'border-[#D9E1EF] bg-white text-[#44516A]',
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-[#EEF2F8] bg-[#F8FAFC] px-5 py-4">          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[6px] border border-[#D9E1EF] bg-white py-3 text-[14px] font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-[6px] bg-[#2F66C8] py-3 text-[14px] font-medium text-white hover:bg-[#2454A4]"
          >
            Save Changes
          </button>
        </div>
      </aside>
    </div>
  );
}
