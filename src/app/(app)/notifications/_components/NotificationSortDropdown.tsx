'use client';

import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import { NOTIFICATION_SORT_OPTIONS, type NotificationSort } from './notificationsData';

const SORT_OPTIONS = NOTIFICATION_SORT_OPTIONS.map((option) => ({
  value: option.id,
  label: option.label,
}));

export function NotificationSortDropdown({
  value,
  onChange,
  compact,
}: {
  value: NotificationSort;
  onChange: (value: NotificationSort) => void;
  compact?: boolean;
}) {
  return (
    <HubSortSelect
      value={value}
      onChange={(next) => onChange(next as NotificationSort)}
      options={SORT_OPTIONS}
      showLabel={!compact}
      className={compact ? 'w-full flex-1 [&_button]:w-full [&_button]:justify-center' : undefined}
      menuClassName="w-[180px]"
    />
  );
}
