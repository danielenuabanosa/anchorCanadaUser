'use client';

import { Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ActiveOpportunitiesTable } from './ActiveOpportunitiesTable';
import { DashboardQuickActions } from './DashboardQuickActions';
import { DashboardStatCard } from './DashboardStatCard';
import { OpportunityPerformanceCard } from './OpportunityPerformanceCard';
import { OrganizationStatusCard } from './OrganizationStatusCard';
import { RecentApplicationsList } from './RecentApplicationsList';
import { TeamActivityList } from './TeamActivityList';
import { PROVIDER_STATS } from './dashboardData';

export default function DesktopView() {
  const { user } = useAuthStore();
  const orgName = user?.name ?? 'Maple Futures Nonprofit';

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Welcome Back,</h1>
            <span className="font-serif text-[48px] italic leading-[56px] text-[#2F66C8]">{orgName} 👋</span>
          </div>
          <p className="text-base text-[#44516A]">
            Here&apos;s an overview of your organization&apos;s activity and opportunities
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-[41px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-base font-medium text-[#0F172A]"
        >
          <Calendar className="h-[18px] w-[18px]" />
          May 19 – May 25, 2026
        </button>
      </div>

      <div className="flex flex-col gap-2.5 xl:flex-row xl:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {PROVIDER_STATS.map((stat) => (
              <DashboardStatCard key={stat.label} {...stat} changePct={stat.changePct} />
            ))}
          </div>
          <DashboardQuickActions />
        </div>
        <OrganizationStatusCard className="w-full shrink-0 xl:w-[368px]" />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-2.5 xl:grid-cols-[500fr_778fr]">
        <OpportunityPerformanceCard />
        <ActiveOpportunitiesTable />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-2.5 xl:grid-cols-[707fr_571fr]">
        <RecentApplicationsList />
        <TeamActivityList />
      </div>
    </div>
  );
}
