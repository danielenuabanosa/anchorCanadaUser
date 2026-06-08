'use client';

import { useState } from 'react';
import {
  Bell, Settings, TriangleAlert, CheckCheck, ChevronDown, ChevronRight,
  Star, Eye, Sparkles, Clock, CheckCircle, FileText, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = ['All', 'Applications', 'Matches', 'Deadlines', 'Unread'];

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
    icon: <Star size={14} className="text-[#15803d]" />,
    title: "You've been shortlisted! 🎉",
    desc: "Great news! You've been shortlisted fr the Pr...",
    time: '1 mins ago', action: undefined, unread: true,
  },
  {
    id: 2, iconBg: 'bg-[#eff4ff]',
    icon: <Eye size={14} className="text-[#2f66c8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for t...',
    time: '45 mins ago', action: undefined, unread: false,
  },
  {
    id: 3, iconBg: 'bg-[#f5f3ff]',
    icon: <Sparkles size={14} className="text-[#7c3aed]" />,
    title: '4 new opportunities match your...',
    desc: 'We found new opportunities that match...',
    time: '1 hour ago', action: undefined, unread: false,
  },
  {
    id: 4, iconBg: 'bg-[#fff7ed]',
    icon: <Clock size={14} className="text-[#ea580c]" />,
    title: 'Deadline approaching',
    desc: 'Product Design Intern at Google closes in 5 d...',
    time: '3 hours ago', action: undefined, unread: false,
  },
];

const yesterdayNotifs: NotifItem[] = [
  {
    id: 5, iconBg: 'bg-[#ecfdf5]',
    icon: <CheckCircle size={14} className="text-[#15803d]" />,
    title: 'Your profile is now 93% complete',
    desc: 'Complete your profile to get more relevant opp...',
    time: 'Yesterday, 4:37 PM', action: undefined, unread: true,
  },
  {
    id: 6, iconBg: 'bg-[#eff4ff]',
    icon: <FileText size={14} className="text-[#2f66c8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for t...',
    time: 'Yesterday, 11:15 AM', action: undefined, unread: false,
  },
];

