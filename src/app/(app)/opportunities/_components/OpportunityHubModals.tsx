'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Archive,
  CalendarDays,
  ChevronDown,
  Pause,
  TextCursorInput,
  Trash2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatePickerField, parseIsoDate } from '@/shared/components/ui/DatePicker';
import type { OpportunityRow } from './opportunitiesHubData';

const PAUSE_REASONS = [
  'Temporarily closed for applications',
  'Capacity reached',
  'Needs content updates',
  'Compliance review',
  'Other',
] as const;

function useModalLock(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
}

function OpportunityModalShell({
  open,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  useModalLock(open, onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px]">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[calc(100vh-40px)] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)] lg:max-w-[720px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-end border-b border-[#EEF2F8] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEF2F8] bg-white text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center overflow-y-auto px-[26px] py-10">{children}</div>
        <div className="flex shrink-0 items-center justify-end gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          {footer}
        </div>
      </div>
    </div>
  );
}

function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A] transition-colors hover:bg-[#F8FAFC]"
    >
      Cancel
    </button>
  );
}

function TitleBlock({
  lead,
  accent,
  description,
  opportunityName,
}: {
  lead: string;
  accent: string;
  description: string;
  opportunityName?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2.5 text-center">
      <div className="flex flex-wrap items-baseline justify-center gap-1.5">
        <span className="font-serif text-[28px] text-[#0F172A] lg:text-[36px]">{lead}</span>
        <span className="font-serif text-[36px] italic text-[#2F66C8] lg:text-[44px]">{accent}</span>
      </div>
      <p className="text-base text-[#44516A]">{description}</p>
      {opportunityName ? (
        <p className="text-sm text-[#8C97AD]">
          {lead === 'Pause' ? 'Pausing' : lead === 'Archive' ? 'Archiving' : lead === 'Extend' ? 'Extending' : 'Deleting'}{' '}
          <span className="font-semibold text-[#0F172A]">{opportunityName}</span>
        </p>
      ) : null}
    </div>
  );
}

function IconCircle({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: 'red' | 'amber' | 'slate' | 'blue';
}) {
  const tones = {
    red: 'bg-[#FEF2F2] text-[#EF4444]',
    amber: 'bg-[#FFFBEB] text-[#F59E0B]',
    slate: 'bg-[#F8FAFC] text-[#44516A]',
    blue: 'bg-[#EFF4FF] text-[#2F66C8]',
  };
  return (
    <div className={cn('flex h-40 w-40 shrink-0 items-center justify-center rounded-full p-4', tones[tone])}>
      {children}
    </div>
  );
}

