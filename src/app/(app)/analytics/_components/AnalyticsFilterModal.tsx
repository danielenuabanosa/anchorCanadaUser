'use client';

import { CalendarDays, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { HubFilterField } from '@/shared/components/hub/HubFilterField';

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

export function AnalyticsFilterModal({
  open,
  onClose,
  mobile,
  dateRange = DEFAULT_FILTERS.dateRange,
  onApply,
}: AnalyticsFilterModalProps) {
  const [filters, setFilters] = useState<AnalyticsFilters>({ ...DEFAULT_FILTERS, dateRange });

  if (!open) return null;

  function clearAll() {
    setFilters(DEFAULT_FILTERS);
  }

  function handleApply() {
    onApply?.(filters);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close filter" />
      <div
        className={`relative w-full max-w-[480px] overflow-hidden rounded-t-[10px] border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)] md:rounded-[10px] ${mobile ? 'max-h-[85vh] overflow-y-auto' : ''}`}
      >
        <div className="border-b border-[#EEF2F8] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0F172A]">Filters</h2>
            <button type="button" onClick={clearAll} className="text-sm text-[#2F66C8]">
              Clear all
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <HubFilterField label="Question Label" value={filters.dateRange} icon={CalendarDays} />
          <HubFilterField
            label="Opportunity"
            value={filters.opportunity}
            icon={ChevronDown}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                opportunity: f.opportunity === 'All Opportunities' ? 'Youth Innovation Grant' : 'All Opportunities',
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
                opportunityType: f.opportunityType === 'All Types' ? 'Internal' : 'All Types',
              }))
            }
          />
          <HubFilterField label="Team Member" value={filters.teamMember} icon={ChevronDown} />
          <HubFilterField label="Departments" value={filters.departments} icon={ChevronDown} />
        </div>

        <div className="flex justify-end gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-5">
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
            className="min-w-[140px] rounded-[6px] bg-[#2F66C8] px-4 py-2.5 text-sm font-medium text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
