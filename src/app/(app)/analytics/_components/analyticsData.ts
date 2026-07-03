import type { ElementType } from 'react';
import {
  Eye,
  MousePointerClick,
  Send,
  Bookmark,
  TrendingUp,
  Users,
} from 'lucide-react';

export interface AnalyticsStat {
  label: string;
  value: string | number;
  change?: string;
  subtext?: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

export type AnalyticsTab = 'overview' | 'opportunities' | 'applications' | 'engagement';

export const ANALYTICS_TABS: { id: AnalyticsTab; label: string; count: number }[] = [
  { id: 'overview', label: 'Overview', count: 0 },
  { id: 'opportunities', label: 'Opportunities', count: 24 },
  { id: 'applications', label: 'Applications', count: 1284 },
  { id: 'engagement', label: 'Engagement', count: 0 },
];

export const ANALYTICS_STATS: AnalyticsStat[] = [
  {
    label: 'Total Views',
    value: '48,290',
    change: '18.5%',
    icon: Eye,
    iconBg: 'bg-[#EFF4FF]',
    iconColor: 'text-[#2F66C8]',
  },
  {
    label: 'Applications',
    value: '1,284',
    change: '12%',
    icon: Send,
    iconBg: 'bg-[#ECFDF5]',
    iconColor: 'text-[#15803D]',
  },
  {
    label: 'Saves',
    value: '892',
    change: '8.2%',
    icon: Bookmark,
    iconBg: 'bg-[#F4F1FE]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    label: 'Click-through Rate',
    value: '4.8%',
    change: '1.2%',
    icon: MousePointerClick,
    iconBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#C2410C]',
  },
  {
    label: 'Conversion Rate',
    value: '2.6%',
    change: '0.4%',
    icon: TrendingUp,
    iconBg: 'bg-[#FDF4FF]',
    iconColor: 'text-[#9333EA]',
  },
  {
    label: 'Unique Visitors',
    value: '12,450',
    change: '9.1%',
    icon: Users,
    iconBg: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0369A1]',
  },
];

export const TOP_OPPORTUNITIES = [
  {
    id: '1',
    name: 'Community Youth Mentorship Program',
    views: 8420,
    applications: 124,
    conversion: '1.5%',
    engagement: 'High',
  },
  {
    id: '2',
    name: 'Digital Skills Scholarship',
    views: 6210,
    applications: 98,
    conversion: '1.6%',
    engagement: 'Moderate',
  },
  {
    id: '3',
    name: 'Youth Leadership Training',
    views: 4890,
    applications: 76,
    conversion: '1.6%',
    engagement: 'High',
  },
  {
    id: '4',
    name: 'Senior Support Services Program',
    views: 3120,
    applications: 42,
    conversion: '1.3%',
    engagement: 'Low',
  },
];

export const ANALYTICS_FILTER_OPTIONS = {
  dateRange: ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year', 'Custom range'],
  opportunityType: ['All types', 'Internal', 'External', 'Express Interest'],
  status: ['All statuses', 'Active', 'Draft', 'Scheduled', 'Closed'],
};
