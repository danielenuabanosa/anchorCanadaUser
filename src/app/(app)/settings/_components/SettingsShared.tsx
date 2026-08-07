'use client';

import Link from 'next/link';
import { Check, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ANCHOR_FIELD } from '@/shared/styles/fieldStyles';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import { Toggle, textSecondary } from '@/shared/components/app/page-ui';
import { useHelpCenterStore } from '@/store/helpCenterStore';
import {
  DEFAULT_COMPLETION_CHECKLIST,
  SETTINGS_TABS,
  type CompletionChecklistItem,
  type SettingsTab,
} from './settingsData';

export function SettingsPageHeader() {
  return (
    <>
      {/* Desktop header */}
      <div className="hidden items-start justify-between gap-5 xl:flex">
        <div className="flex flex-col gap-2.5">
          <h1 className="font-instrument-serif text-[36px] leading-[56px] text-[#0F172A]">Settings</h1>
          <p className="text-base text-[#44516A]">
            Manage your organization, security, preferences and platform configuration.
          </p>
        </div>
        <Link
          href="/organization-profile"
          className="inline-flex shrink-0 items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#2F66C8]"
        >
          View Organization Profile
          <ExternalLink className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </Link>
      </div>

      {/* Mobile header */}
      <div className="flex flex-col gap-5 xl:hidden">
        <div className="flex flex-col gap-2.5">
          <h1 className="font-instrument-serif text-[28px] leading-[56px] text-[#0F172A]">Settings</h1>
          <p className="text-sm text-[#44516A]">
            Manage your organization, security, preferences and platform configuration.
          </p>
        </div>
        <Link
          href="/organization-profile"
          className="flex w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#2F66C8]"
        >
          View Organization Profile
          <ExternalLink className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </Link>
      </div>
    </>
  );
}

