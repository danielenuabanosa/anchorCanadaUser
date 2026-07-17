'use client';

import { useEffect, useState } from 'react';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import {
  APP_OPPORTUNITY_FILTER_OPTIONS,
  APP_REVIEWER_FILTER_OPTIONS,
  APP_STATUS_FILTER_OPTIONS,
  APP_TIME_FILTER_OPTIONS,
  APP_TYPE_FILTER_OPTIONS,
  DEFAULT_APP_HUB_FILTERS,
  type ApplicationHubFilters,
} from './applicationsHubData';

interface ApplicationFilterModalProps {
  open: boolean;
  onClose: () => void;
  value?: ApplicationHubFilters;
  onApply?: (filters: ApplicationHubFilters) => void;
}

export function ApplicationFilterModal({
  open,
  onClose,
  value = DEFAULT_APP_HUB_FILTERS,
  onApply,
}: ApplicationFilterModalProps) {
  const [selections, setSelections] = useState<ApplicationHubFilters>(value);

  useEffect(() => {
    if (open) setSelections(value);
  }, [open, value]);

  if (!open) return null;

  function clearAll() {
    setSelections(DEFAULT_APP_HUB_FILTERS);
  }

  return (
    <div className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:bg-black/40 md:p-4">
      <button type="button" className="absolute inset-0 bg-black/30 md:hidden" onClick={onClose} aria-label="Close" />
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-hidden rounded-t-[10px] border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)] md:static md:max-h-[90vh] md:w-full md:max-w-[480px] md:rounded-[10px]">
        <div className="border-b border-[#EEF2F8] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0F172A]">Filters</h2>
            <button type="button" onClick={clearAll} className="text-sm text-[#2F66C8]">
              Clear all
            </button>
          </div>
        </div>

        <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto p-5">
          <HubMenuSelect
            variant="field"
            label="Opportunity"
            value={selections.opportunity}
            options={[...APP_OPPORTUNITY_FILTER_OPTIONS]}
            onChange={(opportunity) => setSelections((s) => ({ ...s, opportunity }))}
          />
          <HubMenuSelect
            variant="field"
            label="Status"
            value={selections.status}
            options={[...APP_STATUS_FILTER_OPTIONS]}
            onChange={(status) => setSelections((s) => ({ ...s, status }))}
          />
          <HubMenuSelect
            variant="field"
            label="Type"
            value={selections.type}
            options={[...APP_TYPE_FILTER_OPTIONS]}
            onChange={(type) => setSelections((s) => ({ ...s, type }))}
          />
          <HubMenuSelect
            variant="field"
            label="Reviewer"
            value={selections.reviewer}
            options={[...APP_REVIEWER_FILTER_OPTIONS]}
            onChange={(reviewer) => setSelections((s) => ({ ...s, reviewer }))}
          />
          <HubMenuSelect
            variant="field"
            label="Time"
            value={selections.time}
            options={[...APP_TIME_FILTER_OPTIONS]}
            onChange={(time) => setSelections((s) => ({ ...s, time }))}
          />
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
            onClick={() => {
              onApply?.(selections);
              onClose();
            }}
            className="min-w-[140px] rounded-[6px] bg-[#2F66C8] px-4 py-2.5 text-sm font-medium text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
