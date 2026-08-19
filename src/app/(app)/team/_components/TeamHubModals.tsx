'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  ChevronDown,
  FileSpreadsheet,
  FileTerminal,
  FileType,
  Info,
  Mail,
  TextCursorInput,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { downloadTableExport } from '@/lib/exportTable';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import { Avatar } from '@/shared/components/ui/Avatar';
import { photoSrc } from '@/shared/lib/photoSrc';
import inviteExpiredHourglass from '@assets/images/team/invite-expired-hourglass.png';
import cancelInviteTrash from '@assets/images/team/cancel-invite-trash.png';
import removeMemberTrash from '@assets/images/team/remove-member-trash.png';
import suspendMemberShield from '@assets/images/team/suspend-member-shield.png';
import activateMemberCheck from '@assets/images/team/activate-member-check.png';
import type { InvitePayload, TeamMemberRow } from './teamManagementData';
import { PERMISSION_GROUPS, ROLE_STYLES, TEAM_MEMBERS, TEAM_ROLES } from './teamManagementData';
import { getActionsForMemberStatus, TeamActionsDropdown } from './TeamActionsDropdown';

function memberToInvitePayload(member: TeamMemberRow): InvitePayload {
  return {
    email: member.email,
    name: member.name,
    role: member.role,
    department: member.department,
    avatar: member.avatar,
  };
}

