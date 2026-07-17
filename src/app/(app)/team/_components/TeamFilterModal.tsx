'use client';

import { useEffect, useState } from 'react';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import {
  DEFAULT_TEAM_HUB_FILTERS,
  TEAM_DEPARTMENT_FILTER_OPTIONS,
  TEAM_ROLE_FILTER_OPTIONS,
  TEAM_STATUS_FILTER_OPTIONS,
  type TeamHubFilters,
} from './teamManagementData';

interface TeamFilterModalProps {
  open: boolean;
  onClose: () => void;
  value?: TeamHubFilters;
  onApply?: (filters: TeamHubFilters) => void;
}

export function TeamFilterModal({
  open,
  onClose,
  value = DEFAULT_TEAM_HUB_FILTERS,
  onApply,
}: TeamFilterModalProps) {
  const [selections, setSelections] = useState<TeamHubFilters>(value);

  useEffect(() => {
    if (open) setSelections(value);
  }, [open, value]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:bg-black/40 md:p-4">
      <button type="button" className="absolute inset-0 bg-black/30 md:hidden" onClick={onClose} aria-label="Close" />
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-hidden rounded-t-[10px] border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)] md:static md:max-h-[90vh] md:w-full md:max-w-[480px] md:rounded-[10px]">
        <div className="border-b border-[#EEF2F8] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0F172A]">Filters</h2>
            <button
              type="button"
              onClick={() => setSelections(DEFAULT_TEAM_HUB_FILTERS)}
              className="text-sm text-[#2F66C8]"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto p-5">
          <HubMenuSelect
            variant="field"
            label="All Roles"
            value={selections.role}
            options={[...TEAM_ROLE_FILTER_OPTIONS]}
            onChange={(role) => setSelections((s) => ({ ...s, role }))}
          />
          <HubMenuSelect
            variant="field"
            label="All Statuses"
            value={selections.status}
            options={[...TEAM_STATUS_FILTER_OPTIONS]}
            onChange={(status) => setSelections((s) => ({ ...s, status }))}
          />
          <HubMenuSelect
            variant="field"
            label="All Departments"
            value={selections.department}
            options={[...TEAM_DEPARTMENT_FILTER_OPTIONS]}
            onChange={(department) => setSelections((s) => ({ ...s, department }))}
          />
        </div>

        <div className="flex gap-3 border-t border-[#EEF2F8] p-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[6px] border border-[#EEF2F8] bg-white py-2.5 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onApply?.(selections);
              onClose();
            }}
            className="flex-1 rounded-[6px] bg-[#2F66C8] py-2.5 text-sm font-medium text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
