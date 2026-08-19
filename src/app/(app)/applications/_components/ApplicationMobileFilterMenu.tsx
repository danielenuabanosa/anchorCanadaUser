'use client';

import { useEffect, useRef } from 'react';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import {
  APP_STATUS_FILTER_OPTIONS,
  APP_TIME_FILTER_OPTIONS,
  APP_TYPE_FILTER_OPTIONS,
  type ApplicationHubFilters,
} from './applicationsHubData';

interface ApplicationMobileFilterMenuProps {
  open: boolean;
  onClose: () => void;
  value: ApplicationHubFilters;
  onChange: (filters: ApplicationHubFilters) => void;
  opportunityOptions?: { value: string; label: string }[];
  reviewerOptions?: { value: string; label: string }[];
}

/** Figma 505:11892 — stacked filter selects in a floating card under Filters */
export function ApplicationMobileFilterMenu({
  open,
  onClose,
  value,
  onChange,
  opportunityOptions = [{ value: 'all', label: 'All Opportunities' }],
  reviewerOptions = [{ value: 'all', label: 'All Reviewers' }],
}: ApplicationMobileFilterMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointer(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) onClose();
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+8px)] z-40 w-[200px] rounded-[10px] border border-[#EEF2F8] bg-white p-2.5 shadow-[0px_6px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="flex flex-col gap-2.5">
        <HubMenuSelect
          variant="chip"
          label="All Opportunities"
          value={value.opportunity}
          options={opportunityOptions}
          onChange={(opportunity) => onChange({ ...value, opportunity })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
        <HubMenuSelect
          variant="chip"
          label="All Statuses"
          value={value.status}
          options={[...APP_STATUS_FILTER_OPTIONS]}
          onChange={(status) => onChange({ ...value, status })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
        <HubMenuSelect
          variant="chip"
          label="All Types"
          value={value.type}
          options={[...APP_TYPE_FILTER_OPTIONS]}
          onChange={(type) => onChange({ ...value, type })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
        <HubMenuSelect
          variant="chip"
          label="All Reviewers"
          value={value.reviewer}
          options={reviewerOptions}
          onChange={(reviewer) => onChange({ ...value, reviewer })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
        <HubMenuSelect
          variant="chip"
          label="All Time"
          value={value.time}
          options={[...APP_TIME_FILTER_OPTIONS]}
          onChange={(time) => onChange({ ...value, time })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
      </div>
    </div>
  );
}
