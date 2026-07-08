'use client';

import { useState } from 'react';
import { Archive, Eye, EyeOff, ShieldCheck, TextCursorInput, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SettingsHub } from './useSettingsHub';

function ModalBackdrop({ onClose, children, drawer }: { onClose: () => void; children: React.ReactNode; drawer?: boolean }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex bg-[rgba(15,23,42,0.6)] backdrop-blur-[5px]',
        drawer ? 'items-center justify-center p-5 md:items-stretch md:justify-end md:p-2.5' : 'items-center justify-center p-5',
      )}
    >
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className={cn('relative', drawer && 'md:h-full')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function ModalPanel({
  children,
  className,
  drawer,
}: {
  children: React.ReactNode;
  className?: string;
  drawer?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex w-[min(400px,calc(100vw-40px))] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
        drawer ? 'max-h-[85vh] md:h-full md:max-h-none md:w-[720px]' : 'max-h-[85vh]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"
      aria-label="Close"
    >
      <X className="h-6 w-6" strokeWidth={1.75} />
    </button>
  );
}

function ModalCloseBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex shrink-0 items-center justify-end border-b border-[#EEF2F8] p-[26px]">
      <ModalCloseButton onClose={onClose} />
    </div>
  );
}

function ModalIllustration({
  icon: Icon,
  bgClassName,
  iconClassName,
}: {
  icon: typeof ShieldCheck;
  bgClassName: string;
  iconClassName: string;
}) {
  return (
    <div className={cn('mb-5 flex h-40 w-40 items-center justify-center rounded-[80px] p-4', bgClassName)}>
      <Icon className={cn('h-24 w-24', iconClassName)} strokeWidth={1.25} />
    </div>
  );
}

function ModalFooter({
  cancelLabel = 'Cancel',
  confirmLabel,
  onCancel,
  onConfirm,
  confirmClassName,
}: {
  cancelLabel?: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmClassName?: string;
}) {
  return (
    <div className="flex shrink-0 items-end justify-end border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
      <div className="flex gap-5">
        <button
          type="button"
          onClick={onCancel}
          className="w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={cn(
            'rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
            confirmClassName ?? 'bg-[#2F66C8]',
          )}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex w-full flex-col gap-2.5">
      <label className="text-base font-semibold leading-[1.8] text-[#0F172A]">{label}</label>
      <div className="flex items-center justify-between anchor-field anchor-field--icon-left anchor-field--icon-right p-4">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <TextCursorInput className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} />
          <input
            type={show ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="••••••••••••"
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-[#0F172A] shadow-none outline-none placeholder:text-[#8C97AD] focus:border-0 focus:shadow-none"
          />
        </div>
        <button type="button" onClick={() => setShow(!show)} className="shrink-0 text-[#44516A]" aria-label={show ? 'Hide password' : 'Show password'}>
          {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>
    </div>
  );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  const strength = next.length >= 12 ? 3 : next.length >= 8 ? 2 : next.length >= 4 ? 1 : 0;

  return (
    <ModalBackdrop onClose={onClose} drawer>
      <ModalPanel drawer>
        <div className="flex items-center justify-between border-b border-[#EEF2F8] p-[26px]">
          <p className="text-lg font-medium text-[#0F172A]">Change Password</p>
          <ModalCloseButton onClose={onClose} />
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto px-[26px] py-10">
          <PasswordField label="Current Password" value={current} onChange={setCurrent} />
          <PasswordField label="New Password" value={next} onChange={setNext} />
          <PasswordField label="Confirm New Password" value={confirm} onChange={setConfirm} />
          {next ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-1 gap-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn('h-1.5 flex-1 rounded-full', i < strength ? 'bg-[#22C55E]' : 'bg-[#D1FAE5]')}
                  />
                ))}
              </div>
              <span className="ml-3 text-sm text-[#15803D]">{strength >= 3 ? 'Strong' : strength >= 2 ? 'Good' : 'Weak'}</span>
            </div>
          ) : null}
        </div>
        <ModalFooter cancelLabel="Cancel" confirmLabel="Update Password" onCancel={onClose} onConfirm={onClose} />
      </ModalPanel>
    </ModalBackdrop>
  );
}