export function SettingsNav({
  active,
  onChange,
  className,
}: {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        'flex flex-col gap-2.5 rounded-[10px] border border-[#EEF2F8] bg-white px-2.5 py-5',
        className,
      )}
    >
      {SETTINGS_TABS.map((tab) => {
        const isActive = active === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.soon}
            onClick={() => !tab.soon && onChange(tab.id)}
            className={cn(
              'flex w-full items-center gap-5 rounded-[6px] p-2.5 text-left text-sm transition-colors',
              isActive && 'border border-[#DCE7FF] bg-[#EFF4FF] text-[#2F66C8]',
              !isActive && !tab.danger && 'bg-white text-[#44516A]',
              tab.danger && !isActive && 'bg-white text-[#B91C1C]',
              tab.soon && 'cursor-not-allowed',
            )}
          >
            <Icon
              className={cn('h-5 w-5 shrink-0', isActive && 'text-[#2F66C8]', tab.danger && !isActive && 'text-[#B91C1C]')}
              strokeWidth={1.75}
            />
            <span className="min-w-0 flex-1 font-normal">{tab.label}</span>
            {tab.soon ? (
              <span className="shrink-0 rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8] px-1.5 py-0.5 text-xs text-[#5D6B86]">
                Soon
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function CompletionRing({ percent }: { percent: number }) {
  const offset = 188.5 * (1 - percent / 100);
  return (
    <div className="relative h-[100px] w-[100px] shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="40" cy="40" r="30" fill="none" stroke="#EEF2F8" strokeWidth="10" />
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="none"
          stroke="#2F66C8"
          strokeWidth="10"
          strokeDasharray="188.5"
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 text-center">
        <span className="text-lg font-semibold leading-none text-[#0F172A]">{percent}%</span>
        <span className="mt-0.5 text-[10px] text-[#44516A]">Complete</span>
      </div>
    </div>
  );
}

function ChecklistItem({ completed, label, soon }: { completed: boolean; label: string; soon?: boolean }) {
  return (
    <div className="flex items-center gap-5">
      {completed ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#2F66C8] p-[2.4px]">
          <Check className="h-[19px] w-[19px] text-white" strokeWidth={2.5} />
        </span>
      ) : (
        <span className="h-6 w-6 shrink-0 rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8]" />
      )}
      <span className="min-w-0 flex-1 text-sm text-[#44516A]">{label}</span>
      {soon ? (
        <span className="shrink-0 rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8] px-1.5 py-0.5 text-xs text-[#5D6B86]">
          Soon
        </span>
      ) : null}
    </div>
  );
}

export function OrgInfoSidebar({
  mobile = false,
  className,
  completionPercent = 0,
  checklist = DEFAULT_COMPLETION_CHECKLIST,
}: {
  mobile?: boolean;
  className?: string;
  completionPercent?: number;
  checklist?: CompletionChecklistItem[];
}) {
  const openHelp = useHelpCenterStore((s) => s.open);

  return (
    <aside className={cn('overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white', className)}>
      <div className="border-b border-[#EEF2F8] p-4">
        <p className="text-sm font-semibold text-[#0F172A]">Organization Information</p>
        <p className="mt-1.5 text-sm leading-normal text-[#44516A]">
          Your settings help us personalize your experience.
        </p>
      </div>

      <div
        className={cn(
          mobile
            ? 'flex items-center gap-[30px] px-5 py-[26px]'
            : 'flex flex-col items-center gap-[30px] px-4 py-[26px]',
        )}
      >
        <CompletionRing percent={completionPercent} />
        <div className={cn('flex flex-col gap-2.5', mobile && 'min-w-0 flex-1')}>
          {checklist.map((item) => (
            <ChecklistItem key={item.id} completed={item.completed} label={item.label} soon={item.soon} />
          ))}
        </div>
      </div>

      <div className="border-t border-[#EEF2F8] p-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#0F172A]">Need help?</p>
            <p className="text-sm text-[#44516A]">Visit our Help Center for guides and support.</p>
          </div>
          <button
            type="button"
            onClick={() => openHelp()}
            className="inline-flex w-fit items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#2F66C8]"
          >
            Visit Help Center
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function SettingsPanelShell({
  title,
  subtitle,
  hasFooter,
  onReset,
  onSave,
  children,
  mobile = false,
  className,
}: {
  title: string;
  subtitle: string;
  hasFooter?: boolean;
  onReset?: () => void;
  onSave?: () => void;
  children: React.ReactNode;
  mobile?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white', className)}>
      <div className={cn('flex flex-1 flex-col bg-white p-5', mobile ? 'gap-5' : 'gap-10')}>
        <div className="flex w-full flex-col gap-1.5">
          <h2 className="font-instrument-serif text-2xl leading-normal text-[#0F172A]">{title}</h2>
          <p className="text-sm leading-[1.4] text-[#44516A]">{subtitle}</p>
        </div>
        {children}
      </div>
      {hasFooter ? (
        <div className="flex min-h-[94px] shrink-0 items-end justify-end border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <div className="flex gap-5">
            <button
              type="button"
              onClick={onReset}
              className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-sm font-semibold leading-[1.8] text-[#0F172A]">{children}</label>
  );
}

export function TextInput({
  value,
  onChange,
  readOnly,
  placeholder,
  className,
}: {
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(ANCHOR_FIELD, className)}
    />
  );
}

export function SelectField({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <HubMenuSelect
      variant="default"
      value={value}
      options={options.map((opt) => ({ value: opt, label: opt }))}
      onChange={onChange}
    />
  );
}

export function FieldGroup({ children, mobile }: { children: React.ReactNode; mobile?: boolean }) {
  return (
    <div className={cn(mobile ? 'flex flex-col gap-2.5' : 'grid grid-cols-2 gap-x-2.5 gap-y-0')}>{children}</div>
  );
}

export function FieldCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-2.5', className)}>{children}</div>;
}

export function ToggleRow({
  title,
  description,
  on,
  onChange,
}: {
  title: string;
  description: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#EEF2F8] bg-white p-4">
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-sm font-medium text-[#0F172A]">{title}</p>
        <p className="mt-1.5 text-sm leading-normal text-[#44516A]">{description}</p>
      </div>
      <Toggle size="sm" on={on} onChange={onChange} />
    </div>
  );
}

export function ActionRow({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#EEF2F8] bg-white p-4">
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-sm font-medium text-[#0F172A]">{title}</p>
        <p className="mt-1.5 text-sm leading-normal text-[#44516A]">{description}</p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold leading-[1.8] text-[#0F172A]">{children}</p>;
}

export function BorderedToggleGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white [&>div+div]:border-t [&>div+div]:border-[#EEF2F8]">
      {children}
    </div>
  );
}

export function BorderedToggleItem({
  title,
  description,
  on,
  onChange,
}: {
  title: string;
  description: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-sm font-medium text-[#0F172A]">{title}</p>
        <p className="mt-1.5 text-sm leading-normal text-[#44516A]">{description}</p>
      </div>
      <Toggle size="sm" on={on} onChange={onChange} />
    </div>
  );
}

export function IntegrationCardView({
  name,
  description,
  icon,
  connected,
  onToggle,
}: {
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
      <div className="flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
        {connected ? (
          <span className="rounded-[4px] border border-[#D1FAE5] bg-[#ECFDF5] px-2.5 py-1.5 text-sm font-medium text-[#15803D]">
            Connected
          </span>
        ) : (
          <button
            type="button"
            onClick={onToggle}
            className="rounded-[4px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
          >
            Connect
          </button>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-[#0F172A]">{name}</p>
        <p className="mt-1.5 text-sm leading-normal text-[#44516A]">{description}</p>
      </div>
    </div>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <FieldCell>
      <FieldLabel>{label}</FieldLabel>
      <div className={cn(ANCHOR_FIELD, 'flex h-[50px] items-center gap-2.5 px-4')}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#0F172A] outline-none"
        />
        <span className="h-6 w-6 shrink-0 rounded-[4px]" style={{ backgroundColor: value }} />
      </div>
    </FieldCell>
  );
}

export { textSecondary };
