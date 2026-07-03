'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DateRangeDropdown,
  type DateRangeOption,
} from '@/shared/components/hub/DateRangeDropdown';
import { HubFilterField } from '@/shared/components/hub/HubFilterField';

interface NotificationsFilterModalProps {
  open: boolean;
  onClose: () => void;
  mobile?: boolean;
  typeOptions?: string[];
  statusOptions?: string[];
}

export function NotificationsFilterModal({
  open,
  onClose,
  mobile,
  typeOptions = ['All types', 'Applications', 'Team', 'Opportunities', 'Security'],
  statusOptions = ['All', 'Unread only', 'Read only'],
}: NotificationsFilterModalProps) {
  const [dateRange, setDateRange] = useState<DateRangeOption>('Last 30 days');
  const [dateOpen, setDateOpen] = useState(false);
  const [type, setType] = useState(typeOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
      <div
        className={`relative w-full max-w-[480px] overflow-hidden rounded-t-[10px] border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)] md:rounded-[10px] ${mobile ? 'max-h-[85vh] overflow-y-auto' : ''}`}
      >
        <div className="border-b border-[#EEF2F8] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0F172A]">Filters</h2>
            <button
              type="button"
              onClick={() => {
                setDateRange('Last 30 days');
                setType(typeOptions[0]);
                setStatus(statusOptions[0]);
              }}
              className="text-sm text-[#2F66C8]"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="relative">
            <HubFilterField
              label="Date Range"
              value={dateRange}
              icon={ChevronDown}
              onClick={() => setDateOpen((o) => !o)}
            />
            <DateRangeDropdown
              open={dateOpen}
              onClose={() => setDateOpen(false)}
              value={dateRange}
              onChange={setDateRange}
              align="left"
              className="left-0 w-full"
            />
          </div>
          <HubFilterField
            label="Type"
            value={type}
            icon={ChevronDown}
            onClick={() => {
              const idx = typeOptions.indexOf(type);
              setType(typeOptions[(idx + 1) % typeOptions.length]);
            }}
          />
          <HubFilterField
            label="Status"
            value={status}
            icon={ChevronDown}
            onClick={() => {
              const idx = statusOptions.indexOf(status);
              setStatus(statusOptions[(idx + 1) % statusOptions.length]);
            }}
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
            onClick={onClose}
            className="min-w-[140px] rounded-[6px] bg-[#2F66C8] px-4 py-2.5 text-sm font-medium text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
