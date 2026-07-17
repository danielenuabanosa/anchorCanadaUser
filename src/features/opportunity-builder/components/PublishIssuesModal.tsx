'use client';

import { useEffect } from 'react';
import { Check, TriangleAlert, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PublishIssue {
  id: string;
  message: string;
  href?: string;
}

interface PublishIssuesModalProps {
  open: boolean;
  onClose: () => void;
  onGoToIssues: () => void;
  issues: PublishIssue[];
}

export function PublishIssuesModal({
  open,
  onClose,
  onGoToIssues,
  issues,
}: PublishIssuesModalProps) {
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

  const count = issues.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-issues-title"
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
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#FFF1E6] sm:h-[130px] sm:w-[130px]">
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F97316] sm:h-[82px] sm:w-[82px]">
              <TriangleAlert className="h-10 w-10 text-white" strokeWidth={2.25} />
            </span>
          </div>

          <div className="w-full text-center">
            <h2
              id="publish-issues-title"
              className="flex flex-wrap items-baseline justify-center gap-1.5 font-serif"
            >
              <span className="text-[24px] text-[#0F172A] sm:text-[28px]">
                {count} {count === 1 ? 'Issue' : 'Issues'}
              </span>
              <span className="text-[28px] italic text-[#2F66C8] sm:text-[36px]">Found</span>
            </h2>
            <p className="mt-2.5 text-base text-[#44516A]">
              Please fix the following issues before publishing
            </p>
          </div>

          <div className="w-full rounded-[10px] bg-[#FFF1E6] p-4">
            <ul className="flex flex-col gap-3">
              {issues.map((issue) => (
                <li key={issue.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B45309]">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-[#0F172A]">{issue.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onGoToIssues}
            className="flex h-[45px] w-full items-center justify-center rounded-[6px] bg-[#EF4444] text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#DC2626]"
          >
            Go To Issues
          </button>
        </div>
      </div>
    </div>
  );
}
