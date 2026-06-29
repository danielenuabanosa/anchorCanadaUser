'use client';

import { useEffect } from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

export interface BuilderDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  accentWord: string;
  descriptionLines: string[];
  itemTitle: string;
  itemSubtitle?: string;
  itemBadge?: string;
  confirmLabel: string;
  createdLabel?: string;
}

export function BuilderDeleteModal({
  open,
  onClose,
  onConfirm,
  accentWord,
  descriptionLines,
  itemTitle,
  itemSubtitle,
  itemBadge,
  confirmLabel,
  createdLabel,
}: BuilderDeleteModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-[5px]">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />

      <div className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-end border-b border-[#EEF2F8] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-10 px-[26px] py-10">
          <div className="flex w-full flex-col items-center gap-5">
            <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-[#FEF2F2]">
              <Trash2 className="h-16 w-16 text-[#EF4444]" strokeWidth={1.5} />
            </div>

            <div className="w-full text-center">
              <h2 className="font-serif text-[28px] leading-normal text-[#0F172A]">
                Delete{' '}
                <span className="font-serif text-[36px] italic text-[#2F66C8]">{accentWord}</span>
              </h2>
              <div className="mt-2.5 space-y-1 font-sans text-[14px] font-medium text-[#44516A]">
                {descriptionLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
            <div className="flex items-center justify-between gap-3">
              {itemBadge ? (
                <span className="rounded-[6px] border border-[#D1FAE5] bg-[#ECFDF5] px-2.5 py-1.5 text-[12px] font-medium text-[#15803D]">
                  {itemBadge}
                </span>
              ) : (
                <span />
              )}
              {createdLabel ? (
                <p className="text-[12px] text-[#44516A]">
                  <span className="text-[#8C97AD]">Created: </span>
                  {createdLabel}
                </p>
              ) : null}
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[13px] bg-[#FEF2F2]">
                  <AlertCircle className="h-8 w-8 text-[#EF4444]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-sans text-[18px] font-medium text-[#0F172A]">{itemTitle}</p>
                  {itemSubtitle ? (
                    <p className="mt-2 font-sans text-[12px] text-[#44516A]">{itemSubtitle}</p>
                  ) : null}
                </div>
              </div>
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
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-[6px] bg-[#EF4444] px-5 py-3 text-[14px] font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#DC2626]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
