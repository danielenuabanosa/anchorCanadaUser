'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { HubFilterField } from '@/shared/components/hub/HubFilterField';
import { FILTER_LABELS } from './applicationsHubData';

interface ApplicationFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply?: () => void;
}

const FILTER_OPTIONS: Record<string, string[]> = {
  'All Opportunities': ['All Opportunities', 'Youth Innovation Grant', 'Healthcare Access Grant', 'Digital Skills Scholarship'],
  'All Statuses': ['All Statuses', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'],
  'All Types': ['All Types', 'Internal', 'External', 'Express Interest'],
  'All Reviewers': ['All Reviewers', 'Michael Adams', 'Jessica Lee', 'Sarah Patel'],
  'All Time': ['All Time', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom range'],
};

const FILTER_DEFAULTS: Record<string, string> = Object.fromEntries(FILTER_LABELS.map((l) => [l, l]));

export function ApplicationFilterModal({ open, onClose, onApply }: ApplicationFilterModalProps) {
  const [selections, setSelections] = useState(FILTER_DEFAULTS);

  if (!open) return null;

  function clearAll() {
    setSelections(FILTER_DEFAULTS);
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
          {FILTER_LABELS.map((label) => (
            <HubFilterField
              key={label}
              label={label}
              value={selections[label]}
              icon={ChevronDown}
              onClick={() => {
                const options = FILTER_OPTIONS[label] ?? [label];
                const idx = options.indexOf(selections[label]);
                setSelections((s) => ({
                  ...s,
                  [label]: options[(idx + 1) % options.length],
                }));
              }}
            />
          ))}
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
              onApply?.();
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
