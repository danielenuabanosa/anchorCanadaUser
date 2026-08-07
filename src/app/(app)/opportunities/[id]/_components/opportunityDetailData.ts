import type { StaticImageData } from 'next/image';
import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';
import orgLogo from '@assets/images/prov-sickkids.png';

export const DEFAULT_OPPORTUNITY_DETAIL = {
  id: 'OP-2026-00025',
  title: 'Merit Scholarship Program',
  status: 'Published' as string,
  opportunityType: 'Internal Opportunity' as string,
  category: 'Scholarships',
  description:
    'The Merit Scholarship Program recognizes outstanding academic achievement and community leadership among post-secondary students across Canada.',
  organization: 'Maple Future Foundation',
  created: 'May 20, 2026',
  published: 'May 22, 2026',
  deadline: 'June 30, 2026',
  opens: 'May 15, 2026',
  targetAudience: 'Post-secondary Students',
  location: 'Canada (Nationwide)',
  template: 'Merit Scholarship',
  benefits: '$5,000 award + Mentorship opportunity',
  eligibility:
    'Canadian citizens or permanent residents enrolled in a recognized post-secondary institution.',
  requirements: 'Transcripts, Personal Statement, 2 Reference Letters',
  logo: orgLogo,
  metrics: {
    views: { value: '2,450', change: '+18%' },
    saves: { value: '568', change: '+12%' },
    applications: { value: '156', change: '+25%' },
    conversion: { value: '6.37%', change: '+1.25%' },
  },
  pipeline: [
    { label: 'Submitted', count: 156 },
    { label: 'Under Review', count: 72 },
    { label: 'Shortlisted', count: 58 },
    { label: 'Interview', count: 12 },
    { label: 'Accepted', count: 5 },
  ],
  health: {
    daysRemaining: '12 days',
    daysUntilLabel: 'Until Jun 30, 2026',
    velocity: { value: '5.2/day', change: '12%', period: 'from last 7 days' },
    completion: { value: '68%', change: '8%', period: 'from last 7 days' },
    trend: 'Rising',
    trendSubtext: 'Positive momentum',
  },
  timeline: [
    { label: 'Opens', date: 'May 15, 2026', active: true },
    { label: 'Deadline', date: 'June 30, 2026', urgent: true },
    { label: 'Review', date: 'Jul 1 – Jul 13, 2026' },
    { label: 'Decision', date: 'Jul 1, 2026' },
  ],
  recentApplicants: [
    { id: '1', name: 'Olivia Bennett', applied: 'Jun 12, 2026', status: 'Under Review', score: '92%', avatar: avatar1 },
    { id: '2', name: 'Ethan Brocks', applied: 'Jun 11, 2026', status: 'Shortlisted', score: '88%', avatar: avatar2 },
    { id: '3', name: 'Aisha Khan', applied: 'Jun 10, 2026', status: 'Under Review', score: '85%', avatar: avatar3 },
    { id: '4', name: 'Noah Trembley', applied: 'Jun 9, 2026', status: 'Submitted', score: '—', avatar: avatar1 },
    { id: '5', name: 'Sophia Martin', applied: 'Jun 8, 2026', status: 'Submitted', score: '—', avatar: avatar2 },
  ],
};

export type OpportunityDetail = typeof DEFAULT_OPPORTUNITY_DETAIL;

export const STATUS_BADGE_STYLES: Record<string, string> = {
  'Under Review': 'bg-[#ECFDF5] text-[#15803D] border border-[#D1FAE5]',
  Shortlisted: 'bg-[#EFE8FD] text-[#7C3AED] border border-[#E9D5FF]',
  Submitted: 'bg-[#EBF1FE] text-[#2F66C8] border border-[#DCE8FF]',
  Accepted: 'bg-[#ECFDF5] text-[#15803D]',
};

export const PIPELINE_COLORS = ['#1B3A6B', '#2F66C8', '#5B6FD6', '#8B7CF0', '#B4A5F5'];
