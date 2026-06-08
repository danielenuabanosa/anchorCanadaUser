'use client';

import { useState } from 'react';
import {
  Bell, Settings, TriangleAlert, CheckCheck, ChevronDown, ChevronRight,
  Star, Eye, Sparkles, Clock, CheckCircle, FileText, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { label: 'All', count: 32 },
  { label: 'Applications', count: 12 },
  { label: 'Matches', count: 6 },
  { label: 'Deadlines', count: 5 },
  { label: 'Needs Attention', count: 2 },
  { label: 'System', count: 4 },
  { label: 'Saved', count: 5 },
];

type NotifItem = {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  time: string;
  action?: string;
  unread: boolean;
};

const todayNotifs: NotifItem[] = [
  {
    id: 1, iconBg: 'bg-[#ecfdf5]',
    icon: <Star size={16} className="text-[#15803d]" />,
    title: "You've been shortlisted! 🎉",
    desc: 'Great news! You\'ve been shortlisted fr the Product Design Intern position a Google',
    time: '2 mins ago', action: 'View Application', unread: true,
  },
  {
    id: 2, iconBg: 'bg-[#eff4ff]',
    icon: <Eye size={16} className="text-[#2f66c8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for the Youth Innovation Grant',
    time: '45 mins ago', action: 'View Application', unread: true,
  },
  {
    id: 3, iconBg: 'bg-[#f5f3ff]',
    icon: <Sparkles size={16} className="text-[#7c3aed]" />,
    title: '4 new opportunities match your goals',
    desc: 'We found new opportunities that match your skills and interests.',
    time: '1 hour ago', action: 'Explore Matches', unread: true,
  },
  {
    id: 4, iconBg: 'bg-[#fff7ed]',
    icon: <Clock size={16} className="text-[#ea580c]" />,
    title: 'Deadline approaching',
    desc: 'Product Design Intern at Google closes in 5 days.',
    time: '3 hours ago', action: 'View Opportunity', unread: false,
  },
];

const yesterdayNotifs: NotifItem[] = [
  {
    id: 5, iconBg: 'bg-[#ecfdf5]',
    icon: <CheckCircle size={16} className="text-[#15803d]" />,
    title: 'Your profile is now 93% complete',
    desc: 'Complete your profile to get more relevant opportunities.',
    time: 'Yesterday, 4:30 PM', action: 'Complete Profile', unread: true,
  },
  {
    id: 6, iconBg: 'bg-[#eff4ff]',
    icon: <FileText size={16} className="text-[#2f66c8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for the Youth Innovation Grant',
    time: 'Yesterday, 11:15 AM', action: 'View Message', unread: false,
  },
];

const earlierNotifs: NotifItem[] = [
  {
    id: 7, iconBg: 'bg-[#eff4ff]',
    icon: <FileText size={16} className="text-[#2f66c8]" />,
    title: 'Welcome to Anchor Canada.',
    desc: "Thanks for joining! Let's help your find life-changing opportunities.",
    time: 'May 8, 2026', unread: false,
  },
];

const SUMMARY_ITEMS = [
  { label: '12 Applications', color: '#2f66c8' },
  { label: '6 Matches', color: '#10b981' },
  { label: '5 Deadlines', color: '#f59e0b' },
  { label: '4 System', color: '#8b5cf6' },
  { label: '5 Saved', color: '#ef4444' },
];

