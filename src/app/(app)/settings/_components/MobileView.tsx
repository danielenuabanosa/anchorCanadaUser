'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  User, Mail, Phone, Globe, Calendar, MapPin, Lock, Shield, Fingerprint,
  Activity, Bell, Sliders, EyeOff, HelpCircle, ChevronRight, CheckCircle2,
  LogOut, Pencil, Key, Target, Building2, Megaphone, AlarmClock, FileText, RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageTitle, TabNav, Toggle, ProfileTags, ProfileStrengthRing,
  textPrimary, textSecondary, textTertiary, textBrand, card, bgBrand,
} from '@/shared/components/app/page-ui';
import profileAvatar from '@/../assets/images/profile-avatar.png';

const TABS = [
  { id: 'account' as const, label: 'Account', icon: <User size={14} /> },
  { id: 'security' as const, label: 'Security', icon: <Shield size={14} /> },
  { id: 'notifications' as const, label: 'Notifications', icon: <Bell size={14} /> },
  { id: 'more' as const, label: 'More', icon: <Sliders size={14} /> },
];

type TabId = typeof TABS[number]['id'];

function SettingRow({ icon, label, desc, action }: {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#EEF2F8] last:border-0">
      <div className={cn('shrink-0', textPrimary)}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={cn(textPrimary, 'font-medium text-sm')}>{label}</p>
        {desc && <p className={cn(textTertiary, 'text-xs mt-0.5')}>{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [notifSettings, setNotifSettings] = useState({
    opportunities: true, applications: true, providers: true, marketing: false, deadlines: true,
  });
  const [prefSettings, setPrefSettings] = useState({ emailDigest: true, profileVisibility: false, jobAlerts: true });

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageTitle
        title="Settings"
        subtitle="Manage your account, preferences and security."
      />

      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'account' && (
        <div className="flex flex-col gap-4">
          <div className={cn(card, 'p-4')}>
            <div className="flex gap-3 items-start">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#EEF2F8]">
                  <Image src={profileAvatar} alt="Sara Johnson" width={56} height={56} className="object-cover" />
                </div>
                <button type="button" className={cn('absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center', bgBrand)}>
                  <Pencil size={8} className="text-white" />
                </button>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-instrument-serif text-2xl text-[#0F172A]">Sara Johnson</h3>
                  <CheckCircle2 size={14} className="text-[#2F66C8] shrink-0" />
                </div>
                <div className={cn('flex items-center gap-1 text-xs mt-0.5', textSecondary)}>
                  <MapPin size={10} />
                  <span>Toronto, Ontario, Canada</span>
                </div>
                <p className={cn(textSecondary, 'text-xs')}>UX Designer • Student</p>
                <p className={cn(textSecondary, 'text-sm mt-2 leading-relaxed')}>
                  Building a career in digital product design and user experience.
                </p>
                <ProfileTags className="mt-2" />
              </div>
            </div>
          </div>

          <div className={cn(card, 'p-4 flex items-center')}>
            <div className="flex items-center gap-3 flex-1 border-r border-[#EEF2F8] pr-4">
              <ProfileStrengthRing percent={92} size={48} showLabel={false} />
              <div>
                <p className={cn(textTertiary, 'text-xs font-medium')}>Profile Strength</p>
                <p className={cn(textPrimary, 'font-bold text-xl')}>92%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-4">
              <div className="bg-[#ECFDF5] w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="text-[#15803D]" />
              </div>
              <div>
                <p className="text-[#15803D] text-xs font-medium">Account Verified</p>
                <p className={cn(textSecondary, 'text-xs')}>Fully verified</p>
              </div>
            </div>
          </div>

          <div className={cn(card, 'p-4')}>
            <div className="mb-3">
              <h3 className={cn(textPrimary, 'font-medium text-base')}>Account Information</h3>
              <p className={cn(textSecondary, 'text-xs mt-0.5')}>Update your personal information and account details.</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: <User size={16} />, label: 'Full Name', value: 'Jacob Sullivan' },
                { icon: <Mail size={16} />, label: 'Email', value: 'jacob.sullivan@gmail.com' },
                { icon: <Calendar size={16} />, label: 'Date of Birth', value: 'May 12, 1988' },
                { icon: <Globe size={16} />, label: 'Languages', value: 'English (Canada)' },
                { icon: <Phone size={16} />, label: 'Phone Number', value: '+1 (647) 555-0198' },
                { icon: <MapPin size={16} />, label: 'Region', value: 'Ontario, Canada' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-center">
                  <div className={cn('w-4 h-4 flex items-center justify-center shrink-0', textTertiary)}>{item.icon}</div>
                  <div>
                    <p className={cn(textTertiary, 'text-xs')}>{item.label}</p>
                    <p className={cn(textPrimary, 'text-sm font-medium')}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" className="flex-1 border border-[#D9E1EF] text-[#0F172A] text-sm font-medium rounded-[6px] py-2.5 hover:bg-[#F8FAFC]">
                Edit
              </button>
              <button type="button" className={cn('flex-1 text-white text-sm font-medium rounded-[6px] py-2.5 hover:bg-[#2454A4]', bgBrand)}>
                Save Changes
              </button>
            </div>
          </div>

          <div className={cn(card, 'overflow-hidden')}>
            <div className="px-4 py-3 border-b border-[#EEF2F8]">
              <h3 className={cn(textPrimary, 'font-medium text-base')}>Quick Actions</h3>
            </div>
            <div className="px-4">
              {[
                { icon: <Lock size={16} />, label: 'Change Password' },
                { icon: <Mail size={16} />, label: 'Update Email' },
                { icon: <Shield size={16} />, label: 'Verify Identity' },
                { icon: <LogOut size={16} className="text-[#EF4444]" />, label: 'Sign Out Everywhere', danger: true },
              ].map((item) => (
                <button key={item.label} type="button" className="flex items-center justify-between w-full py-3 border-b border-[#EEF2F8] last:border-0">
                  <div className={cn('flex items-center gap-3', item.danger ? 'text-[#EF4444]' : textPrimary)}>
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={textTertiary} />
                </button>
              ))}
            </div>
          </div>

          <div className={cn(card, 'overflow-hidden')}>
            <div className="px-4 py-3 border-b border-[#EEF2F8]">
              <h3 className={cn(textPrimary, 'font-medium text-base')}>Account Activity</h3>
            </div>
            <div className="px-4">
              <div className="flex items-center justify-between py-3 border-b border-[#EEF2F8]">
                <span className={cn(textSecondary, 'text-sm')}>Last login</span>
                <span className={cn(textBrand, 'text-sm font-medium')}>Today, 9:41 AM</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className={cn(textSecondary, 'text-sm')}>Member since</span>
                <span className={cn(textBrand, 'text-sm font-medium')}>April 12, 2024</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className={cn(card, 'overflow-hidden')}>
          <div className="flex items-start justify-between px-4 py-3 border-b border-[#EEF2F8]">
            <div>
              <h3 className={cn(textPrimary, 'font-medium text-base')}>Security</h3>
              <p className={cn(textSecondary, 'text-xs mt-0.5')}>Keep your account secure</p>
            </div>
            <button type="button" className={cn(textBrand, 'text-xs font-semibold')}>Manage</button>
          </div>
          <div className="px-4">
            <SettingRow icon={<Key size={16} />} label="Password" desc="Last changed 2 months ago"
              action={<ChevronRight size={14} className={textTertiary} />} />
            <SettingRow icon={<Shield size={16} />} label="Two-Factor Authentication" desc="2FA is enabled"
              action={<Toggle on={twoFA} onChange={setTwoFA} size="sm" />} />
            <SettingRow icon={<Fingerprint size={16} />} label="Biometric Login" desc="Enabled on this device"
              action={<Toggle on={biometric} onChange={setBiometric} size="sm" />} />
            <SettingRow icon={<Activity size={16} />} label="Active Sessions" desc="3 active sessions"
              action={<ChevronRight size={14} className={textTertiary} />} />
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className={cn(card, 'overflow-hidden')}>
          <div className="flex items-start justify-between px-4 py-3 border-b border-[#EEF2F8]">
            <h3 className={cn(textPrimary, 'font-medium text-base')}>Notifications</h3>
            <button type="button" className={cn(textBrand, 'text-xs font-semibold')}>Manage All</button>
          </div>
          <div className="px-4">
            {[
              { key: 'opportunities', icon: <Target size={16} />, label: 'Opportunity Matches', desc: 'New matches and opportunities' },
              { key: 'applications', icon: <FileText size={16} />, label: 'Application Updates', desc: 'Status updates and messages' },
              { key: 'providers', icon: <Building2 size={16} />, label: 'Provider Updates', desc: 'News from followed providers' },
              { key: 'marketing', icon: <Megaphone size={16} />, label: 'Marketing & News', desc: 'Tips, features and announcements' },
              { key: 'deadlines', icon: <AlarmClock size={16} />, label: 'Deadline Reminders', desc: 'Reminders before deadlines' },
            ].map((item) => (
              <SettingRow
                key={item.key}
                icon={item.icon}
                label={item.label}
                desc={item.desc}
                action={
                  <Toggle
                    on={notifSettings[item.key as keyof typeof notifSettings]}
                    onChange={(v) => setNotifSettings((p) => ({ ...p, [item.key]: v }))}
                    size="sm"
                  />
                }
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'more' && (
        <div className="flex flex-col gap-4">
          <div className={cn(card, 'overflow-hidden')}>
            <div className="px-4 py-3 border-b border-[#EEF2F8]">
              <h3 className={cn(textPrimary, 'font-medium text-base')}>Preferences</h3>
            </div>
            <div className="px-4 py-2">
              <SettingRow icon={<Mail size={16} />} label="Email Digest" desc="Weekly activity summary"
                action={<Toggle on={prefSettings.emailDigest} onChange={(v) => setPrefSettings((p) => ({ ...p, emailDigest: v }))} size="sm" />} />
              <SettingRow icon={<Globe size={16} />} label="Profile Visibility" desc="Allow org discovery"
                action={<Toggle on={prefSettings.profileVisibility} onChange={(v) => setPrefSettings((p) => ({ ...p, profileVisibility: v }))} size="sm" />} />
              <SettingRow icon={<Bell size={16} />} label="Job Alerts" desc="New matching jobs"
                action={<Toggle on={prefSettings.jobAlerts} onChange={(v) => setPrefSettings((p) => ({ ...p, jobAlerts: v }))} size="sm" />} />
            </div>
          </div>
          <div className={cn(card, 'overflow-hidden')}>
            <div className="px-4 py-3 border-b border-[#EEF2F8]">
              <h3 className={cn(textPrimary, 'font-medium text-base')}>Privacy</h3>
            </div>
            <div className="px-4">
              {[
                { icon: <EyeOff size={16} />, label: 'Profile Visibility' },
                { icon: <Shield size={16} />, label: 'Data Sharing' },
                { icon: <RefreshCw size={16} />, label: 'Download My Data' },
              ].map((item) => (
                <button key={item.label} type="button" className="flex items-center justify-between w-full py-3 border-b border-[#EEF2F8] last:border-0">
                  <div className={cn('flex items-center gap-3', textPrimary)}>
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={textTertiary} />
                </button>
              ))}
            </div>
          </div>
          <div className={cn(card, 'overflow-hidden')}>
            <div className="px-4 py-3 border-b border-[#EEF2F8]">
              <h3 className={cn(textPrimary, 'font-medium text-base')}>Support</h3>
            </div>
            <div className="px-4">
              {[
                { icon: <HelpCircle size={16} />, label: 'Help Center' },
                { icon: <Mail size={16} />, label: 'Contact Support' },
                { icon: <FileText size={16} />, label: 'Terms of Service' },
              ].map((item) => (
                <button key={item.label} type="button" className="flex items-center justify-between w-full py-3 border-b border-[#EEF2F8] last:border-0">
                  <div className={cn('flex items-center gap-3', textPrimary)}>
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={textTertiary} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
