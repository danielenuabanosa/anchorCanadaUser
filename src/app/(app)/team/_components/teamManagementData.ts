import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';
import {
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
  department: string;
  status: TeamMemberStatus;
  lastActive: string;
  permissions: string;
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

/** Figma 521:3301 — six stat cards */
export const TEAM_STATS: TeamStat[] = [
  { label: 'Total Members', value: 24, change: '+12%', subtext: 'from last 30 days', icon: Users, iconBg: 'bg-[#ECF2FE]', iconColor: 'text-[#2F66C8]' },
  { label: 'Active Members', value: 20, change: '+8%', subtext: 'from last 30 days', icon: UserCheck, iconBg: 'bg-[#EDF9F1]', iconColor: 'text-[#15803D]' },
  { label: 'Pending Invites', value: 3, change: '-1%', changeNegative: true, subtext: 'from last 30 days', icon: Timer, iconBg: 'bg-[#FFF3E3]', iconColor: 'text-[#D97706]' },
  { label: 'Administrators', value: 4, change: '+2%', subtext: 'from last 30 days', icon: Shield, iconBg: 'bg-[#EFE8FD]', iconColor: 'text-[#7C3AED]' },
  { label: 'Reviewers', value: 12, change: '+15%', subtext: 'from last 30 days', icon: UserSearch, iconBg: 'bg-[#ECF2FE]', iconColor: 'text-[#2F66C8]' },
  { label: 'Interviewers', value: 8, change: '+5%', subtext: 'from last 30 days', icon: UserStar, iconBg: 'bg-[#FFF3E3]', iconColor: 'text-[#D97706]' },
];

export const TEAM_MEMBERS: TeamMemberRow[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@maplefuture.ca',
    role: 'Administrator',
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
    department: 'Programs',
    status: 'Active',
    lastActive: '1 day ago',
    permissions: 'Can only review applications',
    avatar: avatar3,
  },
  {
    id: '4',
    name: 'Daniel Thompson',
    email: 'daniel.t@maplefuture.ca',
    role: 'Coordinator',
    department: 'Outreach',
    status: 'Pending Invite',
    lastActive: '—',
    permissions: 'Pending invitation acceptance',
    avatar: avatar1,
  },
];

export const ROLE_STYLES: Record<string, string> = {
  Administrator: 'bg-[#EFE8FD] text-[#7C3AED]',
  Manager: 'bg-[#EBF1FE] text-[#2F66C8]',
  Reviewer: 'bg-[#ECFDF5] text-[#15803D]',
  Coordinator: 'bg-[#FFEDD5] text-[#C2410C]',
};

export const STATUS_STYLES: Record<TeamMemberStatus, string> = {
  Active: 'bg-[#ECFDF5] text-[#15803D]',
  'Pending Invite': 'bg-[#FFEDD5] text-[#C2410C]',
  Suspended: 'bg-[#FEE2E2] text-[#B91C1C]',
};
