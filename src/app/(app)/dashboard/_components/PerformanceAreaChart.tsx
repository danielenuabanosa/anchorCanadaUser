'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PERFORMANCE_CHART } from './dashboardData';

const CHART_TICK = { fontFamily: 'DM Sans, sans-serif', fontSize: 14, fill: '#8C97AD' } as const;
const Y_MAX = 40000;
const Y_TICKS = [0, 10000, 20000, 30000, 40000];

export function PerformanceAreaChart() {
  return (
    <div className="mt-auto flex flex-col gap-10 p-5">
      <div className="h-[225px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[...PERFORMANCE_CHART]}
            margin={{ left: -14, right: 4, top: 4, bottom: 0 }}
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
              tickFormatter={(v: number) => (v === 0 ? '0' : `${v / 1000}k`)}
              domain={[0, Y_MAX]}
              ticks={Y_TICKS}
            />
            <Tooltip
              contentStyle={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid #EEF2F8',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(v) => [`${(Number(v) / 1000).toFixed(0)}k`, '']}
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
        </ResponsiveContainer>
      </div>

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
