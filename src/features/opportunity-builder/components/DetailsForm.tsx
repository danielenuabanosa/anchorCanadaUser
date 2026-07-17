'use client';

import { useState } from 'react';
import { Check, ChevronDown, Info, X } from 'lucide-react';
import { DatePickerField } from '@/shared/components/ui/DatePicker';
import { cn } from '@/lib/utils';
import type { OpportunityDetails } from '@/features/opportunity-builder/lib/detailsData';
import {
  EDUCATION_LEVEL_OPTIONS,
  IMMIGRATION_STATUS_OPTIONS,
  INCOME_REQUIREMENT_OPTIONS,
  MODE_OPTIONS,
  PROVINCE_OPTIONS,
  SUMMARY_MAX_LENGTH,
  VISIBILITY_OPTIONS,
  parseCsvList,
  toggleCsvValue,
} from '@/features/opportunity-builder/lib/detailsData';
import { BuilderMenuSelect } from '@/features/opportunity-builder/components/BuilderMenuSelect';

const CITIZENSHIP_MAX_LENGTH = 250;

interface DetailsFormProps {
  details: OpportunityDetails;
  onChange: (patch: Partial<OpportunityDetails>) => void;
  column?: 'left' | 'middle' | 'visibility' | 'all';
  /** When true, only Basic Information starts expanded (mobile Figma). */
  collapseSecondary?: boolean;
}

function SectionCard({
  title,
  info,
  required,
  children,
  collapsible = true,
  defaultOpen = true,
}: {
  title: string;
  info?: boolean;
  required?: boolean;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white">
      <button
        type="button"
        disabled={!collapsible}
        onClick={() => collapsible && setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between gap-4 px-5 py-4 text-left',
          collapsible ? 'cursor-pointer' : 'cursor-default',
        )}
      >
        <div className="flex items-center gap-2.5">
          <p className="font-sans text-[16px] font-medium text-[#0F172A]">
            {title}
            {required ? <span className="ml-1 font-normal text-[#EF4444]">*</span> : null}
          </p>
          {info ? <Info className="h-4 w-4 shrink-0 text-[#8C97AD]" aria-hidden /> : null}
        </div>
        {collapsible ? (
          <ChevronDown
            className={cn(
              'h-[18px] w-[18px] shrink-0 text-[#8C97AD] transition-transform',
              open && 'rotate-180',
            )}
          />
        ) : null}
      </button>
      {open ? <div className="border-t border-[#EEF2F8] p-5">{children}</div> : null}
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
  required,
  optional,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 flex items-baseline gap-1 font-sans text-[14px] leading-[1.8]"
    >
      <span className="font-semibold text-[#0F172A]">{children}</span>
      {required ? <span className="font-normal text-[#EF4444]">*</span> : null}
      {optional ? <span className="font-normal text-[#8C97AD]">(Optional)</span> : null}
    </label>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative h-5 w-10 shrink-0 rounded-full transition-colors',
        checked ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
          checked ? 'left-[22px]' : 'left-0.5',
        )}
      />
    </button>
  );
}

