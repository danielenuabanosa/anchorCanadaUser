'use client';



import { useMemo, useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import {

  ArrowRight,

  ChevronDown,

  Download,

  Grid3X3,

  LayoutList,

  TriangleAlert,

} from 'lucide-react';

import { cn } from '@/lib/utils';

import { OpportunityGridCard } from '@/features/opportunity-builder/components/OpportunityGridCard';

import { HubStatCard } from './HubStatCard';

import { OpportunityTableRow } from './OpportunityTableRow';

import { useOpportunityHubSearch } from './useOpportunityHubSearch';
import { useProviderOpportunities } from '@/features/provider/hooks/useProviderHubData';

import {

  ATTENTION_ALERTS,

  HUB_STATS,

  HUB_TABS,

  RECENT_ACTIVITY,

  filterByQuery,

  filterByTab,

  type OpportunityTab,

} from './opportunitiesHubData';



const FILTER_LABELS = ['Opportunity Type', 'Status', 'Category', 'Date Created', 'Deadline'] as const;



export default function DesktopView() {

  const [activeTab, setActiveTab] = useState<OpportunityTab>('all');

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

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

    <div className="flex flex-col gap-5">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}
      {loading ? <p className="text-sm text-[#44516A]">Loading your opportunities…</p> : null}

      <div className="flex flex-wrap items-end justify-between gap-4">

        <div>

          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Opportunities</h1>

          <p className="text-base text-[#44516A]">

            Manage, monitor, edit and publish all opportunities from one place..

          </p>

        </div>

        <button

          type="button"

          className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-3 text-base font-medium text-[#0F172A]"

        >

          <Download className="h-[18px] w-[18px]" />

          Export

        </button>

      </div>



      <div className="grid grid-cols-5 gap-2.5">

        {HUB_STATS.map((stat) => (

          <HubStatCard key={stat.label} {...stat} />

        ))}

      </div>



      <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-white px-4 py-5">

        {FILTER_LABELS.map((label) => (

          <button

            key={label}

            type="button"

            className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-3 py-2 text-sm text-[#44516A]"

          >

            {label}

            <ChevronDown className="h-4 w-4" />

          </button>

        ))}

        <div className="ml-auto flex items-center gap-2">

          <button

            type="button"

            onClick={() => setViewMode('table')}

            className={cn(

              'inline-flex items-center gap-2 rounded-[6px] border px-3 py-2 text-sm',

              viewMode === 'table'

                ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'

                : 'border-[#D9E1EF] bg-white text-[#44516A]',

            )}

          >

            <LayoutList className="h-4 w-4" />

            Table View

          </button>

          <button

            type="button"

            onClick={() => setViewMode('grid')}

            className={cn(

              'inline-flex items-center gap-2 rounded-[6px] border px-3 py-2 text-sm',

              viewMode === 'grid'

                ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'

                : 'border-[#D9E1EF] bg-white text-[#44516A]',

            )}

          >

            <Grid3X3 className="h-4 w-4" />

            Grid View

          </button>

        </div>

      </div>



      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">

        <div className="flex gap-2.5 overflow-x-auto border-b border-[#EEF2F8] px-2.5">

          {HUB_TABS.map((tab) => (

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



        {viewMode === 'table' ? (

          <>

            <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[minmax(220px,1.4fr)_100px_100px_120px_90px_130px_140px_48px] md:gap-2.5">

              {['Opportunity', 'Type', 'Status', 'Applications', 'Views', 'Deadline', 'Health', 'Actions'].map(

                (col) => (

                  <p key={col} className="py-3.5 text-sm font-medium text-[#0F172A]">

                    {col}

                  </p>

                ),

              )}

            </div>

            <div className="px-5">

              {filtered.map((row) => (

                <OpportunityTableRow key={row.id} row={row} onDelete={handleDeleteRow} />

              ))}

            </div>

          </>

        ) : (

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">

            {filtered.map((row) => (

              <OpportunityGridCard key={row.id} row={row} onDelete={handleDeleteRow} />

            ))}

          </div>

        )}

      </div>



      <div className="grid grid-cols-2 gap-5">

        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">

          <div className="mb-4 flex items-center justify-between">

            <h3 className="text-lg font-medium text-[#0F172A]">Recent Applications</h3>

            <Link href="/applications" className="flex items-center gap-2 text-sm font-medium text-[#2F66C8]">

              View All

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

          <ul className="space-y-3">

            {RECENT_ACTIVITY.map((item) => (

              <li key={item.id} className="flex items-center gap-3">

                <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">

                  <Image src={item.avatar} alt="" width={52} height={52} className="h-full w-full object-cover" />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-base font-medium text-[#0F172A]">{item.name}</p>

                  <p className="truncate text-sm text-[#44516A]">{item.action}</p>

                </div>

                <span className="shrink-0 text-sm text-[#44516A]">{item.time}</span>

              </li>

            ))}

          </ul>

        </div>



        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">

          <div className="mb-4 flex items-center justify-between">

            <h3 className="text-lg font-medium text-[#0F172A]">Opportunity Requiring Attention</h3>

            <Link href="/applications" className="flex items-center gap-2 text-sm font-medium text-[#2F66C8]">

              View All

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

          <ul className="space-y-3">

            {ATTENTION_ALERTS.map((alert) => (

              <li

                key={alert.id}

                className="flex items-start justify-between gap-4 rounded-[10px] bg-[#FDFAF3] px-4 py-4"

              >

                <div className="flex min-w-0 items-start gap-2">

                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#9B290E]" />

                  <div className="min-w-0">

                    <p className="text-sm font-medium text-[#9B290E]">{alert.title}</p>

                    <p className="text-sm font-medium text-[#0F172A]">{alert.opportunity}</p>

                    <ul className="mt-1 space-y-0.5">

                      {alert.details.map((detail) => (

                        <li key={detail} className="flex items-center gap-1.5 text-sm text-[#44516A]">

                          <span className="text-[#8C97AD]">•</span>

                          {detail}

                        </li>

                      ))}

                    </ul>

                  </div>

                </div>

                <button

                  type="button"

                  className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-3 py-2 text-sm font-medium text-[#2F66C8]"

                >

                  {alert.actionLabel}

                </button>

              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>

  );

}


