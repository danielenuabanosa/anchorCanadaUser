'use client';

import { CalendarDays, ChevronDown, Clock, Eye, Globe, HandCoins, Info, MapPin } from 'lucide-react';
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
  estimatedTime?: string;
  compact?: boolean;
}

export function ApplicantPreviewPanel({
  details,
  requirementCount = 0,
  estimatedTime,
  compact = false,
}: ApplicantPreviewPanelProps) {
  const location = getLocationLabel(details);
  void requirementCount;

  return (
    <aside className={`flex flex-col ${compact ? '' : 'lg:sticky lg:top-[100px] lg:w-[348px] lg:shrink-0'}`}>
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Eye className="h-[18px] w-[18px] text-[#2F66C8]" />
            <p className="font-sans text-[16px] font-medium text-[#0F172A]">Application Preview</p>
          </div>
          <button type="button" className="text-[14px] font-medium text-[#2F66C8]">
            See Full Page
          </button>
        </div>

        <div className="p-5">
          <div className="h-32 overflow-hidden rounded-[8px] bg-gradient-to-br from-[#EFF4FF] to-[#D9E1EF]">
            {details.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={details.coverImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center font-sans text-[13px] text-[#8C97AD]">
                Cover image preview
              </div>
            )}
          </div>

          <div className="mt-5">
            <span className="inline-flex rounded-[4px] bg-[#E6DFFB] px-1 py-0.5 text-[12px] font-medium text-[#6821CD]">
              {getOpportunityTypeLabel(details.opportunityType)}
            </span>
            <h3 className="mt-1.5 font-serif text-[24px] leading-tight text-[#0F172A]">
              {details.title || 'Untitled Opportunity'}
            </h3>
          </div>

          <ul className="mt-5 flex flex-col gap-4">
            {details.fundingAmount ? (
              <li className="flex items-center gap-2 text-[14px] text-[#44516A]">
                <HandCoins className="h-3.5 w-3.5 shrink-0 text-[#2F66C8]" />$
                {formatFunding(details.fundingAmount)} Funding
              </li>
            ) : null}
            {location ? (
              <li className="flex items-center gap-2 text-[14px] text-[#44516A]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#2F66C8]" />
                {location}
              </li>
            ) : null}
            <li className="flex items-center gap-2 text-[14px] text-[#44516A]">
              <Globe className="h-3.5 w-3.5 shrink-0 text-[#2F66C8]" />
              {getModeLabel(details.mode)}
            </li>
          </ul>

          {details.deadlineDate ? (
            <div className="mt-5 flex items-center gap-4 rounded-[8px] bg-[#FEF1F1] p-2.5">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[8px] bg-white">
                <CalendarDays className="h-6 w-6 text-[#DE1735]" />
              </div>
              <div>
                <p className="text-[12px] text-[#DE1735]">Applications Close</p>
                <p className="mt-1 text-[14px] font-medium text-[#0F172A]">
                  {formatDeadline(details.deadlineDate)}
                </p>
              </div>
            </div>
          ) : null}

          {details.summary ? (
            <p className="mt-4 line-clamp-2 font-sans text-[14px] leading-relaxed text-[#44516A]">
              {details.summary}
            </p>
          ) : null}

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#2F66C8]"
          >
            See All
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="border-t border-[#EEF2F8] px-5 py-4">
          <div className="flex items-start justify-between gap-3 rounded-[8px] bg-[#F8FAFC] p-2.5">
            <div className="flex items-center gap-3">
              <Clock className="h-7 w-7 shrink-0 text-[#2F66C8]" />
              <div>
                <p className="text-[12px] text-[#8C97AD]">Estimated Application Time</p>
                <p className="mt-0.5 text-[14px] font-medium text-[#0F172A]">
                  {estimatedTime || '15 - 20 Minutes'}
                </p>
              </div>
            </div>
            <Info className="mt-0.5 h-3 w-3 shrink-0 text-[#8C97AD]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
