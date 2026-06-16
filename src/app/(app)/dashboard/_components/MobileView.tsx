'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Briefcase,
  Check,
  Circle,
  Plus,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import {
  getTimeGreeting,
  ORG_PROFILE_CHECKS,
  PARTNER_LOGOS,
  PERFORMANCE_BARS,
  PROVIDER_STATS,
  QUICK_ACTIONS,
  RECENT_ACTIVITY,
  RECENT_APPLICATIONS,
  STATUS_STYLES,
  statHasValue,
} from './dashboardData';

const ACTION_ICONS = {
  plus: Plus,
  briefcase: Briefcase,
  user: Users,
  users: UserPlus,
} as const;

function CircularProgress({ percent }: { percent: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;

  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
      <svg className="-rotate-90" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#EEF2F8" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#22C55E"
          strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[15px] font-bold text-[#0F172A]">{percent}%</span>
    </div>
  );
}

export default function DashboardMobileView() {
  const { user } = useAuthStore();
  const orgName = user?.name ?? 'Toronto Community Health';
  const maxBar = Math.max(...PERFORMANCE_BARS.flatMap((d) => [d.views, d.applications]));

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div>
        <div className="flex flex-wrap items-baseline gap-2.5">
          <h1 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">{getTimeGreeting()}</h1>
          <span className="font-serif text-[36px] italic leading-[56px] text-[#2F66C8]">
            {orgName} 👋
          </span>
        </div>
        <p className="text-sm text-[#44516A]">
          <Link href="#applications" className="text-[#2F66C8] hover:underline">
            18 new applications
          </Link>{' '}
          waiting for your review this week.
        </p>
      </div>

      <Link
        href="#listings/new"
        className="flex w-full items-center justify-center gap-2.5 rounded-md bg-[#2F66C8] px-6 py-4 text-sm text-white"
      >
        Post Opportunity
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Organization Overview</h3>
          <Link href="#analytics" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="mb-4 flex items-center gap-px">
          {PROVIDER_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`h-1.5 flex-1 ${i === 0 ? 'rounded-l-full' : ''} ${i === PROVIDER_STATS.length - 1 ? 'rounded-r-full' : ''} ${statHasValue(s.value) ? s.barColor : 'bg-[#EEF2F8]'}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {PROVIDER_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${statHasValue(s.value) ? s.dotColor : 'bg-[#D9E1EF]'}`}
              />
              <span className="text-xl font-bold text-[#0F172A]">{s.value}</span>
              <span className="text-center text-[10px] leading-tight text-[#8C97AD]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Recent Applications</h3>
          <Link href="#applications" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <ul className="space-y-3">
          {RECENT_APPLICATIONS.slice(0, 3).map((app) => (
            <li
              key={app.id}
              className="flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-3"
            >
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={app.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#0F172A]">{app.applicant}</p>
                <p className="truncate text-xs text-[#44516A]">{app.opportunity}</p>
              </div>
              <span
                className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[app.status]}`}
              >
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Organization Profile</h3>
          <Link
            href="#profile"
            className="rounded-md border border-[#D9E1EF] px-4 py-2 text-sm font-medium text-[#2F66C8]"
          >
            Complete
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <CircularProgress percent={72} />
            <span className="inline-flex items-center gap-1 rounded bg-[#D1FAE5] px-1.5 py-1 text-[8px] text-[#15803D]">
              <Zap className="h-2 w-2" />
              Strong
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between">
            {ORG_PROFILE_CHECKS.map(({ done }, i) => (
              <div key={i} className="flex items-center">
                {done ? (
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#22C55E]">
                    <Check className="h-2 w-2 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <Circle className="h-[18px] w-[18px] text-[#D9E1EF]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Recent Activity</h3>
          <Link href="#notifications" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="space-y-3">
          {RECENT_ACTIVITY.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] px-3 py-3"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2F66C8]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#0F172A]">{item.title}</p>
                <p className="text-xs text-[#44516A]">{item.description}</p>
                <p className="mt-0.5 text-[10px] text-[#8C97AD]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Quick Actions</h3>
          <Link href="#listings" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="mb-3 grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(({ label, href, icon }) => {
            const Icon = ACTION_ICONS[icon];
            return (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4 text-center text-xs font-medium text-[#44516A]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF4FF] text-[#2F66C8]">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </Link>
            );
          })}
        </div>
        <div className="mb-3 flex items-end gap-2">
          <span className="font-serif text-[36px] leading-none text-[#0F172A]">{PARTNER_LOGOS.length}</span>
          <span className="mb-0.5 text-sm text-[#44516A]">Partner organizations</span>
        </div>
        <div className="mb-3 flex items-center gap-1.5">
          {PARTNER_LOGOS.map((logo, i) => (
            <div key={i} className="h-7 w-7 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image src={logo} alt="" width={28} height={28} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
        <p className="text-xs text-[#8C97AD]">Partner organizations in your network.</p>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Performance Overview</h3>
          <Link href="#analytics" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            Explore All
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-[10px] bg-[#EFF4FF] p-4">
          <span className="mb-2 inline-flex rounded bg-[#EBF1FE] px-2 py-1 text-[10px] font-semibold text-[#2F66C8]">
            This week
          </span>
          <p className="font-serif text-xl text-[#0F172A]">Profile Views</p>
          <p className="mb-3 text-xs text-[#44516A]">Views &amp; applications by day</p>
          <div className="mb-3 flex items-center gap-4 text-[10px] text-[#44516A]">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#2F66C8]" />
              Views
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              Applications
            </span>
          </div>
          <div className="flex h-12 items-end gap-1">
            {PERFORMANCE_BARS.map((day, i) => (
              <div key={day.label} className="flex flex-1 items-end justify-center gap-0.5">
                <div
                  style={{ height: `${(day.views / maxBar) * 100}%` }}
                  className={`w-full max-w-[4px] rounded-sm ${i === 3 ? 'bg-[#2F66C8]' : 'bg-[#93B4E8]'}`}
                />
                <div
                  style={{ height: `${(day.applications / maxBar) * 100}%` }}
                  className={`w-full max-w-[4px] rounded-sm ${i === 3 ? 'bg-[#22C55E]' : 'bg-[#86EFAC]'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
