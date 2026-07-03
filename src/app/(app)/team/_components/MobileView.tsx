'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Ellipsis, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileHubStatGrid } from '@/app/(app)/opportunities/_components/MobileHubStatGrid';
import {
  ROLE_STYLES,
  STATUS_STYLES,
  TEAM_MEMBERS,
  TEAM_STATS,
} from './teamManagementData';

import { InviteTeamMemberModal, MemberActionsMenu } from './TeamHubModals';

export default function MobileView() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [menuMemberId, setMenuMemberId] = useState<string | null>(null);
  const mobileStats = TEAM_STATS.map((s) => ({
    ...s,
    icon: s.icon,
    iconBg: s.iconBg,
    iconColor: s.iconColor,
  }));

  const menuMember = TEAM_MEMBERS.find((m) => m.id === menuMemberId);

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-[28px] text-[#0F172A]">Providers Team</h1>
          <p className="mt-1 text-[14px] text-[#44516A]">Manage members, roles, and permissions.</p>
        </div>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-[6px] bg-[#2F66C8] px-3 text-[13px] font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Invite
        </button>
      </div>

      <MobileHubStatGrid stats={mobileStats} />

      <div className="flex flex-col gap-3">
        {TEAM_MEMBERS.map((member) => (
          <article key={member.id} className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 text-left"
              onClick={() => setExpanded(expanded === member.id ? null : member.id)}
            >
              <Image src={member.avatar} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-[#0F172A]">{member.name}</p>
                <p className="truncate text-[12px] text-[#8C97AD]">{member.email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={cn('rounded px-1.5 py-0.5 text-xs font-medium', ROLE_STYLES[member.role])}>
                    {member.role}
                  </span>
                  <span className={cn('rounded px-1.5 py-0.5 text-xs font-medium', STATUS_STYLES[member.status])}>
                    {member.status}
                  </span>
                </div>
              </div>
              <ChevronDown className={cn('h-4 w-4 shrink-0 text-[#8C97AD] transition', expanded === member.id && 'rotate-180')} />
            </button>
            {expanded === member.id ? (
              <div className="mt-4 space-y-2 border-t border-[#EEF2F8] pt-4 text-[14px] text-[#44516A]">
                <p>Department: {member.department}</p>
                <p>Last active: {member.lastActive}</p>
                <p>{member.permissions}</p>
                <button
                  type="button"
                  onClick={() => setMenuMemberId(member.id)}
                  className="mt-2 inline-flex items-center gap-2 text-[#2F66C8]"
                >
                  <Ellipsis className="h-4 w-4" />
                  Actions
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <InviteTeamMemberModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
      {menuMember ? (
        <MemberActionsMenu
          open={!!menuMemberId}
          member={menuMember}
          variant="sheet"
          onClose={() => setMenuMemberId(null)}
        />
      ) : null}
    </div>
  );
}
