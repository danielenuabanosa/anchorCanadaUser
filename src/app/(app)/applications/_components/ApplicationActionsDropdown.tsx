'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type RefObject } from 'react';
import { createPortal } from 'react-dom';
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
  | 'reopen'
  | 'request-documents';

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
    'Request Documents': 'request-documents',
  };
  const type = map[label];
  return type ? { type, applicantName } : null;
}

const MENU_WIDTH = 220;

type MenuCoords = { top: number; left: number };

interface ApplicationActionsDropdownProps {
  open: boolean;
  onClose: () => void;
  onAction?: (label: string) => void;
  className?: string;
  align?: 'left' | 'right';
  items?: typeof APPLICATION_ACTION_ITEMS;
  /** Optional explicit trigger; otherwise uses the previous sibling button. */
  anchorRef?: RefObject<HTMLElement | null>;
}

export function ApplicationActionsDropdown({
  open,
  onClose,
  onAction,
  className,
  align = 'right',
  items = APPLICATION_ACTION_ITEMS,
  anchorRef,
}: ApplicationActionsDropdownProps) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<MenuCoords | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }

    function resolveAnchor(): HTMLElement | null {
      if (anchorRef?.current) return anchorRef.current;
      const prev = markerRef.current?.previousElementSibling;
      return prev instanceof HTMLElement ? prev : null;
    }

    function updatePosition() {
      const anchor = resolveAnchor();
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 320;
      const gap = 4;
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const openUp = spaceBelow < menuHeight && rect.top > spaceBelow;
      const top = openUp ? rect.top - menuHeight - gap : rect.bottom + gap;
      const preferredLeft = align === 'right' ? rect.right - MENU_WIDTH : rect.left;
      const left = Math.min(Math.max(8, preferredLeft), window.innerWidth - MENU_WIDTH - 8);

      setCoords({ top, left });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, align, anchorRef]);

  useEffect(() => {
    if (!open) return;

    function handlePointer(event: MouseEvent) {
      const target = event.target as Node;
      const anchor = anchorRef?.current ?? markerRef.current?.previousElementSibling;
      if (menuRef.current?.contains(target)) return;
      if (anchor instanceof HTMLElement && anchor.contains(target)) return;
      onCloseRef.current();
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onCloseRef.current();
    }

    const timer = window.setTimeout(() => {
      document.addEventListener('mousedown', handlePointer);
      document.addEventListener('keydown', handleKey);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, anchorRef]);

  if (!open) return null;

  const menu =
    mounted &&
    createPortal(
      <div
        ref={menuRef}
        style={
          coords
            ? { top: coords.top, left: coords.left, width: MENU_WIDTH }
            : { visibility: 'hidden', top: 0, left: 0, width: MENU_WIDTH }
        }
        className={cn(
          'fixed z-[200] rounded-[10px] border-[0.6px] border-[#EEF2F8] bg-[#F8FAFC] p-1 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
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
      </div>,
      document.body,
    );

  return (
    <>
      <span ref={markerRef} className="pointer-events-none absolute h-0 w-0" aria-hidden />
      {menu}
    </>
  );
}
