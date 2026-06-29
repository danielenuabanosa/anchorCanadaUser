'use client';

import { Bookmark, Clock, MapPin, Wallet } from 'lucide-react';
import type { OpportunityDetails } from '@/features/opportunity-builder/lib/detailsData';
import {
  formatDeadline,
  formatFunding,
  getLocationLabel,
  getModeLabel,
  getOpportunityTypeLabel,
} from '@/features/opportunity-builder/lib/detailsData';

interface ApplicantPreviewPanelProps {
  details: OpportunityDetails;
  requirementCount?: number;
  compact?: boolean;
}

export function ApplicantPreviewPanel({
  details,
  requirementCount = 0,
  compact = false,
}: ApplicantPreviewPanelProps) {
  const location = getLocationLabel(details);
  const estMinutes = Math.max(10, requirementCount * 3 + 5);

  return (
    <aside className={`flex flex-col ${compact ? '' : 'lg:sticky lg:top-6 lg:w-[360px] lg:shrink-0'}`}>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.06)]">
        <div className="border-b border-[#EEF2F8] px-5 py-4">
          <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Application Preview</p>
          <p className="mt-0.5 font-sans text-[13px] text-[#8C97AD]">Live preview for applicants</p>
        </div>

        <div className="h-[140px] bg-gradient-to-br from-[#EFF4FF] to-[#D9E1EF]">
          {details.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={details.coverImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center font-sans text-[13px] text-[#8C97AD]">
              Cover image preview
            </div>
          )}
        </div>

        <div className="p-5">
          <span className="inline-flex rounded-[4px] bg-[#E6DFFB] px-2 py-0.5 text-[12px] font-medium text-[#6821CD]">
            {getOpportunityTypeLabel(details.opportunityType)}
          </span>

          <h3 className="mt-3 font-serif text-[22px] leading-tight text-[#0F172A]">
            {details.title || 'Untitled Opportunity'}
          </h3>

          <ul className="mt-4 flex flex-col gap-2.5">
            {details.fundingAmount && (
              <li className="flex items-center gap-2 text-[14px] text-[#44516A]">
                <Wallet className="h-4 w-4 shrink-0 text-[#2F66C8]" />$
                {formatFunding(details.fundingAmount)} Funding
              </li>
            )}
            {location && (
              <li className="flex items-center gap-2 text-[14px] text-[#44516A]">
                <MapPin className="h-4 w-4 shrink-0 text-[#2F66C8]" />
                {location}
              </li>
            )}
            <li className="flex items-center gap-2 text-[14px] text-[#44516A]">
              <MapPin className="h-4 w-4 shrink-0 text-[#2F66C8]" />
              {getModeLabel(details.mode)}
            </li>
          </ul>

          {details.deadlineDate && (
            <div className="mt-4 rounded-[8px] bg-[#FEF1F1] px-4 py-3">
              <p className="text-[12px] font-medium text-[#DE1735]">Applications Close</p>
              <p className="mt-0.5 text-[14px] font-semibold text-[#0F172A]">
                {formatDeadline(details.deadlineDate)}
              </p>
            </div>
          )}

          {details.summary && (
            <p className="mt-4 line-clamp-3 font-sans text-[14px] leading-relaxed text-[#44516A]">
              {details.summary}
            </p>
          )}

          <button
            type="button"
            className="mt-5 w-full rounded-[6px] bg-[#2F66C8] py-3 text-[15px] font-medium text-white"
          >
            Apply Now
          </button>
          <button
            type="button"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] py-3 text-[15px] font-medium text-[#2F66C8]"
          >
            <Bookmark className="h-4 w-4" />
            Save Opportunity
          </button>

          <div className="mt-4 flex items-center gap-2 rounded-[8px] bg-[#F8FAFC] px-3 py-2.5">
            <Clock className="h-4 w-4 shrink-0 text-[#8C97AD]" />
            <p className="text-[12px] text-[#44516A]">
              Estimated Application Time: {estMinutes - 5} – {estMinutes} Minutes
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
