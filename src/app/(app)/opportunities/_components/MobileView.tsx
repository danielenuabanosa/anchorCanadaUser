'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePagination } from '@/lib/pagination';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { useProviderOpportunities } from '@/features/provider/hooks/useProviderHubData';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import { MobileHubPageHero } from './MobileHubPageHero';
import { MobileHubStatGrid } from './MobileHubStatGrid';
import { MobileHubTabs } from './MobileHubTabs';
import { MobileOpportunityCard } from './MobileOpportunityCard';
import { MobileRecentActivityPanel } from './MobileRecentActivityPanel';
import { useOpportunityHubSearch } from './useOpportunityHubSearch';
import {
  HUB_TABS,
  MOBILE_HUB_STATS,
  RECENT_ACTIVITY,
  filterByQuery,
  filterByTab,
  type OpportunityTab,
} from './opportunitiesHubData';

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<OpportunityTab>('all');
  const { rows, setRows, loading, error } = useProviderOpportunities();
  const query = useOpportunityHubSearch();

  const filtered = useMemo(() => {
    const byTab = filterByTab(rows, activeTab);
    return filterByQuery(byTab, query);
  }, [activeTab, query, rows]);

  const { page, pageSize, total, pageItems, goToPage, changePageSize, setPage } = usePagination(
    filtered,
    5,
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab, query, setPage]);

  function handleDeleteRow(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}
      {loading ? <p className="text-sm text-[#44516A]">Loading your opportunities…</p> : null}

      <MobileHubPageHero
        title="Opportunities"
        subtitle="Manage, monitor, edit and publish all opportunities from one place."
        action={<StartBuilderDropdown className="w-full" />}
      />

      <section>
        <MobileHubStatGrid stats={MOBILE_HUB_STATS} />
      </section>

      <section>
        <MobileHubTabs tabs={HUB_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </section>

      <div className="flex flex-col gap-5">
        {pageItems.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#44516A]">No opportunities match this view.</p>
        ) : (
          pageItems.map((row) => <MobileOpportunityCard key={row.id} row={row} onDelete={handleDeleteRow} />)
        )}
      </div>

      <ListPagination
        compact
        page={page}
        pageSize={pageSize}
        total={total}
        noun="opportunities"
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />

      <MobileRecentActivityPanel items={RECENT_ACTIVITY.slice(0, 4)} />
    </div>
  );
}
