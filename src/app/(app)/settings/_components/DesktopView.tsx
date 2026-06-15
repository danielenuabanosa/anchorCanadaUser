'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  User, Mail, Phone, Globe, Calendar, MapPin, Lock, Shield, Fingerprint,
  Activity, Bell, Sliders, EyeOff, HelpCircle, ChevronRight, CheckCircle2,
  LogOut, Pencil, Key, Target, Building2, Megaphone, AlarmClock, FileText, RefreshCw,
  Headphones,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageTitle, TabNav, Toggle, SettingsStatusBar, ProfileTags,
  SectionCard, textPrimary, textSecondary, textTertiary, textBrand, card, bgBrand,
} from '@/shared/components/app/page-ui';
import profileAvatar from '@/../assets/images/profile-avatar.png';

const TABS = [
  { id: 'account' as const, label: 'Account', icon: <User size={16} /> },
  { id: 'security' as const, label: 'Security', icon: <Shield size={16} /> },
  { id: 'notifications' as const, label: 'Notifications', icon: <Bell size={16} /> },
  { id: 'preferences' as const, label: 'Preferences', icon: <Sliders size={16} /> },
  { id: 'privacy' as const, label: 'Privacy', icon: <EyeOff size={16} /> },
  { id: 'support' as const, label: 'Support', icon: <Headphones size={16} /> },
];

type TabId = typeof TABS[number]['id'];

