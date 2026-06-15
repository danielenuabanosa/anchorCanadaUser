export type AppStatus =
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Accepted'
  | 'Withdrawn'
  | 'Rejected'
  | 'Submitted'
  | 'Closed';

export type DetailTab = 'Overview' | 'Documents' | 'Timeline' | 'Messages';

export type FilterTab =
  | 'All'
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Accepted'
  | 'Closed';

export interface ProgressStep {
  label: string;
  date: string | null;
  status: 'done' | 'active' | 'pending' | 'closed';
}

export interface Document {
  name: string;
  type: string;
  size: string;
  uploadedOn: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'submitted' | 'update' | 'interview' | 'offer' | 'message';
}

export interface Message {
  id: string;
  sender: string;
  senderInitial: string;
  senderColor: string;
  content: string;
  timestamp: string;
  isMe?: boolean;
}

export interface Application {
  id: string;
  appId: string;
  status: AppStatus;
  appliedDate: string;
  appliedOnLabel?: string;
  deadline: string;
  logoInitial: string;
  logoColor: string;
  title: string;
  company: string;
  verified: boolean;
  location: string;
  type: string;
  typeBadgeBg?: string;
  typeBadgeText?: string;
  matchPct?: number;
  steps: ProgressStep[];
  documents: Document[];
  timeline: TimelineEvent[];
  messages: Message[];
  submittedAnswers?: { question: string; answer: string }[];
  providerType?: string;
  offerDetails?: {
    salary: string;
    startDate: string;
    deadline: string;
    offerLetter: string;
  };
  withdrawalReason?: string;
  withdrawnOn?: string;
}

export const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Submitted', label: 'Submitted' },
  { key: 'Under Review', label: 'Under Review' },
  { key: 'Shortlisted', label: 'Shortlisted' },
  { key: 'Interview', label: 'Interview' },
  { key: 'Accepted', label: 'Accepted' },
  { key: 'Closed', label: 'Closed' },
];

export const DETAIL_TABS: DetailTab[] = ['Overview', 'Documents', 'Timeline', 'Messages'];

export const STAT_SUMMARY = [
  { label: 'Submitted', value: 12, trend: '+ 2 this week', iconBg: 'bg-[#0341F5]', Icon: 'send' as const },
  { label: 'Under Review', value: 4, trend: '↑ 1 this week', iconBg: 'bg-[#FEC238]', Icon: 'clock' as const },
  { label: 'Shortlisted', value: 2, trend: '↑ 1 this week', iconBg: 'bg-[#763DE7]', Icon: 'star' as const },
  { label: 'Accepted', value: 1, trend: 'Congratulations 🎉', iconBg: 'bg-[#229D56]', Icon: 'check' as const, noTrendBg: true },
];

export const ACTION_ITEMS = [
  { title: 'Interview with Spotify', subtitle: 'May 12, 2025 • 10:00 AM EST', iconBg: 'bg-[#EFF4FF]', urgent: false },
  { title: 'Upload additional document', subtitle: 'RBC Youth Innovation Grant', iconBg: 'bg-[#FEF4E0]', urgent: 'Due in 2 days' },
  { title: 'Response expected', subtitle: 'Google Product Design Intern', iconBg: 'bg-[#ECDFFF]', urgent: 'Within this week' as string | false },
];

export const STATUS_STYLES: Record<AppStatus, { bg: string; text: string; dot: string }> = {
  'Under Review': { bg: 'bg-[#FFF3DB]', text: 'text-[#F88101]', dot: 'bg-[#F88101]' },
  Shortlisted: { bg: 'bg-[#ECDFFF]', text: 'text-[#763DE7]', dot: 'bg-[#763DE7]' },
  Interview: { bg: 'bg-[#EFF4FF]', text: 'text-[#2F66C8]', dot: 'bg-[#2F66C8]' },
  Accepted: { bg: 'bg-[#ECFDF5]', text: 'text-[#15803D]', dot: 'bg-[#229D56]' },
  Withdrawn: { bg: 'bg-[#ECECEF]', text: 'text-[#252D46]', dot: 'bg-[#8C97AD]' },
  Rejected: { bg: 'bg-[#FEE2E2]', text: 'text-[#B91C1C]', dot: 'bg-[#EF4444]' },
  Submitted: { bg: 'bg-[#EFF4FF]', text: 'text-[#2F66C8]', dot: 'bg-[#2F66C8]' },
  Closed: { bg: 'bg-[#ECECEF]', text: 'text-[#252D46]', dot: 'bg-[#8C97AD]' },
};

