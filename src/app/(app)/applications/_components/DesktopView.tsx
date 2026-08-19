'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/shared/components/ui/Avatar';
import { photoSrc } from '@/shared/lib/photoSrc';
import { Download, Ellipsis } from 'lucide-react';
import { usePagination } from '@/lib/pagination';
import { cn } from '@/lib/utils';
import { HubFilterBar } from '@/shared/components/hub/HubFilterBar';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { useProviderApplications } from '@/features/provider/hooks/useProviderHubData';
import { useProviderTeam } from '@/features/provider/hooks/useProviderTeam';
import {
  buildApplicationHubStats,
  buildApplicationTabCounts,
} from '@/features/provider/lib/hubStats';
import { applicationStatusFromHubAction } from '@/features/provider/lib/mapApplicationDetail';
import { applicationRowFieldsFromApiStatus } from '@/features/provider/lib/mapHubData';
import { downloadApplicationSubmission } from '@/features/provider/lib/downloadSubmission';
import { providerApi } from '@/features/provider/services/providerApi';
import {
  APPLICATION_TABS,
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
import { useOpportunityHubSearch } from '@/app/(app)/opportunities/_components/useOpportunityHubSearch';
import {
  AddNoteModal,
  ArchiveApplicationModal,
  AssignReviewerModal,
  ExportApplicationsModal,
  ExportGeneratedSuccessModal,
  MarkInterviewCompletedModal,
  RejectApplicationModal,
  ReopenApplicationModal,
  RequestDocumentsModal,
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

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>('all');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<ApplicationHubFilters>(DEFAULT_APP_HUB_FILTERS);
  const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [exportOpen, setExportOpen] = useState(false);
  const [exportSuccessOpen, setExportSuccessOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState<{
    open: boolean;
    reviewerName: string;
    count: number;
  }>({
    open: false,
    reviewerName: 'Michael Adams',
    count: 0,
  });
  const [menuRowId, setMenuRowId] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{
    type: HubActionModalType;
    applicantName: string;
    applicationIds: string[];
  } | null>(null);
  const router = useRouter();
  const { rows: applicants, setRows, loading, error } = useProviderApplications();
  const { members: teamMembers } = useProviderTeam();
  const reviewerOptions = useMemo(
    () =>
      teamMembers
        .filter((m) => m.status === 'Active')
        .map((m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          avatar: typeof m.avatar === 'string' ? undefined : m.avatar,
        })),
    [teamMembers],
  );

  // Dynamic filter options built from live data
  const dynamicOpportunityOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { value: string; label: string }[] = [{ value: 'all', label: 'All Opportunities' }];
    for (const a of applicants) {
      if (a.opportunity && !seen.has(a.opportunity)) {
        seen.add(a.opportunity);
        opts.push({ value: a.opportunity, label: a.opportunity });
      }
    }
    return opts;
  }, [applicants]);

  const dynamicReviewerOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [{ value: 'all', label: 'All Reviewers' }];
    for (const m of teamMembers.filter((m) => m.status === 'Active')) {
      opts.push({ value: m.name, label: m.name });
    }
    return opts;
  }, [teamMembers]);
  const topbarQuery = useOpportunityHubSearch();
  const effectiveSearch = search || topbarQuery;

  const filtered = useMemo(() => {
    const byTab = filterApplicants(applicants, activeTab);
    const byFilters = filterByApplicationHubFilters(byTab, filters);
    const searched = !effectiveSearch.trim()
      ? byFilters
      : byFilters.filter((a) => {
          const q = effectiveSearch.toLowerCase();
          return (
            a.applicant.toLowerCase().includes(q) ||
            a.opportunity.toLowerCase().includes(q) ||
            a.email.toLowerCase().includes(q) ||
            a.location.toLowerCase().includes(q)
          );
        });
    return sortApplicants(searched, sort);
  }, [activeTab, effectiveSearch, applicants, filters, sort]);

  const { page, pageSize, total, pageItems, goToPage, changePageSize, setPage } = usePagination(
    filtered,
    5,
  );

  useEffect(() => {
    setPage(1);
  }, [sort, effectiveSearch, activeTab, filters, setPage]);

  const isEmptySource = !loading && applicants.length === 0;
  const isNoMatch = !loading && applicants.length > 0 && filtered.length === 0;
  const tabCounts = useMemo(() => buildApplicationTabCounts(applicants), [applicants]);
  const tabs = isEmptySource
    ? EMPTY_APPLICATION_TABS
    : APPLICATION_TABS.map((tab) => ({
        ...tab,
        count: tabCounts[tab.id] ?? 0,
      }));
  const stats = useMemo(() => buildApplicationHubStats(applicants), [applicants]);

  function setFilter<K extends keyof ApplicationHubFilters>(key: K, value: ApplicationHubFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === pageItems.length && pageItems.length > 0) {
      setSelected(new Set());
    } else {
      setSelected(new Set(pageItems.map((r) => r.id)));
    }
  }

  const firstSelectedName =
    applicants.find((a) => selected.has(a.id))?.applicant ?? 'Applicant';

  async function handleActionConfirm(type: HubActionModalType, note?: string) {
    const ids = actionModal?.applicationIds?.length
      ? actionModal.applicationIds
      : Array.from(selected);
    if (ids.length === 0) return;

    if (type === 'note' && note) {
      await Promise.all(
        ids.map(async (id) => {
          const row = applicants.find((a) => a.id === id);
          const current =
            row?.status === 'Shortlisted'
              ? 'shortlisted'
              : row?.status === 'Interview'
                ? 'interview'
                : row?.status === 'Accepted'
                  ? 'accepted'
                  : row?.status === 'Rejected'
                    ? 'rejected'
                    : 'under_review';
          await providerApi.updateApplicationStatus(id, { status: current, note });
        }),
      );
      return;
    }

    if (type === 'archive') {
      await Promise.all(ids.map((id) => providerApi.archiveApplication(id, note)));
      setRows((prev) =>
        prev.map((row) =>
          ids.includes(row.id) ? { ...row, status: 'Rejected' as const, tab: 'rejected' as const } : row,
        ),
      );
      setSelected(new Set());
      return;
    }

    if (type === 'reopen') {
      await Promise.all(
        ids.map(async (id) => {
          try {
            await providerApi.unarchiveApplication(id);
          } catch {
            // Fall back to status update if not archived
          }
          await providerApi.updateApplicationStatus(id, {
            status: 'under_review',
            note,
          });
        }),
      );
      const fields = applicationRowFieldsFromApiStatus('under_review');
      setRows((prev) =>
        prev.map((row) => (ids.includes(row.id) ? { ...row, ...fields } : row)),
      );
      setSelected(new Set());
      return;
    }

    const apiStatus = applicationStatusFromHubAction(type);
    if (!apiStatus) return;

    await Promise.all(
      ids.map((id) =>
        providerApi.updateApplicationStatus(id, {
          status: apiStatus,
          note,
        }),
      ),
    );

    const fields = applicationRowFieldsFromApiStatus(apiStatus);
    setRows((prev) =>
      prev.map((row) => (ids.includes(row.id) ? { ...row, ...fields } : row)),
    );
    setSelected(new Set());
  }

  async function handleScheduleInterview(
    payload: {
      date: string;
      time: string;
      duration: number | string;
      interviewType: string;
      meetingLink?: string;
      notes?: string;
    },
    mode: 'schedule' | 'reschedule' | 'complete' = 'schedule',
  ) {
    const ids = actionModal?.applicationIds?.length
      ? actionModal.applicationIds
      : Array.from(selected);
    if (ids.length === 0) return;
    await Promise.all(
      ids.map((id) =>
        providerApi.scheduleInterview(id, {
          ...payload,
          meetingLink: payload.meetingLink ?? '',
          mode,
        }),
      ),
    );
    const fields = applicationRowFieldsFromApiStatus('interview');
    setRows((prev) =>
      prev.map((row) => (ids.includes(row.id) ? { ...row, ...fields } : row)),
    );
    setSelected(new Set());
  }

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
            options: dynamicOpportunityOptions,
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
            options: dynamicReviewerOptions,
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
              onShortlist={() =>
                setActionModal({
                  type: 'shortlist',
                  applicantName: firstSelectedName,
                  applicationIds: Array.from(selected),
                })
              }
              onReject={() =>
                setActionModal({
                  type: 'reject',
                  applicantName: firstSelectedName,
                  applicationIds: Array.from(selected),
                })
              }
              onAssignReviewer={() => setAssignOpen(true)}
              onExport={() => setExportOpen(true)}
            />
          ) : (
            <div className="flex items-center gap-3.5">
              <input
                type="checkbox"
                checked={pageItems.length > 0 && selected.size === pageItems.length}
                onChange={toggleAll}
                disabled={pageItems.length === 0}
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
            {pageItems.map((row) => (
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
                  <Avatar
                    src={photoSrc(row.avatar)}
                    fallback={row.applicant}
                    size="sm"
                    className="h-10 w-10"
                  />
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
                  {photoSrc(row.reviewerAvatar) ? (
                    <Avatar
                      src={photoSrc(row.reviewerAvatar)}
                      fallback={row.reviewer}
                      size="xs"
                      className="h-6 w-6"
                    />
                  ) : (
                    <Avatar fallback={row.reviewer || 'Unassigned'} size="xs" className="h-6 w-6" />
                  )}
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
                      if (label === 'Download Submission') {
                        void downloadApplicationSubmission(row.id, row.applicant).catch(console.error);
                        return;
                      }
                      const next = hubActionModalForLabel(label, row.applicant);
                      if (next) {
                        setActionModal({ ...next, applicationIds: [row.id] });
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <ListPagination
          page={page}
          pageSize={pageSize}
          total={total}
          noun="results"
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
        />
      </div>

      <ExportApplicationsModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        onGenerated={() => setExportSuccessOpen(true)}
        rows={filtered.map((a) => ({
          applicant: a.applicant,
          email: a.email,
          location: a.location,
          opportunity: a.opportunity,
          opportunityType: a.opportunityType,
          status: a.status,
          appliedAt: a.appliedAt,
          reviewer: a.reviewer,
          tab: a.tab,
        }))}
      />
      <ExportGeneratedSuccessModal open={exportSuccessOpen} onClose={() => setExportSuccessOpen(false)} />
      <AssignReviewerModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        reviewers={reviewerOptions}
        onAssigned={async (reviewer) => {
          const ids =
            selected.size > 0
              ? Array.from(selected)
              : actionModal?.applicationIds ?? [];
          const targets = ids.length > 0 ? ids : [];
          if (targets.length === 0) {
            setAssignSuccess({ open: true, reviewerName: reviewer.name, count: 0 });
            return;
          }
          const result = await providerApi.assignReviewers(targets, reviewer.id);
          setRows((prev) =>
            prev.map((row) =>
              targets.includes(row.id) ? { ...row, reviewer: reviewer.name } : row,
            ),
          );
          setAssignSuccess({
            open: true,
            reviewerName: result.reviewer?.name ?? reviewer.name,
            count: result.assigned ?? targets.length,
          });
          setSelected(new Set());
        }}
      />
      <ReviewerAssignedSuccessModal
        open={assignSuccess.open}
        reviewerName={assignSuccess.reviewerName}
        count={assignSuccess.count}
        onClose={() => setAssignSuccess((s) => ({ ...s, open: false }))}
      />
      <ShortlistApplicationModal
        open={actionModal?.type === 'shortlist'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={() => handleActionConfirm('shortlist')}
      />
      <RejectApplicationModal
        open={actionModal?.type === 'reject'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={(note) => handleActionConfirm('reject', note)}
      />
      <ScheduleInterviewModal
        open={actionModal?.type === 'interview' || actionModal?.type === 'reschedule'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        mode={actionModal?.type === 'reschedule' ? 'reschedule' : 'schedule'}
        onConfirm={(payload) =>
          handleScheduleInterview(
            payload,
            actionModal?.type === 'reschedule' ? 'reschedule' : 'schedule',
          )
        }
      />
      <MarkInterviewCompletedModal
        open={actionModal?.type === 'complete'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={() =>
          handleScheduleInterview(
            {
              date: new Date().toISOString().slice(0, 10),
              time: '12:00',
              duration: 30,
              interviewType: 'Completed',
              notes: 'Interview marked completed',
            },
            'complete',
          )
        }
      />
      <SendOfferModal
        open={actionModal?.type === 'offer'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={() => handleActionConfirm('offer')}
      />
      <ArchiveApplicationModal
        open={actionModal?.type === 'archive'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={() => handleActionConfirm('archive')}
      />
      <ReopenApplicationModal
        open={actionModal?.type === 'reopen'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={() => handleActionConfirm('reopen')}
      />
      <AddNoteModal
        open={actionModal?.type === 'note'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={(note) => handleActionConfirm('note', note)}
      />
      <RequestDocumentsModal
        open={actionModal?.type === 'request-documents'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
        onConfirm={async (payload) => {
          const ids = actionModal?.applicationIds?.length
            ? actionModal.applicationIds
            : Array.from(selected);
          await Promise.all(
            ids.map((id) =>
              providerApi.requestDocuments(id, {
                message: payload.message,
                documentTypes: payload.documentTypes,
              }),
            ),
          );
          setActionModal(null);
        }}
      />
    </div>
  );
}
