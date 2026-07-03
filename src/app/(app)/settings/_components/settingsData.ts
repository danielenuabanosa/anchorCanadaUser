import {
  Bell,
  Building2,
  FileText,
  Globe,
  Key,
  Mail,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const SETTINGS_TABS = [
  { id: 'account' as const, label: 'Account' },
  { id: 'organization' as const, label: 'Organization' },
  { id: 'notifications' as const, label: 'Notifications' },
  { id: 'security' as const, label: 'Security' },
  { id: 'team' as const, label: 'Team & Access' },
  { id: 'support' as const, label: 'Support' },
];

export type SettingsTab = (typeof SETTINGS_TABS)[number]['id'];

export interface NotificationSetting {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  enabled: boolean;
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'applications',
    label: 'Application Updates',
    desc: 'New applications and status changes',
    icon: FileText,
    enabled: true,
  },
  {
    id: 'team',
    label: 'Team Activity',
    desc: 'Reviewer assignments and team alerts',
    icon: Users,
    enabled: true,
  },
  {
    id: 'opportunities',
    label: 'Opportunity Alerts',
    desc: 'Publishing, deadlines, and performance',
    icon: Bell,
    enabled: true,
  },
  {
    id: 'organization',
    label: 'Organization Updates',
    desc: 'Verification and profile changes',
    icon: Building2,
    enabled: true,
  },
  {
    id: 'digest',
    label: 'Weekly Digest',
    desc: 'Summary of portal activity via email',
    icon: Mail,
    enabled: false,
  },
];

export const ORG_SETTINGS_ROWS = [
  { icon: Building2, label: 'Organization Name', value: 'Maple Future Nonprofit' },
  { icon: Globe, label: 'Public Website', value: 'www.maplefuture.org' },
  { icon: Mail, label: 'Contact Email', value: 'contact@maplefuture.org' },
  { icon: Shield, label: 'Verification Status', value: 'Verified Organization' },
];

export const SECURITY_ROWS = [
  { icon: Key, label: 'Password', desc: 'Last changed 2 months ago' },
  { icon: Shield, label: 'Two-Factor Authentication', desc: 'Enabled for all admins' },
  { icon: Users, label: 'Active Sessions', desc: '3 active sessions' },
];
