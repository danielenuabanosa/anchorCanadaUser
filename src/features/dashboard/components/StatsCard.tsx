import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  accentClass?: string;
  trend?: { value: number; label: string };
}

export function StatsCard({ title, value, subtitle, icon, accentClass, trend }: StatsCardProps) {
  return (
    <div className={cn('rounded-2xl border border-transparent p-5', accentClass ?? 'bg-white border-neutral-200 shadow-card')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-neutral-900">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p>}
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trend.value >= 0 ? 'text-success-600' : 'text-error-600')}>
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className="rounded-xl bg-white/60 p-2.5 text-neutral-600 shadow-xs">
          {icon}
        </div>
      </div>
    </div>
  );
}
