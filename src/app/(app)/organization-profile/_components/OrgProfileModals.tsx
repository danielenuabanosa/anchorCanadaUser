'use client';

import Link from 'next/link';
import { type ElementType, type Dispatch, type SetStateAction } from 'react';
import {
  ChevronDown,
  Check,
  CircleHelp,
  Clock,
  File,
  FileBadge,
  MailCheck,
  MailX,
  Send,
  ShieldCheck,
  ShieldQuestionMark,
  ShieldX,
  Trash2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  EDIT_PROFILE_SECTIONS,
  FOCUS_AREA_OPTIONS,
  INDUSTRY_OPTIONS,
  ORG_ACTION_ITEMS,
  ORG_SIZE_OPTIONS,
  ORG_TYPE_OPTIONS,
  VERIFICATION_ITEM_ICONS,
  VERIFICATION_STATUS_STYLES,
  type EditProfileSection,
  type OrgProfileModal,
} from './orgProfileData';
import type { OrgProfileHub } from './useOrgProfileHub';

function ModalBackdrop({
  onClose,
  children,
  drawer,
}: {
  onClose: () => void;
  children: React.ReactNode;
  drawer?: boolean;
}) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex bg-[rgba(15,23,42,0.6)] backdrop-blur-[5px]',
        drawer ? 'items-stretch justify-end p-2.5' : 'items-center justify-center p-5 md:p-2.5',
      )}
    >
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close modal" />
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
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

function FormField({
  label,
  value,
  onChange,
  select,
  options,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  select?: boolean;
  options?: readonly string[];
  textarea?: boolean;
}) {
  const inputClass = 'anchor-field';

  return (
    <label className="block space-y-2.5">
      <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="anchor-textarea resize-none"
        />
      ) : select ? (
        <div className="relative">
          <select value={value} onChange={(e) => onChange(e.target.value)} className="anchor-select appearance-none pr-10">
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#44516A]" />
        </div>
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </label>
  );
}

