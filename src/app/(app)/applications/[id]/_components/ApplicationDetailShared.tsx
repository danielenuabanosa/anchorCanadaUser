'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  SearchCheck,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ApplicationActionsDropdown,
  getActionsForStage,
  hubActionModalForLabel,
  type HubActionModalType,
} from '../../_components/ApplicationActionsDropdown';
import {
  AddNoteModal,
  ArchiveApplicationModal,
  AssignReviewerModal,
  MarkInterviewCompletedModal,
  RejectApplicationModal,
  ReopenApplicationModal,
  ReviewerAssignedSuccessModal,
  ScheduleInterviewModal,
  SendOfferModal,
  ShortlistApplicationModal,
} from '../../_components/ApplicationHubModals';
import { APPLICANTS } from '../../_components/applicationsHubData';
import {
  APPLICATION_DETAIL_TABS,
  STAGE_STYLES,
  getApplicationDetail,
  type ApplicationDetailTab,
  type TimelineStep,
} from './applicationDetailData';

function PanelHeader({ title }: { title: string }) {
  return (
    <div className="flex h-16 shrink-0 items-center border-b border-[#EEF2F8] px-5">
      <p className="text-sm font-medium text-[#0F172A]">{title}</p>
    </div>
  );
}

function TimelineDot({ step }: { step: TimelineStep }) {
  if (step.done && !step.current) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#15803D]">
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </span>
    );
  }
  if (step.current) {
    return <span className="h-6 w-6 shrink-0 rounded-full bg-[#2F66C8]" />;
  }
  return <span className="h-6 w-6 shrink-0 rounded-full border-2 border-[#D9E1EF] bg-white" />;
}

