'use client';

import { useRouter } from 'next/navigation';
import { Building2, CheckCircle2 } from 'lucide-react';
import { BUILDER_PAGE_COPY } from '@/features/opportunity-builder/lib/builderData';
import { BuilderPageHeading } from '@/features/opportunity-builder/components/BuilderPageHeading';
import {
  BuilderPageShell,
  BuilderSectionCard,
  FormLabel,
  RadioCard,
  SelectInput,
  TextArea,
  TextInput,
  ToggleRow,
} from '@/features/opportunity-builder/components/BuilderPageShell';
import {
  PLATFORM_OPTIONS,
  REDIRECT_TYPE_OPTIONS,
  type ExternalWorkflowConfig,
} from '@/features/opportunity-builder/lib/workflowData';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

export function ExternalWorkflowContent() {
  const router = useRouter();
  const { externalWorkflow, setBuilderData } = useOpportunityBuilderStore();

  function patch(patch: Partial<ExternalWorkflowConfig>) {
    setBuilderData({ externalWorkflow: { ...externalWorkflow, ...patch } });
  }

  function patchBeforeRedirect(key: keyof ExternalWorkflowConfig['beforeRedirect'], value: boolean) {
    setBuilderData({
      externalWorkflow: {
        ...externalWorkflow,
        beforeRedirect: { ...externalWorkflow.beforeRedirect, [key]: value },
      },
    });
  }

  function patchTracking(key: keyof ExternalWorkflowConfig['tracking'], value: boolean) {
    setBuilderData({
      externalWorkflow: {
        ...externalWorkflow,
        tracking: { ...externalWorkflow.tracking, [key]: value },
      },
    });
  }

  const urlValid = externalWorkflow.applicationUrl.startsWith('http');

  return (
    <BuilderPageShell
      step={5}
      backHref="/opportunities/create/workflow"
      onContinue={() => router.push('/opportunities/create/review')}
    >
      <BuilderPageHeading
        title={BUILDER_PAGE_COPY.externalWorkflow.title}
        titleAccent={BUILDER_PAGE_COPY.externalWorkflow.titleAccent}
        subtitle={BUILDER_PAGE_COPY.externalWorkflow.subtitle}
      />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="w-full shrink-0 lg:w-[420px]">
          <BuilderSectionCard step={1} title="Application Destination">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <FormLabel required>Application URL</FormLabel>
                <div className="relative">
                  <TextInput
                    value={externalWorkflow.applicationUrl}
                    onChange={(applicationUrl) => patch({ applicationUrl })}
                    placeholder="https://apply.example.com"
                  />
                  {urlValid && (
                    <CheckCircle2 className="absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#22C55E]" />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <FormLabel required>Destination Name</FormLabel>
                <TextInput
                  value={externalWorkflow.destinationName}
                  onChange={(destinationName) => patch({ destinationName })}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <FormLabel required>Application Platform</FormLabel>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#44516A]" />
                  <SelectInput
                    value={externalWorkflow.platform}
                    onChange={(platform) => patch({ platform })}
                    className="pl-10"
                  >
                    {PLATFORM_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <FormLabel required>Open Application In</FormLabel>
                <RadioCard
                  title="New Tab (Recommended)"
                  description="Opens the external application in a new browser tab."
                  selected={externalWorkflow.openIn === 'new-tab'}
                  onSelect={() => patch({ openIn: 'new-tab' })}
                />
                <RadioCard
                  title="Same Tab"
                  description="Redirects applicants in the current browser tab."
                  selected={externalWorkflow.openIn === 'same-tab'}
                  onSelect={() => patch({ openIn: 'same-tab' })}
                />
              </div>

              {urlValid && (
                <div className="flex items-center gap-2 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] px-4 py-3 text-[14px] text-[#15803D]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Destination URL validated
                </div>
              )}
            </div>
          </BuilderSectionCard>
        </div>

        <div className="min-w-0 flex-1">
          <BuilderSectionCard step={2} title="Redirect Experience">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <FormLabel>Redirect Type</FormLabel>
                {REDIRECT_TYPE_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.id}
                    title={opt.title}
                    description={opt.description}
                    selected={externalWorkflow.redirectType === opt.id}
                    onSelect={() => patch({ redirectType: opt.id })}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <FormLabel>Applicant Preparation Message</FormLabel>
                <TextArea
                  value={externalWorkflow.prepMessage}
                  onChange={(prepMessage) => patch({ prepMessage })}
                  maxLength={500}
                />
              </div>

              <div>
                <p className="mb-4 text-[16px] font-medium text-[#0F172A]">Provider Support Information</p>
                <div className="grid gap-5 md:grid-cols-3">
                  <div className="flex flex-col gap-2.5">
                    <FormLabel required>Contact Email</FormLabel>
                    <TextInput
                      type="email"
                      value={externalWorkflow.supportEmail}
                      onChange={(supportEmail) => patch({ supportEmail })}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <FormLabel required>Phone Number</FormLabel>
                    <TextInput
                      value={externalWorkflow.supportPhone}
                      onChange={(supportPhone) => patch({ supportPhone })}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <FormLabel required>Website</FormLabel>
                    <TextInput
                      value={externalWorkflow.supportWebsite}
                      onChange={(supportWebsite) => patch({ supportWebsite })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-[16px] font-medium text-[#0F172A]">Before Redirecting</p>
                <div className="flex flex-col gap-3">
                  <ToggleRow
                    label="Opportunity Summary"
                    description="Show opportunity summary to applicants."
                    checked={externalWorkflow.beforeRedirect.opportunitySummary}
                    onChange={(v) => patchBeforeRedirect('opportunitySummary', v)}
                  />
                  <ToggleRow
                    label="Eligibility Reminder"
                    description="Remind applicants about key eligibility."
                    checked={externalWorkflow.beforeRedirect.eligibilityReminder}
                    onChange={(v) => patchBeforeRedirect('eligibilityReminder', v)}
                  />
                  <ToggleRow
                    label="Application Deadline Reminder"
                    description="Display application deadline."
                    checked={externalWorkflow.beforeRedirect.deadlineReminder}
                    onChange={(v) => patchBeforeRedirect('deadlineReminder', v)}
                  />
                  <ToggleRow
                    label="Required Documents Reminder"
                    description="Remind applicants about required documents."
                    checked={externalWorkflow.beforeRedirect.requiredDocumentsReminder}
                    onChange={(v) => patchBeforeRedirect('requiredDocumentsReminder', v)}
                  />
                </div>
              </div>

              <div>
                <p className="mb-4 text-[16px] font-medium text-[#0F172A]">Tracking & Analytics</p>
                <div className="flex flex-col gap-3">
                  <ToggleRow
                    label="Track Opportunity Views"
                    description="Track how many times opportunity is viewed."
                    checked={externalWorkflow.tracking.trackViews}
                    onChange={(v) => patchTracking('trackViews', v)}
                  />
                  <ToggleRow
                    label="Track Apply Button Clicks"
                    description="Track clicks on the Apply Button."
                    checked={externalWorkflow.tracking.trackApplyClicks}
                    onChange={(v) => patchTracking('trackApplyClicks', v)}
                  />
                  <ToggleRow
                    label="Track Redirect Conversions"
                    description="Track successful outbound redirects."
                    checked={externalWorkflow.tracking.trackConversions}
                    onChange={(v) => patchTracking('trackConversions', v)}
                  />
                  <ToggleRow
                    label="Track Traffic Sources"
                    description="Track where applicants are coming from."
                    checked={externalWorkflow.tracking.trackTrafficSources}
                    onChange={(v) => patchTracking('trackTrafficSources', v)}
                  />
                  <ToggleRow
                    label="Track Device Types"
                    description="Track device and browser analytics."
                    checked={externalWorkflow.tracking.trackDeviceTypes}
                    onChange={(v) => patchTracking('trackDeviceTypes', v)}
                  />
                </div>
              </div>
            </div>
          </BuilderSectionCard>
        </div>
      </div>
    </BuilderPageShell>
  );
}
