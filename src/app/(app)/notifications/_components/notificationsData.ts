import { BadgeCheck, Bell, Mail, MessageSquareDot, ShieldAlert, Users } from 'lucide-react';
import type { ElementType } from 'react';

export type NotificationTab = 'all' | 'applications' | 'team' | 'opportunities' | 'system' | 'security';

export type NotificationSort = 'newest' | 'oldest' | 'unread';

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
  link?: string | null;
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
  { label: 'Unread', value: 0, actionLink: 'View all unread', icon: Bell, iconBg: 'bg-[#EFE8FD]', iconColor: 'text-[#7C3AED]' },
  { label: 'Team Alerts', value: 0, actionLink: 'View alerts', icon: Users, iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#C2410C]' },
  { label: 'Opportunity Alerts', value: 0, actionLink: 'View alerts', icon: BadgeCheck, iconBg: 'bg-[#FEF2E7]', iconColor: 'text-[#D97706]' },
  { label: 'Applications', value: 0, actionLink: 'View all', icon: Bell, iconBg: 'bg-[#ECFDF5]', iconColor: 'text-[#15803D]' },
  { label: 'System Alerts', value: 0, actionLink: 'View alerts', icon: ShieldAlert, iconBg: 'bg-[#FEF2F2]', iconColor: 'text-[#B91C1C]' },
];

export const NOTIFICATION_TABS: { id: NotificationTab; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: 0 },
  { id: 'applications', label: 'Applications', count: 0 },
  { id: 'team', label: 'Team', count: 0 },
  { id: 'opportunities', label: 'Opportunities', count: 0 },
  { id: 'system', label: 'System', count: 0 },
  { id: 'security', label: 'Security', count: 0 },
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
