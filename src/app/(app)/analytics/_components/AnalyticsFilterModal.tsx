'use client';

import { CalendarDays, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HubFilterField } from '@/shared/components/hub/HubFilterField';
import { ANALYTICS_FILTER_OPTIONS } from './analyticsData';

interface AnalyticsFilterModalProps {
  open: boolean;
  onClose: () => void;
  mobile?: boolean;
  dateRange?: string;
  onApply?: (filters: AnalyticsFilters) => void;
}

export interface AnalyticsFilters {
  dateRange: string;
  opportunity: string;
  opportunityType: string;
  teamMember: string;
  departments: string;
}

const DEFAULT_FILTERS: AnalyticsFilters = {
  dateRange: 'May 1 - May 31, 2026',
  opportunity: 'All Opportunities',
  opportunityType: 'All Types',
  teamMember: 'All Members',
  departments: 'All Departments',
};

function cycleValue<T extends string>(current: T, options: readonly T[]): T {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length] ?? options[0];
}

/** Figma 609:26071 */
export function AnalyticsFilterModal({
  open,
  onClose,
  mobile,
  dateRange = DEFAULT_FILTERS.dateRange,
  onApply,
}: AnalyticsFilterModalProps) {
  const [filters, setFilters] = useState<AnalyticsFilters>({ ...DEFAULT_FILTERS, dateRange });

  useEffect(() => {
    if (open) {
      setFilters((current) => ({ ...current, dateRange }));
    }
  }, [open, dateRange]);

  if (!open) return null;

  function clearAll() {
    setFilters({ ...DEFAULT_FILTERS, dateRange });
  }

  function handleApply() {
    onApply?.(filters);
    onClose();
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex ${mobile ? 'items-end' : 'items-center'} justify-center ${mobile ? '' : 'p-4'}`}
      role="dialog"
      aria-modal="true"
    >
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close filter" />
      <div
        className={`relative w-full overflow-hidden border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)] ${
          mobile ? 'max-h-[85vh] overflow-y-auto rounded-t-[10px]' : 'max-w-[480px] rounded-[10px]'
        }`}
      >
        <div className="border-b border-[#EEF2F8] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0F172A]">Filters</h2>
            <button type="button" onClick={clearAll} className="text-sm text-[#2F66C8]">
              Clear all
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white p-5">
          <HubFilterField label="Question Label" value={filters.dateRange} icon={CalendarDays} />
          <HubFilterField
            label="Opportunity"
            value={filters.opportunity}
            icon={ChevronDown}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                opportunity: cycleValue(f.opportunity, ANALYTICS_FILTER_OPTIONS.opportunity),
              }))
            }
          />
          <HubFilterField
            label="Opportunity Type"
            value={filters.opportunityType}
            icon={ChevronDown}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                opportunityType: cycleValue(f.opportunityType, ANALYTICS_FILTER_OPTIONS.opportunityType),
              }))
            }
          />
          <HubFilterField
            label="Team Member"
            value={filters.teamMember}
            icon={ChevronDown}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                teamMember: cycleValue(f.teamMember, ANALYTICS_FILTER_OPTIONS.teamMember),
              }))
            }
          />
          <HubFilterField
            label="Departments"
            value={filters.departments}
            icon={ChevronDown}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                departments: cycleValue(f.departments, ANALYTICS_FILTER_OPTIONS.departments),
              }))
            }
          />
        </div>

        <div className="flex justify-end border-t border-[#EEF2F8] bg-[#F8FAFC] p-5">
          <div className="flex w-full max-w-[257px] gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="min-w-0 flex-1 rounded-[6px] bg-[#2F66C8] px-4 py-2.5 text-sm font-medium text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
