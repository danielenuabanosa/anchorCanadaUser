import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';

export type ApplicationDetailTab = 'overview' | 'application' | 'documents' | 'evaluation' | 'activity';

export const APPLICATION_DETAIL_TABS: { id: ApplicationDetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'application', label: 'Application' },
  { id: 'documents', label: 'Documents (5)' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'activity', label: 'Activity' },
];

export type ApplicationStage =
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Accepted'
  | 'Rejected';

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
  timeline: [
    { label: 'Application Submitted', date: 'Jun 12, 2026', done: true },
    { label: 'Under Review', date: 'Jun 12, 2026', done: true, current: true },
    { label: 'Shortlist', date: 'Pending', done: false },
    { label: 'Interview', date: 'Pending', done: false },
    { label: 'Decision', date: 'Pending', done: false },
  ],
  answers: [
    { question: 'Why are you applying for this grant?', answer: 'I want to launch a community tech literacy program for underserved youth in Toronto.' },
    { question: 'Describe your leadership experience.', answer: 'President of university coding club; led 12 volunteers in a 6-month mentorship program.' },
  ],
  documents: [
    { name: 'Resume.pdf', size: '245 KB', status: 'Uploaded' },
    { name: 'Transcript.pdf', size: '512 KB', status: 'Uploaded' },
    { name: 'Personal_Statement.pdf', size: '128 KB', status: 'Uploaded' },
    { name: 'Reference_Letter.pdf', size: '198 KB', status: 'Uploaded' },
    { name: 'Proof_of_Enrollment.pdf', size: '89 KB', status: 'Uploaded' },
  ],
  notes: [
    { author: 'Michael Adams', date: 'Jun 13, 2026', text: 'Strong application. Recommend moving to shortlist after document verification.' },
  ],
  activity: [
    { label: 'Application submitted', date: 'Jun 12, 2026 at 2:30 PM' },
    { label: 'Assigned to Michael Adams', date: 'Jun 12, 2026 at 3:15 PM' },
    { label: 'Status changed to Under Review', date: 'Jun 12, 2026 at 3:16 PM' },
  ],
};

export const STAGE_STYLES: Record<ApplicationStage, string> = {
  'Under Review': 'bg-[#FFEDD5] text-[#C2410C]',
  Shortlisted: 'bg-[#EFE8FD] text-[#7C3AED]',
  Interview: 'bg-[#FEF4DD] text-[#B45309]',
  Accepted: 'bg-[#ECFDF5] text-[#15803D]',
  Rejected: 'bg-[#FEE2E2] text-[#B91C1C]',
};
