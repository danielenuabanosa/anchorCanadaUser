'use client';

import type { ElementType } from 'react';
import { ArrowUp } from './dashboardData';

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  changePct: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

export function DashboardStatCard({
  label,
  value,
  changePct,
  icon: Icon,
  iconBg,
  iconColor,
}: DashboardStatCardProps) {
  return (
    <div className="flex h-[158px] flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4">
      <div className={`flex h-8 w-8 items-center justify-center rounded-2xl ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-xs leading-4 text-[#44516A]">{label}</p>
        <p className="mt-1.5 text-2xl font-bold leading-[31px] text-[#0F172A]">{value}</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-[10px] leading-none text-[#15803D]">
            <ArrowUp className="h-2.5 w-2.5" />
            {changePct}
          </span>
          <span className="text-[10px] leading-none text-[#8C97AD]">vs last week</span>
        </div>
      </div>
    </div>
  );
}
