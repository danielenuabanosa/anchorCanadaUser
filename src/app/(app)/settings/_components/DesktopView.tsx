'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Mail,
  Shield,
  SquarePen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageTitle,
  TabNav,
  Toggle,
  SettingsStatusBar,
  SectionCard,
  textBrand,
  card,
  bgBrand,
} from '@/shared/components/app/page-ui';
import { Avatar } from '@/shared/components/ui/Avatar';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/features/auth/hooks/useAuth';
import orgAvatar from '@assets/images/prov-sickkids.png';
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  ORG_SETTINGS_ROWS,
  SECURITY_ROWS,
  SETTINGS_TABS,
  type SettingsTab,
} from './settingsData';

function SettingRow({
  icon: Icon,
  label,
  desc,
  action,
}: {
  icon: React.ElementType;
  label: string;
  desc?: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3.5 border-b border-[#EEF2F8] py-2.5 last:border-0">
      <Icon className="h-[18px] w-[18px] shrink-0 text-[#0F172A]" strokeWidth={1.75} />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-[#0F172A] md:text-base">{label}</p>
        {desc ? <p className="mt-0.5 text-xs text-[#8C97AD]">{desc}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION_SETTINGS);
  const [twoFA, setTwoFA] = useState(true);
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle
          title="Settings"
          subtitle="Manage your provider account, organization preferences, and security."
        />
        <SettingsStatusBar percent={85} />
      </div>

      <TabNav tabs={SETTINGS_TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'account' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={cn(card, 'p-5')}>
            <div className="flex gap-4">
              <Avatar src={orgAvatar.src} fallback={user?.name ?? 'Admin'} className="h-16 w-16 border-2 border-[#EEF2F8]" />
              <div>
                <h3 className="font-serif text-2xl text-[#0F172A]">{user?.name ?? 'Maple Future Admin'}</h3>
                <p className="text-sm text-[#44516A]">{user?.email ?? 'admin@maplefuture.org'}</p>
                <p className="text-sm text-[#44516A]">Organization Administrator</p>
              </div>
            </div>
          </div>
          <div className={cn(card, 'overflow-hidden')}>
            <div className="border-b border-[#EEF2F8] px-5 py-4">
              <h3 className="text-lg font-medium text-[#0F172A]">Quick Actions</h3>
            </div>
            <div className="p-5">
              <Link
                href="/organization-profile"
                className="flex w-full items-center justify-between py-2.5 hover:bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-3.5 text-[#0F172A]">
                  <SquarePen className="h-[18px] w-[18px]" />
                  <span className="text-base">Edit Profile</span>
                </div>
                <ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveTab('notifications')}
                className="flex w-full items-center justify-between py-2.5 hover:bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-3.5 text-[#0F172A]">
                  <Bell className="h-[18px] w-[18px]" />
                  <span className="text-base">Notification Preferences</span>
                </div>
                <ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />
              </button>
              <button
                type="button"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className="flex w-full items-center justify-between py-2.5 hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                <div className="flex items-center gap-3.5 text-[#EF4444]">
                  <LogOut className="h-[18px] w-[18px]" />
                  <span className="text-base">Sign Out</span>
                </div>
                <ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'organization' && (
        <SectionCard
          title="Organization Settings"
          action={
            <Link href="/organization-profile" className={cn(textBrand, 'text-sm font-semibold hover:underline')}>
              Manage Profile
            </Link>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {ORG_SETTINGS_ROWS.map((row) => (
              <div key={row.label} className="flex gap-3 rounded-[8px] border border-[#EEF2F8] p-4">
                <row.icon className="h-[18px] w-[18px] shrink-0 text-[#44516A]" />
                <div>
                  <p className="text-xs text-[#8C97AD]">{row.label}</p>
                  <p className="mt-1 text-sm font-medium text-[#0F172A]">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {activeTab === 'notifications' && (
        <SectionCard title="Notification Preferences">
          {notifications.map((item) => (
            <SettingRow
              key={item.id}
              icon={item.icon}
              label={item.label}
              desc={item.desc}
              action={
                <Toggle
                  on={item.enabled}
                  onChange={(v) =>
                    setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, enabled: v } : n)))
                  }
                />
              }
            />
          ))}
        </SectionCard>
      )}

      {activeTab === 'security' && (
        <SectionCard title="Security">
          {SECURITY_ROWS.map((row) => (
            <SettingRow
              key={row.label}
              icon={row.icon}
              label={row.label}
              desc={row.desc}
              action={
                row.label === 'Two-Factor Authentication' ? (
                  <Toggle on={twoFA} onChange={setTwoFA} />
                ) : (
                  <ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />
                )
              }
            />
          ))}
        </SectionCard>
      )}

      {activeTab === 'team' && (
        <SectionCard
          title="Team & Access"
          action={
            <Link href="/team" className={cn(textBrand, 'text-sm font-semibold hover:underline')}>
              Manage Team
            </Link>
          }
        >
          <SettingRow icon={Shield} label="Default Reviewer Permissions" desc="Can review and shortlist applications" action={<ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />} />
          <SettingRow icon={Mail} label="Invite Settings" desc="Control who can invite team members" action={<ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />} />
          <SettingRow icon={Bell} label="Team Notification Rules" desc="Alerts for assignments and deadlines" action={<ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />} />
        </SectionCard>
      )}

      {activeTab === 'support' && (
        <SectionCard title="Support">
          {[
            { icon: HelpCircle, label: 'Help Center', desc: 'Browse FAQs and guides', href: '/help' },
            { icon: Mail, label: 'Contact Support', desc: 'Send us a message', href: '/help' },
            { icon: Shield, label: 'Privacy Policy', desc: 'Review our privacy policy' },
          ].map((item) => (
            <SettingRow
              key={item.label}
              icon={item.icon}
              label={item.label}
              desc={item.desc}
              action={
                item.href ? (
                  <Link href={item.href} className={textBrand}>
                    <ChevronRight className="h-[18px] w-[18px]" />
                  </Link>
                ) : (
                  <ChevronRight className="h-[18px] w-[18px] text-[#8C97AD]" />
                )
              }
            />
          ))}
        </SectionCard>
      )}

      <div className="flex justify-end">
        <button type="button" className={cn(bgBrand, 'rounded-[6px] px-5 py-2.5 text-sm font-medium text-white')}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
