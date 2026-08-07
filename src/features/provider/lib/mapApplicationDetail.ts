import type { StaticImageData } from 'next/image';
import avatar1 from '@assets/images/profile-avatar.png';
import type {
  ApplicantAbout,
  ApplicationDetail,
  ApplicationStage,
  InternalNote,
  TimelineStep,
} from '@/app/(app)/applications/[id]/_components/applicationDetailData';

export type ApiApplicationDetail = {
  id: string;
  opportunityId?: string;
  opportunityTitle?: string;
  applicantName: string;
  applicantEmail: string;
  status: 'new' | 'under_review' | 'shortlisted' | 'interview' | 'rejected' | 'accepted' | 'withdrawn';
  stage?: string | null;
  providerNotes?: string | null;
  payload?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
  documents?: Array<{
    name: string;
    type?: string;
    size?: string | number;
    uploadedOn?: string;
    url?: string;
  }>;
  timeline?: Array<{
    id: string;
    type?: string;
    title: string;
    description?: string;
    fromStatus?: string | null;
    toStatus?: string | null;
    createdAt: string;
    date?: string;
  }>;
  opportunity?: {
    location?: string | null;
    province?: string | null;
    opportunityType?: 'internal' | 'external' | 'express-interest' | string | null;
  };
  applicantProfile?: {
    phone?: string;
    bio?: string;
    avatarUrl?: string;
    headline?: string;
    titleLine?: string;
    languages?: string[];
    locations?: string[];
    province?: string;
    skills?: string[];
  };
  reviewerMemberId?: string | null;
  reviewer?: { id: string; name: string; email?: string } | null;
};

function formatDateTime(value?: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })} • ${d.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}`;
}

function formatDate(value?: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateAt(value?: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })} at ${d.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}`;
}

function mapStage(status: ApiApplicationDetail['status']): ApplicationStage {
  switch (status) {
    case 'shortlisted':
      return 'Shortlisted';
    case 'interview':
      return 'Interview';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
    case 'withdrawn':
      return 'Rejected';
    default:
      return 'Under Review';
  }
}

function mapOpportunityTypeLabel(type?: string | null) {
  switch (type) {
    case 'external':
      return 'External Opportunity';
    case 'express-interest':
      return 'Express Interest';
    default:
      return 'Internal Opportunity';
  }
}

function buildTimeline(status: ApiApplicationDetail['status'], createdAt: string): TimelineStep[] {
  const applied = formatDate(createdAt);
  const order: ApplicationStage[] = [
    'Under Review',
    'Shortlisted',
    'Interview',
    'Accepted',
  ];
  const current = mapStage(status);
  if (status === 'rejected' || status === 'withdrawn') {
    return [
      { label: 'Applied', date: applied, done: true },
      { label: 'Under Review', date: applied, done: true },
      { label: 'Decision', date: formatDate(createdAt), done: true, failed: true, current: true },
    ];
  }
  if (status === 'accepted') {
    return [
      { label: 'Applied', date: applied, done: true },
      { label: 'Under Review', date: applied, done: true },
      { label: 'Shortlisted', done: true },
      { label: 'Interview', done: true },
      { label: 'Selected', date: formatDate(createdAt), done: true, current: true },
    ];
  }

  const currentIndex = order.indexOf(current);
  return [
    { label: 'Applied', date: applied, done: true },
    ...order.map((label, index) => ({
      label: label === 'Accepted' ? 'Decision' : label,
      date: index === 0 ? applied : undefined,
      done: index < currentIndex,
      current: index === currentIndex,
    })),
  ];
}

function extractAnswers(payload: Record<string, unknown> | undefined) {
  const raw =
    (payload?.submittedAnswers as unknown) ??
    (payload?.answers as unknown) ??
    (payload?.questions as unknown) ??
    [];
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const entry = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
      const question = String(entry.question ?? entry.label ?? entry.title ?? '').trim();
      const answer = String(entry.answer ?? entry.value ?? entry.response ?? '').trim();
      if (!question && !answer) return null;
      return {
        question: question || 'Question',
        answer: answer || '—',
      };
    })
    .filter(Boolean) as Array<{ question: string; answer: string }>;
}

function formatSize(size?: string | number) {
  if (size == null) return '—';
  if (typeof size === 'string') return size;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function mapApiApplicationToDetail(item: ApiApplicationDetail): ApplicationDetail {
  const profile = item.applicantProfile;
  const location =
    profile?.locations?.[0] ||
    [item.opportunity?.location, item.opportunity?.province].filter(Boolean).join(', ') ||
    profile?.province ||
    'Canada';

  const notes: InternalNote[] = [];
  if (item.providerNotes?.trim()) {
    notes.push({
      author: 'Your team',
      date: formatDateTime(item.updatedAt ?? item.createdAt),
      text: item.providerNotes.trim(),
    });
  }
  for (const event of item.timeline ?? []) {
    if (event.type === 'update' && event.description?.trim() && event.title?.toLowerCase().includes('note')) {
      notes.push({
        author: 'Your team',
        date: formatDateTime(event.createdAt),
        text: event.description.trim(),
      });
    } else if (event.description?.trim() && event.title === 'Provider note') {
      notes.push({
        author: 'Your team',
        date: formatDateTime(event.createdAt),
        text: event.description.trim(),
      });
    }
  }

  const documents = (item.documents ?? []).map((doc) => ({
    name: doc.name,
    size: formatSize(doc.size),
    status: 'Uploaded',
    url: doc.url,
  }));

  const activity = (item.timeline ?? []).map((event) => ({
    label: event.title || 'Update',
    date: formatDateAt(event.createdAt),
  }));

  if (activity.length === 0) {
    activity.push({
      label: 'Application submitted',
      date: formatDateAt(item.createdAt),
    });
  }

  const about: ApplicantAbout = {
    location,
    education: 'Not provided',
    experience: profile?.skills?.length ? `${profile.skills.length} skills listed` : 'Not provided',
    currentRole: profile?.titleLine || profile?.headline || 'Not provided',
    languages: profile?.languages?.length ? profile.languages.join(', ') : 'Not provided',
  };

  const avatar: string | StaticImageData = profile?.avatarUrl || avatar1;

  return {
    id: item.id,
    applicant: item.applicantName || 'Applicant',
    email: item.applicantEmail || '—',
    phone: profile?.phone || '—',
    location,
    opportunityType: mapOpportunityTypeLabel(item.opportunity?.opportunityType),
    appliedFor: item.opportunityTitle || 'Opportunity',
    appliedAt: formatDateTime(item.createdAt),
    stage: mapStage(item.status),
    stageSince: formatDate(item.updatedAt ?? item.createdAt),
    reviewer: item.reviewer?.name
      ? { name: item.reviewer.name, avatar: avatar1 }
      : { name: 'Unassigned', avatar: avatar1 },
    avatar,
    score: 0,
    about,
    timeline: buildTimeline(item.status, item.createdAt),
    answers: extractAnswers(item.payload),
    documents,
    notes,
    activity,
  };
}

export function applicationStatusFromHubAction(
  type: string,
): 'shortlisted' | 'rejected' | 'interview' | 'accepted' | 'under_review' | null {
  switch (type) {
    case 'shortlist':
      return 'shortlisted';
    case 'reject':
      return 'rejected';
    case 'interview':
    case 'reschedule':
    case 'complete':
      return 'interview';
    case 'offer':
      return 'accepted';
    case 'reopen':
      return 'under_review';
    default:
      return null;
  }
}
