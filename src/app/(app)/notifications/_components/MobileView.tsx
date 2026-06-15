'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell, Settings, TriangleAlert, CheckCheck, ChevronRight,
  Star, Eye, Sparkles, Clock, CheckCircle, FileText, ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageTitle, DonutChart, TipOfDayCard, textPrimary, textSecondary, textTertiary, textBrand, card, bgBrand,
} from '@/shared/components/app/page-ui';
import tipIllustration from '@/../assets/images/notifications-tip.png';

const TABS = [
  { label: 'All', count: 32 },
  { label: 'Applications', count: 12 },
  { label: 'Matches', count: 8 },
  { label: 'Deadlines', count: 5 },
  { label: 'Unread', count: 8 },
];

type NotifItem = {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
};

const todayNotifs: NotifItem[] = [
  {
    id: 1, iconBg: 'bg-[#ECFDF5]',
    icon: <Star size={20} className="text-[#15803D]" />,
    title: "You've been shortlisted! 🎉",
    desc: "Great news! You've been shortlisted for the Pr...",
    time: '1 min ago', unread: true,
  },
  {
    id: 2, iconBg: 'bg-[#E8EFFE]',
    icon: <Eye size={20} className="text-[#2F66C8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for t...',
    time: '45 mins ago', unread: false,
  },
  {
    id: 3, iconBg: 'bg-[#F3ECFE]',
    icon: <Sparkles size={20} className="text-[#7C3AED]" />,
    title: '4 new opportunities match your...',
    desc: 'We found new opportunities that match...',
    time: '1 hour ago', unread: false,
  },
  {
    id: 4, iconBg: 'bg-[#FFF5E5]',
    icon: <Clock size={20} className="text-[#EA580C]" />,
    title: 'Deadline approaching',
    desc: 'Product Design Intern at Google closes in 5 d...',
    time: '3 hours ago', unread: false,
  },
];

const yesterdayNotifs: NotifItem[] = [
  {
    id: 5, iconBg: 'bg-[#ECFDF5]',
    icon: <CheckCircle size={20} className="text-[#15803D]" />,
    title: 'Your profile is now 93% complete',
    desc: 'Complete your profile to get more relevant opp...',
    time: 'Yesterday, 4:37 PM', unread: true,
  },
  {
    id: 6, iconBg: 'bg-[#E8EFFE]',
    icon: <FileText size={20} className="text-[#2F66C8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for t...',
    time: 'Yesterday, 11:15 AM', unread: false,
  },
];

const earlierNotifs: NotifItem[] = [
  {
    id: 7, iconBg: 'bg-[#E8EFFE]',
    icon: <FileText size={20} className="text-[#2F66C8]" />,
    title: 'Welcome to Anchor Canada.',
    desc: "Thanks for joining! Let's help you find life...",
    time: 'May 8, 2026', unread: false,
  },
];

const SUMMARY_ITEMS = [
  { label: '12 Applications', color: '#2F66C8' },
  { label: '8 Matches', color: '#22C55E' },
  { label: '5 Deadlines', color: '#F59E0B' },
  { label: '4 System', color: '#8B5CF6' },
  { label: '3 Saved', color: '#EF4444' },
];

const DONUT_SEGMENTS = [
  { color: '#2F66C8', offset: 0 },
  { color: '#22C55E', offset: 117.8 },
  { color: '#F59E0B', offset: 153.3 },
];

const QUICK_ACTIONS = [
  { icon: <CheckCheck size={18} className="text-[#2F66C8]" />, iconBg: 'bg-[#EFF4FF]', label: 'Mark all as read' },
  { icon: <Eye size={18} className="text-[#EA580C]" />, iconBg: 'bg-[#FEF4E0]', label: 'View unread only' },
];

function NotifRow({ notif }: { notif: NotifItem }) {
  return (
    <div className={cn(
      'flex items-start gap-3 py-4 border-b border-[#EEF2F8] last:border-0',
      notif.unread && 'bg-[#FAFBFF] -mx-4 px-4',
    )}>
      <div className={cn('w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0', notif.iconBg)}>
        {notif.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(textPrimary, 'text-sm font-medium leading-snug')}>{notif.title}</p>
          {notif.unread && <div className="w-2 h-2 rounded-full bg-[#2F66C8] shrink-0 mt-1" />}
        </div>
        <p className={cn(textSecondary, 'text-xs mt-1 line-clamp-1')}>{notif.desc}</p>
        <p className={cn(textTertiary, 'text-xs mt-1')}>{notif.time}</p>
      </div>
    </div>
  );
}

