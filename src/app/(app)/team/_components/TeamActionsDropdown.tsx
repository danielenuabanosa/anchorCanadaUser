'use client';

import type { ElementType } from 'react';
import {
  Activity,
  Ban,
  Eye,
  SquarePen,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TeamMemberStatus } from './teamManagementData';

export interface TeamActionItem {
  label: string;
  icon: ElementType;
  tone?: 'default' | 'warning' | 'danger' | 'success';
}

const ALL_ITEMS: TeamActionItem[] = [
  { label: 'View Member', icon: Eye },
  { label: 'Edit Role', icon: SquarePen },
  { label: 'Edit Permissions', icon: SquarePen },
  { label: 'View Activity', icon: Activity },
  { label: 'Suspend Member', icon: Ban, tone: 'warning' },
  { label: 'Remove Member', icon: Trash2, tone: 'danger' },
  { label: 'Resend Invite', icon: Eye },
  { label: 'Edit Invite', icon: SquarePen },
  { label: 'Cancel Invite', icon: Ban },
  { label: 'Remove Invite', icon: Trash2, tone: 'danger' },
  { label: 'Reactivate Member', icon: UserPlus, tone: 'success' },
];

const STATUS_ACTION_LABELS: Record<TeamMemberStatus, readonly string[]> = {
  Active: ['View Member', 'Edit Role', 'Edit Permissions', 'View Activity', 'Suspend Member', 'Remove Member'],
  'Pending Invite': ['Resend Invite', 'Edit Invite', 'Cancel Invite', 'Remove Invite'],
  Suspended: ['View Member', 'Edit Role', 'Edit Permissions', 'View Activity', 'Reactivate Member', 'Remove Member'],
};

export function getActionsForMemberStatus(status: TeamMemberStatus) {
  const labels = STATUS_ACTION_LABELS[status];
  return ALL_ITEMS.filter((item) => labels.includes(item.label));
}

interface TeamActionsDropdownProps {
  open: boolean;
  onClose: () => void;
  onAction?: (label: string) => void;
  className?: string;
  align?: 'left' | 'right';
  status: TeamMemberStatus;
}

export function TeamActionsDropdown({
  open,
  onClose,
  onAction,
  className,
  align = 'right',
  status,
}: TeamActionsDropdownProps) {
  if (!open) return null;

  const items = getActionsForMemberStatus(status);

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
                'flex w-full items-center gap-2.5 p-3 text-left text-sm hover:bg-[#F8FAFC]',
                index < items.length - 1 && 'border-b border-[#EEF2F8]',
                item.tone === 'warning' && 'text-[#B45309]',
                item.tone === 'danger' && 'text-[#B91C1C]',
                item.tone === 'success' && 'text-[#15803D]',
                !item.tone && 'text-[#0F172A]',
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0 text-current" strokeWidth={1.75} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
