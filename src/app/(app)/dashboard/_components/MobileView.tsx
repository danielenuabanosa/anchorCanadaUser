'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { DashboardQuickActions } from './DashboardQuickActions';
import { DashboardStatCard } from './DashboardStatCard';
import { OpportunityPerformanceCard } from './OpportunityPerformanceCard';
import { RecentApplicationsList } from './RecentApplicationsList';
import { TeamActivityList } from './TeamActivityList';
import {
  ACTIVE_OPPORTUNITIES,
  OPPORTUNITY_STATUS_STYLES,
  PROVIDER_STATS,
  RECENT_APPLICATIONS,
  STATUS_STYLES,
} from './dashboardData';

export default function MobileView() {
  const { user } = useAuthStore();
  const orgName = user?.name ?? 'Maple Futures Nonprofit';

  return (
    <div className="flex flex-col gap-2.5 pb-4">
      <div>
        <div className="flex flex-col">
          <h1 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">Welcome Back,</h1>
          <span className="-mt-2.5 font-serif text-[36px] italic leading-[56px] text-[#2F66C8]">{orgName} 👋</span>
        </div>
        <p className="mt-2 text-sm leading-[18px] text-[#44516A]">
          Here&apos;s an overview of your organization&apos;s activity and opportunities
        </p>
      </div>

      <StartBuilderDropdown label="Create Opportunity" className="h-[50px] w-full" />

      <div className="grid grid-cols-2 gap-2.5">
        {PROVIDER_STATS.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} changePct={stat.changePctMobile} />
        ))}
      </div>

      <DashboardQuickActions />

      <OpportunityPerformanceCard />

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Active Opportunities</h3>
          <Link href="/opportunities" className="flex items-center gap-3 text-base font-medium text-[#2F66C8]">
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <ul>
          {ACTIVE_OPPORTUNITIES.map((item) => (
            <li key={item.id} className="flex min-h-[68px] items-center py-3.5">
              <div className="flex w-full items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium leading-[18px] text-[#0F172A]">{item.name}</p>
                  <p className="mt-1 text-xs leading-4 text-[#44516A]">{item.applications} Applications</p>
                </div>
                <span
                  className={`shrink-0 rounded-[6px] px-1.5 py-0.5 text-sm font-medium leading-[18px] ${OPPORTUNITY_STATUS_STYLES[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Recent Applications</h3>
          <Link href="/applications" className="flex items-center gap-3 text-base font-medium text-[#2F66C8]">
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <ul>
          {RECENT_APPLICATIONS.map((app) => (
            <li key={app.id} className="flex min-h-[70px] items-center gap-3.5 py-3.5">
              <div className="h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full">
                <Image src={app.avatar} alt="" width={42} height={42} className="h-full w-full object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium leading-[18px] text-[#0F172A]">{app.applicant}</p>
                  <p className="mt-1 truncate text-xs leading-4 text-[#44516A]">Applied for {app.appliedFor}</p>
                </div>
                <span
                  className={`shrink-0 rounded-[4px] px-1.5 py-0.5 text-sm font-medium leading-[18px] ${STATUS_STYLES[app.status]}`}
                >
                  {app.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <TeamActivityList />
    </div>
  );
}
