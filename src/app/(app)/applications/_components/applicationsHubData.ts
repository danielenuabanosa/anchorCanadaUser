import type { StaticImageData } from 'next/image';
import type { ElementType } from 'react';
import {
  BookOpenCheck,
  CalendarDays,
  LockKeyhole,
  Rocket,
  UserX,
  Users,
} from 'lucide-react';
import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';

export type ApplicationTab =
  | 'all'
  | 'under-review'
  | 'shortlisted'
  | 'interview'
  | 'accepted'
  | 'rejected';

export type ApplicationStatus =
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Accepted'
  | 'Rejected';

export type OpportunityTypeTag = 'Internal' | 'External' | 'Express Interest';

export interface ApplicationStat {
  label: string;
  value: string | number;
  subtext?: string;
  change?: string;
  changeNegative?: boolean;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

export interface ApplicantRow {
  id: string;
  applicant: string;
  email: string;
  location: string;
  opportunity: string;
  opportunityType: OpportunityTypeTag;
  status: ApplicationStatus;
  appliedAt: string;
  appliedTime?: string;
  reviewer?: string;
  reviewerAvatar?: StaticImageData;
  score?: number;
  avatar: StaticImageData;
  tab: ApplicationTab;
}

/** Figma 489:17337 — six summary stat cards */
export const APPLICATION_STATS: ApplicationStat[] = [
  {
    label: 'Total Applications',
    value: '1,284',
    change: '12%',
    subtext: 'from last 30 days',
    icon: Rocket,
    iconBg: 'bg-[#EDF9F1]',
    iconColor: 'text-[#15803D]',
  },
  {
    label: 'Under Review',
    value: 342,
    change: '8%',
    subtext: 'from last 30 days',
    icon: BookOpenCheck,
    iconBg: 'bg-[#FFF3E3]',
    iconColor: 'text-[#D97706]',
  },
  {
    label: 'Shortlisted',
    value: 126,
    change: '5%',
    subtext: 'from last 30 days',
    icon: CalendarDays,
    iconBg: 'bg-[#EFE8FD]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    label: 'Interview',
    value: 48,
    change: '2%',
    subtext: 'from last 30 days',
    icon: LockKeyhole,
    iconBg: 'bg-[#FEE8E9]',
    iconColor: 'text-[#DB2777]',
  },
  {
    label: 'Accepted',
    value: 31,
    change: '3%',
    subtext: 'from last 30 days',
    icon: Users,
    iconBg: 'bg-[#ECF2FE]',
    iconColor: 'text-[#2F66C8]',
  },
  {
    label: 'Rejected',
    value: 737,
    change: '7%',
    changeNegative: true,
    subtext: 'from last 30 days',
    icon: UserX,
    iconBg: 'bg-[#ECF2FE]',
    iconColor: 'text-[#2F66C8]',
  },
];

export const MOBILE_APPLICATION_STATS = APPLICATION_STATS;

export const APPLICATION_TABS: { id: ApplicationTab; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: 1284 },
  { id: 'under-review', label: 'Under Review', count: 342 },
  { id: 'shortlisted', label: 'Shortlisted', count: 126 },
  { id: 'interview', label: 'Interview', count: 48 },
  { id: 'accepted', label: 'Accepted', count: 31 },
  { id: 'rejected', label: 'Rejected', count: 737 },
];

export const FILTER_LABELS = [
  'All Opportunities',
  'All Statuses',
  'All Types',
  'All Reviewers',
  'All Time',
] as const;

/** Figma table/mobile tags — Internal/External purple, Express Interest green */
export const OPPORTUNITY_TYPE_STYLES: Record<OpportunityTypeTag, string> = {
  Internal: 'border border-[#E8E1FF] bg-[#F3EEFE] text-[#451EE1]',
  External: 'border border-[#E8E1FF] bg-[#F3EEFE] text-[#451EE1]',
  'Express Interest': 'border border-[#D1FAE5] bg-[#ECFDF5] text-[#15803D]',
};

/** Figma status pills — rounded-[4px], 14px medium */
export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  'Under Review': 'bg-[#FDEFDF] text-[#E74603]',
  Shortlisted: 'bg-[#F5EAFE] text-[#4C18E6]',
  Interview: 'bg-[#FEF6E4] text-[#F55E0D]',
  Accepted: 'bg-[#ECFDF5] text-[#15803D]',
  Rejected: 'bg-[#FFEFEE] text-[#F82B1B]',
};

