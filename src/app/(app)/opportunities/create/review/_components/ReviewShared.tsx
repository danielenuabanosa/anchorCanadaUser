'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Globe,
  House,
  Info,
  Layers,
  Send,
  ShieldCheck,
  TriangleAlert,
  Users,
  Video,
  FileText,
} from 'lucide-react';

import { BuilderPageShell, RadioRow, ToggleRow } from '@/features/opportunity-builder/components/BuilderPageShell';
import {
  BUILDER_CATEGORIES,
  BUILDER_STEP_ROUTES,
  BUILDER_TEMPLATES,
  OPPORTUNITY_TYPES,
} from '@/features/opportunity-builder/lib/builderData';
import { getWorkflowLabel, WORKFLOW_SUB_ROUTES } from '@/features/opportunity-builder/lib/workflowData';
import { providerApi } from '@/features/provider/services/providerApi';
import { getApiErrorMessage } from '@/lib/apiError';
import { cn } from '@/lib/utils';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';

type PublishOption = 'now' | 'schedule' | 'draft';

export interface ReviewValidationItem {
  label: string;
  value: string;
  ok: boolean;
}

export interface ReviewWarning {
  id: string;
  message: string;
  href: string;
}

export interface ReviewError {
  id: string;
  message: string;
  href: string;
}

function formatDisplayDate(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
}

function daysUntil(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const diff = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
}

function SummaryIcon({ children }: { children: React.ReactNode }) {
  return <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[#8C97AD]">{children}</span>;
}

function SummaryRow({
  icon,
  label,
  value,
  valueClassName,
  badge,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
  badge?: { text: string; className: string };
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF2F8] px-4 py-4 last:border-0">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-[14px] font-medium text-[#0F172A]">{label}</span>
      </div>
      {badge ? (
        <span className={cn('rounded-[4px] px-2 py-1 text-[14px] font-medium', badge.className)}>
          {badge.text}
        </span>
      ) : (
        <span className={cn('text-[14px] text-[#44516A]', valueClassName)}>{value}</span>
      )}
    </div>
  );
}

function SectionHeader({
  step,
  title,
  expanded,
  onToggle,
  trailing,
}: {
  step: number;
  title: string;
  expanded?: boolean;
  onToggle?: () => void;
  trailing?: React.ReactNode;
}) {
  const interactive = onToggle != null;
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={!interactive}
      className={cn(
        'flex w-full items-center justify-between border-b border-[#EEF2F8] px-5 py-4 text-left',
        interactive && 'cursor-pointer',
      )}
    >
      <div className="flex items-center gap-5">
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[4px] bg-[#2F66C8] text-[16px] font-medium text-white">
          {step}
        </span>
        <span className="text-[16px] font-medium text-[#0F172A]">{title}</span>
      </div>
      <div className="flex items-center gap-5">
        {trailing}
        {interactive ? (
          expanded ? (
            <ChevronUp className="h-[18px] w-[18px] text-[#44516A]" />
          ) : (
            <ChevronDown className="h-[18px] w-[18px] text-[#44516A]" />
          )
        ) : null}
      </div>
    </button>
  );
}

function opportunityTypeLabel(type: string | null) {
  if (!type) return 'Not selected';
  return OPPORTUNITY_TYPES.find((t) => t.id === type)?.title ?? type;
}

