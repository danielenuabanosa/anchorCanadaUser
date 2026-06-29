'use client';

import { cn } from '@/lib/utils';
import { Ellipsis, Eye, Pencil } from 'lucide-react';
import { ACTIVE_OPPORTUNITIES, OPPORTUNITY_STATUS_STYLES } from './dashboardData';
import { DashboardSectionHeader } from './DashboardSectionHeader';

const GRID_COLS =
  'grid-cols-[minmax(160px,198fr)_80px_90px_100px_100px_minmax(120px,1fr)]';

interface ActiveOpportunitiesTableProps {
  className?: string;
}

export function ActiveOpportunitiesTable({ className }: ActiveOpportunitiesTableProps) {
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

          {ACTIVE_OPPORTUNITIES.map((item) => (
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
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-[#44516A]"
                  aria-label={`View ${item.name}`}
                >
                  <Eye className="h-[18px] w-[18px]" />
                </button>
                <button
                  type="button"
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-[#44516A]"
                  aria-label={`Edit ${item.name}`}
                >
                  <Pencil className="h-[18px] w-[18px]" />
                </button>
                <button
                  type="button"
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-[#44516A]"
                  aria-label={`More actions for ${item.name}`}
                >
                  <Ellipsis className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
