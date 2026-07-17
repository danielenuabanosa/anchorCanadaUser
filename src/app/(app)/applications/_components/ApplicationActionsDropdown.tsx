'use client';

import { useEffect, useRef, type ElementType } from 'react';
import {
  CircleCheckBig,
  Download,
  Eye,
  FileVideo,
  FileX,
  FolderArchive,
  FolderOpen,
  NotepadText,
  UserPlus,
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
  { label: 'Schedule Interview', icon: FileVideo },
  { label: 'Reschedule Interview', icon: FileVideo },
  { label: 'Mark as Completed', icon: CircleCheckBig },
  { label: 'Reject Applicant', icon: FileX },
  { label: 'Assign Reviewer', icon: UserPlus },
  { label: 'Send Offer', icon: FileVideo },
  { label: 'Archive Application', icon: FolderArchive },
  { label: 'Reopen Application', icon: FolderOpen },
  { label: 'Add Note', icon: NotepadText },
  { label: 'Download Submission', icon: Download },
];

/** Stage-gated row actions from Figma §27 (508:13690–508:17737). */
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
    'Reschedule Interview',
    'Mark as Completed',
    'Reject Applicant',
    'Add Note',
    'Download Submission',
  ],
  Accepted: [
    'View Applicant',
    'Send Offer',
    'Archive Application',
    'Add Note',
    'Download Submission',
  ],
  Rejected: [
    'View Applicant',
    'Reopen Application',
    'Add Note',
    'Download Submission',
  ],
};

export function getActionsForStage(stage: ApplicationStage) {
  const labels = STAGE_ACTION_LABELS[stage];
  return APPLICATION_ACTION_ITEMS.filter((item) => labels.includes(item.label));
}

export type HubActionModalType =
  | 'shortlist'
  | 'reject'
  | 'interview'
  | 'reschedule'
  | 'complete'
  | 'note'
  | 'offer'
  | 'archive'
  | 'reopen';

export function hubActionModalForLabel(
  label: string,
  applicantName: string,
): { type: HubActionModalType; applicantName: string } | null {
  const map: Record<string, HubActionModalType> = {
    'Shortlist Applicant': 'shortlist',
    'Reject Applicant': 'reject',
    'Schedule Interview': 'interview',
    'Reschedule Interview': 'reschedule',
    'Mark as Completed': 'complete',
    'Add Note': 'note',
    'Send Offer': 'offer',
    'Archive Application': 'archive',
    'Reopen Application': 'reopen',
  };
  const type = map[label];
  return type ? { type, applicantName } : null;
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
  const menuRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    function handlePointer(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onCloseRef.current();
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onCloseRef.current();
    }

    function handleScroll() {
      onCloseRef.current();
    }

    // Defer so the opening click doesn't immediately close the menu.
    const timer = window.setTimeout(() => {
      document.addEventListener('mousedown', handlePointer);
      document.addEventListener('keydown', handleKey);
      window.addEventListener('scroll', handleScroll, true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className={cn(
        'absolute top-full z-50 mt-1 w-[220px] rounded-[10px] border-[0.6px] border-[#EEF2F8] bg-[#F8FAFC] p-1 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
        align === 'right' ? 'right-0' : 'left-0',
        className,
      )}
      role="menu"
    >
      <div className="overflow-hidden rounded-[9px] border-[0.6px] border-[#EEF2F8] bg-white">
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onAction?.(item.label);
              onClose();
            }}
            className={cn(
              'flex w-full items-center gap-2.5 p-3 text-left text-sm font-normal text-[#0F172A] hover:bg-[#F8FAFC]',
              index < items.length - 1 && 'border-b border-[#EEF2F8]',
            )}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