export function useReviewPublish() {
  const router = useRouter();
  const store = useOpportunityBuilderStore();
  const {
    opportunityType,
    category,
    template,
    requirementFields,
    details,
    workflowType,
    internalWorkflow,
    externalWorkflow,
    expressInterestWorkflow,
    resetBuilder,
  } = store;

  const [publishError, setPublishError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishOption, setPublishOption] = useState<PublishOption>('now');
  const [notifyFollowers, setNotifyFollowers] = useState(true);
  const [notifyTeam, setNotifyTeam] = useState(true);
  const [shareToFeed, setShareToFeed] = useState(true);

  const typeLabel = OPPORTUNITY_TYPES.find((t) => t.id === opportunityType)?.title ?? 'Not selected';
  const categoryLabel = BUILDER_CATEGORIES.find((c) => c.id === category)?.title ?? category ?? 'Not selected';
  const templateLabel = BUILDER_TEMPLATES.find((t) => t.id === template)?.title ?? template ?? 'Not selected';
  const title = details.title?.trim() || templateLabel || 'Untitled Opportunity';
  const workflowBackHref = workflowType ? WORKFLOW_SUB_ROUTES[workflowType] : BUILDER_STEP_ROUTES[5];

  const locationLabel = [details.city, details.province, details.country].filter(Boolean).join(', ') || 'Canada (Nationwide)';

  const validationItems: ReviewValidationItem[] = useMemo(
    () => [
      { label: 'Opportunity Title', value: typeLabel, ok: Boolean(details.title?.trim()) },
      { label: 'Category', value: categoryLabel, ok: Boolean(category) },
      { label: 'Template', value: templateLabel, ok: Boolean(template) },
      {
        label: 'Requirements',
        value: `${requirementFields.length} requirements added`,
        ok: requirementFields.length > 0,
      },
      {
        label: 'Details',
        value: Object.keys(details).length > 0 ? 'All required information added' : 'Missing details',
        ok: Boolean(details.title && details.deadlineDate),
      },
      {
        label: 'Workflow',
        value: workflowType === 'internal'
          ? `${internalWorkflow.stages.length} stages configured`
          : getWorkflowLabel(workflowType),
        ok: Boolean(workflowType),
      },
    ],
    [
      category,
      categoryLabel,
      details,
      internalWorkflow.stages.length,
      requirementFields.length,
      template,
      templateLabel,
      typeLabel,
      workflowType,
    ],
  );

  const errors: ReviewError[] = useMemo(() => {
    const list: ReviewError[] = [];
    if (!workflowType) {
      list.push({
        id: 'workflow-missing',
        message: 'Workflow is incomplete. Configure at least one review stage before publishing.',
        href: BUILDER_STEP_ROUTES[5],
      });
    } else if (workflowType === 'internal' && internalWorkflow.stages.length < 2) {
      list.push({
        id: 'workflow-stages',
        message: 'Workflow is incomplete. Add all required stages to your internal workflow.',
        href: WORKFLOW_SUB_ROUTES.internal,
      });
    } else if (workflowType === 'external' && !externalWorkflow.applicationUrl?.trim()) {
      list.push({
        id: 'external-url',
        message: 'External application URL is required before publishing.',
        href: WORKFLOW_SUB_ROUTES.external,
      });
    }
    if (!details.title?.trim()) {
      list.push({
        id: 'title-missing',
        message: 'Opportunity title is required.',
        href: BUILDER_STEP_ROUTES[4],
      });
    }
    return list;
  }, [details.title, externalWorkflow.applicationUrl, internalWorkflow.stages.length, workflowType]);

  const warnings: ReviewWarning[] = useMemo(() => {
    const days = daysUntil(details.deadlineDate);
    if (days != null && days > 0 && days <= 60) {
      return [
        {
          id: 'deadline',
          message: `Deadline is within ${days} days. Consider extending to allow more time for applicants.`,
          href: BUILDER_STEP_ROUTES[4],
        },
      ];
    }
    return [];
  }, [details.deadlineDate]);

  const suggestions: ReviewWarning[] = useMemo(() => {
    const wordCount = (details.description ?? details.summary ?? '').trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 150) {
      return [
        {
          id: 'description',
          message: 'Description could be more detailed. We recommend at least 150 words for better visibility.',
          href: BUILDER_STEP_ROUTES[4],
        },
      ];
    }
    return [];
  }, [details.description, details.summary]);

  const hasErrors = !opportunityType || validationItems.some((i) => !i.ok) || errors.length > 0;
  const allGood = !hasErrors;

  const buildPayload = useCallback(
    (publish: boolean) => ({
      title,
      description: details.summary ?? details.description ?? '',
      opportunityType: opportunityType!,
      category,
      template,
      location: details.location ?? locationLabel,
      province: details.province,
      builderPayload: {
        opportunityType,
        category,
        template,
        requirementFields,
        details,
        workflowType,
        internalWorkflow,
        externalWorkflow,
        expressInterestWorkflow,
        publishOption,
        notifyFollowers,
        notifyTeam,
        shareToFeed,
      },
      publish,
    }),
    [
      category,
      details,
      expressInterestWorkflow,
      externalWorkflow,
      internalWorkflow,
      locationLabel,
      notifyFollowers,
      notifyTeam,
      opportunityType,
      publishOption,
      requirementFields,
      shareToFeed,
      template,
      title,
      workflowType,
    ],
  );

  const handlePublish = useCallback(async () => {
    if (!opportunityType) {
      setPublishError('Select an opportunity type before publishing.');
      return;
    }
    setPublishError('');
    setIsPublishing(true);
    try {
      await providerApi.publishOpportunity(buildPayload(publishOption !== 'draft'));
      resetBuilder();
      router.push('/opportunities');
    } catch (err) {
      setPublishError(
        getApiErrorMessage(
          err,
          'Could not submit opportunity for review. Make sure you are signed in and the backend is running.',
        ),
      );
      setIsPublishing(false);
    }
  }, [buildPayload, opportunityType, publishOption, resetBuilder, router]);

  const handleSaveDraft = useCallback(async () => {
    if (!opportunityType) {
      setPublishError('Select an opportunity type before saving.');
      return;
    }
    setPublishError('');
    setIsPublishing(true);
    try {
      await providerApi.publishOpportunity(buildPayload(false));
      resetBuilder();
      router.push('/opportunities');
    } catch (err) {
      setPublishError(getApiErrorMessage(err, 'Could not save draft.'));
      setIsPublishing(false);
    }
  }, [buildPayload, opportunityType, resetBuilder, router]);

  return {
    workflowBackHref,
    handlePublish,
    handleSaveDraft,
    isPublishing,
    publishError,
    publishOption,
    setPublishOption,
    notifyFollowers,
    setNotifyFollowers,
    notifyTeam,
    setNotifyTeam,
    shareToFeed,
    setShareToFeed,
    title,
    typeLabel,
    categoryLabel,
    templateLabel,
    locationLabel,
    requirementFields,
    details,
    workflowType,
    internalWorkflow,
    externalWorkflow,
    expressInterestWorkflow,
    validationItems,
    warnings,
    suggestions,
    errors,
    allGood,
    opportunityType,
  };
}