function emailToDisplayName(email: string): string {
  const local = email.split('@')[0] ?? 'Team Member';
  return local
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/**  Invite Team Member */
export function InviteTeamMemberModal({
  open,
  onClose,
  onSent,
}: {
  open: boolean;
  onClose: () => void;
  onSent: (payload: InvitePayload & { notes?: string }) => void | Promise<void>;
}) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  async function handleSend() {
    if (!email.trim() || !role || saving) return;
    setSaving(true);
    setError('');
    try {
      await onSent({
        email: email.trim(),
        name: emailToDisplayName(email.trim()),
        role,
        department: department || 'Programs',
        avatar: '',
        notes: notes.trim() || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send invitation.');
    } finally {
      setSaving(false);
    }
  }

  const body = (
    <div className="space-y-10">
      {error ? (
        <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : null}
      <Field label="Email Address" required>
        <div className="flex items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 transition-colors focus-within:border-[#2F66C8]">
          <Mail className="h-[18px] w-[18px] text-[#8C97AD]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="no-anchor-field flex-1 text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
          />
        </div>
      </Field>
      <Field label="Role" required>
        <HubMenuSelect
          value={role}
          onChange={setRole}
          placeholder="Select Role"
          options={[
            { value: 'Administrator', label: 'Administrator' },
            { value: 'Manager', label: 'Manager' },
            { value: 'Reviewer', label: 'Reviewer' },
            { value: 'Interviewer', label: 'Interviewer' },
            { value: 'Coordinator', label: 'Coordinator' },
          ]}
        />
      </Field>
      <Field label="Department" optional>
        <HubMenuSelect
          value={department}
          onChange={setDepartment}
          placeholder="Select department"
          options={[
            { value: 'Operations', label: 'Operations' },
            { value: 'Programs', label: 'Programs' },
            { value: 'Outreach', label: 'Outreach' },
          ]}
        />
      </Field>
      <Field label="Personal Notes" optional>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="e.g. You've been invited to join Maple Future Foundation. Please accept the invitation to get started."
          className="anchor-textarea resize-none"
        />
      </Field>
    </div>
  );

  const footer = (
    <SlideOverFooter
      onCancel={onClose}
      confirmLabel={saving ? 'Sending…' : 'Send Invitation'}
      onConfirm={() => void handleSend()}
    />
  );

  return (
    <ResponsiveFormShell title="Invite Team Member" onClose={onClose} footer={footer}>
      {body}
    </ResponsiveFormShell>
  );
}

/**  Invitation sent success */
export function InvitationSentModal({
  open,
  onClose,
  payload,
}: {
  open: boolean;
  onClose: () => void;
  payload: InvitePayload;
}) {
  if (!open) return null;

  return (
    <CenteredModalShell
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] md:mx-auto md:max-w-none"
        >
          Done
        </button>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#F1FFEE]">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#EDF9F1]">
            <CheckCircle2 className="h-20 w-20 text-[#15803D]" strokeWidth={1.25} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-center gap-1.5">
          <span className="font-serif text-[28px] text-[#0F172A] md:text-[36px]">Invitation Sent</span>
          <span className="font-serif text-[28px] italic text-[#2F66C8] md:text-[36px]">Successfully!</span>
        </div>

        <p className="mt-5 text-base text-[#44516A]">We&apos;ve sent an invitation to</p>

        <div className="mt-4 flex w-full items-center gap-4 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-3.5">
          <Avatar src={photoSrc(payload.avatar)} fallback={payload.name} size="sm" className="h-10 w-10" />
          <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-[#0F172A]">{payload.name}</p>
              <p className="truncate text-xs text-[#44516A]">{payload.email}</p>
            </div>
            <span className={cn('shrink-0 rounded-[4px] px-1.5 py-0.5 text-xs font-medium', ROLE_STYLES[payload.role])}>
              {payload.role}
            </span>
          </div>
        </div>

        <p className="mt-4 text-base text-[#44516A]">They&apos;ll receive an email with instructions to join</p>
      </div>
    </CenteredModalShell>
  );
}

/** mobile — Resend invitation */
export function ResendInvitationModal({
  open,
  onClose,
  member,
  onSent,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onSent: (payload: InvitePayload) => void | Promise<void>;
}) {
  const [role, setRole] = useState(member.role);
  const [department, setDepartment] = useState(member.department);
  const [notes, setNotes] = useState(
    "e.g. You've been invited to join Maple Future Foundation. Please accept the invitation to get started.",
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setRole(member.role);
      setDepartment(member.department);
    }
  }, [open, member]);

  if (!open) return null;

  const body = (
    <div className="space-y-10">
      <div className="flex gap-4 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
        <Info className="h-[26px] w-[26px] shrink-0 text-[#2F66C8]" strokeWidth={1.75} />
        <div>
          <p className="text-base font-medium text-[#0F172A]">You should know</p>
          <p className="mt-1 text-sm text-[#44516A]">This will send a new invitation email to the team member.</p>
        </div>
      </div>

      <Field label="Email Address" required>
        <div className="flex items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-[#F8FAFC] p-4">
          <Mail className="h-[18px] w-[18px] text-[#8C97AD]" />
          <span className="flex-1 text-base text-[#0F172A]">{member.email}</span>
        </div>
      </Field>

      <Field label="Role" required>
        <HubMenuSelect
          value={role}
          onChange={setRole}
          options={[
            { value: 'Administrator', label: 'Administrator' },
            { value: 'Manager', label: 'Manager' },
            { value: 'Reviewer', label: 'Reviewer' },
            { value: 'Interviewer', label: 'Interviewer' },
            { value: 'Coordinator', label: 'Coordinator' },
          ]}
        />
      </Field>

      <Field label="Department" optional>
        <HubMenuSelect
          value={department}
          onChange={setDepartment}
          options={[
            { value: 'Operations', label: 'Operations' },
            { value: 'Programs', label: 'Programs' },
            { value: 'Outreach', label: 'Outreach' },
          ]}
        />
      </Field>

      <Field label="Personal Notes" optional>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="anchor-textarea resize-none text-[#44516A]"
        />
      </Field>
    </div>
  );

  const footer = (
    <SlideOverFooter
      onCancel={onClose}
      confirmLabel={saving ? 'Sending…' : 'Send Invitation'}
      onConfirm={() => {
        void (async () => {
          setSaving(true);
          try {
            await onSent({ ...memberToInvitePayload(member), role, department });
          } finally {
            setSaving(false);
          }
        })();
      }}
    />
  );

  return (
    <ResponsiveFormShell title="Resend Invitation" onClose={onClose} footer={footer}>
      {body}
    </ResponsiveFormShell>
  );
}

/** Expired invitation */
export function ExpiredInviteModal({
  open,
  onClose,
  onResend,
}: {
  open: boolean;
  onClose: () => void;
  onResend: () => void;
}) {
  if (!open) return null;

  return (
    <CenteredModalShell
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onResend}
          className="flex w-full items-center justify-center rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"
        >
          Resend Invitation
        </button>
      }
    >
      <div className="flex flex-col items-center text-center">
        <Image
          src={inviteExpiredHourglass}
          alt=""
          width={160}
          height={160}
          className="h-40 w-40 object-contain"
          priority
        />

        <div className="mt-5 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0">
          <span className="font-serif text-[28px] leading-none text-[#0F172A] md:text-[36px]">
            This invitation has
          </span>
          <span className="font-serif text-[28px] italic leading-none text-[#2F66C8] md:text-[36px]">
            Expired!
          </span>
        </div>

        <p className="mt-2.5 text-base text-[#44516A]">
          Invitations are valid for 7 days. You can resend a new invitation
        </p>
      </div>
    </CenteredModalShell>
  );
}

