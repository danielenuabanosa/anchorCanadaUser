'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUp,
  Bookmark,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleCheckBig,
  Download,
  Edit,
  ExternalLink,
  Eye,
  FolderOpen,
  Globe,
  MoreHorizontal,
  MousePointerClick,
  Pause,
  Share2,
  SquareX,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DetailPageSkeleton } from '@/shared/components/ui/PageSkeletons';
import {
  DEFAULT_OPPORTUNITY_DETAIL,
  PIPELINE_COLORS,
  STATUS_BADGE_STYLES,
} from './opportunityDetailData';
import { ExportOpportunitiesModal } from '../../_components/OpportunityHubModals';
import type { OpportunityRow } from '../../_components/opportunitiesHubData';
import { useOpportunityDetail } from '@/features/provider/hooks/useOpportunityDetail';
import { providerApi } from '@/features/provider/services/providerApi';

const FUNNEL_WIDTHS = [100, 85, 70, 55, 40];

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  label: string;
  value: string;
  change: string;
  icon: typeof Eye;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="flex h-[158px] flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4">
      <span className={cn('flex h-8 w-8 items-center justify-center rounded-2xl', iconBg)}>
        <Icon className={cn('h-4 w-4', iconColor)} />
      </span>
      <div>
        <p className="text-base leading-4 text-[#44516A]">{label}</p>
        <p className="text-[31px] font-bold leading-[31px] text-[#0F172A]">{value}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded bg-[#ECFDF5] px-1 py-0.5 text-[13px] text-[#15803D]">
            <ArrowUp className="h-2.5 w-2.5" />
            {change}
          </span>
          <span className="text-[13px] text-[#8C97AD]">from last 30 days</span>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  badge,
}: {
  label: string;
  value?: string;
  badge?: { text: string; className: string };
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF2F8] px-4 py-4 last:border-0">
      <p className="text-[14px] font-medium text-[#0F172A]">{label}</p>
      {badge ? (
        <span className={cn('rounded-[4px] border px-2 py-1 text-[14px]', badge.className)}>{badge.text}</span>
      ) : (
        <p className="max-w-[400px] text-right text-[14px] text-[#44516A]">{value}</p>
      )}
    </div>
  );
}

function TimelineStepper({ steps }: { steps: typeof DEFAULT_OPPORTUNITY_DETAIL.timeline }) {
  return (
    <div className="flex items-start px-4 py-5">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-1 items-start">
          <div className="flex flex-col items-center gap-2.5">
            <span
              className={cn(
                'h-5 w-5 shrink-0 rounded-full border-2',
                step.urgent
                  ? 'border-[#B91C1C] bg-[#B91C1C]'
                  : step.active
                    ? 'border-[#2F66C8] bg-[#2F66C8]'
                    : 'border-[#D9E1EF] bg-white',
              )}
            />
            <div className="text-center">
              <p className="text-[14px] font-medium text-[#0F172A]">{step.label}</p>
              <p className={cn('text-[14px]', step.urgent ? 'text-[#B91C1C]' : 'text-[#44516A]')}>{step.date}</p>
            </div>
          </div>
          {i < steps.length - 1 ? <div className="mx-1 mt-2.5 h-0.5 flex-1 bg-[#D9E1EF]" /> : null}
        </div>
      ))}
    </div>
  );
}

