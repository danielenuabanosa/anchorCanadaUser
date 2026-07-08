'use client';

import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { Check, ChevronDown, FileImage, TextCursorInput, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHelpCenterStore } from '@/store/helpCenterStore';
import {
  DEFAULT_REPORT_ATTACHMENTS,
  REPORT_CATEGORY_OPTIONS,
  REPORT_PRIORITY_OPTIONS,
  type ReportAttachment,
} from './helpCenterData';
import {
  HelpModalBackdrop,
  HelpModalFooter,
  HelpModalHeader,
  HelpModalPanel,
} from './HelpCenterShared';

const inputClass = 'anchor-field flex w-full items-center gap-2.5 p-4 text-base text-[#0F172A]';

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

export function ReportIssueModal() {
  const reportOpen = useHelpCenterStore((s) => s.reportOpen);
  const reportSubmitted = useHelpCenterStore((s) => s.reportSubmitted);
  const closeReport = useHelpCenterStore((s) => s.closeReport);
  const submitReport = useHelpCenterStore((s) => s.submitReport);

  const [issueTitle, setIssueTitle] = useState('Unable to publish opportunity');
  const [category, setCategory] = useState<string>(REPORT_CATEGORY_OPTIONS[0]);
  const [priority, setPriority] = useState<string>(REPORT_PRIORITY_OPTIONS[2].label);
  const [description, setDescription] = useState(
    'When I try to publish the opportunity, I get an error message and the opportunity does not go live.',
  );
  const [tryingTo, setTryingTo] = useState('I was trying to publish the Youth Innovation Grant');
  const [attachments, setAttachments] = useState<ReportAttachment[]>(DEFAULT_REPORT_ATTACHMENTS);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!reportOpen || reportSubmitted) return null;

  const priorityColor = REPORT_PRIORITY_OPTIONS.find((p) => p.label === priority)?.color ?? '#8C97AD';

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const next = Array.from(files).map((file, idx) => ({
      id: `${file.name}-${Date.now()}-${idx}`,
      name: file.name,
      size: formatSize(file.size),
    }));
    setAttachments((prev) => [...prev, ...next]);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSubmit() {
    submitReport();
  }

  return (
    <HelpModalBackdrop onClose={closeReport} drawer zIndex={60}>
      <HelpModalPanel width="md" drawer className="min-h-0">
        <HelpModalHeader title="Report an Issue" onClose={closeReport} />

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-[26px] py-10">
        <label className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold leading-[1.8] text-[#0F172A]">
            Issue Title <span className="font-normal text-[#EF4444]">*</span>
          </span>
          <span className={inputClass}>
            <TextCursorInput className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} aria-hidden />
            <input
              type="text"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-[#8C97AD]"
            />
          </span>
        </label>

        <div className="flex w-full flex-col gap-5 md:flex-row md:gap-2.5">
          <label className="flex w-full flex-1 flex-col gap-2.5">
            <span className="flex items-baseline gap-1 text-base font-semibold leading-[1.8] text-[#0F172A]">
              Category <span className="font-normal text-[#EF4444]">*</span>
            </span>
            <span className={cn(inputClass, 'relative')}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full flex-1 appearance-none bg-transparent outline-none"
              >
                {REPORT_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} aria-hidden />
            </span>
          </label>

          <label className="flex w-full flex-1 flex-col gap-2.5">
            <span className="flex items-baseline gap-1 text-base font-semibold leading-[1.8] text-[#0F172A]">
              Priority <span className="font-normal text-[#EF4444]">*</span>
            </span>
            <span className={cn(inputClass, 'relative')}>
              <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: priorityColor }} />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full flex-1 appearance-none bg-transparent outline-none"
              >
                {REPORT_PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} aria-hidden />
            </span>
          </label>
        </div>

        <label className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold leading-[1.8] text-[#0F172A]">
            Description <span className="font-normal text-[#EF4444]">*</span>
          </span>
          <span className="anchor-textarea flex w-full flex-col gap-2.5 p-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
              rows={3}
              className="w-full resize-none bg-transparent text-base text-[#0F172A] outline-none"
            />
            <span className="w-full text-right text-sm text-[#8C97AD]">{description.length} / 1000</span>
          </span>
        </label>

        <label className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold leading-[1.8] text-[#0F172A]">
            What were you trying to o? <span className="font-normal text-[#8C97AD]">(Optional)</span>
          </span>
          <span className={inputClass}>
            <input
              type="text"
              value={tryingTo}
              onChange={(e) => setTryingTo(e.target.value)}
              className="w-full flex-1 bg-transparent outline-none placeholder:text-[#8C97AD]"
            />
            <ChevronDown className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} aria-hidden />
          </span>
        </label>

        <div className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold leading-[1.8] text-[#0F172A]">
            Attachments <span className="font-normal text-[#EF4444]">*</span>
          </span>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              'flex w-full flex-col items-center justify-center gap-2.5 rounded-[10px] border border-dashed px-4 py-10 transition',
              dragOver ? 'border-[#2F66C8] bg-[#EFF4FF]' : 'border-[#D9E1EF] bg-[#F8FAFC]',
            )}
          >
            <p className="text-base text-[#8C97AD]">Drag and drop files here or</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-bold text-[#2F66C8]"
            >
              browse files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
            />
          </div>

          {attachments.length > 0 ? (
            <div className="flex w-full flex-col gap-2.5 md:flex-row">
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex w-full flex-1 items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4"
                >
                  <div className="flex flex-1 items-center gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[#EEF2F8]">
                      <FileImage className="h-5 w-5 text-[#8C97AD]" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="truncate text-base text-[#0F172A]">{file.name}</p>
                      <p className="text-xs text-[#44516A]">{file.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(file.id)}
                    aria-label={`Remove ${file.name}`}
                    className="group flex size-5 shrink-0 items-center justify-center rounded-[10px] bg-[#15803D] transition hover:bg-[#EF4444]"
                  >
                    <Check className="h-4 w-4 text-white group-hover:hidden" strokeWidth={2.5} />
                    <X className="hidden h-4 w-4 text-white group-hover:block" strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        </div>

        <HelpModalFooter align="end">
          <button
            type="button"
            onClick={closeReport}
            className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A] transition hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition hover:bg-[#2554A6]"
          >
            Submit Report
          </button>
        </HelpModalFooter>
      </HelpModalPanel>
    </HelpModalBackdrop>
  );
}