function NotifRow({ notif }: { notif: NotifItem }) {
  return (
    <div className={cn(
      'flex items-start gap-4 px-4 py-4 border-b border-[#eef2f8] last:border-0 hover:bg-[#f8fafc] transition-colors',
      notif.unread && 'bg-[#fafbff]'
    )}>
      <div className={cn('w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5', notif.iconBg)}>
        {notif.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#0f172a] text-sm font-medium">{notif.title}</p>
        <p className="text-[#44516a] text-xs mt-0.5 leading-relaxed">{notif.desc}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[#8c97ad] text-xs whitespace-nowrap">{notif.time}</span>
        {notif.action && (
          <button className="text-[#2f66c8] text-xs font-semibold whitespace-nowrap hover:underline">
            {notif.action}
          </button>
        )}
        {notif.unread && <div className="w-2 h-2 rounded-full bg-[#2f66c8] shrink-0" />}
      </div>
    </div>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-['Instrument_Serif'] text-[36px] leading-[56px] text-[#0f172a]">Notifications</h1>
          <p className="text-[#44516a] text-base">Stay updated on your opportunities and progress.</p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <button className="flex items-center gap-2 border border-[#d9e1ef] rounded-[6px] px-4 py-2 text-sm text-[#44516a] bg-white hover:bg-[#f8fafc]">
            <CheckCheck size={14} />
            Mark all as read
          </button>
          <button className="flex items-center gap-2 border border-[#d9e1ef] rounded-[6px] px-4 py-2 text-sm text-[#44516a] bg-white hover:bg-[#f8fafc]">
            <Settings size={14} />
            Settings
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-[#44516a]" />
          <span className="text-[#44516a] text-sm">8 unread updates</span>
        </div>
        <div className="flex items-center gap-2">
          <TriangleAlert size={14} className="text-[#ef4444]" />
          <span className="text-[#ef4444] text-sm font-medium">3 need attention today</span>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-[6px] text-sm font-medium whitespace-nowrap transition-colors',
                    activeTab === tab.label
                      ? 'bg-[#2f66c8] text-white'
                      : 'text-[#44516a] hover:bg-[#f8fafc]'
                  )}
                >
                  {tab.label}
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    activeTab === tab.label ? 'bg-white/20 text-white' : 'bg-[#eef2f8] text-[#0f172a]'
                  )}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span className="text-[#44516a] text-sm">Sort by</span>
              <button className="border border-[#d9e1ef] rounded-[6px] flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] bg-white">
                Most Recent
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-[10px] p-4">
            <p className="text-[#b91c1c] font-semibold text-sm mb-3">Needs Your Attention</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#b91c1c] text-xs font-semibold bg-[#fee2e2] px-2 py-1 rounded-[4px]">DEADLINE TOMORROW</span>
                  <button className="text-[#2f66c8] text-xs font-semibold">View Opportunity</button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#ea580c]" />
                  </div>
                  <div>
                    <p className="text-[#0f172a] text-sm font-medium">UX Design Intern application close...</p>
                    <p className="text-[#44516a] text-xs mt-0.5">Shopify ✓ • Closes May 11, 2026 • 11:59 PM EST</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#7c3aed] text-xs font-semibold bg-[#f5f3ff] px-2 py-1 rounded-[4px]">INTERVIEW IN 2 DAYS</span>
                  <button className="text-[#2f66c8] text-xs font-semibold">View Details</button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0">
                    <Bell size={16} className="text-[#2f66c8]" />
                  </div>
                  <div>
                    <p className="text-[#0f172a] text-sm font-medium">Interview with Shopify in 2 days</p>
                    <p className="text-[#44516a] text-xs mt-0.5">May 12, 2026 • 10:00 AM EST • Virtual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#eef2f8]">
              <p className="text-[#0f172a] font-medium text-sm">Today</p>
            </div>
            {todayNotifs.map((n) => <NotifRow key={n.id} notif={n} />)}
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#eef2f8]">
              <p className="text-[#0f172a] font-medium text-sm">Yesterday</p>
            </div>
            {yesterdayNotifs.map((n) => <NotifRow key={n.id} notif={n} />)}
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#eef2f8]">
              <p className="text-[#0f172a] font-medium text-sm">Earlier</p>
            </div>
            {earlierNotifs.map((n) => <NotifRow key={n.id} notif={n} />)}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#44516a] text-sm">Showing 1 to 10 of 32 notifications</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={cn(
                    'w-9 h-9 rounded-[6px] text-sm font-medium transition-colors',
                    page === 1 ? 'bg-[#2f66c8] text-white' : 'bg-white border border-[#d9e1ef] text-[#44516a] hover:bg-[#f8fafc]'
                  )}
                >
                  {page}
                </button>
              ))}
              <button className="flex items-center gap-1 px-3 py-2 border border-[#d9e1ef] rounded-[6px] text-sm text-[#44516a] hover:bg-[#f8fafc]">
                Next
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-60 flex flex-col gap-4 shrink-0">
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <h3 className="text-[#0f172a] font-medium text-sm mb-4">Notifications Summary</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#eef2f8" strokeWidth="10" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#2f66c8" strokeWidth="10"
                    strokeDasharray="188.5" strokeDashoffset="0" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#10b981" strokeWidth="10"
                    strokeDasharray="188.5" strokeDashoffset="117.8" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#f59e0b" strokeWidth="10"
                    strokeDasharray="188.5" strokeDashoffset="153.3" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#8b5cf6" strokeWidth="10"
                    strokeDasharray="188.5" strokeDashoffset="177.6" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#ef4444" strokeWidth="10"
                    strokeDasharray="188.5" strokeDashoffset="153.3" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[#0f172a] font-semibold text-lg leading-none">32</span>
                  <span className="text-[#8c97ad] text-xs">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {SUMMARY_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#44516a] text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <h3 className="text-[#0f172a] font-medium text-sm mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-0">
              {[
                { icon: <CheckCheck size={14} className="text-[#2f66c8]" />, label: 'Mark all as read' },
                { icon: <Eye size={14} className="text-[#f59e0b]" />, label: 'View unread only' },
                { icon: <Settings size={14} className="text-[#8c97ad]" />, label: 'Notification Settings' },
              ].map((action) => (
                <button key={action.label} className="flex items-center justify-between py-3 border-b border-[#eef2f8] last:border-0 hover:bg-[#f8fafc] -mx-4 px-4 transition-colors">
                  <div className="flex items-center gap-2">
                    {action.icon}
                    <span className="text-[#44516a] text-sm">{action.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-[#8c97ad]" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[10px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💡</span>
              <h3 className="text-[#0f172a] font-medium text-sm">Tip of the Day</h3>
            </div>
            <p className="text-[#44516a] text-xs leading-relaxed">Respond quickly to opportunities to increase your chances of success.</p>
            <div className="mt-3 flex justify-center">
              <div className="w-20 h-16 bg-[#fde68a]/30 rounded-lg flex items-center justify-center text-3xl">
                🎯
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
