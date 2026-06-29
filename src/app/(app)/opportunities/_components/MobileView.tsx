'use client';

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { MobileAttentionPanel } from './MobileAttentionPanel';
import { MobileHubPageHero } from './MobileHubPageHero';
import { MobileHubStatGrid } from './MobileHubStatGrid';
import { MobileHubTabs } from './MobileHubTabs';
import { MobileOpportunityCard } from './MobileOpportunityCard';
import { MobileRecentActivityPanel } from './MobileRecentActivityPanel';
import { useOpportunityHubSearch } from './useOpportunityHubSearch';
import { useProviderOpportunities } from '@/features/provider/hooks/useProviderHubData';
import {
  ATTENTION_ALERTS,
  MOBILE_HUB_STATS,
  HUB_TABS,
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

  function handleDeleteRow(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  return (
    <div className="flex flex-col pb-4">
      <MobileHubPageHero
        title="Opportunities"
        subtitle="Manage, monitor, edit and publish all opportunities from one place.."
        action={<StartBuilderDropdown className="w-fit" />}
      />

      <section className="py-5">
        <MobileHubStatGrid stats={MOBILE_HUB_STATS} />
      </section>

      <section className="py-5">
        <MobileHubTabs tabs={HUB_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </section>

      <div className="mt-5 flex flex-col gap-5">
        {filtered.map((row) => (
          <MobileOpportunityCard key={row.id} row={row} onDelete={handleDeleteRow} />
        ))}
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-3 text-sm leading-[18px] text-[#2F66C8]"
      >
        Load More Opportunities
        <ChevronDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </button>

      <MobileRecentActivityPanel items={RECENT_ACTIVITY.slice(0, 4)} />
      <MobileAttentionPanel alerts={ATTENTION_ALERTS} />
    </div>
  );
}
