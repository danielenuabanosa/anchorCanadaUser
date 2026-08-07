'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePagination } from '@/lib/pagination';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { useProviderOpportunities } from '@/features/provider/hooks/useProviderHubData';
import { useProviderOpportunitiesOverview } from '@/features/provider/hooks/useProviderOpportunitiesOverview';
import {
  buildOpportunityHubStats,
  buildOpportunityTabCounts,
} from '@/features/provider/lib/hubStats';
import { providerApi } from '@/features/provider/services/providerApi';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import {
  StatCardsSkeletonMobile,
  OpportunityListSkeletonMobile,
} from '@/shared/components/ui/PageSkeletons';
import { MobileAttentionPanel } from './MobileAttentionPanel';
import { MobileHubPageHero } from './MobileHubPageHero';
import { MobileHubStatGrid } from './MobileHubStatGrid';
import { MobileHubTabs } from './MobileHubTabs';
import { MobileOpportunityCard } from './MobileOpportunityCard';
import { MobileRecentActivityPanel } from './MobileRecentActivityPanel';
import { useOpportunityHubSearch } from './useOpportunityHubSearch';
import {
  ATTENTION_ALERTS,
  HUB_TABS,
  filterByQuery,
  filterByTab,
  type AttentionAlert,
  type OpportunityTab,
} from './opportunitiesHubData';
import { isStaticMode } from '@/lib/staticMode';

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<OpportunityTab>('all');
  const { rows, setRows, loading, error } = useProviderOpportunities();
  const { recentActivity, overview } = useProviderOpportunitiesOverview();
  const query = useOpportunityHubSearch();

  const filtered = useMemo(() => {
    const byTab = filterByTab(rows, activeTab);
    return filterByQuery(byTab, query);
  }, [activeTab, query, rows]);

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

  const alerts: AttentionAlert[] = useMemo(() => {
    if (isStaticMode()) return ATTENTION_ALERTS;
    return (overview?.attentionAlerts ?? []).map((a) => ({
      id: a.id,
      title: a.title,
      opportunity: a.opportunity,
      details: a.details,
      actionLabel: a.actionLabel,
    }));
  }, [overview]);

  const { page, pageSize, total, pageItems, goToPage, changePageSize, setPage } = usePagination(
    filtered,
    5,
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab, query, setPage]);

  function handleDeleteRow(id: string) {
    const row = rows.find((r) => r.id === id);
    setRows((prev) => prev.filter((r) => r.id !== id));
    if (row?.status === 'Draft' || row?.status === 'Scheduled') {
      void providerApi.deleteOpportunity(id).catch(console.error);
      return;
    }
    void providerApi.closeOpportunity(id).catch(console.error);
  }

  function handleArchiveRow(id: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Closed' as const } : r)));
    void providerApi.closeOpportunity(id).catch(console.error);
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

  return (
    <div className="flex flex-col gap-5 pb-4">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}

      <MobileHubPageHero
        title="Opportunities"
        subtitle="Manage, monitor, edit and publish all opportunities from one place."
        action={<StartBuilderDropdown className="w-full" />}
      />

      <section>
        {loading ? <StatCardsSkeletonMobile count={4} /> : <MobileHubStatGrid stats={stats} />}
      </section>

      <section>
        <MobileHubTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </section>

      <div className="flex flex-col gap-5">
        {loading ? (
          <OpportunityListSkeletonMobile />
        ) : pageItems.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#44516A]">No opportunities match this view.</p>
        ) : (
          pageItems.map((row) => (
            <MobileOpportunityCard
              key={row.id}
              row={row}
              onDelete={handleDeleteRow}
              onArchive={handleArchiveRow}
              onPause={(id) => {
                void providerApi.pauseOpportunity(id).catch(console.error);
              }}
              onExtendDeadline={handleExtendDeadline}
            />
          ))
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

      {alerts.length > 0 ? <MobileAttentionPanel alerts={alerts} /> : null}

      <MobileRecentActivityPanel items={recentActivity.slice(0, 4)} />
    </div>
  );
}
