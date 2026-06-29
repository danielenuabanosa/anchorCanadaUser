'use client';

import { PERFORMANCE_CHART } from './dashboardData';

const Y_LABELS = ['40k', '30k', '20k', '10k', '0'] as const;
const CHART_MAX = 40000;

function scaleY(value: number, height: number) {
  return height - (value / CHART_MAX) * height * 0.55;
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

export function PerformanceAreaChart() {
  const width = 420;
  const height = 125;
  const views = PERFORMANCE_CHART.map((d) => d.views);
  const saves = PERFORMANCE_CHART.map((d) => d.saves);
  const applications = PERFORMANCE_CHART.map((d) => d.applications);

  return (
    <div className="mt-auto flex flex-col gap-10 p-5">
      <div className="relative h-[225px] w-full">
        <div className="flex h-full">
          <div className="flex w-[26px] shrink-0 flex-col justify-between py-2 text-right text-sm text-[#8C97AD]">
            {Y_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="relative min-w-0 flex-1 pl-3.5">
            <div className="absolute inset-x-0 top-2 bottom-[18px] flex flex-col justify-between">
              {Y_LABELS.map((label) => (
                <div key={label} className="h-px w-full bg-[#EEF2F8]" />
              ))}
            </div>

            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="absolute left-3.5 right-0 top-[70px] h-[125px] w-[calc(100%-14px)]"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="dashViewsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2F66C8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2F66C8" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={buildAreaPath(views, width, height)} fill="url(#dashViewsArea)" />
              <polyline
                fill="none"
                stroke="#2F66C8"
                strokeWidth="2.5"
                points={buildLinePoints(views, width, height)}
              />
              <polyline
                fill="none"
                stroke="#9747FF"
                strokeWidth="2"
                points={buildLinePoints(saves, width, height)}
              />
              <polyline
                fill="none"
                stroke="#10A34B"
                strokeWidth="2"
                points={buildLinePoints(applications, width, height)}
              />
            </svg>

            <div className="absolute bottom-0 left-3.5 right-0 flex justify-between pl-[57px] pr-3.5 text-sm text-[#8C97AD]">
              {PERFORMANCE_CHART.map((point) => (
                <span key={point.label}>{point.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-[#44516A]">
        <span className="flex items-center gap-2.5">
          <span className="h-4 w-4 rounded bg-[#154EDF]" />
          Views
        </span>
        <span className="flex items-center gap-2.5">
          <span className="h-4 w-4 rounded bg-[#9747FF]" />
          Saves
        </span>
        <span className="flex items-center gap-2.5">
          <span className="h-4 w-4 rounded bg-[#10A34B]" />
          Applications
        </span>
      </div>
    </div>
  );
}
