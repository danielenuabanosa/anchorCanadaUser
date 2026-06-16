import type { StaticImageData } from 'next/image';
import type { ElementType } from 'react';
import {
  FileText,
  LayoutList,
  UserCheck,
  Users,
} from 'lucide-react';
import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';
import provSickkids from '@assets/images/prov-sickkids.png';
import provUtoronto from '@assets/images/prov-utoronto.png';
import provWwf from '@assets/images/prov-wwf.png';
import provYmca from '@assets/images/prov-ymca.png';

export const PROVIDER_STATS = [
  {
    label: 'Active Listings',
    value: 8,
    change: '+2 this month',
    dotColor: 'bg-[#2F66C8]',
    barColor: 'bg-[#2F66C8]',
  },
  {
    label: 'Total Applications',
    value: 142,
    change: '+18 this week',
    dotColor: 'bg-amber-400',
    barColor: 'bg-amber-400',
  },
  {
    label: 'Profile Views',
    value: '2.4k',
    change: '+12% vs last month',
    dotColor: 'bg-[#0F172A]',
    barColor: 'bg-[#0F172A]',
  },
  {
    label: 'Response Rate',
    value: '94%',
    change: 'Above average',
    dotColor: 'bg-[#22C55E]',
    barColor: 'bg-[#22C55E]',
  },
] as const;

export const QUICK_ACTIONS = [
  { label: 'Post Opportunity', href: '#listings/new', icon: 'plus' as const },
  { label: 'View Applications', href: '#applications', icon: 'briefcase' as const },
  { label: 'Edit Profile', href: '#profile', icon: 'user' as const },
  { label: 'Invite Team', href: '#team', icon: 'users' as const },
] as const;

export type ApplicationStatus = 'New' | 'Under Review' | 'Shortlisted' | 'Rejected';

export interface RecentApplication {
  id: string;
  applicant: string;
  opportunity: string;
  status: ApplicationStatus;
  appliedAt: string;
  avatar: StaticImageData;
}

export const RECENT_APPLICATIONS: RecentApplication[] = [
  {
    id: '1',
    applicant: 'Sarah Chen',
    opportunity: 'Community Health Intern',
    status: 'New',
    appliedAt: '2026-06-16T09:30:00Z',
    avatar: avatar1,
  },
  {
    id: '2',
    applicant: 'Marcus Williams',
    opportunity: 'Youth Outreach Coordinator',
    status: 'Under Review',
    appliedAt: '2026-06-15T14:20:00Z',
    avatar: avatar2,
  },
  {
    id: '3',
    applicant: 'Priya Patel',
    opportunity: 'Mental Health Support Grant',
    status: 'Shortlisted',
    appliedAt: '2026-06-14T11:00:00Z',
    avatar: avatar3,
  },
  {
    id: '4',
    applicant: 'James Okafor',
    opportunity: 'Community Health Intern',
    status: 'New',
    appliedAt: '2026-06-13T16:45:00Z',
    avatar: avatar1,
  },
  {
    id: '5',
    applicant: 'Emily Zhang',
    opportunity: 'Volunteer Program Lead',
    status: 'Under Review',
    appliedAt: '2026-06-12T10:15:00Z',
    avatar: avatar2,
  },
];

export const PERFORMANCE_BARS = [
  { label: 'Mon', views: 45, applications: 12 },
  { label: 'Tue', views: 62, applications: 18 },
  { label: 'Wed', views: 38, applications: 9 },
  { label: 'Thu', views: 71, applications: 22 },
  { label: 'Fri', views: 55, applications: 15 },
  { label: 'Sat', views: 28, applications: 6 },
  { label: 'Sun', views: 33, applications: 8 },
] as const;

export const RECENT_ACTIVITY = [
  {
    id: '1',
    title: 'New application received',
    description: 'Sarah Chen applied to Community Health Intern',
    time: '2 hours ago',
    iconBg: 'bg-[#EBF1FE]',
  },
  {
    id: '2',
    title: 'Listing published',
    description: 'Youth Outreach Coordinator is now live',
    time: '5 hours ago',
    iconBg: 'bg-[#D1FAE5]',
  },
  {
    id: '3',
    title: 'Team member joined',
    description: 'Dr. Anita Rao accepted your invite',
    time: '1 day ago',
    iconBg: 'bg-[#F4F1FE]',
  },
  {
    id: '4',
    title: 'Application shortlisted',
    description: 'Priya Patel moved to shortlist',
    time: '2 days ago',
    iconBg: 'bg-[#FFEDD5]',
  },
  {
    id: '5',
    title: 'Profile viewed 48 times',
    description: 'Your organization profile gained traction',
    time: '3 days ago',
    iconBg: 'bg-[#EFF4FF]',
  },
] as const;

export const ORG_PROFILE_CHECKS = [
  { label: 'Organization Information', done: true },
  { label: 'Categories & Focus Areas', done: true },
  { label: 'Team Members', done: true },
  { label: 'Verification Documents', done: false },
  { label: 'Logo & Branding', done: false },
] as const;

export const PARTNER_LOGOS = [provSickkids, provUtoronto, provWwf, provYmca] as const;

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  New: 'bg-[#EBF1FE] text-[#2F66C8]',
  'Under Review': 'bg-[#FFEDD5] text-[#C2410C]',
  Shortlisted: 'bg-[#D1FAE5] text-[#15803D]',
  Rejected: 'bg-[#FEE2E2] text-[#B91C1C]',
};

export const ACTIVITY_ICONS: ElementType[] = [FileText, LayoutList, Users, UserCheck, LayoutList];

export function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning,';
  if (h < 17) return 'Good afternoon,';
  return 'Good evening,';
}

export function statHasValue(value: string | number) {
  if (typeof value === 'number') return value > 0;
  const numeric = parseFloat(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) && numeric > 0;
}
