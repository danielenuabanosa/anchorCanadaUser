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

const TABS = ['Account', 'Security', 'Notifications', 'More'];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={cn(
        'relative w-10 h-5 rounded-full transition-colors shrink-0',
        on ? 'bg-[#2f66c8]' : 'bg-[#d9e1ef]'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all',
        on ? 'right-0.5 left-auto' : 'left-0.5'
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
    <div className="flex items-center gap-3 py-3.5 border-b border-[#eef2f8] last:border-0">
      <div className="w-7 h-7 rounded-full bg-[#f8fafc] flex items-center justify-center shrink-0 text-[#44516a]">
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

export default function MobileView() {
  const [activeTab, setActiveTab] = useState('Account');
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [notifSettings, setNotifSettings] = useState({
    opportunities: true, applications: true, providers: true, marketing: false, deadlines: true,
  });

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div>
        <h1 className="font-['Instrument_Serif'] text-[28px] leading-[1.2] text-[#0f172a]">Settings</h1>
        <p className="text-[#44516a] text-sm mt-1">Manage your account, preferences and security.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 80 80" className="w-8 h-8 -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#eef2f8" strokeWidth="10" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#22c55e" strokeWidth="10"
                strokeDasharray="188.5" strokeDashoffset={188.5 * 0.08} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-[#8c97ad] text-xs">Profile Strength</p>
            <p className="text-[#0f172a] font-semibold text-sm">92%</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#ecfdf5] px-2.5 py-1.5 rounded-[8px]">
          <CheckCircle2 size={12} className="text-[#15803d]" />
          <p className="text-[#15803d] text-xs font-medium">Account Verified</p>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto border-b border-[#eef2f8] scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-3 py-2.5 text-xs font-medium border-b-2 -mb-px whitespace-nowrap transition-colors',
              activeTab === tab ? 'border-[#2f66c8] text-[#2f66c8]' : 'border-transparent text-[#44516a]'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Account' && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <div className="flex gap-3 items-start">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#eef2f8]">
                  <Image src={profileAvatar} alt="Sara Johnson" width={56} height={56} className="object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 w-5 h-5 bg-[#2f66c8] rounded-full flex items-center justify-center">
                  <Pencil size={8} className="text-white" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-[#0f172a] font-medium text-sm">Sara Johnson</h3>
                  <CheckCircle2 size={12} className="text-[#2f66c8]" />
                </div>
                <div className="flex items-center gap-1 text-[#44516a] text-xs mt-0.5">
                  <MapPin size={10} />
                  <span>Toronto, Ontario, Canada</span>
                </div>
                <p className="text-[#44516a] text-xs">UX Designer • Student</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {['Open to Opportunities', 'Work Permit Holder'].map((tag) => (
                    <span key={tag} className="bg-[#eff4ff] border border-[#2f66c8] text-[#2f66c8] text-xs px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-[#0f172a] font-medium text-sm">Account Information</h3>
                <p className="text-[#44516a] text-xs mt-0.5">Update your personal information.</p>
              </div>
              <button className="text-[#2f66c8] text-xs font-semibold">Edit</button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: <User size={12} />, label: 'Full Name', value: 'Jacob Sullivan' },
                { icon: <Mail size={12} />, label: 'Email', value: 'jacob.sullivan@gmail.com' },
                { icon: <Calendar size={12} />, label: 'Date of Birth', value: 'May 12, 1988' },
                { icon: <Globe size={12} />, label: 'Languages', value: 'English (Canada)' },
                { icon: <Phone size={12} />, label: 'Phone Number', value: '+1 (647) 555-0198' },
                { icon: <MapPin size={12} />, label: 'Region', value: 'Ontario, Canada' },
              ].map((item) => (
                <div key={item.label} className="flex gap-2 items-center">
                  <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#8c97ad]">{item.icon}</div>
                  <div>
                    <p className="text-[#8c97ad] text-xs">{item.label}</p>
                    <p className="text-[#0f172a] text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 bg-[#2f66c8] text-white text-sm font-medium rounded-[6px] w-full py-2.5 flex items-center justify-center hover:bg-[#2558b3]">
              Save Changes
            </button>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <h3 className="text-[#0f172a] font-medium text-sm mb-3">Quick Actions</h3>
            {[
              { icon: <Lock size={12} />, label: 'Change Password' },
              { icon: <Mail size={12} />, label: 'Update Email' },
              { icon: <Shield size={12} />, label: 'Verify Identity' },
              { icon: <LogOut size={12} className="text-[#ef4444]" />, label: 'Sign Out Everywhere', danger: true },
            ].map((item) => (
              <button key={item.label} className="flex items-center justify-between w-full py-3 border-b border-[#eef2f8] last:border-0">
                <div className={cn('flex items-center gap-2', (item as { danger?: boolean }).danger ? 'text-[#ef4444]' : 'text-[#44516a]')}>
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight size={12} className="text-[#8c97ad]" />
              </button>
            ))}
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <h3 className="text-[#0f172a] font-medium text-sm mb-3">Account Activity</h3>
            <div className="flex items-center justify-between py-2.5 border-b border-[#eef2f8]">
              <span className="text-[#44516a] text-sm">Last login</span>
              <span className="text-[#2f66c8] text-sm font-medium">Today, 9:41 AM</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#44516a] text-sm">Member since</span>
              <span className="text-[#2f66c8] text-sm font-medium">April 12, 2024</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Security' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-[#0f172a] font-medium text-sm">Security</h3>
              <p className="text-[#44516a] text-xs mt-0.5">Keep your account secure</p>
            </div>
            <button className="text-[#2f66c8] text-xs font-semibold">Manage</button>
          </div>
          <SettingRow icon={<Key size={12} />} label="Password" desc="Last changed 2 months ago" action={<ChevronRight size={12} className="text-[#8c97ad]" />} />
          <SettingRow icon={<Shield size={12} />} label="Two-Factor Authentication" desc="2FA is enabled" action={<Toggle on={twoFA} onChange={setTwoFA} />} />
          <SettingRow icon={<Fingerprint size={12} />} label="Biometric Login" desc="Enabled on this device" action={<Toggle on={biometric} onChange={setBiometric} />} />
          <SettingRow icon={<Activity size={12} />} label="Active Sessions" desc="3 active sessions" action={<ChevronRight size={12} className="text-[#8c97ad]" />} />
        </div>
      )}

      {activeTab === 'Notifications' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-[#0f172a] font-medium text-sm">Notifications</h3>
            <button className="text-[#2f66c8] text-xs font-semibold">Manage All</button>
          </div>
          {[
            { key: 'opportunities', icon: <Target size={12} />, label: 'Opportunity Matches', desc: 'New matches and opportunities' },
            { key: 'applications', icon: <FileText size={12} />, label: 'Application Updates', desc: 'Status updates and messages' },
            { key: 'providers', icon: <Building2 size={12} />, label: 'Provider Updates', desc: 'News from followed providers' },
            { key: 'marketing', icon: <Megaphone size={12} />, label: 'Marketing & News', desc: 'Tips, features and announcements' },
            { key: 'deadlines', icon: <AlarmClock size={12} />, label: 'Deadline Reminders', desc: 'Reminders before deadlines' },
          ].map((item) => (
            <SettingRow
              key={item.key}
              icon={item.icon}
              label={item.label}
              desc={item.desc}
              action={
                <Toggle
                  on={notifSettings[item.key as keyof typeof notifSettings]}
                  onChange={(v) => setNotifSettings(p => ({ ...p, [item.key]: v }))}
                />
              }
            />
          ))}
        </div>
      )}

      {activeTab === 'More' && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <h3 className="text-[#0f172a] font-medium text-sm mb-3">Privacy</h3>
            {[
              { icon: <EyeOff size={12} />, label: 'Profile Visibility' },
              { icon: <Shield size={12} />, label: 'Data Sharing' },
              { icon: <RefreshCw size={12} />, label: 'Download My Data' },
            ].map((item) => (
              <button key={item.label} className="flex items-center justify-between w-full py-3 border-b border-[#eef2f8] last:border-0">
                <div className="flex items-center gap-2 text-[#44516a]">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight size={12} className="text-[#8c97ad]" />
              </button>
            ))}
          </div>
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <h3 className="text-[#0f172a] font-medium text-sm mb-3">Support</h3>
            {[
              { icon: <HelpCircle size={12} />, label: 'Help Center' },
              { icon: <Mail size={12} />, label: 'Contact Support' },
              { icon: <FileText size={12} />, label: 'Terms of Service' },
            ].map((item) => (
              <button key={item.label} className="flex items-center justify-between w-full py-3 border-b border-[#eef2f8] last:border-0">
                <div className="flex items-center gap-2 text-[#44516a]">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight size={12} className="text-[#8c97ad]" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
