import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';

export type ApplicationDetailTab = 'overview' | 'application' | 'documents' | 'evaluation' | 'activity';

export const APPLICATION_DETAIL_TABS: { id: ApplicationDetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'application', label: 'Application' },
  { id: 'documents', label: 'Document (5)' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'activity', label: 'Activity' },
];

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
  reviewer: { name: 'Michael Adams', avatar: avatar2 },
  avatar: avatar1,
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
  ] satisfies TimelineStep[],
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
    { name: 'Resume.pdf', size: '245 KB', status: 'Uploaded' },
    { name: 'Transcript.pdf', size: '512 KB', status: 'Uploaded' },
    { name: 'Personal_Statement.pdf', size: '128 KB', status: 'Uploaded' },
    { name: 'Reference_Letter.pdf', size: '198 KB', status: 'Uploaded' },
    { name: 'Proof_of_Enrollment.pdf', size: '89 KB', status: 'Uploaded' },
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
      { label: 'Decision', date: 'Jun 12, 2026', done: false, current: true },
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
      { label: 'Shortlisted', done: false },
      { label: 'Interview', done: false },
      { label: 'Decision', date: 'Jun 9, 2026', done: false, current: true },
    ],
    notes: [
      {
        author: 'Jessica Lee',
        date: 'Jun 9, 2026 2:00 PM',
        text: 'Application does not meet minimum eligibility criteria for this cycle.',
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
