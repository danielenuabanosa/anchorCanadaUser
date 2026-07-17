'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OpportunityRowActions } from '@/app/(app)/opportunities/_components/OpportunityRowActions';
import type { OpportunityRow } from '@/app/(app)/opportunities/_components/opportunitiesHubData';
import {
  ACTIVE_OPPORTUNITIES,
  OPPORTUNITY_STATUS_STYLES,
  type ActiveOpportunity,
  type OpportunityStatus,
} from './dashboardData';
import { DashboardSectionHeader } from './DashboardSectionHeader';

const GRID_COLS =
  'grid-cols-[minmax(160px,198fr)_80px_90px_100px_100px_minmax(120px,1fr)]';

function toHubRow(item: ActiveOpportunity): OpportunityRow {
  return {
    id: item.id,
    name: item.name,
    category: 'General',
    type: 'Internal',
    status: item.status,
    applications: item.applications,
    applicationsDelta: '0%',
    views: 0,
    deadline: item.deadline,
    daysLeft: '—',
    health: 'Healthy',
    tab: 'all',
  };
}

interface ActiveOpportunitiesTableProps {
  className?: string;
}

export function ActiveOpportunitiesTable({ className }: ActiveOpportunitiesTableProps) {
  const router = useRouter();
  const [rows, setRows] = useState<ActiveOpportunity[]>(() => [...ACTIVE_OPPORTUNITIES]);

  const hubRows = useMemo(() => rows.map(toHubRow), [rows]);

  function updateStatus(id: string, status: OpportunityStatus) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  function togglePublish(item: ActiveOpportunity) {
    if (item.status === 'Closed') {
      updateStatus(item.id, 'Active');
      return;
    }
    updateStatus(item.id, item.status === 'Active' ? 'Draft' : 'Active');
  }

  function handleDelete(id: string) {
    setRows((current) => current.filter((row) => row.id !== id));
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

          {rows.map((item, index) => {
            const published = item.status === 'Active';
            const hubRow = hubRows[index];
            return (
              <div key={item.id} className={`grid w-full gap-x-2.5 ${GRID_COLS}`}>
                <div className="truncate py-3.5 text-sm leading-[18px] text-[#44516A]">{item.name}</div>
                <div className="flex items-center py-3.5">
                  <span
                    className={`inline-flex rounded-[6px] px-1.5 py-0.5 text-sm font-medium leading-[18px] ${OPPORTUNITY_STATUS_STYLES[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="py-3.5 text-sm leading-[18px] text-[#44516A]">{item.applications}</div>
                <div className="py-3.5 text-sm leading-[18px] text-[#44516A]">{item.postedDate}</div>
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
                    row={hubRow}
                    compact
                    onDelete={handleDelete}
                    onArchive={handleArchive}
                    onPause={handlePause}
                    onExtendDeadline={(id, date) => {
                      setRows((current) =>
                        current.map((row) => (row.id === id ? { ...row, deadline: date } : row)),
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
