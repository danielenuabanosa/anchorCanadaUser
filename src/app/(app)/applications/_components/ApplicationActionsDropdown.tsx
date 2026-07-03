'use client';

import type { ElementType } from 'react';
import {
  CircleCheckBig,
  Download,
  Eye,
  FileX,
  NotepadText,
  UserPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const APPLICATION_ACTION_ITEMS: {
  label: string;
  icon: ElementType;
  destructive?: boolean;
}[] = [
  { label: 'View Applicant', icon: Eye },
  { label: 'Shortlist Applicant', icon: CircleCheckBig },
  { label: 'Reject Applicant', icon: FileX },
  { label: 'Assign Reviewer', icon: UserPlus },
  { label: 'Add Note', icon: NotepadText },
  { label: 'Download Submission', icon: Download },
];

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
