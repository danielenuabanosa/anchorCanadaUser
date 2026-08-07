import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import type { StaticImageData } from 'next/image';

export type ApplicationDetailTab = 'overview' | 'application' | 'documents' | 'evaluation' | 'activity';

export function applicationDetailTabs(documentCount = 0): { id: ApplicationDetailTab; label: string }[] {
  return [
    { id: 'overview', label: 'Overview' },
    { id: 'application', label: 'Application' },
    { id: 'documents', label: `Document (${documentCount})` },
    { id: 'evaluation', label: 'Evaluation' },
    { id: 'activity', label: 'Activity' },
  ];
}

export const APPLICATION_DETAIL_TABS: { id: ApplicationDetailTab; label: string }[] =
  applicationDetailTabs(5);

export type ApplicationStage =
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Accepted'
  | 'Rejected';

export interface TimelineStep {
  label: string;
  date?: string;
  done: boolean;
  current?: boolean;
  /** Negative outcome — Not-Shortlisted / Not-Selected */
  failed?: boolean;
}

export interface ApplicantAbout {
  location: string;
  education: string;
  experience: string;
  currentRole: string;
  languages: string;
}

export interface InternalNote {
  author: string;
  date: string;
  text: string;
}

export const DEFAULT_APPLICATION_DETAIL = {
  id: 'APP-2026-000123',
  applicant: 'Sarah Johnson',
  email: 'sarah.johnson@gmail.com',
  phone: '+1 (416) 555-0198',
  location: 'Toronto, ON, Canada',
  opportunityType: 'Internal Opportunity',
  appliedFor: 'Youth Innovation Grant',
  appliedAt: 'Jun 12, 2026 • 2:30 PM',
  stage: 'Under Review' as ApplicationStage,
  stageSince: 'Jun 12, 2026',
  reviewer: { name: 'Michael Adams', avatar: avatar2 as string | StaticImageData },
  avatar: avatar1 as string | StaticImageData,
  score: 92,
  about: {
    location: 'Toronto, ON, Canada',
    education: 'Bachelor of Computer Science, University of Toronto',
    experience: '2 years',
    currentRole: 'Junior Developer at Tech Solutions',
    languages: 'English (Native), French (Basic)',
  } satisfies ApplicantAbout,
  timeline: [
    { label: 'Applied', date: 'Jun 12, 2026', done: true },
    { label: 'Under Review', date: 'Jun 12, 2026', done: false, current: true },
    { label: 'Shortlisted', done: false },
    { label: 'Interview', done: false },
    { label: 'Decision', done: false },
  ] as TimelineStep[],
  answers: [
    {
      question: 'Why are you applying for this grant?',
      answer:
        'I want to launch a community tech literacy program for underserved youth in Toronto.',
    },
    {
      question: 'Describe your leadership experience.',
      answer:
        'President of university coding club; led 12 volunteers in a 6-month mentorship program.',
    },
  ],
  documents: [
    { name: 'Resume.pdf', size: '245 KB', status: 'Uploaded', url: undefined as string | undefined },
    { name: 'Transcript.pdf', size: '512 KB', status: 'Uploaded', url: undefined as string | undefined },
    { name: 'Personal_Statement.pdf', size: '128 KB', status: 'Uploaded', url: undefined as string | undefined },
    { name: 'Reference_Letter.pdf', size: '198 KB', status: 'Uploaded', url: undefined as string | undefined },
    { name: 'Proof_of_Enrollment.pdf', size: '89 KB', status: 'Uploaded', url: undefined as string | undefined },
  ],
  notes: [
    {
      author: 'Michael Adams',
      date: 'Jun 12, 2026 3:45 PM',
      text: 'Strong technical background and community involvement.\n\nSubmitted all required documents.\nGood potential for the program',
    },
    {
      author: 'Jessica Lee',
      date: 'Jun 12, 2026 4:10 PM',
      text: 'Documents look complete. Ready for shortlist discussion.',
    },
  ] satisfies InternalNote[],
  activity: [
    { label: 'Application submitted', date: 'Jun 12, 2026 at 2:30 PM' },
    { label: 'Assigned to Michael Adams', date: 'Jun 12, 2026 at 3:15 PM' },
    { label: 'Status changed to Under Review', date: 'Jun 12, 2026 at 3:16 PM' },
  ],
};

export type ApplicationDetail = typeof DEFAULT_APPLICATION_DETAIL;

