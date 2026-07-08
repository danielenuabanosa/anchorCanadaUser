import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';
import { getTeamMember, type TeamMemberRow } from '../../_components/teamManagementData';

export type TeamMemberDetailTab = 'overview';

export interface TeamMemberDetail extends TeamMemberRow {
  phone: string;
  location: string;
  joined: string;
  about: string;
  permissionLevel: string;
  localTime: string;
  reportingTo: { name: string; title: string; avatar: typeof avatar1 };
  stats: {
    applicationsReviewed: number;
    interviewsConducted: number;
    avgReviewTime: string;
  };
  activity: { label: string; date: string }[];
}

const DETAIL_BY_ID: Record<string, Omit<TeamMemberDetail, keyof TeamMemberRow>> = {
  '1': {
    phone: '+1 (416) 555-0198',
    location: 'Toronto, ON, Canada',
    joined: 'Joined May 12, 2026',
    about:
      'Oversees program operation and leads the review team. Focused on youth development initiatives and scholarship programs.',
    permissionLevel: 'Full access to all features',
    localTime: '2:59 PM (Est)',
    reportingTo: { name: 'Michael Adams', title: 'Executive Director', avatar: avatar2 },
    stats: { applicationsReviewed: 648, interviewsConducted: 42, avgReviewTime: '2.3 Days' },
    activity: [
      { label: 'Reviewed 12 applications', date: '2 hours ago' },
      { label: 'Updated team permissions', date: '1 day ago' },
      { label: 'Joined organization', date: 'May 12, 2026' },
    ],
  },
};

const DEFAULT_DETAIL: Omit<TeamMemberDetail, keyof TeamMemberRow> = {
  phone: '+1 (416) 555-0100',
  location: 'Toronto, ON, Canada',
  joined: 'Joined Jan 15, 2026',
  about: 'Contributes to application review and program coordination across the organization.',
  permissionLevel: 'Limited access based on role',
  localTime: '2:59 PM (Est)',
  reportingTo: { name: 'Sarah Johnson', title: 'Operations Manager', avatar: avatar1 },
  stats: { applicationsReviewed: 124, interviewsConducted: 18, avgReviewTime: '3.1 Days' },
  activity: [
    { label: 'Last signed in', date: 'Recently' },
    { label: 'Joined organization', date: 'Jan 15, 2026' },
  ],
};

export const TEAM_MEMBER_DETAIL_TABS: { id: TeamMemberDetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
];

export function getTeamMemberDetail(id: string): TeamMemberDetail {
  const base = getTeamMember(id) ?? getTeamMember('1')!;
  const extra = DETAIL_BY_ID[id] ?? DEFAULT_DETAIL;
  return { ...base, ...extra };
}

export function getAdjacentMemberIds(id: string): { prev: string | null; next: string | null } {
  const ids = ['1', '2', '3', '4', '5', '6', '7'];
  const idx = ids.indexOf(id);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ids[idx - 1]! : null,
    next: idx < ids.length - 1 ? ids[idx + 1]! : null,
  };
}
