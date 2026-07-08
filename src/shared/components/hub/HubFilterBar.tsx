'use client';

import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HubFilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters: readonly string[];
  onFilterClick?: (label: string) => void;
  clearLabel?: string;
  onClear?: () => void;
  trailing?: React.ReactNode;
  className?: string;
}

export function HubFilterBar({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filters,
  onFilterClick,
  clearLabel = 'Clear Filters',
  onClear,
  trailing,
  className,
}: HubFilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3', className)}>
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative h-[45px] w-full min-w-[200px] max-w-[300px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#8C97AD]" />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="anchor-field anchor-field--icon-left h-full pr-3 text-sm"
          />
        </div>
        {filters.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => onFilterClick?.(label)}
            className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-3 text-sm text-[#0F172A]"
          >
            {label}
            <ChevronDown className="h-3.5 w-3.5 text-[#44516A]" />
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-[45px] items-center rounded-[6px] bg-[#F8FAFC] px-3 text-sm font-medium text-[#2F66C8]"
          >
            {clearLabel}
          </button>
        ) : null}
        {trailing}
      </div>
    </div>
  );
}
