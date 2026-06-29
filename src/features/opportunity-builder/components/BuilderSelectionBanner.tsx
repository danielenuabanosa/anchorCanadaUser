'use client';

import Link from 'next/link';
import { Lightbulb, SquarePen } from 'lucide-react';
import { getSelectionSummary } from '@/features/opportunity-builder/lib/requirementsData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export function BuilderSelectionBanner() {
  const opportunityType = useOpportunityBuilderStore((s) => s.opportunityType);
  const category = useOpportunityBuilderStore((s) => s.category);
  const template = useOpportunityBuilderStore((s) => s.template);

  return (
    <div className="flex w-full flex-col gap-4 rounded-[10px] border border-[#EAF0FD] bg-[#F5F8FE] p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-start gap-5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] lg:h-[68px] lg:w-[68px]">
          <Lightbulb className="h-[26px] w-[26px] text-[#2F66C8] lg:h-[34px] lg:w-[34px]" />
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[16px] font-medium text-[#001FED] lg:text-[18px]">
            Based on your selections
          </p>
          <p className="mt-1 font-sans text-[14px] text-[#44516A] lg:text-[16px]">
            {getSelectionSummary(opportunityType, category, template)}
          </p>
        </div>
      </div>
      <Link
        href="/opportunities/create/template"
        className="inline-flex shrink-0 items-center justify-center gap-2.5 self-start rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-[14px] font-medium text-[#2F66C8] transition-colors hover:bg-[#EFF4FF] lg:text-[16px]"
      >
        Change Template
        <SquarePen className="h-4 w-4" />
      </Link>
    </div>
  );
}
