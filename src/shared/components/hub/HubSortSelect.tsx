'use client';

import { cn } from '@/lib/utils';
import { HubMenuSelect, type HubMenuOption } from './HubMenuSelect';

/** Default hub sort options (Applications / Team / Analytics tables). */
export const DEFAULT_HUB_SORT_OPTIONS: HubMenuOption[] = [
  { value: 'newest', label: 'Newest Applied' },
  { value: 'oldest', label: 'Oldest Applied' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
];

interface HubSortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: HubMenuOption[];
  /** Show the "Sort by:" label prefix (default true). */
  showLabel?: boolean;
  className?: string;
  menuClassName?: string;
  align?: 'left' | 'right';
}

/**
 * Shared Figma "Sort by:" control for provider hub tables.
 * Uses HubMenuSelect chip styling for consistency with filter chips.
 */
export function HubSortSelect({
  value,
  onChange,
  options = DEFAULT_HUB_SORT_OPTIONS,
  showLabel = true,
  className,
  menuClassName,
  align = 'right',
}: HubSortSelectProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {showLabel ? <span className="shrink-0 text-sm text-[#44516A]">Sort by:</span> : null}
      <HubMenuSelect
        variant="chip"
        value={value}
        options={options}
        onChange={onChange}
        aria-label="Sort by"
        className="shrink-0"
        menuClassName={cn(
          align === 'right' ? 'left-auto right-0' : 'left-0 right-auto',
          'w-[200px]',
          menuClassName,
        )}
      />
    </div>
  );
}
