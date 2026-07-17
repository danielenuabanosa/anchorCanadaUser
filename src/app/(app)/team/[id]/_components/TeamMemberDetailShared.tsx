'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROLE_STYLES, STATUS_STYLES } from '../../_components/teamManagementData';
import {
  getAdjacentMemberIds,
  getTeamMemberDetail,
  type TeamMemberDetailTab,
} from './teamMemberDetailData';

function MetaIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[1.2px] border-[#EEF2F8] bg-white text-[#0F172A]">
      {children}
    </span>
  );
}

function DetailCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col self-stretch overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#EEF2F8] p-5">
        <p className="text-sm font-medium text-[#0F172A]">{title}</p>
        <ChevronDown className="h-6 w-6 shrink-0 text-[#44516A]" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="flex flex-col gap-7 p-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[#44516A]">{label}</p>
      {children}
    </div>
  );
}

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

  function goTo(id: string | null) {
    if (!id) return;
    router.push(`/team/${id}`);
  }

  return (
    <div className={cn('flex flex-col', isMobile && 'pb-4')}>
      {/* Sticky header — Figma 534:4784 / 535:5822 */}
      <header
        className={cn(
          'sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#EEF2F8] bg-white/90 backdrop-blur-[5px]',
          isMobile
            ? '-mx-5 mb-10 px-2.5 py-5'
            : '-mx-5 mb-10 h-[110px] px-5 py-5 md:-mx-6 md:px-10',
        )}
      >
        <div className="flex min-w-0 items-center gap-5">
          <Link
            href="/team"
            className="inline-flex h-[45px] shrink-0 items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="truncate font-serif text-[28px] leading-none text-[#0F172A]">
            Team Member Details
          </h1>
        </div>

        {isMobile ? (
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous member"
              disabled={!prev}
              onClick={() => goTo(prev)}
              className="inline-flex h-[45px] w-5 items-center justify-center text-[#0F172A] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next member"
              disabled={!next}
              onClick={() => goTo(next)}
              className="inline-flex h-[45px] w-5 items-center justify-center text-[#0F172A] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              disabled={!prev}
              onClick={() => goTo(prev)}
              className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              disabled={!next}
              onClick={() => goTo(next)}
              className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-col gap-5">
        {/* Hero — Figma 534:4631 */}
        <div
          className={cn(
            'flex gap-5',
            isMobile ? 'flex-col' : 'items-start lg:gap-10',
          )}
        >
          {/* Left: avatar, identity, contact */}
          <div className={cn('flex flex-col gap-5', !isMobile && 'w-[520px] shrink-0')}>
            <div className={cn('flex gap-5', isMobile ? 'flex-col' : 'items-start gap-10')}>
              <Image
                src={data.avatar}
                alt=""
                width={isMobile ? 80 : 120}
                height={isMobile ? 80 : 120}
                className={cn(
                  'shrink-0 rounded-full object-cover',
                  isMobile ? 'h-20 w-20' : 'h-[120px] w-[120px]',
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2.5">
                  <span
                    className={cn(
                      'rounded-[2px] px-1 py-0.5 text-xs',
                      ROLE_STYLES[data.role] ?? 'bg-[#F2EFFF] text-[#1C09D5]',
                    )}
                  >
                    {data.role}
                  </span>
                  <span
                    className={cn(
                      'rounded-[2px] px-1 py-0.5 text-xs',
                      STATUS_STYLES[data.status],
                    )}
                  >
                    {data.status}
                  </span>
                </div>
                <h2
                  className={cn(
                    'mt-2.5 font-serif text-[#0F172A]',
                    isMobile ? 'text-[28px] leading-tight' : 'text-[36px] leading-normal',
                  )}
                >
                  {data.name}
                </h2>
                <p className="mt-1.5 flex flex-wrap items-center gap-2.5 text-sm text-[#44516A]">
                  <span>{data.title}</span>
                  <span aria-hidden>•</span>
                  <span>{data.department} Department</span>
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
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#44516A]" strokeWidth={1.75} />
                  <p className="text-sm text-[#44516A]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats + about */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className={cn('grid gap-5', isMobile ? 'grid-cols-1' : 'grid-cols-3')}>
              {(
                [
                  ['Applications Reviewed', data.stats.applicationsReviewed],
                  ['Interviews Conducted', data.stats.interviewsConducted],
                  ['Avg. Review Time', data.stats.avgReviewTime],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex h-[82px] items-center gap-3.5 rounded-[10px] border border-[#EEF2F8] bg-white p-4"
                >
                  <MetaIcon>
                    <CalendarDays className="h-[22px] w-[22px]" strokeWidth={1.75} />
                  </MetaIcon>
                  <div className="min-w-0">
                    <p className="text-sm text-[#44516A]">{label}</p>
                    <p className="mt-2 truncate text-base font-medium text-[#0F172A]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
              <div className="border-b border-[#EEF2F8] p-5">
                <p className="text-sm font-medium text-[#0F172A]">About This Member</p>
              </div>
              <p className="p-5 text-sm leading-[1.8] text-[#0F172A]">{data.about}</p>
            </div>
          </div>
        </div>

        {/* Overview tab panel — Figma 534:4685 */}
        <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <div className="flex h-[52px] gap-2.5 border-b border-[#EEF2F8] px-2.5">
            <button
              type="button"
              onClick={() => setTab('overview')}
              className={cn(
                'shrink-0 px-2.5 py-3.5 text-sm',
                tab === 'overview'
                  ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                  : 'text-[#0F172A]',
              )}
            >
              Overview
            </button>
          </div>

          {tab === 'overview' ? (
            <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-stretch">
              <DetailCard title="Role & Department">
                <Field label="Role">
                  <p className="text-sm font-medium text-[#0F172A]">{data.role}</p>
                </Field>
                <Field label="Permission">
                  <p className="text-sm font-medium text-[#0F172A]">{data.permissionLevel}</p>
                </Field>
                <Field label="Department">
                  <p className="text-sm font-medium text-[#0F172A]">{data.departmentShort}</p>
                </Field>
              </DetailCard>

              <DetailCard title="Activity">
                <Field label="Last Active">
                  <p className="text-sm font-medium text-[#0F172A]">{data.lastActive}</p>
                </Field>
                <Field label="Status">
                  <span
                    className={cn(
                      'inline-flex rounded-[4px] px-1.5 py-0.5 text-sm font-medium',
                      STATUS_STYLES[data.status],
                    )}
                  >
                    {data.status}
                  </span>
                </Field>
                <Field label="Local Time">
                  <p className="text-sm font-medium text-[#0F172A]">{data.localTime}</p>
                </Field>
              </DetailCard>

              <DetailCard title="Reporting To">
                <div className="flex items-center gap-5">
                  <Image
                    src={data.reportingTo.avatar}
                    alt=""
                    width={46}
                    height={46}
                    className="h-[46px] w-[46px] rounded-full object-cover"
                  />
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
    </div>
  );
}