export const APPLICANTS: ApplicantRow[] = [
  {
    id: '1',
    applicant: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    location: 'Toronto, ON',
    opportunity: 'Youth Innovation Grant',
    opportunityType: 'Internal',
    status: 'Under Review',
    appliedAt: 'Jun 12, 2026',
    appliedTime: '2:30 PM',
    reviewer: 'Michael Adams',
    reviewerAvatar: avatar2,
    avatar: avatar1,
    tab: 'under-review',
  },
  {
    id: '2',
    applicant: 'James Wilson',
    email: 'james.wilson@email.com',
    location: 'Vancouver, BC',
    opportunity: 'Healthcare Access Grant',
    opportunityType: 'External',
    status: 'Shortlisted',
    appliedAt: 'Jun 11, 2026',
    appliedTime: '10:15 AM',
    reviewer: 'Jessica Lee',
    reviewerAvatar: avatar3,
    avatar: avatar2,
    tab: 'shortlisted',
  },
  {
    id: '3',
    applicant: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    location: 'Calgary, AB',
    opportunity: 'Youth Leadership Program',
    opportunityType: 'Express Interest',
    status: 'Interview',
    appliedAt: 'Jun 10, 2026',
    appliedTime: '4:45 PM',
    reviewer: 'Marcus Lee',
    reviewerAvatar: avatar1,
    avatar: avatar3,
    tab: 'interview',
  },
  {
    id: '4',
    applicant: 'Marcus Lee',
    email: 'marcus.lee@email.com',
    location: 'Montreal, QC',
    opportunity: 'Community Youth Mentorship',
    opportunityType: 'Internal',
    status: 'Accepted',
    appliedAt: 'Jun 9, 2026',
    appliedTime: '9:00 AM',
    reviewer: 'Emily Zhang',
    reviewerAvatar: avatar2,
    avatar: avatar1,
    tab: 'accepted',
  },
  {
    id: '5',
    applicant: 'Emily Zhang',
    email: 'emily.zhang@email.com',
    location: 'Ottawa, ON',
    opportunity: 'Summer Internship Program',
    opportunityType: 'External',
    status: 'Rejected',
    appliedAt: 'Jun 8, 2026',
    appliedTime: '1:20 PM',
    reviewer: 'David Chen',
    reviewerAvatar: avatar3,
    avatar: avatar2,
    tab: 'rejected',
  },
  {
    id: '6',
    applicant: 'David Chen',
    email: 'david.chen@email.com',
    location: 'Edmonton, AB',
    opportunity: 'Digital Skills Scholarship',
    opportunityType: 'Internal',
    status: 'Under Review',
    appliedAt: 'Jun 7, 2026',
    appliedTime: '11:30 AM',
    reviewer: 'Alex Morgan',
    reviewerAvatar: avatar2,
    avatar: avatar3,
    tab: 'under-review',
  },
  {
    id: '7',
    applicant: "Liam O'Connor",
    email: 'liam.o@email.com',
    location: 'Halifax, NS',
    opportunity: 'Green Energy Fellowship',
    opportunityType: 'External',
    status: 'Under Review',
    appliedAt: 'Jun 6, 2026',
    appliedTime: '10:00 AM',
    reviewer: 'Michael Adams',
    reviewerAvatar: avatar2,
    avatar: avatar1,
    tab: 'under-review',
  },
  {
    id: '8',
    applicant: 'Emma Dubois',
    email: 'emma.d@email.com',
    location: 'Quebec City, QC',
    opportunity: 'Arts & Culture Grant',
    opportunityType: 'Express Interest',
    status: 'Shortlisted',
    appliedAt: 'Jun 5, 2026',
    appliedTime: '9:30 AM',
    reviewer: 'Jessica Lee',
    reviewerAvatar: avatar3,
    avatar: avatar2,
    tab: 'shortlisted',
  },
  {
    id: '9',
    applicant: 'Noah Patel',
    email: 'noah.p@email.com',
    location: 'Winnipeg, MB',
    opportunity: 'STEM Research Award',
    opportunityType: 'Internal',
    status: 'Interview',
    appliedAt: 'Jun 4, 2026',
    appliedTime: '3:15 PM',
    reviewer: 'Michael Adams',
    reviewerAvatar: avatar2,
    avatar: avatar3,
    tab: 'interview',
  },
  {
    id: '10',
    applicant: 'Ava Thompson',
    email: 'ava.t@email.com',
    location: 'Victoria, BC',
    opportunity: 'Community Health Fund',
    opportunityType: 'External',
    status: 'Accepted',
    appliedAt: 'Jun 3, 2026',
    appliedTime: '11:00 AM',
    reviewer: 'Jessica Lee',
    reviewerAvatar: avatar3,
    avatar: avatar1,
    tab: 'accepted',
  },
  {
    id: '11',
    applicant: 'Lucas Kim',
    email: 'lucas.k@email.com',
    location: 'Saskatoon, SK',
    opportunity: 'Digital Skills Scholarship',
    opportunityType: 'Internal',
    status: 'Rejected',
    appliedAt: 'Jun 2, 2026',
    appliedTime: '2:00 PM',
    reviewer: 'David Chen',
    reviewerAvatar: avatar3,
    avatar: avatar2,
    tab: 'rejected',
  },
];

export function filterApplicants(items: ApplicantRow[], tab: ApplicationTab) {
  if (tab === 'all') return items;
  if (tab === 'under-review') return items.filter((i) => i.status === 'Under Review');
  if (tab === 'shortlisted') return items.filter((i) => i.status === 'Shortlisted');
  if (tab === 'interview') return items.filter((i) => i.status === 'Interview');
  if (tab === 'accepted') return items.filter((i) => i.status === 'Accepted');
  return items.filter((i) => i.status === 'Rejected');
}
