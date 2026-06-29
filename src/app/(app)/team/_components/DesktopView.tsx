'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Ellipsis, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import {
  ROLE_STYLES,
  STATUS_STYLES,
  TEAM_MEMBERS,
  TEAM_STATS,
  type TeamMemberRow,
} from './teamManagementData';
import { InviteTeamMemberModal, MemberActionsMenu } from './TeamHubModals';

export default function DesktopView() {
  const [search, setSearch] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [menuMemberId, setMenuMemberId] = useState<string | null>(null);
  const filtered = TEAM_MEMBERS.filter(
    (m) =>
      !search.trim() ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Providers Team</h1>
          <p className="text-base text-[#44516A]">
            Manage your organization&apos;s members, roles and permissions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="inline-flex items-center gap-2 rounded-[6px] bg-[#2F66C8] px-5 py-3 text-[14px] font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Invite Team Member
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-6">
        {TEAM_STATS.map((stat) => (
          <HubStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team members..."
              className="h-[42px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#2F66C8]"
            />
          </div>
          {['All Roles', 'All Departments', 'All Statuses'].map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-3 py-2 text-sm text-[#44516A]"
            >
              {label}
              <ChevronDown className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[1.4fr_120px_120px_100px_120px_1fr_60px] md:gap-2">
          {['Member', 'Role', 'Department', 'Status', 'Last Active', 'Permissions', ''].map((col) => (
            <p key={col || 'actions'} className="py-3.5 text-sm font-medium text-[#0F172A]">
              {col}
            </p>
          ))}
        </div>
        <div className="divide-y divide-[#EEF2F8]">
          {filtered.map((member) => (
            <TeamRow
              key={member.id}
              member={member}
              menuOpen={menuMemberId === member.id}
              onMenuToggle={() => setMenuMemberId(menuMemberId === member.id ? null : member.id)}
              onMenuClose={() => setMenuMemberId(null)}
            />
          ))}
        </div>
      </div>

      <InviteTeamMemberModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}

function TeamRow({
  member,
  menuOpen,
  onMenuToggle,
  onMenuClose,
}: {
  member: TeamMemberRow;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[1.4fr_120px_120px_100px_120px_1fr_60px] md:items-center md:gap-2">
      <div className="flex items-center gap-3">
        <Image src={member.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium text-[#0F172A]">{member.name}</p>
          <p className="truncate text-[12px] text-[#8C97AD]">{member.email}</p>
        </div>
      </div>
      <span className={cn('inline-flex w-fit rounded-[4px] px-2 py-0.5 text-[12px] font-medium', ROLE_STYLES[member.role])}>
        {member.role}
      </span>
      <p className="text-[14px] text-[#44516A]">{member.department}</p>
      <span className={cn('inline-flex w-fit rounded-[4px] px-2 py-0.5 text-[12px] font-medium', STATUS_STYLES[member.status])}>
        {member.status}
      </span>
      <p className="text-[14px] text-[#44516A]">{member.lastActive}</p>
      <p className="truncate text-[14px] text-[#44516A]">{member.permissions}</p>
      <div className="relative">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] text-[#44516A] hover:bg-[#F8FAFC]"
        >
          <Ellipsis className="h-4 w-4" />
        </button>
        <MemberActionsMenu open={menuOpen} member={member} onClose={onMenuClose} />
      </div>
    </div>
  );
}
