import type { Category } from '@/features/categories/types';
import type { Opportunity } from '@/features/opportunities/types';
import type { UserProfile } from '@/features/profile/types';
import type {
  ApiProviderApplication,
  ApiProviderOpportunity,
} from '@/features/provider/lib/mapHubData';

const now = new Date().toISOString();

export const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'jobs',
    type: 'job',
    title: 'Jobs',
    description: 'Employment listings your organization publishes.',
    icon: 'briefcase',
    opportunityCount: 12,
    color: '#2F66C8',
  },
  {
    id: '2',
    slug: 'training',
    type: 'training',
    title: 'Training',
    description: 'Training and skills programs.',
    icon: 'graduation-cap',
    opportunityCount: 5,
    color: '#9333EA',
  },
  {
    id: '3',
    slug: 'housing',
    type: 'housing',
    title: 'Housing',
    description: 'Housing support programs.',
    icon: 'home',
    opportunityCount: 3,
    color: '#15803D',
  },
];

export const MOCK_API_PROVIDER_OPPORTUNITIES: ApiProviderOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Youth Mentorship Program',
    opportunityType: 'internal',
    category: 'Community',
    status: 'live',
    location: 'Toronto, ON',
    deadline: '2026-12-01',
    createdAt: now,
  },
  {
    id: 'opp-2',
    title: 'Community Health Navigator',
    opportunityType: 'internal',
    category: 'Jobs',
    status: 'live',
    location: 'Mississauga, ON',
    deadline: '2026-11-15',
    createdAt: now,
  },
  {
    id: 'opp-3',
    title: 'Summer Internship — Program Design',
    opportunityType: 'external',
    category: 'Internship',
    status: 'pending_review',
    location: 'Remote',
    deadline: '2026-08-20',
    createdAt: now,
  },
  {
    id: 'opp-4',
    title: 'Volunteer Outreach Coordinator',
    opportunityType: 'express-interest',
    category: 'Volunteer',
    status: 'draft',
    location: 'Ottawa, ON',
    deadline: '2026-10-30',
    createdAt: now,
  },
];

export const MOCK_API_PROVIDER_APPLICATIONS: ApiProviderApplication[] = [
  {
    id: 'app-1',
    opportunityTitle: 'Youth Mentorship Program',
    applicantName: 'Sarah Chen',
    applicantEmail: 'sarah.chen@email.com',
    status: 'under_review',
    createdAt: now,
  },
  {
    id: 'app-2',
    opportunityTitle: 'Community Health Navigator',
    applicantName: 'James Okafor',
    applicantEmail: 'j.okafor@email.com',
    status: 'shortlisted',
    createdAt: now,
  },
  {
    id: 'app-3',
    opportunityTitle: 'Youth Mentorship Program',
    applicantName: 'Priya Sharma',
    applicantEmail: 'priya.s@email.com',
    status: 'new',
    createdAt: now,
  },
  {
    id: 'app-4',
    opportunityTitle: 'Community Health Navigator',
    applicantName: 'Alex Thompson',
    applicantEmail: 'alex.t@email.com',
    status: 'accepted',
    createdAt: now,
  },
];

export const MOCK_PROVIDER_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Youth Mentorship Program',
    type: 'community',
    status: 'open',
    provider: 'Maple Futures Nonprofit',
    location: 'Toronto, ON',
    province: 'Ontario',
    description: 'Mentorship program connecting youth with industry professionals.',
    tags: ['Mentorship', 'Youth'],
    deadline: '2026-12-01',
    createdAt: now,
    slug: 'youth-mentorship-program',
  },
  {
    id: 'opp-2',
    title: 'Community Health Navigator',
    type: 'job',
    status: 'open',
    provider: 'Maple Futures Nonprofit',
    location: 'Mississauga, ON',
    province: 'Ontario',
    description: 'Support newcomers navigating local health services.',
    tags: ['Health', 'Community'],
    salary: '$48k – $52k',
    createdAt: now,
    slug: 'community-health-navigator',
  },
];

export function buildMockProviderProfile(overrides?: Partial<UserProfile>): UserProfile {
  return {
    id: 'static-provider',
    name: 'Maple Futures Nonprofit',
    email: 'provider@anchorcanada.local',
    role: 'business',
    bio: 'Serving communities across the Greater Toronto Area.',
    interests: [],
    province: 'Ontario',
    createdAt: now,
    ...overrides,
  };
}
