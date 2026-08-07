'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ResponsiveChart } from '@/shared/components/charts/ResponsiveChart';
import { PERFORMANCE_CHART } from './dashboardData';

const CHART_TICK = { fontFamily: 'DM Sans, sans-serif', fontSize: 14, fill: '#8C97AD' } as const;

type ChartPoint = { label: string; views: number; saves: number; applications: number };

export function PerformanceAreaChart({ data }: { data?: ChartPoint[] }) {
  const chartData = data?.length ? data : [...PERFORMANCE_CHART];
  const maxVal = Math.max(
    1,
    ...chartData.flatMap((row) => [row.views, row.saves, row.applications]),
  );
  const yMax = Math.max(10, Math.ceil(maxVal / 10) * 10);
  const step = yMax / 4;
  const yTicks = [0, step, step * 2, step * 3, yMax];

  return (
    <div className="mt-auto flex flex-col gap-10 p-5">
      <ResponsiveChart height={225}>
        <LineChart data={chartData} margin={{ left: -14, right: 4, top: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F8" vertical={false} />
          <XAxis dataKey="label" tick={CHART_TICK} axisLine={false} tickLine={false} />
          <YAxis
            tick={CHART_TICK}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) =>
              v === 0 ? '0' : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
            }
            domain={[0, yMax]}
            ticks={yTicks}
          />
          <Tooltip
            contentStyle={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              borderRadius: 8,
              border: '1px solid #EEF2F8',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            formatter={(v) => [Number(v).toLocaleString('en-CA'), '']}
          />
          <Line
            type="monotone"
            dataKey="views"
            name="Views"
            stroke="#2F66C8"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#2F66C8' }}
          />
          <Line
            type="monotone"
            dataKey="saves"
            name="Saves"
            stroke="#9747FF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#9747FF' }}
          />
          <Line
            type="monotone"
            dataKey="applications"
            name="Applications"
            stroke="#10A34B"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#10A34B' }}
          />
        </LineChart>
      </ResponsiveChart>

      <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-[#44516A]">
        <span className="flex items-center gap-2.5">
          <span className="block h-[3px] w-9 rounded-full bg-[#2F66C8]" />
          Views
        </span>
        <span className="flex items-center gap-2.5">
          <span className="block h-[3px] w-9 rounded-full bg-[#9747FF]" />
          Saves
        </span>
        <span className="flex items-center gap-2.5">
          <span className="block h-[3px] w-9 rounded-full bg-[#10A34B]" />
          Applications
        </span>
      </div>
    </div>
  );
}
