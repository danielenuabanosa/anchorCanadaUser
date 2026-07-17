'use client';

import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubMenuSelect, type HubMenuOption } from './HubMenuSelect';

export interface HubFilterMenuDef {
  id: string;
  /** Chip label when no/default value selected */
  label: string;
  value: string;
  options: HubMenuOption[];
  onChange: (value: string) => void;
}

interface HubFilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** Legacy chrome-only chips (Applications etc. opening a modal). */
  filters?: readonly string[];
  onFilterClick?: (label: string) => void;
  /** Interactive per-chip menus (Opportunities hub Figma). */
  filterMenus?: HubFilterMenuDef[];
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
  filterMenus,
  clearLabel = 'Clear Filters',
  onClear,
  trailing,
  className,
}: HubFilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3', className)}>
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="anchor-search-field w-[300px] shrink-0">
          <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" aria-hidden />
          <input
            type="text"
            value={searchValue ?? ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="no-anchor-field min-w-0 flex-1 bg-transparent font-sans text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
          />
        </div>

        {filterMenus?.map((menu) => (
          <HubMenuSelect
            key={menu.id}
            variant="chip"
            label={menu.label}
            value={menu.value}
            options={menu.options}
            onChange={menu.onChange}
            aria-label={menu.label}
          />
        ))}

        {!filterMenus &&
          filters?.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onFilterClick?.(label)}
              className="inline-flex h-[45px] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-[6px] border border-[#EEF2F8] bg-white px-3 text-sm text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
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
            className="inline-flex h-[45px] shrink-0 items-center whitespace-nowrap rounded-[6px] px-3 text-sm font-normal text-[#2F66C8] transition-colors hover:text-[#1D4ED8]"
          >
            {clearLabel}
          </button>
        ) : null}
        {trailing}
      </div>
    </div>
  );
}
