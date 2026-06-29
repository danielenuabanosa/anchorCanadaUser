import type { ElementType } from 'react';
import {
  ArrowUp,
  Briefcase,
  ChartBarStacked,
  ChartColumnBig,
  Clock,
  Download,
  Eye,
  FileText,
  Heart,
  Pencil,
  Plus,
  Star,
  Upload,
  UserPlus,
  UserRound,
  Users,
} from 'lucide-react';
import type { StaticImageData } from 'next/image';
import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';

export const PROVIDER_STATS = [
  {
    label: 'Active Listings',
    value: 24,
    changePct: '8%',
    changePctMobile: '3%',
    icon: Briefcase,
    iconBg: 'bg-[#E8F1FE]',
    iconColor: 'text-[#2F66C8]',
  },
  {
    label: 'Total Applicants',
    value: '1,284',
    changePct: '12%',
    changePctMobile: '12%',
    icon: FileText,
    iconBg: 'bg-[#E4F5E6]',
    iconColor: 'text-[#15803D]',
  },
  {
    label: 'Engagement Rate',
    value: '82%',
    changePct: '6%',
    changePctMobile: '5%',
    icon: ChartBarStacked,
    iconBg: 'bg-[#EFE6FD]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    label: 'Active Members',
    value: 12,
    changePct: '2%',
    changePctMobile: '2%',
    icon: Users,
    iconBg: 'bg-[#FEF4DD]',
    iconColor: 'text-[#D97706]',
  },
] as const;

export const QUICK_ACTIONS = [
  {
    label: 'Create Opportunity',
    href: '/opportunities/create/type',
    icon: Plus,
    cardClass: 'bg-[#EFF4FF] border-[#DCE7FF]',
    iconWrapClass: 'bg-[#E3EBFE]',
    iconColor: 'text-[#1130C7]',
    textColor: 'text-[#1130C7]',
  },
  {
    label: 'Invite Team Members',
    href: '/dashboard#team',
    icon: UserPlus,
    cardClass: 'bg-[#F2F9F2] border-[#DCEDE3]',
    iconWrapClass: 'bg-[#E0F2E2]',
    iconColor: 'text-[#0B5114]',
    textColor: 'text-[#0B5114]',
  },
  {
    label: 'View Analytics',
    href: '/dashboard#analytics',
    icon: ChartColumnBig,
    cardClass: 'bg-[#F7F4FE] border-[#E4DFF9]',
    iconWrapClass: 'bg-[#EEE7FC]',
    iconColor: 'text-[#240AB3]',
    textColor: 'text-[#240AB3]',
  },
  {
    label: 'Download Reports',
    href: '/dashboard#reports',
    icon: Download,
    cardClass: 'bg-[#FEF8EC] border-[#FDF1DC]',
    iconWrapClass: 'bg-[#FFF4DC]',
    iconColor: 'text-[#F37C06]',
    textColor: 'text-[#F37C06]',
  },
] as const;

export const PERFORMANCE_METRICS = [
  { label: 'Views', value: '18,642', change: '15%', icon: Eye },
  { label: 'Saves', value: '2,845', change: '10%', icon: Heart },
  { label: 'Applications', value: '1,284', change: '12%', icon: UserRound },
  { label: 'Conv. Rates', value: '6.9%', change: '0.8%', icon: Clock },
] as const;

export const PERFORMANCE_CHART = [
  { label: 'Jan', views: 28000, saves: 12000, applications: 8000 },
  { label: 'Feb', views: 32000, saves: 14000, applications: 9500 },
  { label: 'Mar', views: 35000, saves: 16000, applications: 11000 },
  { label: 'Apr', views: 38000, saves: 18000, applications: 12500 },
  { label: 'May', views: 36000, saves: 17000, applications: 11500 },
  { label: 'Jun', views: 40000, saves: 20000, applications: 14000 },
] as const;

export type OpportunityStatus = 'Active' | 'Draft' | 'Closed';
export type ApplicationStatus = 'New' | 'Under Review' | 'Shortlisted' | 'Rejected';

export interface ActiveOpportunity {
  id: string;
  name: string;
  status: OpportunityStatus;
  applications: number;
  postedDate: string;
  deadline: string;
}

export interface RecentApplication {
  id: string;
  applicant: string;
  appliedFor: string;
  status: ApplicationStatus;
  timeLabel: string;
  avatar: StaticImageData;
}

export interface TeamActivityItem {
  id: string;
  member: string;
  action: string;
  time: string;
  icon: ElementType;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
}

