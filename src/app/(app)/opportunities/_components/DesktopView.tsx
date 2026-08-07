'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, Grid3X3, LayoutList } from 'lucide-react';
import { usePagination } from '@/lib/pagination';
import { cn } from '@/lib/utils';
import { HubFilterBar } from '@/shared/components/hub/HubFilterBar';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import { OpportunityGridCard } from '@/features/opportunity-builder/components/OpportunityGridCard';
import { useProviderOpportunities } from '@/features/provider/hooks/useProviderHubData';
import { useProviderOpportunitiesOverview } from '@/features/provider/hooks/useProviderOpportunitiesOverview';
import {
  buildOpportunityHubStats,
  buildOpportunityTabCounts,
} from '@/features/provider/lib/hubStats';
import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import type { HubMenuOption } from '@/shared/components/hub/HubMenuSelect';
import {
  ArchiveOpportunityModal,
  DeleteOpportunityModal,
  ExportOpportunitiesModal,
  ExtendDeadlineModal,
  PauseOpportunityModal,
} from './OpportunityHubModals';
import { HubStatCard } from './HubStatCard';
import { OpportunityTableRow } from './OpportunityTableRow';
import { useOpportunityHubSearch } from './useOpportunityHubSearch';
import {
  StatCardsSkeleton,
  TableRowsSkeleton,
  OpportunityGridSkeleton,
} from '@/shared/components/ui/PageSkeletons';
import { DEFAULT_OPP_HUB_FILTERS,
  HUB_TABS,
  OPP_CATEGORY_FILTER_OPTIONS,
  OPP_DATE_CREATED_FILTER_OPTIONS,
  OPP_DEADLINE_FILTER_OPTIONS,
  OPP_STATUS_FILTER_OPTIONS,
  OPP_TYPE_FILTER_OPTIONS,
  filterByHubFilters,
  filterByQuery,
  filterByTab,
  type OpportunityHubFilters,
  type OpportunityRow,
  type OpportunityTab,
} from './opportunitiesHubData';
import { providerApi } from '@/features/provider/services/providerApi';
import avatar1 from '@assets/images/profile-avatar.png';

const OPP_SORT_OPTIONS: HubMenuOption[] = [
  { value: 'newest', label: 'Newest Created' },
  { value: 'oldest', label: 'Oldest Created' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'deadline', label: 'Deadline Soonest' },
];

