'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Search,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ApplicationActionsDropdown,
  getActionsForStage,
} from '../../_components/ApplicationActionsDropdown';
import {
  APPLICATION_DETAIL_TABS,
  STAGE_STYLES,
  getApplicationDetail,
  type ApplicationDetailTab,
} from './applicationDetailData';

function OverviewPanel({ data }: { data: ReturnType<typeof getApplicationDetail> }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[416px_1fr]">
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <h3 className="text-base font-medium text-[#0F172A]">Application Timeline</h3>
        <div className="mt-5 space-y-4">
          {data.timeline.map((step) => (
            <div key={step.label} className="flex gap-3">
              <span
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  step.done ? 'bg-[#15803D]' : 'border border-[#D9E1EF] bg-white',
                )}
              >
                {step.done ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
              </span>
              <div>
                <p className={cn('text-sm font-medium', step.current ? 'text-[#2F66C8]' : 'text-[#0F172A]')}>
                  {step.label}
                </p>
                <p className="text-xs text-[#8C97AD]">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <h3 className="text-base font-medium text-[#0F172A]">Applicant Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ['Full Name', data.applicant],
            ['Email', data.email],
            ['Phone', data.phone],
            ['Location', data.location],
            ['Applied For', data.appliedFor],
            ['Application ID', data.id],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[8px] border border-[#EEF2F8] px-4 py-3">
              <p className="text-xs text-[#8C97AD]">{label}</p>
              <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApplicationPanel({ data }: { data: ReturnType<typeof getApplicationDetail> }) {
  return (
    <div className="space-y-4">
      {data.answers.map((item) => (
        <div key={item.question} className="rounded-[10px] border border-[#EEF2F8] p-5">
          <p className="text-sm font-medium text-[#0F172A]">{item.question}</p>
          <p className="mt-2 text-sm text-[#44516A]">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

function DocumentsPanel({ data }: { data: ReturnType<typeof getApplicationDetail> }) {
  return (
    <div className="divide-y divide-[#EEF2F8] rounded-[10px] border border-[#EEF2F8] bg-white">
      {data.documents.map((doc) => (
        <div key={doc.name} className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-medium text-[#0F172A]">{doc.name}</p>
            <p className="text-xs text-[#8C97AD]">{doc.size}</p>
          </div>
          <span className="rounded-[4px] bg-[#ECFDF5] px-2 py-0.5 text-xs font-medium text-[#15803D]">
            {doc.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function EvaluationPanel({ data }: { data: ReturnType<typeof getApplicationDetail> }) {
  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <p className="text-sm text-[#8C97AD]">Overall Score</p>
      <p className="mt-1 text-[48px] font-bold leading-none text-[#2F66C8]">{data.score}%</p>
      {data.notes.map((note) => (
        <div key={note.date} className="mt-5 rounded-[8px] border border-[#EEF2F8] p-4">
          <p className="text-sm font-medium text-[#0F172A]">{note.author}</p>
          <p className="text-xs text-[#8C97AD]">{note.date}</p>
          <p className="mt-2 text-sm text-[#44516A]">{note.text}</p>
        </div>
      ))}
    </div>
  );
}

function ActivityPanel({ data }: { data: ReturnType<typeof getApplicationDetail> }) {
  return (
    <div className="space-y-3">
      {data.activity.map((item) => (
        <div key={item.date + item.label} className="flex gap-3 rounded-[8px] border border-[#EEF2F8] bg-white px-4 py-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2F66C8]" />
          <div>
            <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>
            <p className="text-xs text-[#8C97AD]">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ApplicationDetailView({
  variant,
  applicationId,
}: {
  variant: 'desktop' | 'mobile';
  applicationId: string;
}) {
  const [tab, setTab] = useState<ApplicationDetailTab>('overview');
  const [actionOpen, setActionOpen] = useState(false);
  const data = getApplicationDetail(applicationId);
  const actionItems = getActionsForStage(data.stage);
  const isMobile = variant === 'mobile';

  return (
    <div className={cn('flex flex-col gap-5', isMobile && 'pb-4')}>
      {/* Page header — Figma 515:18946 */}
      <div className={cn('flex items-center justify-between gap-4', isMobile && 'flex-col items-stretch')}>
        <div className="flex items-center gap-5">
          <Link
            href="/applications"
            className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="font-serif text-[28px] leading-[56px] text-[#0F172A] md:text-[36px]">
            Application Details
          </h1>
        </div>
        {!isMobile ? (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A]"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A]"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      {/* Hero card — Figma 515:18989 */}
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5 md:p-6">
        <div className={cn('flex flex-col gap-5', !isMobile && 'lg:flex-row lg:items-start lg:justify-between')}>
          <div className={cn('flex gap-5 md:gap-10', isMobile && 'flex-col items-center text-center')}>
            <Image
              src={data.avatar}
              alt=""
              width={120}
              height={120}
              className="h-[100px] w-[100px] shrink-0 rounded-full object-cover md:h-[120px] md:w-[120px]"
            />
            <div className={isMobile ? 'w-full' : 'min-w-0 flex-1'}>
              <div className={cn('flex flex-wrap gap-2', isMobile && 'justify-center')}>
                <span className="rounded-[4px] bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">
                  {data.opportunityType}
                </span>
                <span className="rounded-[4px] bg-[#EEF2F8] px-1 py-0.5 text-xs text-[#44516A]">
                  ID: {data.id}
                </span>
              </div>
              <h2 className="mt-2 font-serif text-[32px] leading-tight text-[#0F172A] md:text-[40px]">
                {data.applicant}
              </h2>
              <p className="mt-1 text-sm text-[#44516A]">Applied For: {data.appliedFor}</p>
              <div
                className={cn(
                  'mt-3 flex flex-wrap gap-4 text-sm text-[#44516A]',
                  isMobile && 'justify-center',
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {data.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {data.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {data.location}
                </span>
              </div>
            </div>
          </div>
          <div className={cn('relative flex gap-2', isMobile && 'w-full')}>
            <button
              type="button"
              className={cn(
                'rounded-[6px] border border-[#D9E1EF] px-5 py-2.5 text-sm font-medium text-[#0F172A]',
                isMobile && 'flex-1',
              )}
            >
              Add Note
            </button>
            <div className={cn('relative', isMobile && 'flex-1')}>
              <button
                type="button"
                onClick={() => setActionOpen((o) => !o)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] px-5 py-2.5 text-sm font-medium text-white"
              >
                Action
                <ChevronDown className="h-4 w-4" />
              </button>
              {actionOpen ? (
                <ApplicationActionsDropdown
                  open={actionOpen}
                  onClose={() => setActionOpen(false)}
                  items={actionItems}
                  onAction={(label) => {
                    if (label === 'View Applicant') return;
                    setActionOpen(false);
                  }}
                  align={isMobile ? 'left' : 'right'}
                  className={isMobile ? 'left-0 w-full' : undefined}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="flex h-[82px] items-center gap-4 rounded-[8px] border border-[#EEF2F8] p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] text-[#2F66C8]">
              <CalendarDays className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-[#8C97AD]">Date Applied</p>
              <p className="text-sm font-medium text-[#0F172A]">{data.appliedAt}</p>
            </div>
          </div>
          <div className="flex h-[82px] items-center gap-4 rounded-[8px] border border-[#EEF2F8] p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF3E3] text-[#D97706]">
              <Tag className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-[#8C97AD]">Current Stage</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className={cn('rounded-[4px] px-1.5 py-0.5 text-xs font-medium', STAGE_STYLES[data.stage])}>
                  {data.stage}
                </span>
                <span className="text-xs text-[#8C97AD]">Since {data.stageSince}</span>
              </div>
            </div>
          </div>
          <div className="flex h-[82px] items-center gap-4 rounded-[8px] border border-[#EEF2F8] p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EDF9F1] text-[#15803D]">
              <Search className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-[#8C97AD]">Assigned Reviewer</p>
              <div className="mt-1 flex items-center gap-2">
                <Image src={data.reviewer.avatar} alt="" width={24} height={24} className="rounded-full" />
                <span className="truncate text-sm font-medium text-[#0F172A]">{data.reviewer.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab panel — Figma 515:18022 */}
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex h-[52px] gap-2.5 overflow-x-auto border-b border-[#EEF2F8] px-2.5">
          {APPLICATION_DETAIL_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'shrink-0 px-2.5 py-3.5 text-sm',
                tab === t.id
                  ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                  : 'text-[#0F172A]',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="p-5">
          {tab === 'overview' && <OverviewPanel data={data} />}
          {tab === 'application' && <ApplicationPanel data={data} />}
          {tab === 'documents' && <DocumentsPanel data={data} />}
          {tab === 'evaluation' && <EvaluationPanel data={data} />}
          {tab === 'activity' && <ActivityPanel data={data} />}
        </div>
      </div>
    </div>
  );
}