function CommandCenterNav({
  active,
  onSelect,
  mobile,
}: {
  active: EditProfileSection;
  onSelect: (section: EditProfileSection) => void;
  mobile?: boolean;
}) {
  return (
    <div className={cn('rounded-[10px] border border-[#EEF2F8] bg-white p-5', mobile && 'w-full')}>
      <p className="text-base font-semibold leading-[1.8] text-[#0F172A]">Command Center</p>
      <div className="mt-5 flex flex-col gap-2.5">
        {EDIT_PROFILE_SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={cn(
                'flex w-full items-center gap-5 rounded-[6px] p-2.5 text-left text-sm transition-colors',
                isActive
                  ? 'border border-[#DCE7FF] bg-[#EFF4FF] text-[#2F66C8]'
                  : 'bg-white text-[#44516A]',
              )}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const SECTION_TITLES: Record<EditProfileSection, string> = {
  basic: 'Basic Information',
  contact: 'Contact Information',
  location: 'Location',
  about: 'About & Mission',
  focus: 'Focus Areas',
};

function EditSectionForm({
  section,
  form,
  setForm,
}: {
  section: EditProfileSection;
  form: OrgProfileHub['form'];
  setForm: Dispatch<SetStateAction<OrgProfileHub['form']>>;
}) {
  const update = <K extends keyof OrgProfileHub['form']>(key: K, value: OrgProfileHub['form'][K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (section === 'basic') {
    return (
      <div className="space-y-2.5">
        <div className="grid gap-2.5 md:grid-cols-2">
          <FormField label="Organization Name" value={form.name} onChange={(v) => update('name', v)} />
          <FormField label="Registration Number" value={form.regNumber} onChange={(v) => update('regNumber', v)} />
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          <FormField
            label="Organization Type"
            value={form.type}
            onChange={(v) => update('type', v)}
            select
            options={ORG_TYPE_OPTIONS}
          />
          <FormField
            label="Industry"
            value={form.industry}
            onChange={(v) => update('industry', v)}
            select
            options={INDUSTRY_OPTIONS}
          />
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          <FormField
            label="Organization Size"
            value={form.organizationSize}
            onChange={(v) => update('organizationSize', v)}
            select
            options={ORG_SIZE_OPTIONS}
          />
          <FormField
            label="Year Established"
            value={form.yearEstablished}
            onChange={(v) => update('yearEstablished', v)}
          />
        </div>
      </div>
    );
  }

  if (section === 'contact') {
    return (
      <div className="space-y-2.5">
        <FormField label="Email" value={form.email} onChange={(v) => update('email', v)} />
        <FormField label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
        <FormField label="Website" value={form.website} onChange={(v) => update('website', v)} />
      </div>
    );
  }

  if (section === 'location') {
    return (
      <div className="space-y-2.5">
        <FormField label="Street Address" value={form.address} onChange={(v) => update('address', v)} />
        <div className="grid gap-2.5 md:grid-cols-2">
          <FormField label="City" value={form.city} onChange={(v) => update('city', v)} />
          <FormField label="Province" value={form.province} onChange={(v) => update('province', v)} />
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          <FormField label="Postal Code" value={form.postalCode} onChange={(v) => update('postalCode', v)} />
          <FormField label="Country" value={form.country} onChange={(v) => update('country', v)} />
        </div>
      </div>
    );
  }

  if (section === 'about') {
    return (
      <div className="space-y-2.5">
        <FormField
          label="About Organization"
          value={form.about}
          onChange={(v) => update('about', v)}
          textarea
        />
        <FormField label="Mission" value={form.mission} onChange={(v) => update('mission', v)} textarea />
        <FormField label="Vision" value={form.vision} onChange={(v) => update('vision', v)} textarea />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {FOCUS_AREA_OPTIONS.map((area) => {
        const selected = form.focusAreas.includes(area);
        return (
          <button
            key={area}
            type="button"
            onClick={() =>
              update(
                'focusAreas',
                selected ? form.focusAreas.filter((a) => a !== area) : [...form.focusAreas, area],
              )
            }
            className={cn(
              'rounded border px-3 py-1.5 text-sm font-medium transition-colors',
              selected
                ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                : 'border-[#DCE7FF] bg-white text-[#44516A]',
            )}
          >
            {area}
          </button>
        );
      })}
    </div>
  );
}

export function EditProfileModal({
  open,
  mobile,
  hub,
}: {
  open: boolean;
  mobile?: boolean;
  hub: OrgProfileHub;
}) {
  if (!open) return null;

  return (
    <ModalBackdrop onClose={hub.closeModal} drawer={!mobile}>
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
          mobile ? 'max-h-[85vh] w-[min(400px,calc(100vw-40px))]' : 'h-full w-[1000px]',
        )}
      >
        <div className="flex items-center justify-between border-b border-[#EEF2F8] p-[26px]">
          <h2 className="text-lg font-medium text-[#0F172A]">Edit Organization Profile</h2>
          <ModalCloseButton onClose={hub.closeModal} />
        </div>

        <div
          className={cn(
            'flex flex-1',
            mobile
              ? 'flex-col gap-5 overflow-y-auto px-[26px] py-10'
              : 'gap-5 overflow-hidden px-[26px] py-10',
          )}
        >
          <CommandCenterNav
            active={hub.editSection}
            onSelect={hub.setEditSection}
            mobile={mobile}
          />
          <div
            className={cn(
              'rounded-[10px] border border-[#EEF2F8] bg-white p-5',
              mobile ? 'w-full shrink-0' : 'min-h-0 flex-1 overflow-y-auto',
            )}
          >
            <h3 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">
              {SECTION_TITLES[hub.editSection]}
            </h3>
            <div className="mt-5">
              <EditSectionForm section={hub.editSection} form={hub.form} setForm={hub.setForm} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={hub.closeModal}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={hub.saving}
            onClick={() => {
              void hub.saveProfile();
            }}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] disabled:opacity-50"
          >
            {hub.saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

function VerificationItemRow({
  title,
  description,
  status,
  action,
  icon: Icon,
  onAction,
}: {
  title: string;
  description: string;
  status: keyof typeof VERIFICATION_STATUS_STYLES;
  action: string;
  icon: ElementType;
  onAction: () => void;
}) {
  const styles = VERIFICATION_STATUS_STYLES[status];

  return (
    <div className="border-b border-[#EEF2F8] bg-white p-4 last:border-b-0">
      <span className={cn('inline-flex rounded-[2px] px-1 py-0.5 text-xs font-medium', styles.badge)}>
        {styles.label}
      </span>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] p-[13px]', styles.iconBg)}>
            <Icon className="h-[22px] w-[22px] text-[#44516A]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#0F172A]">{title}</p>
            <p className="text-sm text-[#44516A]">{description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#2F66C8]"
        >
          {action}
        </button>
      </div>
    </div>
  );
}

export function VerificationChecklistModal({
  open,
  mobile,
  hub,
}: {
  open: boolean;
  mobile?: boolean;
  hub: OrgProfileHub;
}) {
  if (!open) return null;

  const completed = hub.verificationCompleted;
  const total = hub.verificationTotal || hub.verificationItems.length || 1;
  const progress = Math.round((completed / total) * 100);
  const overall = hub.profile.verificationStatus;
  const statusLabel =
    overall === 'verified'
      ? 'Verified'
      : overall === 'pending'
        ? 'Under Review'
        : overall === 'rejected'
          ? 'Not Approved'
          : 'Not Submitted';
  const statusBody =
    overall === 'verified'
      ? 'Your organization is verified and visible to more applicants.'
      : overall === 'pending'
        ? 'Your documents are being reviewed. This usually takes 1 – 3 business days.'
        : overall === 'rejected'
          ? 'Please review feedback and re-upload the required documents.'
          : 'Upload the required documents and submit for verification.';

  return (
    <ModalBackdrop onClose={hub.closeModal} drawer={!mobile}>
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
          mobile ? 'max-h-[85vh] w-[min(400px,calc(100vw-40px))]' : 'h-full w-[840px]',
        )}
      >
        <div className="flex items-start justify-between border-b border-[#EEF2F8] p-[26px]">
          <div>
            <h2 className="text-lg font-medium text-[#0F172A]">Verification Checklist</h2>
            <p className="mt-1.5 text-sm leading-[1.4] text-[#44516A]">
              Complete all required steps to get your organization verified.
            </p>
          </div>
          <ModalCloseButton onClose={hub.closeModal} />
        </div>

        <div className="flex-1 overflow-y-auto px-[26px] py-10">
          <div className="mb-5">
            <div className="flex items-center justify-between text-sm font-medium text-[#0F172A]">
              <span>Overall Progress</span>
              <span>
                {completed} of {total} completed
              </span>
            </div>
            <div className="mt-5 flex h-3 flex-col justify-center rounded-full bg-[#EEF2F8] pr-[45px]">
              <div className="h-2.5 rounded-full bg-[#2F66C8]" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2.5 text-xs text-[#44516A]">Complete your verification to reach 100%</p>
          </div>

          <div className={cn('gap-5', mobile ? 'flex flex-col' : 'flex')}>
            <div className="flex-1 overflow-hidden rounded-[10px] border border-[#EEF2F8]">
              {hub.verificationItems.length === 0 ? (
                <p className="p-4 text-sm text-[#44516A]">No verification requirements loaded.</p>
              ) : (
                hub.verificationItems.map((item) => (
                  <VerificationItemRow
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    action={item.action}
                    icon={VERIFICATION_ITEM_ICONS[item.id] ?? FileBadge}
                    onAction={() => {
                      if (item.id === 'website') {
                        hub.openWebsiteEdit();
                        return;
                      }
                      if (
                        item.action === 'Upload' ||
                        item.action === 'Update' ||
                        item.status === 'not_submitted'
                      ) {
                        hub.openUpload(item.id);
                        return;
                      }
                      if (item.status === 'verified') {
                        hub.openModal('verified');
                      } else if (item.status === 'under_review') {
                        hub.openModal('inProgress');
                      } else {
                        hub.openModal('submitted');
                      }
                    }}
                  />
                ))
              )}
            </div>

            {!mobile ? (
              <div className="flex w-[320px] shrink-0 flex-col gap-5">
                <button
                  type="button"
                  onClick={() => {
                    if (overall === 'verified') hub.openModal('verified');
                    else if (overall === 'pending') hub.openModal('inProgress');
                    else if (overall === 'rejected') hub.openModal('notApproved');
                    else hub.openModal('completeVerification');
                  }}
                  className="rounded-[10px] border border-[#EEF2F8] bg-white p-5 text-left transition-colors hover:border-[#D9E1EF]"
                >
                  <p className="text-sm font-semibold text-[#0F172A]">Verification Status</p>
                  <div className="mt-5 flex items-start gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFBEB]">
                      <Clock className="h-5 w-5 text-[#B45309]" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{statusLabel}</p>
                      <p className="mt-1 text-xs leading-[1.4] text-[#44516A]">{statusBody}</p>
                    </div>
                  </div>
                </button>
                <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                  <p className="text-sm font-semibold text-[#0F172A]">Need help?</p>
                  <p className="mt-2 text-xs leading-[1.4] text-[#44516A]">
                    Learn more about verification requirements in our Help Center.
                  </p>
                  <Link
                    href="/help"
                    className="mt-4 inline-flex rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#2F66C8]"
                  >
                    View Help Center
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <Link
            href="/help"
            className="inline-flex items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white px-5 py-3 text-sm font-medium text-[#2F66C8]"
          >
            View Help Center
          </Link>
          {overall !== 'verified' ? (
            <button
              type="button"
              disabled={hub.saving}
              onClick={() => {
                void hub.submitVerification();
              }}
              className="inline-flex items-center justify-center rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {hub.saving ? 'Submitting…' : 'Submit for Verification'}
            </button>
          ) : null}
        </div>
      </div>
    </ModalBackdrop>
  );
}

export function UploadDocumentModal({
  open,
  mobile,
  hub,
}: {
  open: boolean;
  mobile?: boolean;
  hub: OrgProfileHub;
}) {
  if (!open) return null;

  const files = hub.sessionUploads;

  return (
    <ModalBackdrop onClose={hub.closeModal} drawer={!mobile}>
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
          mobile ? 'max-h-[85vh] w-[min(400px,calc(100vw-40px))]' : 'h-full w-[720px]',
        )}
      >
        <div className="flex items-center justify-between border-b border-[#EEF2F8] p-[26px]">
          <h2 className="text-lg font-medium text-[#0F172A]">Upload Document</h2>
          <ModalCloseButton onClose={hub.closeModal} />
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-[26px] py-10">
          {hub.error ? (
            <p className="rounded-[8px] border border-[#FEE2E2] bg-[#FEF2F2] px-3 py-2 text-sm text-[#B91C1C]">
              {hub.error}
            </p>
          ) : null}

          <label className="block space-y-2.5">
            <span className="text-sm font-semibold text-[#0F172A]">
              Attachments <span className="text-[#EF4444]">*</span>
            </span>
            <div
              className="relative flex min-h-[140px] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#D9E1EF] bg-[#F8FAFC] px-4 py-8 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                void hub.addUploadedFiles(e.dataTransfer.files);
              }}
            >
              <p className="text-sm text-[#44516A]">
                Drag and drop files here or <span className="text-[#2F66C8]">browse files</span>
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={hub.uploading}
                className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-wait"
                onChange={(e) => {
                  void hub.addUploadedFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </div>
            <p className="text-xs text-[#8C97AD]">Supported formats PDF, JPG, PNG. Max size: 10MB</p>
          </label>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-white p-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF4FF]">
                  <File className="h-5 w-5 text-[#2F66C8]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#0F172A]">{file.name}</p>
                  <p className="text-xs text-[#8C97AD]">
                    {file.id.startsWith('local-') ? 'Uploading…' : file.size}
                  </p>
                </div>
                {!file.id.startsWith('local-') ? (
                  <>
                    <button
                      type="button"
                      onClick={() => hub.requestDeleteFile(file.id)}
                      aria-label={`Delete ${file.name}`}
                      className="shrink-0 text-[#8C97AD] transition-colors hover:text-[#EF4444]"
                    >
                      <Trash2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </button>
                    <Check className="h-5 w-5 shrink-0 text-[#15803D]" strokeWidth={2.5} />
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={hub.closeModal}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={hub.finishUploadSession}
            disabled={hub.uploading || files.length === 0 || files.some((f) => f.id.startsWith('local-'))}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {hub.uploading ? 'Uploading…' : 'Done'}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

type IllustrationType =
  | 'verified'
  | 'inProgress'
  | 'documentsRequired'
  | 'notApproved'
  | 'completeProfile'
  | 'completeVerification'
  | 'certificate'
  | 'confirmSubmit'
  | 'submitted'
  | 'confirmDelete';

const ILLUSTRATION_CONFIG: Record<
  IllustrationType,
  { bg: string; ring: string; icon: ElementType; iconColor: string }
> = {
  verified: { bg: 'bg-[#ECFDF5]', ring: 'bg-[#D1FAE5]', icon: ShieldCheck, iconColor: 'text-[#15803D]' },
  inProgress: { bg: 'bg-[#FFFBEB]', ring: 'bg-[#FEF3C7]', icon: Clock, iconColor: 'text-[#B45309]' },
  documentsRequired: { bg: 'bg-[#FEF2F2]', ring: 'bg-[#FEE2E2]', icon: ShieldX, iconColor: 'text-[#EF4444]' },
  notApproved: { bg: 'bg-[#FEF2F2]', ring: 'bg-[#FEE2E2]', icon: MailX, iconColor: 'text-[#EF4444]' },
  completeProfile: { bg: 'bg-[#FFFBEB]', ring: 'bg-[#FEF3C7]', icon: CircleHelp, iconColor: 'text-[#B45309]' },
  completeVerification: {
    bg: 'bg-[#EFF4FF]',
    ring: 'bg-[#DCE7FF]',
    icon: ShieldQuestionMark,
    iconColor: 'text-[#2F66C8]',
  },
  certificate: { bg: 'bg-[#ECFDF5]', ring: 'bg-[#D1FAE5]', icon: ShieldCheck, iconColor: 'text-[#15803D]' },
  confirmSubmit: { bg: 'bg-[#ECFDF5]', ring: 'bg-[#D1FAE5]', icon: Send, iconColor: 'text-[#15803D]' },
  submitted: { bg: 'bg-[#ECFDF5]', ring: 'bg-[#D1FAE5]', icon: MailCheck, iconColor: 'text-[#15803D]' },
  confirmDelete: { bg: 'bg-[#FEF2F2]', ring: 'bg-[#FEE2E2]', icon: Trash2, iconColor: 'text-[#EF4444]' },
};

function StatusIllustration({ type }: { type: IllustrationType }) {
  const config = ILLUSTRATION_CONFIG[type];
  if (!config) return null;
  const Icon = config.icon;

  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      <span className={cn('absolute h-32 w-32 rounded-full opacity-60', config.ring)} />
      <span className={cn('absolute h-24 w-24 rounded-full opacity-80', config.bg)} />
      <span className={cn('relative flex h-20 w-20 items-center justify-center rounded-2xl', config.bg)}>
        <Icon className={cn('h-10 w-10', config.iconColor)} strokeWidth={1.5} />
      </span>
    </div>
  );
}

const STATUS_MODAL_CONTENT: Record<
  Exclude<
    OrgProfileModal,
    'edit' | 'verification' | 'upload' | 'confirmSubmit' | 'confirmDelete' | null
  >,
  { title: React.ReactNode; body: string; action: string; next?: OrgProfileModal; destructive?: boolean }
> = {
  verified: {
    title: (
      <>
        You&apos;re <span className="font-serif italic text-[#2F66C8]">Verified!</span>
      </>
    ),
    body: 'Your organization is verified and visible to more applicants.',
    action: 'View Certificate',
    next: 'certificate',
  },
  inProgress: {
    title: (
      <>
        Verification in <span className="font-serif italic text-[#2F66C8]">Progress</span>
      </>
    ),
    body: "We're reviewing your documents. This usually takes 3 business days.",
    action: 'View Status',
    next: 'verification',
  },
  documentsRequired: {
    title: (
      <>
        Additional Document{' '}
        <span className="font-serif italic text-[#2F66C8]">Required!</span>
      </>
    ),
    body: 'Some documents need to be updated. Please review the feedback.',
    action: 'View Feedback',
    next: 'notApproved',
  },
  notApproved: {
    title: (
      <>
        Verification not <span className="font-serif italic text-[#2F66C8]">Approved!</span>
      </>
    ),
    body: 'Please review the feedback and upload the required documents.',
    action: 'View Feedback',
    next: 'verification',
    destructive: true,
  },
  completeProfile: {
    title: (
      <>
        Complete your <span className="font-serif italic text-[#2F66C8]">Profile</span>
      </>
    ),
    body: 'Add more information to build trust with applicants',
    action: 'Complete Profile',
    next: 'edit',
  },
  completeVerification: {
    title: (
      <>
        Complete <span className="font-serif italic text-[#2F66C8]">Verification</span>
      </>
    ),
    body: 'Get your organization verified to increase trust and visibility',
    action: 'Start Verification',
    next: 'verification',
  },
  certificate: {
    title: (
      <>
        Verification <span className="font-serif italic text-[#2F66C8]">Certificate</span>
      </>
    ),
    body: 'Your organization verification certificate is ready to view and download.',
    action: 'Download Certificate',
  },
  submitted: {
    title: (
      <>
        Your verification has been{' '}
        <span className="font-serif italic text-[#2F66C8]">Submitted!</span>
      </>
    ),
    body: "We'll notify you once the review is complete.",
    action: 'Got it',
  },
};

export function OrgStatusModal({
  type,
  hub,
}: {
  type: OrgProfileModal;
  hub: OrgProfileHub;
}) {
  if (!type || !(type in STATUS_MODAL_CONTENT)) return null;
  const content = STATUS_MODAL_CONTENT[type as keyof typeof STATUS_MODAL_CONTENT];

  return (
    <ModalBackdrop onClose={hub.closeModal}>
      <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex justify-end p-[26px] pb-0">
          <ModalCloseButton onClose={hub.closeModal} />
        </div>
        <div className="px-[26px] py-10 text-center">
          <StatusIllustration type={type as IllustrationType} />
          <h2 className="mt-5 font-serif text-[28px] text-[#0F172A]">{content.title}</h2>
          <p className="mt-5 text-base text-[#44516A]">{content.body}</p>
        </div>
        <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={() => {
              if (content.next) hub.openModal(content.next);
              else hub.closeModal();
            }}
            className={cn(
              'w-full rounded-[6px] py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
              content.destructive ? 'bg-[#EF4444]' : 'bg-[#2F66C8]',
            )}
          >
            {content.action}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

function ConfirmIllustrationModal({
  type,
  title,
  body,
  confirmLabel,
  destructive,
  onCancel,
  onConfirm,
}: {
  type: IllustrationType;
  title: React.ReactNode;
  body: string;
  confirmLabel: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalBackdrop onClose={onCancel}>
      <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex justify-end p-[26px] pb-0">
          <ModalCloseButton onClose={onCancel} />
        </div>
        <div className="px-[26px] py-10 text-center">
          <StatusIllustration type={type} />
          <h2 className="mt-5 font-serif text-[28px] text-[#0F172A]">{title}</h2>
          <p className="mt-5 text-base text-[#44516A]">{body}</p>
        </div>
        <div className="flex justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#0F172A]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'flex-1 rounded-[6px] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
              destructive ? 'bg-[#EF4444]' : 'bg-[#2F66C8]',
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

export function ConfirmSubmitModal({ open, hub }: { open: boolean; hub: OrgProfileHub }) {
  if (!open) return null;
  return (
    <ConfirmIllustrationModal
      type="confirmSubmit"
      title={
        <>
          Submit for <span className="font-serif italic text-[#2F66C8]">Verification?</span>
        </>
      }
      body="Once submitted, you won't be able to edit your documents until review is complete"
      confirmLabel="Submit"
      onCancel={hub.closeModal}
      onConfirm={() => {
        void hub.submitVerification();
      }}
    />
  );
}

export function ConfirmDeleteModal({ open, hub }: { open: boolean; hub: OrgProfileHub }) {
  if (!open) return null;
  return (
    <ConfirmIllustrationModal
      type="confirmDelete"
      title={
        <>
          Delete this <span className="font-serif italic text-[#2F66C8]">Document?</span>
        </>
      }
      body="This action cannot be undone"
      confirmLabel="Delete"
      destructive
      onCancel={hub.cancelDeleteFile}
      onConfirm={hub.confirmDeleteFile}
    />
  );
}

export function OrgActionMenu({
  open,
  onClose,
  onAction,
}: {
  open: boolean;
  onClose: () => void;
  onAction: (id: string) => void;
}) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 z-40" onClick={onClose} aria-label="Close menu" />
      <div className="absolute right-0 top-full z-50 mt-1 min-w-[220px] overflow-hidden rounded-[8px] border border-[#EEF2F8] bg-white py-1 shadow-lg">
        {ORG_ACTION_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onAction(item.id)}
            className="flex w-full px-4 py-2.5 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

const STATUS_MODAL_TYPES: OrgProfileModal[] = [
  'verified',
  'inProgress',
  'documentsRequired',
  'notApproved',
  'completeProfile',
  'completeVerification',
  'certificate',
  'submitted',
];

export function OrgProfileModalLayer({ hub, mobile }: { hub: OrgProfileHub; mobile?: boolean }) {
  return (
    <>
      <EditProfileModal open={hub.modal === 'edit'} mobile={mobile} hub={hub} />
      <VerificationChecklistModal open={hub.modal === 'verification'} mobile={mobile} hub={hub} />
      <UploadDocumentModal open={hub.modal === 'upload'} mobile={mobile} hub={hub} />
      <ConfirmSubmitModal open={hub.modal === 'confirmSubmit'} hub={hub} />
      <ConfirmDeleteModal open={hub.modal === 'confirmDelete'} hub={hub} />
      {STATUS_MODAL_TYPES.includes(hub.modal) ? <OrgStatusModal type={hub.modal} hub={hub} /> : null}
    </>
  );
}
