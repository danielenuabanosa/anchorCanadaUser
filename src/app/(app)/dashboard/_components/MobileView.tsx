'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  Bookmark, Award, Briefcase,
  Check, Circle, ArrowRight, Clock, Zap, Heart,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ac1 from '@assets/images/w1.png';
import ac2 from '@assets/images/w1.png';
import ac3 from '@assets/images/w1.png';
import ac4 from '@assets/images/w1.png';

const APP_STATS = [
  { label: 'Submitted',    value: 6,  dotColor: 'bg-[#2F66C8]' },
  { label: 'Under Review', value: 2,  dotColor: 'bg-amber-400' },
  { label: 'Shortlisted',  value: 1,  dotColor: 'bg-[#0F172A]' },
  { label: 'Accepted',     value: 0,  dotColor: 'bg-[#D9E1EF]' },
] as const;

const OPPORTUNITIES = [
  {
    id: '1',
    badge: 'Internship',
    badgeBg: 'bg-[#EBF1FE]',
    badgeText: 'text-[#0C25FC]',
    title: 'UX Design Intern',
    company: 'Shopify',
    location: 'Toronto, ON • Hybrid',
    match: '98% Match',
    closesIn: 'Closes in 12 days',
    closesUrgent: false,
    logo: ac1,
  },
  {
    id: '2',
    badge: 'Grant',
    badgeBg: 'bg-[#D1FAE5]',
    badgeText: 'text-[#15803D]',
    title: 'Youth Innovation Grant',
    company: 'Government of Canada',
    location: 'Canada-wide • Remote',
    match: '98% Match',
    closesIn: 'Closes in 5 days',
    closesUrgent: true,
    logo: ac2,
  },
  {
    id: '3',
    badge: 'Job',
    badgeBg: 'bg-[#F4F1FE]',
    badgeText: 'text-[#7C3AED]',
    title: 'Marketing Coordinator',
    company: 'Technova Solutions',
    location: 'Vancouver, BC • On-site',
    match: '79% Match',
    closesIn: 'Closes in 16 days',
    closesUrgent: false,
    logo: ac3,
  },
];

const DEADLINES: { label: string; days: number; iconBg: string; Icon: React.ElementType }[] = [
  { label: 'Startup Grant Program',       days: 2, iconBg: 'bg-[#D1FAE5]', Icon: Bookmark  },
  { label: 'Community Impact Award',      days: 5, iconBg: 'bg-[#FFEDD5]', Icon: Award     },
  { label: 'Research Assistant Position', days: 7, iconBg: 'bg-[#F4F1FE]', Icon: Briefcase },
];

const PROFILE_CHECKS = [
  { label: 'Personal Information', done: true  },
  { label: 'Interests & Goals',    done: true  },
  { label: 'Location Preference',  done: true  },
  { label: 'Skills & Expertise',   done: true  },
  { label: 'Resume / CV',          done: false },
  { label: 'References',           done: false },
] as const;

const SAVED_LOGOS = [ac1, ac2, ac3, ac4];

function CircularProgress({ percent }: { percent: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
      <svg className="-rotate-90" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#EEF2F8" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke="#22C55E" strokeWidth="6" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-[15px] font-bold text-[#0F172A]">{percent}%</span>
    </div>
  );
}

