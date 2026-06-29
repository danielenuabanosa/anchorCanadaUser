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

export default function DesktopView() {
  const router = useRouter();
  const detailsRecord = useOpportunityBuilderStore((s) => s.details);
  const details = useMemo(() => recordToDetails(detailsRecord), [detailsRecord]);
  const setDetails = useOpportunityBuilderStore((s) => s.setDetails);
  const requirementCount = useOpportunityBuilderStore((s) => s.requirementFields.length);

  const canContinue = details.title.trim().length > 0 && details.summary.trim().length > 0;

  const handleContinue = useCallback(() => {
    router.push('/opportunities/create/workflow');
  }, [router]);

  useRegisterBuilderNav({
    step: 4,
    backHref: '/opportunities/create/requirements',
    onContinue: handleContinue,
    continueDisabled: !canContinue,
  });

  const copy = BUILDER_PAGE_COPY.details;

  return (
    <div className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
      <BuilderPageHeading title={copy.title} titleAccent={copy.titleAccent} subtitle={copy.subtitle} />

      <div className="mt-[60px] grid w-full grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_360px]">
        <DetailsForm details={details} onChange={setDetails} column="left" />
        <DetailsForm details={details} onChange={setDetails} column="middle" />
        <ApplicantPreviewPanel details={details} requirementCount={requirementCount} />
      </div>

      <div className="mt-5 w-full">
        <DetailsForm details={details} onChange={setDetails} column="visibility" />
      </div>
    </div>
  );
}
