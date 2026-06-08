'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';
import {
  ChevronLeft, ChevronRight, Bookmark, Award, Briefcase,
  CheckCircle2, Circle, ArrowRight, Clock, Users, Calendar,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import type { StaticImageData } from 'next/image';
import ac1 from '@assets/images/w1.png';
import ac2 from '@assets/images/w1.png';
import ac3 from '@assets/images/w1.png';
import ac4 from '@assets/images/w1.png';

/* ─ Types  ─ */

interface OpportunityCard {
  id: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  company: string;
  location: string;
  closesIn: string;
  closesUrgent?: boolean;
  logo: StaticImageData;
}

/* ─ Mock data ── ─ */

const APP_STATS = [
  { label: 'Submitted',    value: 6,  dotColor: 'bg-[#2f66c8]',   urgent: false },
  { label: 'Under Review', value: 2,  dotColor: 'bg-amber-400',   urgent: false },
  { label: 'Shortlisted',  value: 1,  dotColor: 'bg-emerald-400', urgent: false },
  { label: 'Accepted',     value: 0,  dotColor: 'bg-[#D9E1EF]',   urgent: false },
] as const;

const OPPORTUNITIES: OpportunityCard[] = [
  {
    id: '1',
    badge: 'Internship',
    badgeBg: 'bg-[#eff4ff]',
    badgeText: 'text-[#2f66c8]',
    title: 'UX Design Intern',
    company: 'Shopify',
    location: 'Toronto, ON • Hybrid',
    closesIn: 'Closes in 12 days',
    logo: ac1,
  },
  {
    id: '2',
    badge: 'Grant',
    badgeBg: 'bg-[#d1fae5]',
    badgeText: 'text-[#15803d]',
    title: 'Youth Innovation Gr...',
    company: 'Government of Canada',
    location: 'Canada-wide • Remote',
    closesIn: 'Closes in 5 days',
    closesUrgent: true,
    logo: ac2,
  },
  {
    id: '3',
    badge: 'Job',
    badgeBg: 'bg-[#f4f1fe]',
    badgeText: 'text-[#7c3aed]',
    title: 'Marketing Coordina...',
    company: 'Technova Solutions',
    location: 'Vancouver, BC • On-site',
    closesIn: 'Closes in 16 days',
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

/* ─ Sub-components ─ ─ */

function OpportunityCardItem({ card }: { card: OpportunityCard }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex w-[248px] shrink-0 flex-col rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      {/* Top row */}
      <div className="mb-3 flex items-start justify-between">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${card.badgeBg} ${card.badgeText}`}>
          {card.badge}
        </span>
        <div className="h-9 w-9 overflow-hidden rounded-lg border border-[#EEF2F8] shrink-0">
          <Image src={card.logo} alt={card.company} width={36} height={36} className="h-full w-full object-contain" />
        </div>
      </div>
      {/* Body */}
      <p className="mb-0.5 text-sm font-semibold text-[#0F172A] leading-snug">{card.title}</p>
      <p className="mb-1 text-xs text-[#44516A]">{card.company}</p>
      <p className="mb-2 text-xs text-[#8C97AD]">{card.location}</p>
      <p className={`mb-3 flex items-center gap-1 text-xs font-medium ${card.closesUrgent ? 'text-red-500' : 'text-[#8C97AD]'}`}>
        <Clock className="h-3 w-3 shrink-0" />
        {card.closesIn}
      </p>
      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <button
          onClick={() => setSaved((v) => !v)}
          className="text-[#8C97AD] hover:text-[#2f66c8] transition-colors"
          aria-label="Bookmark"
        >
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-[#2f66c8] text-[#2f66c8]' : ''}`} />
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
}

function CircularProgress({ percent }: { percent: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg className="-rotate-90" width="112" height="112" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="#EEF2F8" strokeWidth="10" />
        <circle cx="56" cy="56" r={r} fill="none" stroke="#22C55E" strokeWidth="10" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-[#0F172A]">{percent}%</span>
        <span className="mt-0.5 rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[9px] font-semibold text-[#15803D]">
          Strong
        </span>
      </div>
    </div>
  );
}

/* ─ Main ── ─ */

export default function DashboardDesktopView() {
  const { user } = useAuthStore();
  const [cardOffset, setCardOffset] = useState(0);
  const firstName = user?.name?.split(' ')[0] ?? 'there';
  const maxOffset = Math.max(0, OPPORTUNITIES.length - 3);

  return (
    <div className="flex min-h-0 gap-6">

      {/* ── Left / Main  ─ */}
      <div className="flex min-w-0 flex-1 flex-col gap-5">

        {/* Greeting row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[28px] font-medium leading-none text-[#0F172A]">
              Good Morning,{' '}
              <em className="not-italic font-['Instrument_Serif'] italic text-[#2f66c8]">{firstName}</em>
              {' '}👋
            </h2>
            <p className="mt-2 text-sm text-[#44516A]">
              <Link href="/opportunities" className="font-medium text-[#2f66c8] hover:underline">
                12 new opportunities
              </Link>{' '}
              match your goals today.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2f66c8] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2558b0]"
          >
            Explore Opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Application Overview */}
        <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-[#0F172A]">Application Overview</h3>
            <Link href="/applications" className="flex items-center gap-1 text-sm font-medium text-[#2f66c8] hover:underline">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {/* Progress dots row */}
          <div className="mb-4 flex items-center gap-px">
            {APP_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`h-1.5 flex-1 ${i === 0 ? 'rounded-l-full' : ''} ${i === APP_STATS.length - 1 ? 'rounded-r-full' : ''} ${s.value > 0 ? s.dotColor : 'bg-[#EEF2F8]'}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {APP_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${s.value > 0 ? s.dotColor : 'bg-[#D9E1EF]'}`} />
                <span className="text-2xl font-bold text-[#0F172A]">{s.value}</span>
                <span className="text-center text-[11px] text-[#8C97AD]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities For You */}
        <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-[#0F172A]">Opportunities For You</h3>
            <Link href="/opportunities" className="flex items-center gap-1 text-sm font-medium text-[#2f66c8] hover:underline">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="relative flex items-center gap-2">
            {/* Cards */}
            <div className="flex flex-1 gap-3 overflow-hidden">
              {OPPORTUNITIES.slice(cardOffset, cardOffset + 3).map((card) => (
                <OpportunityCardItem key={card.id} card={card} />
              ))}
            </div>
            {/* Right arrow */}
            <button
              onClick={() => setCardOffset(Math.min(maxOffset, cardOffset + 1))}
              disabled={cardOffset >= maxOffset}
              className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#D9E1EF] bg-white text-[#44516A] shadow-sm transition hover:bg-[#F8FAFC] disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Saved + Community */}
        <div className="grid grid-cols-2 gap-4">
          {/* Saved Opportunities */}
          <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium text-[#0F172A]">Saved Opportunities</h3>
              <Link href="/saved" className="flex items-center gap-1 text-sm font-medium text-[#2f66c8] hover:underline">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mb-3 flex items-end gap-2">
              <span className="text-4xl font-bold text-[#0F172A]">14</span>
              <span className="mb-1 text-sm text-[#44516A]">Opportunities saved</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {SAVED_LOGOS.map((logo, i) => (
                <div key={i} className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <Image src={logo} alt="" width={32} height={32} className="h-full w-full object-contain" />
                </div>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#EFF4FF] shadow-sm">
                <span className="text-[10px] font-semibold text-[#2f66c8]">+10</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-[#8C97AD]">Your next opportunity is just a click away.</p>
          </div>

          {/* Community Insights */}
          <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium text-[#0F172A]">Community Insights</h3>
              <Link href="/opportunities" className="flex items-center gap-1 text-sm font-medium text-[#2f66c8] hover:underline">
                Explore All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="rounded-lg bg-[#F8FAFC] p-3">
              <p className="mb-1 text-[11px] font-semibold text-[#8C97AD]">Trending this week</p>
              <p className="mb-0.5 font-['Instrument_Serif'] text-xl text-[#0F172A]">Tech Internships</p>
              <p className="mb-3 text-xs text-[#44516A]">Most applied category</p>
              {/* Bar chart */}
              <div className="flex items-end gap-1 h-14">
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
      </div>

      {/* ── Right panel  ─ */}
      <div className="w-[280px] shrink-0 space-y-4">

        {/* Upcoming Deadlines */}
        <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-[#0F172A]">Upcoming Deadlines</h3>
            <Link href="/applications" className="flex items-center gap-1 text-sm font-medium text-[#2f66c8] hover:underline">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
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

        {/* Profile Strength */}
        <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-[#0F172A]">Profile Strength</h3>
            <button className="rounded-lg border border-[#D9E1EF] px-3 py-1 text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors">
              Complete
            </button>
          </div>
          <div className="mb-4 flex justify-center">
            <CircularProgress percent={78} />
          </div>
          <ul className="space-y-2.5">
            {PROFILE_CHECKS.map(({ label, done }) => (
              <li key={label} className="flex items-center gap-2.5">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#22C55E]" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-[#D9E1EF]" />
                )}
                <span className={`text-sm ${done ? 'text-[#0F172A]' : 'text-[#8C97AD]'}`}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
