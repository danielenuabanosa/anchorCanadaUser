import { ArrowDown, ArrowUp } from 'lucide-react';
import type { ElementType } from 'react';

interface HubStatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeNegative?: boolean;
  subtext?: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

export function HubStatCard({
  label,
  value,
  change,
  changeNegative,
  subtext,
  icon: Icon,
  iconBg,
  iconColor,
}: HubStatCardProps) {
  return (
    <div className="flex h-[158px] w-full flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4">
      <span className={`flex h-8 w-8 items-center justify-center rounded-2xl ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </span>
      <div>
        <p className="text-base leading-4 text-[#44516A]">{label}</p>
        <p className="text-[31px] font-bold leading-[31px] text-[#0F172A]">{value}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {change ? (
            <span
              className={`inline-flex items-center gap-1 rounded px-1 py-0.5 text-[13px] leading-[13px] ${
                changeNegative ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#ECFDF5] text-[#15803D]'
              }`}
            >
              {changeNegative ? <ArrowDown className="h-2.5 w-2.5" /> : <ArrowUp className="h-2.5 w-2.5" />}
              {change}
            </span>
          ) : null}
          {subtext ? <span className="text-[13px] leading-[13px] text-[#8C97AD]">{subtext}</span> : null}
        </div>
      </div>
    </div>
  );
}
