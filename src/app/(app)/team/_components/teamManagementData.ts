import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';
import {
  Clock,
  FileText,
  Shield,
  Timer,
  UserCheck,
  UserSearch,
  UserStar,
  Users,
} from 'lucide-react';
import type { ElementType } from 'react';

export type TeamMemberStatus = 'Active' | 'Pending Invite' | 'Suspended';

export interface TeamMemberRow {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string;
  department: string;
  status: TeamMemberStatus;
  lastActive: string;
  permissions: string;
  avatar: typeof avatar1;
  /** Figma 580:15046 — pending invite past 7-day window */
  inviteExpired?: boolean;
}

export interface InvitePayload {
  email: string;
  name: string;
  role: string;
  department: string;
  avatar: typeof avatar1;
}

export interface TeamStat {
  label: string;
  value: string | number;
  change?: string;
  changeNegative?: boolean;
  subtext: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

export const FILTER_LABELS = ['All Roles', 'All Statuses', 'All Departments'] as const;

export const TEAM_ROLE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Roles' },
  { value: 'Administrator', label: 'Administrator' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Reviewer', label: 'Reviewer' },
  { value: 'Interviewer', label: 'Interviewer' },
  { value: 'Coordinator', label: 'Coordinator' },
] as const;

export const TEAM_STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Pending Invite', label: 'Pending Invite' },
  { value: 'Suspended', label: 'Suspended' },
] as const;

