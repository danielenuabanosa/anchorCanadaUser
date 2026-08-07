'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, ChevronDown, ChevronRight, Clock, Link2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { downloadTableExport } from '@/lib/exportTable';
import { DatePickerField } from '@/shared/components/ui/DatePicker';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import avatar2 from '@assets/images/profile-google.png';
import type { ApplicationStage } from '../[id]/_components/applicationDetailData';
import {
  ApplicationActionsDropdown,
  getActionsForStage,
} from './ApplicationActionsDropdown';
import { APPLICANTS } from './applicationsHubData';

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportApplicationsModal({
  open,
  onClose,
  onGenerated,
  rows,
}: ExportModalProps & {
  onGenerated?: () => void;
  rows?: Array<{
    applicant: string;
    email: string;
    location: string;
    opportunity: string;
    opportunityType: string;
    status: string;
    appliedAt: string;
    reviewer?: string;
    tab?: string;
    score?: number | string;
  }>;
}) {
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [checks, setChecks] = useState({
    info: true,
    answers: true,
    scores: true,
    notes: true,
    docs: true,
  });

  if (!open) return null;

  const exportRows = rows?.length ? rows : APPLICANTS;

  function handleGenerate() {
    const headers = [
      ...(checks.info ? ['Applicant', 'Email', 'Location'] : []),
      'Opportunity',
      'Type',
      'Status',
      'Applied',
      ...(checks.scores ? ['Score'] : []),
      ...(checks.notes ? ['Reviewer'] : []),
      ...(checks.answers ? ['Stage'] : []),
      ...(checks.docs ? ['Documents'] : []),
    ];

    const tableRows = exportRows.map((a) => {
      const row: Array<string | number> = [];
      if (checks.info) row.push(a.applicant, a.email, a.location);
      row.push(a.opportunity, a.opportunityType, a.status, a.appliedAt);
      if (checks.scores) row.push(a.score ?? '');
      if (checks.notes) row.push(a.reviewer ?? '');
      if (checks.answers) row.push(a.tab ?? '');
      if (checks.docs) row.push('Available');
      return row;
    });

    downloadTableExport(format, 'applications-export', headers, tableRows, {
      title: 'Export Applications',
      sheetName: 'Applications',
    });
    onClose();
    onGenerated?.();
  }

  return (
    <ModalShell title="Export Applications" subtitle="Choose what data to include in your export" onClose={onClose}>
      <div className="space-y-5">
        <div>
          <p className="mb-3 text-sm font-medium text-[#0F172A]">Export Format</p>
          <div className="grid grid-cols-3 gap-3">
            {(['csv', 'excel', 'pdf'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={cn(
                  'rounded-[8px] border px-4 py-3 text-sm font-medium uppercase',
                  format === f ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#EEF2F8] text-[#44516A]',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[#0F172A]">Selection</p>
          <button type="button" className="flex w-full items-center justify-between rounded-[8px] border border-[#D9E1EF] px-4 py-3 text-sm text-[#0F172A]">
            All Applicants ({exportRows.length})
            <ChevronDown className="h-4 w-4 text-[#8C97AD]" />
          </button>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-[#0F172A]">Include in Export</p>
          <div className="space-y-3">
            {[
              ['info', 'Applicant Information'],
              ['answers', 'Application Answers'],
              ['scores', 'Scores & Evaluation'],
              ['notes', 'Reviewer Notes'],
              ['docs', 'Documents Links'],
            ].map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-3 text-sm text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={checks[key as keyof typeof checks]}
                  onChange={(e) => setChecks((c) => ({ ...c, [key]: e.target.checked }))}
                  className="h-4 w-4 rounded border-[#D9E1EF] text-[#2F66C8]"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <ModalFooter
        onCancel={onClose}
        confirmLabel="Generate Export"
        onConfirm={handleGenerate}
      />
    </ModalShell>
  );
}

interface AssignModalProps {
  open: boolean;
  onClose: () => void;
}

const REVIEWERS = [
  { id: '1', name: 'Michael Adams', role: 'Lead Reviewer', active: 18, avatar: avatar2 },
  { id: '2', name: 'Jessica Lee', role: 'Reviewer', active: 22, avatar: avatar2 },
  { id: '3', name: 'Sarah Patel', role: 'Reviewer', active: 15, avatar: avatar2 },
  { id: '4', name: 'Daniel Thompson', role: 'Reviewer', active: 9, avatar: avatar2 },
];

/** Figma 510:13095 — Assign Reviewer modal */
export function AssignReviewerModal({
  open,
  onClose,
  onAssigned,
  reviewers = REVIEWERS,
}: AssignModalProps & {
  onAssigned?: (reviewer: { id: string; name: string }) => void | Promise<void>;
  reviewers?: Array<{ id: string; name: string; role: string; active?: number; avatar?: typeof avatar2 }>;
}) {
  const [selected, setSelected] = useState(reviewers[0]?.id ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setSelected(reviewers[0]?.id ?? '');
      setError('');
    }
  }, [open, reviewers]);

  if (!open) return null;

  const list = reviewers.length > 0 ? reviewers : REVIEWERS;
  const selectedReviewer = list.find((r) => r.id === selected) ?? list[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-[5px]">
      <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between border-b border-[#EEF2F8] p-[26px]">
          <div>
            <h2 className="text-lg font-medium text-[#0F172A]">Assign Reviewer</h2>
            <p className="mt-1.5 text-sm leading-[1.4] text-[#44516A]">
              Select reviewer[s] for the selected applications
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto px-[26px] py-10">
          {error ? (
            <p className="mb-4 rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          ) : null}
          <div className="space-y-5">
            <div>
              <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Select Reviewer</p>
              <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
                {list.map((r, index) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelected(r.id)}
                    className={cn(
                      'flex w-full items-center justify-between border-[#EEF2F8] p-4 text-left',
                      index < list.length - 1 && 'border-b',
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                          selected === r.id ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF]',
                        )}
                      >
                        {selected === r.id ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                      </span>
                      <Image src={r.avatar ?? avatar2} alt="" width={36} height={36} className="rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-[#0F172A]">{r.name}</p>
                        <p className="text-xs text-[#44516A]">{r.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-[#44516A]">
                      {r.active != null ? `${r.active} active` : r.role}
                      <ChevronRight className="h-[18px] w-[18px]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Permissions</p>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-4 text-base text-[#0F172A]"
              >
                Can Review & Comment
                <ChevronDown className="h-[18px] w-[18px] text-[#44516A]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedReviewer || saving}
            onClick={() => {
              if (!selectedReviewer) return;
              void (async () => {
                setSaving(true);
                setError('');
                try {
                  await onAssigned?.({ id: selectedReviewer.id, name: selectedReviewer.name });
                  onClose();
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Could not assign reviewer.');
                } finally {
                  setSaving(false);
                }
              })();
            }}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] disabled:opacity-50"
          >
            {saving ? 'Assigning…' : 'Assign Reviewer'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function RowActionsMenu({
  open,
  onClose,
  onView,
  onAssignReviewer,
  onAction,
  stage = 'Under Review',
}: {
  open: boolean;
  onClose: () => void;
  onView: () => void;
  onAssignReviewer?: () => void;
  onAction?: (label: string) => void;
  stage?: ApplicationStage;
}) {
  const handlers: Record<string, () => void> = {
    'View Applicant': onView,
    'Assign Reviewer': onAssignReviewer ?? onClose,
  };

  const items = getActionsForStage(stage);

  return (
    <ApplicationActionsDropdown
      open={open}
      onClose={onClose}
      items={items}
      onAction={(label) => {
        if (handlers[label]) handlers[label]();
        else onAction?.(label);
      }}
    />
  );
}

export function ShortlistApplicationModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;
  return (
    <ConfirmActionShell
      onClose={onClose}
      onConfirm={onConfirm}
      lead="Shortlist"
      accent="Applicant"
      description={`${applicantName} will be moved to Shortlisted and notified.`}
      confirmLabel="Shortlist"
      confirmClass="bg-[#2F66C8] hover:bg-[#1D4ED8]"
    />
  );
}

export function RejectApplicationModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: (note?: string) => void | Promise<void>;
}) {
  const [note, setNote] = useState('');
  if (!open) return null;
  return (
    <ConfirmActionShell
      onClose={onClose}
      onConfirm={() => onConfirm?.(note)}
      lead="Reject"
      accent="Applicant"
      description={`This will reject ${applicantName}'s application. This action can be reviewed later.`}
      confirmLabel="Reject"
      confirmClass="bg-[#EF4444] hover:bg-[#DC2626]"
      extra={
        <label className="flex w-full flex-col gap-2.5 text-left">
          <span className="text-sm font-semibold text-[#0F172A]">
            Reason <span className="font-normal text-[#8C97AD]">(Optional)</span>
          </span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for your team..."
            className="h-[84px] w-full resize-none rounded-[10px] border border-[#D9E1EF] p-4 text-sm outline-none focus:border-[#2F66C8]"
          />
        </label>
      }
    />
  );
}

export function AcceptApplicationModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;
  return (
    <ConfirmActionShell
      onClose={onClose}
      onConfirm={onConfirm}
      lead="Accept"
      accent="Application"
      description={`${applicantName} will be marked as Accepted and notified.`}
      confirmLabel="Accept"
      confirmClass="bg-[#15803D] hover:bg-[#166534]"
    />
  );
}

export function MarkInterviewCompletedModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;
  return (
    <ConfirmActionShell
      onClose={onClose}
      onConfirm={onConfirm}
      lead="Mark as"
      accent="Completed"
      description={`Interview for ${applicantName} will be marked as completed.`}
      confirmLabel="Mark Completed"
      confirmClass="bg-[#2F66C8] hover:bg-[#1D4ED8]"
    />
  );
}

export function SendOfferModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;
  return (
    <ConfirmActionShell
      onClose={onClose}
      onConfirm={onConfirm}
      lead="Send"
      accent="Offer"
      description={`An offer will be prepared and sent to ${applicantName}.`}
      confirmLabel="Send Offer"
      confirmClass="bg-[#2F66C8] hover:bg-[#1D4ED8]"
    />
  );
}

export function ArchiveApplicationModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;
  return (
    <ConfirmActionShell
      onClose={onClose}
      onConfirm={onConfirm}
      lead="Archive"
      accent="Application"
      description={`${applicantName}'s application will be archived.`}
      confirmLabel="Archive"
      confirmClass="bg-[#44516A] hover:bg-[#0F172A]"
    />
  );
}

export function ReopenApplicationModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;
  return (
    <ConfirmActionShell
      onClose={onClose}
      onConfirm={onConfirm}
      lead="Reopen"
      accent="Application"
      description={`${applicantName}'s application will be moved back under review.`}
      confirmLabel="Reopen"
      confirmClass="bg-[#2F66C8] hover:bg-[#1D4ED8]"
    />
  );
}

export function ScheduleInterviewModal({
  open,
  applicantName,
  onClose,
  onConfirm,
  mode = 'schedule',
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: (payload: {
    date: string;
    time: string;
    duration: string;
    interviewType: string;
    meetingLink: string;
    notes: string;
  }) => void | Promise<void>;
  mode?: 'schedule' | 'reschedule';
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [interviewType, setInterviewType] = useState('video');
  const [meetingLink, setMeetingLink] = useState('');
  const [notes, setNotes] = useState('');
  if (!open) return null;
  const isReschedule = mode === 'reschedule';
  const canSubmit = Boolean(date && time && duration && interviewType && meetingLink.trim());

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] md:items-stretch md:justify-end md:p-2.5">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 flex max-h-[95vh] w-full flex-col overflow-hidden rounded-t-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)] md:h-full md:max-h-none md:w-[720px] md:rounded-[20px]">
        <div className="flex shrink-0 items-start justify-between border-b border-[#EEF2F8] p-5 md:p-[26px]">
          <div className="min-w-0 flex-1 pr-3">
            <h2 className="text-lg font-medium text-[#0F172A]">
              {isReschedule ? 'Reschedule Interview' : 'Schedule Interview'}
            </h2>
            <p className="mt-1.5 text-sm leading-[1.4] text-[#44516A]">
              Set up interview details for this applicants
              {applicantName ? ` (${applicantName})` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-[#44516A]" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-8 md:px-[26px] md:py-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2.5">
              <span className="text-base font-semibold text-[#0F172A]">
                Interview Date <span className="font-normal text-[#EF4444]">*</span>
              </span>
              <DatePickerField value={date} onChange={setDate} placeholder="Select date" />
            </label>
            <label className="flex flex-col gap-2.5">
              <span className="text-base font-semibold text-[#0F172A]">
                Time <span className="font-normal text-[#EF4444]">*</span>
              </span>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="anchor-field pr-11"
                />
                <Clock className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#44516A]" />
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-base font-semibold text-[#0F172A]">
              Duration <span className="font-normal text-[#EF4444]">*</span>
            </p>
            <HubMenuSelect
              value={duration}
              onChange={setDuration}
              options={[
                { value: '30', label: '30 minutes' },
                { value: '45', label: '45 minutes' },
                { value: '60', label: '60 minutes' },
                { value: '90', label: '90 minutes' },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-base font-semibold text-[#0F172A]">
              Interview Type <span className="font-normal text-[#EF4444]">*</span>
            </p>
            <HubMenuSelect
              value={interviewType}
              onChange={setInterviewType}
              options={[
                { value: 'video', label: 'Video Interview' },
                { value: 'in-person', label: 'In-Person' },
                { value: 'phone', label: 'Phone' },
              ]}
            />
          </div>

          <label className="flex flex-col gap-2.5">
            <span className="text-base font-semibold text-[#0F172A]">
              Meeting Link <span className="font-normal text-[#EF4444]">*</span>
            </span>
            <div className="flex items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 transition-colors focus-within:border-[#2F66C8]">
              <Link2 className="h-[18px] w-[18px] shrink-0 text-[#44516A]" />
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="no-anchor-field min-w-0 flex-1 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2.5">
            <span className="text-base font-semibold text-[#0F172A]">
              Notes <span className="font-normal text-[#8C97AD]">(Optional)</span>
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes for the interview..."
              className="anchor-textarea h-[84px] resize-none"
            />
          </label>
        </div>

        <div className="flex shrink-0 justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-5 md:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => {
              void (async () => {
                await onConfirm?.({
                  date,
                  time,
                  duration,
                  interviewType,
                  meetingLink: meetingLink.trim(),
                  notes: notes.trim(),
                });
                onClose();
              })();
            }}
            className={cn(
              'rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
              canSubmit ? 'bg-[#2F66C8] hover:bg-[#1D4ED8]' : 'cursor-not-allowed bg-[#2F66C8]/40',
            )}
          >
            {isReschedule ? 'Reschedule Interview' : 'Schedule Interview'}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Figma 513:16569 — Export Generated success */
export function ExportGeneratedSuccessModal({
  open,
  onClose,
  count = 1284,
}: {
  open: boolean;
  onClose: () => void;
  count?: number;
}) {
  if (!open) return null;
  return (
    <ApplicationResultModal
      open={open}
      onClose={onClose}
      titleLead="Export"
      titleAccent="Generated!"
      description={`Your export is ready!\n\n${count.toLocaleString()} applications exported successfully.`}
      primaryLabel="Download File"
      secondaryLabel="Cancel"
    />
  );
}

/** Figma 513:17411 — Reviewer Assigned success */
export function ReviewerAssignedSuccessModal({
  open,
  onClose,
  reviewerName = 'Michael Adams',
  count = 23,
}: {
  open: boolean;
  onClose: () => void;
  reviewerName?: string;
  count?: number;
}) {
  if (!open) return null;
  return (
    <ApplicationResultModal
      open={open}
      onClose={onClose}
      titleLead="Reviewer"
      titleAccent="Assigned!"
      description={`Reviewer assigned successfully!\n\n${count} applications assigned to ${reviewerName}.`}
      primaryLabel="View Applications"
      secondaryLabel="Cancel"
    />
  );
}

function ApplicationResultModal({
  open,
  onClose,
  titleLead,
  titleAccent,
  description,
  primaryLabel,
  secondaryLabel,
}: {
  open: boolean;
  onClose: () => void;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-t-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)] sm:max-w-[720px] sm:rounded-[20px]">
        <div className="flex justify-end border-b border-[#EEF2F8] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-[#44516A]" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-5 px-5 py-10 sm:px-[26px]">
          <div className="flex h-[160px] w-[160px] items-center justify-center rounded-full bg-[#F1FFEE]">
            <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#15803D]">
              <Check className="h-12 w-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="w-full text-center">
            <h2 className="flex flex-wrap items-baseline justify-center gap-1.5 font-serif">
              <span className="text-[28px] text-[#0F172A]">{titleLead}</span>
              <span className="text-[36px] italic text-[#2F66C8]">{titleAccent}</span>
            </h2>
            <p className="mt-2.5 whitespace-pre-line text-base text-[#44516A]">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-5 sm:gap-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            {secondaryLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddNoteModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: (note: string) => void | Promise<void>;
}) {
  const [note, setNote] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px]">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] p-[26px]">
          <div>
            <h2 className="text-lg font-medium text-[#0F172A]">Add Note</h2>
            <p className="mt-1 text-sm text-[#44516A]">Internal note for {applicantName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEF2F8]"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-[#44516A]" />
          </button>
        </div>
        <div className="px-[26px] py-10">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 1000))}
            rows={5}
            placeholder="Write your note..."
            className="anchor-textarea w-full resize-none p-4"
          />
          <p className="mt-2 text-right text-sm text-[#8C97AD]">{note.length} / 1000</p>
        </div>
        <div className="flex justify-end gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!note.trim()}
            onClick={() => {
              void (async () => {
                await onConfirm?.(note.trim());
                setNote('');
                onClose();
              })();
            }}
            className={cn(
              'rounded-[6px] px-5 py-3 text-sm font-medium text-white',
              note.trim() ? 'bg-[#2F66C8] hover:bg-[#1D4ED8]' : 'cursor-not-allowed bg-[#2F66C8]/40',
            )}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}

const DOC_TYPE_OPTIONS = [
  'Resume / CV',
  'Cover Letter',
  'Transcript',
  'ID / Work Permit',
  'Portfolio',
  'Other',
];

export function RequestDocumentsModal({
  open,
  applicantName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  applicantName: string;
  onClose: () => void;
  onConfirm?: (payload: { message: string; documentTypes: string[] }) => void | Promise<void>;
}) {
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState<string[]>(['Resume / CV']);
  if (!open) return null;

  function toggleType(type: string) {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px]">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] p-[26px]">
          <div>
            <h2 className="text-lg font-medium text-[#0F172A]">Request Documents</h2>
            <p className="mt-1 text-sm text-[#44516A]">
              Ask {applicantName} for additional files via their application message thread.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEF2F8]"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-[#44516A]" />
          </button>
        </div>
        <div className="flex flex-col gap-5 px-[26px] py-8">
          <div>
            <p className="mb-3 text-sm font-medium text-[#0F172A]">Document types</p>
            <div className="flex flex-wrap gap-2">
              {DOC_TYPE_OPTIONS.map((type) => {
                const active = selected.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={cn(
                      'rounded-[6px] border px-3 py-2 text-sm',
                      active
                        ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                        : 'border-[#EEF2F8] bg-white text-[#44516A]',
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-[#0F172A]">Message (optional)</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
              rows={4}
              placeholder="Add context for the applicant…"
              className="anchor-textarea w-full resize-none p-4"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => {
              void (async () => {
                await onConfirm?.({ message: message.trim(), documentTypes: selected });
                setMessage('');
                setSelected(['Resume / CV']);
                onClose();
              })();
            }}
            className={cn(
              'rounded-[6px] px-5 py-3 text-sm font-medium text-white',
              selected.length
                ? 'bg-[#2F66C8] hover:bg-[#1D4ED8]'
                : 'cursor-not-allowed bg-[#2F66C8]/40',
            )}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmActionShell({
  onClose,
  onConfirm,
  lead,
  accent,
  description,
  confirmLabel,
  confirmClass,
  extra,
  confirming,
}: {
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  lead: string;
  accent: string;
  description: string;
  confirmLabel: string;
  confirmClass: string;
  extra?: React.ReactNode;
  confirming?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px]">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex justify-end border-b border-[#EEF2F8] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEF2F8]"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-[#44516A]" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-5 px-[26px] py-10 text-center">
          <p className="font-serif text-[28px] text-[#0F172A] lg:text-[36px]">
            {lead} <span className="italic text-[#2F66C8]">{accent}</span>
          </p>
          <p className="text-base text-[#44516A]">{description}</p>
          {extra}
        </div>
        <div className="flex justify-end gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={confirming}
            onClick={() => {
              void (async () => {
                await onConfirm?.();
                onClose();
              })();
            }}
            className={cn(
              'rounded-[6px] px-5 py-3 text-sm font-medium text-white disabled:opacity-50',
              confirmClass,
            )}
          >
            {confirming ? 'Saving…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[10px] bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#0F172A]">{title}</h2>
            <p className="mt-1 text-sm text-[#8C97AD]">{subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="text-[#8C97AD] hover:text-[#0F172A]">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalFooter({
  onCancel,
  onConfirm,
  confirmLabel,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
}) {
  return (
    <div className="mt-6 flex justify-end gap-3 border-t border-[#EEF2F8] pt-5">
      <button type="button" onClick={onCancel} className="rounded-[6px] px-5 py-2.5 text-sm font-medium text-[#44516A]">
        Cancel
      </button>
      <button type="button" onClick={onConfirm} className="rounded-[6px] bg-[#2F66C8] px-5 py-2.5 text-sm font-medium text-white">
        {confirmLabel}
      </button>
    </div>
  );
}
