'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Check,
  ChevronDown,
  Crown,
  Plus,
  Shield,
  Trash2,
  UserCircle,
  Users,
} from 'lucide-react';

import {
  createEmptyMember,
  ORGANIZATION_OWNER,
  ROLE_DEFINITIONS,
  TEAM_ROLES,
  TEAM_SIDEBAR,
  WHY_TEAM_BENEFITS,
  type TeamMemberDraft,
  type TeamRoleId,
} from '@/features/onboarding/lib/teamData';
import { cn } from '@/lib/utils';

import starIcon from '@assets/icons/star2.png';

function RoleCheck({ bg }: { bg: string }) {
  return (
    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[13px]" style={{ backgroundColor: bg }}>
      <Check className="h-3 w-3 text-[#44516A]" strokeWidth={3} />
    </span>
  );
}

export function TeamPageHeading({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="text-center">
        <h1 className="font-serif text-[48px] font-normal leading-[56px] text-[#0F172A]">
          Invite Your{' '}
          <span className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Team</span>
        </h1>
        <p className="mt-3 font-sans text-[14px] leading-normal text-[#8C97AD]">
          Collaborate with recruiters, coordinators, and administrators across your organization.
          You can always invite more team members.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
        Invite Your{' '}
        <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Team</span>
      </h1>
      <p className="mt-6 font-sans text-[16px] leading-normal text-[#8C97AD]">
        Collaborate with recruiters, coordinators, and administrators across your organization.
        <br />
        You can always invite more team members.
      </p>
    </div>
  );
}

