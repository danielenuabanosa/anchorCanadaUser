'use client';

import type { ElementType } from 'react';
import {
  CircleCheckBig,
  Download,
  Eye,
  FileX,
  NotepadText,
  UserPlus,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicationStage } from '../[id]/_components/applicationDetailData';

export const APPLICATION_ACTION_ITEMS: {
  label: string;
  icon: ElementType;
  destructive?: boolean;
}[] = [
  { label: 'View Applicant', icon: Eye },
  { label: 'Shortlist Applicant', icon: CircleCheckBig },
  { label: 'Schedule Interview', icon: Video },
  { label: 'Accept Application', icon: CircleCheckBig },
  { label: 'Reject Applicant', icon: FileX },
  { label: 'Assign Reviewer', icon: UserPlus },
  { label: 'Add Note', icon: NotepadText },
  { label: 'Download Submission', icon: Download },
];

export const STAGE_ACTION_LABELS: Record<ApplicationStage, readonly string[]> = {
  'Under Review': [
    'View Applicant',
    'Shortlist Applicant',
    'Reject Applicant',
    'Assign Reviewer',
    'Add Note',
    'Download Submission',
  ],
  Shortlisted: [
    'View Applicant',
    'Schedule Interview',
    'Reject Applicant',
    'Assign Reviewer',
    'Add Note',
    'Download Submission',
  ],
  Interview: [
    'View Applicant',
    'Accept Application',
    'Reject Applicant',
    'Assign Reviewer',
    'Add Note',
    'Download Submission',
  ],
  Accepted: ['View Applicant', 'Add Note', 'Download Submission'],
  Rejected: ['View Applicant', 'Add Note', 'Download Submission'],
};

export function getActionsForStage(stage: ApplicationStage) {
  const labels = STAGE_ACTION_LABELS[stage];
  return APPLICATION_ACTION_ITEMS.filter((item) => labels.includes(item.label));
}

interface ApplicationActionsDropdownProps {
  open: boolean;
  onClose: () => void;
  onAction?: (label: string) => void;
  className?: string;
  align?: 'left' | 'right';
  items?: typeof APPLICATION_ACTION_ITEMS;
}

export function ApplicationActionsDropdown({
  open,
  onClose,
  onAction,
  className,
  align = 'right',
  items = APPLICATION_ACTION_ITEMS,
}: ApplicationActionsDropdownProps) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 z-40" onClick={onClose} aria-label="Close menu" />
      <div
        className={cn(
          'absolute top-full z-50 mt-1 w-[220px] rounded-[10px] bg-[#F8FAFC] p-1 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
          align === 'right' ? 'right-0' : 'left-0',
          className,
        )}
      >
        <div className="overflow-hidden rounded-[9px] border border-[#EEF2F8] bg-white">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                onAction?.(item.label);
                onClose();
              }}
              className={cn(
                'flex w-full items-center gap-2.5 p-3 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]',
                index < items.length - 1 && 'border-b border-[#EEF2F8]',
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