function sortOpportunities(rows: OpportunityRow[], sort: string) {
  const next = [...rows];
  switch (sort) {
    case 'oldest':
      return next.sort((a, b) => String(a.postedDate).localeCompare(String(b.postedDate)));
    case 'name-asc':
      return next.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return next.sort((a, b) => b.name.localeCompare(a.name));
    case 'deadline':
      return next.sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
    case 'newest':
    default:
      return next.sort((a, b) => String(b.postedDate).localeCompare(String(a.postedDate)));
  }
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<OpportunityTab>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [localSearch, setLocalSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filters, setFilters] = useState<OpportunityHubFilters>(DEFAULT_OPP_HUB_FILTERS);
  const [exportOpen, setExportOpen] = useState(false);
  const { rows, setRows, loading, error } = useProviderOpportunities();
  const { recentActivity } = useProviderOpportunitiesOverview();
  const topbarQuery = useOpportunityHubSearch();
  const query = localSearch || topbarQuery;

  const filtered = useMemo(() => {
    const byTab = filterByTab(rows, activeTab);
    const byFilters = filterByHubFilters(byTab, filters);
    const byQuery = filterByQuery(byFilters, query);
    return sortOpportunities(byQuery, sort);
  }, [activeTab, filters, query, rows, sort]);

  const stats = useMemo(() => buildOpportunityHubStats(rows), [rows]);
  const tabCounts = useMemo(() => buildOpportunityTabCounts(rows), [rows]);
  const tabs = useMemo(
    () =>
      HUB_TABS.map((tab) => ({
        ...tab,
        count: tabCounts[tab.id as keyof typeof tabCounts] ?? 0,
      })),
    [tabCounts],
  );

  const { page, pageSize, total, pageItems, goToPage, changePageSize, setPage } = usePagination(
    filtered,
    5,
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab, filters, query, setPage]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');

  function handleDeleteRow(id: string) {
    const row = rows.find((r) => r.id === id);
    setRows((prev) => prev.filter((r) => r.id !== id));
    if (row?.status === 'Draft' || row?.status === 'Scheduled') {
      void providerApi.deleteOpportunity(id).catch(() => {
        // restore on failure by refetching would be ideal; keep optimistic for now
      });
      return;
    }
    void providerApi.closeOpportunity(id).catch(console.error);
  }

  function handleArchiveRow(id: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Closed' as const } : r)));
    void providerApi.closeOpportunity(id).catch(console.error);
  }

  function handlePauseRow(id: string) {
    void providerApi.pauseOpportunity(id).then(() => {
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'Closed' as const } : r)),
      );
    }).catch(console.error);
  }

  function handleExtendDeadline(id: string, date: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              deadline: new Date(date).toLocaleDateString('en-CA', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
            }
          : r,
      ),
    );
    void providerApi.updateOpportunity(id, { deadline: date }).catch(console.error);
  }

  function setFilter<K extends keyof OpportunityHubFilters>(key: K, value: OpportunityHubFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-5">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument-serif text-[36px] leading-[56px] text-[#0F172A]">Opportunities</h1>
          <p className="text-base text-[#44516A]">
            Manage, monitor, edit and publish all opportunities from one place.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExportOpen(true)}
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
        >
          <Download className="h-[18px] w-[18px]" />
          Export
        </button>
      </div>

      {loading ? (
        <StatCardsSkeleton count={5} />
      ) : (
      <div className="grid grid-cols-5 gap-2.5">
        {stats.map((stat) => (
          <HubStatCard key={stat.label} {...stat} />
        ))}
      </div>
      )}

      <HubFilterBar
        searchPlaceholder="Search opportunities..."
        searchValue={localSearch}
        onSearchChange={setLocalSearch}
        onClear={hasActiveFilters ? () => setFilters(DEFAULT_OPP_HUB_FILTERS) : undefined}
        filterMenus={[
          {
            id: 'type',
            label: 'Opportunity Type',
            value: filters.type,
            options: [...OPP_TYPE_FILTER_OPTIONS],
            onChange: (value) => setFilter('type', value),
          },
          {
            id: 'status',
            label: 'Status',
            value: filters.status,
            options: [...OPP_STATUS_FILTER_OPTIONS],
            onChange: (value) => setFilter('status', value),
          },
          {
            id: 'category',
            label: 'Category',
            value: filters.category,
            options: [...OPP_CATEGORY_FILTER_OPTIONS],
            onChange: (value) => setFilter('category', value),
          },
          {
            id: 'dateCreated',
            label: 'Date Created',
            value: filters.dateCreated,
            options: [...OPP_DATE_CREATED_FILTER_OPTIONS],
            onChange: (value) => setFilter('dateCreated', value),
          },
          {
            id: 'deadline',
            label: 'Deadline',
            value: filters.deadline,
            options: [...OPP_DEADLINE_FILTER_OPTIONS],
            onChange: (value) => setFilter('deadline', value),
          },
        ]}
        trailing={
          <>
            <HubSortSelect value={sort} onChange={setSort} options={OPP_SORT_OPTIONS} showLabel={false} />
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={cn(
                'inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border px-3 text-sm',
                viewMode === 'table'
                  ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                  : 'border-[#EEF2F8] bg-white text-[#0F172A]',
              )}
            >
              <LayoutList className="h-[18px] w-[18px]" />
              Table View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border px-3 text-sm',
                viewMode === 'grid'
                  ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                  : 'border-[#EEF2F8] bg-white text-[#0F172A]',
              )}
            >
              <Grid3X3 className="h-[18px] w-[18px]" />
              Grid View
            </button>
          </>
        }
      />

      {viewMode === 'table' ? (
        <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <div className="flex h-[52px] gap-2.5 overflow-x-auto border-b border-[#EEF2F8] px-2.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'shrink-0 px-2.5 py-3.5 text-sm',
                  activeTab === tab.id
                    ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                    : 'text-[#0F172A]',
                )}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[minmax(220px,1.4fr)_100px_100px_120px_90px_130px_140px_48px] md:gap-2.5">
            {['Opportunity', 'Type', 'Status', 'Applications', 'Views', 'Deadline', 'Health', 'Actions'].map(
              (col) => (
                <p key={col} className="py-[14px] text-sm font-medium text-[#0F172A]">
                  {col}
                </p>
              ),
            )}
          </div>
          <div className="px-5">
            {loading ? (
              <TableRowsSkeleton rows={5} />
            ) : pageItems.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#44516A]">No opportunities match your filters.</p>
            ) : (
              pageItems.map((row) => (
                <OpportunityTableRow
                  key={row.id}
                  row={row}
                  onDelete={handleDeleteRow}
                  onArchive={handleArchiveRow}
                  onPause={handlePauseRow}
                  onExtendDeadline={handleExtendDeadline}
                />
              ))
            )}
          </div>
          <ListPagination
            page={page}
            pageSize={pageSize}
            total={total}
            noun="opportunities"
            onPageChange={goToPage}
            onPageSizeChange={changePageSize}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {loading ? (
            <OpportunityGridSkeleton count={6} />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {pageItems.length === 0 ? (
                  <p className="col-span-full py-10 text-center text-sm text-[#44516A]">
                    No opportunities match your filters.
                  </p>
                ) : (
                  pageItems.map((row) => (
                    <OpportunityGridCard
                      key={row.id}
                      row={row}
                      onDelete={handleDeleteRow}
                      onArchive={handleArchiveRow}
                      onPause={handlePauseRow}
                      onExtendDeadline={handleExtendDeadline}
                    />
                  ))
                )}
              </div>
              <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
                <ListPagination
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  noun="opportunities"
                  onPageChange={goToPage}
                  onPageSizeChange={changePageSize}
                />
              </div>
            </>
          )}
        </div>
      )}

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Recent Applications</h3>
          <Link href="/applications" className="text-base font-medium text-[#2F66C8]">
            View All
          </Link>
        </div>
        <ul className="flex flex-col">
          {recentActivity.length === 0 ? (
            <li className="py-4 text-sm text-[#44516A]">No recent applications yet.</li>
          ) : (
            recentActivity.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-2.5">
                <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.avatar ?? avatar1}
                    alt=""
                    width={52}
                    height={52}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-end justify-between gap-5">
                  <div className="min-w-0">
                    <p className="truncate text-base font-medium text-[#0F172A]">{item.name}</p>
                    <p className="truncate text-sm text-[#44516A]">{item.action}</p>
                  </div>
                  <span className="shrink-0 text-sm text-[#44516A]">{item.time}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <ExportOpportunitiesModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        rows={filtered}
      />
    </div>
  );
}
