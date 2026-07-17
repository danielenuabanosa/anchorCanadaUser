'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Ellipsis,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubFilterBar } from '@/shared/components/hub/HubFilterBar';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { useProviderApplications } from '@/features/provider/hooks/useProviderHubData';
import {
  APPLICATION_STATS,
  APPLICATION_TABS,
  APP_OPPORTUNITY_FILTER_OPTIONS,
  APP_REVIEWER_FILTER_OPTIONS,
  APP_STATUS_FILTER_OPTIONS,
  APP_TIME_FILTER_OPTIONS,
  APP_TYPE_FILTER_OPTIONS,
  DEFAULT_APP_HUB_FILTERS,
  EMPTY_APPLICATION_TABS,
  OPPORTUNITY_TYPE_STYLES,
  STATUS_STYLES,
  filterApplicants,
  filterByApplicationHubFilters,
  sortApplicants,
  type ApplicationHubFilters,
  type ApplicationTab,
} from './applicationsHubData';
import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import {
  AddNoteModal,
  ArchiveApplicationModal,
  AssignReviewerModal,
  ExportApplicationsModal,
  ExportGeneratedSuccessModal,
  MarkInterviewCompletedModal,
  RejectApplicationModal,
  ReopenApplicationModal,
  ReviewerAssignedSuccessModal,
  RowActionsMenu,
  ScheduleInterviewModal,
  SendOfferModal,
  ShortlistApplicationModal,
} from './ApplicationHubModals';
import { hubActionModalForLabel, type HubActionModalType } from './ApplicationActionsDropdown';
import {
  ApplicationBulkActionBar,
  ApplicationsEmptyState,
  ApplicationsNoMatchState,
  ApplicationsTableSkeleton,
} from './ApplicationHubStates';