function Enable2FAModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <ModalPanel>
        <ModalCloseBar onClose={onClose} />
        <div className="flex flex-col items-center px-[26px] py-10">
          <ModalIllustration icon={ShieldCheck} bgClassName="bg-[#F1FFEE]" iconClassName="text-[#15803D]" />
          <div className="text-center">
            <p className="font-instrument-serif text-[28px] text-[#0F172A]">Enable Two-Factor</p>
            <p className="font-instrument-serif text-[36px] italic text-[#2F66C8]">Authentication</p>
          </div>
          <p className="mt-5 text-center text-base text-[#44516A]">
            Add an extra layer of security to your account by enabling two-factor authentication
          </p>
        </div>
        <ModalFooter cancelLabel="Cancel" confirmLabel="Enable 2FA" onCancel={onClose} onConfirm={onConfirm} />
      </ModalPanel>
    </ModalBackdrop>
  );
}

function DeleteOrganizationModal({ onClose }: { onClose: () => void }) {
  const [confirmText, setConfirmText] = useState('');

  return (
    <ModalBackdrop onClose={onClose}>
      <ModalPanel>
        <ModalCloseBar onClose={onClose} />
        <div className="flex flex-col items-center px-[26px] py-10">
          <ModalIllustration icon={Trash2} bgClassName="bg-[#FEF2F2]" iconClassName="text-[#EF4444]" />
          <div className="flex items-baseline justify-center gap-1.5 text-center">
            <p className="font-instrument-serif text-[28px] text-[#0F172A]">Delete</p>
            <p className="font-instrument-serif text-[36px] italic text-[#2F66C8]">Organization</p>
          </div>
          <p className="mt-5 text-center text-base text-[#44516A]">
            This action cannot be undone. All data including opportunities, applications and team members will be
            permanently deleted.
          </p>
          <div className="mt-4 flex w-full items-center justify-between anchor-field anchor-field--icon-left p-4">
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <TextCursorInput className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} />
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder='Type "DELETE" to confirm'
                className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-[#0F172A] shadow-none outline-none placeholder:text-[#8C97AD] focus:border-0 focus:shadow-none"
              />
            </div>
          </div>
        </div>
        <ModalFooter
          cancelLabel="Cancel"
          confirmLabel="Delete Organization"
          onCancel={onClose}
          onConfirm={onClose}
          confirmClassName="bg-[#EF4444]"
        />
      </ModalPanel>
    </ModalBackdrop>
  );
}

function ArchiveOrganizationModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <ModalPanel>
        <ModalCloseBar onClose={onClose} />
        <div className="flex flex-col items-center px-[26px] py-10">
          <ModalIllustration icon={Archive} bgClassName="bg-[#FFFBEB]" iconClassName="text-[#B45309]" />
          <div className="flex items-baseline justify-center gap-1.5 text-center">
            <p className="font-instrument-serif text-[28px] text-[#0F172A]">Archive</p>
            <p className="font-instrument-serif text-[36px] italic text-[#2F66C8]">Organization</p>
          </div>
          <p className="mt-5 text-center text-base text-[#44516A]">
            Archiving will hide your organization from public view. You can restore it at any time from your account
            settings.
          </p>
        </div>
        <ModalFooter
          cancelLabel="Cancel"
          confirmLabel="Archive Organization"
          onCancel={onClose}
          onConfirm={onClose}
          confirmClassName="bg-[#B45309]"
        />
      </ModalPanel>
    </ModalBackdrop>
  );
}

export function SettingsModals({ hub }: { hub: SettingsHub }) {
  if (!hub.modal) return null;

  const close = () => hub.setModal(null);

  if (hub.modal === 'changePassword') return <ChangePasswordModal onClose={close} />;
  if (hub.modal === 'enable2FA') return <Enable2FAModal onClose={close} onConfirm={hub.enable2FA} />;
  if (hub.modal === 'deleteOrganization') return <DeleteOrganizationModal onClose={close} />;
  if (hub.modal === 'archiveOrganization') return <ArchiveOrganizationModal onClose={close} />;

  return null;
}
