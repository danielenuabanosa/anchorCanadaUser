'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  Bookmark, Award, Briefcase,
  CheckCircle2, Circle, ArrowRight, Clock,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ac1 from '@assets/images/w1.png';
import ac2 from '@assets/images/w1.png';
import ac3 from '@assets/images/w1.png';
import ac4 from '@assets/images/w1.png';

/* ─ Mock data ── ─ */

const APP_STATS = [
  { label: 'Submitted',    value: 6,  dotColor: 'bg-[#2f66c8]' },
  { label: 'Under Review', value: 2,  dotColor: 'bg-amber-400' },
  { label: 'Shortlisted',  value: 1,  dotColor: 'bg-emerald-400' },
  { label: 'Accepted',     value: 0,  dotColor: 'bg-[#D9E1EF]' },
] as const;

const OPPORTUNITIES = [
  {
    id: '1',
    badge: 'Internship',
    badgeBg: 'bg-[#eff4ff]',
    badgeText: 'text-[#2f66c8]',
    title: 'UX Design Intern',
    company: 'Shopify',
    location: 'Toronto, ON • Hybrid',
    match: '86% Match',
    closesIn: 'Closes in 12 days',
    closesUrgent: false,
    logo: ac1,
  },
  {
    id: '2',
    badge: 'Grant',
    badgeBg: 'bg-[#d1fae5]',
    badgeText: 'text-[#15803d]',
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
    badgeBg: 'bg-[#f4f1fe]',
    badgeText: 'text-[#7c3aed]',
    title: 'Marketing Coordinator',
    company: 'Technova Solutions',
    location: 'Vancouver, BC • On-site',
    match: '79% Match',
    closesIn: 'Closes in 16 days',
    closesUrgent: false,
    logo: ac3,
  },
];

const DEADLINES: { label: string; days: number; Icon: React.ElementType }[] = [
  { label: 'Startup Grant Program',       days: 2, Icon: Bookmark  },
  { label: 'Community Impact Award',      days: 5, Icon: Award     },
  { label: 'Research Assistant Position', days: 7, Icon: Briefcase },
];

const PROFILE_CHECKS = [
  { label: 'Personal Information', done: true  },
  { label: 'Interests & Goals',    done: true  },
  { label: 'Location Preference',  done: true  },
  { label: 'Skills & Expertise',   done: true  },
  { label: 'Resume / CV',          done: false },
] as const;

const SAVED_LOGOS = [ac1, ac2, ac3, ac4];

/* ─ Circular progress  ─ */

