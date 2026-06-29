import type { StaticImageData } from 'next/image';

import type { ElementType } from 'react';

import {

  BookOpenCheck,

  Briefcase,

  CalendarDays,

  ChartBarStacked,

  FileText,

  LockKeyhole,

  Rocket,

  Users,

} from 'lucide-react';

import avatar1 from '@assets/images/profile-avatar.png';

import avatar2 from '@assets/images/profile-google.png';

import avatar3 from '@assets/images/profile-georgebrown.png';

import briefcaseIcon from '@assets/icons/briefcase2.png';

import handCoinsIcon from '@assets/icons/hand-coins.png';

import heartIcon from '@assets/icons/heart-handshake.png';



export type OpportunityTab =

  | 'all'

  | 'internal'

  | 'external'

  | 'express-interest'

  | 'draft'

  | 'closed';



export type OpportunityType = 'internal' | 'external' | 'express-interest';

export type OpportunityStatus = 'Active' | 'Draft' | 'Scheduled' | 'Closed';

export type HealthStatus = 'High Engagement' | 'Moderate Engagement' | 'Low Engagement' | '-';



export interface HubStat {

  label: string;

  value: string | number;

  subtext?: string;

  change?: string;

  icon: ElementType;

  iconBg: string;

  iconColor: string;

}



export interface OpportunityRow {

  id: string;

  name: string;

  category: string;

  type: OpportunityType;

  status: OpportunityStatus;

  applications: number;

  applicationsDisplay?: string | number;

  applicationsDelta: string;

  views: number;

  deadline: string;

  daysLeft: string;

  health: HealthStatus;

  tab: OpportunityTab;

}



export interface RecentActivity {

  id: string;

  name: string;

  action: string;

  time: string;

  status: string;

  avatar: StaticImageData;

}



export interface AttentionAlert {

  id: string;

  title: string;

  opportunity: string;

  details: string[];

  actionLabel: string;

}



export const TYPE_ICONS = {

  internal: briefcaseIcon,

  external: handCoinsIcon,

  'express-interest': heartIcon,

} as const;



export const TYPE_ICON_BG = {

  internal: '#EFF4FF',

  external: '#FEF1E0',

  'express-interest': '#E6DFFB',

} as const;



export const HUB_STATS: HubStat[] = [

  {

    label: 'Active Opportunities',

    value: 24,

    change: '4%',

    subtext: 'vs last week',

    icon: Rocket,

    iconBg: 'bg-[#EDF9F1]',

    iconColor: 'text-[#15803D]',

  },

  {

    label: 'Draft Opportunities',

    value: 5,

    change: '8%',

    subtext: 'Awaiting publication',

    icon: BookOpenCheck,

    iconBg: 'bg-[#FFF3E3]',

    iconColor: 'text-[#D97706]',

  },

  {

    label: 'Scheduled Opportunities',

    value: 3,

    change: '12%',

    subtext: 'Upcoming',

    icon: CalendarDays,

    iconBg: 'bg-[#EFE8FD]',

    iconColor: 'text-[#7C3AED]',

  },

  {

    label: 'Closed Opportunities',

    value: 18,

    change: '6%',

    subtext: 'Archived',

    icon: LockKeyhole,

    iconBg: 'bg-[#FEE8E9]',

    iconColor: 'text-[#DC2626]',

  },

  {

    label: 'Total Applications',

    value: '1,284',

    change: '12%',

    subtext: 'this month',

    icon: Users,

    iconBg: 'bg-[#ECF2FE]',

    iconColor: 'text-[#2F66C8]',

  },

];



/** Figma mobile stat cards (148:3578) — distinct icon backgrounds from desktop. */
export const MOBILE_HUB_STATS: HubStat[] = [
  {
    label: 'Active Opportunities',
    value: 24,
    change: '4%',
    subtext: 'vs last week',
    icon: Briefcase,
    iconBg: 'bg-[#E8F1FE]',
    iconColor: 'text-[#2F66C8]',
  },
  {
    label: 'Draft Opportunities',
    value: 5,
    subtext: 'Awaiting publication',
    icon: Briefcase,
    iconBg: 'bg-[#E8F1FE]',
    iconColor: 'text-[#2F66C8]',
  },
  {
    label: 'Scheduled Opportunities',
    value: 3,
    subtext: 'Upcoming',
    icon: FileText,
    iconBg: 'bg-[#E4F5E6]',
    iconColor: 'text-[#15803D]',
  },
  {
    label: 'Closed Opportunities',
    value: 18,
    subtext: 'Archived',
    icon: ChartBarStacked,
    iconBg: 'bg-[#EFE6FD]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    label: 'Total Applications',
    value: '1,284',
    change: '12%',
    subtext: 'this month',
    icon: Users,
    iconBg: 'bg-[#FEF4DD]',
    iconColor: 'text-[#D97706]',
  },
];



export const HUB_TABS: { id: OpportunityTab; label: string; count: number }[] = [

  { id: 'all', label: 'All', count: 24 },

  { id: 'internal', label: 'Internal', count: 12 },

  { id: 'external', label: 'External', count: 7 },

  { id: 'express-interest', label: 'Express Interest', count: 5 },

  { id: 'draft', label: 'Draft', count: 5 },

  { id: 'closed', label: 'Closed', count: 18 },

];