export const APPS: Application[] = [
  {
    id: '1',
    appId: 'APP-2026-00231',
    status: 'Under Review',
    appliedDate: 'May 6, 2026',
    appliedOnLabel: 'May 22, 2026',
    deadline: 'June 15, 2026',
    logoInitial: 'S',
    logoColor: '#95BF47',
    title: 'UX Designer Intern',
    company: 'Shopify',
    verified: true,
    location: 'Hybrid • Toronto, ON',
    type: 'Internship',
    typeBadgeBg: 'bg-[#ECDFFF]',
    typeBadgeText: 'text-[#763DE7]',
    matchPct: 87,
    steps: [
      { label: 'Submitted', date: 'May 3', status: 'done' },
      { label: 'Under Review', date: 'May 5', status: 'active' },
      { label: 'Shortlisted', date: null, status: 'pending' },
      { label: 'Interview', date: null, status: 'pending' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Resume.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'May 3, 2026' },
      { name: 'Cover Letter.docx', type: 'DOC', size: '156 KB', uploadedOn: 'May 3, 2026' },
      { name: 'Academic Transcript.pdf', type: 'PDF', size: '312 KB', uploadedOn: 'May 3, 2026' },
    ],
    timeline: [
      { date: 'May 5, 2026', title: 'Application Under Review', description: "Shopify's hiring team has started reviewing your application.", type: 'update' },
      { date: 'May 3, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted to Shopify.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'Shopify Recruiter', senderInitial: 'S', senderColor: '#95BF47', content: "Thank you for applying to the UX Designer Intern role. We'll be in touch soon.", timestamp: 'May 5, 2:30 PM' },
    ],
    submittedAnswers: [
      { question: 'Why are you interested in this opportunity?', answer: 'I am passionate about creating intuitive digital experiences that help people discover meaningful opportunities. Shopify\'s mission to make commerce better for everyone aligns with my values.' },
      { question: 'What relevant experience do you have?', answer: 'I have completed two UX design internships and led a student design club where I mentored peers on user research and prototyping.' },
    ],
    providerType: 'Technology Organization',
  },
  {
    id: '2',
    appId: 'APP-2026-00198',
    status: 'Shortlisted',
    appliedDate: 'Apr 28, 2026',
    deadline: 'May 18, 2026',
    logoInitial: 'R',
    logoColor: '#003A70',
    title: 'Youth Innovation Grant',
    company: 'RBC Foundation',
    verified: true,
    location: 'Canada-wide • Remote',
    type: 'Grant',
    typeBadgeBg: 'bg-[#D1FAE5]',
    typeBadgeText: 'text-[#15803D]',
    matchPct: 92,
    steps: [
      { label: 'Submitted', date: 'Apr 28', status: 'done' },
      { label: 'Under Review', date: 'May 8', status: 'done' },
      { label: 'Shortlisted', date: 'May 14', status: 'active' },
      { label: 'Interview', date: null, status: 'pending' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Business_Plan.pdf', type: 'PDF', size: '1.1 MB', uploadedOn: 'Apr 28, 2026' },
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Apr 28, 2026' },
    ],
    timeline: [
      { date: 'May 14, 2026', title: 'Shortlisted!', description: 'Congratulations! You have been shortlisted for the Youth Innovation Grant.', type: 'update' },
      { date: 'Apr 28, 2026', title: 'Application Submitted', description: 'Your grant application was successfully submitted.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'RBC Foundation', senderInitial: 'R', senderColor: '#003A70', content: 'Congratulations! Your application has been shortlisted. Please upload additional documentation by May 18.', timestamp: 'May 14, 10:00 AM' },
      { id: 'm2', sender: 'Me', senderInitial: 'M', senderColor: '#2F66C8', content: 'Thank you! I will upload the requested documents by the deadline.', timestamp: 'May 14, 11:15 AM', isMe: true },
    ],
    providerType: 'Financial Organization',
  },
  {
    id: '3',
    appId: 'APP-2026-00176',
    status: 'Interview',
    appliedDate: 'Apr 25, 2026',
    deadline: 'June 1, 2026',
    logoInitial: 'G',
    logoColor: '#4285F4',
    title: 'Product Design Intern',
    company: 'Google',
    verified: true,
    location: 'Hybrid • Toronto, ON',
    type: 'Internship',
    matchPct: 95,
    steps: [
      { label: 'Submitted', date: 'Apr 25', status: 'done' },
      { label: 'Under Review', date: 'Apr 27', status: 'done' },
      { label: 'Shortlisted', date: 'May 2', status: 'done' },
      { label: 'Interview', date: 'May 12', status: 'active' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Apr 25, 2026' },
      { name: 'Portfolio_Google.pdf', type: 'PDF', size: '8.7 MB', uploadedOn: 'Apr 25, 2026' },
    ],
    timeline: [
      { date: 'May 12, 2026', title: 'Interview Scheduled', description: 'Virtual interview scheduled for May 20, 2026 at 10:00 AM EST.', type: 'interview' },
      { date: 'Apr 25, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted to Google.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'Google Recruiting', senderInitial: 'G', senderColor: '#4285F4', content: "We'd like to invite you for a virtual interview on May 20 at 10:00 AM EST.", timestamp: 'May 12, 9:00 AM' },
    ],
    providerType: 'Technology Organization',
  },
  {
    id: '4',
    appId: 'APP-2026-00102',
    status: 'Accepted',
    appliedDate: 'Apr 10, 2026',
    deadline: 'May 10, 2026',
    logoInitial: 'T',
    logoColor: '#FF0000',
    title: 'Data Analyst',
    company: 'TikTok Canada',
    verified: true,
    location: 'Toronto, ON • On-site',
    type: 'Full-time',
    matchPct: 89,
    steps: [
      { label: 'Submitted', date: 'Apr 10', status: 'done' },
      { label: 'Under Review', date: 'Apr 14', status: 'done' },
      { label: 'Interview', date: 'Apr 22', status: 'done' },
      { label: 'Offer', date: 'May 1', status: 'done' },
      { label: 'Accepted', date: 'May 5', status: 'active' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Apr 10, 2026' },
      { name: 'Offer_Letter_TikTok.pdf', type: 'PDF', size: '312 KB', uploadedOn: 'May 1, 2026' },
    ],
    timeline: [
      { date: 'May 5, 2026', title: 'Offer Accepted', description: 'You accepted the Data Analyst offer from TikTok Canada.', type: 'offer' },
      { date: 'May 1, 2026', title: 'Offer Received', description: 'You received an official job offer from TikTok Canada.', type: 'offer' },
      { date: 'Apr 10, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'TikTok Recruiting', senderInitial: 'T', senderColor: '#FF0000', content: 'Congratulations! We are thrilled to extend an offer for the Data Analyst position.', timestamp: 'May 1, 3:00 PM' },
    ],
    offerDetails: {
      salary: '$72,000 / year',
      startDate: 'June 9, 2026',
      deadline: 'May 10, 2026',
      offerLetter: 'Offer_Letter_TikTok.pdf',
    },
    providerType: 'Technology Organization',
  },
  {
    id: '5',
    appId: 'APP-2026-00089',
    status: 'Withdrawn',
    appliedDate: 'Mar 15, 2026',
    deadline: 'May 7, 2026',
    logoInitial: 'M',
    logoColor: '#7C3AED',
    title: 'Marketing Coordinator',
    company: 'Mitacs',
    verified: true,
    location: 'Hybrid • Ottawa, ON',
    type: 'Full-time',
    matchPct: 74,
    steps: [
      { label: 'Submitted', date: 'Mar 15', status: 'done' },
      { label: 'Under Review', date: 'Mar 20', status: 'done' },
      { label: 'Withdrawn', date: 'Apr 5', status: 'closed' },
      { label: 'Interview', date: null, status: 'pending' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Mar 15, 2026' },
    ],
    timeline: [
      { date: 'Apr 5, 2026', title: 'Application Withdrawn', description: 'You withdrew your application from Mitacs Marketing Coordinator role.', type: 'update' },
      { date: 'Mar 15, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted to Mitacs.', type: 'submitted' },
    ],
    messages: [],
    withdrawalReason: 'Accepted a competing offer that better aligned with my career goals.',
    withdrawnOn: 'May 8, 2026',
    providerType: 'Research Organization',
  },
  {
    id: '6',
    appId: 'APP-2026-00245',
    status: 'Submitted',
    appliedDate: 'May 10, 2026',
    deadline: 'June 20, 2026',
    logoInitial: 'W',
    logoColor: '#2E3B2E',
    title: 'Research Assistant',
    company: 'WWF-Canada',
    verified: true,
    location: 'Vancouver, BC • On-site',
    type: 'Part-time',
    matchPct: 81,
    steps: [
      { label: 'Submitted', date: 'May 10', status: 'active' },
      { label: 'Under Review', date: null, status: 'pending' },
      { label: 'Shortlisted', date: null, status: 'pending' },
      { label: 'Interview', date: null, status: 'pending' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'May 10, 2026' },
    ],
    timeline: [
      { date: 'May 10, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted to WWF-Canada.', type: 'submitted' },
    ],
    messages: [],
    providerType: 'Non-profit Organization',
  },
];

export function filterApps(apps: Application[], tab: FilterTab): Application[] {
  if (tab === 'All') return apps;
  if (tab === 'Submitted') return apps.filter(a => a.status === 'Submitted');
  if (tab === 'Under Review') return apps.filter(a => a.status === 'Under Review');
  if (tab === 'Shortlisted') return apps.filter(a => a.status === 'Shortlisted');
  if (tab === 'Interview') return apps.filter(a => a.status === 'Interview');
  if (tab === 'Accepted') return apps.filter(a => a.status === 'Accepted');
  if (tab === 'Closed') return apps.filter(a => ['Withdrawn', 'Rejected', 'Closed'].includes(a.status));
  return apps;
}

export function getFilterCounts(apps: Application[]): Record<FilterTab, number> {
  return {
    All: apps.length,
    Submitted: apps.filter(a => a.status === 'Submitted').length,
    'Under Review': apps.filter(a => a.status === 'Under Review').length,
    Shortlisted: apps.filter(a => a.status === 'Shortlisted').length,
    Interview: apps.filter(a => a.status === 'Interview').length,
    Accepted: apps.filter(a => a.status === 'Accepted').length,
    Closed: apps.filter(a => ['Withdrawn', 'Rejected', 'Closed'].includes(a.status)).length,
  };
}
