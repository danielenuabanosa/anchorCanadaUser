'use client';

import { Lightbulb } from 'lucide-react';
import { BUILDER_CATEGORY_GROUPS } from '@/features/opportunity-builder/lib/builderData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

function getOpportunityTypeLabel(type: string | null) {
  if (type === 'external') return 'External Opportunity';
  if (type === 'express-interest') return 'Express Interest';
  if (type === 'internal') return 'Internal Opportunity';
  return 'Opportunity';
}

function getCategoryLabel(category: string | null) {
  if (!category) return 'Grants';
  const group = BUILDER_CATEGORY_GROUPS.find(
    (g) => g.id === category || g.subcategories.some((s) => s.id === category),
  );
  return group?.title ?? 'Grants';
}

export function TemplateRecommendationBanner() {
  const opportunityType = useOpportunityBuilderStore((s) => s.opportunityType);
  const category = useOpportunityBuilderStore((s) => s.category);

  const selectionLabels = [getOpportunityTypeLabel(opportunityType), getCategoryLabel(category)];

  return (
    <div className="flex w-full flex-col gap-5 rounded-[10px] border border-[#EAF0FD] bg-[#F5F8FE] p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="flex min-w-0 items-start gap-5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] lg:h-[68px] lg:w-[68px]">
          <Lightbulb className="h-[26px] w-[26px] text-[#2F66C8] lg:h-[34px] lg:w-[34px]" />
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[16px] font-medium text-[#001FED] lg:text-[18px]">
            Recommended Based On Your Selection
          </p>
          <p className="mt-1 font-sans text-[14px] text-[#44516A] lg:text-[16px]">
            Choose a template below or start from scratch.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 lg:shrink-0 lg:justify-end">
        <span className="font-sans text-[14px] text-[#44516A]">You selected:</span>
        {selectionLabels.map((label) => (
          <span
            key={label}
            className="rounded-[4px] bg-[#E5ECFE] px-1.5 py-0.5 font-sans text-[14px] font-medium text-[#1C31D5]"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