const STAGE_VARIANTS: Record<string, Partial<ApplicationDetail>> = {
  '2': {
    applicant: 'David Miller',
    email: 'david.miller@email.com',
    location: 'Vancouver, BC, Canada',
    appliedFor: 'Merit Scholarship Program',
    opportunityType: 'Internal Opportunity',
    stage: 'Shortlisted',
    stageSince: 'Jun 11, 2026',
    score: 88,
    about: {
      location: 'Vancouver, BC, Canada',
      education: 'Bachelor of Arts, UBC',
      experience: '3 years',
      currentRole: 'Program Coordinator',
      languages: 'English (Native)',
    },
    timeline: [
      { label: 'Applied', date: 'Jun 11, 2026', done: true },
      { label: 'Under Review', date: 'Jun 11, 2026', done: true },
      { label: 'Shortlisted', date: 'Jun 12, 2026', done: false, current: true },
      { label: 'Interview', done: false },
      { label: 'Decision', done: false },
    ],
  },
  '3': {
    applicant: 'Emile Clark',
    email: 'emile.clark@email.com',
    location: 'Calgary, AB, Canada',
    appliedFor: 'Mentorship Program',
    opportunityType: 'Express Interest',
    stage: 'Interview',
    stageSince: 'Jun 10, 2026',
    score: 95,
    timeline: [
      { label: 'Applied', date: 'Jun 10, 2026', done: true },
      { label: 'Under Review', date: 'Jun 10, 2026', done: true },
      { label: 'Shortlisted', date: 'Jun 11, 2026', done: true },
      { label: 'Interview', date: 'Jun 12, 2026', done: false, current: true },
      { label: 'Decision', done: false },
    ],
  },
  '4': {
    applicant: 'James Wilson',
    email: 'james.wilson@email.com',
    location: 'Ottawa, ON, Canada',
    appliedFor: 'Community Volunteer Program',
    opportunityType: 'External Opportunity',
    stage: 'Accepted',
    stageSince: 'Jun 9, 2026',
    score: 97,
    timeline: [
      { label: 'Applied', date: 'Jun 9, 2026', done: true },
      { label: 'Under Review', date: 'Jun 9, 2026', done: true },
      { label: 'Shortlisted', date: 'Jun 10, 2026', done: true },
      { label: 'Interview', date: 'Jun 11, 2026', done: true },
      { label: 'Selected', date: 'Jun 12, 2026', done: true },
    ],
  },
  '5': {
    applicant: 'Andrea Garcia',
    email: 'andrea.garcia@email.com',
    location: 'Montreal, QC, Canada',
    appliedFor: 'Startup Incubator Cohort',
    opportunityType: 'External Opportunity',
    stage: 'Rejected',
    stageSince: 'Jun 8, 2026',
    score: 62,
    timeline: [
      { label: 'Applied', date: 'Jun 8, 2026', done: true },
      { label: 'Under Review', date: 'Jun 8, 2026', done: true },
      { label: 'Not-Shortlisted', date: 'Jun 9, 2026', done: false, failed: true, current: true },
      { label: 'Interview', done: false },
      { label: 'Decision', done: false },
    ],
    notes: [
      {
        author: 'Jessica Lee',
        date: 'Jun 9, 2026 2:00 PM',
        text: 'Application does not meet minimum eligibility criteria for this cycle.',
      },
    ],
  },
  '6': {
    applicant: 'Priya Nair',
    email: 'priya.nair@email.com',
    location: 'Mississauga, ON, Canada',
    appliedFor: 'Product Design Fellowship',
    opportunityType: 'Internal Opportunity',
    stage: 'Rejected',
    stageSince: 'Jun 7, 2026',
    score: 79,
    timeline: [
      { label: 'Applied', date: 'Jun 1, 2026', done: true },
      { label: 'Under Review', date: 'Jun 2, 2026', done: true },
      { label: 'Shortlisted', date: 'Jun 4, 2026', done: true },
      { label: 'Interview', date: 'Jun 6, 2026', done: true },
      { label: 'Not-Selected', date: 'Jun 7, 2026', done: false, failed: true, current: true },
    ],
    notes: [
      {
        author: 'Michael Brown',
        date: 'Jun 7, 2026 4:15 PM',
        text: 'Strong interview, but another candidate was a closer skills match for this cohort.',
      },
    ],
  },
};

export function getApplicationDetail(id: string): ApplicationDetail {
  const variant = STAGE_VARIANTS[id];
  if (!variant) return { ...DEFAULT_APPLICATION_DETAIL, id: `APP-2026-000${id.padStart(3, '0')}` };
  return {
    ...DEFAULT_APPLICATION_DETAIL,
    id: `APP-2026-000${id.padStart(3, '0')}`,
    ...variant,
    about: { ...DEFAULT_APPLICATION_DETAIL.about, ...variant.about },
    notes: variant.notes ?? DEFAULT_APPLICATION_DETAIL.notes,
    timeline: variant.timeline ?? DEFAULT_APPLICATION_DETAIL.timeline,
  };
}

export const STAGE_STYLES: Record<ApplicationStage, string> = {
  'Under Review': 'bg-[#FDEFDF] text-[#E74603]',
  Shortlisted: 'bg-[#F5EAFE] text-[#4C18E6]',
  Interview: 'bg-[#FEF6E4] text-[#F55E0D]',
  Accepted: 'bg-[#ECFDF5] text-[#15803D]',
  Rejected: 'bg-[#FFEFEE] text-[#F82B1B]',
};
