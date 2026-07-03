'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, HelpCircle, LogOut, Mail, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageTitle,
  TabNav,
  Toggle,
  ProfileStrengthRing,
  textPrimary,
  textSecondary,
  textBrand,
  card,
  bgBrand,
} from '@/shared/components/app/page-ui';
import { Avatar } from '@/shared/components/ui/Avatar';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
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

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION_SETTINGS);
  const [twoFA, setTwoFA] = useState(true);
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  const mobileTabs = SETTINGS_TABS.slice(0, 4).concat([{ id: 'support' as const, label: 'Support' }]);

  return (
    <div className="flex flex-col gap-4 pb-4">
      <MobileHubPageHero
        title="Settings"
        subtitle="Manage your provider account, organization preferences, and security."
      />

      <TabNav tabs={mobileTabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'account' && (
        <>
          <div className={cn(card, 'p-4')}>
            <div className="flex gap-3">
              <Avatar src={orgAvatar.src} fallback={user?.name ?? 'Admin'} className="h-14 w-14" />
              <div>
                <h3 className="font-serif text-2xl text-[#0F172A]">{user?.name ?? 'Maple Future Admin'}</h3>
                <p className="text-xs text-[#44516A]">{user?.email ?? 'admin@maplefuture.org'}</p>
              </div>
            </div>
          </div>
          <div className={cn(card, 'flex items-center p-4')}>
            <ProfileStrengthRing percent={85} size={48} showLabel={false} />
            <div className="ml-3">
              <p className="text-xs text-[#8C97AD]">Profile Strength</p>
              <p className="text-xl font-bold text-[#0F172A]">85%</p>
            </div>
          </div>
          <div className={cn(card, 'overflow-hidden')}>
            {[
              { label: 'Organization Profile', href: '/organization-profile' },
              { label: 'Sign Out', danger: true, onClick: () => logout.mutate() },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href ?? '#'}
                onClick={item.onClick}
                className={cn(
                  'flex items-center justify-between border-b border-[#EEF2F8] px-4 py-3.5 last:border-0',
                  item.danger && 'text-[#EF4444]',
                )}
              >
                <span className="text-sm">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-[#8C97AD]" />
              </Link>
            ))}
          </div>
        </>
      )}

      {activeTab === 'organization' && (
        <div className={cn(card, 'divide-y divide-[#EEF2F8]')}>
          {ORG_SETTINGS_ROWS.map((row) => (
            <div key={row.label} className="flex gap-3 px-4 py-3.5">
              <row.icon className="h-4 w-4 shrink-0 text-[#44516A]" />
              <div>
                <p className="text-xs text-[#8C97AD]">{row.label}</p>
                <p className="text-sm font-medium text-[#0F172A]">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className={cn(card, 'px-4 py-2')}>
          {notifications.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b border-[#EEF2F8] py-3 last:border-0">
              <item.icon className="h-4 w-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>
                <p className="text-xs text-[#8C97AD]">{item.desc}</p>
              </div>
              <Toggle
                size="sm"
                on={item.enabled}
                onChange={(v) =>
                  setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, enabled: v } : n)))
                }
              />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'security' && (
        <div className={cn(card, 'px-4 py-2')}>
          {SECURITY_ROWS.map((row) => (
            <div key={row.label} className="flex items-center gap-3 border-b border-[#EEF2F8] py-3 last:border-0">
              <row.icon className="h-4 w-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#0F172A]">{row.label}</p>
                <p className="text-xs text-[#8C97AD]">{row.desc}</p>
              </div>
              {row.label === 'Two-Factor Authentication' ? (
                <Toggle size="sm" on={twoFA} onChange={setTwoFA} />
              ) : (
                <ChevronRight className="h-4 w-4 text-[#8C97AD]" />
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'support' && (
        <div className={cn(card, 'overflow-hidden')}>
          {[
            { icon: HelpCircle, label: 'Help Center', href: '/help' },
            { icon: Mail, label: 'Contact Support', href: '/help' },
            { icon: Shield, label: 'Privacy Policy' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href ?? '#'}
              className="flex items-center justify-between border-b border-[#EEF2F8] px-4 py-3.5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-[#2F66C8]" />
                <span className="text-sm text-[#0F172A]">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#8C97AD]" />
            </Link>
          ))}
        </div>
      )}

      <button type="button" className={cn(bgBrand, 'w-full rounded-[6px] py-2.5 text-sm font-medium text-white')}>
        Save Changes
      </button>
    </div>
  );
}