export const OPPORTUNITIES: OpportunityRow[] = [

  {

    id: '1',

    name: 'Community Youth Mentorship Program',

    category: 'Mentorship',

    type: 'internal',

    status: 'Active',

    applications: 124,

    applicationsDelta: '+12 this week',

    views: 4210,

    deadline: 'Jun 18, 2026',

    daysLeft: '23 days left',

    health: 'High Engagement',

    tab: 'internal',

  },

  {

    id: '2',

    name: 'Digital Skills Scholarship',

    category: 'Education',

    type: 'internal',

    status: 'Active',

    applications: 98,

    applicationsDelta: '+6 this week',

    views: 2890,

    deadline: 'Jun 30, 2026',

    daysLeft: '35 days left',

    health: 'Moderate Engagement',

    tab: 'internal',

  },

  {

    id: '3',

    name: 'Environments Grant Volunteers',

    category: 'Grant',

    type: 'external',

    status: 'Active',

    applications: 56,

    applicationsDelta: '+3 this week',

    views: 1542,

    deadline: 'Jun 18, 2026',

    daysLeft: '23 days left',

    health: 'High Engagement',

    tab: 'external',

  },

  {

    id: '4',

    name: 'Community Event Volunteers',

    category: 'Volunteer',

    type: 'express-interest',

    status: 'Active',

    applications: 87,

    applicationsDisplay: '87',

    applicationsDelta: 'Interests',

    views: 1123,

    deadline: 'Jun 15, 2026',

    daysLeft: '50 days left',

    health: 'Moderate Engagement',

    tab: 'express-interest',

  },

  {

    id: '5',

    name: 'Youth Leadership Training',

    category: 'Training',

    type: 'internal',

    status: 'Scheduled',

    applications: 0,

    applicationsDelta: '-',

    views: 124,

    deadline: 'Aug 01, 2026',

    daysLeft: '67 days left',

    health: '-',

    tab: 'internal',

  },

  {

    id: '6',

    name: 'Senior Support Services Program',

    category: 'Support Services',

    type: 'internal',

    status: 'Draft',

    applications: 0,

    applicationsDelta: 'Not published',

    views: 0,

    deadline: '-',

    daysLeft: 'Not published',

    health: '-',

    tab: 'draft',

  },

];



export const RECENT_ACTIVITY: RecentActivity[] = [

  {

    id: '1',

    name: 'Felicia Khan',

    action: 'edited Community Mentorship Program',

    time: '20min ago',

    status: 'New',

    avatar: avatar1,

  },

  {

    id: '2',

    name: 'James Wilson',

    action: 'published Youth Leadership Grant',

    time: '1hr ago',

    status: 'Under Review',

    avatar: avatar2,

  },

  {

    id: '3',

    name: 'Andrea Garcia',

    action: 'extended Digital Skills Scholarship',

    time: '2hrs ago',

    status: 'Shortlisted',

    avatar: avatar3,

  },

  {

    id: '4',

    name: 'David Chen',

    action: 'created Community Event Volunteers',

    time: '3hrs ago',

    status: 'New',

    avatar: avatar1,

  },

  {

    id: '5',

    name: 'Sarah Johnson',

    action: 'published Environmental Grant Program',

    time: '4hrs ago',

    status: 'New',

    avatar: avatar2,

  },

];



export const ATTENTION_ALERTS: AttentionAlert[] = [

  {

    id: '1',

    title: 'Low Application Rate',

    opportunity: 'Digital Skills Scholarship',

    details: ['Applications: 4', 'Deadline: 5 days left'],

    actionLabel: 'Improve Listing',

  },

  {

    id: '2',

    title: 'Deadline Approaching',

    opportunity: 'Community Grant Program',

    details: ['2 days remaining'],

    actionLabel: 'Extend Deadline',

  },

];



export const TYPE_STYLES: Record<OpportunityType, string> = {

  internal: 'bg-[#E5ECFE] text-[#1C31D5]',

  external: 'bg-[#FDEDD9] text-[#AD5028]',

  'express-interest': 'bg-[#EAE3FB] text-[#5432D1]',

};



export const TYPE_LABELS: Record<OpportunityType, string> = {

  internal: 'Internal',

  external: 'External',

  'express-interest': 'Express Interest',

};



export const STATUS_STYLES: Record<OpportunityStatus, string> = {

  Active: 'bg-[#ECFDF5] text-[#15803D]',

  Draft: 'bg-[#FFEDD5] text-[#C2410C]',

  Scheduled: 'bg-[#EFE8FD] text-[#7C3AED]',

  Closed: 'bg-[#FEE2E2] text-[#B91C1C]',

};



export const HEALTH_DOT: Record<Exclude<HealthStatus, '-'>, string> = {

  'High Engagement': 'bg-[#22C55E]',

  'Moderate Engagement': 'bg-[#F59E0B]',

  'Low Engagement': 'bg-[#EF4444]',

};



export const ACTIVITY_STATUS_STYLES: Record<string, string> = {

  New: 'bg-[#ECFDF5] text-[#15803D]',

  'Under Review': 'bg-[#EFF4FF] text-[#2F66C8]',

  Shortlisted: 'bg-[#EFE8FD] text-[#7C3AED]',

};



export function filterByTab(items: OpportunityRow[], tab: OpportunityTab) {

  if (tab === 'all') return items;

  if (tab === 'draft') return items.filter((i) => i.status === 'Draft');

  if (tab === 'closed') return items.filter((i) => i.status === 'Closed');

  return items.filter((i) => i.type === tab);

}



export function filterByQuery(items: OpportunityRow[], query: string) {

  if (!query.trim()) return items;

  const q = query.toLowerCase();

  return items.filter(

    (o) => o.name.toLowerCase().includes(q) || o.category.toLowerCase().includes(q),

  );

}


