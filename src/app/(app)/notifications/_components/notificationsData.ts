import {
  Bell,
  Users,
  BadgeCheck,
  Send,
  ShieldAlert,
  UserPlus,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import type { ElementType } from 'react';

export type NotificationTab = 'all' | 'applications' | 'team' | 'opportunities' | 'system' | 'security';

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
  tab: NotificationTab;
}

export const NOTIFICATION_SUMMARY = [
  { label: 'Unread', value: 12, actionLink: 'View all unread', icon: Bell, iconBg: 'bg-[#EFE8FD]', iconColor: 'text-[#7C3AED]' },
  { label: 'Team Alerts', value: 3, actionLink: 'View alerts', icon: Users, iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#C2410C]' },
  { label: 'Opportunity Alerts', value: 20, actionLink: 'View alerts', icon: BadgeCheck, iconBg: 'bg-[#FEF2E7]', iconColor: 'text-[#D97706]' },
  { label: 'Applications', value: 42, actionLink: 'View all', icon: Send, iconBg: 'bg-[#ECFDF5]', iconColor: 'text-[#15803D]' },
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
    icon: Send,
    iconBg: 'bg-[#E0F4EA]',
    iconColor: 'text-[#15803D]',
    tab: 'applications',
  },
  {
    id: '2',
    title: 'Interview Scheduled',
    body: 'Interview confirmed for Sarah Johnson on Youth Mentorship Program.',
    time: '1 hour ago',
    group: 'Today',
    unread: true,
    icon: Calendar,
    iconBg: 'bg-[#F3ECFE]',
    iconColor: 'text-[#7C3AED]',
    tab: 'applications',
  },
  {
    id: '3',
    title: 'Opportunity Closing Soon',
    body: 'Youth Innovation Grant closes tomorrow at 11:59 PM.',
    time: '15 mins ago',
    group: 'Today',
    unread: true,
    icon: Clock,
    iconBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#D97706]',
    tab: 'opportunities',
  },
  {
    id: '4',
    title: 'Reviewer Assigned',
    body: 'Emily Clark has been assigned 12 new applications for review.',
    time: '2 hours ago',
    group: 'Today',
    unread: true,
    icon: UserPlus,
    iconBg: 'bg-[#EFF4FF]',
    iconColor: 'text-[#2F66C8]',
    tab: 'team',
  },
  {
    id: '5',
    title: 'Organization Verification Approved',
    body: 'Your organization verification has been approved. You can now publish opportunities.',
    time: '4:30 PM',
    group: 'Yesterday',
    unread: true,
    icon: CheckCircle2,
    iconBg: 'bg-[#ECFDF5]',
    iconColor: 'text-[#15803D]',
    tab: 'system',
  },
  {
    id: '6',
    title: 'Security Alert',
    body: 'New login detected on your account from Toronto, ON.',
    time: 'May 8, 2026',
    group: 'Earlier',
    unread: false,
    icon: ShieldAlert,
    iconBg: 'bg-[#FEE2E2]',
    iconColor: 'text-[#B91C1C]',
    tab: 'security',
  },
];

export const RECENT_ACTIVITY_WIDGET = [
  { id: '1', label: 'Opportunity Published', time: '2 hours ago', color: 'bg-[#EFF4FF] text-[#2F66C8]' },
  { id: '2', label: 'Application Accepted', time: '4 hours ago', color: 'bg-[#ECFDF5] text-[#15803D]' },
  { id: '3', label: 'Team Member Invited', time: '1 day ago', color: 'bg-[#F4F1FE] text-[#7C3AED]' },
  { id: '4', label: 'Organization Updated', time: '3 days ago', color: 'bg-[#FFF7ED] text-[#C2410C]' },
];

export const NOTIFICATION_PREFS = [
  { id: 'in-app', label: 'In-App Notifications', desc: 'Get notified within the portal', enabled: true },
  { id: 'email', label: 'Email Notifications', desc: 'Receive notifications via email', enabled: true },
  { id: 'push', label: 'Push Notifications', desc: 'Receive push notifications', enabled: true },
];

export const NOTIFICATION_FILTER_TYPES = ['All types', 'Applications', 'Team', 'Opportunities', 'System', 'Security'];
export const NOTIFICATION_FILTER_STATUS = ['All', 'Unread only', 'Read only'];
