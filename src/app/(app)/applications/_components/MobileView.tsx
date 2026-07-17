'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUp, Download, Search, SlidersHorizontal } from 'lucide-react';
import { usePagination } from '@/lib/pagination';
import { cn } from '@/lib/utils';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { MobileHubTabs } from '@/app/(app)/opportunities/_components/MobileHubTabs';
import { useOpportunityHubSearch } from '@/app/(app)/opportunities/_components/useOpportunityHubSearch';
import { useProviderApplications } from '@/features/provider/hooks/useProviderHubData';
import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import { MobileApplicantCard } from './MobileApplicantCard';
import {
  APPLICATION_STATS,
  APPLICATION_TABS,
  DEFAULT_APP_HUB_FILTERS,
  EMPTY_APPLICATION_TABS,
  filterApplicants,
  filterByApplicationHubFilters,
  sortApplicants,
  type ApplicationHubFilters,
  type ApplicationTab,
} from './applicationsHubData';
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
  ScheduleInterviewModal,
  SendOfferModal,
  ShortlistApplicationModal,
} from './ApplicationHubModals';
import { hubActionModalForLabel, type HubActionModalType } from './ApplicationActionsDropdown';
import { ApplicationMobileFilterMenu } from './ApplicationMobileFilterMenu';
import {
  ApplicationBulkActionBar,
  ApplicationsEmptyState,
  ApplicationsMobileSkeleton,
  ApplicationsNoMatchState,
} from './ApplicationHubStates';

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>('all');
  const [exportOpen, setExportOpen] = useState(false);
  const [exportSuccessOpen, setExportSuccessOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState<{ open: boolean; reviewerName: string }>({
    open: false,
    reviewerName: 'Michael Adams',
  });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [actionModal, setActionModal] = useState<{
    type: HubActionModalType;
    applicantName: string;
  } | null>(null);
  const [filters, setFilters] = useState<ApplicationHubFilters>(DEFAULT_APP_HUB_FILTERS);
  const [sort, setSort] = useState('newest');
  const [localSearch, setLocalSearch] = useState('');
  const { rows: applicants, loading, error } = useProviderApplications();
  const query = useOpportunityHubSearch();
  const search = localSearch || query;

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
            a.email.toLowerCase().includes(q)
          );
        });
    return sortApplicants(searched, sort);
  }, [activeTab, search, applicants, filters, sort]);

  const { page, pageSize, total, pageItems, goToPage, changePageSize, setPage } = usePagination(
    filtered,
    5,
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab, search, filters, sort, setPage]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');
  const isEmptySource = !loading && applicants.length === 0;
  const isNoMatch = !loading && applicants.length > 0 && filtered.length === 0;
  const tabs = (isEmptySource ? EMPTY_APPLICATION_TABS : APPLICATION_TABS).map((tab) => ({
    ...tab,
    count: tab.count,
  }));
  const stats = isEmptySource
    ? APPLICATION_STATS.map((stat) => ({
        ...stat,
        value: 0,
        change: undefined,
        subtext: 'As of 24h ago',
      }))
    : APPLICATION_STATS;

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const firstSelectedName =
    applicants.find((a) => selected.has(a.id))?.applicant ?? 'Applicant';

  return (
    <div className="flex flex-col gap-5 pb-4">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
      ) : null}

      <MobileHubPageHero
        title="Application Management"
        subtitle="Review, evaluate and manage applicants across all opportunities."
        action={
          <button
            type="button"
            onClick={() => setExportOpen(true)}
            className="inline-flex h-[45px] w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-base font-medium text-[#0F172A] sm:w-auto"
          >
            <Download className="h-[18px] w-[18px]" strokeWidth={1.75} />
            Export Report
          </button>
        }
      />

      <section>
        {loading ? (
          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[158px] animate-pulse rounded-[8px] border border-[#EEF2F8] bg-white" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex h-[158px] flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4"
                >
                  <span className={cn('flex h-8 w-8 items-center justify-center rounded-2xl', stat.iconBg)}>
                    <Icon className={cn('h-4 w-4', stat.iconColor)} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs leading-none text-[#44516A]">{stat.label}</p>
                    <p className="mt-1.5 text-2xl font-bold leading-none text-[#0F172A]">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {stat.change ? (
                        <span className="inline-flex items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-[10px] leading-none text-[#15803D]">
                          <ArrowUp className="h-2.5 w-2.5" strokeWidth={2.5} />
                          {stat.change}
                        </span>
                      ) : null}
                      {stat.subtext ? (
                        <span className="text-[10px] leading-none text-[#8C97AD]">{stat.subtext}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="relative flex items-center gap-2.5">
        <div className="anchor-search-field min-w-0 flex-1">
          <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" aria-hidden />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search applicants..."
            className="no-anchor-field min-w-0 flex-1 bg-transparent font-sans text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen((open) => !open)}
          className={cn(
            'inline-flex h-[45px] shrink-0 items-center justify-center gap-2 rounded-[6px] px-3 text-sm font-medium',
            hasActiveFilters || filterOpen ? 'bg-[#EFF4FF] text-[#2F66C8]' : 'bg-[#F8FAFC] text-[#2F66C8]',
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
        <ApplicationMobileFilterMenu
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          value={filters}
          onChange={setFilters}
        />
      </div>

      <section>
        <MobileHubTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </section>

      {selected.size > 0 ? (
        <ApplicationBulkActionBar
          count={selected.size}
          variant="mobile"
          onClear={() => setSelected(new Set())}
          onShortlist={() => setActionModal({ type: 'shortlist', applicantName: firstSelectedName })}
          onReject={() => setActionModal({ type: 'reject', applicantName: firstSelectedName })}
          onAssignReviewer={() => setAssignOpen(true)}
          onExport={() => setExportOpen(true)}
        />
      ) : (
        <div className="flex items-center justify-between rounded-[10px] border border-[#EEF2F8] px-5 py-2.5">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                if (pageItems.length === 0) return;
                setSelected(new Set(pageItems.map((r) => r.id)));
              }}
              className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8]"
              aria-label="Select all applicants"
            />
            <p className="text-sm text-[#8C97AD]">0 selected</p>
          </div>
          <HubSortSelect value={sort} onChange={setSort} showLabel={false} className="shrink-0" />
        </div>
      )}

      {loading ? (
        <ApplicationsMobileSkeleton />
      ) : isEmptySource ? (
        <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <ApplicationsEmptyState />
        </div>
      ) : isNoMatch ? (
        <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <ApplicationsNoMatchState />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {pageItems.map((row) => (
              <MobileApplicantCard
                key={row.id}
                row={row}
                selected={selected.has(row.id)}
                showCheckbox={selected.size > 0}
                onToggleSelect={toggleSelect}
                onAssignReviewer={() => {
                  setSelected(new Set([row.id]));
                  setAssignOpen(true);
                }}
                onAction={(label, applicant) => {
                  const next = hubActionModalForLabel(label, applicant.applicant);
                  if (next) setActionModal(next);
                }}
              />
            ))}
          </div>
          <ListPagination
            compact
            page={page}
            pageSize={pageSize}
            total={total}
            noun="results"
            onPageChange={goToPage}
            onPageSizeChange={changePageSize}
          />
        </>
      )}

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
