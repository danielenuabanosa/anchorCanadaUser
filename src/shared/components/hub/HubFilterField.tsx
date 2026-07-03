'use client';

import type { ElementType } from 'react';
import { cn } from '@/lib/utils';

interface HubFilterFieldProps {
  label: string;
  value: string;
  icon?: ElementType;
  onClick?: () => void;
  className?: string;
}

export function HubFilterField({ label, value, icon: Icon, onClick, className }: HubFilterFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <p className="text-sm font-medium text-[#0F172A]">{label}</p>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-2.5 rounded-[10px] border border-[#EEF2F8] bg-white p-3.5 text-left text-sm text-[#0F172A]"
      >
        <span className="min-w-0 flex-1 truncate">{value}</span>
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-[#44516A]" strokeWidth={1.75} /> : null}
      </button>
    </div>
  );
}