function PipelineFunnel({ pipeline }: { pipeline: typeof DEFAULT_OPPORTUNITY_DETAIL.pipeline }) {
  return (
    <div className="flex gap-5">
      <div className="flex w-[253px] shrink-0 flex-col items-center justify-center gap-1 py-2">
        {pipeline.map((stage, i) => (
          <div
            key={stage.label}
            className="h-[38px] transition-all"
            style={{
              width: `${FUNNEL_WIDTHS[i]}%`,
              backgroundColor: PIPELINE_COLORS[i],
              clipPath: 'polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)',
            }}
            title={`${stage.label}: ${stage.count}`}
          />
        ))}
      </div>
      <div className="flex-1 overflow-hidden rounded-[10px] border border-[#EEF2F8]">
        {pipeline.map((stage, i) => (
          <div
            key={stage.label}
            className="flex items-center justify-between border-b border-[#EEF2F8] px-4 py-4 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: PIPELINE_COLORS[i] }} />
              <span className="text-[14px] font-medium text-[#0F172A]">{stage.label}</span>
            </div>
            <span className="text-[14px] text-[#44516A]">{stage.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthRow({
  icon: Icon,
  iconBg,
  label,
  value,
  sub,
  subGreen,
}: {
  icon: typeof CalendarDays;
  iconBg: string;
  label: string;
  value: string;
  sub: string;
  subGreen?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-[#EEF2F8] px-4 py-4 last:border-0">
      <div className="flex flex-1 items-center gap-4">
        <span className={cn('flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[10px]', iconBg)}>
          <Icon className="h-[26px] w-[26px] text-[#44516A]" strokeWidth={1.5} />
        </span>
        <p className="text-[16px] font-medium text-[#0F172A]">{label}</p>
      </div>
      <div className="text-right">
        <p className="text-[16px] font-medium text-[#0F172A]">{value}</p>
        <p className={cn('text-[14px]', subGreen ? 'text-[#15803D]' : 'text-[#44516A]')}>{sub}</p>
      </div>
    </div>
  );
}

function MoreActionsMenu({
  open,
  onClose,
  onExport,
  onPause,
  onUnpause,
  onCloseOpportunity,
  onReopen,
  onDelete,
  isPaused,
  isClosed,
}: {
  open: boolean;
  onClose: () => void;
  onExport: () => void;
  onPause: () => void;
  onUnpause: () => void;
  onCloseOpportunity: () => void;
  onReopen: () => void;
  onDelete: () => void;
  isPaused?: boolean;
  isClosed?: boolean;
}) {
  if (!open) return null;
  const items = [
    ...(isClosed
      ? [{ label: 'Reopen as Draft', icon: FolderOpen, action: 'reopen' as const }]
      : [
          {
            label: isPaused ? 'Unpause Opportunity' : 'Pause Opportunity',
            icon: Pause,
            action: isPaused ? ('unpause' as const) : ('pause' as const),
          },
          { label: 'Close Opportunity', icon: SquareX, action: 'close' as const },
        ]),
    { label: 'Export Opportunity', icon: Download, action: 'export' as const },
    { label: 'View Opportunity', icon: ExternalLink, action: 'view' as const },
    { label: 'Delete Opportunity', icon: Trash2, danger: true, action: 'delete' as const },
  ];
  return (
    <>
      <button type="button" className="fixed inset-0 z-40" onClick={onClose} aria-label="Close menu" />
      <div className="absolute right-0 top-full z-50 mt-1 min-w-[220px] overflow-hidden rounded-[8px] border border-[#EEF2F8] bg-white py-1 shadow-lg">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              if (item.action === 'export') onExport();
              if (item.action === 'pause') onPause();
              if (item.action === 'unpause') onUnpause();
              if (item.action === 'close') onCloseOpportunity();
              if (item.action === 'reopen') onReopen();
              if (item.action === 'delete') onDelete();
              if (item.action === 'view') {
                window.open(`/opportunities/${window.location.pathname.split('/').pop() ?? ''}`, '_blank');
              }
              onClose();
            }}
            className={cn(
              'flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] hover:bg-[#F8FAFC]',
              'danger' in item && item.danger ? 'text-[#B91C1C]' : 'text-[#0F172A]',
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

export function OpportunityDetailView({ variant }: { variant: 'desktop' | 'mobile' }) {
  const params = useParams<{ id: string }>();
  const opportunityId = params?.id ?? '';
  const { data: loaded, loading, error, refetch } = useOpportunityDetail(opportunityId);
  const [moreOpen, setMoreOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [shareNote, setShareNote] = useState('');
  const data = loaded ?? DEFAULT_OPPORTUNITY_DETAIL;
  const isMobile = variant === 'mobile';
  const isPaused = String(data.status).toLowerCase().includes('pause');
  const isClosed = String(data.status).toLowerCase().includes('closed');

  const exportRow: OpportunityRow = {
    id: data.id,
    name: data.title,
    category: data.category,
    type: data.opportunityType.toLowerCase().includes('external')
      ? 'external'
      : data.opportunityType.toLowerCase().includes('express')
        ? 'express-interest'
        : 'internal',
    status: data.status === 'Published' ? 'Active' : data.status === 'Closed' ? 'Closed' : 'Draft',
    applications: Number(String(data.metrics.applications.value).replace(/,/g, '')) || 0,
    applicationsDelta: data.metrics.applications.change,
    views: Number(String(data.metrics.views.value).replace(/,/g, '')) || 0,
    deadline: data.deadline,
    daysLeft: '',
    health:
      Number(String(data.metrics.applications.value).replace(/,/g, '')) >= 20
        ? 'High Engagement'
        : Number(String(data.metrics.applications.value).replace(/,/g, '')) >= 5
          ? 'Moderate Engagement'
          : data.status === 'Published'
            ? 'Low Engagement'
            : '-',
    tab: 'all',
  };

  async function handleClose() {
    if (!opportunityId || actionBusy) return;
    setActionBusy(true);
    try {
      await providerApi.closeOpportunity(opportunityId);
      window.location.href = '/opportunities';
    } catch (err) {
      console.error(err);
      setActionBusy(false);
    }
  }

  async function handleReopen() {
    if (!opportunityId || actionBusy) return;
    setActionBusy(true);
    try {
      await providerApi.reopenOpportunity(opportunityId);
      await refetch();
      window.location.href = `/opportunities/create/details?id=${encodeURIComponent(opportunityId)}`;
    } catch (err) {
      console.error(err);
      setActionBusy(false);
    }
  }

  async function handlePause() {
    if (!opportunityId || actionBusy) return;
    setActionBusy(true);
    try {
      await providerApi.pauseOpportunity(opportunityId);
      await refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setActionBusy(false);
    }
  }

  async function handleUnpause() {
    if (!opportunityId || actionBusy) return;
    setActionBusy(true);
    try {
      await providerApi.unpauseOpportunity(opportunityId);
      await refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setActionBusy(false);
    }
  }

  async function handleDelete() {
    if (!opportunityId || actionBusy) return;
    setActionBusy(true);
    try {
      await providerApi.deleteOpportunity(opportunityId);
      window.location.href = '/opportunities';
    } catch (err) {
      console.error(err);
      setActionBusy(false);
    }
  }

  async function handleShare() {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/opportunities/${opportunityId}`
        : `/opportunities/${opportunityId}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareNote('Link copied');
      window.setTimeout(() => setShareNote(''), 2000);
    } catch {
      setShareNote('Could not copy');
      window.setTimeout(() => setShareNote(''), 2000);
    }
  }

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (error || !loaded) {
    return (
      <div className="flex flex-col gap-4 py-10">
        <p className="text-sm text-red-600">{error || 'Opportunity not found.'}</p>
        <Link href="/opportunities" className="text-sm font-medium text-[#2F66C8]">
          Back to opportunities
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-5', isMobile && 'pb-4')}>
      <div className="flex items-center gap-4">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-[14px] font-medium text-[#2F66C8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="font-serif text-[28px] text-[#0F172A] md:text-[36px] md:leading-[56px]">Opportunity Details</h1>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-5">
            <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ECFDF5] md:h-[120px] md:w-[120px]">
              <Image src={data.logo} alt="" width={80} height={80} className="object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-[4px] border border-[#D1FAE5] bg-[#ECFDF5] px-2 py-0.5 text-[12px] font-medium text-[#15803D]">
                  {data.status}
                </span>
                <span className="rounded-[4px] bg-[#EBF1FE] px-2 py-0.5 text-[12px] text-[#2F66C8]">
                  {data.opportunityType}
                </span>
                <span className="rounded-[4px] bg-[#EEF2F8] px-2 py-0.5 text-[12px] text-[#44516A]">
                  ID: {data.id}
                </span>
              </div>
              <h2 className="mt-2 font-serif text-[28px] leading-tight text-[#0F172A] md:text-[36px]">{data.title}</h2>
              <p className="mt-1 text-[14px] text-[#44516A]">{data.category}</p>
              <p className="mt-2 text-[14px] text-[#8C97AD]">{data.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/opportunities/create/details?id=${opportunityId}`}
              className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] px-4 py-2.5 text-[14px] font-medium text-[#0F172A]"
            >
              <Edit className="h-4 w-4" />
              Edit Opportunity
            </Link>
            <button
              type="button"
              onClick={() => {
                void handleShare();
              }}
              className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] px-4 py-2.5 text-[14px] font-medium text-[#0F172A]"
            >
              <Share2 className="h-4 w-4" />
              {shareNote || 'Share'}
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((o) => !o)}
                className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] px-4 py-2.5 text-[14px] text-[#44516A]"
              >
                <MoreHorizontal className="h-4 w-4" />
                <ChevronDown className="h-4 w-4" />
              </button>
              <MoreActionsMenu
                open={moreOpen}
                onClose={() => setMoreOpen(false)}
                onExport={() => setExportOpen(true)}
                onPause={() => {
                  void handlePause();
                }}
                onUnpause={() => {
                  void handleUnpause();
                }}
                onCloseOpportunity={() => {
                  void handleClose();
                }}
                onReopen={() => {
                  void handleReopen();
                }}
                onDelete={() => {
                  void handleDelete();
                }}
                isPaused={isPaused}
                isClosed={isClosed}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { icon: Building2, label: 'Organization', value: data.organization },
            { icon: CalendarDays, label: 'Created', value: data.created },
            { icon: Globe, label: 'Published', value: data.published },
            { icon: CalendarDays, label: 'Application Deadline', value: data.deadline, urgent: true },
            { icon: Users, label: 'Target Audience', value: data.targetAudience },
          ].map((item) => (
            <div key={item.label} className="rounded-[8px] border border-[#EEF2F8] p-3">
              <item.icon className="mb-2 h-4 w-4 text-[#8C97AD]" />
              <p className="text-[12px] text-[#8C97AD]">{item.label}</p>
              <p className={cn('mt-0.5 truncate text-[14px] font-medium', item.urgent ? 'text-[#B91C1C]' : 'text-[#0F172A]')}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        <MetricCard label="Views" value={data.metrics.views.value} change={data.metrics.views.change} icon={Eye} iconBg="bg-[#ECF2FE]" iconColor="text-[#2F66C8]" />
        <MetricCard label="Saves" value={data.metrics.saves.value} change={data.metrics.saves.change} icon={Bookmark} iconBg="bg-[#EFE8FD]" iconColor="text-[#7C3AED]" />
        <MetricCard label="Applications" value={data.metrics.applications.value} change={data.metrics.applications.change} icon={Users} iconBg="bg-[#EDF9F1]" iconColor="text-[#15803D]" />
        <MetricCard label="Conversion Rate" value={data.metrics.conversion.value} change={data.metrics.conversion.change} icon={TrendingUp} iconBg="bg-[#FFF3E3]" iconColor="text-[#D97706]" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_707px]">
        <div className="space-y-5">
          <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
            <div className="border-b border-[#EEF2F8] p-5">
              <h2 className="text-[16px] font-semibold text-[#0F172A]">Opportunity Details</h2>
              <p className="mt-3 text-[14px] text-[#44516A]">{data.description}</p>
            </div>
            <div className="mx-5 mb-5 overflow-hidden rounded-[10px] border border-[#EEF2F8]">
              <DetailRow label="Benefits" value={data.benefits} />
              <DetailRow label="Eligibility" value={data.eligibility} />
              <DetailRow label="Requirements" value={data.requirements} />
              <TimelineStepper steps={data.timeline} />
              <DetailRow label="Location" value={data.location} />
              <DetailRow
                label="Opportunity Type"
                badge={{
                  text: data.opportunityType,
                  className: 'border-[#D1FAE5] bg-[#ECFDF5] text-[#15803D]',
                }}
              />
              <DetailRow label="Category" value={data.category} />
              <DetailRow label="Template" value={data.template} />
            </div>
            <div className="border-t border-[#EEF2F8] p-4 text-center">
              <button type="button" className="text-[14px] font-medium text-[#2F66C8] hover:underline">
                View Full Details
              </button>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <h2 className="text-[16px] font-semibold text-[#0F172A]">Opportunity Health</h2>
            <div className="mt-4 overflow-hidden rounded-[10px] border border-[#EEF2F8]">
              <HealthRow
                icon={CalendarDays}
                iconBg="bg-[#FFF6E0]"
                label="Days Remaining"
                value={data.health.daysRemaining}
                sub={data.health.daysUntilLabel}
              />
              <HealthRow
                icon={TrendingUp}
                iconBg="bg-[#F1EDFE]"
                label="Application Velocity"
                value={data.health.velocity.value}
                sub={`${data.health.velocity.change} ${data.health.velocity.period}`}
                subGreen
              />
              <HealthRow
                icon={CircleCheckBig}
                iconBg="bg-[#EDF9F1]"
                label="Completion Rate"
                value={data.health.completion.value}
                sub={`${data.health.completion.change} ${data.health.completion.period}`}
                subGreen
              />
              <HealthRow
                icon={MousePointerClick}
                iconBg="bg-[#FFEEF4]"
                label="Engagement Trend"
                value={data.health.trend}
                sub={data.health.trendSubtext}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
            <div className="border-b border-[#EEF2F8] p-5">
              <h2 className="text-[16px] font-semibold text-[#0F172A]">Application Pipeline</h2>
              <div className="mt-5">
                <PipelineFunnel pipeline={data.pipeline} />
              </div>
            </div>
            <div className="p-4 text-center">
              <Link href="/applications" className="text-[14px] font-medium text-[#2F66C8] hover:underline">
                View All Applicants
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
            <div className="border-b border-[#EEF2F8] px-5 py-4">
              <h2 className="text-[16px] font-semibold text-[#0F172A]">Recent Applicants</h2>
            </div>
            <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[1.2fr_110px_100px_70px_40px] md:gap-2">
              {['Applicant', 'Applied On', 'Status', 'Score', ''].map((col) => (
                <p key={col || 'actions'} className="py-3 text-[14px] font-medium text-[#0F172A]">
                  {col}
                </p>
              ))}
            </div>
            <div className="divide-y divide-[#EEF2F8]">
              {data.recentApplicants.map((a) => (
                <Link
                  key={a.id}
                  href={`/applications/${a.id}`}
                  className="grid grid-cols-1 gap-2 px-5 py-4 md:grid-cols-[1.2fr_110px_100px_70px_40px] md:items-center md:gap-2"
                >
                  <div className="flex items-center gap-3">
                    <Image src={a.avatar} alt="" width={36} height={36} className="rounded-full object-cover" />
                    <p className="text-[14px] font-medium text-[#0F172A]">{a.name}</p>
                  </div>
                  <p className="text-[14px] text-[#44516A]">{a.applied}</p>
                  <span className={cn('w-fit rounded-[4px] px-1.5 py-0.5 text-xs font-medium', STATUS_BADGE_STYLES[a.status])}>
                    {a.status}
                  </span>
                  <p className="text-[14px] text-[#44516A]">{a.score}</p>
                  <MoreHorizontal className="hidden h-4 w-4 text-[#8C97AD] md:block" />
                </Link>
              ))}
            </div>
            <div className="border-t border-[#EEF2F8] p-4 text-center">
              <Link href="/applications" className="text-[14px] font-medium text-[#2F66C8] hover:underline">
                View All Applicants ({data.metrics.applications.value})
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ExportOpportunitiesModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        rows={[exportRow]}
        title="Export Opportunity"
        filename={`${data.title.toLowerCase().replace(/\s+/g, '-')}-opportunity`}
      />
    </div>
  );
}
