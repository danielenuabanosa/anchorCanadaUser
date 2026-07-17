'use client';

import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import type { BuilderStepIndex } from '@/features/opportunity-builder/lib/builderData';

interface BuilderPageShellProps {
  step: BuilderStepIndex;
  backHref: string;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
  headerVariant?: 'default' | 'review';
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  children: React.ReactNode;
}

/** Content wrapper — shared header/step bar lives in create/layout.tsx */
export function BuilderPageShell({
  step,
  backHref,
  onContinue,
  continueDisabled,
  continueLabel,
  headerVariant,
  secondaryAction,
  children,
}: BuilderPageShellProps) {
  useRegisterBuilderNav({
    step,
    backHref,
    onContinue,
    continueDisabled,
    continueLabel,
    headerVariant,
    secondaryAction,
  });

  return (
    <div className="mx-auto flex w-full max-w-[1548px] flex-col gap-10 px-4 pb-16 pt-10 md:px-10">
      {children}
    </div>
  );
}

export function BuilderTitle({
  title,
  accent,
  subtitle,
}: {
  title: string;
  accent: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-[794px] text-center">
      <h1 className="font-serif text-[28px] leading-tight text-[#0F172A] md:text-[36px] md:leading-[56px]">
        {title}{' '}
        <span className="font-serif text-[32px] italic text-[#2F66C8] md:text-[48px]">{accent}</span>
      </h1>
      <p className="mt-2.5 font-sans text-[14px] text-[#44516A] md:text-[16px]">{subtitle}</p>
    </div>
  );
}

export function BuilderSectionCard({
  step,
  title,
  hint,
  badge,
  children,
}: {
  step?: number;
  title: React.ReactNode;
  hint?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#EEF2F8] px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {step != null && (
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[4px] bg-[#2F66C8] text-[16px] font-medium text-white">
                {step}
              </span>
            )}
            <div className="font-sans text-[16px] font-medium text-[#0F172A]">{title}</div>
          </div>
          {badge && (
            <span className="rounded-[4px] border border-[#E5E1FC] bg-[#F6F2FE] px-1.5 py-0.5 text-[14px] font-medium text-[#573EBF]">
              {badge}
            </span>
          )}
        </div>
        {hint && <p className="text-[14px] text-[#44516A]">{hint}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function FormLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex items-baseline gap-1 text-[14px] font-semibold text-[#0F172A]">
      {children}
      {required && <span className="text-[#EF4444]">*</span>}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="anchor-field"
    />
  );
}

export function TextArea({
  value,
  onChange,
  maxLength,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  rows?: number;
}) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        maxLength={maxLength}
        className="anchor-textarea w-full resize-none"
      />
      {maxLength != null && (
        <p className="mt-1 text-right text-[12px] text-[#8C97AD]">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
}

export function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-[#D9E1EF] text-[#2F66C8] focus:ring-[#2F66C8]"
      />
      <span>
        <span className="block text-[14px] font-medium text-[#0F172A]">{label}</span>
        {description && <span className="mt-0.5 block text-[13px] text-[#44516A]">{description}</span>}
      </span>
    </label>
  );
}

export function RadioRow({
  title,
  description,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} className="flex w-full items-start gap-5 text-left">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
      </span>
      <span>
        <span className={`block text-[14px] text-[#0F172A] ${selected ? 'font-semibold' : 'font-medium'}`}>
          {title}
        </span>
        <span className="mt-1 block text-[14px] text-[#44516A]">{description}</span>
      </span>
    </button>
  );
}

export function SelectInput({
  value,
  onChange,
  children,
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`anchor-select ${className}`}
    >
      {children}
    </select>
  );
}

export function RadioCard({
  title,
  description,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[10px] border p-4 text-left transition-colors ${
        selected ? 'border-[#2F66C8] bg-[#F8FAFC]' : 'border-[#EEF2F8] bg-white hover:bg-[#F8FAFC]'
      }`}
    >
      <div className="flex items-start gap-5">
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
          }`}
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
        </span>
        <span>
          <span className={`block text-[14px] text-[#0F172A] ${selected ? 'font-semibold' : 'font-medium'}`}>
            {title}
          </span>
          <span className="mt-1 block text-[14px] text-[#44516A]">{description}</span>
        </span>
      </div>
    </button>
  );
}

export function InfoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border border-[#DCE8FF] bg-[#EFF4FF] px-5 py-4 text-[14px] text-[#44516A]">
      {children}
    </div>
  );
}
