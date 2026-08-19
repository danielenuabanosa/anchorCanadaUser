import {
  Shield,
  Timer,
  UserCheck,
  UserSearch,
  UserStar,
  Users,
} from 'lucide-react';
import type { TeamMemberRow, TeamStat } from '@/app/(app)/team/_components/teamManagementData';

export type ApiTeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string;
  department: string;
  status: 'Active' | 'Pending Invite' | 'Suspended' | string;
  lastActive: string;
  permissions: string;
  permissionKeys?: string[];
  inviteExpired?: boolean;
  avatarUrl?: string | null;
  isOwner?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiTeamResponse = {
  members: ApiTeamMember[];
  owner?: ApiTeamMember | null;
  stats: {
    total: number;
    active: number;
    pending: number;
    administrators: number;
    reviewers: number;
    interviewers: number;
  };
};

export function mapApiTeamMemberToRow(item: ApiTeamMember): TeamMemberRow {
  return {
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    title: item.title,
    department: item.department,
    status: (item.status as TeamMemberRow['status']) || 'Active',
    lastActive: item.lastActive || '—',
    permissions: item.permissions || 'Limited',
    permissionKeys: item.permissionKeys ?? [],
    avatar: item.avatarUrl || '',
    inviteExpired: item.inviteExpired,
  };
}

export function buildTeamHubStats(stats: ApiTeamResponse['stats']): TeamStat[] {
  return [
    {
      label: 'Total Members',
      value: stats.total,
      subtext: 'All seats',
      icon: Users,
      iconBg: 'bg-[#ECF2FE]',
      iconColor: 'text-[#2F66C8]',
    },
    {
      label: 'Active Members',
      value: stats.active,
      subtext: 'Can access workspace',
      icon: UserCheck,
      iconBg: 'bg-[#EDF9F1]',
      iconColor: 'text-[#15803D]',
    },
    {
      label: 'Pending Invites',
      value: stats.pending,
      subtext: 'Awaiting acceptance',
      icon: Timer,
      iconBg: 'bg-[#FFF3E3]',
      iconColor: 'text-[#D97706]',
    },
    {
      label: 'Administrators',
      value: stats.administrators,
      subtext: 'Full access',
      icon: Shield,
      iconBg: 'bg-[#EFE8FD]',
      iconColor: 'text-[#7C3AED]',
    },
    {
      label: 'Reviewers',
      value: stats.reviewers,
      subtext: 'Application review',
      icon: UserSearch,
      iconBg: 'bg-[#ECF2FE]',
      iconColor: 'text-[#2F66C8]',
    },
    {
      label: 'Interviewers',
      value: stats.interviewers,
      subtext: 'Interview seats',
      icon: UserStar,
      iconBg: 'bg-[#FFF3E3]',
      iconColor: 'text-[#D97706]',
    },
  ];
}
