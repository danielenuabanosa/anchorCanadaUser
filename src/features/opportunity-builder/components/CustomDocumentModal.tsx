'use client';

import { useEffect, useState } from 'react';
import { Check, TextCursorInput, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DOCUMENT_TYPE_OPTIONS,
  type DocumentInputKind,
} from '@/features/opportunity-builder/lib/documentRequirementsData';
import { BuilderMenuSelect } from '@/features/opportunity-builder/components/BuilderMenuSelect';

interface CustomDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (doc: {
    title: string;
    description: string;
    inputKind: DocumentInputKind;
    required: boolean;
  }) => void;
}

export function CustomDocumentModal({ open, onClose, onAdd }: CustomDocumentModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inputKind, setInputKind] = useState<DocumentInputKind | ''>('');
  const [required, setRequired] = useState(false);

  function resetAndClose() {
    setTitle('');
    setDescription('');
    setInputKind('');
    setRequired(false);
    onClose();
  }

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTitle('');
        setDescription('');
        setInputKind('');
        setRequired(false);
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const canSubmit = title.trim().length > 0 && inputKind !== '';

  function handleSubmit() {
    if (!canSubmit || !inputKind) return;
    onAdd({
      title: title.trim(),
      description: description.trim(),
      inputKind,
      required,
    });
    resetAndClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px] md:items-stretch md:justify-end md:p-2.5">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close dialog"
        onClick={resetAndClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="custom-document-title"
        className="relative z-10 flex max-h-[calc(100vh-40px)] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] md:h-full md:max-h-none md:w-[720px] md:max-w-[720px]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#EEF2F8] p-[26px]">
          <h2
            id="custom-document-title"
            className="font-sans text-[18px] font-medium text-[#0F172A]"
          >
            Custom Document
          </h2>
          <button
            type="button"
            onClick={resetAndClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-[26px] py-10">
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="custom-doc-name"
              className="flex items-baseline gap-1 text-base leading-[1.8]"
            >
              <span className="font-semibold text-[#0F172A]">Document Name</span>
              <span className="font-normal text-[#EF4444]">*</span>
            </label>
            <div className="flex items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 focus-within:border-[#2F66C8]">
              <TextCursorInput className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" />
              <input
                id="custom-doc-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the name of the document..."
                className="min-w-0 flex-1 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="custom-doc-description"
              className="flex items-baseline gap-1 text-base leading-[1.8]"
            >
              <span className="font-semibold text-[#0F172A]">Description</span>
              <span className="font-normal text-[#8C97AD]">(Shown To Applicants)</span>
            </label>
            <div className="rounded-[10px] border border-[#D9E1EF] bg-white p-4 focus-within:border-[#2F66C8]">
              <textarea
                id="custom-doc-description"
                value={description}
                maxLength={80}
                onChange={(e) => setDescription(e.target.value.slice(0, 80))}
                placeholder="Enter the document description..."
                rows={4}
                className="min-h-[96px] w-full resize-none bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
              />
              <p className="mt-2.5 text-right text-base text-[#8C97AD]">
                {description.length} / 80
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="custom-doc-type"
              className="flex items-baseline gap-1 text-base leading-[1.8]"
            >
              <span className="font-semibold text-[#0F172A]">Document Type</span>
              <span className="font-normal text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <BuilderMenuSelect
                id="custom-doc-type"
                value={inputKind}
                onChange={(v) => setInputKind(v as DocumentInputKind)}
                placeholder="Select document type"
                options={DOCUMENT_TYPE_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
                aria-label="Document Type"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-base font-semibold leading-[1.8] text-[#0F172A]">Required?</p>
            <button
              type="button"
              onClick={() => setRequired((v) => !v)}
              className="flex items-center gap-5 text-left"
              aria-pressed={required}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
                  required ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-[#EEF2F8]',
                )}
                aria-hidden
              >
                {required ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
              </span>
              <span className="text-base text-[#44516A]">Yes, this is required</span>
            </button>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={resetAndClose}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-[14px] font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={cn(
              'rounded-[6px] px-5 py-3 text-[14px] font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
              canSubmit
                ? 'bg-[#2F66C8] hover:bg-[#2557AD]'
                : 'cursor-not-allowed bg-[#2F66C8]/50',
            )}
          >
            Add Document
          </button>
        </div>
      </div>
    </div>
  );
}
