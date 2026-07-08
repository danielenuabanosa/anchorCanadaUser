import {
  BadgeInfo,
  Bell,
  Building2,
  HousePlug,
  Shield,
  Trash2,
  Users,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import orgLogo from '@assets/images/prov-sickkids.png';
import orgCover from '@assets/images/settings/org-cover.png';
import type { StaticImageData } from 'next/image';

export const INTEGRATION_ICON_PATHS = {
  'google-calendar': '/icons/settings/google-calendar.svg',
  'google-mail': '/icons/settings/google-mail.svg',
  'google-meet': '/icons/settings/google-meet.svg',
  'microsoft-teams': '/icons/settings/microsoft-teams.svg',
  slack: '/icons/settings/slack.svg',
  'google-forms': '/icons/settings/google-forms.svg',
} as const;

export const SETTINGS_TABS = [
  { id: 'general' as const, label: 'General', icon: BadgeInfo },
  { id: 'organization' as const, label: 'Organization', icon: Building2 },
  { id: 'security' as const, label: 'Security', icon: Shield },
  { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  { id: 'teams' as const, label: 'Teams & Permissions', icon: Users },
  { id: 'integrations' as const, label: 'Integrations', icon: HousePlug },
  { id: 'billing' as const, label: 'Billing', icon: WalletCards, soon: true },
  { id: 'danger' as const, label: 'Danger Zone', icon: Trash2, danger: true },
];

export type SettingsTab = (typeof SETTINGS_TABS)[number]['id'];

export type SettingsModal =
  | 'changePassword'
  | 'enable2FA'
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
  primaryBrandColor: string;
  secondaryColor: string;
  publicProfileUrl: string;
}

export interface TeamSettings {
  defaultTeamRole: string;
  invitationExpiration: string;
  requireApprovalForInvitations: boolean;
  reviewerAssignment: string;
  autoAssignRoles: boolean;
  maxApplicationsPerReviewer: string;
}

export interface DangerZoneSettings {
  showOrganizationPublicly: boolean;
  allowSearchIndexing: boolean;
  displayTeamMembers: boolean;
  publicAnalytics: boolean;
  showActiveOpportunitiesCount: boolean;
}

export interface NotificationChannelSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface NotificationTypeSettings {
  applicationUpdates: boolean;
  teamActivity: boolean;
  opportunityUpdates: boolean;
  analyticsReports: boolean;
  securityAlerts: boolean;
  marketingTips: boolean;
}

export interface IntegrationCard {
  id: keyof typeof INTEGRATION_ICON_PATHS;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
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
  primaryBrandColor: '#15AD5D',
  secondaryColor: '#4112F0',
  publicProfileUrl: 'anchor.ca/organization/maple.future.founndation',
};

export const DEFAULT_TEAM: TeamSettings = {
  defaultTeamRole: 'Member',
  invitationExpiration: '7 days',
  requireApprovalForInvitations: true,
  reviewerAssignment: 'Auto-assign',
  autoAssignRoles: true,
  maxApplicationsPerReviewer: '50',
};

export const DEFAULT_DANGER: DangerZoneSettings = {
  showOrganizationPublicly: true,
  allowSearchIndexing: true,
  displayTeamMembers: false,
  publicAnalytics: true,
  showActiveOpportunitiesCount: true,
};

export const DEFAULT_NOTIFICATION_CHANNELS: NotificationChannelSettings = {
  emailNotifications: true,
  pushNotifications: true,
};

export const DEFAULT_NOTIFICATION_TYPES: NotificationTypeSettings = {
  applicationUpdates: true,
  teamActivity: true,
  opportunityUpdates: true,
  analyticsReports: true,
  securityAlerts: true,
  marketingTips: false,
};

export const INTEGRATION_CARDS: IntegrationCard[] = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync events and deadlines.',
    icon: INTEGRATION_ICON_PATHS['google-calendar'],
    connected: true,
  },
  {
    id: 'google-mail',
    name: 'Google Mail',
    description: 'Manage applicant engagement',
    icon: INTEGRATION_ICON_PATHS['google-mail'],
    connected: false,
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    description: 'Schedule and manage meetings.',
    icon: INTEGRATION_ICON_PATHS['google-meet'],
    connected: true,
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Collaborate with your team',
    icon: INTEGRATION_ICON_PATHS['microsoft-teams'],
    connected: false,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Manage team communication',
    icon: INTEGRATION_ICON_PATHS.slack,
    connected: false,
  },
  {
    id: 'google-forms',
    name: 'Google Forms',
    description: 'Manage external applications.',
    icon: INTEGRATION_ICON_PATHS['google-forms'],
    connected: false,
  },
];

export const ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: 'current',
    device: 'Current Device',
    details: 'Windows  •  Chrome  •  Lagos, Nigeria',
    isCurrent: true,
  },
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
  { id: 'integrations', label: 'Integrations', completed: false },
  { id: 'billing', label: 'Billing Information', completed: false, soon: true },
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
  teams: {
    title: 'Team & Permission Settings',
    subtitle: 'Configure default team and access roles',
    hasFooter: true,
  },
  integrations: {
    title: 'Integrations',
    subtitle: 'Connect with tools and services',
  },
  billing: {
    title: 'Billing',
    subtitle: 'Manage your subscription and payment methods.',
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
export const TEAM_ROLE_OPTIONS = ['Member', 'Reviewer', 'Admin'];
export const INVITATION_EXPIRY_OPTIONS = ['7 days', '14 days', '30 days'];
export const REVIEWER_ASSIGNMENT_OPTIONS = ['Auto-assign', 'Manual assign', 'Round-robin'];
export const MAX_APPS_OPTIONS = ['25', '50', '100', 'Unlimited'];

export type SettingsNavItem = {
  id: SettingsTab;
  label: string;
  icon: LucideIcon;
  soon?: boolean;
  danger?: boolean;
};
