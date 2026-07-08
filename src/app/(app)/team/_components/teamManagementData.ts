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

/** Figma 522:855 — team performance panel */
export const TEAM_PERFORMANCE_METRICS: TeamPerformanceMetric[] = [
  { label: 'Application Reviewed', value: '1,284', change: '18%', icon: FileText },
  { label: 'Avg. Review Time', value: '2.4 days', change: '12%', icon: Clock },
  { label: 'Interviews Conducted', value: '86', change: '22%', icon: Users },
  { label: 'Interview Completion Rate', value: '92%', change: '6%', icon: UserCheck },
  { label: 'Active Reviewers', value: '12', change: '9%', icon: UserStar },
];

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
  Administrator: 'bg-[#F3EEFE] border border-[#E8E1FF] text-[#451EE1]',
  Manager: 'bg-[#E9F4FF] border border-[#D5E9FD] text-[#105CF0]',
  Reviewer: 'bg-[#FEF1E2] border border-[#FFE6C9] text-[#C05921]',
  Interviewer: 'bg-[#E2F7F9] border border-[#C3EEF2] text-[#0F6F7C]',
  Coordinator: 'bg-[#E2F7F9] border border-[#C3EEF2] text-[#0F6F7C]',
};

export const STATUS_STYLES: Record<TeamMemberStatus, string> = {
  Active: 'bg-[#ECFDF5] text-[#15803D]',
  'Pending Invite': 'bg-[#FFEDD5] text-[#C2410C]',
  Suspended: 'bg-[#FEE2E2] text-[#B91C1C]',
};

export function getTeamMember(id: string): TeamMemberRow | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}
