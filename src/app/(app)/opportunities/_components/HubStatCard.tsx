import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import type { ElementType } from 'react';

interface HubStatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeNegative?: boolean;
  subtext?: string;
  actionLink?: string;
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
  actionLink,
  icon: Icon,
  iconBg,
  iconColor,
}: HubStatCardProps) {
  return (
    <div className="flex h-[158px] w-full flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4">
      <span className={`flex h-8 w-8 items-center justify-center rounded-2xl ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={1.75} />
      </span>
      <div className="flex h-20 flex-col justify-between">
        <div className="space-y-1.5">
          <p className="text-xs leading-none text-[#44516A]">{label}</p>
          <p className="text-2xl font-bold leading-none text-[#0F172A]">{value}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {actionLink ? (
            <span className="inline-flex items-center gap-1 rounded-[2px] bg-[#EFF4FF] px-1 py-0.5 text-[10px] leading-none text-[#2F66C8]">
              {actionLink}
              <ArrowRight className="h-2.5 w-2.5" strokeWidth={2.5} />
            </span>
          ) : (
            <>
              {change ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-[2px] px-1 py-0.5 text-[10px] leading-none ${
                    changeNegative ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#ECFDF5] text-[#15803D]'
                  }`}
                >
                  {changeNegative ? (
                    <ArrowDown className="h-2.5 w-2.5" strokeWidth={2.5} />
                  ) : (
                    <ArrowUp className="h-2.5 w-2.5" strokeWidth={2.5} />
                  )}
                  {change}
                </span>
              ) : null}
              {subtext ? <span className="text-[10px] leading-none text-[#8C97AD]">{subtext}</span> : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
