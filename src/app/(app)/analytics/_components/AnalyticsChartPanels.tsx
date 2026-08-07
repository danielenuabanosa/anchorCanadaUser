'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown, Lightbulb } from 'lucide-react';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import { ResponsiveChart } from '@/shared/components/charts/ResponsiveChart';
import {
  CHART_GRANULARITY_OPTIONS,
  CHART_TIME_RANGE_OPTIONS,
} from './analyticsData';
import { useAnalyticsData } from './AnalyticsDataContext';
import { ApplicantDemographicsMap } from './ApplicantDemographicsMap';

function ChartPeriodSelect({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex h-[30px] items-center gap-2 rounded-[6px] border border-[#EEF2F8] bg-white px-2.5 py-1.5 text-sm text-[#0F172A]"
      >
        {value}
        <ChevronDown className="h-3.5 w-3.5 text-[#44516A]" />
      </button>
      {open ? (
        <>
          <button type="button" className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-label="Close period menu" />
          <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[170px] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
            {options.map((option) => {
              const selected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]',
                    selected && 'bg-[#F8FAFC]',
                  )}
                >
                  <span className="flex-1">{option}</span>
                  {selected ? <Check className="h-4 w-4 shrink-0 text-[#2F66C8]" strokeWidth={2} /> : <span className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

function PanelShell({
  title,
  periodControl,
  children,
  className,
  footer,
}: {
  title: string;
  periodControl?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}) {
  return (
    <div className={cn('overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white', className)}>
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="text-lg font-medium leading-[25px] text-[#0F172A]">{title}</h2>
        {periodControl}
      </div>
      <div className="p-5 pt-4">{children}</div>
      {footer}
    </div>
  );
}

const CHART_TICK = { fontFamily: 'DM Sans, sans-serif', fontSize: 12, fill: '#8C97AD' } as const;

export function ApplicationsOverTimeChart({ skeleton }: { skeleton?: boolean }) {
  const analytics = useAnalyticsData();
  const [timeRange, setTimeRange] = useState<string>(CHART_TIME_RANGE_OPTIONS[1]);
  const yMax = analytics.applicationsOverTimeYMax;
  const ticks = [0, yMax / 4, yMax / 2, (yMax * 3) / 4, yMax];
  const chartData = analytics.applicationsOverTime;

  if (skeleton) {
    return (
      <PanelShell
        title="Applications Over Time"
        periodControl={
          <ChartPeriodSelect
            options={CHART_TIME_RANGE_OPTIONS}
            value={timeRange}
            onChange={setTimeRange}
          />
        }
      >
        <div className="h-[254px] animate-pulse rounded-[8px] bg-[#EEF2F8]" />
      </PanelShell>
    );
  }

  return (
    <PanelShell
      title="Applications Over Time"
      periodControl={
        <ChartPeriodSelect
          options={CHART_TIME_RANGE_OPTIONS}
          value={timeRange}
          onChange={setTimeRange}
        />
      }
    >
        <div className="flex flex-col gap-6">
          <ResponsiveChart height={254}>
            <LineChart
              data={chartData}
              margin={{ left: -10, right: 8, top: 8, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F8" vertical={false} />
              <XAxis
                dataKey="label"
                tick={CHART_TICK}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={CHART_TICK}
                axisLine={false}
                tickLine={false}
                domain={[0, yMax]}
                ticks={ticks}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #EEF2F8',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Line
                type="monotone"
                dataKey="thisPeriod"
                name="This period"
                stroke="#2F66C8"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#2F66C8' }}
              />
              <Line
                type="monotone"
                dataKey="lastPeriod"
                name="Previous period"
                stroke="#93B4F5"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
                activeDot={{ r: 5, fill: '#93B4F5' }}
              />
            </LineChart>
          </ResponsiveChart>
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center gap-2.5">
            <span className="block h-[3px] w-9 rounded-full bg-[#2F66C8]" />
            <span className="text-sm font-medium text-[#44516A]">This period</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="block h-[3px] w-9 rounded-full"
              style={{
                background:
                  'repeating-linear-gradient(90deg,#93B4F5 0,#93B4F5 6px,transparent 6px,transparent 10px)',
              }}
            />
            <span className="text-sm font-medium text-[#44516A]">Previous period</span>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

export function ApplicationFunnelPanel({ skeleton, mobile }: { skeleton?: boolean; mobile?: boolean }) {
  const { funnel: APPLICATION_FUNNEL } = useAnalyticsData();
  const [granularity, setGranularity] = useState<string>(CHART_GRANULARITY_OPTIONS[0]);

  if (skeleton) {
    return (
      <PanelShell
        title="Application Funnel"
        periodControl={
          <ChartPeriodSelect
            options={CHART_GRANULARITY_OPTIONS}
            value={granularity}
            onChange={setGranularity}
          />
        }
      >
        <div className={cn('flex gap-5', mobile ? 'flex-col' : 'flex-row items-center')}>
          <div
            className={cn(
              'animate-pulse rounded-[8px] bg-[#EEF2F8]',
              mobile ? 'mx-auto h-[260px] w-full max-w-[253px]' : 'h-[260px] w-[253px] shrink-0',
            )}
          />
          <div className="min-w-0 flex-1 divide-y divide-[#EEF2F8] rounded-[8px] border border-[#EEF2F8]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3.5">
                <span className="flex items-center gap-2.5">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-[#EEF2F8]" />
                  <span className="h-4 w-24 animate-pulse rounded bg-[#EEF2F8]" />
                </span>
                <span className="h-4 w-12 animate-pulse rounded bg-[#EEF2F8]" />
              </div>
            ))}
          </div>
        </div>
      </PanelShell>
    );
  }

  const maxWidth = 253;
  const stepHeight = 41;
  const widths = APPLICATION_FUNNEL.map((_, i) => maxWidth - i * 42);

  return (
    <PanelShell
      title="Application Funnel"
      periodControl={
        <ChartPeriodSelect
          options={CHART_GRANULARITY_OPTIONS}
          value={granularity}
          onChange={setGranularity}
        />
      }
    >
      <div className={cn('flex gap-5', mobile ? 'flex-col' : 'flex-row items-center')}>
        <div className={cn('flex flex-col items-center', mobile ? 'mx-auto w-full max-w-[253px]' : 'shrink-0')}>
          {APPLICATION_FUNNEL.map((step, i) => (
            <div
              key={step.label}
              className="rounded-[4px]"
              style={{
                width: widths[i],
                height: stepHeight,
                backgroundColor: step.color,
                marginTop: i > 0 ? 2 : 0,
              }}
            />
          ))}
        </div>
        <div className="min-w-0 flex-1 divide-y divide-[#EEF2F8] rounded-[8px] border border-[#EEF2F8]">
          {APPLICATION_FUNNEL.map((step) => (
            <div key={step.label} className="flex items-center justify-between px-4 py-3.5">
              <span className="flex items-center gap-2.5 text-sm text-[#0F172A]">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: step.color }} />
                {step.label}
              </span>
              <span className="text-sm text-[#44516A]">{step.value}</span>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}


export function ApplicantDemographicsPanel({ skeleton }: { skeleton?: boolean }) {
  const { topCountries: TOP_COUNTRIES } = useAnalyticsData();
  const [granularity, setGranularity] = useState<string>(CHART_GRANULARITY_OPTIONS[0]);

  if (skeleton) {
    return (
      <PanelShell
        title="Applicant Demographics"
        periodControl={
          <ChartPeriodSelect
            options={CHART_GRANULARITY_OPTIONS}
            value={granularity}
            onChange={setGranularity}
          />
        }
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="h-[220px] w-full animate-pulse rounded-[8px] bg-[#EEF2F8] lg:h-[260px] lg:max-w-[320px] lg:shrink-0" />
          <div className="min-w-0 flex-1 divide-y divide-[#EEF2F8] rounded-[8px] border border-[#EEF2F8]">
            <div className="px-4 py-3.5">
              <p className="text-sm font-medium text-[#0F172A]">Top Countries</p>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3.5">
                <span className="h-4 w-28 animate-pulse rounded bg-[#EEF2F8]" />
                <span className="flex items-center gap-5">
                  <span className="h-4 w-10 animate-pulse rounded bg-[#EEF2F8]" />
                  <span className="h-4 w-8 animate-pulse rounded bg-[#EEF2F8]" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell
      title="Applicant Demographics"
      periodControl={
        <ChartPeriodSelect
          options={CHART_GRANULARITY_OPTIONS}
          value={granularity}
          onChange={setGranularity}
        />
      }
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <ApplicantDemographicsMap />
        <div className="min-w-0 flex-1 divide-y divide-[#EEF2F8] rounded-[8px] border border-[#EEF2F8]">
          <div className="px-4 py-3.5">
            <p className="text-sm font-medium text-[#0F172A]">Top Countries</p>
          </div>
          {TOP_COUNTRIES.map((row) => (
            <div key={row.country} className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm text-[#0F172A]">{row.country}</span>
              <span className="flex items-center gap-5 text-sm text-[#44516A]">
                <span>{row.percent}</span>
                <span className="min-w-[24px] text-right">{row.count}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

export function TrafficSourcesPanel({ skeleton }: { skeleton?: boolean }) {
  const { trafficSources: TRAFFIC_SOURCES } = useAnalyticsData();
  const TRAFFIC_SOURCES_PIE = TRAFFIC_SOURCES.map((s) => ({
    name: s.label,
    value: parseFloat(s.percent) || 0,
    color: s.color,
  }));
  const [granularity, setGranularity] = useState<string>(CHART_GRANULARITY_OPTIONS[0]);

  if (skeleton) {
    return (
      <PanelShell
        title="Traffic Sources"
        periodControl={
          <ChartPeriodSelect
            options={CHART_GRANULARITY_OPTIONS}
            value={granularity}
            onChange={setGranularity}
          />
        }
        footer={
          <div className="border-t border-[#EEF2F8] px-4 py-4">
            <button type="button" className="w-full text-left text-sm text-[#2F66C8]">
              View Full Report
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div className="h-[167px] w-[167px] shrink-0 animate-pulse rounded-full bg-[#EEF2F8]" />
          <div className="min-w-0 flex-1 divide-y divide-[#EEF2F8] overflow-hidden rounded-[10px] border border-[#EEF2F8]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <span className="flex items-center gap-2.5">
                  <span className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-[#EEF2F8]" />
                  <span className="h-4 w-28 animate-pulse rounded bg-[#EEF2F8]" />
                </span>
                <span className="flex items-center gap-5">
                  <span className="h-4 w-10 animate-pulse rounded bg-[#EEF2F8]" />
                  <span className="h-4 w-10 animate-pulse rounded bg-[#EEF2F8]" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell
      title="Traffic Sources"
      periodControl={
        <ChartPeriodSelect
          options={CHART_GRANULARITY_OPTIONS}
          value={granularity}
          onChange={setGranularity}
        />
      }
      footer={
        <div className="border-t border-[#EEF2F8] px-4 py-4">
          <button type="button" className="w-full text-left text-sm text-[#2F66C8]">
            View Full Report
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="relative h-[167px] w-[167px] shrink-0">
          <ResponsiveChart height={167} className="!w-[167px]">
            <PieChart>
              <Pie
                data={TRAFFIC_SOURCES_PIE}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={78}
                paddingAngle={2}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {TRAFFIC_SOURCES_PIE.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold leading-none text-[#0F172A]">24,842</p>
            <p className="mt-1 text-xs text-[#44516A]">Total Views</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 divide-y divide-[#EEF2F8] overflow-hidden rounded-[10px] border border-[#EEF2F8]">
          {TRAFFIC_SOURCES.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-3.5">
              <span className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-[#0F172A]">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: row.color }} />
                <span className="truncate">{row.label}</span>
              </span>
              <span className="flex shrink-0 items-center gap-5 text-sm text-[#44516A]">
                <span>{row.percent}</span>
                <span className="w-10 text-right">{row.count}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

export function InsightsPanel({
  skeleton,
  onInsightClick,
  onViewAllClick,
}: {
  skeleton?: boolean;
  onInsightClick?: (id: string) => void;
  onViewAllClick?: () => void;
}) {
  const { insights: INSIGHTS } = useAnalyticsData();
  if (skeleton) {
    return (
      <PanelShell
        title="Insights & Recommendations"
        footer={
          <div className="border-t border-[#EEF2F8] px-5 py-4">
            <button type="button" className="w-full text-left text-sm text-[#2F66C8]">
              View all insights
            </button>
          </div>
        }
      >
        <div className="mb-1 flex items-center justify-end">
          <span className="text-sm text-[#2F66C8]">View All</span>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-full rounded-[8px] border border-[#EEF2F8] bg-[#F8FAFC] p-3"
            >
              <div className="flex gap-4">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#2F66C8]" strokeWidth={1.75} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-[#EEF2F8]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#EEF2F8]" />
                  <div className="h-4 w-[75%] animate-pulse rounded bg-[#EEF2F8]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell
      title="Insights & Recommendations"
      footer={
        <div className="border-t border-[#EEF2F8] px-5 py-4">
          <button
            type="button"
            onClick={onViewAllClick}
            className="w-full text-left text-sm text-[#2F66C8]"
          >
            View all insights
          </button>
        </div>
      }
    >
      <div className="mb-1 flex items-center justify-end">
        <button type="button" onClick={onViewAllClick} className="text-sm text-[#2F66C8]">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {INSIGHTS.map((insight) => (
          <button
            key={insight.id}
            type="button"
            onClick={() => onInsightClick?.(insight.id)}
            className="w-full rounded-[8px] border border-[#EEF2F8] bg-[#F8FAFC] p-3 text-left transition-colors hover:border-[#D9E1EF] hover:bg-white"
          >
            <div className="flex gap-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#2F66C8]" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{insight.title}</p>
                <p className="mt-1.5 text-sm leading-5 text-[#44516A]">{insight.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </PanelShell>
  );
}