const earlierNotifs: NotifItem[] = [
  {
    id: 7, iconBg: 'bg-[#eff4ff]',
    icon: <FileText size={14} className="text-[#2f66c8]" />,
    title: 'Welcome to Anchor Canada.',
    desc: "Thanks for joining! Let's help your find life...",
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
      'flex items-start gap-3 px-0 py-3 border-b border-[#eef2f8] last:border-0',
      notif.unread && 'bg-[#fafbff] -mx-4 px-4'
    )}>
      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5', notif.iconBg)}>
        {notif.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[#0f172a] text-xs font-medium truncate">{notif.title}</p>
          {notif.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#2f66c8] shrink-0" />}
        </div>
        <p className="text-[#44516a] text-xs mt-0.5 truncate">{notif.desc}</p>
        <p className="text-[#8c97ad] text-xs mt-1">{notif.time}</p>
      </div>
    </div>
  );
}

export default function MobileView() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div>
        <h1 className="font-['Instrument_Serif'] text-[28px] leading-[1.2] text-[#0f172a]">Notifications</h1>
        <p className="text-[#44516a] text-sm mt-1">Stay updated on your opportunities and progress.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Bell size={12} className="text-[#44516a]" />
          <span className="text-[#44516a] text-xs">8 unread updates</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TriangleAlert size={12} className="text-[#ef4444]" />
          <span className="text-[#ef4444] text-xs font-medium">3 need attention today</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-3 py-1.5 rounded-[6px] text-xs font-medium whitespace-nowrap transition-colors',
              activeTab === tab ? 'bg-[#2f66c8] text-white' : 'text-[#44516a] border border-[#d9e1ef] bg-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 border border-[#d9e1ef] rounded-[6px] px-3 py-2 text-xs text-[#44516a] bg-white">
          <CheckCheck size={12} />
          Mark all as read
        </button>
        <button className="flex items-center justify-center gap-1.5 border border-[#d9e1ef] rounded-[6px] px-3 py-2 text-xs text-[#44516a] bg-white">
          <Settings size={12} />
          Settings
        </button>
      </div>

      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-[10px] p-4">
        <p className="text-[#b91c1c] font-semibold text-xs mb-3">Needs Your Attention</p>
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-[#eef2f8] rounded-[8px] p-3">
            <span className="text-[#b91c1c] text-xs font-semibold bg-[#fee2e2] px-2 py-0.5 rounded-[4px]">DEADLINE TOMORROW</span>
            <div className="flex items-start gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
                <Clock size={14} className="text-[#ea580c]" />
              </div>
              <div>
                <p className="text-[#0f172a] text-xs font-medium">UX Design Intern application...</p>
                <p className="text-[#44516a] text-xs mt-0.5">Shopify • Closes May 11, 2026 • 11:59 PM</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#eef2f8] rounded-[8px] p-3">
            <span className="text-[#7c3aed] text-xs font-semibold bg-[#f5f3ff] px-2 py-0.5 rounded-[4px]">INTERVIEW IN 2 DAYS</span>
            <div className="flex items-start gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0">
                <Bell size={14} className="text-[#2f66c8]" />
              </div>
              <div>
                <p className="text-[#0f172a] text-xs font-medium">Interview with Shopify in 2 da...</p>
                <p className="text-[#44516a] text-xs mt-0.5">May 12, 2026 • 10:00 AM EST • Virtual</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#eef2f8]">
          <p className="text-[#0f172a] font-medium text-xs">Today</p>
        </div>
        <div className="px-4">
          {todayNotifs.map((n) => <NotifRow key={n.id} notif={n} />)}
        </div>
      </div>

      <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#eef2f8]">
          <p className="text-[#0f172a] font-medium text-xs">Yesterday</p>
        </div>
        <div className="px-4">
          {yesterdayNotifs.map((n) => <NotifRow key={n.id} notif={n} />)}
        </div>
      </div>

      <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#eef2f8]">
          <p className="text-[#0f172a] font-medium text-xs">Earlier</p>
        </div>
        <div className="px-4">
          {earlierNotifs.map((n) => <NotifRow key={n.id} notif={n} />)}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={cn(
              'w-8 h-8 rounded-[6px] text-sm font-medium',
              page === 1 ? 'bg-[#2f66c8] text-white' : 'bg-white border border-[#d9e1ef] text-[#44516a]'
            )}
          >
            {page}
          </button>
        ))}
        <button className="flex items-center gap-1 px-2 py-1.5 border border-[#d9e1ef] rounded-[6px] text-xs text-[#44516a]">
          Next
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
        <h3 className="text-[#0f172a] font-medium text-sm mb-4">Notifications Summary</h3>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 80 80" className="w-16 h-16 -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#eef2f8" strokeWidth="10" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#2f66c8" strokeWidth="10"
                strokeDasharray="188.5" strokeDashoffset="0" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#10b981" strokeWidth="10"
                strokeDasharray="188.5" strokeDashoffset="117.8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#f59e0b" strokeWidth="10"
                strokeDasharray="188.5" strokeDashoffset="153.3" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[#0f172a] font-semibold text-base leading-none">32</span>
              <span className="text-[#8c97ad] text-xs">Total</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
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
        {[
          { icon: <CheckCheck size={14} className="text-[#2f66c8]" />, label: 'Mark all as read' },
          { icon: <Eye size={14} className="text-[#f59e0b]" />, label: 'View unread only' },
          { icon: <Settings size={14} className="text-[#8c97ad]" />, label: 'Notification Settings' },
        ].map((action) => (
          <button key={action.label} className="flex items-center justify-between py-3 border-b border-[#eef2f8] last:border-0 w-full">
            <div className="flex items-center gap-2">
              {action.icon}
              <span className="text-[#44516a] text-sm">{action.label}</span>
            </div>
            <ChevronRight size={14} className="text-[#8c97ad]" />
          </button>
        ))}
      </div>

      <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[10px] p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">💡</span>
          <h3 className="text-[#0f172a] font-medium text-sm">Tip of the Day</h3>
        </div>
        <p className="text-[#44516a] text-xs">Respond quickly to opportunities to increase your chances of success.</p>
        <div className="mt-3 flex justify-center">
          <div className="w-20 h-16 bg-[#fde68a]/30 rounded-lg flex items-center justify-center text-3xl">🎯</div>
        </div>
      </div>
    </div>
  );
}
