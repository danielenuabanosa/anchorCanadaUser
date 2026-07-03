'use client';

import { useState } from 'react';
import { Mail, UserMinus, UserPen, UserX, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TeamMemberRow } from './teamManagementData';

export function InviteTeamMemberModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [notes, setNotes] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="flex h-full w-full max-w-[720px] flex-col bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#EEF2F8] px-6 py-7">
          <h2 className="text-[20px] font-semibold text-[#0F172A]">Invite Team Member</h2>
          <button type="button" onClick={onClose} className="text-[#8C97AD] hover:text-[#0F172A]">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
          <Field label="Email Address" required>
            <div className="flex h-[53px] items-center gap-3 rounded-[8px] border border-[#D9E1EF] px-4">
              <Mail className="h-[18px] w-[18px] text-[#8C97AD]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 text-[14px] text-[#0F172A] outline-none"
              />
            </div>
          </Field>
          <Field label="Role" required>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-[53px] w-full appearance-none rounded-[8px] border border-[#D9E1EF] px-4 text-[14px] text-[#0F172A] outline-none"
            >
              <option value="">Select Role</option>
              <option>Administrator</option>
              <option>Manager</option>
              <option>Reviewer</option>
              <option>Coordinator</option>
            </select>
          </Field>
          <Field label="Department" optional>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="flex h-[53px] w-full appearance-none rounded-[8px] border border-[#D9E1EF] px-4 text-[14px] text-[#0F172A] outline-none"
            >
              <option value="">Select department</option>
              <option>Operations</option>
              <option>Programs</option>
              <option>Outreach</option>
            </select>
          </Field>
          <Field label="Notes" optional>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. You've been invited to join Maple Future Foundation. Please accept the invitation to get started."
              className="w-full resize-none rounded-[8px] border border-[#D9E1EF] p-4 text-[14px] text-[#0F172A] outline-none"
            />
          </Field>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#EEF2F8] px-6 py-6">
          <button type="button" onClick={onClose} className="rounded-[6px] px-5 py-2.5 text-[14px] font-medium text-[#44516A]">
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-[6px] bg-[#2F66C8] px-5 py-2.5 text-[14px] font-medium text-white">
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

export function MemberActionsMenu({
  open,
  member,
  onClose,
  variant = 'dropdown',
}: {
  open: boolean;
  member: TeamMemberRow;
  onClose: () => void;
  variant?: 'dropdown' | 'sheet';
}) {
  if (!open) return null;

  const isPending = member.status === 'Pending Invite';
  const items = isPending
    ? [
        { label: 'Resend Invite', icon: Mail },
        { label: 'Cancel Invite', icon: UserX, danger: true },
      ]
    : [
        { label: 'View Member', icon: Mail },
        { label: 'Edit Role', icon: UserPen },
        { label: 'Suspend Member', icon: UserMinus },
        { label: 'Remove Member', icon: UserX, danger: true },
      ];

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
                onClick={onClose}
                className={cn(
                  'flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm hover:bg-[#F8FAFC]',
                  item.danger ? 'text-[#B91C1C]' : 'text-[#0F172A]',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button type="button" className="fixed inset-0 z-40" onClick={onClose} aria-label="Close menu" />
      <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden rounded-[8px] border border-[#EEF2F8] bg-white py-1 shadow-lg">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={onClose}
            className={cn(
              'flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] hover:bg-[#F8FAFC]',
              item.danger ? 'text-[#B91C1C]' : 'text-[#0F172A]',
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>
    </>
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
      <p className="mb-2.5 text-[14px] font-medium text-[#0F172A]">
        {label}
        {required ? <span className="text-[#B91C1C]"> *</span> : null}
        {optional ? <span className="font-normal text-[#8C97AD]"> (Optional)</span> : null}
      </p>
      {children}
    </div>
  );
}
