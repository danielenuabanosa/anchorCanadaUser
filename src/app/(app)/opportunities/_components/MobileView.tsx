'use client';

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { useProviderOpportunities } from '@/features/provider/hooks/useProviderHubData';
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
  const [visibleCount, setVisibleCount] = useState(6);
  const { rows, setRows, loading, error } = useProviderOpportunities();
  const query = useOpportunityHubSearch();

  const filtered = useMemo(() => {
    const byTab = filterByTab(rows, activeTab);
    return filterByQuery(byTab, query);
  }, [activeTab, query, rows]);

  const visible = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

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
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#44516A]">No opportunities match this view.</p>
        ) : (
          visible.map((row) => <MobileOpportunityCard key={row.id} row={row} onDelete={handleDeleteRow} />)
        )}
      </div>

      {canLoadMore ? (
        <button
          type="button"
          onClick={() => setVisibleCount((n) => n + 6)}
          className="flex w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-3 text-sm leading-[18px] text-[#2F66C8]"
        >
          Load More Opportunities
          <ChevronDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
      ) : null}

      <MobileRecentActivityPanel items={RECENT_ACTIVITY.slice(0, 4)} />
    </div>
  );
}
