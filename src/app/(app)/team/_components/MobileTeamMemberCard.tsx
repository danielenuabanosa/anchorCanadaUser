'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TeamMemberRow } from './teamManagementData';
import { ROLE_STYLES, STATUS_STYLES } from './teamManagementData';
import { MemberActionsMenu } from './TeamHubModals';

interface MobileTeamMemberCardProps {
  member: TeamMemberRow;
  onAction?: (member: TeamMemberRow, label: string) => void;
}

export function MobileTeamMemberCard({ member, onAction }: MobileTeamMemberCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleAction(label: string) {
    if (label === 'View Member') {
      router.push(`/team/${member.id}`);
      return;
    }
    onAction?.(member, label);
  }

  return (
    <>
      <article className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 gap-5">
            <Image src={member.avatar} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-[#0F172A]">{member.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2.5">
                <p className="truncate text-xs text-[#44516A]">{member.department}</p>
                <span className={cn('shrink-0 rounded-[2px] px-1 py-0.5 text-xs', ROLE_STYLES[member.role])}>
                  {member.role}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[#EEF2F8] p-1.5 text-[#44516A]"
            aria-label="Member actions"
          >
            <Ellipsis className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className={cn('rounded-[4px] px-1.5 py-0.5 text-sm font-medium', STATUS_STYLES[member.status])}>
            {member.status}
          </span>
          <p className="text-sm text-[#44516A]">{member.lastActive}</p>
        </div>

        <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-2.5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-[#44516A]">Permissions:</p>
            <p className="truncate text-sm font-medium text-[#0F172A]">{member.permissions}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/team/${member.id}`)}
          className="flex w-full items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-2.5 text-sm font-medium text-[#2F66C8]"
        >
          View Member
        </button>
      </article>

      <MemberActionsMenu
        open={menuOpen}
        member={member}
        variant="sheet"
        onClose={() => setMenuOpen(false)}
        onAction={handleAction}
      />
    </>
  );
}
