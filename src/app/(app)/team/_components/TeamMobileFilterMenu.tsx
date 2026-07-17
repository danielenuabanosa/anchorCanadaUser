'use client';

import { useEffect, useRef } from 'react';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import {
  TEAM_DEPARTMENT_FILTER_OPTIONS,
  TEAM_ROLE_FILTER_OPTIONS,
  TEAM_STATUS_FILTER_OPTIONS,
  type TeamHubFilters,
} from './teamManagementData';

interface TeamMobileFilterMenuProps {
  open: boolean;
  onClose: () => void;
  value: TeamHubFilters;
  onChange: (filters: TeamHubFilters) => void;
}

/** Stacked filter selects under the Filters button — matches Applications hub pattern. */
export function TeamMobileFilterMenu({ open, onClose, value, onChange }: TeamMobileFilterMenuProps) {
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
          label="All Roles"
          value={value.role}
          options={[...TEAM_ROLE_FILTER_OPTIONS]}
          onChange={(role) => onChange({ ...value, role })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
        <HubMenuSelect
          variant="chip"
          label="All Statuses"
          value={value.status}
          options={[...TEAM_STATUS_FILTER_OPTIONS]}
          onChange={(status) => onChange({ ...value, status })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
        <HubMenuSelect
          variant="chip"
          label="All Departments"
          value={value.department}
          options={[...TEAM_DEPARTMENT_FILTER_OPTIONS]}
          onChange={(department) => onChange({ ...value, department })}
          className="w-full [&_button]:w-full [&_button]:justify-between"
          menuClassName="left-auto right-0 w-full min-w-full"
        />
      </div>
    </div>
  );
}
