'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell, Settings, TriangleAlert, CheckCheck, ChevronDown, ChevronRight,
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
  accentColor: string;
  title: string;
  desc: string;
  time: string;
  action?: string;
  actionStyle?: 'button' | 'link';
  unread: boolean;
};

const todayNotifs: NotifItem[] = [
  {
    id: 1, iconBg: 'bg-[#ECFDF5]', accentColor: 'bg-[#A2EBDB]',
    icon: <Star size={24} className="text-[#15803D]" />,
    title: "You've been shortlisted! 🎉",
    desc: "Great news! You've been shortlisted for the Product Design Intern position at Google",
    time: '2 mins ago', action: 'View Application', unread: true,
  },
  {
    id: 2, iconBg: 'bg-[#E8EFFE]', accentColor: 'bg-[#508EFA]',
    icon: <Eye size={24} className="text-[#2F66C8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for the Youth Innovation Grant',
    time: '45 mins ago', action: 'View Application', unread: true,
  },
  {
    id: 3, iconBg: 'bg-[#F3ECFE]', accentColor: 'bg-[#C4A6EF]',
    icon: <Sparkles size={24} className="text-[#7C3AED]" />,
    title: '4 new opportunities match your goals',
    desc: 'We found new opportunities that match your skills and interests.',
    time: '1 hour ago', action: 'Explore Matches', unread: true,
  },
  {
    id: 4, iconBg: 'bg-[#FFF5E5]', accentColor: 'bg-[#FADCAA]',
    icon: <Clock size={24} className="text-[#EA580C]" />,
    title: 'Deadline approaching',
    desc: 'Product Design Intern at Google closes in 5 days.',
    time: '3 hours ago', action: 'View Opportunity', unread: false,
  },
];

const yesterdayNotifs: NotifItem[] = [
  {
    id: 5, iconBg: 'bg-[#ECFDF5]', accentColor: 'bg-[#A2EBDB]',
    icon: <CheckCircle size={24} className="text-[#15803D]" />,
    title: 'Your profile is now 93% complete',
    desc: 'Complete your profile to get more relevant opportunities.',
    time: 'Yesterday, 4:30 PM', action: 'Complete Profile', actionStyle: 'button', unread: true,
  },
  {
    id: 6, iconBg: 'bg-[#E8EFFE]', accentColor: 'bg-[#508EFA]',
    icon: <FileText size={24} className="text-[#2F66C8]" />,
    title: 'Your application was viewed',
    desc: 'RBC Foundation viewed your application for the Youth Innovation Grant',
    time: 'Yesterday, 11:15 AM', action: 'View Message', unread: false,
  },
];

const earlierNotifs: NotifItem[] = [
  {
    id: 7, iconBg: 'bg-[#E8EFFE]', accentColor: 'bg-[#BCC0D7]',
    icon: <FileText size={24} className="text-[#2F66C8]" />,
    title: 'Welcome to Anchor Canada.',
    desc: "Thanks for joining! Let's help you find life-changing opportunities.",
    time: 'May 8, 2026', unread: false,
  },
];

const SUMMARY_ITEMS = [
  { label: '12 Applications', color: '#2F66C8' },
  { label: '6 Matches', color: '#22C55E' },
  { label: '5 Deadlines', color: '#F59E0B' },
  { label: '4 System', color: '#8B5CF6' },
  { label: '5 Saved', color: '#EF4444' },
];

const DONUT_SEGMENTS = [
  { color: '#2F66C8', offset: 0 },
  { color: '#22C55E', offset: 117.8 },
  { color: '#F59E0B', offset: 153.3 },
  { color: '#8B5CF6', offset: 177.6 },
  { color: '#EF4444', offset: 165 },
];

const QUICK_ACTIONS = [
  { icon: <CheckCheck size={18} className="text-[#2F66C8]" />, iconBg: 'bg-[#EFF4FF]', label: 'Mark all as read' },
  { icon: <Eye size={18} className="text-[#EA580C]" />, iconBg: 'bg-[#FEF4E0]', label: 'View unread only' },
];

