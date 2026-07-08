import type { ElementType } from 'react';
import {
  ShieldUser,
  Timer,
  UserCheck,
  UserSearch,
  Users,
  UserStar,
} from 'lucide-react';
import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';

export interface AnalyticsStat {
  label: string;
  value: string | number;
  change?: string;
  changeNegative?: boolean;
  subtext?: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

export type OpportunityTypeTag = 'Internal' | 'External' | 'Express Interest';

export type OpportunityStatusTag = 'Active' | 'Paused';

export interface TopOpportunityRow {
  id: string;
  name: string;
  createdBy: string;
  creatorAvatar: typeof avatar1;
  type: OpportunityTypeTag;
  views: number;
  applications: number;
  conversionRate: string;
  interviewRate: string;
  status: OpportunityStatusTag;
}

export interface TeamPerformanceRow {
  id: string;
  name: string;
  email: string;
  avatar: typeof avatar1;
  applicationsReviewed: number;
  avgReviewTime: string;
  interviewsConducted: number;
}

export interface TrafficSourceRow {
  label: string;
  percent: string;
  count: string;
  color: string;
}

export interface CountryRow {
  country: string;
  percent: string;
  count: number;
}

export interface InsightRow {
  id: string;
  title: string;
  description: string;
}

export interface InsightStatColumn {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface InsightDetail extends InsightRow {
  detailsHeading: string;
  detailsText: string;
  stats: InsightStatColumn[];
  recommendations: string[];
}

export interface FunnelStep {
  label: string;
  value: string;
  color: string;
}

export const ANALYTICS_DATE_RANGE = 'May 1 - May 31, 2026';

export const CHART_TIME_RANGE_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'] as const;

export const CHART_GRANULARITY_OPTIONS = ['Daily', 'Weekly', 'Monthly'] as const;

export const ANALYTICS_STATS: AnalyticsStat[] = [
  {
    label: 'Total Views',
    value: '24,842',
    change: '12%',
    icon: Users,
    iconBg: 'bg-[#EFF4FF]',
    iconColor: 'text-[#2F66C8]',
  },
  {
    label: 'Applications',
    value: '1,284',
    change: '8%',
    icon: UserCheck,
    iconBg: 'bg-[#ECFDF5]',
    iconColor: 'text-[#15803D]',
  },
  {
    label: 'Conversion Rates',
    value: '5.17%',
    change: '1%',
    changeNegative: true,
    icon: Timer,
    iconBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#C2410C]',
  },
  {
    label: 'Interview Rate',
    value: '21.6%',
    change: '2%',
    icon: ShieldUser,
    iconBg: 'bg-[#F4F1FE]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    label: 'Acceptance Rate',
    value: '12.4%',
    change: '15%',
    icon: UserSearch,
    iconBg: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0369A1]',
  },
  {
    label: 'Active Opportunities',
    value: '18',
    change: '5%',
    icon: UserStar,
    iconBg: 'bg-[#FDF4FF]',
    iconColor: 'text-[#9333EA]',
  },
];

export const APPLICATIONS_OVER_TIME = [
  { label: 'May 1', value: 195 },
  { label: 'May 6', value: 285 },
  { label: 'May 11', value: 320 },
  { label: 'May 16', value: 260 },
  { label: 'May 21', value: 310 },
  { label: 'May 26', value: 365 },
  { label: 'May 31', value: 340 },
] as const;

export const APPLICATION_FUNNEL: FunnelStep[] = [
  { label: 'Views', value: '24,642', color: '#154EDF' },
  { label: 'Saves', value: '2,842', color: '#2F66C8' },
  { label: 'Applications', value: '1,284', color: '#4B83D3' },
  { label: 'Shortlisted', value: '276', color: '#6899DE' },
  { label: 'Interviews', value: '148', color: '#85AFE9' },
  { label: 'Accepted', value: '55', color: '#A2C5F4' },
];

export const TOP_COUNTRIES: CountryRow[] = [
  { country: 'Canada', percent: '42.6%', count: 547 },
  { country: 'India', percent: '16.3%', count: 225 },
  { country: 'Nigeria', percent: '7.8%', count: 100 },
  { country: 'Philippines', percent: '5.6%', count: 72 },
  { country: 'United States', percent: '4.9%', count: 63 },
];

export const TRAFFIC_SOURCES: TrafficSourceRow[] = [
  { label: 'Anchor Search', percent: '45.2%', count: '11,240', color: '#154EDF' },
  { label: 'Direct Link', percent: '23.7%', count: '5,888', color: '#2F66C8' },
  { label: 'Email Campaign', percent: '15.3%', count: '3,812', color: '#6899DE' },
  { label: 'Social Media', percent: '9.8%', count: '2,432', color: '#85AFE9' },
  { label: 'Organization Profile', percent: '6.0%', count: '1,470', color: '#A2C5F4' },
];

export const ANALYTICS_INSIGHTS: InsightDetail[] = [
  {
    id: 'higher-application-activity',
    title: 'Higher Application Activity',
    description:
      'Your scholarship receive 43% more applications that volunteer opportunities. Consider creating more scholarship opportunities.',
    detailsHeading: 'Insight Details',
    detailsText:
      'Based on data from the selected date range, scholarship opportunities have a significantly higher application rate compared to volunteer opportunities.',
    stats: [
      { label: 'Scholarship Opportunities', value: '786 applications' },
      { label: 'Volunteer Opportunities', value: '548 applications' },
      { label: 'Difference', value: '+43% more applications', highlight: true },
    ],
    recommendations: [
      'Create more scholarship opportunities',
      'Highlight Scholarship opportunities on your profile',
      'Consider increasing visibility through eail campaigns',
    ],
  },
  {
    id: 'conversion-improvement',
    title: 'Conversion Improvement',
    description:
      'Opportunities with strong descriptions have a 28% higher conversion rate. Try enhancing opportunity descriptions.',
    detailsHeading: 'Insight Details',
    detailsText:
      'Opportunities with detailed descriptions, clear eligibility criteria, and compelling benefits convert viewers into applicants at a significantly higher rate.',
    stats: [
      { label: 'Strong Descriptions', value: '6.2% conversion' },
      { label: 'Basic Descriptions', value: '4.9% conversion' },
      { label: 'Difference', value: '+28% higher rate', highlight: true },
    ],
    recommendations: [
      'Enhance opportunity descriptions with clear benefits',
      'Add eligibility criteria and deadlines prominently',
      'Include success stories from past applicants',
    ],
  },
  {
    id: 'interview-efficiency',
    title: 'Interview Efficiency',
    description:
      'Your average interview completion rate it up 12% compared to last month. Great job! Keep it up.',
    detailsHeading: 'Insight Details',
    detailsText:
      'Your team is completing interviews faster and more consistently, improving the overall applicant experience and reducing time-to-decision.',
    stats: [
      { label: 'This Month', value: '84% completion' },
      { label: 'Last Month', value: '75% completion' },
      { label: 'Difference', value: '+12% improvement', highlight: true },
    ],
    recommendations: [
      'Maintain current interview scheduling practices',
      'Send reminder notifications to applicants',
      'Share best practices across the review team',
    ],
  },
  {
    id: 'top-performing-source',
    title: 'Top Performing Source',
    description:
      'Anchor Search drives the most applications (45.2%). Optimize opportunities for search visibility.',
    detailsHeading: 'Insight Details',
    detailsText:
      'Anchor Search is your highest-performing traffic source, driving nearly half of all opportunity views and a disproportionate share of applications.',
    stats: [
      { label: 'Anchor Search', value: '11,240 views' },
      { label: 'Direct Link', value: '5,888 views' },
      { label: 'Difference', value: '45.2% of total', highlight: true },
    ],
    recommendations: [
      'Optimize opportunity titles and tags for search',
      'Keep opportunity listings active and up to date',
      'Use relevant keywords in descriptions',
    ],
  },
];

export const EXPORT_INCLUDE_OPTIONS = [
  { key: 'overview', label: 'Overview Summary' },
  { key: 'opportunityPerformance', label: 'Opportunity Performance' },
  { key: 'applicantFunnel', label: 'Applicant Funnel' },
  { key: 'teamPerformance', label: 'Team Performance' },
  { key: 'demographics', label: 'Demographics' },
  { key: 'trafficSources', label: 'Traffic Sources' },
  { key: 'insights', label: 'Insights & Recommendations' },
] as const;

export type ExportIncludeKey = (typeof EXPORT_INCLUDE_OPTIONS)[number]['key'];

export const TOP_OPPORTUNITIES: TopOpportunityRow[] = [
  {
    id: '1',
    name: 'Youth Innovation Grant',
    createdBy: 'Sarah Johnson',
    creatorAvatar: avatar1,
    type: 'Internal',
    views: 5648,
    applications: 342,
    conversionRate: '6.05%',
    interviewRate: '24.6%',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Merit Scholarship Program',
    createdBy: 'Michael Adams',
    creatorAvatar: avatar2,
    type: 'Internal',
    views: 3842,
    applications: 256,
    conversionRate: '6.67%',
    interviewRate: '28.1%',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Community Volunteer Program',
    createdBy: 'Jessica Lee',
    creatorAvatar: avatar1,
    type: 'External',
    views: 3126,
    applications: 184,
    conversionRate: '5.89%',
    interviewRate: '18.5%',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Mentorship Programs',
    createdBy: 'Daniel Thompson',
    creatorAvatar: avatar2,
    type: 'Express Interest',
    views: 2945,
    applications: 143,
    conversionRate: '4.86%',
    interviewRate: '19.6%',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Startup Incubator Cohort',
    createdBy: 'Emily Clark',
    creatorAvatar: avatar1,
    type: 'Internal',
    views: 2112,
    applications: 98,
    conversionRate: '4.64%',
    interviewRate: '22.4%',
    status: 'Paused',
  },
];

export const TEAM_PERFORMANCE: TeamPerformanceRow[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@maplefuture.ca',
    avatar: avatar1,
    applicationsReviewed: 264,
    avgReviewTime: '1.8 days',
    interviewsConducted: 32,
  },
  {
    id: '2',
    name: 'Michael Adams',
    email: 'michael.a@maplefuture.ca',
    avatar: avatar2,
    applicationsReviewed: 212,
    avgReviewTime: '2.1 days',
    interviewsConducted: 26,
  },
  {
    id: '3',
    name: 'Jessica Lee',
    email: 'jessica.l@maplefuture.ca',
    avatar: avatar1,
    applicationsReviewed: 176,
    avgReviewTime: '1.9 days',
    interviewsConducted: 21,
  },
  {
    id: '4',
    name: 'Daniel Thompson',
    email: 'daniel.a@maplefuture.ca',
    avatar: avatar2,
    applicationsReviewed: 148,
    avgReviewTime: '2.4 days',
    interviewsConducted: 18,
  },
  {
    id: '5',
    name: 'Emily Clark',
    email: 'emily.c@maplefuture.ca',
    avatar: avatar1,
    applicationsReviewed: 124,
    avgReviewTime: '2.0 days',
    interviewsConducted: 15,
  },
];

export const OPPORTUNITY_TYPE_STYLES: Record<OpportunityTypeTag, string> = {
  Internal: 'border border-[#E8E1FF] bg-[#F3EEFE] text-[#451EE1]',
  External: 'border border-[#E8E1FF] bg-[#F3EEFE] text-[#451EE1]',
  'Express Interest': 'border border-[#D1FAE5] bg-[#ECFDF5] text-[#15803D]',
};

export const OPPORTUNITY_STATUS_STYLES: Record<OpportunityStatusTag, string> = {
  Active: 'bg-[#ECFDF5] text-[#15803D]',
  Paused: 'bg-[#F1F5F9] text-[#64748B]',
};

export const ANALYTICS_FILTER_OPTIONS = {
  opportunity: ['All Opportunities', 'Youth Innovation Grant', 'Merit Scholarship Program'],
  opportunityType: ['All Types', 'Internal', 'External', 'Express Interest'],
  teamMember: ['All Members', 'Sarah Johnson', 'Michael Adams'],
  departments: ['All Departments', 'Operations', 'Programs', 'Marketing'],
};
