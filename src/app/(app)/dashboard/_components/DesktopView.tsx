'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Briefcase,
  Check,
  Circle,
  Info,
  Plus,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import {
  ACTIVITY_ICONS,
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
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;

  return (
    <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center">
      <svg className="-rotate-90" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#EEF2F8" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#22C55E"
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-[#0F172A]">{percent}%</span>
    </div>
  );
}

export default function DashboardDesktopView() {
  const { user } = useAuthStore();
  const orgName = user?.name ?? 'Toronto Community Health';
  const maxBar = Math.max(...PERFORMANCE_BARS.flatMap((d) => [d.views, d.applications]));

  return (
    <div className="flex min-h-0 gap-5">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h1 className="font-serif text-[48px] leading-[56px] text-[#0F172A]">{getTimeGreeting()}</h1>
              <span className="font-serif text-[60px] italic leading-[56px] text-[#2F66C8]">
                {orgName} 👋
              </span>
            </div>
            <p className="mt-1 text-base text-[#44516A]">
              <Link href="#applications" className="font-normal text-[#2F66C8] hover:underline">
                18 new applications
              </Link>{' '}
              waiting for your review this week.
            </p>
          </div>
          <Link
            href="#listings/new"
            className="inline-flex items-center gap-2.5 rounded-md bg-[#2F66C8] px-6 py-4 text-base text-white transition hover:bg-[#2558B0]"
          >
            Post Opportunity
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats overview */}
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#0F172A]">Organization Overview</h3>
            <Link
              href="#analytics"
              className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline"
            >
              View Analytics
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
          <div className="mb-5 flex items-center gap-px">
            {PROVIDER_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`h-1.5 flex-1 ${i === 0 ? 'rounded-l-full' : ''} ${i === PROVIDER_STATS.length - 1 ? 'rounded-r-full' : ''} ${statHasValue(s.value) ? s.barColor : 'bg-[#EEF2F8]'}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {PROVIDER_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${statHasValue(s.value) ? s.dotColor : 'bg-[#D9E1EF]'}`}
                />
                <span className="text-2xl font-bold text-[#0F172A]">{s.value}</span>
                <span className="text-center text-xs text-[#8C97AD]">{s.label}</span>
                <span className="text-center text-[10px] text-[#44516A]">{s.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent applications */}
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#0F172A]">Recent Applications</h3>
            <Link
              href="#applications"
              className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline"
            >
              View All
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#EEF2F8] text-xs text-[#8C97AD]">
                  <th className="pb-3 pr-4 font-medium">Applicant</th>
                  <th className="pb-3 pr-4 font-medium">Opportunity</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Applied</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_APPLICATIONS.map((app) => (
                  <tr key={app.id} className="border-b border-[#EEF2F8] last:border-0">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={app.avatar}
                            alt=""
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-[#0F172A]">{app.applicant}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-[#44516A]">{app.opportunity}</td>
                    <td className="py-4 pr-4">
                      <span
                        className={`inline-flex rounded px-2 py-1 text-xs font-semibold ${STATUS_STYLES[app.status]}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 text-[#8C97AD]">
                      {new Date(app.appliedAt).toLocaleDateString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions + Performance */}
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#0F172A]">Quick Actions</h3>
              <Link
                href="#listings"
                className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline"
              >
                View All
                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map(({ label, href, icon }) => {
                const Icon = ACTION_ICONS[icon];
                return (
                  <Link
                    key={label}
                    href={href}
                    className="flex flex-col items-center gap-2.5 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4 text-center text-sm font-medium text-[#44516A] transition hover:border-[#2F66C8] hover:text-[#2F66C8]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF4FF] text-[#2F66C8]">
                      <Icon className="h-5 w-5" />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {PARTNER_LOGOS.map((logo, i) => (
                <div
                  key={i}
                  className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm"
                >
                  <Image
                    src={logo}
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#8C97AD]">
              Partner organizations in your network.
            </p>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#0F172A]">Performance Overview</h3>
              <Link
                href="#analytics"
                className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline"
              >
                Explore All
                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-[10px] bg-[#EFF4FF] p-5">
              <span className="mb-2 inline-flex rounded bg-[#EBF1FE] px-2 py-1 text-[10px] font-semibold text-[#2F66C8]">
                This week
              </span>
              <p className="font-serif text-[28px] leading-tight text-[#0F172A]">Profile Views</p>
              <p className="mb-4 text-sm text-[#44516A]">Views &amp; applications by day</p>
              <div className="mb-3 flex items-center gap-4 text-[10px] text-[#44516A]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#2F66C8]" />
                  Views
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                  Applications
                </span>
              </div>
              <div className="flex h-14 items-end gap-1">
                {PERFORMANCE_BARS.map((day, i) => (
                  <div key={day.label} className="flex flex-1 items-end justify-center gap-0.5">
                    <div
                      style={{ height: `${(day.views / maxBar) * 100}%` }}
                      className={`w-full max-w-[6px] rounded-sm ${i === 3 ? 'bg-[#2F66C8]' : 'bg-[#93B4E8]'}`}
                    />
                    <div
                      style={{ height: `${(day.applications / maxBar) * 100}%` }}
                      className={`w-full max-w-[6px] rounded-sm ${i === 3 ? 'bg-[#22C55E]' : 'bg-[#86EFAC]'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden w-[368px] shrink-0 space-y-5 xl:block">
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#0F172A]">Recent Activity</h3>
            <Link
              href="#notifications"
              className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline"
            >
              View All
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => {
              const Icon = ACTIVITY_ICONS[i] ?? ACTIVITY_ICONS[0];
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] px-3 py-3"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
                  >
                    <Icon className="h-4 w-4 text-[#2F66C8]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#0F172A]">{item.title}</p>
                    <p className="mt-0.5 text-xs text-[#44516A]">{item.description}</p>
                    <p className="mt-1 text-xs text-[#8C97AD]">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-[#0F172A]">Organization Profile</h3>
              <Info className="h-4 w-4 text-[#8C97AD]" />
            </div>
            <Link
              href="#profile"
              className="rounded-md border border-[#D9E1EF] px-4 py-2 text-sm font-medium text-[#2F66C8] transition hover:bg-[#F8FAFC]"
            >
              Complete
            </Link>
          </div>
          <div className="mb-5 flex items-center gap-5">
            <CircularProgress percent={72} />
            <span className="inline-flex items-center gap-1.5 rounded bg-[#D1FAE5] px-1.5 py-1 text-xs text-[#15803D]">
              <Zap className="h-3 w-3" />
              Strong
            </span>
          </div>
          <ul className="space-y-4">
            {ORG_PROFILE_CHECKS.map(({ label, done }) => (
              <li key={label} className="flex items-center gap-5">
                {done ? (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-[#22C55E]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <Circle className="h-6 w-6 shrink-0 text-[#D9E1EF]" />
                )}
                <span className={`text-base ${done ? 'text-[#0F172A]' : 'text-[#8C97AD]'}`}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
