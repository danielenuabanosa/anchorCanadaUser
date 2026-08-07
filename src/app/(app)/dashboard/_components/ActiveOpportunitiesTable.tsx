'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OpportunityRowActions } from '@/app/(app)/opportunities/_components/OpportunityRowActions';
import type { OpportunityRow } from '@/app/(app)/opportunities/_components/opportunitiesHubData';
import { OPPORTUNITY_STATUS_STYLES, type OpportunityStatus } from './dashboardData';
import { DashboardSectionHeader } from './DashboardSectionHeader';
import { TableRowsSkeleton } from '@/shared/components/ui/PageSkeletons';
import { providerApi } from '@/features/provider/services/providerApi';

const GRID_COLS =
  'grid-cols-[minmax(160px,198fr)_80px_90px_100px_100px_minmax(120px,1fr)]';

type DashboardOpp = {
  id: string;
  name: string;
  status: string;
  applications: number;
  postedDate: string;
  deadline: string;
};

function toOpportunityRow(item: DashboardOpp): OpportunityRow {
  return {
    id: item.id,
    name: item.name,
    category: '—',
    type: 'internal',
    status: item.status as OpportunityStatus,
    applications: item.applications,
    applicationsDelta: '0%',
    views: 0,
    deadline: item.deadline,
    daysLeft: '—',
    health: '-',
    tab: 'all',
    postedDate: item.postedDate,
  };
}

export function ActiveOpportunitiesTable({
  className,
  items = [],
  loading,
  error,
}: {
  className?: string;
  items?: DashboardOpp[];
  loading?: boolean;
  error?: string;
}) {
  const router = useRouter();
  const [rows, setRows] = useState<DashboardOpp[]>(items);

  // Keep local rows in sync when parent refreshes
  const visibleRows = useMemo(() => {
    const source = items.length ? items : rows;
    return source;
  }, [items, rows]);

  function updateStatus(id: string, status: OpportunityStatus) {
    setRows((current) =>
      (current.length ? current : items).map((row) => (row.id === id ? { ...row, status } : row)),
    );
  }

  function togglePublish(item: DashboardOpp) {
    if (item.status === 'Closed') {
      updateStatus(item.id, 'Active');
      return;
    }
    updateStatus(item.id, item.status === 'Active' ? 'Draft' : 'Active');
  }

  function handleDelete(id: string) {
    setRows((current) => (current.length ? current : items).filter((row) => row.id !== id));
  }

  function handleArchive(id: string) {
    updateStatus(id, 'Closed');
  }

  function handlePause(id: string) {
    updateStatus(id, 'Draft');
  }

  return (
    <div
      className={cn(
        'flex min-h-[504px] w-full min-w-0 flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <DashboardSectionHeader title="Active Opportunities" href="/opportunities" />

      <div className="mt-5 min-h-0 flex-1 overflow-x-auto">
        <div className="w-full min-w-[688px]">
          <div className={`grid w-full gap-x-2.5 border-b border-[#EEF2F8] ${GRID_COLS}`}>
            {['Opportunity Name', 'Status', 'Applications', 'Posted Date', 'Deadline', 'Actions'].map(
              (label) => (
                <div key={label} className="py-3.5 text-sm font-medium leading-[18px] text-[#0F172A]">
                  {label}
                </div>
              ),
            )}
          </div>

          {loading ? (
            <TableRowsSkeleton rows={4} />
          ) : error ? (
            <p className="py-8 text-sm text-[#B91C1C]">{error}</p>
          ) : visibleRows.length === 0 ? (
            <p className="py-8 text-sm text-[#8C97AD]">
              No opportunities yet. Create one to get started, or wait for admin approval to go live.
            </p>
          ) : (
            visibleRows.map((item) => {
              const published = item.status === 'Active';
              const row = toOpportunityRow(item);
              return (
                <div key={item.id} className={`grid w-full gap-x-2.5 ${GRID_COLS}`}>
                  <div className="truncate py-3.5 text-sm leading-[18px] text-[#44516A]">{item.name}</div>
                  <div className="flex items-center py-3.5">
                    <span
                      className={`inline-flex rounded-[6px] px-1.5 py-0.5 text-sm font-medium leading-[18px] ${OPPORTUNITY_STATUS_STYLES[item.status as OpportunityStatus] ?? OPPORTUNITY_STATUS_STYLES.Draft}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="py-3.5 text-sm leading-[18px] text-[#44516A]">{item.applications}</div>
                  <div className="py-3.5 text-sm leading-[18px] text-[#44516A]">
                    {item.postedDate ?? '—'}
                  </div>
                  <div className="py-3.5 text-sm leading-[18px] text-[#44516A]">{item.deadline}</div>
                  <div className="flex items-center gap-2 py-3.5">
                    <button
                      type="button"
                      onClick={() => togglePublish(item)}
                      className={cn(
                        'flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border bg-white transition-colors hover:bg-[#F8FAFC]',
                        published
                          ? 'border-[#D1FAE5] text-[#15803D]'
                          : 'border-[#EEF2F8] text-[#44516A]',
                      )}
                      aria-label={published ? `Unpublish ${item.name}` : `Publish ${item.name}`}
                      title={published ? 'Unpublish' : 'Publish'}
                    >
                      {published ? (
                        <Eye className="h-[18px] w-[18px]" />
                      ) : (
                        <EyeOff className="h-[18px] w-[18px]" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/opportunities/create/details?id=${encodeURIComponent(item.id)}`)
                      }
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-[#44516A] transition-colors hover:bg-[#F8FAFC]"
                      aria-label={`Edit ${item.name}`}
                      title="Edit"
                    >
                      <Pencil className="h-[18px] w-[18px]" />
                    </button>
                    <OpportunityRowActions
                      row={row}
                      compact
                      onExtendDeadline={(id, date) => {
                        void providerApi.updateOpportunity(id, { deadline: date }).catch(console.error);
                        setRows((current) =>
                          (current.length ? current : items).map((r) =>
                            r.id === id ? { ...r, deadline: date } : r,
                          ),
                        );
                      }}
                      onDelete={(id) => {
                        void providerApi.deleteOpportunity(id).catch(console.error);
                        handleDelete(id);
                      }}
                      onArchive={(id) => {
                        void providerApi.closeOpportunity(id).catch(console.error);
                        handleArchive(id);
                      }}
                      onPause={(id) => {
                        void providerApi.pauseOpportunity(id).catch(console.error);
                        handlePause(id);
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
