'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { StartBuilderDropdown } from '@/features/opportunity-builder/components/StartBuilderDropdown';
import { useProviderDashboard } from '@/features/provider/hooks/useProviderDashboard';
import { DashboardQuickActions } from './DashboardQuickActions';
import { DashboardStatCard } from './DashboardStatCard';
import { OpportunityPerformanceCard } from './OpportunityPerformanceCard';
import { RecentApplicationsList } from './RecentApplicationsList';
import { TeamActivityList } from './TeamActivityList';
import { OPPORTUNITY_STATUS_STYLES, PROVIDER_STATS, type OpportunityStatus } from './dashboardData';
import { promptUnverifiedProvider } from '@/store/verificationModalStore';

export default function MobileView() {
  const { user } = useAuthStore();
  const { data, loading, error, period, setPeriod } = useProviderDashboard('7d');
  const orgName = data?.organizationName || user?.name || 'your organization';

  useEffect(() => {
    if (loading) return;
    promptUnverifiedProvider(
      data?.organizationStatus ?? {
        verificationStatus: user?.provider?.verificationStatus,
        profileComplete: 0,
        adminNote: '',
      },
    );
  }, [data, loading, user?.provider?.verificationStatus]);

  const stats = useMemo(() => {
    const s = data?.stats;
    return PROVIDER_STATS.map((stat) => {
      if (!s) return { ...stat, value: loading ? '…' : stat.value };
      switch (stat.label) {
        case 'Active Listings':
          return {
            ...stat,
            value: s.activeListings.value,
            changePctMobile: s.activeListings.changePct,
          };
        case 'Total Applicants':
          return {
            ...stat,
            value: s.totalApplicants.value.toLocaleString('en-CA'),
            changePctMobile: s.totalApplicants.changePct,
          };
        case 'Engagement Rate':
          return {
            ...stat,
            value: s.engagementRate.value,
            changePctMobile: s.engagementRate.changePct,
          };
        case 'Active Members':
          return {
            ...stat,
            value: s.activeMembers.value,
            changePctMobile: s.activeMembers.changePct,
          };
      }
    });
  }, [data, loading]);

  const visibleOpps = data?.activeOpportunities ?? [];

  return (
    <div className="flex flex-col gap-2.5 pb-4">
      <div>
        <div className="flex flex-col">
          <h1 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">Welcome Back,</h1>
          <span className="-mt-2.5 font-serif text-[36px] italic leading-[56px] text-[#2F66C8]">
            {orgName} 👋
          </span>
        </div>
        <p className="mt-2 text-sm leading-[18px] text-[#44516A]">
          Here&apos;s an overview of your organization&apos;s activity and opportunities
        </p>
        {error ? <p className="mt-2 text-sm text-[#B91C1C]">{error}</p> : null}
      </div>

      <StartBuilderDropdown label="Create Opportunity" className="h-[50px] w-full" />

      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} changePct={stat.changePctMobile} />
        ))}
      </div>

      <DashboardQuickActions />

      <OpportunityPerformanceCard
        period={period}
        onPeriodChange={setPeriod}
        metrics={data?.performance.metrics}
        chart={data?.performance.chart}
        loading={loading && !data}
      />

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Active Opportunities</h3>
          <Link href="/opportunities" className="flex items-center gap-3 text-base font-medium text-[#2F66C8]">
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <ul>
          {loading && !data ? (
            <li className="flex flex-col gap-3 py-2" aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] p-3">
                  <span className="h-10 w-10 shrink-0 animate-pulse rounded-[8px] bg-[#EEF2F8]" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <span className="block h-3.5 w-40 animate-pulse rounded bg-[#EEF2F8]" />
                    <span className="block h-3 w-24 animate-pulse rounded bg-[#EEF2F8]" />
                  </div>
                </div>
              ))}
            </li>
          ) : error && !data ? (
            <li className="py-6 text-sm text-[#B91C1C]">{error}</li>
          ) : visibleOpps.length === 0 ? (
            <li className="py-6 text-sm text-[#8C97AD]">No opportunities yet.</li>
          ) : (
            visibleOpps.map((item) => (
              <li key={item.id} className="flex min-h-[68px] items-center py-3.5">
                <div className="flex w-full items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-[18px] text-[#0F172A]">{item.name}</p>
                    <p className="mt-1 text-xs leading-4 text-[#44516A]">
                      {item.applications} Applications
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-[6px] px-1.5 py-0.5 text-sm font-medium leading-[18px] ${OPPORTUNITY_STATUS_STYLES[item.status as OpportunityStatus] ?? OPPORTUNITY_STATUS_STYLES.Draft}`}
                  >
                    {item.status}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <RecentApplicationsList
        items={data?.recentApplications}
        loading={loading && !data}
        error={error}
      />

      <TeamActivityList items={data?.teamActivity} loading={loading && !data} error={error} />
    </div>
  );
}
