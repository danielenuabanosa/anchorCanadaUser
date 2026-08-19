'use client';

import { Command, Search } from 'lucide-react';

type TopbarSearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export function TopbarSearchField({
  value,
  onChange,
  placeholder = 'Search opportunities, applications or applicants…',
  ariaLabel = 'Search opportunities, applications or applicants',
}: TopbarSearchFieldProps) {
  return (
    <div className="anchor-search-nav w-full">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" strokeWidth={1.75} aria-hidden />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="no-anchor-field min-w-0 flex-1 bg-transparent font-sans text-base leading-none text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
          aria-label={ariaLabel}
        />
      </div>
      <div className="flex shrink-0 items-center gap-2.5 text-[#44516A]" aria-hidden>
        <Command className="h-[18px] w-[18px]" strokeWidth={1.75} />
        <span className="font-sans text-lg leading-none">K</span>
      </div>
    </div>
  );
}