export function ArchiveOpportunityModal({
  open,
  opportunity,
  onClose,
  onConfirm,
}: {
  open: boolean;
  opportunity: OpportunityRow | null;
  onClose: () => void;
  onConfirm?: () => void;
}) {
  const [note, setNote] = useState('');

  useEffect(() => {
    if (open) setNote('');
  }, [open]);

  return (
    <OpportunityModalShell
      open={open}
      onClose={onClose}
      footer={
        <>
          <CancelButton onClick={onClose} />
          <button
            type="button"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#1D4ED8]"
          >
            Archive
          </button>
        </>
      }
    >
      <div className="flex w-full flex-col items-center gap-5">
        <IconCircle tone="slate">
          <Archive className="h-16 w-16" strokeWidth={1.5} />
        </IconCircle>
        <TitleBlock
          lead="Archive"
          accent="Opportunity"
          description="Archived opportunities will be hidden from public view but retained in records."
          opportunityName={opportunity?.name}
        />
        <label className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold text-[#0F172A]">
            Notes <span className="font-normal text-[#8C97AD]">(Optional)</span>
          </span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add your notes here..."
            className="h-[84px] w-full resize-none rounded-[10px] border border-[#D9E1EF] bg-white p-4 text-base text-[#0F172A] outline-none transition-colors placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
          />
        </label>
      </div>
    </OpportunityModalShell>
  );
}

export function DeleteOpportunityModal({
  open,
  opportunity,
  onClose,
  onConfirm,
}: {
  open: boolean;
  opportunity: OpportunityRow | null;
  onClose: () => void;
  onConfirm?: () => void;
}) {
  const [confirmText, setConfirmText] = useState('');
  const canDelete = confirmText === 'DELETE';
  const isDraft = opportunity?.status === 'Draft';

  useEffect(() => {
    if (open) setConfirmText('');
  }, [open]);

  return (
    <OpportunityModalShell
      open={open}
      onClose={onClose}
      footer={
        <>
          <CancelButton onClick={onClose} />
          <button
            type="button"
            disabled={!canDelete}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className={cn(
              'rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition-colors',
              canDelete ? 'bg-[#EF4444] hover:bg-[#DC2626]' : 'cursor-not-allowed bg-[#FCA5A5]',
            )}
          >
            {isDraft ? 'Delete Draft' : 'Delete'}
          </button>
        </>
      }
    >
      <div className="flex w-full flex-col items-center gap-5">
        <IconCircle tone="red">
          <Trash2 className="h-16 w-16" strokeWidth={1.5} />
        </IconCircle>
        <TitleBlock
          lead="Delete"
          accent="Opportunity"
          description="This action cannot be undone. All associated data will be permanently deleted."
          opportunityName={opportunity?.name}
        />
        <label className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold text-[#0F172A]">
            Type DELETE to confirm <span className="font-normal text-[#B91C1C]">*</span>
          </span>
          <span className="flex h-[50px] w-full items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white px-4 transition-colors focus-within:border-[#2F66C8]">
            <TextCursorInput className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" />
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type "DELETE"...'
              className="min-w-0 flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
          </span>
        </label>
      </div>
    </OpportunityModalShell>
  );
}

export function PauseOpportunityModal({
  open,
  opportunity,
  onClose,
  onConfirm,
}: {
  open: boolean;
  opportunity: OpportunityRow | null;
  onClose: () => void;
  onConfirm?: () => void;
}) {
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [reasonOpen, setReasonOpen] = useState(false);
  const reasonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setReason('');
      setNote('');
      setReasonOpen(false);
    }
  }, [open]);

  useEffect(() => {
    if (!reasonOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (reasonRef.current && !reasonRef.current.contains(e.target as Node)) setReasonOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [reasonOpen]);

  const canPause = Boolean(reason);

  return (
    <OpportunityModalShell
      open={open}
      onClose={onClose}
      footer={
        <>
          <CancelButton onClick={onClose} />
          <button
            type="button"
            disabled={!canPause}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className={cn(
              'rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition-colors',
              canPause ? 'bg-[#EF4444] hover:bg-[#DC2626]' : 'cursor-not-allowed bg-[#FCA5A5]',
            )}
          >
            Pause
          </button>
        </>
      }
    >
      <div className="flex w-full flex-col items-center gap-5">
        <IconCircle tone="amber">
          <Pause className="h-16 w-16" strokeWidth={1.5} />
        </IconCircle>
        <TitleBlock
          lead="Pause"
          accent="Opportunity"
          description="The opportunity will be hidden from users and new applications will be blocked."
          opportunityName={opportunity?.name}
        />

        <div className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold text-[#0F172A]">
            Reason <span className="font-normal text-[#EF4444]">*</span>
          </span>
          <div ref={reasonRef} className="relative w-full">
            <button
              type="button"
              onClick={() => setReasonOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 text-left text-base transition-colors hover:border-[#8C97AD]"
            >
              <span className={reason ? 'text-[#0F172A]' : 'text-[#8C97AD]'}>
                {reason || 'Select reason'}
              </span>
              <ChevronDown className="h-[18px] w-[18px] shrink-0 text-[#44516A]" />
            </button>
            {reasonOpen ? (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
                {PAUSE_REASONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setReason(r);
                      setReasonOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
                  >
                    {r}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <label className="flex w-full flex-col gap-2.5">
          <span className="flex items-baseline gap-1 text-base font-semibold text-[#0F172A]">
            Notes <span className="font-normal text-[#8C97AD]">(Optional)</span>
          </span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add your notes here..."
            className="h-[84px] w-full resize-none rounded-[10px] border border-[#D9E1EF] bg-white p-4 text-base text-[#0F172A] outline-none transition-colors placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
          />
        </label>
      </div>
    </OpportunityModalShell>
  );
}

function parseDisplayDeadline(deadline: string) {
  if (!deadline || deadline === '-' || deadline === '—') return '';
  const parsed = parseIsoDate(deadline) ?? (() => {
    const d = new Date(deadline);
    return Number.isNaN(d.getTime()) ? null : d;
  })();
  if (!parsed) return '';
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
}

export function ExtendDeadlineModal({
  open,
  opportunity,
  onClose,
  onConfirm,
}: {
  open: boolean;
  opportunity: OpportunityRow | null;
  onClose: () => void;
  onConfirm?: (payload: { date: string }) => void;
}) {
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!open) return;
    setDate(parseDisplayDeadline(opportunity?.deadline ?? ''));
  }, [open, opportunity]);

  const canExtend = useMemo(() => Boolean(date), [date]);

  return (
    <OpportunityModalShell
      open={open}
      onClose={onClose}
      footer={
        <>
          <CancelButton onClick={onClose} />
          <button
            type="button"
            disabled={!canExtend}
            onClick={() => {
              onConfirm?.({ date });
              onClose();
            }}
            className={cn(
              'rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition-colors',
              canExtend ? 'bg-[#2F66C8] hover:bg-[#1D4ED8]' : 'cursor-not-allowed bg-[#2F66C8]/40',
            )}
          >
            Extend Deadline
          </button>
        </>
      }
    >
      <div className="flex w-full flex-col items-center gap-5">
        <IconCircle tone="blue">
          <CalendarDays className="h-16 w-16" strokeWidth={1.5} />
        </IconCircle>
        <TitleBlock
          lead="Extend"
          accent="Deadline"
          description="Choose a new application deadline. Existing applicants will keep their current status."
          opportunityName={opportunity?.name}
        />

        {opportunity?.deadline && opportunity.deadline !== '-' && opportunity.deadline !== '—' ? (
          <p className="text-sm text-[#8C97AD]">
            Current deadline: <span className="font-medium text-[#0F172A]">{opportunity.deadline}</span>
          </p>
        ) : null}

        <label className="flex w-full flex-col gap-2.5">
          <span className="text-base font-semibold leading-[1.8] text-[#0F172A]">
            New Deadline <span className="font-normal text-[#EF4444]">*</span>
          </span>
          <DatePickerField
            value={date}
            onChange={setDate}
            required
            placeholder="Select new deadline"
          />
        </label>
      </div>
    </OpportunityModalShell>
  );
}
