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
  Globe,
  GraduationCap,
  House,
  Info,
  Layers,
  MapPin,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';

import { BuilderPageShell, RadioRow } from '@/features/opportunity-builder/components/BuilderPageShell';
import { DraftSavedSuccessModal } from '@/features/opportunity-builder/components/DraftSavedSuccessModal';
import { OpportunityPublishedModal } from '@/features/opportunity-builder/components/OpportunityPublishedModal';
import { PublishConfirmModal } from '@/features/opportunity-builder/components/PublishConfirmModal';
import { PublishIssuesModal } from '@/features/opportunity-builder/components/PublishIssuesModal';
import { SchedulePublishModal } from '@/features/opportunity-builder/components/SchedulePublishModal';
import { BuilderMenuSelect } from '@/features/opportunity-builder/components/BuilderMenuSelect';
import {
  BUILDER_PAGE_COPY,
  BUILDER_STEP_ROUTES,
  OPPORTUNITY_TYPES,
} from '@/features/opportunity-builder/lib/builderData';
import {
  findCategoryGroup,
  useBuilderCategoryGroups,
} from '@/features/opportunity-builder/hooks/useBuilderCategoryGroups';
import {
  getCategoryConfigSchema,
  getConfigStatusLabel,
  getConfigSummaryLines,
  isCategoryConfigComplete,
} from '@/features/opportunity-builder/lib/categoryConfigData';
import { VISIBILITY_OPTIONS } from '@/features/opportunity-builder/lib/detailsData';
import { providerApi } from '@/features/provider/services/providerApi';
import { getApiErrorMessage } from '@/lib/apiError';
import { cn } from '@/lib/utils';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';
import { useOrgBrandingStore } from '@/store/orgBrandingStore';

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