export const ACTIVE_OPPORTUNITIES: ActiveOpportunity[] = [
  {
    id: '1',
    name: 'Community Youth Mentorship Program',
    status: 'Active',
    applications: 124,
    postedDate: 'May 18, 2026',
    deadline: 'Jun 18, 2026',
  },
  {
    id: '2',
    name: 'Digital Skills Training Initiative',
    status: 'Active',
    applications: 98,
    postedDate: 'May 15, 2026',
    deadline: 'Jun 30, 2026',
  },
  {
    id: '3',
    name: 'Environmental Conservation Grant',
    status: 'Active',
    applications: 56,
    postedDate: 'May 18, 2026',
    deadline: 'Jun 18, 2026',
  },
  {
    id: '4',
    name: 'Community Event Sponsorship',
    status: 'Draft',
    applications: 0,
    postedDate: 'May 22, 2026',
    deadline: 'Jun 10, 2026',
  },
  {
    id: '5',
    name: 'Senior Support Services Program',
    status: 'Closed',
    applications: 87,
    postedDate: 'Apr 28, 2026',
    deadline: 'May 20, 2026',
  },
];

export const RECENT_APPLICATIONS: RecentApplication[] = [
  {
    id: '1',
    applicant: 'Felicia Khan',
    appliedFor: 'Digital Skills Training Initiative',
    status: 'New',
    timeLabel: '2mins ago',
    avatar: avatar1,
  },
  {
    id: '2',
    applicant: 'James Wilson',
    appliedFor: 'Community Youth Mentorship Program',
    status: 'Under Review',
    timeLabel: '1hr ago',
    avatar: avatar2,
  },
  {
    id: '3',
    applicant: 'Andrea Garcia',
    appliedFor: 'Environmental Conservation Grant',
    status: 'Shortlisted',
    timeLabel: '1hr ago',
    avatar: avatar3,
  },
  {
    id: '4',
    applicant: 'David Chen',
    appliedFor: 'Community Event Sponsorship',
    status: 'New',
    timeLabel: '2hrs ago',
    avatar: avatar1,
  },
  {
    id: '5',
    applicant: 'Sarah Johnson',
    appliedFor: 'Senior Support Services Program',
    status: 'Under Review',
    timeLabel: '3hrs ago',
    avatar: avatar2,
  },
];

export const TEAM_ACTIVITY: TeamActivityItem[] = [
  {
    id: '1',
    member: 'Sarah Johnson',
    action: 'updated Community Grant listing',
    time: '20mins ago',
    icon: Pencil,
    iconBg: 'bg-[#EBDEFD]',
    iconBorder: 'border-[#DFD2F9]',
    iconColor: 'text-[#6821CD]',
  },
  {
    id: '2',
    member: 'David Miller',
    action: 'reviewed 14 applicants for Mentorship Program',
    time: '1hr ago',
    icon: Users,
    iconBg: 'bg-[#FFF6EA]',
    iconBorder: 'border-[#FFE8C7]',
    iconColor: 'text-[#D97706]',
  },
  {
    id: '3',
    member: 'Aisha Patel',
    action: 'published Digital Skills Training Initiative',
    time: '2hrs ago',
    icon: Upload,
    iconBg: 'bg-[#F5EDFD]',
    iconBorder: 'border-[#E8DFFB]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    id: '4',
    member: 'Michael Brown',
    action: 'shortlisted 6 applicants for Conservation Grant',
    time: '3hrs ago',
    icon: Star,
    iconBg: 'bg-[#FFF6EA]',
    iconBorder: 'border-[#FFE8C7]',
    iconColor: 'text-[#D97706]',
  },
  {
    id: '5',
    member: 'Emily Clark',
    action: 'invited a new team member to our workspace',
    time: '4hrs ago',
    icon: UserPlus,
    iconBg: 'bg-[#E8F6ED]',
    iconBorder: 'border-[#DCEDE3]',
    iconColor: 'text-[#15803D]',
  },
];

export const ORG_STATUS = {
  verification: 'Verified',
  profileComplete: 92,
  memberSince: 'May 20, 2026',
};

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  New: 'bg-[#EFF4FF] border border-[#DCE7FF] text-[#2F66C8]',
  'Under Review': 'bg-[#ECFDF5] border border-[#D1FAE5] text-[#15803D]',
  Shortlisted: 'bg-[#FFFBEB] border border-[#FEF3C7] text-[#B45309]',
  Rejected: 'bg-[#FEF2F2] border border-[#FEE2E2] text-[#B91C1C]',
};

export const OPPORTUNITY_STATUS_STYLES: Record<OpportunityStatus, string> = {
  Active: 'bg-[#ECFDF5] text-[#15803D]',
  Draft: 'bg-[#FFFBEB] text-[#B45309]',
  Closed: 'bg-[#FEF2F2] text-[#B91C1C]',
};

export { ArrowUp };