export const TEAM_DEPARTMENT_FILTER_OPTIONS = [
  { value: 'all', label: 'All Departments' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Programs', label: 'Programs' },
  { value: 'Outreach', label: 'Outreach' },
] as const;

export interface TeamHubFilters {
  role: string;
  status: string;
  department: string;
}

export const DEFAULT_TEAM_HUB_FILTERS: TeamHubFilters = {
  role: 'all',
  status: 'all',
  department: 'all',
};

export function filterByTeamHubFilters(items: TeamMemberRow[], filters: TeamHubFilters) {
  return items.filter((row) => {
    if (filters.role !== 'all' && row.role !== filters.role) return false;
    if (filters.status !== 'all' && row.status !== filters.status) return false;
    if (filters.department !== 'all' && row.department !== filters.department) return false;
    return true;
  });
}

export function sortTeamMembers(items: TeamMemberRow[], sort: string) {
  const next = [...items];
  switch (sort) {
    case 'oldest':
      return next.reverse();
    case 'name-asc':
      return next.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return next.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
    default:
      return next;
  }
}

/** Figma pagination — total roster count vs visible mock rows */
export const TOTAL_MEMBER_COUNT = 24;

export interface TeamActivityItem {
  id: string;
  memberName: string;
  action: string;
  timeLabel: string;
  isNew?: boolean;
  avatar: typeof avatar1;
}

/** Figma 522:793 — recent team activity feed */
export const RECENT_TEAM_ACTIVITY: TeamActivityItem[] = [
  {
    id: '1',
    memberName: 'Michael Adams',
    action: 'reviewed an application',
    timeLabel: '2 hours ago',
    isNew: true,
    avatar: avatar2,
  },
  {
    id: '2',
    memberName: 'Jessica Lee',
    action: 'scheduled an interview',
    timeLabel: '3 hours ago',
    isNew: true,
    avatar: avatar3,
  },
  {
    id: '3',
    memberName: 'Sarah Johnson',
    action: 'invited a new team member',
    timeLabel: '1 day ago',
    avatar: avatar1,
  },
  {
    id: '4',
    memberName: 'Daniel Thompson',
    action: 'completed an interview',
    timeLabel: '1 day ago',
    avatar: avatar1,
  },
];

export interface TeamPerformanceMetric {
  label: string;
  value: string;
  change: string;
  icon: ElementType;
}

export const TEAM_PERFORMANCE_PERIOD_OPTIONS = [
  { value: 'this-month', label: 'This Month' },
  { value: 'last-month', label: 'Last Month' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: 'year', label: 'This Year' },
] as const;

/** Figma 522:855 — team performance panel */
export const TEAM_PERFORMANCE_METRICS: TeamPerformanceMetric[] = [
  { label: 'Application Reviewed', value: '1,284', change: '18%', icon: FileText },
  { label: 'Avg. Review Time', value: '2.4 days', change: '12%', icon: Clock },
  { label: 'Interviews Conducted', value: '86', change: '22%', icon: Users },
  { label: 'Interview Completion Rate', value: '92%', change: '6%', icon: UserCheck },
  { label: 'Active Reviewers', value: '12', change: '9%', icon: UserStar },
];

const TEAM_PERFORMANCE_BY_PERIOD: Record<string, Omit<TeamPerformanceMetric, 'icon' | 'label'>[]> = {
  'this-month': [
    { value: '1,284', change: '18%' },
    { value: '2.4 days', change: '12%' },
    { value: '86', change: '22%' },
    { value: '92%', change: '6%' },
    { value: '12', change: '9%' },
  ],
  'last-month': [
    { value: '1,102', change: '9%' },
    { value: '2.7 days', change: '4%' },
    { value: '74', change: '11%' },
    { value: '89%', change: '3%' },
    { value: '11', change: '5%' },
  ],
  '7d': [
    { value: '312', change: '14%' },
    { value: '2.1 days', change: '8%' },
    { value: '22', change: '18%' },
    { value: '94%', change: '2%' },
    { value: '10', change: '7%' },
  ],
  '30d': [
    { value: '1,284', change: '18%' },
    { value: '2.4 days', change: '12%' },
    { value: '86', change: '22%' },
    { value: '92%', change: '6%' },
    { value: '12', change: '9%' },
  ],
  year: [
    { value: '14,820', change: '31%' },
    { value: '2.6 days', change: '15%' },
    { value: '942', change: '28%' },
    { value: '90%', change: '8%' },
    { value: '18', change: '20%' },
  ],
};

export function getTeamPerformanceMetrics(period: string): TeamPerformanceMetric[] {
  const values = TEAM_PERFORMANCE_BY_PERIOD[period] ?? TEAM_PERFORMANCE_BY_PERIOD['this-month']!;
  return TEAM_PERFORMANCE_METRICS.map((metric, index) => ({
    ...metric,
    value: values[index]?.value ?? metric.value,
    change: values[index]?.change ?? metric.change,
  }));
}
export const TEAM_ROLES = [
  { id: 'administrator', label: 'Administrator', description: 'Full access to all features' },
  { id: 'manager', label: 'Manager', description: 'Manage team and programs' },
  { id: 'reviewer', label: 'Reviewer', description: 'Review and evaluate applications' },
  { id: 'interviewer', label: 'Interviewer', description: 'Schedule and conduct interviews' },
  { id: 'custom', label: 'Custom Role', description: 'Create a custom set of permissions' },
] as const;

export const PERMISSION_GROUPS = [
  {
    name: 'Opportunities',
    permissions: [
      'Create Opportunities',
      'Edit Opportunities',
      'Delete Opportunities',
      'Publish Opportunities',
      'Archive Opportunities',
      'View Opportunity Analytics',
    ],
  },
  {
    name: 'Applications',
    permissions: [
      'Review Applications',
      'Shortlist Applications',
      'Schedule Interviews',
      'Accept Applications',
      'Reject Applications',
      'Export Applications',
    ],
  },
  {
    name: 'Organization',
    permissions: [
      'Manage Team Members',
      'View Analytics',
      'Manage Organization Profile',
      'Manage Settings',
      'Manage Billings',
    ],
  },
] as const;

/** Figma 521:3301 — six stat cards */
export const TEAM_STATS: TeamStat[] = [
  { label: 'Total Members', value: 24, change: '+12%', subtext: 'from last 30 days', icon: Users, iconBg: 'bg-[#ECF2FE]', iconColor: 'text-[#2F66C8]' },
  { label: 'Active Members', value: 20, change: '+8%', subtext: 'from last 30 days', icon: UserCheck, iconBg: 'bg-[#EDF9F1]', iconColor: 'text-[#15803D]' },
  { label: 'Pending Invites', value: 3, change: '-1%', changeNegative: true, subtext: 'from last 30 days', icon: Timer, iconBg: 'bg-[#FFF3E3]', iconColor: 'text-[#D97706]' },
  { label: 'Administrators', value: 4, change: '+2%', subtext: 'from last 30 days', icon: Shield, iconBg: 'bg-[#EFE8FD]', iconColor: 'text-[#7C3AED]' },
  { label: 'Reviewers', value: 12, change: '+15%', subtext: 'from last 30 days', icon: UserSearch, iconBg: 'bg-[#ECF2FE]', iconColor: 'text-[#2F66C8]' },
  { label: 'Interviewers', value: 8, change: '+5%', subtext: 'from last 30 days', icon: UserStar, iconBg: 'bg-[#FFF3E3]', iconColor: 'text-[#D97706]' },
];

export const MOBILE_TEAM_STATS = TEAM_STATS;

/** Figma 521:3301 table rows */
export const TEAM_MEMBERS: TeamMemberRow[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@maplefuture.ca',
    role: 'Administrator',
    title: 'Operations Manager',
    department: 'Operations',
    status: 'Active',
    lastActive: '2 hours ago',
    permissions: 'Has access to everything',
    avatar: avatar1,
  },
  {
    id: '2',
    name: 'Michael Adams',
    email: 'michael.a@maplefuture.ca',
    role: 'Manager',
    title: 'Executive Director',
    department: 'Programs',
    status: 'Active',
    lastActive: '5 hours ago',
    permissions: 'Has access to everything',
    avatar: avatar2,
  },
  {
    id: '3',
    name: 'Jessica Lee',
    email: 'jessica.l@maplefuture.ca',
    role: 'Reviewer',
    title: 'Program Reviewer',
    department: 'Programs',
    status: 'Active',
    lastActive: '1 day ago',
    permissions: 'Can only review applications',
    avatar: avatar3,
  },
  {
    id: '4',
    name: 'Daniel Thompson',
    email: 'daniel.a@maplefuture.ca',
    role: 'Interviewer',
    title: 'Interview Coordinator',
    department: 'Programs',
    status: 'Active',
    lastActive: '3 hours ago',
    permissions: 'Can only update status of applications',
    avatar: avatar1,
  },
  {
    id: '5',
    name: 'Emily Clark',
    email: 'emily.c@maplefuture.ca',
    role: 'Reviewer',
    title: 'Application Reviewer',
    department: 'Operations',
    status: 'Active',
    lastActive: '2 days ago',
    permissions: 'Can only review applications',
    avatar: avatar2,
  },
  {
    id: '6',
    name: 'David William',
    email: 'david.w@maplefuture.ca',
    role: 'Reviewer',
    title: 'Junior Reviewer',
    department: 'Programs',
    status: 'Pending Invite',
    lastActive: '—',
    permissions: 'Limited',
    avatar: avatar3,
    inviteExpired: true,
  },
  {
    id: '7',
    name: 'Priya Patel',
    email: 'priya.p@maplefutures.ca',
    role: 'Interviewer',
    title: 'Interview Specialist',
    department: 'Programs',
    status: 'Suspended',
    lastActive: '5 days ago',
    permissions: 'Limited',
    avatar: avatar1,
  },
];

export const ROLE_STYLES: Record<string, string> = {
  Administrator: 'bg-[#F2EFFF] text-[#1C09D5]',
  Manager: 'bg-[#E9F4FF] text-[#105CF0]',
  Reviewer: 'bg-[#FEF1E2] text-[#C05921]',
  Interviewer: 'bg-[#E2F7F9] text-[#0F6F7C]',
  Coordinator: 'bg-[#E2F7F9] text-[#0F6F7C]',
};

export const STATUS_STYLES: Record<TeamMemberStatus, string> = {
  Active: 'bg-[#ECFDF5] text-[#15803D]',
  'Pending Invite': 'bg-[#FFEDD5] text-[#C2410C]',
  Suspended: 'bg-[#FEE2E2] text-[#B91C1C]',
};

export function getTeamMember(id: string): TeamMemberRow | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}