function SettingRow({ icon, label, desc, action }: {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3.5 py-2.5 border-b border-[#EEF2F8] last:border-0">
      <div className={cn('shrink-0', textPrimary)}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={cn(textPrimary, 'text-sm md:text-base')}>{label}</p>
        {desc && <p className={cn(textTertiary, 'text-xs mt-0.5')}>{desc}</p>}
      </div>
      {action}
    </div>
  );
}

function ManageButton({ label }: { label: string }) {
  return (
    <button type="button" className="border border-[#D9E1EF] rounded-[6px] px-4 py-2 text-sm font-semibold text-[#0F172A] bg-white hover:bg-[#F8FAFC] transition-colors whitespace-nowrap">
      {label}
    </button>
  );
}

function AccountTab() {
  const formData = {
    fullName: 'Jacob Sullivan',
    email: 'jacob.sullivan@gmail.com',
    dob: 'May 12, 1988',
    languages: 'English (Canada)',
    phone: '+1 (647) 555-0198',
    region: 'Ontario, Canada',
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={cn(card, 'p-5')}>
          <div className="flex gap-4 items-start">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EEF2F8]">
                <Image src={profileAvatar} alt="Sara Johnson" width={64} height={64} className="object-cover" />
              </div>
              <button type="button" className={cn('absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center', bgBrand)}>
                <Pencil size={8} className="text-white" />
              </button>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-instrument-serif text-2xl text-[#0F172A]">Sara Johnson</h3>
                <CheckCircle2 size={16} className="text-[#2F66C8] shrink-0" />
              </div>
              <div className={cn('flex items-center gap-1 text-sm mt-1', textSecondary)}>
                <MapPin size={12} />
                <span>Toronto, Ontario, Canada</span>
              </div>
              <p className={cn(textSecondary, 'text-sm')}>UX Designer • Student</p>
              <p className={cn(textSecondary, 'text-sm mt-2 leading-relaxed')}>
                Building a career in digital product design and user experience.
              </p>
              <ProfileTags className="mt-3" />
            </div>
          </div>
        </div>

        <div className={cn(card, 'p-5')}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={cn(textPrimary, 'font-medium text-lg')}>Account Information</h3>
              <p className={cn(textSecondary, 'text-sm mt-0.5')}>Update your personal information and account details.</p>
            </div>
            <button type="button" className={cn(textBrand, 'text-sm font-semibold hover:underline')}>Edit</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              { icon: <User size={18} />, label: 'Full Name', value: formData.fullName },
              { icon: <Mail size={18} />, label: 'Email', value: formData.email },
              { icon: <Calendar size={18} />, label: 'Date of Birth', value: formData.dob },
              { icon: <Globe size={18} />, label: 'Languages', value: formData.languages },
              { icon: <Phone size={18} />, label: 'Phone Number', value: formData.phone },
              { icon: <MapPin size={18} />, label: 'Region', value: formData.region },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start">
                <div className={cn('w-5 h-5 flex items-center justify-center shrink-0 mt-0.5', textTertiary)}>
                  {item.icon}
                </div>
                <div>
                  <p className={cn(textTertiary, 'text-xs')}>{item.label}</p>
                  <p className={cn(textPrimary, 'text-sm font-medium mt-0.5')}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-5">
            <button type="button" className={cn(bgBrand, 'text-white text-sm font-medium rounded-[6px] px-5 py-2.5 hover:bg-[#2454A4] transition-colors')}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={cn(card, 'overflow-hidden')}>
          <div className="px-5 py-4 border-b border-[#EEF2F8]">
            <h3 className={cn(textPrimary, 'font-medium text-lg')}>Quick Actions</h3>
          </div>
          <div className="p-5 flex flex-col gap-3.5">
            {[
              { icon: <Lock size={18} />, label: 'Change Password' },
              { icon: <Mail size={18} />, label: 'Update Email' },
              { icon: <Shield size={18} />, label: 'Verify Identity' },
              { icon: <LogOut size={18} className="text-[#EF4444]" />, label: 'Sign Out Everywhere', danger: true },
            ].map((item) => (
              <button key={item.label} type="button" className="flex items-center justify-between w-full py-2.5 hover:bg-[#F8FAFC] -mx-5 px-5 transition-colors">
                <div className={cn('flex items-center gap-3.5', item.danger ? 'text-[#EF4444]' : textPrimary)}>
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </div>
                <ChevronRight size={18} className={textTertiary} />
              </button>
            ))}
          </div>
        </div>

        <div className={cn(card, 'overflow-hidden')}>
          <div className="px-5 py-4 border-b border-[#EEF2F8]">
            <h3 className={cn(textPrimary, 'font-medium text-lg')}>Account Activity</h3>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className={cn(textSecondary, 'text-sm')}>Last login</span>
              <span className={cn(textBrand, 'text-sm font-medium')}>Today, 9:41 AM</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#EEF2F8] pt-4">
              <span className={cn(textSecondary, 'text-sm')}>Member since</span>
              <span className={cn(textBrand, 'text-sm font-medium')}>April 12, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(true);

  return (
    <div className={cn(card, 'overflow-hidden')}>
      <div className="flex items-start justify-between px-5 py-4 border-b border-[#EEF2F8]">
        <div>
          <h3 className={cn(textPrimary, 'font-medium text-lg')}>Security</h3>
          <p className={cn(textSecondary, 'text-sm mt-0.5')}>Keep your account secure</p>
        </div>
        <ManageButton label="Manage Security" />
      </div>
      <div className="p-5">
        <SettingRow icon={<Key size={18} />} label="Password" desc="Last changed 2 months ago"
          action={<ChevronRight size={18} className={textTertiary} />} />
        <SettingRow icon={<Shield size={18} />} label="Two-Factor Authentication" desc="2FA is enabled"
          action={<Toggle on={twoFA} onChange={setTwoFA} />} />
        <SettingRow icon={<Fingerprint size={18} />} label="Biometric Login" desc="Enabled on this device"
          action={<Toggle on={biometric} onChange={setBiometric} />} />
        <SettingRow icon={<Activity size={18} />} label="Active Sessions" desc="3 active sessions"
          action={<ChevronRight size={18} className={textTertiary} />} />
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    opportunities: true, applications: true, providers: true, marketing: false, deadlines: true,
  });

  const items = [
    { key: 'opportunities', icon: <Target size={18} />, label: 'Opportunity Matches', desc: 'New matches and opportunities' },
    { key: 'applications', icon: <FileText size={18} />, label: 'Application Updates', desc: 'Status updates and messages' },
    { key: 'providers', icon: <Building2 size={18} />, label: 'Provider Updates', desc: 'News from followed providers' },
    { key: 'marketing', icon: <Megaphone size={18} />, label: 'Marketing & News', desc: 'Tips, features and announcements' },
    { key: 'deadlines', icon: <AlarmClock size={18} />, label: 'Deadline Reminders', desc: 'Reminders before deadlines' },
  ];

  return (
    <div className={cn(card, 'overflow-hidden')}>
      <div className="flex items-start justify-between px-5 py-4 border-b border-[#EEF2F8]">
        <div>
          <h3 className={cn(textPrimary, 'font-medium text-lg')}>Notifications</h3>
          <p className={cn(textSecondary, 'text-sm mt-0.5')}>Manage your notification preferences</p>
        </div>
        <ManageButton label="Manage Notifications" />
      </div>
      <div className="p-5">
        {items.map((item) => (
          <SettingRow
            key={item.key}
            icon={item.icon}
            label={item.label}
            desc={item.desc}
            action={
              <Toggle
                on={settings[item.key as keyof typeof settings]}
                onChange={(v) => setSettings((prev) => ({ ...prev, [item.key]: v }))}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}

function PreferencesTab() {
  const [settings, setSettings] = useState({ emailDigest: true, profileVisibility: false, jobAlerts: true });

  return (
    <SectionCard title="Preferences">
      <SettingRow icon={<Mail size={18} />} label="Email Digest" desc="Receive a weekly summary of your activity"
        action={<Toggle on={settings.emailDigest} onChange={(v) => setSettings((p) => ({ ...p, emailDigest: v }))} />} />
      <SettingRow icon={<Globe size={18} />} label="Profile Visibility" desc="Allow organizations to discover your profile"
        action={<Toggle on={settings.profileVisibility} onChange={(v) => setSettings((p) => ({ ...p, profileVisibility: v }))} />} />
      <SettingRow icon={<Bell size={18} />} label="Job Alerts" desc="Get notified when new matching jobs are posted"
        action={<Toggle on={settings.jobAlerts} onChange={(v) => setSettings((p) => ({ ...p, jobAlerts: v }))} />} />
    </SectionCard>
  );
}

function PrivacyTab() {
  return (
    <SectionCard title="Privacy Settings">
      {[
        { icon: <EyeOff size={18} />, label: 'Profile Visibility', desc: 'Control who can see your profile' },
        { icon: <Shield size={18} />, label: 'Data Sharing', desc: 'Manage how your data is used' },
        { icon: <RefreshCw size={18} />, label: 'Download My Data', desc: 'Request a copy of your data' },
        { icon: <LogOut size={18} />, label: 'Delete Account', desc: 'Permanently delete your account' },
      ].map((item) => (
        <SettingRow key={item.label} icon={item.icon} label={item.label} desc={item.desc}
          action={<ChevronRight size={18} className={textTertiary} />} />
      ))}
    </SectionCard>
  );
}

function SupportTab() {
  return (
    <SectionCard title="Support">
      {[
        { icon: <HelpCircle size={18} />, label: 'Help Center', desc: 'Browse FAQs and guides' },
        { icon: <Mail size={18} />, label: 'Contact Support', desc: 'Send us a message' },
        { icon: <FileText size={18} />, label: 'Terms of Service', desc: 'Review our terms' },
        { icon: <Shield size={18} />, label: 'Privacy Policy', desc: 'Review our privacy policy' },
      ].map((item) => (
        <SettingRow key={item.label} icon={item.icon} label={item.label} desc={item.desc}
          action={<ChevronRight size={18} className={textTertiary} />} />
      ))}
    </SectionCard>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<TabId>('account');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <PageTitle
          title="Settings"
          subtitle="Manage your account, preferences and security."
        />
        <SettingsStatusBar />
      </div>

      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'account' && <AccountTab />}
      {activeTab === 'security' && <SecurityTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'preferences' && <PreferencesTab />}
      {activeTab === 'privacy' && <PrivacyTab />}
      {activeTab === 'support' && <SupportTab />}
    </div>
  );
}
