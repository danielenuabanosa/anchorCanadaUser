'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  User, Mail, Phone, Globe, Calendar, MapPin, Lock, Shield, Fingerprint,
  Activity, Bell, Sliders, EyeOff, HelpCircle, ChevronRight, CheckCircle2,
  LogOut, Pencil, Key, Target, Building2, Megaphone, AlarmClock, FileText, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

import profileAvatar from '@/../assets/images/profile-avatar.png';

const TABS = [
  { id: 'account', label: 'Account', icon: <User size={14} /> },
  { id: 'security', label: 'Security', icon: <Lock size={14} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={14} /> },
  { id: 'preferences', label: 'Preferences', icon: <Sliders size={14} /> },
  { id: 'privacy', label: 'Privacy', icon: <EyeOff size={14} /> },
  { id: 'support', label: 'Support', icon: <HelpCircle size={14} /> },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={cn(
        'relative w-11 h-6 rounded-full transition-colors shrink-0',
        on ? 'bg-[#2f66c8]' : 'bg-[#d9e1ef]'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform',
        on ? 'translate-x-5.5 left-auto right-0.5' : 'left-0.5'
      )} />
    </button>
  );
}

function SettingRow({ icon, label, desc, action }: {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-[#eef2f8] last:border-0">
      <div className="w-8 h-8 rounded-full bg-[#f8fafc] flex items-center justify-center shrink-0 text-[#44516a]">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[#0f172a] font-medium text-sm">{label}</p>
        {desc && <p className="text-[#8c97ad] text-xs mt-0.5">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

function AccountTab() {
  const [formData, setFormData] = useState({
    fullName: 'Jacob Sullivan',
    email: 'jacob.sullivan@gmail.com',
    dob: 'May 12, 1988',
    languages: 'English (Canada)',
    phone: '+1 (647) 555-0198',
    region: 'Ontario, Canada',
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
        <div className="flex gap-4 items-start">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#eef2f8]">
              <Image src={profileAvatar} alt="Sara Johnson" width={64} height={64} className="object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-5 h-5 bg-[#2f66c8] rounded-full flex items-center justify-center">
              <Pencil size={8} className="text-white" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[#0f172a] font-medium text-base">Sara Johnson</h3>
              <CheckCircle2 size={14} className="text-[#2f66c8]" />
            </div>
            <div className="flex items-center gap-1 text-[#44516a] text-sm mt-0.5">
              <MapPin size={12} />
              <span>Toronto, Ontario, Canada</span>
            </div>
            <p className="text-[#44516a] text-sm">UX Designer • Student</p>
            <p className="text-[#44516a] text-sm mt-1">Building a career in digital product design and user experience.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Open to Opportunities', 'Work Permit Holder', 'Available Immediately'].map((tag) => (
                <span key={tag} className="bg-[#eff4ff] border border-[#2f66c8] text-[#2f66c8] text-xs px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[#0f172a] font-medium text-base">Account Information</h3>
            <p className="text-[#44516a] text-sm mt-0.5">Update your personal information and account details.</p>
          </div>
          <button className="text-[#2f66c8] text-sm font-semibold hover:underline">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {[
            { icon: <User size={14} />, label: 'Full Name', field: 'fullName' },
            { icon: <Mail size={14} />, label: 'Email', field: 'email' },
            { icon: <Calendar size={14} />, label: 'Date of Birth', field: 'dob' },
            { icon: <Globe size={14} />, label: 'Languages', field: 'languages' },
            { icon: <Phone size={14} />, label: 'Phone Number', field: 'phone' },
            { icon: <MapPin size={14} />, label: 'Region', field: 'region' },
          ].map((item) => (
            <div key={item.field} className="flex gap-3 items-start">
              <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#8c97ad]">
                {item.icon}
              </div>
              <div>
                <p className="text-[#8c97ad] text-xs">{item.label}</p>
                <p className="text-[#0f172a] text-sm font-medium mt-0.5">{formData[item.field as keyof typeof formData]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <button className="bg-[#2f66c8] text-white text-sm font-medium rounded-[6px] px-5 py-2.5 hover:bg-[#2558b3] transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
          <h3 className="text-[#0f172a] font-medium text-base mb-4">Quick Actions</h3>
          {[
            { icon: <Lock size={14} />, label: 'Change Password' },
            { icon: <Mail size={14} />, label: 'Update Email' },
            { icon: <Shield size={14} />, label: 'Verify Identity' },
            { icon: <LogOut size={14} className="text-[#ef4444]" />, label: 'Sign Out Everywhere', danger: true },
          ].map((item) => (
            <button key={item.label} className="flex items-center justify-between w-full py-3.5 border-b border-[#eef2f8] last:border-0 hover:bg-[#f8fafc] -mx-5 px-5 transition-colors">
              <div className={cn('flex items-center gap-3', (item as { danger?: boolean }).danger ? 'text-[#ef4444]' : 'text-[#44516a]')}>
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight size={14} className="text-[#8c97ad]" />
            </button>
          ))}
        </div>

        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
          <h3 className="text-[#0f172a] font-medium text-base mb-4">Account Activity</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[#44516a] text-sm">Last login</span>
              <span className="text-[#2f66c8] text-sm font-medium">Today, 9:41 AM</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#eef2f8] pt-4">
              <span className="text-[#44516a] text-sm">Member since</span>
              <span className="text-[#2f66c8] text-sm font-medium">April 12, 2024</span>
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
    <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-[#0f172a] font-medium text-base">Security</h3>
          <p className="text-[#44516a] text-sm mt-0.5">Keep your account secure</p>
        </div>
        <button className="text-[#2f66c8] text-sm font-semibold hover:underline">Manage Security</button>
      </div>
      <div className="mt-2">
        <SettingRow
          icon={<Key size={14} />}
          label="Password"
          desc="Last changed 2 months ago"
          action={<ChevronRight size={14} className="text-[#8c97ad]" />}
        />
        <SettingRow
          icon={<Shield size={14} />}
          label="Two-Factor Authentication"
          desc="2FA is enabled"
          action={<Toggle on={twoFA} onChange={setTwoFA} />}
        />
        <SettingRow
          icon={<Fingerprint size={14} />}
          label="Biometric Login"
          desc="Enabled on this device"
          action={<Toggle on={biometric} onChange={setBiometric} />}
        />
        <SettingRow
          icon={<Activity size={14} />}
          label="Active Sessions"
          desc="3 active sessions"
          action={<ChevronRight size={14} className="text-[#8c97ad]" />}
        />
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    opportunities: true,
    applications: true,
    providers: true,
    marketing: false,
    deadlines: true,
  });

  const items = [
    { key: 'opportunities', icon: <Target size={14} />, label: 'Opportunity Matches', desc: 'New matches and opportunities' },
    { key: 'applications', icon: <FileText size={14} />, label: 'Application Updates', desc: 'Status updates and messages' },
    { key: 'providers', icon: <Building2 size={14} />, label: 'Provider Updates', desc: 'News from followed providers' },
    { key: 'marketing', icon: <Megaphone size={14} />, label: 'Marketing & News', desc: 'Tips, features and announcements' },
    { key: 'deadlines', icon: <AlarmClock size={14} />, label: 'Deadline Reminders', desc: 'Reminders before deadlines' },
  ];

  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-[#0f172a] font-medium text-base">Notifications</h3>
          <p className="text-[#44516a] text-sm mt-0.5">Manage your notification preferences</p>
        </div>
        <button className="text-[#2f66c8] text-sm font-semibold hover:underline">Manage Notifications</button>
      </div>
      <div className="mt-2">
        {items.map((item) => (
          <SettingRow
            key={item.key}
            icon={item.icon}
            label={item.label}
            desc={item.desc}
            action={
              <Toggle
                on={settings[item.key as keyof typeof settings]}
                onChange={(v) => setSettings(prev => ({ ...prev, [item.key]: v }))}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}

function PreferencesTab() {
  const [settings, setSettings] = useState({
    emailDigest: true,
    profileVisibility: false,
    jobAlerts: true,
  });

  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
      <h3 className="text-[#0f172a] font-medium text-base mb-4">Preferences</h3>
      <SettingRow
        icon={<Mail size={14} />}
        label="Email Digest"
        desc="Receive a weekly summary of your activity"
        action={<Toggle on={settings.emailDigest} onChange={(v) => setSettings(p => ({ ...p, emailDigest: v }))} />}
      />
      <SettingRow
        icon={<Globe size={14} />}
        label="Profile Visibility"
        desc="Allow organizations to discover your profile"
        action={<Toggle on={settings.profileVisibility} onChange={(v) => setSettings(p => ({ ...p, profileVisibility: v }))} />}
      />
      <SettingRow
        icon={<Bell size={14} />}
        label="Job Alerts"
        desc="Get notified when new matching jobs are posted"
        action={<Toggle on={settings.jobAlerts} onChange={(v) => setSettings(p => ({ ...p, jobAlerts: v }))} />}
      />
    </div>
  );
}

function PrivacyTab() {
  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
      <h3 className="text-[#0f172a] font-medium text-base mb-4">Privacy Settings</h3>
      {[
        { icon: <EyeOff size={14} />, label: 'Profile Visibility', desc: 'Control who can see your profile' },
        { icon: <Shield size={14} />, label: 'Data Sharing', desc: 'Manage how your data is used' },
        { icon: <RefreshCw size={14} />, label: 'Download My Data', desc: 'Request a copy of your data' },
        { icon: <LogOut size={14} className="text-[#ef4444]" />, label: 'Delete Account', desc: 'Permanently delete your account' },
      ].map((item) => (
        <SettingRow
          key={item.label}
          icon={item.icon}
          label={item.label}
          desc={item.desc}
          action={<ChevronRight size={14} className="text-[#8c97ad]" />}
        />
      ))}
    </div>
  );
}

function SupportTab() {
  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
      <h3 className="text-[#0f172a] font-medium text-base mb-4">Support</h3>
      {[
        { icon: <HelpCircle size={14} />, label: 'Help Center', desc: 'Browse FAQs and guides' },
        { icon: <Mail size={14} />, label: 'Contact Support', desc: 'Send us a message' },
        { icon: <FileText size={14} />, label: 'Terms of Service', desc: 'Review our terms' },
        { icon: <Shield size={14} />, label: 'Privacy Policy', desc: 'Review our privacy policy' },
      ].map((item) => (
        <SettingRow
          key={item.label}
          icon={item.icon}
          label={item.label}
          desc={item.desc}
          action={<ChevronRight size={14} className="text-[#8c97ad]" />}
        />
      ))}
    </div>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-['Instrument_Serif'] text-[36px] leading-[56px] text-[#0f172a]">Settings</h1>
          <p className="text-[#44516a] text-base">Manage your account, preferences and security.</p>
        </div>
        <div className="flex items-center gap-5 mt-2">
          <div className="flex items-center gap-3">
            <span className="text-[#0f172a] font-medium text-sm">Profile Strength</span>
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 80 80" className="w-10 h-10 -rotate-90">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#eef2f8" strokeWidth="10" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#22c55e" strokeWidth="10"
                  strokeDasharray="188.5" strokeDashoffset={188.5 * 0.08} strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[#0f172a] font-semibold text-lg">92%</span>
          </div>
          <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-[8px]">
            <CheckCircle2 size={16} className="text-[#15803d]" />
            <div>
              <p className="text-[#15803d] font-medium text-sm">Account Verified</p>
              <p className="text-[#8c97ad] text-xs">Your account is fully verified</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0 border-b border-[#eef2f8]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
              activeTab === tab.id
                ? 'border-[#2f66c8] text-[#2f66c8]'
                : 'border-transparent text-[#44516a] hover:text-[#0f172a]'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'account' && <AccountTab />}
      {activeTab === 'security' && <SecurityTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'preferences' && <PreferencesTab />}
      {activeTab === 'privacy' && <PrivacyTab />}
      {activeTab === 'support' && <SupportTab />}
    </div>
  );
}