function NotifRow({ notif }: { notif: NotifItem }) {
  return (
    <div className={cn(
      'flex items-start gap-5 px-5 py-5 border-b border-[#EEF2F8] last:border-0',
      notif.unread && 'bg-[#FAFBFF]',
    )}>
      <div className={cn('w-[60px] h-[60px] rounded-[10px] flex items-center justify-center shrink-0', notif.iconBg)}>
        {notif.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(textPrimary, 'text-base font-medium')}>{notif.title}</p>
        <p className={cn(textSecondary, 'text-xs mt-2')}>{notif.desc}</p>
      </div>
      <div className="flex items-center gap-5 shrink-0">
        <span className={cn(textTertiary, 'text-xs whitespace-nowrap')}>{notif.time}</span>
        {notif.action && (
          notif.actionStyle === 'button' ? (
            <button type="button" className={cn(bgBrand, 'text-white text-sm font-medium rounded-[6px] h-[45px] px-4 hover:bg-[#2454A4] transition-colors')}>
              {notif.action}
            </button>
          ) : (
            <button type="button" className={cn('bg-white border border-[#EEF2F8] rounded-[6px] h-[45px] px-4 text-sm font-medium hover:bg-[#F8FAFC] transition-colors', textBrand)}>
              {notif.action}
            </button>
          )
        )}
        {notif.unread && <div className="w-2.5 h-2.5 rounded-full bg-[#2F66C8] shrink-0" />}
      </div>
    </div>
  );
}

