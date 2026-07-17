'use client';

import { useEffect } from 'react';
import { FileText, Trash2, X } from 'lucide-react';

export interface BuilderDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** Text before the italic accent, e.g. "Delete Custom" */
  titleLead?: string;
  accentWord: string;
  descriptionLines: string[];
  itemTitle: string;
  itemSubtitle?: string;
  /** Single badge (legacy); prefer itemBadges when multiple chips are needed */
  itemBadge?: string;
  itemBadges?: string[];
  confirmLabel: string;
  createdLabel?: string;
}

export function BuilderDeleteModal({
  open,
  onClose,
  onConfirm,
  titleLead = 'Delete',
  accentWord,
  descriptionLines,
  itemTitle,
  itemSubtitle,
  itemBadge,
  itemBadges,
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

  const badges = itemBadges?.length ? itemBadges : itemBadge ? [itemBadge] : [];

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
                {titleLead}{' '}
                <span className="font-serif text-[36px] italic text-[#2F66C8]">{accentWord}</span>
              </h2>
              <div className="mt-2.5 space-y-1 font-sans text-[14px] font-medium text-[#44516A]">
                {descriptionLines.map((line, index) => (
                  <p key={line} className={index > 0 ? 'text-[#8C97AD]' : undefined}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[13px] bg-[#FEF2F2]">
                  <FileText className="h-8 w-8 text-[#EF4444]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-sans text-[18px] font-medium text-[#0F172A]">
                    {itemTitle}
                  </p>
                  {itemSubtitle ? (
                    <p className="mt-1 line-clamp-2 font-sans text-[12px] text-[#44516A]">
                      {itemSubtitle}
                    </p>
                  ) : null}
                  {badges.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2.5">
                      {badges.map((badge) => {
                        const isRequired = badge === 'Required';
                        return (
                          <span
                            key={badge}
                            className={
                              isRequired
                                ? 'rounded-[4px] border border-[#DCE7FF] bg-[#EFF4FF] px-1.5 py-0.5 text-[12px] font-medium text-[#2F66C8]'
                                : 'rounded-[4px] border border-[#EEF2F8] bg-[#F8FAFC] px-1.5 py-0.5 text-[12px] font-medium text-[#44516A]'
                            }
                          >
                            {badge}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>

              {createdLabel ? (
                <p className="shrink-0 text-[12px] text-[#8C97AD] sm:text-right">
                  Created: <span className="text-[#44516A]">{createdLabel}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-[14px] font-medium text-[#44516A] hover:bg-white sm:flex-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 rounded-[6px] bg-[#EF4444] px-5 py-3 text-[14px] font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#DC2626] sm:flex-none"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
