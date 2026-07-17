'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ApplicantPreviewPanel } from '@/features/opportunity-builder/components/ApplicantPreviewPanel';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { DetailsForm } from '@/features/opportunity-builder/components/DetailsForm';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import { recordToDetails } from '@/features/opportunity-builder/lib/detailsData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const router = useRouter();
  const detailsRecord = useOpportunityBuilderStore((s) => s.details);
  const details = useMemo(() => recordToDetails(detailsRecord), [detailsRecord]);
  const setDetails = useOpportunityBuilderStore((s) => s.setDetails);
  const requirementCount = useOpportunityBuilderStore((s) => s.requirementFields.length);
  const estimatedTime = useOpportunityBuilderStore((s) => s.applicationConfig.estimatedTime);

  const canContinue = details.title.trim().length > 0 && details.summary.trim().length > 0;

  const handleContinue = useCallback(() => {
    router.push('/opportunities/create/workflow');
  }, [router]);

  useRegisterBuilderNav({
    step: 3,
    backHref: '/opportunities/create/requirements',
    onContinue: handleContinue,
    continueDisabled: !canContinue,
  });

  const copy = BUILDER_PAGE_COPY.details;

  return (
    <div className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col px-5 pb-16 pt-10">
      <BuilderPageHeading
        title={copy.title}
        titleAccent={copy.titleAccent}
        subtitle={copy.subtitle}
        mobile
      />

      <div className="mt-10 flex flex-col gap-6">
        <DetailsForm details={details} onChange={setDetails} collapseSecondary />
        <ApplicantPreviewPanel
          details={details}
          requirementCount={requirementCount}
          estimatedTime={estimatedTime}
          compact
        />
      </div>
    </div>
  );
}