function RadioOption({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}) {
  return (
    <label className="flex flex-1 cursor-pointer items-center gap-3">
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          checked ? 'border-[#2F66C8]' : 'border-[#D9E1EF] bg-white',
        )}
      >
        {checked ? <span className="h-2.5 w-2.5 rounded-full bg-[#2F66C8]" /> : null}
      </span>
      <input type="radio" name={name} className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-[16px] text-[#44516A]">{label}</span>
    </label>
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <span
        className={cn(
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors',
          checked ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white',
        )}
      >
        {checked ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-[16px] leading-[1.3] text-[#44516A]">{label}</span>
    </label>
  );
}

function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function ProvinceMultiSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = parseCsvList(value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-[50px] w-full items-center justify-between gap-2 rounded-[10px] border border-[#D9E1EF] bg-white px-4 py-3 text-left"
      >
        <div className="flex flex-wrap gap-2.5">
          {selected.length === 0 ? (
            <span className="text-[14px] text-[#8C97AD]">Select provinces</span>
          ) : (
            selected.map((code) => {
              const opt = PROVINCE_OPTIONS.find((p) => p.value === code);
              return (
                <span
                  key={code}
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[#EFF4FF] p-1 text-[14px] text-[#2F66C8]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {opt?.label ?? code}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${opt?.label ?? code}`}
                    className="inline-flex"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(toggleCsvValue(value, code));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(toggleCsvValue(value, code));
                      }
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </span>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown
          className={cn(
            'h-[18px] w-[18px] shrink-0 text-[#8C97AD] transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open ? (
        <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-[10px] border border-[#D9E1EF] bg-white p-2 shadow-sm">
          {PROVINCE_OPTIONS.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(toggleCsvValue(value, opt.value))}
                className={cn(
                  'flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-[14px]',
                  isSelected ? 'bg-[#EFF4FF] text-[#2F66C8]' : 'text-[#0F172A] hover:bg-[#F8FAFC]',
                )}
              >
                {opt.label}
                {isSelected ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function DetailsForm({
  details,
  onChange,
  column = 'all',
  collapseSecondary = false,
}: DetailsFormProps) {
  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({ coverImage: reader.result });
      }
    };
    reader.readAsDataURL(file);
  }

  const basicSection = (
    <SectionCard title="Basic Information" defaultOpen>
      <div className="flex flex-col gap-5">
        <div>
          <FieldLabel htmlFor="title" required>
            Opportunity Title
          </FieldLabel>
          <input
            id="title"
            value={details.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="anchor-field"
            placeholder="Enter opportunity title"
          />
        </div>
        <div>
          <FieldLabel htmlFor="summary" required>
            Short Summary
          </FieldLabel>
          <div className="relative">
            <textarea
              id="summary"
              value={details.summary}
              onChange={(e) => onChange({ summary: e.target.value.slice(0, SUMMARY_MAX_LENGTH) })}
              rows={3}
              className="anchor-field pb-8"
              placeholder="Brief description for listing cards"
            />
            <p className="pointer-events-none absolute bottom-3 left-4 text-[12px] text-[#8C97AD]">
              {details.summary.length} / {SUMMARY_MAX_LENGTH}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );

  const coverSection = (
    <SectionCard title="Cover Image" info defaultOpen={!collapseSecondary}>
      <div className="overflow-hidden rounded-[10px]">
        <div className="relative flex h-[128px] items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-br from-[#EFF4FF] to-[#D9E1EF]">
          {details.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={details.coverImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[14px] text-[#8C97AD]">No image uploaded</span>
          )}
        </div>
        <div className="mt-2.5 flex items-center gap-5">
          <label className="cursor-pointer text-[14px] font-medium text-[#2F66C8] hover:underline">
            Replace Image
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </label>
          <button
            type="button"
            onClick={() => onChange({ coverImage: '' })}
            disabled={!details.coverImage}
            className="text-[14px] font-medium text-[#B91C1C] hover:underline disabled:cursor-not-allowed disabled:opacity-40"
          >
            Remove Image
          </button>
        </div>
        <p className="mt-2.5 text-[12px] text-[#44516A]">Recommended 1600 x 900 px (JPG, PNG)</p>
      </div>
    </SectionCard>
  );

  const timingSection = (
    <SectionCard title="Timing" info defaultOpen={!collapseSecondary}>
      <div className="flex flex-col gap-5">
        {(
          [
            ['opensDate', 'Opens'],
            ['deadlineDate', 'Application Deadline'],
            ['programStartDate', 'Program Start Date'],
            ['programEndDate', 'Program End Date'],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <FieldLabel htmlFor={key} required>
              {label}
            </FieldLabel>
            <DatePickerField
              id={key}
              value={details[key]}
              onChange={(iso) => onChange({ [key]: iso })}
              required
              placeholder={`Select ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <div className="flex items-center gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-[#0F172A]">Rolling Admissions</p>
            <p className="mt-1 text-[14px] text-[#44516A]">
              Applications accepted on an ongoing basis
            </p>
          </div>
          <Toggle
            checked={details.rollingAdmissions}
            onChange={() => onChange({ rollingAdmissions: !details.rollingAdmissions })}
            label="Rolling Admissions"
          />
        </div>
      </div>
    </SectionCard>
  );

  const descriptionSection = (
    <SectionCard title="Opportunity Description" required defaultOpen={!collapseSecondary}>
      <div className="overflow-hidden rounded-[8px] border border-[#D9E1EF]">
        <div className="flex flex-wrap items-center gap-1 border-b border-[#EEF2F8] bg-[#F8FAFC] px-2 py-2">
          {[
            { label: 'B', className: 'font-bold' },
            { label: 'I', className: 'italic' },
            { label: 'U', className: 'underline' },
            { label: '•', className: 'font-semibold' },
            { label: '1.', className: 'font-semibold' },
            { label: '☰', className: 'font-semibold' },
            { label: '🔗', className: 'font-semibold' },
            { label: '❝', className: 'font-semibold' },
          ].map((item) => (
            <span
              key={item.label}
              className={cn(
                'flex h-7 min-w-7 items-center justify-center rounded-[4px] px-1.5 text-[12px] text-[#44516A]',
                item.className,
              )}
              aria-hidden
            >
              {item.label}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 rounded-[4px] border border-[#D9E1EF] bg-white px-2 py-1 text-[11px] text-[#44516A]">
            Paragraph
            <ChevronDown className="h-3 w-3" />
          </span>
        </div>
        <div className="relative">
          <textarea
            value={details.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={12}
            className="min-h-[280px] w-full resize-none border-0 bg-white px-4 py-3 pb-8 text-[14px] text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            placeholder="Describe the opportunity in detail..."
          />
          <p className="pointer-events-none absolute bottom-3 left-4 text-[12px] text-[#8C97AD]">
            {wordCount(details.description)} words
          </p>
        </div>
      </div>
    </SectionCard>
  );

  const contactSection = (
    <SectionCard title="Contact Information" defaultOpen={!collapseSecondary}>
      <div className="flex flex-col gap-5">
        <div>
          <FieldLabel htmlFor="contactEmail" required>
            Contact Email
          </FieldLabel>
          <input
            id="contactEmail"
            type="email"
            value={details.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            className="anchor-field"
            placeholder="support@example.ca"
          />
        </div>
        <div>
          <FieldLabel htmlFor="phone" optional>
            Phone Number
          </FieldLabel>
          <input
            id="phone"
            type="tel"
            value={details.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="anchor-field"
            placeholder="+1 (416) 555-1234"
          />
        </div>
        <div>
          <FieldLabel htmlFor="supportUrl" optional>
            Support / Info URL
          </FieldLabel>
          <input
            id="supportUrl"
            type="url"
            value={details.supportUrl}
            onChange={(e) => onChange({ supportUrl: e.target.value })}
            className="anchor-field"
            placeholder="https://www.example.ca/support"
          />
        </div>
      </div>
    </SectionCard>
  );

  const locationSection = (
    <SectionCard title="Location & Delivery" defaultOpen={!collapseSecondary}>
      <div className="flex flex-col gap-5">
        <div>
          <FieldLabel required>Delivery Mode</FieldLabel>
          <div className="flex flex-wrap gap-2.5">
            {MODE_OPTIONS.map((o) => (
              <RadioOption
                key={o.value}
                name="delivery-mode"
                label={o.label}
                checked={details.mode === o.value}
                onChange={() => onChange({ mode: o.value })}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 py-2.5">
          <div className="flex min-w-0 flex-1 items-baseline gap-1 text-[14px] leading-[1.8]">
            <span className="font-semibold text-[#0F172A]">Nationwide</span>
            <span className="font-normal text-[#8C97AD]">(Optional)</span>
          </div>
          <Toggle
            checked={details.nationwide}
            onChange={() => onChange({ nationwide: !details.nationwide })}
            label="Nationwide"
          />
        </div>

        <div>
          <FieldLabel optional>Province</FieldLabel>
          <ProvinceMultiSelect
            value={details.province}
            onChange={(province) => onChange({ province })}
          />
        </div>

        <div>
          <FieldLabel htmlFor="city" optional>
            City
          </FieldLabel>
          <input
            id="city"
            value={details.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className="anchor-field"
            placeholder="e.g. Toronto"
          />
        </div>

        <div>
          <FieldLabel htmlFor="fullAddress" optional>
            Full Address
          </FieldLabel>
          <input
            id="fullAddress"
            value={details.fullAddress}
            onChange={(e) => onChange({ fullAddress: e.target.value })}
            className="anchor-field"
            placeholder="123 Example Drive"
          />
        </div>
      </div>
    </SectionCard>
  );

  const selectedImmigration = parseCsvList(details.immigrationStatuses);

  const eligibilitySection = (
    <SectionCard title="Eligibility" info defaultOpen={!collapseSecondary}>
      <div className="flex flex-col gap-5">
        <div>
          <FieldLabel optional>Age Range</FieldLabel>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={details.ageMin}
              onChange={(e) => onChange({ ageMin: e.target.value })}
              className="anchor-field"
              min={0}
              placeholder="Min"
            />
            <span className="shrink-0 text-[14px] text-[#8C97AD]">to</span>
            <input
              type="number"
              value={details.ageMax}
              onChange={(e) => onChange({ ageMax: e.target.value })}
              className="anchor-field"
              min={0}
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <FieldLabel required>Immigration Status</FieldLabel>
          <div className="grid grid-cols-1 gap-x-2.5 gap-y-3.5 sm:grid-cols-2">
            {IMMIGRATION_STATUS_OPTIONS.map((o) => (
              <CheckboxOption
                key={o.value}
                label={o.label}
                checked={selectedImmigration.includes(o.value)}
                onChange={() =>
                  onChange({
                    immigrationStatuses: toggleCsvValue(details.immigrationStatuses, o.value),
                  })
                }
              />
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="educationLevel" required>
              Min. Education Level
            </FieldLabel>
            <BuilderMenuSelect
              id="educationLevel"
              value={details.educationLevel}
              onChange={(educationLevel) => onChange({ educationLevel })}
              options={EDUCATION_LEVEL_OPTIONS}
              aria-label="Min. Education Level"
            />
          </div>
          <div>
            <FieldLabel htmlFor="incomeRequirement" required>
              Income Requirement
            </FieldLabel>
            <BuilderMenuSelect
              id="incomeRequirement"
              value={details.incomeRequirement}
              onChange={(incomeRequirement) => onChange({ incomeRequirement })}
              options={INCOME_REQUIREMENT_OPTIONS}
              aria-label="Income Requirement"
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="citizenship" required>
            Citizenship
          </FieldLabel>
          <div className="relative">
            <textarea
              id="citizenship"
              value={details.citizenship}
              onChange={(e) =>
                onChange({ citizenship: e.target.value.slice(0, CITIZENSHIP_MAX_LENGTH) })
              }
              rows={3}
              className="anchor-field pb-8"
              placeholder="e.g. 'Applicants must have lived in Canada for less than 5 years.'"
            />
            <p className="pointer-events-none absolute bottom-3 left-4 text-[12px] text-[#8C97AD]">
              {details.citizenship.length} / {CITIZENSHIP_MAX_LENGTH}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );

  const visibilitySection = (
    <SectionCard title="Visibility & Settings" info collapsible defaultOpen={!collapseSecondary}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <FieldLabel>Visibility</FieldLabel>
          <div className="mt-2 flex flex-col gap-4">
            {VISIBILITY_OPTIONS.map((o) => (
              <RadioOption
                key={o.value}
                name="visibility"
                label={o.label}
                checked={details.visibility === o.value}
                onChange={() => onChange({ visibility: o.value })}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {(
            [
              [
                'featured',
                'Featured Opportunity',
                'Showcase this opportunity on homepage and listings.',
              ],
              [
                'allowBookmarking',
                'Allow Bookmarking',
                'Applicants can bookmark this opportunity',
              ],
              ['allowSharing', 'Allow Sharing', 'Applicants can share this opportunity'],
            ] as const
          ).map(([key, label, description]) => (
            <div key={key} className="flex items-center gap-5">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-[#0F172A]">{label}</p>
                <p className="mt-1 text-[14px] text-[#44516A]">{description}</p>
              </div>
              <Toggle
                checked={details[key]}
                onChange={() => onChange({ [key]: !details[key] })}
                label={label}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );

  const leftColumn = (
    <>
      {basicSection}
      {coverSection}
      {timingSection}
    </>
  );

  const middleColumn = (
    <>
      {descriptionSection}
      {contactSection}
      {locationSection}
      {eligibilitySection}
    </>
  );

  if (column === 'left') {
    return <div className="flex flex-col gap-5">{leftColumn}</div>;
  }

  if (column === 'middle') {
    return <div className="flex flex-col gap-5">{middleColumn}</div>;
  }

  if (column === 'visibility') {
    return visibilitySection;
  }

  return (
    <div className="flex flex-col gap-5">
      {leftColumn}
      {middleColumn}
      {visibilitySection}
    </div>
  );
}
