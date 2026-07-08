'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import avatar2 from '@assets/images/profile-google.png';
import type { ApplicationStage } from '../[id]/_components/applicationDetailData';
import {
  ApplicationActionsDropdown,
  getActionsForStage,
} from './ApplicationActionsDropdown';

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportApplicationsModal({ open, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [checks, setChecks] = useState({
    info: true,
    answers: true,
    scores: true,
    notes: true,
    docs: true,
  });

  if (!open) return null;

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
            All Applicants (1,284)
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
      <ModalFooter onCancel={onClose} confirmLabel="Generate Export" onConfirm={onClose} />
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
export function AssignReviewerModal({ open, onClose }: AssignModalProps) {
  const [selected, setSelected] = useState('1');

  if (!open) return null;

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
          <div className="space-y-5">
            <div>
              <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Select Reviewer</p>
              <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
                {REVIEWERS.map((r, index) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelected(r.id)}
                    className={cn(
                      'flex w-full items-center justify-between border-[#EEF2F8] p-4 text-left',
                      index < REVIEWERS.length - 1 && 'border-b',
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
                      <Image src={r.avatar} alt="" width={36} height={36} className="rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-[#0F172A]">{r.name}</p>
                        <p className="text-xs text-[#44516A]">{r.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-[#44516A]">
                      {r.active} active
                      <ChevronRight className="h-[18px] w-[18px]" />
                    </div>
                  </button>
                ))}
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 p-4 text-left text-sm font-medium text-[#2F66C8]"
                >
                  <Plus className="h-[18px] w-[18px]" />
                  Add Another Reviewer
                </button>
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Permissions</p>
              <button
                type="button"
                className="flex h-[53px] w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-base text-[#0F172A]"
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
            onClick={onClose}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"
          >
            Assign Reviewer
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
}: {
  open: boolean;
  onClose: () => void;
  onView: () => void;
  onAssignReviewer?: () => void;
}) {
  const handlers: Record<string, () => void> = {
    'View Applicant': onView,
    'Assign Reviewer': onAssignReviewer ?? onClose,
  };

  const items = getActionsForStage('Under Review');

  return (
    <ApplicationActionsDropdown
      open={open}
      onClose={onClose}
      items={items}
      onAction={(label) => (handlers[label] ?? onClose)()}
    />
  );
}

export function MobileRowActionsSheet({
  open,
  onClose,
  onView,
  onAssignReviewer,
  stage = 'Under Review',
}: {
  open: boolean;
  onClose: () => void;
  onView: () => void;
  onAssignReviewer?: () => void;
  stage?: ApplicationStage;
}) {
  if (!open) return null;

  const handlers: Record<string, () => void> = {
    'View Applicant': onView,
    'Assign Reviewer': onAssignReviewer ?? onClose,
  };

  const items = getActionsForStage(stage);

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button type="button" className="absolute inset-0 bg-black/30" onClick={onClose} aria-label="Close menu" />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[16px] bg-white pb-8">
        <div className="border-b border-[#EEF2F8] px-5 py-4">
          <p className="text-base font-medium text-[#0F172A]">Applicant Actions</p>
        </div>
        <div className="py-2">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => (handlers[item.label] ?? onClose)()}
              className="flex w-full items-center gap-3 border-b border-[#EEF2F8] px-5 py-3.5 text-left text-sm text-[#0F172A] last:border-b-0 hover:bg-[#F8FAFC]"
            >
              <item.icon className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} />
              {item.label}
            </button>
          ))}
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
