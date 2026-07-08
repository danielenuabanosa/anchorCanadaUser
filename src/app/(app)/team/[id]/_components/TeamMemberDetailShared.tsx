'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROLE_STYLES, STATUS_STYLES } from '../../_components/teamManagementData';
import {
  TEAM_MEMBER_DETAIL_TABS,
  getAdjacentMemberIds,
  getTeamMemberDetail,
  type TeamMemberDetailTab,
} from './teamMemberDetailData';

export function TeamMemberDetailView({
  variant,
  memberId,
}: {
  variant: 'desktop' | 'mobile';
  memberId: string;
}) {
  const [tab, setTab] = useState<TeamMemberDetailTab>('overview');
  const router = useRouter();
  const data = getTeamMemberDetail(memberId);
  const { prev, next } = getAdjacentMemberIds(memberId);
  const isMobile = variant === 'mobile';

  return (
    <div className={cn('flex flex-col gap-5', isMobile && 'pb-4')}>
      <div className={cn('flex items-center justify-between gap-4', isMobile && 'flex-col items-stretch')}>
        <div className="flex items-center gap-5">
          <Link
            href="/team"
            className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="font-serif text-[28px] leading-[56px] text-[#0F172A] md:text-[36px]">
            Team Member Details
          </h1>
        </div>
        {!isMobile ? (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={!prev}
              onClick={() => prev && router.push(`/team/${prev}`)}
              className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              disabled={!next}
              onClick={() => next && router.push(`/team/${next}`)}
              className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-col gap-5 lg:max-w-[520px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
            <Image
              src={data.avatar}
              alt=""
              width={120}
              height={120}
              className="h-[100px] w-[100px] shrink-0 rounded-full object-cover md:h-[120px] md:w-[120px]"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2.5">
                <span className={cn('rounded-[2px] px-1 py-0.5 text-xs', ROLE_STYLES[data.role])}>{data.role}</span>
                <span className={cn('rounded-[2px] px-1 py-0.5 text-xs', STATUS_STYLES[data.status])}>{data.status}</span>
              </div>
              <h2 className="mt-2.5 font-serif text-[32px] leading-tight text-[#0F172A] md:text-[36px]">{data.name}</h2>
              <p className="mt-1.5 text-sm text-[#44516A]">
                {data.title} • {data.department} Department
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, text: data.email },
              { icon: Phone, text: data.phone },
              { icon: MapPin, text: data.location },
              { icon: Calendar, text: data.joined },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-[#44516A]" />
                <p className="text-sm text-[#44516A]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ['Applications Reviewed', data.stats.applicationsReviewed],
              ['Interviews Conducted', data.stats.interviewsConducted],
              ['Avg. Review Time', data.stats.avgReviewTime],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center gap-3.5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-[#EEF2F8]">
                  <CalendarDays className="h-5 w-5 text-[#44516A]" />
                </div>
                <div>
                  <p className="text-sm text-[#44516A]">{label}</p>
                  <p className="text-base font-medium text-[#0F172A]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-white">
            <div className="border-b border-[#EEF2F8] p-5">
              <p className="text-sm font-medium text-[#0F172A]">About This Member</p>
            </div>
            <p className="p-5 text-sm leading-[1.8] text-[#0F172A]">{data.about}</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex h-[52px] gap-2.5 border-b border-[#EEF2F8] px-2.5">
          {TEAM_MEMBER_DETAIL_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'shrink-0 px-2.5 py-3.5 text-sm',
                tab === t.id
                  ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                  : 'font-normal text-[#0F172A]',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' ? (
          <div className="grid gap-5 p-5 lg:grid-cols-3">
            <DetailCard title="Role & Department">
              {[
                ['Role', data.role],
                ['Permission', data.permissionLevel],
                ['Department', data.department],
              ].map(([label, value]) => (
                <div key={label} className="space-y-2">
                  <p className="text-xs text-[#44516A]">{label}</p>
                  <p className="text-sm font-medium text-[#0F172A]">{value}</p>
                </div>
              ))}
            </DetailCard>

            <DetailCard title="Activity">
              <div className="space-y-2">
                <p className="text-xs text-[#44516A]">Last Active</p>
                <p className="text-sm font-medium text-[#0F172A]">{data.lastActive}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[#44516A]">Status</p>
                <span className={cn('inline-flex rounded-[4px] px-1.5 py-0.5 text-sm font-medium', STATUS_STYLES[data.status])}>
                  {data.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[#44516A]">Local Time</p>
                <p className="text-sm font-medium text-[#0F172A]">{data.localTime}</p>
              </div>
            </DetailCard>

            <DetailCard title="Reporting To">
              <div className="flex items-center gap-5">
                <Image src={data.reportingTo.avatar} alt="" width={46} height={46} className="h-[46px] w-[46px] rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">{data.reportingTo.name}</p>
                  <p className="text-xs text-[#44516A]">{data.reportingTo.title}</p>
                </div>
              </div>
            </DetailCard>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="border-b border-[#EEF2F8] p-5">
        <p className="text-sm font-medium text-[#0F172A]">{title}</p>
      </div>
      <div className="flex flex-col gap-7 p-5">{children}</div>
    </div>
  );
}
