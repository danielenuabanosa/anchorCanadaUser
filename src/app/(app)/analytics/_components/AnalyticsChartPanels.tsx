'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  APPLICATION_FUNNEL,
  APPLICATIONS_OVER_TIME,
  ANALYTICS_INSIGHTS,
  CHART_GRANULARITY_OPTIONS,
  CHART_TIME_RANGE_OPTIONS,
  TOP_COUNTRIES,
  TRAFFIC_SOURCES,
} from './analyticsData';
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
          <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[150px] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
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

const Y_LABELS = ['400', '300', '200', '100', '0'] as const;
const CHART_MAX = 400;

function scaleY(value: number, height: number) {
  return height - (value / CHART_MAX) * height;
}

function buildAreaPath(values: number[], width: number, height: number) {
  const points = values.map((value, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = scaleY(value, height);
    return `${x},${y}`;
  });
  return `M0,${height} L${points.join(' L')} L${width},${height} Z`;
}

function buildLinePoints(values: number[], width: number, height: number) {
  return values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = scaleY(value, height);
      return `${x},${y}`;
    })
    .join(' ');
}

export function ApplicationsOverTimeChart({ skeleton }: { skeleton?: boolean }) {
  const [timeRange, setTimeRange] = useState<string>(CHART_TIME_RANGE_OPTIONS[1]);

  if (skeleton) {
    return (
      <PanelShell title="Applications Over Time">
        <div className="h-[290px] animate-pulse rounded-[8px] bg-[#EEF2F8]" />
      </PanelShell>
    );
  }

  const width = 486;
  const height = 254;
  const values = APPLICATIONS_OVER_TIME.map((d) => d.value);

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
      <div className="relative h-[254px] w-full">
        <div className="flex h-full">
          <div className="flex w-10 shrink-0 flex-col justify-between py-2 text-right text-xs text-[#8C97AD]">
            {Y_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="relative min-w-0 flex-1">
            <div className="absolute inset-x-0 top-2 bottom-9 flex flex-col justify-between">
              {Y_LABELS.map((label) => (
                <div key={label} className="h-px w-full bg-[#EEF2F8]" />
              ))}
            </div>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="absolute inset-x-0 top-0 h-[254px] w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="analyticsAppsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2F66C8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2F66C8" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={buildAreaPath(values, width, height)} fill="url(#analyticsAppsArea)" />
              <polyline
                fill="none"
                stroke="#2F66C8"
                strokeWidth="2.5"
                points={buildLinePoints(values, width, height)}
              />
              {values.map((value, i) => {
                const x = (i / (values.length - 1)) * width;
                const y = scaleY(value, height);
                return <circle key={i} cx={x} cy={y} r="3.8" fill="#2F66C8" />;
              })}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-[#8C97AD]">
              {APPLICATIONS_OVER_TIME.map((point) => (
                <span key={point.label}>{point.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

export function ApplicationFunnelPanel({ skeleton, mobile }: { skeleton?: boolean; mobile?: boolean }) {
  const [granularity, setGranularity] = useState<string>(CHART_GRANULARITY_OPTIONS[0]);

  if (skeleton) {
    return (
      <PanelShell title="Application Funnel">
        <div className={cn('animate-pulse rounded-[8px] bg-[#EEF2F8]', mobile ? 'h-[547px]' : 'h-[290px]')} />
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
  const [granularity, setGranularity] = useState<string>(CHART_GRANULARITY_OPTIONS[0]);

  if (skeleton) {
    return (
      <PanelShell title="Applicant Demographics">
        <div className="h-[290px] animate-pulse rounded-[8px] bg-[#EEF2F8]" />
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
  const [granularity, setGranularity] = useState<string>(CHART_GRANULARITY_OPTIONS[0]);

  if (skeleton) {
    return (
      <PanelShell title="Traffic Sources">
        <div className="h-[240px] animate-pulse rounded-[8px] bg-[#EEF2F8]" />
      </PanelShell>
    );
  }

  const segments = TRAFFIC_SOURCES.map((s) => parseFloat(s.percent));

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
          <svg viewBox="0 0 167 167" className="h-full w-full -rotate-90" aria-hidden>
            {segments.reduce<{ offset: number; nodes: ReactNode[] }>(
              (acc, pct, i) => {
                const circumference = 2 * Math.PI * 55;
                const dash = (pct / 100) * circumference;
                acc.nodes.push(
                  <circle
                    key={TRAFFIC_SOURCES[i].label}
                    cx="83.5"
                    cy="83.5"
                    r="55"
                    fill="none"
                    stroke={TRAFFIC_SOURCES[i].color}
                    strokeWidth="28"
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-acc.offset}
                  />,
                );
                acc.offset += dash;
                return acc;
              },
              { offset: 0, nodes: [] },
            ).nodes}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-[#0F172A]">24,842</p>
            <p className="text-xs text-[#44516A]">Total Views</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 divide-y divide-[#EEF2F8] rounded-[8px] border border-[#EEF2F8]">
          {TRAFFIC_SOURCES.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-3.5">
              <span className="flex items-center gap-2.5 text-sm text-[#0F172A]">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: row.color }} />
                {row.label}
              </span>
              <span className="flex items-center gap-5 text-sm text-[#44516A]">
                <span>{row.percent}</span>
                <span>{row.count}</span>
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
  if (skeleton) {
    return (
      <PanelShell title="Insights & Recommendations">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[88px] animate-pulse rounded-[8px] bg-[#EEF2F8]" />
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
        {ANALYTICS_INSIGHTS.map((insight) => (
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
