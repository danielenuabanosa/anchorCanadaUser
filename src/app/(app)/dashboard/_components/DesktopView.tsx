'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { DateRangeTrigger } from '@/shared/components/ui/DatePicker';
import { useProviderDashboard } from '@/features/provider/hooks/useProviderDashboard';
import { ActiveOpportunitiesTable } from './ActiveOpportunitiesTable';
import { DashboardQuickActions } from './DashboardQuickActions';
import { DashboardStatCard } from './DashboardStatCard';
import { OpportunityPerformanceCard } from './OpportunityPerformanceCard';
import { OrganizationStatusCard } from './OrganizationStatusCard';
import { RecentApplicationsList } from './RecentApplicationsList';
import { TeamActivityList } from './TeamActivityList';
import { DASHBOARD_DATE_RANGE, PROVIDER_STATS } from './dashboardData';

export default function DesktopView() {
  const { user } = useAuthStore();
  const { data, loading, error, period, setPeriod } = useProviderDashboard('7d');
  const orgName = data?.organizationName || user?.name || 'your organization';

  const stats = useMemo(() => {
    const s = data?.stats;
    return PROVIDER_STATS.map((stat) => {
      if (!s) return { ...stat, value: loading ? '…' : stat.value };
      switch (stat.label) {
        case 'Active Listings':
          return { ...stat, value: s.activeListings.value, changePct: s.activeListings.changePct };
        case 'Total Applicants':
          return {
            ...stat,
            value: s.totalApplicants.value.toLocaleString('en-CA'),
            changePct: s.totalApplicants.changePct,
          };
        case 'Engagement Rate':
          return {
            ...stat,
            value: s.engagementRate.value,
            changePct: s.engagementRate.changePct,
          };
        case 'Active Members':
          return {
            ...stat,
            value: s.activeMembers.value,
            changePct: s.activeMembers.changePct,
          };
      }
    });
  }, [data, loading]);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Welcome Back,</h1>
            <span className="font-serif text-[48px] italic leading-[56px] text-[#2F66C8]">
              {orgName} 👋
            </span>
          </div>
          <p className="text-base text-[#44516A]">
            Here&apos;s an overview of your organization&apos;s activity and opportunities
          </p>
          {error ? <p className="mt-2 text-sm text-[#B91C1C]">{error}</p> : null}
        </div>
        <DateRangeTrigger
          value={data?.dateRangeLabel ?? DASHBOARD_DATE_RANGE}
          onChange={() => {
            /* period controlled by performance selector; chip reflects API range */
          }}
          align="right"
          buttonClassName="h-[41px] py-0"
        />
      </div>

      <div className="flex flex-col gap-2.5 xl:flex-row xl:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {stats.map((stat) => (
              <DashboardStatCard key={stat.label} {...stat} changePct={stat.changePct} />
            ))}
          </div>
          <DashboardQuickActions />
        </div>
        <OrganizationStatusCard
          className="w-full shrink-0 xl:w-[368px]"
          verification={data?.organizationStatus.verification}
          profileComplete={data?.organizationStatus.profileComplete}
          memberSince={data?.organizationStatus.memberSince}
          loading={loading && !data}
        />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-2.5 xl:grid-cols-[500fr_778fr]">
        <OpportunityPerformanceCard
          period={period}
          onPeriodChange={setPeriod}
          metrics={data?.performance.metrics}
          chart={data?.performance.chart}
          loading={loading && !data}
        />
        <ActiveOpportunitiesTable
          items={data?.activeOpportunities}
          loading={loading && !data}
          error={error}
        />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-2.5 xl:grid-cols-[707fr_571fr]">
        <RecentApplicationsList
          items={data?.recentApplications}
          loading={loading && !data}
          error={error}
        />
        <TeamActivityList
          items={data?.teamActivity}
          loading={loading && !data}
          error={error}
        />
      </div>
    </div>
  );
}
