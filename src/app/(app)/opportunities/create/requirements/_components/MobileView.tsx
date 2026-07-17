'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import { RequirementsConfigForm } from '@/features/opportunity-builder/components/RequirementsConfigForm';
import { useRegisterBuilderNav } from '@/features/opportunity-builder/context/BuilderNavContext';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import {
  DEFAULT_APPLICATION_CONFIG,
  DEFAULT_DOCUMENT_REQUIREMENTS,
} from '@/features/opportunity-builder/lib/documentRequirementsData';
import { DEFAULT_EXTERNAL_CONFIG } from '@/features/opportunity-builder/lib/workflowData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export default function MobileView() {
  const router = useRouter();
  const documentRequirements =
    useOpportunityBuilderStore((s) => s.documentRequirements) ?? DEFAULT_DOCUMENT_REQUIREMENTS;
  const applicationConfig =
    useOpportunityBuilderStore((s) => s.applicationConfig) ?? DEFAULT_APPLICATION_CONFIG;
  const opportunityType = useOpportunityBuilderStore((s) => s.opportunityType);
  const externalWorkflow =
    useOpportunityBuilderStore((s) => s.externalWorkflow) ?? DEFAULT_EXTERNAL_CONFIG;
  const initRequirementsFromTemplate = useOpportunityBuilderStore((s) => s.initRequirementsFromTemplate);
  const toggleDocument = useOpportunityBuilderStore((s) => s.toggleDocument);
  const removeDocument = useOpportunityBuilderStore((s) => s.removeDocument);
  const addCustomDocument = useOpportunityBuilderStore((s) => s.addCustomDocument);
  const setApplicationConfig = useOpportunityBuilderStore((s) => s.setApplicationConfig);
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);
  const copy = BUILDER_PAGE_COPY.requirements;

  useEffect(() => {
    initRequirementsFromTemplate();
  }, [initRequirementsFromTemplate]);

  const enabledCount = documentRequirements.filter((d) => d.enabled).length;

  const handleContinue = useCallback(() => {
    router.push('/opportunities/create/details');
  }, [router]);

  useRegisterBuilderNav({
    step: 2,
    backHref: '/opportunities/create/category',
    onContinue: handleContinue,
    continueDisabled: enabledCount === 0,
  });

  return (
    <div className="mx-auto flex w-full flex-1 flex-col px-5 pb-16 pt-10">
      <BuilderPageHeading title={copy.title} titleAccent={copy.titleAccent} subtitle={copy.subtitle} mobile />

      <div className="mt-10 w-full">
        <RequirementsConfigForm
          documents={documentRequirements}
          applicationConfig={applicationConfig}
          applicationUrl={externalWorkflow.applicationUrl}
          destinationName={externalWorkflow.destinationName}
          opportunityType={opportunityType}
          onToggleDocument={toggleDocument}
          onRemoveDocument={removeDocument}
          onAddCustomDocument={addCustomDocument}
          onApplicationConfigChange={setApplicationConfig}
          onDestinationChange={(patch) =>
            setBuilderData({
              externalWorkflow: { ...externalWorkflow, ...patch },
            })
          }
        />
      </div>
    </div>
  );
}