const PAGE_SIZE = 10;

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>('all');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<ApplicationHubFilters>(DEFAULT_APP_HUB_FILTERS);
  const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportSuccessOpen, setExportSuccessOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState<{ open: boolean; reviewerName: string }>({
    open: false,
    reviewerName: 'Michael Adams',
  });
  const [menuRowId, setMenuRowId] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{
    type: HubActionModalType;
    applicantName: string;
  } | null>(null);
  const router = useRouter();
  const { rows: applicants, loading, error } = useProviderApplications();

  const filtered = useMemo(() => {
    const byTab = filterApplicants(applicants, activeTab);
    const byFilters = filterByApplicationHubFilters(byTab, filters);
    const searched = !search.trim()
      ? byFilters
      : byFilters.filter((a) => {
          const q = search.toLowerCase();
          return (
            a.applicant.toLowerCase().includes(q) ||
            a.opportunity.toLowerCase().includes(q) ||
            a.email.toLowerCase().includes(q) ||
            a.location.toLowerCase().includes(q)
          );
        });
    return sortApplicants(searched, sort);
  }, [activeTab, search, applicants, filters, sort]);

  const isEmptySource = !loading && applicants.length === 0;
  const isNoMatch = !loading && applicants.length > 0 && filtered.length === 0;
  const tabs = isEmptySource ? EMPTY_APPLICATION_TABS : APPLICATION_TABS;
  const stats = isEmptySource
    ? APPLICATION_STATS.map((stat) => ({
        ...stat,
        value: 0,
        change: undefined,
        subtext: 'As of 24h ago',
      }))
    : APPLICATION_STATS;

  function setFilter<K extends keyof ApplicationHubFilters>(key: K, value: ApplicationHubFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === pageRows.length && pageRows.length > 0) {
      setSelected(new Set());
    } else {
      setSelected(new Set(pageRows.map((r) => r.id)));
    }
  }

  const firstSelectedName =
    applicants.find((a) => selected.has(a.id))?.applicant ?? 'Applicant';

  return (
    <div className="flex flex-col gap-5">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Application Management</h1>
          <p className="text-base text-[#44516A]">
            Review, evaluate and manage applicants across all opportunities.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExportOpen(true)}
          className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
        >
          <Download className="h-[18px] w-[18px]" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[158px] animate-pulse rounded-[8px] border border-[#EEF2F8] bg-white p-4"
              >
                <div className="h-8 w-8 rounded-2xl bg-[#EEF2F8]" />
                <div className="mt-8 space-y-3">
                  <div className="h-3 w-24 rounded bg-[#EEF2F8]" />
                  <div className="h-7 w-16 rounded bg-[#EEF2F8]" />
                  <div className="h-3 w-20 rounded bg-[#EEF2F8]" />
                </div>
              </div>
            ))
          : stats.map((stat) => <HubStatCard key={stat.label} {...stat} />)}
      </div>

      <HubFilterBar
        searchPlaceholder="Search applicants..."
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onClear={() => {
          setFilters(DEFAULT_APP_HUB_FILTERS);
          setSearch('');
          setPage(1);
        }}
        filterMenus={[
          {
            id: 'opportunity',
            label: 'All Opportunities',
            value: filters.opportunity,
            options: [...APP_OPPORTUNITY_FILTER_OPTIONS],
            onChange: (value) => setFilter('opportunity', value),
          },
          {
            id: 'status',
            label: 'All Statuses',
            value: filters.status,
            options: [...APP_STATUS_FILTER_OPTIONS],
            onChange: (value) => setFilter('status', value),
          },
          {
            id: 'type',
            label: 'All Types',
            value: filters.type,
            options: [...APP_TYPE_FILTER_OPTIONS],
            onChange: (value) => setFilter('type', value),
          },
          {
            id: 'reviewer',
            label: 'All Reviewers',
            value: filters.reviewer,
            options: [...APP_REVIEWER_FILTER_OPTIONS],
            onChange: (value) => setFilter('reviewer', value),
          },
          {
            id: 'time',
            label: 'All Time',
            value: filters.time,
            options: [...APP_TIME_FILTER_OPTIONS],
            onChange: (value) => setFilter('time', value),
          },
        ]}
      />

      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex h-[52px] gap-2.5 overflow-x-auto border-b border-[#EEF2F8] px-2.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setPage(1);
              }}
              className={cn(
                'shrink-0 px-2.5 py-3.5 text-sm',
                activeTab === tab.id
                  ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                  : 'font-normal text-[#0F172A]',
              )}
            >
              {tab.label} ({tab.count.toLocaleString()})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF2F8] px-5 py-2.5">
          {selected.size > 0 ? (
            <ApplicationBulkActionBar
              count={selected.size}
              onClear={() => setSelected(new Set())}
              onShortlist={() => setActionModal({ type: 'shortlist', applicantName: firstSelectedName })}
              onReject={() => setActionModal({ type: 'reject', applicantName: firstSelectedName })}
              onAssignReviewer={() => setAssignOpen(true)}
              onExport={() => setExportOpen(true)}
            />
          ) : (
            <div className="flex items-center gap-3.5">
              <input
                type="checkbox"
                checked={pageRows.length > 0 && selected.size === pageRows.length}
                onChange={toggleAll}
                disabled={pageRows.length === 0}
                className="h-[18px] w-[18px] rounded border-[#D9E1EF] bg-[#EEF2F8] text-[#2F66C8]"
              />
              <p className="text-sm text-[#8C97AD]">0 selected</p>
            </div>
          )}
          <HubSortSelect value={sort} onChange={setSort} />
        </div>

        {!loading && !isEmptySource && !isNoMatch ? (
          <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[40px_1fr_1fr_200px_140px_1fr_100px] md:gap-2.5">
            <div className="flex items-center py-3.5" aria-hidden>
              <span className="h-[18px] w-[18px]" />
            </div>
            {['Applicant', 'Opportunity', 'Date Applied', 'Status', 'Reviewer', 'Actions'].map((col) => (
              <p key={col} className="py-3.5 text-sm font-medium text-[#0F172A]">
                {col}
              </p>
            ))}
          </div>
        ) : null}

        {loading ? (
          <ApplicationsTableSkeleton />
        ) : isEmptySource ? (
          <ApplicationsEmptyState />
        ) : isNoMatch ? (
          <ApplicationsNoMatchState />
        ) : (
          <div className="p-5">
            {pageRows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-1 gap-3 border-b border-[#EEF2F8] py-0 last:border-b-0 md:grid-cols-[40px_1fr_1fr_200px_140px_1fr_100px] md:items-center md:gap-2.5 md:py-0"
              >
                <div className="flex h-[60px] items-center">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="h-[18px] w-[18px] rounded border-[#D9E1EF] bg-[#EEF2F8] text-[#2F66C8]"
                  />
                </div>
                <div className="flex h-[60px] items-center gap-2.5">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={row.avatar} alt="" width={40} height={40} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-[#0F172A]">{row.applicant}</p>
                    <p className="truncate text-xs text-[#8C97AD]">{row.location}</p>
                  </div>
                </div>
                <div className="flex h-[60px] min-w-0 flex-col justify-center">
                  <p className="truncate text-sm text-[#0F172A]">{row.opportunity}</p>
                  <span
                    className={cn(
                      'mt-1 inline-flex w-fit rounded-[2px] border px-1 py-0.5 text-xs',
                      OPPORTUNITY_TYPE_STYLES[row.opportunityType],
                    )}
                  >
                    {row.opportunityType}
                  </span>
                </div>
                <div className="flex h-[60px] flex-col justify-center">
                  <p className="text-sm text-[#0F172A]">{row.appliedAt}</p>
                  {row.appliedTime ? <p className="text-xs text-[#8C97AD]">{row.appliedTime}</p> : null}
                </div>
                <div className="flex h-[60px] items-center">
                  <span
                    className={cn(
                      'inline-flex w-fit rounded-[4px] px-1.5 py-0.5 text-sm font-medium',
                      STATUS_STYLES[row.status],
                    )}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="flex h-[60px] items-center gap-2">
                  {row.reviewerAvatar ? (
                    <Image
                      src={row.reviewerAvatar}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : null}
                  <p className="truncate text-sm font-medium text-[#0F172A]">{row.reviewer ?? '—'}</p>
                </div>
                <div
                  className={cn(
                    'relative flex h-[60px] items-center',
                    menuRowId === row.id && 'z-50',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setMenuRowId(menuRowId === row.id ? null : row.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white p-1.5 text-[#44516A]"
                    aria-label="Applicant actions"
                    aria-expanded={menuRowId === row.id}
                  >
                    <Ellipsis className="h-[18px] w-[18px]" />
                  </button>
                  <RowActionsMenu
                    open={menuRowId === row.id}
                    onClose={() => setMenuRowId(null)}
                    stage={row.status}
                    onView={() => {
                      setMenuRowId(null);
                      router.push(`/applications/${row.id}`);
                    }}
                    onAssignReviewer={() => {
                      setMenuRowId(null);
                      setSelected(new Set([row.id]));
                      setAssignOpen(true);
                    }}
                    onAction={(label) => {
                      setMenuRowId(null);
                      const next = hubActionModalForLabel(label, row.applicant);
                      if (next) setActionModal(next);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F8] px-5 py-5">
          <p className="text-sm text-[#44516A]">
            {filtered.length === 0
              ? 'Showing 1 of 0 results'
              : `Showing ${(page - 1) * PAGE_SIZE + 1} to ${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length.toLocaleString()} results`}
          </p>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].filter((n) => n <= totalPages).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  'flex h-[34px] min-w-[34px] items-center justify-center rounded-[6px] px-2.5 text-sm font-medium',
                  page === n ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] bg-white text-[#44516A]',
                )}
              >
                {n}
              </button>
            ))}
            {totalPages > 4 ? <span className="text-sm text-[#8C97AD]">•••</span> : null}
            {totalPages > 3 ? (
              <button
                type="button"
                onClick={() => setPage(totalPages)}
                className={cn(
                  'flex h-[34px] min-w-[34px] items-center justify-center rounded-[6px] px-2.5 text-sm font-medium',
                  page === totalPages ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] bg-white text-[#44516A]',
                )}
              >
                {totalPages}
              </button>
            ) : null}
            <button
              type="button"
              disabled={page >= totalPages || filtered.length === 0}
              onClick={() => setPage((p) => p + 1)}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-[#44516A]">
            Rows per page
            <button
              type="button"
              className="inline-flex h-[34px] items-center gap-1 rounded-[6px] border border-[#D9E1EF] px-3"
            >
              {isEmptySource ? 1 : PAGE_SIZE}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <ExportApplicationsModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        onGenerated={() => setExportSuccessOpen(true)}
      />
      <ExportGeneratedSuccessModal open={exportSuccessOpen} onClose={() => setExportSuccessOpen(false)} />
      <AssignReviewerModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        onAssigned={(reviewerName) => setAssignSuccess({ open: true, reviewerName })}
      />
      <ReviewerAssignedSuccessModal
        open={assignSuccess.open}
        reviewerName={assignSuccess.reviewerName}
        onClose={() => setAssignSuccess((s) => ({ ...s, open: false }))}
      />
      <ShortlistApplicationModal
        open={actionModal?.type === 'shortlist'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <RejectApplicationModal
        open={actionModal?.type === 'reject'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <ScheduleInterviewModal
        open={actionModal?.type === 'interview' || actionModal?.type === 'reschedule'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        mode={actionModal?.type === 'reschedule' ? 'reschedule' : 'schedule'}
      />
      <MarkInterviewCompletedModal
        open={actionModal?.type === 'complete'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <SendOfferModal
        open={actionModal?.type === 'offer'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <ArchiveApplicationModal
        open={actionModal?.type === 'archive'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <ReopenApplicationModal
        open={actionModal?.type === 'reopen'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <AddNoteModal
        open={actionModal?.type === 'note'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
    </div>
  );
}