function daysUntil(iso: string | undefined, nowMs: number) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const diff = Math.ceil((d.getTime() - nowMs) / (1000 * 60 * 60 * 24));
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
  const orgBranding = useOrgBrandingStore();
  const {
    opportunityType,
    category,
    template,
    requirementFields,
    documentRequirements,
    categoryConfig,
    details,
    workflowType,
    internalWorkflow,
    externalWorkflow,
    expressInterestWorkflow,
    resetBuilder,
    setDetails,
  } = store;

  const [publishError, setPublishError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishOption, setPublishOptionState] = useState<PublishOption>('now');
  const [draftSavedOpen, setDraftSavedOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('10:00');
  const [visibilityEditing, setVisibilityEditing] = useState(false);
  const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
  const [publishedOpen, setPublishedOpen] = useState(false);
  const [issuesOpen, setIssuesOpen] = useState(false);
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [nowMs] = useState(() => Date.now());

  const typeLabel = OPPORTUNITY_TYPES.find((t) => t.id === opportunityType)?.title ?? 'Not selected';
  const { groups } = useBuilderCategoryGroups();
  const categoryGroup = findCategoryGroup(groups, category);
  const categoryLabel = categoryGroup?.title ?? category ?? 'Not selected';
  const title = details.title?.trim() || 'Untitled Opportunity';
  const configBackHref = BUILDER_STEP_ROUTES[4];
  const configSchema = getCategoryConfigSchema(categoryGroup?.id ?? null);
  const configComplete = isCategoryConfigComplete(configSchema, categoryConfig);
  const configSummaryLines = useMemo(
    () => getConfigSummaryLines(configSchema, categoryConfig),
    [configSchema, categoryConfig],
  );
  const enabledDocCount = (Array.isArray(documentRequirements) ? documentRequirements : []).filter(
    (d) => d.enabled,
  ).length;

  const locationLabel = [details.city, details.province, details.country].filter(Boolean).join(', ') || 'Canada (Nationwide)';

  const validationItems: ReviewValidationItem[] = useMemo(
    () => [
      {
        label: 'Opportunity Title',
        value: details.title?.trim() ? title : 'Missing',
        ok: Boolean(details.title?.trim()),
      },
      { label: 'Category', value: categoryLabel, ok: Boolean(category) },
      {
        label: 'Requirements',
        value: `${enabledDocCount} requirements added`,
        ok: enabledDocCount > 0,
      },
      {
        label: 'Details',
        value: Boolean(details.title && details.deadlineDate)
          ? 'All required information added'
          : 'Missing details',
        ok: Boolean(details.title && details.deadlineDate),
      },
      {
        label: 'Config',
        value: getConfigStatusLabel(configSchema, categoryConfig),
        ok: configComplete,
      },
    ],
    [
      category,
      categoryConfig,
      categoryLabel,
      configComplete,
      configSchema,
      details.deadlineDate,
      details.title,
      enabledDocCount,
      title,
    ],
  );

  const errors: ReviewError[] = useMemo(() => {
    const list: ReviewError[] = [];
    if (!configComplete) {
      list.push({
        id: 'config-missing',
        message: 'Opportunity configuration is incomplete. Complete the Config step before publishing.',
        href: BUILDER_STEP_ROUTES[4],
      });
    }
    if (!details.title?.trim()) {
      list.push({
        id: 'title-missing',
        message: 'Opportunity title is required.',
        href: BUILDER_STEP_ROUTES[3],
      });
    }
    return list;
  }, [configComplete, details.title]);

  const warnings: ReviewWarning[] = useMemo(() => {
    const days = daysUntil(details.deadlineDate, nowMs);
    if (days != null && days > 0 && days <= 60) {
      return [
        {
          id: 'deadline',
          message: `Deadline is within ${days} days. Consider extending to allow more time for applicants.`,
          href: BUILDER_STEP_ROUTES[3],
        },
      ];
    }
    return [];
  }, [details.deadlineDate, nowMs]);

  const suggestions: ReviewWarning[] = useMemo(() => {
    const wordCount = (details.description ?? details.summary ?? '').trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 150) {
      return [
        {
          id: 'description',
          message: 'Description could be more detailed. We recommend at least 150 words for better visibility.',
          href: BUILDER_STEP_ROUTES[3],
        },
      ];
    }
    return [];
  }, [details.description, details.summary]);

  const publishIssues = useMemo(() => {
    const issues: { id: string; message: string; href: string }[] = [];

    const deadline = details.deadlineDate ? new Date(details.deadlineDate) : null;
    if (deadline && !Number.isNaN(deadline.getTime()) && deadline.getTime() < nowMs) {
      issues.push({
        id: 'deadline-past',
        message: 'Application deadline is in the past',
        href: BUILDER_STEP_ROUTES[3],
      });
    }

    if (opportunityType === 'external') {
      const url = externalWorkflow.applicationUrl?.trim() ?? '';
      if (!/^https?:\/\/.+\..+/.test(url)) {
        issues.push({
          id: 'missing-url',
          message: 'Missing application URL',
          href: BUILDER_STEP_ROUTES[2],
        });
      }
    }

    if (!configComplete) {
      issues.push({
        id: 'config-incomplete',
        message: 'Config is incomplete.',
        href: BUILDER_STEP_ROUTES[4],
      });
    }

    if (!details.title?.trim()) {
      issues.push({
        id: 'title-missing',
        message: 'Opportunity title is required.',
        href: BUILDER_STEP_ROUTES[3],
      });
    }

    if (enabledDocCount === 0) {
      issues.push({
        id: 'requirements-empty',
        message: 'No requirements have been added.',
        href: BUILDER_STEP_ROUTES[2],
      });
    }

    if (!opportunityType) {
      issues.push({
        id: 'type-missing',
        message: 'Opportunity type is required.',
        href: BUILDER_STEP_ROUTES[0],
      });
    }

    return issues;
  }, [
    configComplete,
    details.deadlineDate,
    details.title,
    enabledDocCount,
    externalWorkflow.applicationUrl,
    nowMs,
    opportunityType,
  ]);

  const hasErrors = publishIssues.length > 0 || errors.length > 0;
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
        categoryConfig,
        details,
        workflowType,
        internalWorkflow,
        externalWorkflow,
        expressInterestWorkflow,
        publishOption,
        scheduleDate,
        scheduleTime,
      },
      publish,
    }),
    [
      category,
      categoryConfig,
      details,
      expressInterestWorkflow,
      externalWorkflow,
      internalWorkflow,
      locationLabel,
      opportunityType,
      publishOption,
      requirementFields,
      scheduleDate,
      scheduleTime,
      template,
      title,
      workflowType,
    ],
  );

  const executePublish = useCallback(async () => {
    if (publishIssues.length > 0) {
      setPublishConfirmOpen(false);
      setIssuesOpen(true);
      return;
    }

    setPublishError('');
    setIsPublishing(true);
    try {
      const result = (await providerApi.publishOpportunity(buildPayload(true))) as {
        id?: string;
      };
      setPublishedId(result?.id ?? null);
      setPublishConfirmOpen(false);
      setIsPublishing(false);
      setPublishedOpen(true);
    } catch (err) {
      setPublishConfirmOpen(false);
      setPublishError(
        getApiErrorMessage(
          err,
          'Could not submit opportunity for review. Make sure you are signed in and the backend is running.',
        ),
      );
      setIsPublishing(false);
    }
  }, [buildPayload, publishIssues.length]);

  const handlePublish = useCallback(async () => {
    if (publishOption === 'draft') {
      if (!opportunityType) {
        setPublishError('Select an opportunity type before saving.');
        return;
      }
      setPublishError('');
      setIsPublishing(true);
      try {
        await providerApi.publishOpportunity(buildPayload(false));
        setIsPublishing(false);
        setDraftSavedOpen(true);
      } catch (err) {
        setPublishError(getApiErrorMessage(err, 'Could not save draft.'));
        setIsPublishing(false);
      }
      return;
    }

    if (publishOption === 'schedule' && !scheduleDate) {
      setScheduleOpen(true);
      return;
    }

    // Publish Now always opens Ready to Publish first, then success after confirm.
    if (publishOption === 'now') {
      setPublishConfirmOpen(true);
      return;
    }

    // Scheduled publish: validate, then go live.
    await executePublish();
  }, [
    buildPayload,
    executePublish,
    opportunityType,
    publishOption,
    scheduleDate,
  ]);

  const handleSaveDraft = useCallback(async () => {
    if (!opportunityType) {
      setPublishError('Select an opportunity type before saving.');
      return;
    }
    setPublishError('');
    setIsPublishing(true);
    try {
      await providerApi.publishOpportunity(buildPayload(false));
      setIsPublishing(false);
      setDraftSavedOpen(true);
    } catch (err) {
      setPublishError(getApiErrorMessage(err, 'Could not save draft.'));
      setIsPublishing(false);
    }
  }, [buildPayload, opportunityType]);

  const handleSelectPublishOption = useCallback((option: PublishOption) => {
    setPublishOptionState(option);
    if (option === 'schedule') {
      setScheduleOpen(true);
    }
  }, []);

  const confirmSchedule = useCallback((payload: { date: string; time: string }) => {
    setScheduleDate(payload.date);
    setScheduleTime(payload.time);
    setPublishOptionState('schedule');
    setScheduleOpen(false);
  }, []);

  const cancelSchedule = useCallback(() => {
    setScheduleOpen(false);
    if (!scheduleDate) setPublishOptionState('now');
  }, [scheduleDate]);

  const handleGoToIssues = useCallback(() => {
    setIssuesOpen(false);
    const first = publishIssues[0];
    if (first?.href) router.push(first.href);
  }, [publishIssues, router]);

  const handleCreateAnother = useCallback(() => {
    setPublishedOpen(false);
    resetBuilder();
    router.push('/opportunities/create/type');
  }, [resetBuilder, router]);

  const handleViewOpportunity = useCallback(() => {
    setPublishedOpen(false);
    resetBuilder();
    router.push(publishedId ? `/opportunities/${publishedId}` : '/opportunities');
  }, [publishedId, resetBuilder, router]);

  const setVisibility = useCallback(
    (value: string) => {
      setDetails({ visibility: value });
      setVisibilityEditing(false);
    },
    [setDetails],
  );

  const closeDraftSaved = useCallback(() => setDraftSavedOpen(false), []);
  const closePublishConfirm = useCallback(() => setPublishConfirmOpen(false), []);
  const closeIssues = useCallback(() => setIssuesOpen(false), []);
  const closePublishedAndView = useCallback(() => {
    setPublishedOpen(false);
    handleViewOpportunity();
  }, [handleViewOpportunity]);
  const confirmPublish = useCallback(() => {
    void executePublish();
  }, [executePublish]);

  const visibility = details.visibility || 'public';
  const visibilityMeta = VISIBILITY_OPTIONS.find((o) => o.value === visibility) ?? VISIBILITY_OPTIONS[0];
  const visibilityDescription =
    visibility === 'private'
      ? 'Only visible within your organization.'
      : visibility === 'invite-only'
        ? 'Only invited applicants can view this opportunity.'
        : 'Visible to everyone on Anchor Canada.';

  return {
    workflowBackHref: configBackHref,
    handlePublish,
    handleSaveDraft,
    executePublish,
    confirmPublish,
    isPublishing,
    publishError,
    publishOption,
    setPublishOption: handleSelectPublishOption,
    confirmSchedule,
    cancelSchedule,
    draftSavedOpen,
    closeDraftSaved,
    scheduleOpen,
    setScheduleOpen,
    scheduleDate,
    scheduleTime,
    publishConfirmOpen,
    closePublishConfirm,
    publishedOpen,
    closePublishedAndView,
    issuesOpen,
    closeIssues,
    publishIssues,
    handleGoToIssues,
    handleCreateAnother,
    handleViewOpportunity,
    visibility,
    visibilityLabel: visibilityMeta.label,
    visibilityDescription,
    visibilityEditing,
    setVisibilityEditing,
    setVisibility,
    title,
    typeLabel,
    categoryLabel,
    locationLabel,
    requirementFields,
    details,
    categoryConfig,
    configSummaryLines,
    configComplete,
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
      <p className="mt-2.5 text-[16px] text-[#44516A]">{BUILDER_PAGE_COPY.review.subtitle}</p>
    </div>
  );
}

