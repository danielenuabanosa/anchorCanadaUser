import {

  Bell,

  Users,

  BadgeCheck,

  ShieldAlert,

  UserPlus,

  Calendar,

  Clock,

  CheckCircle2,

  FileUser,

  ShieldCheck,

  Mail,

  MessageSquareDot,

  FileCheck,

  Building2,

  Send,

  ShieldUser,

} from 'lucide-react';

import type { ElementType } from 'react';

import avatar1 from '@assets/images/profile-avatar.png';



export type NotificationTab = 'all' | 'applications' | 'team' | 'opportunities' | 'system' | 'security';



export type NotificationSort = 'newest' | 'oldest' | 'unread';



export interface NotificationDetail {

  applicantName: string;

  applicantAvatar: typeof avatar1;

  opportunityName: string;

  submittedAt: string;

  createdAt: string;

  applicationHref: string;

}



export interface NotificationItem {

  id: string;

  title: string;

  body: string;

  time: string;

  group: 'Today' | 'Yesterday' | 'Earlier';

  unread: boolean;

  icon: ElementType;

  iconBg: string;

  iconColor: string;

  accentColor: string;

  tab: NotificationTab;

  detail?: NotificationDetail;

}



export interface NotificationFilters {

  dateRange: string;

  type: string;

  status: string;

}



export const NOTIFICATION_SORT_OPTIONS: { id: NotificationSort; label: string }[] = [

  { id: 'newest', label: 'Newest First' },

  { id: 'oldest', label: 'Oldest First' },

  { id: 'unread', label: 'Unread First' },

];



