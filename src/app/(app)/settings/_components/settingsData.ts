import {
  BadgeInfo,
  Bell,
  Building2,
  HousePlug,
  Shield,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import orgLogo from '@assets/images/prov-sickkids.png';
import orgCover from '@assets/images/settings/org-cover.png';
import type { StaticImageData } from 'next/image';

export const SETTINGS_TABS = [
  { id: 'general' as const, label: 'General', icon: BadgeInfo },
  { id: 'organization' as const, label: 'Organization', icon: Building2 },
  { id: 'security' as const, label: 'Security', icon: Shield },
  { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  { id: 'integrations' as const, label: 'Integrations', icon: HousePlug, soon: true },
  { id: 'danger' as const, label: 'Danger Zone', icon: Trash2, danger: true },
];

export type SettingsTab = (typeof SETTINGS_TABS)[number]['id'];

export type SettingsModal =
  | 'changePassword'
  | 'deleteOrganization'
  | 'archiveOrganization'
  | null;

export type SettingsToast = 'success' | 'unsaved' | null;

export interface GeneralSettings {
  organizationName: string;
  timeZone: string;
  organizationEmail: string;
  currency: string;
  defaultLanguage: string;
  timeFormat: string;
  dateFormat: string;
  weekStartsOn: string;
}

export interface OrganizationSettings {
  logo: StaticImageData;
  coverImage: StaticImageData;
  publicProfileUrl: string;
}

export interface NotificationChannelSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface NotificationTypeSettings {
  applicationUpdates: boolean;
  opportunityUpdates: boolean;
  analyticsReports: boolean;
  securityAlerts: boolean;
  marketingTips: boolean;
}

export interface ActiveSession {
  id: string;
  device: string;
  details: string;
  isCurrent: boolean;
}

export interface CompletionChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  soon?: boolean;
}

export const DEFAULT_GENERAL: GeneralSettings = {
  organizationName: 'Maple Future Foundation',
  timeZone: '(GMT -04:00) Eastern Time (ET)',
  organizationEmail: 'info@maplefuture.ca',
  currency: 'CAD - Canadian Dollar',
  defaultLanguage: 'English',
  timeFormat: '12 Hour (e.g. 02:30 PM)',
  dateFormat: 'DD/MM/YYYY (e.g. 02 July, 2026)',
  weekStartsOn: 'Monday',
};

export const DEFAULT_ORGANIZATION: OrganizationSettings = {
  logo: orgLogo,
  coverImage: orgCover,
  publicProfileUrl: 'anchor.ca/organization/maple.future.founndation',
};

export const DEFAULT_NOTIFICATION_CHANNELS: NotificationChannelSettings = {
  emailNotifications: true,
  pushNotifications: true,
};

export const DEFAULT_NOTIFICATION_TYPES: NotificationTypeSettings = {
  applicationUpdates: true,
  opportunityUpdates: true,
  analyticsReports: true,
  securityAlerts: true,
  marketingTips: false,
};

export const ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: 'macbook',
    device: 'MacBook  Pro',
    details: 'Safari  •  Toronto Canada  •  2 days ago',
    isCurrent: false,
  },
  {
    id: 'iphone',
    device: 'iPhone 14',
    details: 'Mobile app  •  Abuja, Nigeria  •  5 days ago',
    isCurrent: false,
  },
];

export const COMPLETION_CHECKLIST: CompletionChecklistItem[] = [
  { id: 'general', label: 'General Information', completed: true },
  { id: 'branding', label: 'Organization Branding', completed: true },
  { id: 'security', label: 'Security Setup', completed: true },
  { id: 'notifications', label: 'Notification Preferences', completed: true },
  { id: 'integrations', label: 'Integrations', completed: false, soon: true },
];

export const TAB_PANEL_META: Record<
  SettingsTab,
  { title: string; subtitle: string; hasFooter?: boolean }
> = {
  general: {
    title: 'General Settings',
    subtitle: "Manage your organization's baasic preferences and defaults.",
    hasFooter: true,
  },
  organization: {
    title: 'Organization Settings',
    subtitle: "Manage your organization's branding nd public identity.",
    hasFooter: true,
  },
  security: {
    title: 'Security Settings',
    subtitle: 'Manage your account security and access.',
  },
  notifications: {
    title: 'Notification Preferences',
    subtitle: 'Choose how and what updates you receive.',
  },
  integrations: {
    title: 'Integrations',
    subtitle: 'Connect with tools and services',
  },
  danger: {
    title: 'Danger Zone',
    subtitle: 'Manage sensitive workflows, These cannot be undone.',
  },
};

export const TIME_ZONE_OPTIONS = [DEFAULT_GENERAL.timeZone, '(GMT -05:00) Central Time (CT)', '(GMT +00:00) Greenwich Mean Time (GMT)'];
export const CURRENCY_OPTIONS = [DEFAULT_GENERAL.currency, 'USD - US Dollar', 'EUR - Euro'];
export const LANGUAGE_OPTIONS = ['English', 'French'];
export const TIME_FORMAT_OPTIONS = [DEFAULT_GENERAL.timeFormat, '24 Hour (e.g. 14:30)'];
export const DATE_FORMAT_OPTIONS = [DEFAULT_GENERAL.dateFormat, 'MM/DD/YYYY (e.g. July 02, 2026)'];
export const WEEK_START_OPTIONS = ['Monday', 'Sunday'];

export type SettingsNavItem = {
  id: SettingsTab;
  label: string;
  icon: LucideIcon;
  soon?: boolean;
  danger?: boolean;
};
