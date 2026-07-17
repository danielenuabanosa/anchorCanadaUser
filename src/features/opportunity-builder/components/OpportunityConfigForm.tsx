'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CategoryGroupDef } from '@/features/opportunity-builder/lib/builderData';
import {
  SALARY_PERIOD_OPTIONS,
  getCategoryConfigSchema,
  type OpportunityCategoryConfig,
} from '@/features/opportunity-builder/lib/categoryConfigData';
import { BuilderMenuSelect } from '@/features/opportunity-builder/components/BuilderMenuSelect';

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
    <label className="flex cursor-pointer items-center gap-5">
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
          checked
            ? 'border-[#2F66C8] bg-[#2F66C8]'
            : 'border-[#D9E1EF] bg-[#EEF2F8]',
        )}
      >
        {checked ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" aria-hidden>
            <path
              d="M2.5 6.2 4.8 8.5 9.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-base text-[#44516A]">{label}</span>
    </label>
  );
}

function FieldToggle({
  label,
  required,
  checked,
  onChange,
}: {
  label: string;
  required?: boolean;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-[14px] font-semibold leading-[1.8] text-[#0F172A]">
        {label} {required ? <span className="font-normal text-[#EF4444]">*</span> : null}
        {!required ? <span className="font-normal text-[#8C97AD]"> (Optional)</span> : null}
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          'relative h-5 w-10 rounded-full transition-colors',
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
    </div>
  );
}

function FieldLabel({
  children,
  required,
  optional,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <p className="mb-2.5 flex items-baseline gap-1 text-[14px] leading-[1.8]">
      <span className="font-semibold text-[#0F172A]">{children}</span>
      {required ? <span className="font-normal text-[#EF4444]">*</span> : null}
      {optional ? <span className="font-normal text-[#8C97AD]">(Optional)</span> : null}
    </p>
  );
}

function CharTextarea({
  value,
  onChange,
  placeholder,
  max = 80,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  max?: number;
}) {
  return (
    <div className="relative">
      <textarea
        value={value}
        maxLength={max}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-[10px] border border-[#D9E1EF] px-4 py-3 pb-8 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
      />
      <span className="absolute bottom-2 left-4 text-xs text-[#8C97AD]">
        {value.length} / {max}
      </span>
    </div>
  );
}

function SalaryInput({
  prefix,
  value,
  onChange,
}: {
  prefix: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-stretch overflow-hidden rounded-[10px] border border-[#D9E1EF]">
      <div className="flex shrink-0 items-center border-r border-[#D9E1EF] bg-[#F8FAFC] px-4 py-4">
        <span className="text-[14px] text-[#8C97AD]">{prefix}</span>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2.5 bg-white px-4 py-4">
        <span className="text-[14px] text-[#8C97AD]">$</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9,]/g, ''))}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[#0F172A] outline-none"
          placeholder="0"
        />
        <span className="shrink-0 text-[14px] text-[#8C97AD]">(CAD)</span>
      </div>
    </div>
  );
}

function FeeInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex min-w-0 w-full items-stretch overflow-hidden rounded-[10px] border border-[#D9E1EF]">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 bg-white px-4 py-4">
        <span className="text-[14px] text-[#8C97AD]">$</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9,]/g, ''))}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[#0F172A] outline-none"
          placeholder="0"
        />
        <span className="shrink-0 text-[14px] text-[#8C97AD]">(CAD)</span>
      </div>
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
  'aria-label': ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  'aria-label'?: string;
}) {
  return (
    <BuilderMenuSelect
      value={value}
      onChange={onChange}
      options={options.map((opt) => ({ value: opt.id, label: opt.label }))}
      aria-label={ariaLabel}
    />
  );
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
  cols = 3,
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  cols?: 2 | 3 | 4;
}) {
  const colClass =
    cols === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : cols === 4
        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={cn('mt-2.5 grid gap-y-2.5', colClass)}>
      {options.map((opt) => (
        <CheckboxOption
          key={opt.id}
          label={opt.label}
          checked={selected.includes(opt.id)}
          onChange={() => onToggle(opt.id)}
        />
      ))}
    </div>
  );
}