export const NOTIFICATION_SUMMARY = [

  { label: 'Unread', value: 12, actionLink: 'View all unread', icon: Bell, iconBg: 'bg-[#EFE8FD]', iconColor: 'text-[#7C3AED]' },

  { label: 'Team Alerts', value: 3, actionLink: 'View alerts', icon: Users, iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#C2410C]' },

  { label: 'Opportunity Alerts', value: 20, actionLink: 'View alerts', icon: BadgeCheck, iconBg: 'bg-[#FEF2E7]', iconColor: 'text-[#D97706]' },

  { label: 'Applications', value: 42, actionLink: 'View all', icon: Bell, iconBg: 'bg-[#ECFDF5]', iconColor: 'text-[#15803D]' },

  { label: 'System Alerts', value: 5, actionLink: 'View alerts', icon: ShieldAlert, iconBg: 'bg-[#FEF2F2]', iconColor: 'text-[#B91C1C]' },

];



export const NOTIFICATION_TABS: { id: NotificationTab; label: string; count: number }[] = [

  { id: 'all', label: 'All', count: 32 },

  { id: 'applications', label: 'Applications', count: 12 },

  { id: 'team', label: 'Team', count: 6 },

  { id: 'opportunities', label: 'Opportunities', count: 5 },

  { id: 'system', label: 'System', count: 2 },

  { id: 'security', label: 'Security', count: 4 },

];



export const NOTIFICATIONS: NotificationItem[] = [

  {

    id: '1',

    title: 'Application Received',

    body: 'James Wilson applied for Digital Skills Grant.',

    time: '2 mins ago',

    group: 'Today',

    unread: true,

    icon: FileUser,

    iconBg: 'bg-[#E0F4EA]',

    iconColor: 'text-[#15803D]',

    accentColor: '#A2EBDB',

    tab: 'applications',

    detail: {

      applicantName: 'Sarah Johnson',

      applicantAvatar: avatar1,

      opportunityName: 'Digital Skills Grant',

      submittedAt: 'May 30, 2026 at 2:43 PM',

      createdAt: 'May 29, 2026 at 10:59 PM',

      applicationHref: '/applications/1',

    },

  },

  {

    id: '2',

    title: 'Interview Scheduled',

    body: 'Interview confirmed for Sarah Johnson on May 31, 2026 at 10:00 AM.',

    time: '1 hour ago',

    group: 'Today',

    unread: true,

    icon: Calendar,

    iconBg: 'bg-[#F3ECFE]',

    iconColor: 'text-[#7C3AED]',

    accentColor: '#C4A6EF',

    tab: 'applications',

  },

  {

    id: '3',

    title: 'Opportunity Closing Soon',

    body: 'Youth Innovation Grant closes tomorrow on May 31, 2026.',

    time: '15 mins ago',

    group: 'Today',

    unread: true,

    icon: Clock,

    iconBg: 'bg-[#FFF5E5]',

    iconColor: 'text-[#D97706]',

    accentColor: '#FADCAA',

    tab: 'opportunities',

  },

  {

    id: '4',

    title: 'Reviewer Assigned',

    body: 'Emily Clark has been assigned 12 new applications to review.',

    time: '2 hours ago',

    group: 'Today',

    unread: true,

    icon: UserPlus,

    iconBg: 'bg-[#E8EFFE]',

    iconColor: 'text-[#2F66C8]',

    accentColor: '#508EFA',

    tab: 'team',

  },

  {

    id: '11',

    title: 'Organization Verification Approved',

    body: 'Your organization verification has been approved successfully.',

    time: 'Yesterday, 4:30 PM',

    group: 'Yesterday',

    unread: true,

    icon: ShieldCheck,

    iconBg: 'bg-[#E0F4EA]',

    iconColor: 'text-[#15803D]',

    accentColor: '#A2EBDB',

    tab: 'system',

  },

  {

    id: '12',

    title: 'Security Alert',

    body: 'New login detected on your account from Toronto, Canada.',

    time: 'May 8, 2026',

    group: 'Earlier',

    unread: false,

    icon: ShieldUser,

    iconBg: 'bg-[#FEF2F2]',

    iconColor: 'text-[#B91C1C]',

    accentColor: '#FEE2E2',

    tab: 'security',

  },

  {

    id: '5',

    title: 'New Application Batch',

    body: '8 new applications received for Merit Scholarship Program.',

    time: '3 hours ago',

    group: 'Today',

    unread: true,

    icon: Send,

    iconBg: 'bg-[#E0F4EA]',

    iconColor: 'text-[#15803D]',

    accentColor: '#A2EBDB',

    tab: 'applications',

  },

  {

    id: '6',

    title: 'Team Member Added',

    body: 'Michael Adams joined your provider team as Lead Reviewer.',

    time: '5 hours ago',

    group: 'Today',

    unread: true,

    icon: Users,

    iconBg: 'bg-[#FFFBEB]',

    iconColor: 'text-[#C2410C]',

    accentColor: '#FADCAA',

    tab: 'team',

  },

  {

    id: '7',

    title: 'Opportunity Published',

    body: 'Community Volunteer Program is now live and accepting applications.',

    time: '6 hours ago',

    group: 'Today',

    unread: false,

    icon: BadgeCheck,

    iconBg: 'bg-[#FEF2E7]',

    iconColor: 'text-[#D97706]',

    accentColor: '#508EFA',

    tab: 'opportunities',

  },

  {

    id: '8',

    title: 'Application Deadline Reminder',

    body: 'Merit Scholarship Program deadline is in 3 days.',

    time: '8 hours ago',

    group: 'Today',

    unread: false,

    icon: Clock,

    iconBg: 'bg-[#FFF5E5]',

    iconColor: 'text-[#D97706]',

    accentColor: '#C4A6EF',

    tab: 'opportunities',

  },

  {

    id: '9',

    title: 'Review Completed',

    body: 'Jessica Lee completed review for 5 applications.',

    time: '10 hours ago',

    group: 'Today',

    unread: false,

    icon: CheckCircle2,

    iconBg: 'bg-[#ECFDF5]',

    iconColor: 'text-[#15803D]',

    accentColor: '#A2EBDB',

    tab: 'team',

  },

  {

    id: '10',

    title: 'Weekly Summary Ready',

    body: 'Your organization weekly activity summary is available.',

    time: '11 hours ago',

    group: 'Today',

    unread: false,

    icon: Bell,

    iconBg: 'bg-[#EFE8FD]',

    iconColor: 'text-[#7C3AED]',

    accentColor: '#C4A6EF',

    tab: 'system',

  },

];



export const RECENT_ACTIVITY_WIDGET = [

  {

    id: '1',

    label: 'Opportunity Published',

    subtitle: 'Youth Innovation Grant',

    time: '2 hours ago',

    icon: ShieldCheck,

    iconBg: 'bg-[#E8F5EE]',

    iconColor: 'text-[#15803D]',

  },

  {

    id: '2',

    label: 'Application Accepted',

    subtitle: 'Michael brown accepted offer',

    time: '4 hours ago',

    icon: FileCheck,

    iconBg: 'bg-[#E8F3FE]',

    iconColor: 'text-[#2F66C8]',

  },

  {

    id: '3',

    label: 'Team Member invited',

    subtitle: 'David Lee invited to organization',

    time: '1 day ago',

    icon: Users,

    iconBg: 'bg-[#FEF2E7]',

    iconColor: 'text-[#C2410C]',

  },

  {

    id: '4',

    label: 'Organization Updated',

    subtitle: 'Profile information updated',

    time: '3 days ago',

    icon: Building2,

    iconBg: 'bg-[#E6F5FD]',

    iconColor: 'text-[#2F66C8]',

  },

];



export const NOTIFICATION_PREFS = [

  { id: 'in-app', label: 'In-App Notifications', desc: 'Get notified within the portal', icon: Bell, enabled: true },

  { id: 'email', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail, enabled: true },

  { id: 'push', label: 'Push Notifications', desc: 'Receive push notifications', icon: MessageSquareDot, enabled: true },

];



export const NOTIFICATION_FILTER_TYPES = ['All types', 'Applications', 'Team', 'Opportunities', 'System', 'Security'] as const;

export const NOTIFICATION_FILTER_STATUS = ['All', 'Unread only', 'Read only'] as const;



export const DEFAULT_NOTIFICATION_FILTERS: NotificationFilters = {

  dateRange: 'Last 30 days',

  type: 'All types',

  status: 'All',

};



const TAB_TYPE_MAP: Record<string, NotificationTab | 'all'> = {

  'All types': 'all',

  Applications: 'applications',

  Team: 'team',

  Opportunities: 'opportunities',

  System: 'system',

  Security: 'security',

};



export function filterNotifications(

  items: NotificationItem[],

  activeTab: NotificationTab,

  filters: NotificationFilters,

  sort: NotificationSort,

): NotificationItem[] {

  let result = [...items];



  if (activeTab !== 'all') {

    result = result.filter((item) => item.tab === activeTab);

  }



  const typeFilter = TAB_TYPE_MAP[filters.type];

  if (typeFilter && typeFilter !== 'all') {

    result = result.filter((item) => item.tab === typeFilter);

  }



  if (filters.status === 'Unread only') {

    result = result.filter((item) => item.unread);

  } else if (filters.status === 'Read only') {

    result = result.filter((item) => !item.unread);

  }



  if (sort === 'oldest') {

    result.reverse();

  } else if (sort === 'unread') {

    result.sort((a, b) => Number(b.unread) - Number(a.unread));

  }



  return result;

}