export function OpportunitySummaryBody({
  title,
  opportunityType,
  categoryLabel,
  details,
  locationLabel,
}: {
  title: string;
  opportunityType: string | null;
  categoryLabel: string;
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
      <SummaryRow
        icon={<SummaryIcon><GraduationCap className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Category"
        value={categoryLabel}
      />
      <SummaryRow
        icon={<SummaryIcon><Building2 className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Organization"
        value={details.organization || orgBranding.organizationName || '—'}
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
        icon={<SummaryIcon><MapPin className="h-[18px] w-[18px]" strokeWidth={1.75} /></SummaryIcon>}
        label="Location"
        value={locationLabel}
      />
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
            <span
              className={cn(
                'text-[14px] font-medium',
                req.required ? 'text-[#15803D]' : 'text-[#8C97AD]',
              )}
            >
              {req.required ? 'Required' : 'Optional'}
            </span>
          </div>
        ))}
        <div className="px-4 py-4">
          <Link href={BUILDER_STEP_ROUTES[2]} className="text-[14px] font-medium text-[#2F66C8] hover:underline">
            View all requirements ({requirementFields.length})
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ConfigSummaryBody({
  lines,
}: {
  lines: { label: string; value: string }[];
}) {
  return (
    <div className="space-y-0 px-5 pb-5">
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
        {lines.map((line) => (
          <SummaryRow
            key={line.label}
            icon={
              <SummaryIcon>
                <Layers className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </SummaryIcon>
            }
            label={line.label}
            value={line.value}
          />
        ))}
      </div>
      <Link
        href={BUILDER_STEP_ROUTES[4]}
        className="mt-4 inline-block text-[14px] font-medium text-[#2F66C8] hover:underline"
      >
        Edit configuration
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
  visibilityLabel,
  visibilityDescription,
  visibility,
  visibilityEditing,
  setVisibilityEditing,
  setVisibility,
}: {
  publishOption: PublishOption;
  setPublishOption: (v: PublishOption) => void;
  visibilityLabel: string;
  visibilityDescription: string;
  visibility: string;
  visibilityEditing: boolean;
  setVisibilityEditing: (v: boolean) => void;
  setVisibility: (v: string) => void;
}) {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-5">
        <div className="min-w-0 flex-1">
          <p className="mb-5 text-[14px] font-semibold leading-[1.8] text-[#0F172A]">Publish Option</p>
          <div className="space-y-5">
            <RadioRow
              title="Publish Now"
              description="Make this opportunity live immediately"
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

        <div className="min-w-0 flex-1">
          <p className="mb-5 text-[14px] font-semibold leading-[1.8] text-[#0F172A]">Visibility</p>
          <div className="rounded-[10px] border border-[#EEF2F8] p-4">
            <div className="flex items-start gap-3.5">
              <SummaryIcon>
                <Globe className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </SummaryIcon>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-[#0F172A]">{visibilityLabel}</p>
                <p className="text-[14px] text-[#44516A]">{visibilityDescription}</p>
              </div>
            </div>
            {visibilityEditing ? (
              <div className="mt-5">
                <BuilderMenuSelect
                  value={visibility}
                  onChange={setVisibility}
                  options={VISIBILITY_OPTIONS}
                  aria-label="Visibility"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setVisibilityEditing(true)}
                className="mt-5 flex w-full items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-2.5 py-2 text-[14px] font-medium text-[#2F66C8] hover:bg-[#F8FAFC]"
              >
                Change
              </button>
            )}
          </div>
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
    locationLabel,
    requirementFields,
    details,
    configSummaryLines,
    validationItems,
    warnings,
    suggestions,
    errors,
    allGood,
    publishOption,
    setPublishOption,
    visibility,
    visibilityLabel,
    visibilityDescription,
    visibilityEditing,
    setVisibilityEditing,
    setVisibility,
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
              details={details}
              locationLabel={locationLabel}
            />
          </div>
          <SectionHeader step={2} title="Requirement Summary" />
          <RequirementSummaryBody requirementFields={requirementFields} />
          <SectionHeader step={3} title="Config Summary" />
          <ConfigSummaryBody lines={configSummaryLines} />
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
              visibility={visibility}
              visibilityLabel={visibilityLabel}
              visibilityDescription={visibilityDescription}
              visibilityEditing={visibilityEditing}
              setVisibilityEditing={setVisibilityEditing}
              setVisibility={setVisibility}
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
    locationLabel,
    requirementFields,
    details,
    configSummaryLines,
    validationItems,
    warnings,
    suggestions,
    errors,
    allGood,
    publishOption,
    setPublishOption,
    visibility,
    visibilityLabel,
    visibilityDescription,
    visibilityEditing,
    setVisibilityEditing,
    setVisibility,
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
            details={details}
            locationLabel={locationLabel}
          />
        </div>
      </ReviewAccordionCard>

      <ReviewAccordionCard step={2} title="Requirement Summary">
        <RequirementSummaryBody requirementFields={requirementFields} />
      </ReviewAccordionCard>

      <ReviewAccordionCard step={3} title="Config Summary">
        <ConfigSummaryBody lines={configSummaryLines} />
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
          visibility={visibility}
          visibilityLabel={visibilityLabel}
          visibilityDescription={visibilityDescription}
          visibilityEditing={visibilityEditing}
          setVisibilityEditing={setVisibilityEditing}
          setVisibility={setVisibility}
        />
      </div>
    </div>
  );
}

