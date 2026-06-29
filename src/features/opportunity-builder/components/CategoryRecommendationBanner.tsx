'use client';

import { Sparkles } from 'lucide-react';
import { getCategoryRecommendation } from '@/features/opportunity-builder/lib/builderData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export function CategoryRecommendationBanner() {
  const opportunityType = useOpportunityBuilderStore((s) => s.opportunityType);
  const { title, descriptionLines, recommendedLabels } = getCategoryRecommendation(opportunityType);

  return (
    <div className="flex w-full flex-col gap-5 rounded-[10px] border border-[#EAF0FD] bg-[#F5F8FE] p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="flex min-w-0 items-start gap-5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] lg:h-[68px] lg:w-[68px]">
          <Sparkles className="h-[26px] w-[26px] text-[#2F66C8] lg:h-[34px] lg:w-[34px]" />
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[16px] font-medium text-[#001FED] lg:text-[18px]">{title}</p>
          <div className="mt-1 font-sans text-[14px] leading-normal text-[#44516A] lg:text-[16px]">
            {descriptionLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 lg:shrink-0 lg:justify-end">
        {recommendedLabels.map((label) => (
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