function RoleSelect({
  value,
  onChange,
  compact = false,
}: {
  value: TeamRoleId | '';
  onChange: (role: TeamRoleId) => void;
  compact?: boolean;
}) {
  return (
    <div className="relative">
      <UserCircle className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#44516A]" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TeamRoleId)}
        className={cn(
          'anchor-field w-full appearance-none pl-11 pr-10',
          compact ? 'h-[50px] text-[14px]' : 'h-[53px] text-[16px]',
          !value && 'text-[#8C97AD]',
        )}
      >
        <option value="">Select Role</option>
        {TEAM_ROLES.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#44516A]" />
    </div>
  );
}

export function InviteMembersSection({
  members,
  onChange,
  compact = false,
}: {
  members: TeamMemberDraft[];
  onChange: (members: TeamMemberDraft[]) => void;
  compact?: boolean;
}) {
  function updateMember(id: string, patch: Partial<TeamMemberDraft>) {
    onChange(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function removeMember(id: string) {
    if (members.length <= 1) return;
    onChange(members.filter((m) => m.id !== id));
  }

  function addMember() {
    onChange([...members, createEmptyMember()]);
  }

  if (compact) {
    return (
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="flex items-center gap-[18px]">
          <Users className="h-6 w-6 text-[#2F66C8]" />
          <p className="font-sans text-[16px] font-semibold leading-[180%] text-[#0F172A]">
            1. Invite Team Members
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col gap-3 border-b border-[#EEF2F8] pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <label className="font-sans text-[14px] font-medium text-[#0F172A]">Full Name</label>
                {members.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="text-[#EF4444]"
                    aria-label="Remove member"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
              <input
                type="text"
                value={member.fullName}
                onChange={(e) => updateMember(member.id, { fullName: e.target.value })}
                placeholder="Enter your full name"
                className="anchor-field h-[50px] text-[14px]"
              />
              <input
                type="email"
                value={member.email}
                onChange={(e) => updateMember(member.id, { email: e.target.value })}
                placeholder="name@company.ca"
                className="anchor-field h-[50px] text-[14px]"
              />
              <RoleSelect
                value={member.role}
                onChange={(role) => updateMember(member.id, { role })}
                compact
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMember}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-dashed border-[#D9E1EF] bg-white text-[14px] font-medium text-[#2F66C8]"
        >
          <Plus className="h-4 w-4" />
          Add Another Member
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="flex items-center gap-[18px]">
        <Users className="h-6 w-6 text-[#2F66C8]" />
        <p className="font-sans text-[18px] font-semibold leading-[180%] text-[#0F172A]">
          1. Invite Team Members
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[1fr_1fr_1fr_90px] gap-2.5">
            {['Full Name', 'Work Email', 'Role', 'Actions'].map((label) => (
              <p key={label} className="font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                {label}
              </p>
            ))}
          </div>

          <div className="mt-2.5 flex flex-col gap-2.5">
            {members.map((member) => (
              <div key={member.id} className="grid grid-cols-[1fr_1fr_1fr_90px] gap-2.5">
                <input
                  type="text"
                  value={member.fullName}
                  onChange={(e) => updateMember(member.id, { fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="anchor-field h-[53px] text-[16px]"
                />
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMember(member.id, { email: e.target.value })}
                  placeholder="name@company.ca"
                  className="anchor-field h-[53px] text-[16px]"
                />
                <RoleSelect
                  value={member.role}
                  onChange={(role) => updateMember(member.id, { role })}
                />
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  disabled={members.length <= 1}
                  className="flex h-[53px] items-center justify-center rounded-[10px] bg-white text-[#EF4444] disabled:opacity-30"
                  aria-label="Remove member"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={addMember}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[6px] border border-dashed border-[#D9E1EF] bg-white px-6 py-3.5 text-[16px] font-medium text-[#2F66C8]"
      >
        <Plus className="h-4 w-4" />
        Add Another Member
      </button>
    </div>
  );
}

export function RolePermissionsSection({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="flex items-center gap-[18px]">
        <Shield className="h-6 w-6 text-[#2F66C8]" />
        <p className="font-sans text-[18px] font-semibold leading-[180%] text-[#0F172A]">
          2. Role &amp; Permissions Overview
        </p>
      </div>

      <div className={cn('mt-5 grid gap-2.5', compact ? 'grid-cols-1' : 'grid-cols-2 xl:grid-cols-4')}>
        {ROLE_DEFINITIONS.map((role) => (
          <div
            key={role.id}
            className="rounded-[20px] border border-[#EEF2F8] bg-[#F8FAFC] p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
                style={{ backgroundColor: role.iconBg }}
              >
                <Image src={role.icon} alt="" width={20} height={20} className="object-contain" />
              </div>
              <p className="font-serif text-[20px] text-[#0F172A]">{role.title}</p>
            </div>
            <p className="mt-4 text-[14px] text-[#44516A]">{role.description}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {role.permissions.map((permission) => (
                <li key={permission} className="flex items-center gap-2.5 text-[14px] text-[#44516A]">
                  <RoleCheck bg={role.checkBg} />
                  {permission}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrganizationOwnerSection({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="flex items-center gap-[18px]">
        <Crown className="h-6 w-6 text-[#2F66C8]" />
        <p className="font-sans text-[18px] font-semibold leading-[180%] text-[#0F172A]">
          3. Organization Owner
        </p>
      </div>

      <div className={cn('mt-5 flex gap-5', compact ? 'flex-col' : 'flex-col lg:flex-row lg:items-center')}>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
            <Image src={ORGANIZATION_OWNER.avatar} alt="" fill className="object-cover" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-sans text-[16px] font-semibold text-[#0F172A]">{ORGANIZATION_OWNER.name}</p>
              <span className="rounded bg-[#EFF4FF] px-2 py-0.5 text-[10px] font-bold uppercase text-[#2F66C8]">
                Owner
              </span>
            </div>
            <p className="mt-1 text-[14px] text-[#8C97AD]">{ORGANIZATION_OWNER.title}</p>
          </div>
        </div>

        <div className="flex-1 rounded-[10px] bg-[#EFF4FF] p-4">
          <p className="text-[14px] leading-normal text-[#44516A]">{ORGANIZATION_OWNER.note}</p>
        </div>
      </div>
    </div>
  );
}

export function TeamSidebarPanel() {
  return (
    <aside className="hidden w-[368px] shrink-0 xl:block">
      <div className="sticky top-24 rounded-[20px] border border-[#EEF2F8] bg-white p-8">
        <div className="relative mx-auto h-[180px] w-full max-w-[280px]">
          <Image src={TEAM_SIDEBAR.illustration} alt="" fill className="object-contain" />
        </div>

        <h2 className="mt-6 text-center font-serif text-[28px] leading-[1.2] text-[#0F172A]">
          {TEAM_SIDEBAR.title}
        </h2>

        <ul className="mt-6 flex flex-col gap-4">
          {WHY_TEAM_BENEFITS.map(({ icon, label }) => (
            <li key={label} className="flex items-start gap-3 text-[14px] text-[#44516A]">
              <Image src={icon} alt="" width={18} height={18} className="mt-0.5 shrink-0 object-contain" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4">
          <Image src={starIcon} alt="" width={24} height={24} className="shrink-0 object-contain" />
          <p className="text-[14px] leading-normal text-[#44516A]">
            <span className="font-semibold text-[#0F172A]">78%</span> of organizations with teams respond faster to applicants.
          </p>
        </div>

        <div className="mt-4 rounded-[10px] bg-[#EFF4FF] p-4">
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#2F66C8]" />
            <p className="text-[14px] leading-normal text-[#44516A]">{TEAM_SIDEBAR.soloNote}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileAccordionSection({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <div className="flex items-center gap-[18px]">
          {icon}
          <span className="font-sans text-[16px] font-semibold text-[#0F172A]">{title}</span>
        </div>
        <ChevronDown className={cn('h-5 w-5 text-[#44516A] transition-transform', open && 'rotate-180')} />
      </button>
      {open ? <div className="border-t border-[#EEF2F8] px-5 pb-5">{children}</div> : null}
    </div>
  );
}

export function useTeamMembers(initialCount = 1) {
  const [members, setMembers] = useState<TeamMemberDraft[]>(() =>
    Array.from({ length: initialCount }, () => createEmptyMember()),
  );
  return { members, setMembers };
}