export function ReviewPageShell({ review }: { review: ReturnType<typeof useReviewPublish> }) {
  const {
    workflowBackHref,
    handlePublish,
    handleSaveDraft,
    confirmPublish,
    isPublishing,
    draftSavedOpen,
    closeDraftSaved,
    scheduleOpen,
    scheduleDate,
    scheduleTime,
    confirmSchedule,
    cancelSchedule,
    publishConfirmOpen,
    closePublishConfirm,
    publishedOpen,
    closePublishedAndView,
    issuesOpen,
    closeIssues,
    publishIssues,
    handleGoToIssues,
    handleCreateAnother,
    handleViewOpportunity,
  } = review;

  const secondaryAction = useMemo(
    () => ({
      label: isPublishing ? 'Saving…' : 'Save Draft',
      onClick: handleSaveDraft,
      disabled: isPublishing,
    }),
    [handleSaveDraft, isPublishing],
  );

  return (
    <BuilderPageShell
      step={5}
      backHref={workflowBackHref}
      onContinue={handlePublish}
      continueDisabled={isPublishing}
      continueLabel={isPublishing ? 'Publishing…' : 'Publish Opportunity'}
      headerVariant="review"
      secondaryAction={secondaryAction}
    >
      <div className="hidden w-full md:block">
        <ReviewDesktopLayout {...review} />
      </div>
      <div className="block w-full md:hidden">
        <ReviewMobileLayout {...review} />
      </div>

      <DraftSavedSuccessModal open={draftSavedOpen} onClose={closeDraftSaved} />

      <SchedulePublishModal
        open={scheduleOpen}
        initialDate={scheduleDate}
        initialTime={scheduleTime}
        onClose={cancelSchedule}
        onSchedule={confirmSchedule}
      />

      <PublishConfirmModal
        open={publishConfirmOpen}
        onClose={closePublishConfirm}
        onConfirm={confirmPublish}
        isPublishing={isPublishing}
      />

      <OpportunityPublishedModal
        open={publishedOpen}
        onClose={closePublishedAndView}
        onCreateAnother={handleCreateAnother}
        onViewOpportunity={handleViewOpportunity}
      />

      <PublishIssuesModal
        open={issuesOpen}
        onClose={closeIssues}
        onGoToIssues={handleGoToIssues}
        issues={publishIssues}
      />
    </BuilderPageShell>
  );
}
