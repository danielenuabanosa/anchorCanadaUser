'use client';

import { ChevronDown } from 'lucide-react';
import type { OpportunityDetails } from '@/features/opportunity-builder/lib/detailsData';
import {
  CITIZENSHIP_OPTIONS,
  CITY_OPTIONS,
  COUNTRY_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  MODE_OPTIONS,
  OPPORTUNITY_TYPE_OPTIONS,
  PROVINCE_OPTIONS,
  SUMMARY_MAX_LENGTH,
  VISIBILITY_OPTIONS,
} from '@/features/opportunity-builder/lib/detailsData';

interface DetailsFormProps {
  details: OpportunityDetails;
  onChange: (patch: Partial<OpportunityDetails>) => void;
  column?: 'left' | 'middle' | 'visibility' | 'all';
}

function SectionCard({
  title,
  subtitle,
  children,
  collapsible = false,
  defaultOpen = true,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-[10px] border border-[#EEF2F8] bg-white"
    >
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-4 p-5 ${collapsible ? '' : '[&::-webkit-details-marker]:hidden'}`}
      >
        <div>
          <p className="font-sans text-[18px] font-semibold text-[#0F172A]">{title}</p>
          {subtitle && (
            <p className="mt-1 font-sans text-[14px] text-[#44516A]">{subtitle}</p>
          )}
        </div>
        {collapsible && (
          <ChevronDown className="h-5 w-5 shrink-0 text-[#8C97AD] transition-transform group-open:rotate-180" />
        )}
      </summary>
      <div className="border-t border-[#EEF2F8] px-5 pb-5 pt-4">{children}</div>
    </details>
  );
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-sans text-[14px] font-medium text-[#0F172A]">
      {children}
    </label>
  );
}

const inputClass =
  'anchor-field';

export function DetailsForm({ details, onChange, column = 'all' }: DetailsFormProps) {
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
    <SectionCard title="Basic Information" subtitle="Title and summary">
      <div className="flex flex-col gap-5">
        <div>
          <Label htmlFor="title">Opportunity Title</Label>
          <input
            id="title"
            value={details.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className={inputClass}
            placeholder="Enter opportunity title"
          />
        </div>
        <div>
          <Label htmlFor="summary">Short Summary</Label>
          <textarea
            id="summary"
            value={details.summary}
            onChange={(e) => onChange({ summary: e.target.value.slice(0, SUMMARY_MAX_LENGTH) })}
            rows={3}
            className={inputClass}
            placeholder="Brief description for listing cards"
          />
          <p className="mt-1 text-right text-[12px] text-[#8C97AD]">
            {details.summary.length}/{SUMMARY_MAX_LENGTH}
          </p>
        </div>
      </div>
    </SectionCard>
  );

  const coverSection = (
    <SectionCard title="Cover Image" subtitle="Hero image for your opportunity listing">
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
        <div className="flex h-[160px] items-center justify-center bg-gradient-to-br from-[#EFF4FF] to-[#D9E1EF]">
          {details.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={details.coverImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[14px] text-[#8C97AD]">No image uploaded</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 p-3">
          <label className="cursor-pointer rounded-[6px] border border-[#D9E1EF] px-4 py-2 text-[14px] font-medium text-[#2F66C8] hover:bg-[#EFF4FF]">
            Replace Image
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </label>
          {details.coverImage && (
            <button
              type="button"
              onClick={() => onChange({ coverImage: '' })}
              className="rounded-[6px] border border-[#D9E1EF] px-4 py-2 text-[14px] text-[#44516A] hover:bg-[#F8FAFC]"
            >
              Remove Image
            </button>
          )}
        </div>
        <p className="border-t border-[#EEF2F8] px-3 py-2 text-[12px] text-[#8C97AD]">
          Recommended 1600 × 900 px (.JPG, .PNG)
        </p>
      </div>
    </SectionCard>
  );

  const timelineSection = (
    <SectionCard title="Timeline" subtitle="Key dates for your opportunity">
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ['opensDate', 'Opens'],
            ['deadlineDate', 'Application Deadline'],
            ['programStartDate', 'Program Start Date'],
            ['programEndDate', 'Program End Date'],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <Label htmlFor={key}>{label}</Label>
            <input
              id={key}
              type="date"
              value={details[key]}
              onChange={(e) => onChange({ [key]: e.target.value })}
              className={inputClass}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const descriptionSection = (
    <SectionCard title="Opportunity Description" subtitle="Full description shown to applicants">
      <textarea
        value={details.description}
        onChange={(e) => onChange({ description: e.target.value })}
        rows={8}
        className={inputClass}
        placeholder="Describe the opportunity in detail..."
      />
    </SectionCard>
  );

  const infoSection = (
    <SectionCard title="Opportunity Information" subtitle="Type, funding, mode, and location">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="opportunityType">Opportunity Type</Label>
          <select
            id="opportunityType"
            value={details.opportunityType}
            onChange={(e) => onChange({ opportunityType: e.target.value })}
            className={inputClass}
          >
            {OPPORTUNITY_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="fundingAmount">Funding Amount</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#8C97AD]">$</span>
            <input
              id="fundingAmount"
              value={details.fundingAmount}
              onChange={(e) => onChange({ fundingAmount: e.target.value.replace(/[^0-9]/g, '') })}
              className={`${inputClass} pl-8`}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Label>Opportunity Mode</Label>
        <div className="flex flex-wrap gap-4">
          {MODE_OPTIONS.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="mode"
                checked={details.mode === o.value}
                onChange={() => onChange({ mode: o.value })}
                className="h-4 w-4 accent-[#2F66C8]"
              />
              <span className="text-[14px] text-[#44516A]">{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            value={details.country}
            onChange={(e) => onChange({ country: e.target.value })}
            className={inputClass}
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="province">Province</Label>
          <select
            id="province"
            value={details.province}
            onChange={(e) => onChange({ province: e.target.value })}
            className={inputClass}
          >
            {PROVINCE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <select
            id="city"
            value={details.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className={inputClass}
          >
            {CITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </SectionCard>
  );

  const eligibilitySection = (
    <SectionCard title="Eligibility" subtitle="Who can apply for this opportunity">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Age Range</Label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={details.ageMin}
              onChange={(e) => onChange({ ageMin: e.target.value })}
              className={inputClass}
              min={0}
            />
            <span className="text-[#8C97AD]">to</span>
            <input
              type="number"
              value={details.ageMax}
              onChange={(e) => onChange({ ageMax: e.target.value })}
              className={inputClass}
              min={0}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="educationLevel">Education Level</Label>
          <select
            id="educationLevel"
            value={details.educationLevel}
            onChange={(e) => onChange({ educationLevel: e.target.value })}
            className={inputClass}
          >
            {EDUCATION_LEVEL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="citizenship">Citizenship</Label>
          <select
            id="citizenship"
            value={details.citizenship}
            onChange={(e) => onChange({ citizenship: e.target.value })}
            className={inputClass}
          >
            {CITIZENSHIP_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="residency">Residency / Location</Label>
          <input
            id="residency"
            value={details.residency}
            onChange={(e) => onChange({ residency: e.target.value })}
            className={inputClass}
            placeholder="e.g. Ontario, Alberta"
          />
        </div>
      </div>
    </SectionCard>
  );

  const visibilitySection = (
    <SectionCard
      title="Visibility & Settings"
      subtitle="Control who can see and interact with this opportunity"
      collapsible
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Label>Visibility</Label>
          <div className="mt-2 flex flex-wrap gap-4">
            {VISIBILITY_OPTIONS.map((o) => (
              <label key={o.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  checked={details.visibility === o.value}
                  onChange={() => onChange({ visibility: o.value })}
                  className="h-4 w-4 accent-[#2F66C8]"
                />
                <span className="text-[14px] text-[#44516A]">{o.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {(
            [
              ['featured', 'Featured Opportunity'],
              ['allowBookmarking', 'Allow Bookmarking'],
              ['allowSharing', 'Allow Sharing'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex cursor-pointer items-center justify-between gap-4">
              <span className="text-[14px] text-[#44516A]">{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={details[key]}
                onClick={() => onChange({ [key]: !details[key] })}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  details[key] ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    details[key] ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>
    </SectionCard>
  );

  if (column === 'left') {
    return (
      <div className="flex flex-col gap-5">
        {basicSection}
        {coverSection}
        {timelineSection}
      </div>
    );
  }

  if (column === 'middle') {
    return (
      <div className="flex flex-col gap-5">
        {descriptionSection}
        {infoSection}
        {eligibilitySection}
      </div>
    );
  }

  if (column === 'visibility') {
    return visibilitySection;
  }

  return (
    <div className="flex flex-col gap-5">
      {basicSection}
      {coverSection}
      {timelineSection}
      {descriptionSection}
      {infoSection}
      {eligibilitySection}
      {visibilitySection}
    </div>
  );
}