function CircularProgress({ percent }: { percent: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="relative flex h-[88px] w-[88px] items-center justify-center">
      <svg className="-rotate-90" width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#EEF2F8" strokeWidth="8" />
        <circle cx="44" cy="44" r={r} fill="none" stroke="#22C55E" strokeWidth="8" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-[#0F172A]">{percent}%</span>
      </div>
    </div>
  );
}

/* ─ Main ── ─ */

export default function DashboardMobileView() {
  const { user } = useAuthStore();
  const [cardIndex, setCardIndex] = useState(0);
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="flex flex-col gap-4 pb-6 px-1">

      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-medium text-[#0F172A]">
          Good Morning,{' '}
          <em className="not-italic font-['Instrument_Serif'] italic text-[#2f66c8]">{firstName}</em>
          {' '}👋
        </h2>
        <p className="mt-1.5 text-sm text-[#44516A]">
          <Link href="/opportunities" className="font-medium text-[#2f66c8]">
            12 new opportunities
          </Link>{' '}
          match your goals today.
        </p>
      </div>

      {/* Explore button */}
      <Link
        href="/opportunities"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f66c8] py-3 text-sm font-medium text-white"
      >
        Explore Opportunities
        <ArrowRight className="h-4 w-4" />
      </Link>

      {/* Application Overview */}
      <div className="rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#0F172A]">Application Overview</h3>
          <Link href="/applications" className="flex items-center gap-1 text-xs font-medium text-[#2f66c8]">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {/* Progress bar */}
        <div className="mb-3 flex items-center gap-px">
          {APP_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`h-1.5 flex-1 ${i === 0 ? 'rounded-l-full' : ''} ${i === APP_STATS.length - 1 ? 'rounded-r-full' : ''} ${s.value > 0 ? s.dotColor : 'bg-[#EEF2F8]'}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {APP_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${s.value > 0 ? s.dotColor : 'bg-[#D9E1EF]'}`} />
              <span className="text-xl font-bold text-[#0F172A]">{s.value}</span>
              <span className="text-center text-[10px] text-[#8C97AD] leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities For You */}
      <div className="rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#0F172A]">Opportunities For You</h3>
          <Link href="/opportunities" className="flex items-center gap-1 text-xs font-medium text-[#2f66c8]">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {/* Current card */}
        {(() => {
          const card = OPPORTUNITIES[cardIndex];
          return (
            <div className="rounded-xl border border-[#D9E1EF] p-4">
              <div className="mb-3 flex items-start justify-between">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${card.badgeBg} ${card.badgeText}`}>
                  {card.badge}
                </span>
                <div className="h-9 w-9 overflow-hidden rounded-lg border border-[#EEF2F8]">
                  <Image src={card.logo} alt={card.company} width={36} height={36} className="h-full w-full object-contain" />
                </div>
              </div>
              <p className="mb-0.5 text-xs font-semibold text-[#8C97AD]">{card.match}</p>
              <p className="mb-0.5 text-sm font-semibold text-[#0F172A]">{card.title}</p>
              <p className="mb-1 text-xs text-[#44516A]">{card.company}</p>
              <p className="mb-2 text-xs text-[#8C97AD]">{card.location}</p>
              <p className={`mb-3 flex items-center gap-1 text-xs font-medium ${card.closesUrgent ? 'text-red-500' : 'text-[#8C97AD]'}`}>
                <Clock className="h-3 w-3 shrink-0" />
                {card.closesIn}
              </p>
              <div className="flex items-center gap-2">
                <button className="text-[#8C97AD] hover:text-[#2f66c8]" aria-label="Save">
                  <Bookmark className="h-4 w-4" />
                </button>
                <Link
                  href={`/opportunities/${card.id}`}
                  className="flex-1 rounded-lg border border-[#D9E1EF] py-1.5 text-center text-xs font-semibold text-[#0F172A] hover:border-[#2f66c8] hover:text-[#2f66c8] transition-colors"
                >
                  Apply
                </Link>
              </div>
            </div>
          );
        })()}
        {/* Pagination dots */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {OPPORTUNITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCardIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === cardIndex ? 'w-4 bg-[#2f66c8]' : 'w-1.5 bg-[#D9E1EF]'}`}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Profile Strength */}
      <div className="rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#0F172A]">Profile Strength</h3>
          <button className="rounded-lg border border-[#D9E1EF] px-3 py-1 text-xs font-semibold text-[#0F172A]">
            Complete
          </button>
        </div>
        <div className="flex items-center gap-4">
          <CircularProgress percent={78} />
          <div className="flex items-center gap-2 flex-wrap">
            {PROFILE_CHECKS.map(({ label, done }) => (
              <div key={label} className={`h-7 w-7 flex items-center justify-center rounded-full ${done ? 'bg-[#22C55E]' : 'bg-[#EEF2F8]'}`}>
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-white" />
                ) : (
                  <Circle className="h-4 w-4 text-[#D9E1EF]" />
                )}
              </div>
            ))}
          </div>
        </div>
        <ul className="mt-3 space-y-2">
          {PROFILE_CHECKS.map(({ label, done }) => (
            <li key={label} className="flex items-center gap-2">
              {done ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#22C55E]" />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0 text-[#D9E1EF]" />
              )}
              <span className={`text-xs ${done ? 'text-[#0F172A]' : 'text-[#8C97AD]'}`}>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Deadlines */}
      <div className="rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#0F172A]">Upcoming Deadlines</h3>
          <Link href="/applications" className="flex items-center gap-1 text-xs font-medium text-[#2f66c8]">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2.5">
          {DEADLINES.map(({ label, days, Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC] px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF4FF]">
                <Icon className="h-4 w-4 text-[#2f66c8]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#0F172A]">{label}</p>
                <p className={`text-[11px] font-medium ${days <= 2 ? 'text-red-500' : 'text-[#8C97AD]'}`}>
                  Closes in {days} day{days !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Opportunities */}
      <div className="rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#0F172A]">Saved Opportunities</h3>
          <Link href="/saved" className="flex items-center gap-1 text-xs font-medium text-[#2f66c8]">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mb-2 flex items-end gap-2">
          <span className="text-3xl font-bold text-[#0F172A]">14</span>
          <span className="mb-0.5 text-sm text-[#44516A]">Opportunities saved</span>
        </div>
        <div className="flex items-center gap-1.5">
          {SAVED_LOGOS.map((logo, i) => (
            <div key={i} className="h-7 w-7 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image src={logo} alt="" width={28} height={28} className="h-full w-full object-contain" />
            </div>
          ))}
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#EFF4FF]">
            <span className="text-[9px] font-semibold text-[#2f66c8]">+10</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-[#8C97AD]">Your next opportunity is just a click away.</p>
      </div>

      {/* Community Insights */}
      <div className="rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#0F172A]">Community Insights</h3>
          <Link href="/opportunities" className="flex items-center gap-1 text-xs font-medium text-[#2f66c8]">
            Explore All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="rounded-lg bg-[#F8FAFC] p-3">
          <p className="mb-0.5 text-[10px] font-semibold text-[#8C97AD]">Trending this week</p>
          <p className="mb-0.5 font-['Instrument_Serif'] text-lg text-[#0F172A]">Tech Internships</p>
          <p className="mb-3 text-xs text-[#44516A]">Most applied category</p>
          <div className="flex items-end gap-1 h-12">
            {[30, 50, 40, 75, 55, 80, 45].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-sm ${i === 5 ? 'bg-[#2f66c8]' : 'bg-[#c7d5f0]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
