'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import { providerApi } from '@/features/provider/services/providerApi';
import avatar1 from '@assets/images/profile-avatar.png';
import {
  TEAM_PERFORMANCE_PERIOD_OPTIONS,
  getTeamPerformanceMetrics,
} from './teamManagementData';

type LiveActivity = {
  id: string;
  memberName: string;
  action: string;
  timeLabel: string;
  isNew?: boolean;
};

export function RecentTeamActivityPanel({ className }: { className?: string }) {
  const [items, setItems] = useState<LiveActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await providerApi.getTeamActivity(10);
        if (cancelled) return;
        setItems(
          data.map((row) => ({
            id: row.id,
            memberName: row.memberName,
            action: row.action,
            timeLabel: row.timeLabel,
            isNew: Boolean(row.isNew),
          })),
        );
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Recent Activity</h3>
        <Link href="/applications" className="text-sm font-medium text-[#2F66C8]">
          View All
        </Link>
      </div>

      <ul className="mt-5 flex flex-col">
        {loading && items.length === 0 ? (
          <li className="py-6 text-sm text-[#8C97AD]">Loading activity…</li>
        ) : items.length === 0 ? (
          <li className="py-6 text-sm text-[#8C97AD]">No recent team activity yet.</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="border-b border-[#EEF2F8] py-3.5 last:border-b-0">
              <div className="flex items-center gap-4">
                <Image
                  src={avatar1}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                  <p className="min-w-0 text-sm text-[#0F172A]">
                    <span className="font-medium">{item.memberName}</span>{' '}
                    <span className="text-[#44516A]">{item.action}</span>
                  </p>
                  <div className="flex shrink-0 items-center gap-5">
                    <span className="whitespace-nowrap text-sm text-[#44516A]">{item.timeLabel}</span>
                    {item.isNew ? (
                      <span className="rounded-[4px] border border-[#DCE7FF] bg-[#EFF4FF] px-1.5 py-0.5 text-sm font-medium text-[#2F66C8]">
                        New
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function TeamPerformancePanel({ className }: { className?: string }) {
  const [period, setPeriod] = useState<string>(TEAM_PERFORMANCE_PERIOD_OPTIONS[0].value);
  const fallback = useMemo(() => getTeamPerformanceMetrics(period), [period]);
  const [metrics, setMetrics] = useState(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      const base = getTeamPerformanceMetrics(period);
      try {
        const data = await providerApi.getTeamPerformance(
          period === '7d' || period === '30d' || period === 'year' ? period : '30d',
        );
        if (cancelled) return;
        if (data?.metrics?.length) {
          const byLabel = new Map(data.metrics.map((m) => [m.label.toLowerCase(), m]));
          setMetrics(
            base.map((metric) => {
              const live =
                byLabel.get(metric.label.toLowerCase()) ||
                [...byLabel.values()].find((m) =>
                  metric.label.toLowerCase().includes(m.label.toLowerCase().split(' ')[0] ?? ''),
                );
              if (!live) return metric;
              return {
                ...metric,
                value: live.value,
                change: live.trend.replace(/^\+/, '') || metric.change,
              };
            }),
          );
        } else {
          setMetrics(base);
        }
      } catch {
        if (!cancelled) setMetrics(base);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [period]);

  return (
    <div
      className={cn(
        'flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Team Performance</h3>
        <HubMenuSelect
          variant="chip"
          value={period}
          onChange={setPeriod}
          options={[...TEAM_PERFORMANCE_PERIOD_OPTIONS]}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="flex items-start justify-between gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4"
            >
              <div>
                <p className="text-xs text-[#8C97AD]">{metric.label}</p>
                <p className="mt-2 text-xl font-bold text-[#0F172A]">
                  {loading ? '…' : metric.value}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#15803D]">
                  <ArrowUp className="h-3 w-3" />
                  {metric.change}
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-[#2F66C8]">
                <Icon className="h-4 w-4" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TeamHubBottomSections() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <RecentTeamActivityPanel />
      <TeamPerformancePanel />
    </div>
  );
}
