'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  BarChart3,
  Check,
  ChevronDown,
  Crown,
  FileUser,
  Handshake,
  Network,
  Plus,
  Settings,
  Shield,
  Timer,
  Trash2,
  UserCircle,
  UserPlus,
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
import { profileService } from '@/features/profile/services/profile.service';
import { useAuthStore } from '@/store/authStore';
import { useProviderOnboardingStore } from '@/store/onboardingStore';

const BENEFIT_ICONS = {
  handshake: Handshake,
  'file-user': FileUser,
  network: Network,
  timer: Timer,
  settings: Settings,
} as const;

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
          'no-anchor-field w-full cursor-pointer appearance-none rounded-[10px] border border-[#D9E1EF] bg-white py-4 pl-11 pr-10 text-base text-[#0F172A] transition-colors focus:border-[#2F66C8] focus:outline-none',
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
  const [open, setOpen] = useState(true);

  function updateMember(id: string, patch: Partial<TeamMemberDraft>) {
    onChange(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function removeMember(id: string) {
    if (members.length <= 1) {
      onChange([createEmptyMember()]);
      return;
    }
    onChange(members.filter((m) => m.id !== id));
  }

  function addMember() {
    onChange([...members, createEmptyMember()]);
  }

  if (compact) {
    return (
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between text-left"
          aria-expanded={open}
        >
          <span className="flex items-center gap-[18px]">
            <Users className="h-6 w-6 text-[#2F66C8]" />
            <span className="font-sans text-[16px] font-semibold leading-[180%] text-[#0F172A]">
              1. Invite Team Members
            </span>
          </span>
          <ChevronDown className={cn('h-6 w-6 text-[#44516A] transition-transform', open && 'rotate-180')} />
        </button>

        {open ? (
          <>
            <div className="mt-5 flex flex-col gap-5">
              {members.map((member) => (
                <div key={member.id} className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-sans text-[14px] font-medium leading-[1.8] text-[#0F172A]">
                      Full Name
                    </label>
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="text-[#EF4444]"
                    aria-label="Remove member"
                  >
                    <Trash2 className="h-[18px] w-[18px]" />
                  </button>
                  </div>
                  <input
                    type="text"
                    value={member.fullName}
                    onChange={(e) => updateMember(member.id, { fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="no-anchor-field"
                  />
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateMember(member.id, { email: e.target.value })}
                    placeholder="name@company.ca"
                    className="no-anchor-field"
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
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-dashed border-[#D9E1EF] bg-white text-[14px] font-medium text-[#2F66C8]"
            >
              <Plus className="h-4 w-4" />
              Add Another Member
            </button>
          </>
        ) : null}
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
                  className="no-anchor-field"
                />
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMember(member.id, { email: e.target.value })}
                  placeholder="name@company.ca"
                  className="no-anchor-field"
                />
                <RoleSelect
                  value={member.role}
                  onChange={(role) => updateMember(member.id, { role })}
                />
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  disabled={members.length <= 1}
                  className="flex items-center justify-center rounded-[10px] bg-white p-4 text-[#EF4444] disabled:opacity-30"
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
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <button
        type="button"
        onClick={() => compact && setOpen((value) => !value)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={!compact || open}
      >
        <span className="flex items-center gap-[18px]">
          <Shield className="h-6 w-6 text-[#2F66C8]" />
          <span className={cn('font-sans font-semibold leading-[180%] text-[#0F172A]', compact ? 'text-[16px]' : 'text-[18px]')}>
            2. Role &amp; Permissions Overview
          </span>
        </span>
        {compact ? (
          <ChevronDown className={cn('h-6 w-6 text-[#44516A] transition-transform', open && 'rotate-180')} />
        ) : null}
      </button>

      {(!compact || open) ? <div className={cn('mt-5 grid gap-2.5', compact ? 'grid-cols-1' : 'grid-cols-2 xl:grid-cols-4')}>
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
      </div> : null}
    </div>
  );
}

function isRenderableAvatarUrl(src?: string) {
  if (!src) return false;
  const path = src.split('?')[0]?.toLowerCase() ?? '';
  return /\.(avif|gif|jpe?g|png|svg|webp)$/.test(path) || src.startsWith('data:image/');
}

export function OrganizationOwnerSection({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const ownerName = user?.name?.trim() || ORGANIZATION_OWNER.name;
  const uploadedAvatar = isRenderableAvatarUrl(user?.avatarUrl) ? user?.avatarUrl : undefined;

  async function uploadOwnerAvatar(file?: File) {
    if (!file || uploading) return;
    setUploading(true);
    try {
      const result = await profileService.uploadAvatar(file);
      updateUser({ avatarUrl: result.avatarUrl });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <button
        type="button"
        onClick={() => compact && setOpen((value) => !value)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={!compact || open}
      >
        <span className="flex items-center gap-[18px]">
          <Crown className="h-6 w-6 text-[#2F66C8]" />
          <span className={cn('font-sans font-semibold leading-[180%] text-[#0F172A]', compact ? 'text-[16px]' : 'text-[18px]')}>
            3. Organization Owner
          </span>
        </span>
        {compact ? (
          <ChevronDown className={cn('h-6 w-6 text-[#44516A] transition-transform', open && 'rotate-180')} />
        ) : null}
      </button>

      {(!compact || open) ? (
        <div
          className={cn(
            'mt-5 flex gap-5',
            compact ? 'flex-col' : 'flex-col justify-between lg:flex-row lg:items-start',
          )}
        >
          <div className="flex items-center gap-5">
            <label className="group relative h-20 w-20 shrink-0 cursor-pointer" title="Change owner photo">
              <span
                className={cn(
                  'relative block h-20 w-20 overflow-hidden rounded-full ring-2 ring-transparent transition',
                  uploading ? 'opacity-50' : 'group-hover:ring-[#D9E1EF]',
                )}
              >
                <Image
                  src={uploadedAvatar || ORGANIZATION_OWNER.avatar}
                  alt={ownerName}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                disabled={uploading}
                onChange={(event) => void uploadOwnerAvatar(event.target.files?.[0])}
              />
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="font-serif text-[24px] leading-normal text-[#0F172A]">{ownerName}</p>
                <span className="rounded bg-[#EFF4FF] px-1.5 py-1 text-[14px] text-[#2F66C8]">
                  OWNER
                </span>
              </div>
              <p className="text-[14px] text-[#44516A]">{ORGANIZATION_OWNER.title}</p>
            </div>
          </div>

          <div className={cn('rounded-[10px] border border-[#EEF2F8] bg-[#EFF4FF] p-5', compact ? 'w-full' : 'w-full lg:w-[418px] lg:shrink-0')}>
            <p className="text-[14px] leading-normal text-[#44516A]">{ORGANIZATION_OWNER.note}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TeamSidebarPanel() {
  return (
    <aside className="hidden w-[368px] shrink-0 xl:block">
      <div className="sticky top-24 flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="flex flex-col items-center gap-5 pt-5">
          <div className="relative h-[146px] w-[243px] shrink-0">
            <Image
              src={TEAM_SIDEBAR.illustration}
              alt=""
              fill
              className="object-contain"
              sizes="243px"
              priority
            />
          </div>
          <h2 className="text-center font-serif text-[28px] leading-[56px] text-[#0F172A]">
            {TEAM_SIDEBAR.title}
          </h2>
        </div>

        <ul className="flex w-full flex-col gap-4">
          {WHY_TEAM_BENEFITS.map(({ icon, label }) => {
            const Icon = BENEFIT_ICONS[icon];
            return (
              <li key={label} className="flex h-6 items-center gap-5">
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[13px] bg-[#EFF4FF]">
                  <Icon className="h-[13px] w-[13px] text-[#2F66C8]" strokeWidth={2} />
                </span>
                <span className="text-[14px] leading-normal text-[#0F172A]">{label}</span>
              </li>
            );
          })}
        </ul>

        <div className="flex w-full flex-col gap-2.5">
          <div className="flex items-center gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[40px] bg-[#EFF4FF]">
              <BarChart3 className="h-8 w-8 text-[#2F66C8]" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[40px] font-bold leading-none text-[#2F66C8]">{TEAM_SIDEBAR.statPercent}</p>
              <p className="mt-1 text-[12px] font-medium leading-normal text-[#0F172A]">
                {TEAM_SIDEBAR.statLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-[10px] bg-[#EFF4FF] p-4">
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[26px] bg-white">
              <UserPlus className="h-[26px] w-[26px] text-[#2F66C8]" strokeWidth={1.75} />
            </span>
            <p className="text-[12px] leading-normal text-[#44516A]">{TEAM_SIDEBAR.soloNote}</p>
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
  const storedMembers = useProviderOnboardingStore((state) => state.teamMembers);
  const [members, setMembers] = useState<TeamMemberDraft[]>(() => {
    if (storedMembers.length > 0) {
      return storedMembers.map((member) => ({
        id: member.id,
        fullName: member.fullName ?? '',
        email: member.email,
        role: member.role === 'Editor' ? 'Admin' : member.role,
      }));
    }
    return Array.from({ length: initialCount }, () => createEmptyMember());
  });
  return { members, setMembers };
}