export default function MobileView() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageTitle
        title="Notifications"
        subtitle="Stay updated on your opportunities and progress."
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Bell size={14} className={textSecondary} />
          <span className={cn(textSecondary, 'text-xs')}>8 unread updates</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FEF2F2] px-2 py-1 rounded-[4px]">
          <TriangleAlert size={12} className="text-[#EF4444]" />
          <span className="text-[#EF4444] text-xs font-medium">3 need attention today</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(tab.label)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-[6px] text-xs font-medium whitespace-nowrap transition-colors',
              activeTab === tab.label
                ? cn(bgBrand, 'text-white')
                : cn(textSecondary, 'border border-[#D9E1EF] bg-white'),
            )}
          >
            {tab.label}
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full',
              activeTab === tab.label ? 'bg-white/20 text-white' : 'bg-[#EEF2F8] text-[#0F172A]',
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button type="button" className="flex-1 flex items-center justify-center gap-1.5 border border-[#D9E1EF] rounded-[6px] px-3 py-2.5 text-xs font-medium text-[#0F172A] bg-white">
          <CheckCheck size={14} />
          Mark all as read
        </button>
        <Link href="/settings" className="flex items-center justify-center gap-1.5 border border-[#D9E1EF] rounded-[6px] px-3 py-2.5 text-xs font-medium text-[#0F172A] bg-white">
          <Settings size={14} />
          Settings
        </Link>
      </div>

      <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[10px] p-4">
        <p className="text-[#B91C1C] font-medium text-sm mb-3">Needs Your Attention</p>
        <div className="flex flex-col gap-3">
          <div className={cn(card, 'p-3')}>
            <span className="text-[#B91C1C] text-xs font-medium bg-[#FEE2E2] px-2 py-0.5 rounded-[4px]">DEADLINE TOMORROW</span>
            <div className="flex items-start gap-2 mt-2">
              <div className="w-8 h-8 rounded-[10px] bg-[#FFF7ED] flex items-center justify-center shrink-0">
                <Clock size={14} className="text-[#EA580C]" />
              </div>
              <div>
                <p className={cn(textPrimary, 'text-xs font-medium')}>UX Design Intern application...</p>
                <p className={cn(textSecondary, 'text-xs mt-0.5')}>Shopify • Closes May 11, 2026 • 11:59 PM</p>
              </div>
            </div>
          </div>
          <div className={cn(card, 'p-3')}>
            <span className="text-[#7C3AED] text-xs font-medium bg-[#F5F3FF] px-2 py-0.5 rounded-[4px]">INTERVIEW IN 2 DAYS</span>
            <div className="flex items-start gap-2 mt-2">
              <div className="w-8 h-8 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center shrink-0">
                <Bell size={14} className="text-[#2F66C8]" />
              </div>
              <div>
                <p className={cn(textPrimary, 'text-xs font-medium')}>Interview with Shopify in 2 da...</p>
                <p className={cn(textSecondary, 'text-xs mt-0.5')}>May 12, 2026 • 10:00 AM EST • Virtual</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {[
        { label: 'Today', items: todayNotifs },
        { label: 'Yesterday', items: yesterdayNotifs },
        { label: 'Earlier', items: earlierNotifs },
      ].map((group) => (
        <div key={group.label} className={cn(card, 'overflow-hidden')}>
          <div className="px-4 py-3 border-b border-[#EEF2F8]">
            <p className={cn(textPrimary, 'font-medium text-sm')}>{group.label}</p>
          </div>
          <div className="px-4">
            {group.items.map((n) => <NotifRow key={n.id} notif={n} />)}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            type="button"
            className={cn(
              'w-8 h-8 rounded-[6px] text-sm font-medium',
              page === 1 ? cn(bgBrand, 'text-white') : 'bg-white border border-[#D9E1EF] text-[#44516A]',
            )}
          >
            {page}
          </button>
        ))}
        <button type="button" className="flex items-center gap-1 px-2 py-1.5 border border-[#D9E1EF] rounded-[6px] text-xs text-[#44516A]">
          Next
          <ArrowRight size={12} />
        </button>
      </div>

      <div className={cn(card, 'p-5')}>
        <h3 className="font-instrument-serif text-[28px] leading-[56px] text-[#0F172A] mb-4">Notifications Summary</h3>
        <div className="flex items-center gap-4">
          <DonutChart total={32} segments={DONUT_SEGMENTS} />
          <div className="flex flex-col gap-2 flex-1">
            {SUMMARY_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-[14px] h-[14px] rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className={cn(textPrimary, 'text-xs')}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(card, 'overflow-hidden')}>
        <div className="p-4 flex flex-col gap-3">
          <h3 className="font-instrument-serif text-xl text-[#0F172A]">Quick Actions</h3>
          {QUICK_ACTIONS.map((action) => (
            <button key={action.label} type="button" className="flex items-center justify-between w-full py-2">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-[5px] flex items-center justify-center', action.iconBg)}>
                  {action.icon}
                </div>
                <span className={cn(textPrimary, 'text-sm font-medium')}>{action.label}</span>
              </div>
              <ChevronRight size={14} className={textTertiary} />
            </button>
          ))}
        </div>
        <Link href="/settings" className="flex items-center justify-between px-4 py-4 border-t border-[#EEF2F8]">
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-[#2F66C8]" />
            <span className={cn(textBrand, 'text-sm font-medium')}>Notification Settings</span>
          </div>
          <ChevronRight size={14} className={textTertiary} />
        </Link>
      </div>

      <TipOfDayCard illustration={tipIllustration} />
    </div>
  );
}
