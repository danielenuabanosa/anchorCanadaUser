'use client';

import { useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublishConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPublishing?: boolean;
}

export function PublishConfirmModal({
  open,
  onClose,
  onConfirm,
  isPublishing = false,
}: PublishConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isPublishing) onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, isPublishing]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0"
        onClick={isPublishing ? undefined : onClose}
        aria-label="Close dialog"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-confirm-title"
        className={cn(
          'relative z-10 flex w-full flex-col overflow-hidden border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]',
          'rounded-t-[20px] sm:max-w-[720px] sm:rounded-[20px]',
        )}
      >
        <div className="flex items-center justify-end border-b border-[#EEF2F8] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            disabled={isPublishing}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC] disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 px-5 py-10 sm:px-[26px]">
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#FFF1E6] sm:h-[130px] sm:w-[130px]">
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F97316] sm:h-[82px] sm:w-[82px]">
              <Info className="h-10 w-10 text-white" strokeWidth={2.5} />
            </span>
          </div>

          <div className="w-full text-center">
            <h2
              id="publish-confirm-title"
              className="flex flex-wrap items-baseline justify-center gap-1.5 font-serif"
            >
              <span className="text-[24px] text-[#0F172A] sm:text-[28px]">Ready to</span>
              <span className="text-[28px] italic text-[#2F66C8] sm:text-[36px]">Publish?</span>
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-[#44516A]">
              This opportunity will become visible to applicants immediately.
              <br />
              <br />
              You won&apos;t be able to make changes after publishing.
            </p>
          </div>
        </div>

        <div className="flex gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            disabled={isPublishing}
            className="flex h-[45px] flex-1 items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-sm font-medium text-[#44516A] hover:bg-white disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPublishing}
            className="flex h-[45px] flex-1 items-center justify-center rounded-[6px] bg-[#2F66C8] text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#2454A4] disabled:opacity-50"
          >
            {isPublishing ? 'Publishing…' : 'Publish Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
