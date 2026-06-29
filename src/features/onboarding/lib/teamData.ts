import type { StaticImageData } from 'next/image';

import shieldCheckIcon from '@assets/icons/shield-check.png';
import userGreenIcon from '@assets/icons/user-green.png';
import boxIcon from '@assets/icons/box.png';
import eyeIcon from '@assets/icons/eye.png';
import sendIcon from '@assets/icons/send.png';
import starIcon from '@assets/icons/star2.png';
import userIcon from '@assets/icons/user.png';
import ownerAvatar from '@assets/images/profile-georgebrown.png';
import teamIllustration from '@assets/images/card2.png';

export type TeamRoleId = 'Admin' | 'Recruiter' | 'Program Coordinator' | 'Viewer';

export interface TeamMemberDraft {
  id: string;
  fullName: string;
  email: string;
  role: TeamRoleId | '';
}

export const TEAM_ROLES: TeamRoleId[] = [
  'Admin',
  'Recruiter',
  'Program Coordinator',
  'Viewer',
];

export const TEAM_SUBTITLE =
  'Collaborate with recruiters, coordinators, and administrators across your organization. You can always invite more team members.';

export const TEAM_INFO_MESSAGE = 'Your progress is automatically saved.';

export const ROLE_DEFINITIONS = [
  {
    id: 'Admin' as const,
    title: 'Admin',
    description: 'Full organization access',
    icon: shieldCheckIcon,
    iconBg: '#EFF4FF',
    checkBg: '#EFF4FF',
    permissions: [
      'Manage team members',
      'Manage billing & verification',
      'All opportunities & applicants',
      'Organization settings',
    ],
  },
  {
    id: 'Recruiter' as const,
    title: 'Recruiter',
    description: 'Manage opportunities & applicants',
    icon: userGreenIcon,
    iconBg: '#E8F6ED',
    checkBg: '#E8F6ED',
    permissions: [
      'Create & edit opportunities',
      'Review applicants',
      'Communicate with applicants',
      'View report',
    ],
  },
  {
    id: 'Program Coordinator' as const,
    title: 'Program Coordinator',
    description: 'Manage programs & workflows',
    icon: boxIcon,
    iconBg: '#F5EDFD',
    checkBg: '#F5EDFD',
    permissions: [
      'Manage programs',
      'Review & assign tasks',
      'Track program progress',
      'View relevant reports',
    ],
  },
  {
    id: 'Viewer' as const,
    title: 'Viewer',
    description: 'View-only access',
    icon: eyeIcon,
    iconBg: '#FFF6EA',
    checkBg: '#FFF6EA',
    permissions: [
      'View opportunities',
      'View applicants',
      'View reports',
      'No editing access',
    ],
  },
] as const;

export const WHY_TEAM_BENEFITS = [
  { icon: sendIcon, label: 'Collaborate on opportunity management' },
  { icon: userIcon, label: 'Review applications together' },
  { icon: boxIcon, label: 'Assign workflows efficiently' },
  { icon: starIcon, label: 'Improve response times' },
  { icon: shieldCheckIcon, label: 'Centralize organization operations' },
] as const;

export const ORGANIZATION_OWNER = {
  name: 'George Muskovisch',
  title: 'Primary Organization Owner',
  avatar: ownerAvatar as StaticImageData,
  note: 'The owner manages billing verification and organization-wide permissions.',
};

export const TEAM_SIDEBAR = {
  illustration: teamIllustration as StaticImageData,
  title: 'Why Add Your Team?',
  stat: '78% of organizations with teams respond faster to applicants.',
  soloNote: 'You can continue solo and invite your team later from your dashboard.',
};

export function createEmptyMember(): TeamMemberDraft {
  return {
    id: crypto.randomUUID(),
    fullName: '',
    email: '',
    role: '',
  };
}