function OverviewPanel({ data }: { data: ReturnType<typeof getApplicationDetail> }) {
  const primaryNote = data.notes[0];
  const aboutFields: [string, string][] = [
    ['Location', data.about.location],
    ['Education', data.about.education],
    ['Experience', data.about.experience],
    ['Current Role', data.about.currentRole],
    ['Languages', data.about.languages],
  ];

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
      {/* Application Timeline — Figma 515:19401 */}
      <div className="flex w-full flex-col overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white lg:h-[448px] lg:w-[280px] lg:shrink-0">
        <PanelHeader title="Application Timeline" />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-1 flex-col justify-between">
            {data.timeline.map((step, index) => {
              const isLast = index === data.timeline.length - 1;
              const muted = !step.done && !step.current;
              return (
                <div key={step.label} className="relative flex gap-5">
                  <div className="relative flex w-6 flex-col items-center">
                    <TimelineDot step={step} />
                    {!isLast ? (
                      <span
                        className={cn(
                          'absolute left-1/2 top-6 w-px -translate-x-1/2',
                          step.done || step.current ? 'bg-[#B6E9C6]' : 'bg-[#EEF2F8]',
                        )}
                        style={{ height: 'calc(100% + 12px)' }}
                      />
                    ) : null}
                  </div>
                  <div className={cn('min-w-0 flex-1', !isLast && 'pb-6')}>
                    <p
                      className={cn(
                        'text-sm font-medium',
                        muted ? 'text-[#8C97AD]' : 'text-[#0F172A]',
                      )}
                    >
                      {step.label}
                    </p>
                    {step.date ? (
                      <p className="mt-2 text-xs text-[#44516A]">{step.date}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* About the Applicant — Figma 515:19656 */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white lg:h-[448px]">
        <PanelHeader title="About the Applicant" />
        <div className="flex flex-1 flex-col justify-between gap-6 p-5">
          {aboutFields.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-2">
              <p className="text-xs text-[#44516A]">{label}</p>
              <p className="text-sm font-medium text-[#0F172A]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Notes — Figma 515:19731 */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white lg:h-[448px]">
        <PanelHeader title="Internal Notes" />
        <div className="flex flex-1 flex-col gap-7 p-5">
          {primaryNote ? (
            <>
              <p className="whitespace-pre-line text-sm leading-normal text-[#0F172A]">
                {primaryNote.text}
              </p>
              <div className="text-xs leading-normal text-[#44516A]">
                <p>Added by {primaryNote.author}</p>
                <p>{primaryNote.date}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-[#8C97AD]">No notes yet.</p>
          )}
        </div>
        <div className="shrink-0 border-t border-[#EEF2F8] p-5">
          <button type="button" className="text-sm font-medium text-[#2F66C8]">
            View all notes ({data.notes.length})
          </button>
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
          <p className="mt-2 whitespace-pre-line text-sm text-[#44516A]">{note.text}</p>
        </div>
      ))}
    </div>
  );
}

function ActivityPanel({ data }: { data: ReturnType<typeof getApplicationDetail> }) {
  return (
    <div className="space-y-3">
      {data.activity.map((item) => (
        <div
          key={item.date + item.label}
          className="flex gap-3 rounded-[8px] border border-[#EEF2F8] bg-white px-4 py-3"
        >
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

function MetaIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[1.2px] border-[#EEF2F8] bg-white text-[#0F172A]">
      {children}
    </span>
  );
}

export function ApplicationDetailView({
  variant,
  applicationId,
}: {
  variant: 'desktop' | 'mobile';
  applicationId: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<ApplicationDetailTab>('overview');
  const [actionOpen, setActionOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState<{ open: boolean; reviewerName: string }>({
    open: false,
    reviewerName: 'Michael Adams',
  });
  const [actionModal, setActionModal] = useState<{
    type: HubActionModalType;
    applicantName: string;
  } | null>(null);

  const data = getApplicationDetail(applicationId);
  const actionItems = getActionsForStage(data.stage).filter(
    (item) => item.label !== 'View Applicant',
  );
  const isMobile = variant === 'mobile';

  const { prevId, nextId } = useMemo(() => {
    const ids = APPLICANTS.map((a) => a.id);
    const index = ids.indexOf(applicationId);
    if (index < 0) return { prevId: null as string | null, nextId: null as string | null };
    return {
      prevId: index > 0 ? ids[index - 1] : null,
      nextId: index < ids.length - 1 ? ids[index + 1] : null,
    };
  }, [applicationId]);

  function goTo(id: string | null) {
    if (!id) return;
    router.push(`/applications/${id}`);
  }

  function handleAction(label: string) {
    setActionOpen(false);
    if (label === 'Assign Reviewer') {
      setAssignOpen(true);
      return;
    }
    if (label === 'Add Note') {
      setNoteOpen(true);
      return;
    }
    const next = hubActionModalForLabel(label, data.applicant);
    if (next) setActionModal(next);
  }

  return (
    <div className={cn('flex flex-col', isMobile && 'pb-4')}>
      {/* Sticky detail header — Figma 515:18946 / 516:4327 */}
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
            href="/applications"
            className="inline-flex h-[45px] shrink-0 items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="truncate font-serif text-[28px] leading-none text-[#0F172A]">
            Application Details
          </h1>
        </div>

        {isMobile ? (
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous application"
              disabled={!prevId}
              onClick={() => goTo(prevId)}
              className="inline-flex h-[45px] w-5 items-center justify-center text-[#0F172A] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next application"
              disabled={!nextId}
              onClick={() => goTo(nextId)}
              className="inline-flex h-[45px] w-5 items-center justify-center text-[#0F172A] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              disabled={!prevId}
              onClick={() => goTo(prevId)}
              className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              disabled={!nextId}
              onClick={() => goTo(nextId)}
              className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm text-[#0F172A] disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-col gap-5">
        {/* Hero — Figma 515:18989 / 516:4144 */}
        <div className="flex flex-col gap-10">
          <div
            className={cn(
              'flex gap-5',
              isMobile ? 'flex-col' : 'items-start justify-between',
            )}
          >
            <div className={cn('flex min-w-0', isMobile ? 'flex-col gap-5' : 'items-center gap-10')}>
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
                  <span className="rounded-[2px] bg-[#EEF2F8] px-1 py-0.5 text-xs text-[#44516A]">
                    {data.opportunityType}
                  </span>
                  <span className="rounded-[2px] bg-[#EEF2F8] px-1 py-0.5 text-xs text-[#44516A]">
                    ID: {data.id}
                  </span>
                </div>
                <h2
                  className={cn(
                    'mt-2.5 font-serif text-[#0F172A]',
                    isMobile ? 'text-[28px] leading-tight' : 'text-[36px] leading-normal',
                  )}
                >
                  {data.applicant}
                </h2>
                <p className="mt-1.5 text-sm text-[#44516A]">Applied For: {data.appliedFor}</p>
                <div
                  className={cn(
                    'mt-2.5 flex text-sm text-[#44516A]',
                    isMobile ? 'flex-wrap gap-x-4 gap-y-2.5' : 'flex-wrap gap-4',
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    {data.email}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {data.phone}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {data.location}
                  </span>
                </div>
              </div>
            </div>

            <div className={cn('relative flex gap-2.5', isMobile && 'w-full')}>
              <button
                type="button"
                onClick={() => setNoteOpen(true)}
                className={cn(
                  'rounded-[6px] bg-[#2F66C8] px-5 py-2.5 text-base font-medium text-white',
                  isMobile && 'flex-1',
                )}
              >
                Add Note
              </button>
              <div
                className={cn(
                  'relative',
                  isMobile ? 'w-[120px] shrink-0' : 'w-[120px]',
                  actionOpen && 'z-50',
                )}
              >
                <button
                  type="button"
                  onClick={() => setActionOpen((o) => !o)}
                  className="inline-flex w-full items-center justify-between rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
                  aria-expanded={actionOpen}
                >
                  Action
                  <ChevronDown className="h-[18px] w-[18px]" />
                </button>
                <ApplicationActionsDropdown
                  open={actionOpen}
                  onClose={() => setActionOpen(false)}
                  items={actionItems}
                  onAction={handleAction}
                  align="right"
                  className={isMobile ? 'right-0 w-[220px]' : undefined}
                />
              </div>
            </div>
          </div>

          {/* Meta cards — Figma 515:19018 */}
          <div
            className={cn(
              'grid',
              isMobile ? 'gap-2.5' : 'gap-5 md:grid-cols-3',
            )}
          >
            <div className="flex h-[82px] items-center gap-3.5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
              <MetaIcon>
                <CalendarDays className="h-[22px] w-[22px]" strokeWidth={1.75} />
              </MetaIcon>
              <div className="min-w-0">
                <p className="text-sm text-[#44516A]">Date Applied</p>
                <p className="mt-2 truncate text-base font-medium text-[#0F172A]">
                  {data.appliedAt}
                </p>
              </div>
            </div>
            <div className="flex h-[82px] items-center gap-3.5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
              <MetaIcon>
                <Tag className="h-[22px] w-[22px]" strokeWidth={1.75} />
              </MetaIcon>
              <div className="min-w-0">
                <p className="text-sm text-[#44516A]">Current Stage</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span
                    className={cn(
                      'rounded-[4px] px-1.5 py-0.5 text-sm font-medium',
                      STAGE_STYLES[data.stage],
                    )}
                  >
                    {data.stage}
                  </span>
                  <span className="text-xs text-[#8C97AD]">Since {data.stageSince}</span>
                </div>
              </div>
            </div>
            <div className="flex h-[82px] items-center gap-3.5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
              <MetaIcon>
                <SearchCheck className="h-[22px] w-[22px]" strokeWidth={1.75} />
              </MetaIcon>
              <div className="min-w-0">
                <p className="text-sm text-[#44516A]">Assigned Reviewer</p>
                <div className="mt-2 flex items-center gap-2">
                  <Image
                    src={data.reviewer.avatar}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="truncate text-sm font-medium text-[#0F172A]">
                    {data.reviewer.name}
                  </span>
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

      <AddNoteModal
        open={noteOpen}
        applicantName={data.applicant}
        onClose={() => setNoteOpen(false)}
      />
      <AssignReviewerModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        onAssigned={(reviewerName) => setAssignSuccess({ open: true, reviewerName })}
      />
      <ReviewerAssignedSuccessModal
        open={assignSuccess.open}
        reviewerName={assignSuccess.reviewerName}
        onClose={() => setAssignSuccess((s) => ({ ...s, open: false }))}
      />
      <ShortlistApplicationModal
        open={actionModal?.type === 'shortlist'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <RejectApplicationModal
        open={actionModal?.type === 'reject'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <ScheduleInterviewModal
        open={actionModal?.type === 'interview' || actionModal?.type === 'reschedule'}
        applicantName={actionModal?.applicantName ?? ''}
        mode={actionModal?.type === 'reschedule' ? 'reschedule' : 'schedule'}
        onClose={() => setActionModal(null)}
      />
      <MarkInterviewCompletedModal
        open={actionModal?.type === 'complete'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <SendOfferModal
        open={actionModal?.type === 'offer'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <ArchiveApplicationModal
        open={actionModal?.type === 'archive'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
      <ReopenApplicationModal
        open={actionModal?.type === 'reopen'}
        applicantName={actionModal?.applicantName ?? ''}
        onClose={() => setActionModal(null)}
      />
    </div>
  );
}