export default function DashboardMobileView() {
  const { user } = useAuthStore();
  const [cardIndex, setCardIndex] = useState(0);
  const firstName = user?.name?.split(' ')[0] ?? 'Jacob';

  const card = OPPORTUNITIES[cardIndex];

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Greeting */}
      <div>
        <div className="flex flex-wrap items-baseline gap-2.5">
          <h1 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">Good Morning,</h1>
          <span className="font-serif text-[36px] italic leading-[56px] text-[#2F66C8]">
            {firstName} 👋
          </span>
        </div>
        <p className="text-sm text-[#44516A]">
          <Link href="/opportunities" className="text-[#2F66C8] hover:underline">
            12 new opportunities
          </Link>{' '}
          match your goals today.
        </p>
      </div>

      <Link
        href="/opportunities"
        className="flex w-full items-center justify-center gap-2.5 rounded-md bg-[#2F66C8] px-6 py-4 text-sm text-white"
      >
        Explore Opportunities
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>

      {/* Application Overview */}
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Application Overview</h3>
          <Link href="/applications" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="mb-4 flex items-center gap-px">
          {APP_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`h-1.5 flex-1 ${i === 0 ? 'rounded-l-full' : ''} ${i === APP_STATS.length - 1 ? 'rounded-r-full' : ''} ${s.value > 0 ? s.dotColor : 'bg-[#EEF2F8]'}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {APP_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${s.value > 0 ? s.dotColor : 'bg-[#D9E1EF]'}`} />
              <span className="text-xl font-bold text-[#0F172A]">{s.value}</span>
              <span className="text-center text-[10px] leading-tight text-[#8C97AD]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities For You */}
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Opportunities For You</h3>
          <Link href="/opportunities" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="rounded-[10px] border border-[#EEF2F8] p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-semibold ${card.badgeBg} ${card.badgeText}`}>
                {card.badge}
              </span>
              <p className="mt-3.5 text-base font-medium text-[#0F172A]">{card.title}</p>
            </div>
            <div className="h-10 w-10 shrink-0 overflow-hidden">
              <Image src={card.logo} alt={card.company} width={40} height={40} className="h-full w-full object-contain" />
            </div>
          </div>
          <p className="mb-1 text-sm text-[#44516A]">{card.company}</p>
          <p className="mb-3 text-sm text-[#44516A]">{card.location}</p>
          <span className="mb-3 inline-flex rounded bg-[#D1FAE5] px-2 py-1 text-xs font-semibold text-[#15803D]">
            {card.match}
          </span>
          <p className={`mb-5 flex items-center gap-1.5 text-xs ${card.closesUrgent ? 'font-medium text-[#B91C1C]' : 'text-[#8C97AD]'}`}>
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {card.closesIn}
          </p>
          <div className="flex items-center gap-3">
            <button className="text-[#8C97AD]" aria-label="Save">
              <Bookmark className="h-[18px] w-[18px]" />
            </button>
            <Link
              href={`/opportunities/${card.id}`}
              className="flex-1 rounded-md border border-[#2F66C8] py-2 text-center text-sm font-medium text-[#2F66C8]"
            >
              Apply
            </Link>
            <button className="text-[#8C97AD]" aria-label="Like">
              <Heart className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {OPPORTUNITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCardIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === cardIndex ? 'w-4 bg-[#2F66C8]' : 'w-1.5 bg-[#D9E1EF]'}`}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Profile Strength */}
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Profile Strength</h3>
          <Link href="/profile" className="rounded-md border border-[#D9E1EF] px-4 py-2 text-sm font-medium text-[#2F66C8]">
            Complete
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <CircularProgress percent={78} />
            <span className="inline-flex items-center gap-1 rounded bg-[#D1FAE5] px-1.5 py-1 text-[8px] text-[#15803D]">
              <Zap className="h-2 w-2" />
              Strong
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between">
            {PROFILE_CHECKS.map(({ done }, i) => (
              <div key={i} className="flex items-center">
                {done ? (
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#22C55E]">
                    <Check className="h-2 w-2 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <Circle className="h-[18px] w-[18px] text-[#D9E1EF]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Upcoming Deadlines</h3>
          <Link href="/applications" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="space-y-3">
          {DEADLINES.map(({ label, days, iconBg, Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] px-3 py-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                <Icon className="h-4 w-4 text-[#2F66C8]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#0F172A]">{label}</p>
                <p className={`text-xs font-medium ${days <= 5 ? 'text-[#B91C1C]' : 'text-[#8C97AD]'}`}>
                  Closes in {days} day{days !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Opportunities */}
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Saved Opportunities</h3>
          <Link href="/saved" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            View All <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="mb-3 flex items-end gap-2">
          <span className="font-serif text-[36px] leading-none text-[#0F172A]">14</span>
          <span className="mb-0.5 text-sm text-[#44516A]">Opportunities saved</span>
        </div>
        <div className="mb-3 flex items-center gap-1.5">
          {SAVED_LOGOS.map((logo, i) => (
            <div key={i} className="h-7 w-7 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image src={logo} alt="" width={28} height={28} className="h-full w-full object-contain" />
            </div>
          ))}
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#EFF4FF]">
            <span className="text-[9px] font-semibold text-[#2F66C8]">+10</span>
          </div>
        </div>
        <p className="text-xs text-[#8C97AD]">Your next opportunity is just a click away.</p>
      </div>

      {/* Community Insights */}
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-[#0F172A]">Community Insights</h3>
          <Link href="/opportunities" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8]">
            Explore All <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-[10px] bg-[#F4F1FE] p-4">
          <span className="mb-2 inline-flex rounded bg-[#EDE9FE] px-2 py-1 text-[10px] font-semibold text-[#7C3AED]">
            Trending this week
          </span>
          <p className="font-serif text-xl text-[#0F172A]">Tech Internships</p>
          <p className="mb-3 text-xs text-[#44516A]">Most applied category</p>
          <div className="flex h-12 items-end gap-1">
            {[30, 50, 40, 75, 55, 80, 45].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-sm ${i === 5 ? 'bg-[#7C3AED]' : 'bg-[#C4B5FD]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