interface OpportunityConfigFormProps {
  categoryGroup: CategoryGroupDef | null;
  config: OpportunityCategoryConfig;
  onChange: (patch: Partial<OpportunityCategoryConfig>) => void;
}

export function OpportunityConfigForm({ categoryGroup, config, onChange }: OpportunityConfigFormProps) {
  const schema = getCategoryConfigSchema(categoryGroup?.id ?? null);

  function toggleIn(list: string[], id: string): string[] {
    return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  }

  const primaryCols = schema.primaryGridCols ?? (schema.variant === 'employment' ? 2 : 3);

  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
      <section className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-4">
          <h2 className="text-base font-medium text-[#0F172A]">Category Selection</h2>
          <ChevronDown className="h-[18px] w-[18px] text-[#8C97AD]" />
        </div>
        <div className="flex flex-col gap-5 border-b border-[#EEF2F8] p-5">
          {categoryGroup ? (
            <div className="rounded-[10px] border border-[#EAF0FD] bg-[#F8FAFC] p-5">
              <div
                className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[16px]"
                style={{ backgroundColor: categoryGroup.iconBg }}
              >
                <Image src={categoryGroup.icon} alt="" width={21} height={21} className="object-contain" />
              </div>
              <p className="text-base font-medium text-[#0F172A]">{categoryGroup.title}</p>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {categoryGroup.subcategories.map((sub) => (
                  <span
                    key={sub.id}
                    className="rounded-[4px] px-1 py-0.5 text-sm"
                    style={{ backgroundColor: categoryGroup.tagBg, color: categoryGroup.tagColor }}
                  >
                    {sub.label}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#44516A]">No category selected yet.</p>
          )}
          <Link
            href="/opportunities/create/category"
            className="flex h-[42px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F5F8FE]"
          >
            Change Category
          </Link>
        </div>
      </section>

      <section className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-4">
          <h2 className="text-base font-medium text-[#0F172A]">Opportunity Configuration</h2>
          <ChevronDown className="h-[18px] w-[18px] text-[#8C97AD]" />
        </div>

        <div className="flex flex-col gap-5 border-b border-[#EEF2F8] p-5">
          {schema.variant === 'grants' ? (
            <>
              <label className="flex flex-col">
                <FieldLabel required>Grant / Bursary Type</FieldLabel>
                <SelectField
                  value={config.grantType}
                  onChange={(grantType) => onChange({ grantType })}
                  options={schema.grantTypeOptions ?? []}
                  aria-label="Grant / Bursary Type"
                />
              </label>

              <div>
                <FieldLabel optional>Funding Amount</FieldLabel>
                <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                  <SalaryInput
                    prefix="MIN"
                    value={config.salaryMin}
                    onChange={(salaryMin) => onChange({ salaryMin })}
                  />
                  <SalaryInput
                    prefix="MAX"
                    value={config.salaryMax}
                    onChange={(salaryMax) => onChange({ salaryMax })}
                  />
                </div>
              </div>

              <div>
                <FieldLabel required>What Funding Covers</FieldLabel>
                <CheckboxGrid
                  options={schema.fundingCoverOptions ?? []}
                  selected={config.fundingCovers}
                  onToggle={(id) => onChange({ fundingCovers: toggleIn(config.fundingCovers, id) })}
                  cols={3}
                />
              </div>

              <label className="flex flex-col">
                <FieldLabel optional>Number of Awards</FieldLabel>
                <input
                  type="text"
                  inputMode="numeric"
                  value={config.numberOfAwards}
                  onChange={(e) =>
                    onChange({ numberOfAwards: e.target.value.replace(/[^0-9]/g, '') })
                  }
                  className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none focus:border-[#2F66C8]"
                  placeholder="e.g. 10"
                />
              </label>

              <div className="flex flex-col gap-2.5">
                <FieldToggle
                  label="Matching / Co-funding Required"
                  checked={config.matchingRequired}
                  onChange={() => onChange({ matchingRequired: !config.matchingRequired })}
                />
                {config.matchingRequired ? (
                  <CharTextarea
                    value={config.matchingDetails}
                    onChange={(matchingDetails) => onChange({ matchingDetails })}
                    placeholder="Specify more details..."
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-2.5">
                <FieldToggle
                  label="Repayment Required"
                  required
                  checked={config.repaymentRequired}
                  onChange={() => onChange({ repaymentRequired: !config.repaymentRequired })}
                />
                {config.repaymentRequired ? (
                  <CharTextarea
                    value={config.repaymentDetails}
                    onChange={(repaymentDetails) => onChange({ repaymentDetails })}
                    placeholder="Specify more details..."
                  />
                ) : null}
              </div>
            </>
          ) : null}

          {schema.variant !== 'grants' && schema.primaryOptions.length > 0 ? (
            <div>
              <FieldLabel required={schema.primaryGridRequired}>{schema.primaryGridLabel}</FieldLabel>
              <CheckboxGrid
                options={schema.primaryOptions}
                selected={config.serviceTypes}
                onToggle={(id) => onChange({ serviceTypes: toggleIn(config.serviceTypes, id) })}
                cols={primaryCols}
              />
            </div>
          ) : null}

          {schema.variant === 'employment' ? (
            <>
              {schema.showSalary ? (
                <>
                  <div>
                    <FieldLabel optional>Salary / Compensation</FieldLabel>
                    <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                      <SalaryInput
                        prefix="MIN"
                        value={config.salaryMin}
                        onChange={(salaryMin) => onChange({ salaryMin })}
                      />
                      <SalaryInput
                        prefix="MAX"
                        value={config.salaryMax}
                        onChange={(salaryMax) => onChange({ salaryMax })}
                      />
                    </div>
                  </div>

                  <label className="flex flex-col">
                    <FieldLabel optional>Salary Period</FieldLabel>
                    <BuilderMenuSelect
                      value={config.salaryPeriod}
                      onChange={(salaryPeriod) => onChange({ salaryPeriod })}
                      options={SALARY_PERIOD_OPTIONS.map((opt) => ({
                        value: opt.value,
                        label: opt.label,
                      }))}
                      aria-label="Salary Period"
                    />
                  </label>

                  <FieldToggle
                    label="Salary Undisclosed"
                    checked={config.salaryUndisclosed}
                    onChange={() => onChange({ salaryUndisclosed: !config.salaryUndisclosed })}
                  />
                </>
              ) : null}

              {schema.experienceLevels ? (
                <label className="flex flex-col">
                  <FieldLabel required>Experience Level</FieldLabel>
                  <SelectField
                    value={config.experienceLevel}
                    onChange={(experienceLevel) => onChange({ experienceLevel })}
                    options={schema.experienceLevels}
                    aria-label="Experience Level"
                  />
                </label>
              ) : null}

              {schema.showWorkAuthToggles ? (
                <>
                  <FieldToggle
                    label="Work Authorization Required"
                    required
                    checked={config.workAuthorizationRequired}
                    onChange={() =>
                      onChange({ workAuthorizationRequired: !config.workAuthorizationRequired })
                    }
                  />
                  <FieldToggle
                    label="Visa Sponsorship Available"
                    required
                    checked={config.visaSponsorshipAvailable}
                    onChange={() =>
                      onChange({ visaSponsorshipAvailable: !config.visaSponsorshipAvailable })
                    }
                  />
                </>
              ) : null}
            </>
          ) : null}

          {schema.variant === 'food' || schema.variant === 'default' ? (
            <>
              <FieldToggle
                label="Registration Required"
                required
                checked={config.registrationRequired}
                onChange={() => onChange({ registrationRequired: !config.registrationRequired })}
              />
              <div>
                <FieldLabel required>Service Schedule / Hours</FieldLabel>
                <CharTextarea
                  value={config.scheduleHours}
                  onChange={(scheduleHours) => onChange({ scheduleHours })}
                  placeholder={schema.schedulePlaceholder ?? ''}
                />
              </div>
              <div>
                <FieldLabel optional>Serving Area / Catchment</FieldLabel>
                <CharTextarea
                  value={config.catchment}
                  onChange={(catchment) => onChange({ catchment })}
                  placeholder={schema.catchmentPlaceholder ?? ''}
                />
              </div>
              {schema.dietaryOptions ? (
                <div>
                  <FieldLabel optional>{schema.dietaryLabel}</FieldLabel>
                  <CheckboxGrid
                    options={schema.dietaryOptions}
                    selected={config.dietary}
                    onToggle={(id) => onChange({ dietary: toggleIn(config.dietary, id) })}
                    cols={3}
                  />
                </div>
              ) : null}
            </>
          ) : null}

          {schema.variant === 'mental' ? (
            <>
              <div>
                <FieldLabel required>Delivery Format</FieldLabel>
                <CheckboxGrid
                  options={schema.deliveryFormatOptions ?? []}
                  selected={config.deliveryFormats}
                  onToggle={(id) =>
                    onChange({ deliveryFormats: toggleIn(config.deliveryFormats, id) })
                  }
                  cols={2}
                />
              </div>

              <label className="flex flex-col">
                <FieldLabel required>Cost</FieldLabel>
                <SelectField
                  value={config.costType}
                  onChange={(costType) => onChange({ costType })}
                  options={schema.costOptions ?? []}
                  aria-label="Cost"
                />
              </label>

              <div>
                <FieldLabel optional>Session Fee</FieldLabel>
                <FeeInput
                  value={config.sessionFee}
                  onChange={(sessionFee) => onChange({ sessionFee })}
                />
              </div>
            </>
          ) : null}

          {schema.variant === 'education' ? (
            <>
              <label className="flex flex-col">
                <FieldLabel required>Duration</FieldLabel>
                <input
                  type="text"
                  value={config.duration}
                  onChange={(e) => onChange({ duration: e.target.value })}
                  placeholder="e.g. 6 weeks, 3 months, 2 years."
                  className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
                />
              </label>

              <label className="flex flex-col">
                <FieldLabel required>Cost</FieldLabel>
                <SelectField
                  value={config.costType}
                  onChange={(costType) => onChange({ costType })}
                  options={schema.costOptions ?? []}
                  aria-label="Cost"
                />
              </label>

              <div>
                <FieldLabel optional>Course Fee</FieldLabel>
                <FeeInput
                  value={config.courseFee}
                  onChange={(courseFee) => onChange({ courseFee })}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <FieldToggle
                  label="Credential Offered"
                  checked={config.credentialOffered}
                  onChange={() => onChange({ credentialOffered: !config.credentialOffered })}
                />
                {config.credentialOffered ? (
                  <CharTextarea
                    value={config.credentialDetails}
                    onChange={(credentialDetails) => onChange({ credentialDetails })}
                    placeholder="e.g. 'Google Career Certificate'"
                  />
                ) : null}
              </div>

              <div>
                <FieldLabel optional>Prerequisites</FieldLabel>
                <CharTextarea
                  value={config.prerequisites}
                  onChange={(prerequisites) => onChange({ prerequisites })}
                  placeholder="e.g. Basic English required, no prior experience needed..."
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <FieldToggle
                  label="Accredited Institution"
                  checked={config.accreditedInstitution}
                  onChange={() =>
                    onChange({ accreditedInstitution: !config.accreditedInstitution })
                  }
                />
                {config.accreditedInstitution ? (
                  <CharTextarea
                    value={config.institutionName}
                    onChange={(institutionName) => onChange({ institutionName })}
                    placeholder="Enter institution name..."
                  />
                ) : null}
              </div>
            </>
          ) : null}

          {schema.variant === 'volunteer' ? (
            <>
              <label className="flex flex-col">
                <FieldLabel required>Time Commitment</FieldLabel>
                <SelectField
                  value={config.timeCommitment}
                  onChange={(timeCommitment) => onChange({ timeCommitment })}
                  options={schema.timeCommitmentOptions ?? []}
                  aria-label="Time Commitment"
                />
              </label>

              <label className="flex flex-col">
                <FieldLabel optional>Hours Per Week</FieldLabel>
                <input
                  type="text"
                  value={config.hoursPerWeek}
                  onChange={(e) => onChange({ hoursPerWeek: e.target.value })}
                  placeholder="e.g. 6 hours..."
                  className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
                />
              </label>

              <label className="flex flex-col">
                <FieldLabel optional>Minimum Age</FieldLabel>
                <input
                  type="text"
                  value={config.minimumAge}
                  onChange={(e) => onChange({ minimumAge: e.target.value })}
                  placeholder="e.g. 16, 18. Leave blank for no minimum..."
                  className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
                />
              </label>

              <label className="flex flex-col">
                <FieldLabel optional>Duration</FieldLabel>
                <input
                  type="text"
                  value={config.duration}
                  onChange={(e) => onChange({ duration: e.target.value })}
                  placeholder="e.g. 3 months, Ongoing, One-day event..."
                  className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
                />
              </label>

              <FieldToggle
                label="Background Check Required"
                required
                checked={config.backgroundCheckRequired}
                onChange={() =>
                  onChange({ backgroundCheckRequired: !config.backgroundCheckRequired })
                }
              />

              <div>
                <FieldLabel optional>Skills Needed</FieldLabel>
                <CheckboxGrid
                  options={schema.skillOptions ?? []}
                  selected={config.skillsNeeded}
                  onToggle={(id) => onChange({ skillsNeeded: toggleIn(config.skillsNeeded, id) })}
                  cols={4}
                />
              </div>

              <div>
                <FieldLabel optional>Volunteer Perks</FieldLabel>
                <CharTextarea
                  value={config.volunteerPerks}
                  onChange={(volunteerPerks) => onChange({ volunteerPerks })}
                  placeholder="e.g. Training provided, transit subsidy, reference letter on completion..."
                />
              </div>
            </>
          ) : null}

          {schema.variant === 'housing' ? (
            <>
              <label className="flex flex-col">
                <FieldLabel optional>Monthly Rent</FieldLabel>
                <input
                  type="text"
                  value={config.monthlyRent}
                  onChange={(e) => onChange({ monthlyRent: e.target.value })}
                  placeholder="Leave blank if free or subsidy covers full cost"
                  className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
                />
              </label>

              <FieldToggle
                label="Rent Free"
                checked={config.rentFree}
                onChange={() => onChange({ rentFree: !config.rentFree })}
              />

              <label className="flex flex-col">
                <FieldLabel optional>Number of Units Available</FieldLabel>
                <input
                  type="text"
                  value={config.unitsAvailable}
                  onChange={(e) => onChange({ unitsAvailable: e.target.value })}
                  placeholder="e.g. 10, 12 units..."
                  className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
                />
              </label>

              <label className="flex flex-col">
                <FieldLabel optional>Estimated Wait Time</FieldLabel>
                <SelectField
                  value={config.estimatedWaitTime}
                  onChange={(estimatedWaitTime) => onChange({ estimatedWaitTime })}
                  options={schema.waitTimeOptions ?? []}
                  aria-label="Estimated Wait Time"
                />
              </label>

              <label className="flex flex-col">
                <FieldLabel optional>Bedrooms</FieldLabel>
                <SelectField
                  value={config.bedrooms}
                  onChange={(bedrooms) => onChange({ bedrooms })}
                  options={schema.bedroomOptions ?? []}
                  aria-label="Bedrooms"
                />
              </label>

              <div>
                <FieldLabel optional>Accessibility Features</FieldLabel>
                <CheckboxGrid
                  options={schema.accessibilityOptions ?? []}
                  selected={config.accessibilityFeatures}
                  onToggle={(id) =>
                    onChange({
                      accessibilityFeatures: toggleIn(config.accessibilityFeatures, id),
                    })
                  }
                  cols={2}
                />
              </div>

              <FieldToggle
                label="Pets Allowed"
                checked={config.petsAllowed}
                onChange={() => onChange({ petsAllowed: !config.petsAllowed })}
              />

              <FieldToggle
                label="Children / Family Friendly"
                checked={config.familyFriendly}
                onChange={() => onChange({ familyFriendly: !config.familyFriendly })}
              />
            </>
          ) : null}

          {schema.variant === 'settlement' ? (
            <>
              <div>
                <FieldLabel required>Eligible Immigration Status</FieldLabel>
                <CheckboxGrid
                  options={schema.immigrationStatusOptions ?? []}
                  selected={config.eligibleImmigrationStatuses}
                  onToggle={(id) =>
                    onChange({
                      eligibleImmigrationStatuses: toggleIn(config.eligibleImmigrationStatuses, id),
                    })
                  }
                  cols={2}
                />
              </div>

              <label className="flex flex-col">
                <FieldLabel required>Cost</FieldLabel>
                <SelectField
                  value={config.costType}
                  onChange={(costType) => onChange({ costType })}
                  options={schema.costOptions ?? []}
                  aria-label="Cost"
                />
              </label>
            </>
          ) : null}

          {schema.variant !== 'grants' && schema.showLanguages !== false ? (
            <div>
              <FieldLabel required={schema.languageRequired} optional={!schema.languageRequired}>
                {schema.languageLabel}
              </FieldLabel>
              <CheckboxGrid
                options={schema.languageOptions}
                selected={config.languages}
                onToggle={(id) => onChange({ languages: toggleIn(config.languages, id) })}
                cols={4}
              />
            </div>
          ) : null}

          {schema.variant === 'settlement' ? (
            <>
              <FieldToggle
                label="Interpretation Available"
                checked={config.interpretationAvailable}
                onChange={() =>
                  onChange({ interpretationAvailable: !config.interpretationAvailable })
                }
              />
              <div className="flex flex-col gap-2.5">
                <FieldToggle
                  label="Referral Required"
                  checked={config.referralRequired}
                  onChange={() => onChange({ referralRequired: !config.referralRequired })}
                />
                {config.referralRequired ? (
                  <CharTextarea
                    value={config.referralDetails}
                    onChange={(referralDetails) => onChange({ referralDetails })}
                    placeholder="Specify a note on where to get referral from..."
                  />
                ) : null}
              </div>
            </>
          ) : null}

          {schema.variant === 'mental' ? (
            <>
              <FieldToggle
                label="Confidential"
                required
                checked={config.confidential}
                onChange={() => onChange({ confidential: !config.confidential })}
              />
              <FieldToggle
                label="Referral Required"
                required
                checked={config.referralRequired}
                onChange={() => onChange({ referralRequired: !config.referralRequired })}
              />
              <div className="flex flex-col gap-2.5">
                <FieldToggle
                  label="Crisis Line Available"
                  checked={config.crisisLineAvailable}
                  onChange={() => onChange({ crisisLineAvailable: !config.crisisLineAvailable })}
                />
                {config.crisisLineAvailable ? (
                  <input
                    type="tel"
                    value={config.crisisPhone}
                    onChange={(e) => onChange({ crisisPhone: e.target.value })}
                    placeholder="+1"
                    className="h-[50px] w-full rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] outline-none placeholder:text-[#8C97AD] focus:border-[#2F66C8]"
                  />
                ) : null}
              </div>
            </>
          ) : null}

          {schema.industryOptions ? (
            <div>
              <FieldLabel optional>Industry / Sector</FieldLabel>
              <CheckboxGrid
                options={schema.industryOptions}
                selected={config.industries}
                onToggle={(id) => onChange({ industries: toggleIn(config.industries, id) })}
                cols={4}
              />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
