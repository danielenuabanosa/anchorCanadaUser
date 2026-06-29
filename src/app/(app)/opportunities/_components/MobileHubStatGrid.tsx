import { ArrowUp } from 'lucide-react';
import type { ElementType } from 'react';
import { cn } from '@/lib/utils';

export interface MobileHubStat {
  label: string;
  value: string | number;
  change?: string;
  subtext?: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

interface MobileHubStatGridProps {
  stats: MobileHubStat[];
}

function MobileStatIcon({ icon: Icon, iconBg, iconColor }: Pick<MobileHubStat, 'icon' | 'iconBg' | 'iconColor'>) {
  return (
    <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl', iconBg)}>
      <Icon className={cn('h-4 w-4', iconColor)} strokeWidth={1.75} />
    </span>
  );
}

function TrendRow({ change, subtext }: { change?: string; subtext?: string }) {
  if (!change && !subtext) return null;

  return (
    <div className="flex items-center gap-1.5">
      {change ? (
        <span className="inline-flex items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-[10px] leading-[13px] text-[#15803D]">
          <ArrowUp className="h-2.5 w-2.5" />
          {change}
        </span>
      ) : null}
      {subtext ? <span className="text-[10px] leading-[13px] text-[#8C97AD]">{subtext}</span> : null}
    </div>
  );
}

export function MobileHubStatGrid({ stats }: MobileHubStatGridProps) {
  const [featured, ...gridStats] = stats;

  return (
    <div className="flex flex-col gap-2.5">
      {featured ? (
        <div className="flex gap-5 rounded-[8px] border border-[#EEF2F8] bg-white p-4">
          <MobileStatIcon {...featured} />
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
            <div>
              <p className="text-xs leading-4 text-[#44516A]">{featured.label}</p>
              <p className="text-2xl font-bold leading-[31px] text-[#0F172A]">{featured.value}</p>
            </div>
            <TrendRow change={featured.change} subtext={featured.subtext} />
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2.5">
        {gridStats.map((stat) => (
          <div
            key={stat.label}
            className="flex h-[158px] flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4"
          >
            <MobileStatIcon {...stat} />
            <div>
              <p className="text-xs leading-4 text-[#44516A]">{stat.label}</p>
              <p className="text-2xl font-bold leading-[31px] text-[#0F172A]">{stat.value}</p>
              <div className="mt-1">
                <TrendRow change={stat.change} subtext={stat.subtext} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