export function ReviewPageHeading() {
  return (
    <div className="mx-auto max-w-[794px] text-center">
      <div className="flex items-baseline justify-center gap-2.5">
        <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Review &</h1>
        <span className="font-serif text-[48px] italic leading-[56px] text-[#2F66C8]">Publish</span>
      </div>
      <p className="mt-2.5 text-[16px] text-[#44516A]">
        Review all your information, check for any issues, and publish your opportunity when you&apos;re ready.
        This is the final step before your opportunity goes live.
      </p>
    </div>
  );
}

export function OpportunitySummaryBody({
  title,
  opportunityType,
  categoryLabel,
  templateLabel,
  details,
  locationLabel,
}: {
  title: string;
  opportunityType: string | null;
  categoryLabel: string;
  templateLabel: string;
  details: Record<string, string>;
  locationLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
      <SummaryRow icon={<SummaryIcon><House className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>} label="Opportunity Title" value={title} />
      <SummaryRow
        icon={<SummaryIcon><ShieldCheck className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Opportunity Type"
        value=""
        badge={{
          text: opportunityTypeLabel(opportunityType),
          className: 'bg-[#ECFDF5] text-[#15803D] border border-[#D1FAE5]',
        }}
      />
      <SummaryRow icon={<SummaryIcon><Layers className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>} label="Category" value={categoryLabel} />
      <SummaryRow icon={<SummaryIcon><Layers className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>} label="Template" value={templateLabel} />
      <SummaryRow
        icon={<SummaryIcon><Building2 className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Organization"
        value={details.organization ?? 'Maple Future Foundation'}
      />
      <SummaryRow
        icon={<SummaryIcon><Calendar className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Application Opens"
        value={formatDisplayDate(details.opensDate)}
      />
      <SummaryRow
        icon={<SummaryIcon><CalendarDays className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Application Deadline"
        value={formatDisplayDate(details.deadlineDate)}
        valueClassName="text-[#B91C1C]"
      />
      <SummaryRow
        icon={<SummaryIcon><Users className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Target Audience"
        value={details.educationLevel ?? details.targetAudience ?? 'Post-secondary Students'}
      />
      <SummaryRow icon={<SummaryIcon><Users className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>} label="Location" value={locationLabel} />
    </div>
  );
}

export function RequirementSummaryBody({
  requirementFields,
}: {
  requirementFields: { id: string; title: string; required?: boolean }[];
}) {
  if (requirementFields.length === 0) {
    return <p className="px-5 py-4 text-[14px] text-[#8C97AD]">No requirements added yet.</p>;
  }
  return (
    <div className="px-5 pb-5">
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
        {requirementFields.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between border-b border-[#EEF2F8] px-4 py-4 last:border-0"
          >
            <span className="text-[14px] font-medium text-[#0F172A]">{req.title}</span>
            <span className="text-[14px] font-medium text-[#15803D]">Required</span>
          </div>
        ))}
        <div className="px-4 py-4">
          <Link href={BUILDER_STEP_ROUTES[3]} className="text-[14px] font-medium text-[#2F66C8] hover:underline">
            View all requirements ({requirementFields.length})
          </Link>
        </div>
      </div>
    </div>
  );
}

const INTERNAL_STAGE_ICONS = [Send, FileText, Users, Video, CircleCheck];

export function WorkflowSummaryBody({
  workflowType,
  internalWorkflow,
  externalWorkflow,
}: {
  workflowType: string | null;
  internalWorkflow: { stages: { id: string; name: string; stageType?: string }[] };
  externalWorkflow: { applicationUrl: string; destinationName: string };
}) {
  if (workflowType === 'external') {
    return (
      <div className="space-y-3 px-5 pb-5">
        <SummaryRow label="Application URL" value={externalWorkflow.applicationUrl || '—'} />
        <SummaryRow label="Destination" value={externalWorkflow.destinationName || '—'} />
        <Link href={BUILDER_STEP_ROUTES[5]} className="inline-block text-[14px] font-medium text-[#2F66C8] hover:underline">
          View full workflow
        </Link>
      </div>
    );
  }

  const stages =
    workflowType === 'internal'
      ? internalWorkflow.stages.slice(0, 5)
      : [
          { id: '1', name: 'Interest Submitted', stageType: 'Auto' },
          { id: '2', name: 'Review', stageType: 'Manual' },
          { id: '3', name: 'Shortlist', stageType: 'Manual' },
          { id: '4', name: 'Invite', stageType: 'Manual' },
          { id: '5', name: 'Decision', stageType: 'Manual' },
        ];

  return (
    <div className="px-5 pb-5">
      <div className="flex flex-wrap items-start justify-between gap-3 md:hidden">
        {stages.map((stage, i) => {
          const Icon = INTERNAL_STAGE_ICONS[i] ?? FileText;
          return (
            <div key={stage.id} className="flex min-w-[72px] flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF4FF] text-[#2F66C8]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-[12px] font-medium text-[#0F172A]">{stage.name}</p>
              <p className="text-[10px] text-[#8C97AD]">{stage.stageType ?? 'Manual'}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 hidden gap-4 overflow-x-auto md:flex">
        {stages.map((stage, i) => {
          const Icon = INTERNAL_STAGE_ICONS[i] ?? FileText;
          return (
            <div key={stage.id} className="flex min-w-[100px] flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF4FF] text-[#2F66C8]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-[14px] font-medium text-[#0F172A]">{stage.name}</p>
              <p className="text-[12px] text-[#8C97AD]">{stage.stageType ?? 'Manual'}</p>
            </div>
          );
        })}
      </div>
      <Link
        href={BUILDER_STEP_ROUTES[5]}
        className="mt-4 inline-block text-[14px] font-medium text-[#2F66C8] hover:underline"
      >
        View full workflow
      </Link>
    </div>
  );
}

export function ValidationCenterBody({
  validationItems,
  warnings,
  suggestions,
  errors,
  allGood,
}: {
  validationItems: ReviewValidationItem[];
  warnings: ReviewWarning[];
  suggestions: ReviewWarning[];
  errors: ReviewError[];
  allGood: boolean;
}) {
  return (
    <div className="space-y-5 p-5">
      {errors.length > 0 ? (
        <div className="space-y-3">
          <p className="text-[16px] font-medium text-[#B91C1C]">Errors ({errors.length})</p>
          {errors.map((e) => (
            <div
              key={e.id}
              className="flex items-start justify-between gap-3 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] p-4"
            >
              <div className="flex items-start gap-3">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#B91C1C]" />
                <p className="text-[14px] text-[#44516A]">{e.message}</p>
              </div>
              <Link href={e.href} className="shrink-0 text-[14px] font-medium text-[#2F66C8] hover:underline">
                Review
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-start gap-3.5 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-4">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[10px] bg-[#15803D]">
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          </span>
          <p className="text-[14px] font-medium text-[#15803D]">
            Great! Your opportunity is almost ready to go live.
          </p>
        </div>
      )}

      <div>
        <p className="text-[16px] font-medium text-[#0F172A]">
          Completed <span className="font-medium text-[#8C97AD]">(All good)</span>
        </p>
        <div className="mt-3 overflow-hidden rounded-[10px] border border-[#EEF2F8]">
          {validationItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-[#EEF2F8] px-4 py-4 last:border-0"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'flex h-[18px] w-[18px] items-center justify-center rounded-full',
                    item.ok ? 'bg-[#15803D]' : 'bg-[#EEF2F8]',
                  )}
                >
                  {item.ok ? <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} /> : null}
                </span>
                <span className="text-[14px] font-medium text-[#0F172A]">{item.label}</span>
              </div>
              <span className="text-[14px] text-[#44516A]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {warnings.length > 0 ? (
        <div>
          <p className="text-[16px] font-medium text-[#B45309]">Warnings ({warnings.length})</p>
          <div className="mt-3 space-y-3">
            {warnings.map((w) => (
              <div
                key={w.id}
                className="flex items-start justify-between gap-3 rounded-[10px] border border-[#FEF3C7] bg-[#FFFBEB] p-4"
              >
                <div className="flex items-start gap-3">
                  <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#B45309]" />
                  <p className="text-[14px] text-[#44516A]">{w.message}</p>
                </div>
                <Link href={w.href} className="shrink-0 text-[14px] font-medium text-[#2F66C8] hover:underline">
                  Review
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {suggestions.length > 0 ? (
        <div>
          <p className="text-[16px] font-medium text-[#2F66C8]">Suggestions ({suggestions.length})</p>
          <div className="mt-3 space-y-3">
            {suggestions.map((s) => (
              <div
                key={s.id}
                className="flex items-start justify-between gap-3 rounded-[10px] border border-[#DCE8FF] bg-[#EFF4FF] p-4"
              >
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#2F66C8]" />
                  <p className="text-[14px] text-[#44516A]">{s.message}</p>
                </div>
                <Link href={s.href} className="shrink-0 text-[14px] font-medium text-[#2F66C8] hover:underline">
                  Review
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {allGood ? (
        <div className="rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-4">
          <p className="text-[14px] font-medium text-[#15803D]">
            No errors found. You&apos;re ready to publish! You can publish now or schedule for later.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function PublishSettingsBody({
  publishOption,
  setPublishOption,
  notifyFollowers,
  setNotifyFollowers,
  notifyTeam,
  setNotifyTeam,
  shareToFeed,
  setShareToFeed,
}: {
  publishOption: PublishOption;
  setPublishOption: (v: PublishOption) => void;
  notifyFollowers: boolean;
  setNotifyFollowers: (v: boolean) => void;
  notifyTeam: boolean;
  setNotifyTeam: (v: boolean) => void;
  shareToFeed: boolean;
  setShareToFeed: (v: boolean) => void;
}) {
  return (
    <div className="space-y-5 p-5">
      <div>
        <p className="mb-4 text-[16px] font-medium text-[#0F172A]">Publish Option</p>
        <div className="space-y-4">
          <RadioRow
            title="Publish Now"
            description="Make this opportunity live immediately."
            selected={publishOption === 'now'}
            onSelect={() => setPublishOption('now')}
          />
          <RadioRow
            title="Schedule Publication"
            description="Choose a future date and time."
            selected={publishOption === 'schedule'}
            onSelect={() => setPublishOption('schedule')}
          />
          <RadioRow
            title="Save as Draft"
            description="Save and continue editing later."
            selected={publishOption === 'draft'}
            onSelect={() => setPublishOption('draft')}
          />
        </div>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] p-4">
        <p className="mb-3 text-[16px] font-medium text-[#0F172A]">Visibility</p>
        <div className="flex items-start gap-3">
          <SummaryIcon><Globe className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-[#0F172A]">Public</p>
            <p className="text-[14px] text-[#44516A]">Visible to everyone on Anchor Canada</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-[14px] font-medium text-[#2F66C8]"
        >
          Change
        </button>
      </div>

      <div>
        <p className="mb-4 text-[16px] font-medium text-[#0F172A]">Notification Settings</p>
        <div className="space-y-4">
          <ToggleRow
            label="Notify followers"
            description="Send email to followers of your organization."
            checked={notifyFollowers}
            onChange={setNotifyFollowers}
          />
          <ToggleRow
            label="Notify team members"
            description="Send notification to team members."
            checked={notifyTeam}
            onChange={setNotifyTeam}
          />
          <ToggleRow
            label="Share to organization feed"
            description="Post to organization activity feed."
            checked={shareToFeed}
            onChange={setShareToFeed}
          />
        </div>
      </div>
    </div>
  );
}

export function ReviewAccordionCard({
  step,
  title,
  defaultOpen = false,
  trailing,
  children,
}: {
  step: number;
  title: string;
  defaultOpen?: boolean;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <SectionHeader
        step={step}
        title={title}
        expanded={open}
        onToggle={() => setOpen((v) => !v)}
        trailing={trailing}
      />
      {open ? children : null}
    </div>
  );
}

export function ReviewDesktopLayout(props: ReturnType<typeof useReviewPublish>) {
  const {
    publishError,
    title,
    opportunityType,
    categoryLabel,
    templateLabel,
    locationLabel,
    requirementFields,
    details,
    workflowType,
    internalWorkflow,
    externalWorkflow,
    validationItems,
    warnings,
    suggestions,
    errors,
    allGood,
    publishOption,
    setPublishOption,
    notifyFollowers,
    setNotifyFollowers,
    notifyTeam,
    setNotifyTeam,
    shareToFeed,
    setShareToFeed,
  } = props;

  return (
    <>
      <ReviewPageHeading />
      {publishError ? (
        <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {publishError}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[600px_1fr]">
        <div className="space-y-0 overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <SectionHeader step={1} title="Opportunity Summary" />
          <div className="px-5 pb-5">
            <OpportunitySummaryBody
              title={title}
              opportunityType={opportunityType}
              categoryLabel={categoryLabel}
              templateLabel={templateLabel}
              details={details}
              locationLabel={locationLabel}
            />
          </div>
          <SectionHeader step={2} title="Requirement Summary" />
          <RequirementSummaryBody requirementFields={requirementFields} />
          <SectionHeader step={3} title="Workflow Summary" />
          <WorkflowSummaryBody
            workflowType={workflowType}
            internalWorkflow={internalWorkflow}
            externalWorkflow={externalWorkflow}
          />
        </div>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
            <SectionHeader
              step={4}
              title="Validation Center"
              trailing={
                allGood ? (
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#15803D]">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </span>
                ) : null
              }
            />
            <ValidationCenterBody
              validationItems={validationItems}
              warnings={warnings}
              suggestions={suggestions}
              errors={errors}
              allGood={allGood}
            />
          </div>

          <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
            <div className="border-b border-[#EEF2F8] px-5 py-4">
              <p className="text-[16px] font-medium text-[#0F172A]">Publish Settings</p>
            </div>
            <PublishSettingsBody
              publishOption={publishOption}
              setPublishOption={setPublishOption}
              notifyFollowers={notifyFollowers}
              setNotifyFollowers={setNotifyFollowers}
              notifyTeam={notifyTeam}
              setNotifyTeam={setNotifyTeam}
              shareToFeed={shareToFeed}
              setShareToFeed={setShareToFeed}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function ReviewMobileLayout(props: ReturnType<typeof useReviewPublish>) {
  const {
    publishError,
    title,
    opportunityType,
    categoryLabel,
    templateLabel,
    locationLabel,
    requirementFields,
    details,
    workflowType,
    internalWorkflow,
    externalWorkflow,
    validationItems,
    warnings,
    suggestions,
    errors,
    allGood,
    publishOption,
    setPublishOption,
    notifyFollowers,
    setNotifyFollowers,
    notifyTeam,
    setNotifyTeam,
    shareToFeed,
    setShareToFeed,
  } = props;

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col gap-5">
      <ReviewPageHeading />
      {publishError ? (
        <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {publishError}
        </div>
      ) : null}

      <ReviewAccordionCard step={1} title="Opportunity Summary">
        <div className="px-5 pb-5">
          <OpportunitySummaryBody
            title={title}
            opportunityType={opportunityType}
            categoryLabel={categoryLabel}
            templateLabel={templateLabel}
            details={details}
            locationLabel={locationLabel}
          />
        </div>
      </ReviewAccordionCard>

      <ReviewAccordionCard step={2} title="Requirement Summary">
        <RequirementSummaryBody requirementFields={requirementFields} />
      </ReviewAccordionCard>

      <ReviewAccordionCard step={3} title="Workflow Summary">
        <WorkflowSummaryBody
          workflowType={workflowType}
          internalWorkflow={internalWorkflow}
          externalWorkflow={externalWorkflow}
        />
      </ReviewAccordionCard>

      <ReviewAccordionCard
        step={4}
        title="Validation Center"
        defaultOpen
        trailing={
          allGood ? (
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#15803D]">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
          ) : null
        }
      >
        <ValidationCenterBody
          validationItems={validationItems}
          warnings={warnings}
          suggestions={suggestions}
          errors={errors}
          allGood={allGood}
        />
      </ReviewAccordionCard>

      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="border-b border-[#EEF2F8] px-5 py-4">
          <p className="text-[16px] font-medium text-[#0F172A]">Publish Settings</p>
        </div>
        <PublishSettingsBody
          publishOption={publishOption}
          setPublishOption={setPublishOption}
          notifyFollowers={notifyFollowers}
          setNotifyFollowers={setNotifyFollowers}
          notifyTeam={notifyTeam}
          setNotifyTeam={setNotifyTeam}
          shareToFeed={shareToFeed}
          setShareToFeed={setShareToFeed}
        />
      </div>
    </div>
  );
}

export function ReviewPageShell({
  variant,
  review,
}: {
  variant: 'desktop' | 'mobile';
  review: ReturnType<typeof useReviewPublish>;
}) {
  const { workflowBackHref, handlePublish, handleSaveDraft, isPublishing } = review;

  return (
    <BuilderPageShell
      step={6}
      backHref={workflowBackHref}
      onContinue={handlePublish}
      continueDisabled={isPublishing}
      continueLabel={isPublishing ? 'Publishing…' : 'Publish Opportunity'}
      headerVariant="review"
      secondaryAction={{
        label: isPublishing ? 'Saving…' : 'Save Draft',
        onClick: handleSaveDraft,
        disabled: isPublishing,
      }}
    >
      {variant === 'desktop' ? <ReviewDesktopLayout {...review} /> : <ReviewMobileLayout {...review} />}
    </BuilderPageShell>
  );
}
