'use client';

import { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraftSavedSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function DraftSavedSuccessModal({ open, onClose }: DraftSavedSuccessModalProps) {
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="draft-saved-title"
        className={cn(
          'relative z-10 flex w-full flex-col overflow-hidden border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]',
          'rounded-t-[20px] sm:max-w-[720px] sm:rounded-[20px]',
        )}
      >
        <div className="flex items-center justify-end border-b border-[#EEF2F8] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 px-5 py-10 sm:px-[26px]">
          <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#F1FFEE] sm:h-[160px] sm:w-[160px]">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#15803D] sm:h-[112px] sm:w-[112px]">
              <Check className="h-12 w-12 text-white sm:h-14 sm:w-14" strokeWidth={2.5} />
            </div>
          </div>

          <div className="w-full text-center">
            <h2 id="draft-saved-title" className="flex flex-wrap items-baseline justify-center gap-1.5 font-serif">
              <span className="text-[24px] text-[#0F172A] sm:text-[28px]">Draft Saved</span>
              <span className="text-[28px] italic text-[#2F66C8] sm:text-[36px]">Successfully!</span>
            </h2>
            <p className="mt-2.5 text-base text-[#44516A]">
              Your opportunity has been saved as a draft
            </p>
          </div>
        </div>

        <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[45px] w-full items-center justify-center rounded-[6px] bg-[#2F66C8] text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#2454A4]"
          >
            Continue Editing
          </button>
        </div>
      </div>
    </div>
  );
}