/** Cancel invitation confirmation */
export function CancelInvitationModal({
  open,
  onClose,
  member,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onConfirm: () => void | Promise<void>;
}) {
  if (!open) return null;

  return (
    <CenteredModalShell
      onClose={onClose}
      width="confirm"
      footer={
        <div className="flex w-full gap-2.5 sm:gap-5">
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#0F172A]"
          >
            Keep Invitation
          </button>
          <button
            type="button"
            onClick={() => {
              void onConfirm();
            }}
            className="flex flex-1 items-center justify-center rounded-[6px] bg-[#EF4444] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"
          >
            Cancel Invitation
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center">
        <Image
          src={cancelInviteTrash}
          alt=""
          width={160}
          height={160}
          className="h-40 w-40 object-contain"
          priority
        />

        <div className="mt-5 flex flex-col items-center gap-0">
          <span className="font-serif text-[28px] leading-tight text-[#0F172A] md:text-[36px]">
            Are you sure you want to cancel this
          </span>
          <span className="font-serif text-[28px] italic leading-tight text-[#2F66C8] md:text-[36px]">
            Invitation?
          </span>
        </div>

        <p className="mt-2.5 text-base leading-relaxed text-[#44516A]">
          The invitation for <span className="font-semibold text-[#0F172A]">{member.email}</span> will be
          cancelled and they will no longer be able to accept the invitation or access the platform.
        </p>
      </div>
    </CenteredModalShell>
  );
}

export function EditRoleModal({
  open,
  onClose,
  member,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onSave?: (payload: { role: string; title?: string; permissions: string[] }) => void | Promise<void>;
}) {
  return <RolePermissionBuilderModal open={open} onClose={onClose} member={member} onSave={onSave} />;
}

export function EditPermissionsModal({
  open,
  onClose,
  member,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onSave?: (payload: { role: string; title?: string; permissions: string[] }) => void | Promise<void>;
}) {
  return <RolePermissionBuilderModal open={open} onClose={onClose} member={member} onSave={onSave} />;
}

/**  Role & Permission Builder */
export function RolePermissionBuilderModal({
  open,
  onClose,
  member,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onSave?: (payload: { role: string; title?: string; permissions: string[] }) => void | Promise<void>;
}) {
  const roleIdFromMember =
    TEAM_ROLES.find((r) => r.label === member.role)?.id ??
    (member.role && !['Administrator', 'Manager', 'Reviewer', 'Interviewer'].includes(member.role)
      ? 'custom'
      : 'administrator');
  const allPermissionKeys = useMemo(
    () => PERMISSION_GROUPS.flatMap((g) => g.permissions.map((p) => `${g.name}:${p}`)),
    [],
  );
  const [selectedRole, setSelectedRole] = useState<string>(roleIdFromMember);
  const [customRoleName, setCustomRoleName] = useState('');
  const [permissions, setPermissions] = useState<Set<string>>(() => new Set(allPermissionKeys));

  useEffect(() => {
    if (open) {
      const standard = TEAM_ROLES.find((r) => r.label === member.role)?.id;
      const roleId =
        standard ??
        (member.role && !['Administrator', 'Manager', 'Reviewer', 'Interviewer'].includes(member.role)
          ? 'custom'
          : 'administrator');
      setSelectedRole(roleId);
      setCustomRoleName(roleId === 'custom' ? member.title || member.role : '');
      if (roleId === 'custom' && member.permissionKeys?.length) {
        setPermissions(new Set(member.permissionKeys));
      } else {
        setPermissions(getPresetPermissions(roleId, allPermissionKeys));
      }
    }
  }, [open, member.role, member.title, member.permissionKeys, allPermissionKeys]);

  if (!open) return null;

  const isCustom = selectedRole === 'custom';
  const visibleGroups = PERMISSION_GROUPS;
  const visibleKeys = visibleGroups.flatMap((g) => g.permissions.map((p) => `${g.name}:${p}`));
  const allSelected = visibleKeys.length > 0 && visibleKeys.every((k) => permissions.has(k));

  function handleRoleChange(roleId: string) {
    setSelectedRole(roleId);
    if (roleId === 'custom') {
      setCustomRoleName((current) => current || member.title || '');
      setPermissions(member.permissionKeys?.length ? new Set(member.permissionKeys) : new Set());
      return;
    }
    setPermissions(getPresetPermissions(roleId, allPermissionKeys));
    setCustomRoleName('');
  }

  function togglePermission(key: string) {
    setPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleAll() {
    setPermissions(allSelected ? new Set() : new Set(visibleKeys));
  }

  const body = (radioName: string) => (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <div className="flex-1 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <p className="mb-5 text-base font-semibold leading-[1.8] text-[#0F172A]">Select Role</p>
        <div className="space-y-5">
          {TEAM_ROLES.map((role) => (
            <label key={role.id} className="flex cursor-pointer gap-5 rounded-[10px] p-2 hover:bg-[#F8FAFC]">
              <input
                type="radio"
                name={radioName}
                checked={selectedRole === role.id}
                onChange={() => handleRoleChange(role.id)}
                className="mt-0.5 h-6 w-6 shrink-0 accent-[#2F66C8]"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A]">{role.label}</p>
                <p className="text-sm text-[#44516A]">{role.description}</p>
              </div>
            </label>
          ))}
        </div>

        {isCustom ? (
          <div className="mt-8">
            <Field label="Custom role name" required>
              <div className="flex items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 transition-colors focus-within:border-[#2F66C8]">
                <TextCursorInput className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} />
                <input
                  type="text"
                  value={customRoleName}
                  onChange={(e) => setCustomRoleName(e.target.value)}
                  placeholder="e.g. Operations Manager"
                  autoFocus
                  className="no-anchor-field flex-1 text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
                />
              </div>
            </Field>
            <p className="mt-2 text-xs text-[#8C97AD]">
              Name the role, then tick the permissions this person should have after they log in.
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex-1 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-base font-semibold leading-[1.8] text-[#0F172A]">Permissions</p>
          <label className="flex shrink-0 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="h-6 w-6 rounded border-[#D9E1EF] bg-[#EEF2F8] text-[#2F66C8]"
            />
            <span className="text-sm font-semibold text-[#0F172A]">Select all</span>
          </label>
        </div>

        <div className="space-y-6">
          {visibleGroups.map((group) => (
            <div key={group.name}>
              <p className="mb-3 text-base font-semibold leading-[1.8] text-[#0F172A]">{group.name}</p>
              <div className="space-y-2.5">
                {group.permissions.map((permission) => {
                  const key = `${group.name}:${permission}`;
                  return (
                    <label key={key} className="flex cursor-pointer items-center gap-5">
                      <input
                        type="checkbox"
                        checked={permissions.has(key)}
                        onChange={() => togglePermission(key)}
                        className="h-6 w-6 rounded border-[#D9E1EF] text-[#2F66C8]"
                      />
                      <span className="text-sm text-[#44516A]">{permission}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const footer = (
    <SlideOverFooter
      onCancel={onClose}
      confirmLabel="Save Role"
      onConfirm={() => {
        void (async () => {
          if (selectedRole === 'custom' && !customRoleName.trim()) return;
          const roleLabel =
            TEAM_ROLES.find((r) => r.id === selectedRole)?.label ?? member.role;
          await onSave?.({
            role: selectedRole === 'custom' ? customRoleName.trim() : roleLabel,
            title: selectedRole === 'custom' ? customRoleName.trim() : undefined,
            permissions: Array.from(permissions),
          });
          onClose();
        })();
      }}
    />
  );

  return (
    <>
      {/* Mobile  */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px] md:hidden">
        <div className="flex max-h-[90vh] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
          <div className="flex shrink-0 items-center justify-between border-b border-[#EEF2F8] p-[26px]">
            <h2 className="text-lg font-medium text-[#0F172A]">Role & Permission Builder</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-[26px] py-10">{body('team-role-mobile')}</div>
          {footer}
        </div>
      </div>

      
      <div className="hidden md:block">
        <SlideOverShell title="Role & Permission Builder" onClose={onClose} maxWidth="840px" footer={footer}>
          {body('team-role-desktop')}
        </SlideOverShell>
      </div>
    </>
  );
}

function getPresetPermissions(roleId: string, allKeys: string[]): Set<string> {
  if (roleId === 'custom') return new Set();
  if (roleId === 'administrator' || roleId === 'manager') return new Set(allKeys);
  if (roleId === 'reviewer') {
    return new Set(
      allKeys.filter(
        (k) =>
          k.startsWith('Applications:') ||
          k === 'Opportunities:View Opportunity Analytics',
      ),
    );
  }
  if (roleId === 'interviewer') {
    return new Set(allKeys.filter((k) => k.includes('Schedule Interviews') || k.includes('Review Applications')));
  }
  return new Set();
}

/** Export Team Members */
export function ExportTeamMembersModal({
  open,
  onClose,
  rows,
}: {
  open: boolean;
  onClose: () => void;
  rows?: TeamMemberRow[];
}) {
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [checks, setChecks] = useState({
    info: true,
    roles: true,
    activity: true,
    departments: true,
  });

  if (!open) return null;

  const exportRows = rows?.length ? rows : TEAM_MEMBERS;

  function handleGenerate() {
    const headers = [
      ...(checks.info ? ['Name', 'Email', 'Title'] : []),
      ...(checks.roles ? ['Role', 'Permissions'] : []),
      ...(checks.departments ? ['Department'] : []),
      'Status',
      ...(checks.activity ? ['Last Active'] : []),
    ];

    const tableRows = exportRows.map((m) => {
      const row: Array<string | number> = [];
      if (checks.info) row.push(m.name, m.email, m.title);
      if (checks.roles) row.push(m.role, m.permissions);
      if (checks.departments) row.push(m.department);
      row.push(m.status);
      if (checks.activity) row.push(m.lastActive);
      return row;
    });

    downloadTableExport(format, 'team-members-export', headers, tableRows, {
      title: 'Export Team Members',
      sheetName: 'Team Members',
    });
    onClose();
  }

  return (
    <ModalShell
      title="Export Team Members"
      subtitle="Choose what data to include in your export"
      onClose={onClose}
      mobileNarrow
    >
      <div className="space-y-10">
        <div>
          <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Export Format</p>
          <div className="flex flex-wrap gap-2.5">
            {(
              [
                ['csv', 'CSV', FileTerminal],
                ['excel', 'Excel', FileSpreadsheet],
                ['pdf', 'PDF', FileType],
              ] as const
            ).map(([f, label, Icon]) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={cn(
                  'inline-flex items-center gap-2.5 rounded-[8px] border px-4 py-2.5 text-sm font-medium',
                  format === f
                    ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                    : 'border-[#EEF2F8] text-[#44516A]',
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Accepted File Formats</p>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-4 text-base text-[#0F172A]"
          >
            All Team Members ({TEAM_MEMBERS.length})
            <ChevronDown className="h-[18px] w-[18px] text-[#44516A]" />
          </button>
        </div>

        <div>
          <p className="mb-2.5 text-base font-semibold text-[#0F172A]">Include in Export</p>
          <div className="space-y-4">
            {(
              [
                ['info', 'Member Information'],
                ['roles', 'Roles & Permissions'],
                ['activity', 'Last Activity'],
                ['departments', 'Departments'],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-5 text-base text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={checks[key]}
                  onChange={(e) => setChecks((c) => ({ ...c, [key]: e.target.checked }))}
                  className="h-6 w-6 rounded border-[#D9E1EF] text-[#2F66C8]"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <ModalFooter onCancel={onClose} confirmLabel="Generate Export" onConfirm={handleGenerate} />
    </ModalShell>
  );
}

export function SuspendMemberModal({
  open,
  onClose,
  member,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;

  return (
    <CenteredModalShell
      onClose={onClose}
      footer={
        <ConfirmActionFooter
          onCancel={onClose}
          onConfirm={() => {
            void (async () => {
              await onConfirm?.();
              onClose();
            })();
          }}
          confirmLabel="Suspend Member"
          danger
        />
      }
    >
      <MemberActionConfirmBody
        image={suspendMemberShield}
        title="Suspend"
        accent="Team Member?"
        question="Are you sure you want to suspend this member."
        member={member}
        description="All access and permissions assigned to this user will be temporarily revoked until reactivated."
      />
    </CenteredModalShell>
  );
}

/**  Activate / reactivate member */
export function ActivateMemberModal({
  open,
  onClose,
  member,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;

  return (
    <CenteredModalShell
      onClose={onClose}
      footer={
        <ConfirmActionFooter
          onCancel={onClose}
          onConfirm={() => {
            void (async () => {
              await onConfirm?.();
              onClose();
            })();
          }}
          confirmLabel="Activate Member"
        />
      }
    >
      <MemberActionConfirmBody
        image={activateMemberCheck}
        title="Activate"
        accent="Team Member?"
        question="Are you sure you want to activate this member."
        member={member}
        description="All access and permissions assigned to this user will be restored."
      />
    </CenteredModalShell>
  );
}

/**  Remove member confirmation */
export function RemoveMemberModal({
  open,
  onClose,
  member,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamMemberRow;
  onConfirm?: () => void | Promise<void>;
}) {
  if (!open) return null;

  return (
    <CenteredModalShell
      onClose={onClose}
      footer={
        <ConfirmActionFooter
          onCancel={onClose}
          onConfirm={() => {
            void (async () => {
              await onConfirm?.();
              onClose();
            })();
          }}
          confirmLabel="Remove Member"
          danger
        />
      }
    >
      <MemberActionConfirmBody
        image={removeMemberTrash}
        title="Remove"
        accent="Team Member?"
        question="Are you sure you want to remove this member from this account."
        member={member}
        description={
          <>
            All access and permissions assigned to this user will be revoked.
            <br />
            This cannot be undone
          </>
        }
      />
    </CenteredModalShell>
  );
}

export type TeamHubModal =
  | { type: 'invite' }
  | { type: 'invitation-sent'; payload: InvitePayload }
  | { type: 'resend'; member: TeamMemberRow }
  | { type: 'expired'; member: TeamMemberRow }
  | { type: 'cancel-invite'; member: TeamMemberRow }
  | { type: 'role'; member: TeamMemberRow }
  | { type: 'permissions'; member: TeamMemberRow }
  | { type: 'suspend'; member: TeamMemberRow }
  | { type: 'activate'; member: TeamMemberRow }
  | { type: 'remove'; member: TeamMemberRow };

export function handleTeamMemberAction(
  member: TeamMemberRow,
  label: string,
  setModal: (modal: TeamHubModal) => void,
  onViewMember?: () => void,
) {
  if (label === 'View Member') {
    onViewMember?.();
    return;
  }
  if (label === 'Resend Invite') {
    if (member.inviteExpired) setModal({ type: 'expired', member });
    else setModal({ type: 'resend', member });
    return;
  }
  if (label === 'Edit Invite') {
    setModal({ type: 'resend', member });
    return;
  }
  if (label === 'Cancel Invite') {
    setModal({ type: 'cancel-invite', member });
    return;
  }
  if (label === 'Edit Role') setModal({ type: 'role', member });
  else if (label === 'Edit Permissions') setModal({ type: 'permissions', member });
  else if (label === 'Suspend Member') setModal({ type: 'suspend', member });
  else if (label === 'Reactivate Member') setModal({ type: 'activate', member });
  else if (label === 'Remove Member' || label === 'Remove Invite') setModal({ type: 'remove', member });
}

export function TeamHubModalLayer({
  modal,
  onClose,
  onSetModal,
  onInvite,
  onResend,
  onCancelInvite,
  onSaveRole,
  onSuspend,
  onActivate,
  onRemove,
}: {
  modal: TeamHubModal | null;
  onClose: () => void;
  onSetModal: (modal: TeamHubModal | null) => void;
  onInvite?: (payload: InvitePayload & { notes?: string }) => Promise<InvitePayload>;
  onResend?: (member: TeamMemberRow, payload: InvitePayload) => Promise<InvitePayload>;
  onCancelInvite?: (member: TeamMemberRow) => Promise<void>;
  onSaveRole?: (
    member: TeamMemberRow,
    payload: { role: string; title?: string; permissions: string[] },
  ) => Promise<void>;
  onSuspend?: (member: TeamMemberRow) => Promise<void>;
  onActivate?: (member: TeamMemberRow) => Promise<void>;
  onRemove?: (member: TeamMemberRow) => Promise<void>;
}) {
  if (!modal) return null;

  if (modal.type === 'invite') {
    return (
      <InviteTeamMemberModal
        open
        onClose={onClose}
        onSent={async (payload) => {
          const sent = onInvite ? await onInvite(payload) : payload;
          onSetModal({ type: 'invitation-sent', payload: sent });
        }}
      />
    );
  }

  if (modal.type === 'invitation-sent') {
    return <InvitationSentModal open onClose={onClose} payload={modal.payload} />;
  }

  if (modal.type === 'resend') {
    return (
      <ResendInvitationModal
        open
        member={modal.member}
        onClose={onClose}
        onSent={async (payload) => {
          const sent = onResend ? await onResend(modal.member, payload) : payload;
          onSetModal({ type: 'invitation-sent', payload: sent });
        }}
      />
    );
  }

  if (modal.type === 'expired') {
    return (
      <ExpiredInviteModal
        open
        onClose={onClose}
        onResend={() => onSetModal({ type: 'resend', member: modal.member })}
      />
    );
  }

  if (modal.type === 'cancel-invite') {
    return (
      <CancelInvitationModal
        open
        member={modal.member}
        onClose={onClose}
        onConfirm={async () => {
          await onCancelInvite?.(modal.member);
          onClose();
        }}
      />
    );
  }

  if (modal.type === 'role') {
    return (
      <EditRoleModal
        open
        onClose={onClose}
        member={modal.member}
        onSave={async (payload) => {
          await onSaveRole?.(modal.member, payload);
        }}
      />
    );
  }
  if (modal.type === 'permissions') {
    return (
      <EditPermissionsModal
        open
        onClose={onClose}
        member={modal.member}
        onSave={async (payload) => {
          await onSaveRole?.(modal.member, payload);
        }}
      />
    );
  }
  if (modal.type === 'suspend') {
    return (
      <SuspendMemberModal
        open
        onClose={onClose}
        member={modal.member}
        onConfirm={async () => {
          await onSuspend?.(modal.member);
        }}
      />
    );
  }
  if (modal.type === 'activate') {
    return (
      <ActivateMemberModal
        open
        onClose={onClose}
        member={modal.member}
        onConfirm={async () => {
          await onActivate?.(modal.member);
        }}
      />
    );
  }
  if (modal.type === 'remove') {
    return (
      <RemoveMemberModal
        open
        onClose={onClose}
        member={modal.member}
        onConfirm={async () => {
          await onRemove?.(modal.member);
        }}
      />
    );
  }

  return null;
}

export function MemberActionsMenu({
  open,
  member,
  onClose,
  onAction,
  variant = 'dropdown',
}: {
  open: boolean;
  member: TeamMemberRow;
  onClose: () => void;
  onAction?: (label: string) => void;
  variant?: 'dropdown' | 'sheet';
  /** @deprecated Fixed portal menus float on scroll — ignored; use relative dropdown. */
  anchorRect?: DOMRect | null;
}) {
  if (!open) return null;

  const items = getActionsForMemberStatus(member.status);

  if (variant === 'sheet') {
    return (
      <div className="fixed inset-0 z-50 md:hidden">
        <button type="button" className="absolute inset-0 bg-black/30" onClick={onClose} aria-label="Close menu" />
        <div className="absolute bottom-0 left-0 right-0 rounded-t-[16px] bg-white pb-8">
          <div className="border-b border-[#EEF2F8] px-5 py-4">
            <p className="text-base font-medium text-[#0F172A]">{member.name}</p>
            <p className="text-sm text-[#8C97AD]">Member actions</p>
          </div>
          <div className="py-2">
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onAction?.(item.label);
                  onClose();
                }}
                className={cn(
                  'flex w-full items-center gap-3 border-b border-[#EEF2F8] px-5 py-3.5 text-left text-sm last:border-b-0 hover:bg-[#F8FAFC]',
                  item.tone === 'warning' && 'text-[#B45309]',
                  item.tone === 'danger' && 'text-[#B91C1C]',
                  item.tone === 'success' && 'text-[#15803D]',
                  !item.tone && 'text-[#0F172A]',
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <TeamActionsDropdown
      open={open}
      onClose={onClose}
      status={member.status}
      onAction={onAction}
      align="right"
    />
  );
}

function ResponsiveFormShell({
  title,
  onClose,
  children,
  footer,
  maxWidth = '720px',
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: '720px' | '840px';
}) {
  return (
    <>
      {/* Mobile  */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px] md:hidden">
        <div className="flex max-h-[90vh] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
          <div className="flex shrink-0 items-center justify-between border-b border-[#EEF2F8] p-[26px]">
            <h2 className="text-lg font-medium text-[#0F172A]">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-[26px] py-10">{children}</div>
          {footer}
        </div>
      </div>

      {/* right slide-over */}
      <div className="hidden md:block">
        <SlideOverShell title={title} onClose={onClose} maxWidth={maxWidth} footer={footer}>
          {children}
        </SlideOverShell>
      </div>
    </>
  );
}

function SlideOverShell({
  title,
  onClose,
  children,
  footer,
  maxWidth = '720px',
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: '720px' | '840px';
}) {
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/40 md:bg-[#0F172A]/60 md:backdrop-blur-[5px]">
      <div
        className={cn(
          'flex h-full w-full flex-col bg-white shadow-xl',
          maxWidth === '840px' ? 'max-w-[840px]' : 'max-w-[720px]',
        )}
      >
        <div className="flex shrink-0 items-start justify-between border-b border-[#EEF2F8] p-[26px]">
          <h2 className="text-lg font-medium text-[#0F172A]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-[26px] py-10">{children}</div>
          {footer}
        </div>
      </div>
    </div>
  );
}

function SlideOverFooter({
  onCancel,
  onConfirm,
  confirmLabel,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
}) {
  return (
    <div className="flex justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
      <button
        type="button"
        onClick={onCancel}
        className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"
      >
        {confirmLabel}
      </button>
    </div>
  );
}

function CenteredModalShell({
  onClose,
  children,
  footer,
  width = 'success',
}: {
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'success' | 'confirm';
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-[5px]">
      <div
        className={cn(
          'flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
          'max-w-[400px] md:max-w-[720px]',
        )}
      >
        <div className="flex justify-end border-b border-[#EEF2F8] p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto px-[26px] py-10">{children}</div>
        {footer ? (
          <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

function ConfirmActionFooter({
  onCancel,
  onConfirm,
  confirmLabel,
  danger,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  danger?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-end gap-5">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#0F172A]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className={cn(
          'inline-flex items-center justify-center rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
          danger ? 'bg-[#EF4444]' : 'bg-[#2F66C8]',
        )}
      >
        {confirmLabel}
      </button>
    </div>
  );
}

function MemberActionConfirmBody({
  image,
  title,
  accent,
  question,
  member,
  description,
}: {
  image: typeof removeMemberTrash;
  title: string;
  accent: string;
  question: string;
  member: TeamMemberRow;
  description: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image src={image} alt="" width={160} height={160} className="h-40 w-40 object-contain" priority />

      <div className="mt-5 flex flex-wrap items-baseline justify-center gap-x-1.5">
        <span className="font-serif text-[28px] leading-none text-[#0F172A]">{title}</span>
        <span className="font-serif text-[28px] italic leading-none text-[#2F66C8] md:text-[36px]">
          {accent}
        </span>
      </div>

      <p className="mt-2.5 text-base text-[#44516A]">{question}</p>

      <div className="mt-4 flex w-full max-w-[337px] items-center gap-4 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-3.5">
        <Avatar
          src={photoSrc(member.avatar)}
          fallback={member.name}
          size="sm"
          className="h-10 w-10 shrink-0"
        />
        <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-medium text-[#0F172A]">{member.name}</p>
            <p className="truncate text-xs text-[#44516A]">{member.email}</p>
          </div>
          <span
            className={cn(
              'shrink-0 rounded-[4px] px-1.5 py-0.5 text-xs font-medium',
              ROLE_STYLES[member.role] ?? 'bg-[#E9F4FF] text-[#105CF0]',
            )}
          >
            {member.role}
          </span>
        </div>
      </div>

      <p className="mt-4 text-base leading-normal text-[#44516A]">{description}</p>
    </div>
  );
}

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
  mobileNarrow,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;

  mobileNarrow?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-[5px]">
      <div
        className={cn(
          'flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
          mobileNarrow ? 'max-w-[400px] md:max-w-[720px]' : 'max-w-[720px]',
        )}
      >
        <div className="flex items-start justify-between border-b border-[#EEF2F8] p-[26px]">
          <div>
            <h2 className="text-lg font-medium text-[#0F172A]">{title}</h2>
            {subtitle ? <p className="mt-1.5 text-sm leading-[1.4] text-[#44516A]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto px-[26px] py-10">{children}</div>
      </div>
    </div>
  );
}

function ModalFooter({
  onCancel,
  onConfirm,
  confirmLabel,
  confirmDanger,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  confirmDanger?: boolean;
}) {
  return (
    <div className="-mx-[26px] -mb-10 mt-6 flex justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
      <button
        type="button"
        onClick={onCancel}
        className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className={cn(
          'rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
          confirmDanger ? 'bg-[#B91C1C]' : 'bg-[#2F66C8]',
        )}
      >
        {confirmLabel}
      </button>
    </div>
  );
}

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2.5 text-base font-semibold text-[#0F172A]">
        {label}
        {required ? <span className="text-[#B91C1C]"> *</span> : null}
        {optional ? <span className="font-normal text-[#8C97AD]"> (Optional)</span> : null}
      </p>
      {children}
    </div>
  );
}
