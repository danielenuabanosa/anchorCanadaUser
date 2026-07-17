'use client';

import { useEffect, useState } from 'react';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
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

function toMenuOptions(options: readonly string[]) {
  return options.map((label) => ({ value: label, label }));
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
          <HubMenuSelect
            variant="field"
            label="Date Range"
            value={filters.dateRange}
            options={[
              { value: filters.dateRange, label: filters.dateRange },
              { value: 'Last 7 days', label: 'Last 7 days' },
              { value: 'Last 30 days', label: 'Last 30 days' },
              { value: 'Last 90 days', label: 'Last 90 days' },
              { value: 'This year', label: 'This year' },
              { value: 'Custom range', label: 'Custom range' },
            ].filter(
              (opt, index, arr) => arr.findIndex((o) => o.value === opt.value) === index,
            )}
            onChange={(value) => setFilters((f) => ({ ...f, dateRange: value }))}
          />
          <HubMenuSelect
            variant="field"
            label="Opportunity"
            value={filters.opportunity}
            options={toMenuOptions(ANALYTICS_FILTER_OPTIONS.opportunity)}
            onChange={(value) => setFilters((f) => ({ ...f, opportunity: value }))}
          />
          <HubMenuSelect
            variant="field"
            label="Opportunity Type"
            value={filters.opportunityType}
            options={toMenuOptions(ANALYTICS_FILTER_OPTIONS.opportunityType)}
            onChange={(value) => setFilters((f) => ({ ...f, opportunityType: value }))}
          />
          <HubMenuSelect
            variant="field"
            label="Team Member"
            value={filters.teamMember}
            options={toMenuOptions(ANALYTICS_FILTER_OPTIONS.teamMember)}
            onChange={(value) => setFilters((f) => ({ ...f, teamMember: value }))}
          />
          <HubMenuSelect
            variant="field"
            label="Departments"
            value={filters.departments}
            options={toMenuOptions(ANALYTICS_FILTER_OPTIONS.departments)}
            onChange={(value) => setFilters((f) => ({ ...f, departments: value }))}
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