function NotifGroup({ label, items }: { label: string; items: NotifItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-[10px] w-px flex flex-col">
        {items.map((n) => (
          <div key={n.id} className={cn('w-full', n.accentColor, items.length === 1 ? 'h-[81px]' : 'h-[90px] first:h-[90px]')} />
        ))}
      </div>
      <div className={cn(card, 'overflow-hidden ml-0')}>
        <div className="px-5 py-2.5">
          <p className={cn(textPrimary, 'font-medium text-base')}>{label}</p>
        </div>
        {items.map((n) => <NotifRow key={n.id} notif={n} />)}
      </div>
    </div>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          title="Notifications"
          subtitle="Stay updated on your opportunities and progress."
        />
        <div className="flex items-center gap-3 mt-2 shrink-0">
          <button type="button" className="flex items-center gap-2 border border-[#D9E1EF] rounded-[6px] px-4 py-2 text-sm font-medium text-[#0F172A] bg-white hover:bg-[#F8FAFC]">
            <CheckCheck size={18} />
            Mark all as read
          </button>
          <Link href="/settings" className="flex items-center gap-2 border border-[#D9E1EF] rounded-[6px] px-4 py-2 text-sm font-medium text-[#0F172A] bg-white hover:bg-[#F8FAFC]">
            <Settings size={18} />
            Settings
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className={textSecondary} />
          <span className={cn(textSecondary, 'text-sm')}>8 unread updates</span>
        </div>
        <div className="flex items-center gap-2">
          <TriangleAlert size={18} className="text-[#EF4444]" />
          <span className="text-[#EF4444] text-sm font-medium">3 need attention today</span>
        </div>
      </div>

      <div className="flex gap-5 items-start">
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {TABS.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-[6px] text-sm font-medium whitespace-nowrap transition-colors',
                    activeTab === tab.label ? cn(bgBrand, 'text-white') : cn(textSecondary, 'hover:bg-[#F8FAFC]'),
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
            <div className="flex items-center gap-2 shrink-0">
              <span className={cn(textSecondary, 'text-sm')}>Sort by</span>
              <button type="button" className="border border-[#D9E1EF] rounded-[6px] flex items-center gap-2 px-3 py-2 text-sm text-[#0F172A] bg-white">
                Most Recent
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[10px] p-5">
            <p className="text-[#B91C1C] font-medium text-lg mb-4">Needs Your Attention</p>
            <div className="grid grid-cols-2 gap-4">
              <div className={cn(card, 'p-4')}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#B91C1C] text-xs font-medium bg-[#FEE2E2] px-2 py-1 rounded-[4px]">DEADLINE TOMORROW</span>
                  <button type="button" className={cn(textBrand, 'text-xs font-semibold hover:underline')}>View Opportunity</button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-[#FFF7ED] flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#EA580C]" />
                  </div>
                  <div>
                    <p className={cn(textPrimary, 'text-sm font-medium')}>UX Design Intern application closes tomorrow</p>
                    <p className={cn(textSecondary, 'text-xs mt-0.5')}>Shopify ✓ • Closes May 11, 2026 • 11:59 PM EST</p>
                  </div>
                </div>
              </div>
              <div className={cn(card, 'p-4')}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#7C3AED] text-xs font-medium bg-[#F5F3FF] px-2 py-1 rounded-[4px]">INTERVIEW IN 2 DAYS</span>
                  <button type="button" className={cn(textBrand, 'text-xs font-semibold hover:underline')}>View Details</button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center shrink-0">
                    <Bell size={16} className="text-[#2F66C8]" />
                  </div>
                  <div>
                    <p className={cn(textPrimary, 'text-sm font-medium')}>Interview with Shopify in 2 days</p>
                    <p className={cn(textSecondary, 'text-xs mt-0.5')}>May 12, 2026 • 10:00 AM EST • Virtual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NotifGroup label="Today" items={todayNotifs} />
          <NotifGroup label="Yesterday" items={yesterdayNotifs} />
          <NotifGroup label="Earlier" items={earlierNotifs} />

          <div className="flex items-center justify-between">
            <p className={cn(textTertiary, 'text-sm')}>Showing 1 to 10 of 32 notifications</p>
            <div className="flex items-center gap-5">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={cn(
                    'rounded-[6px] text-base font-medium px-6 py-4 transition-colors',
                    page === 1 ? cn(bgBrand, 'text-white') : 'bg-white border border-[#D9E1EF] text-[#0F172A] hover:bg-[#F8FAFC]',
                  )}
                >
                  {page}
                </button>
              ))}
              <button type="button" className="flex items-center gap-2.5 px-6 py-4 border border-[#D9E1EF] rounded-[6px] text-base font-medium text-[#2F66C8] hover:bg-[#F8FAFC]">
                Next
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-[368px] flex flex-col gap-5 shrink-0">
          <div className={cn(card, 'p-5')}>
            <h3 className="font-instrument-serif text-[28px] leading-[56px] text-[#0F172A] mb-[26px]">Notifications Summary</h3>
            <div className="flex items-center gap-[26px]">
              <DonutChart total={32} segments={DONUT_SEGMENTS} />
              <div className="flex flex-col gap-2.5 flex-1">
                {SUMMARY_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-center gap-5">
                    <div className="w-[18px] h-[18px] rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className={cn(textPrimary, 'text-sm')}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn(card, 'overflow-hidden')}>
            <div className="p-5 flex flex-col gap-3.5">
              <h3 className="font-instrument-serif text-[28px] leading-[56px] text-[#0F172A]">Quick Actions</h3>
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="flex items-center justify-between py-2.5 hover:bg-[#F8FAFC] -mx-5 px-5 transition-colors w-[calc(100%+40px)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={cn('w-8 h-8 rounded-[5px] flex items-center justify-center shrink-0', action.iconBg)}>
                      {action.icon}
                    </div>
                    <span className={cn(textPrimary, 'text-sm font-medium')}>{action.label}</span>
                  </div>
                  <ChevronRight size={18} className={textTertiary} />
                </button>
              ))}
            </div>
            <Link
              href="/settings"
              className="flex items-center justify-between px-5 py-5 border-t border-[#EEF2F8] hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Settings size={18} className="text-[#2F66C8]" />
                <span className={cn(textBrand, 'text-sm font-medium')}>Notification Settings</span>
              </div>
              <ChevronRight size={16} className={textTertiary} />
            </Link>
          </div>

          <TipOfDayCard illustration={tipIllustration} />
        </div>
      </div>
    </div>
  );
}
