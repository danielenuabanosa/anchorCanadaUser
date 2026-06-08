'use client';

import type { StaticImageData } from 'next/image';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Award,
  Briefcase,
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ac1 from '@assets/images/ac1.png';
import ac2 from '@assets/images/ac2.png';
import ac3 from '@assets/images/ac3.png';
import ac4 from '@assets/images/ac4.png';

/* ─ Types  ─ */

interface OpportunityCard {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  company: string;
  location: string;
  closesIn: string;
  closesUrgent?: boolean;
  logo: StaticImageData;
}

/* ─ Mock data ── ─ */

const APP_STATS = [
  { label: 'Submitted',    value: 6,  color: 'bg-[#2f66c8]'  },
  { label: 'Under Review', value: 2,  color: 'bg-amber-400'  },
  { label: 'Shortlisted',  value: 1,  color: 'bg-emerald-400' },
  { label: 'Accepted',     value: 0,  color: 'bg-neutral-300' },
] as const;

const OPPORTUNITIES: OpportunityCard[] = [
  {
    id:           '1',
    badge:        'Internship',
    badgeColor:   'bg-blue-100 text-blue-700',
    title:        'UX Design Intern',
    company:      'Shopify',
    location:     'Toronto, ON • Hybrid',
    closesIn:     'Closes in 12 days',
    logo:         ac1,
  },
  {
    id:           '2',
    badge:        'Grant',
    badgeColor:   'bg-emerald-100 text-emerald-700',
    title:        'Youth Innovation Gr...',
    company:      'Government of Canada',
    location:     'Canada-wide • Remote',
    closesIn:     'Closes in 5 days',
    closesUrgent: true,
    logo:         ac2,
  },
  {
    id:           '3',
    badge:        'Job',
    badgeColor:   'bg-purple-100 text-purple-700',
    title:        'Marketing Coordina...',
    company:      'Technova Solutions',
    location:     'Vancouver, BC • On-site',
    closesIn:     'Closes in 16 days',
    logo:         ac3,
  },
];

const DEADLINES: { label: string; days: number; icon: React.ElementType }[] = [
  { label: 'Startup Grant Program',       days: 2, icon: Bookmark  },
  { label: 'Community Impact Award',      days: 5, icon: Award     },
  { label: 'Research Assistant Position', days: 7, icon: Briefcase },
];

const PROFILE_CHECKS = [
  { label: 'Personal Information', done: true  },
  { label: 'Interests & Goals',    done: true  },
  { label: 'Location Preference',  done: true  },
  { label: 'Skills & Expertise',   done: true  },
  { label: 'Resume / CV',          done: false },
] as const;

/* ─ Sub-components ─ ─ */

function OpportunityCardItem({ card }: { card: OpportunityCard }) {
  return (
    <div className="flex w-64 shrink-0 flex-col rounded-2xl border border-[#D9E1EF] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${card.badgeColor}`}>
          {card.badge}
        </span>
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[#EEF2F8]">
          <Image
            src={card.logo}
            alt={card.company}
            width={36}
            height={36}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <p className="mb-0.5 text-sm font-semibold text-[#0F172A] leading-snug">{card.title}</p>
      <p className="mb-1 text-xs text-[#44516A]">{card.company}</p>
      <p className="mb-2 text-xs text-[#8C97AD]">{card.location}</p>
      <p className={`mb-3 text-xs font-medium ${card.closesUrgent ? 'text-red-500' : 'text-[#44516A]'}`}>
        {card.closesIn}
      </p>
      <button className="mt-auto w-full rounded-lg bg-[#2f66c8] py-1.5 text-xs font-semibold text-white transition hover:bg-[#2558b0]">
        Apply
      </button>
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
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="#2f66c8"
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-bold text-[#0F172A]">{percent}%</span>
        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">Strong</span>
      </div>
    </div>
  );
}

/* ─ Main component ─ ─ */

export function DashboardContent() {
  const { user } = useAuthStore();
  const [cardOffset, setCardOffset] = useState(0);
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const maxOffset = Math.max(0, OPPORTUNITIES.length - 2);

  if (!user) return null;

  return (
    <div className="flex min-h-0 gap-6">

      {/* ── Left / Main  ─ */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">

        {/* Greeting row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-[#0F172A]">
              Good Morning,{' '}
              <em className={`not-italic font-['Instrument_Serif'] italic text-[#2f66c8]`}>{firstName}</em>
              {' '}👋
            </h2>
            <p className="mt-1 text-sm text-[#44516A]">
              <Link href="/opportunities" className="font-medium text-[#2f66c8] hover:underline">
                12 new opportunities
              </Link>{' '}
              match your goals today.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2f66c8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2558b0]"
          >
            Explore Opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Application overview */}
        <div className="rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Application Overview</h3>
            <Link href="/applications" className="text-sm font-medium text-[#2f66c8] hover:underline">
              View All →
            </Link>
          </div>

          {/* Progress dots */}
          <div className="mb-4 flex items-center gap-0">
            {APP_STATS.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <div className={`h-2 flex-1 ${i === 0 ? 'rounded-l-full' : ''} ${i === APP_STATS.length - 1 ? 'rounded-r-full' : ''} ${s.value > 0 ? s.color : 'bg-[#EEF2F8]'}`} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {APP_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className={`h-3 w-3 rounded-full ${s.value > 0 ? s.color : 'bg-neutral-200'}`} />
                <span className="text-2xl font-bold text-[#0F172A]">{s.value}</span>
                <span className="text-center text-[11px] text-[#8C97AD]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities for you */}
        <div className="rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Opportunities For You</h3>
            <Link href="/opportunities" className="text-sm font-medium text-[#2f66c8] hover:underline">
              View All →
            </Link>
          </div>

          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setCardOffset(Math.max(0, cardOffset - 1))}
              disabled={cardOffset === 0}
              className="shrink-0 rounded-full border border-[#D9E1EF] bg-white p-1.5 text-[#44516A] shadow-sm transition hover:bg-[#F8FAFC] disabled:opacity-30"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex flex-1 gap-3 overflow-hidden">
              {OPPORTUNITIES.slice(cardOffset, cardOffset + 2).map((card) => (
                <OpportunityCardItem key={card.id} card={card} />
              ))}
            </div>

            <button
              onClick={() => setCardOffset(Math.min(maxOffset, cardOffset + 1))}
              disabled={cardOffset >= maxOffset}
              className="shrink-0 rounded-full border border-[#D9E1EF] bg-white p-1.5 text-[#44516A] shadow-sm transition hover:bg-[#F8FAFC] disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Saved + Community row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Saved opportunities */}
          <div className="rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#0F172A]">Saved Opportunities</h3>
              <Link href="/saved" className="text-sm font-medium text-[#2f66c8] hover:underline">
                View All →
              </Link>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-4xl font-bold text-[#0F172A]">14</span>
              <span className="mb-1 text-sm text-[#44516A]">Opportunities saved</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[ac1, ac2, ac3, ac4].map((logo, i) => (
                <div key={i} className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <Image src={logo} alt="" width={32} height={32} className="h-full w-full object-contain" />
                </div>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#EFF4FF] shadow-sm">
                <span className="text-[10px] font-semibold text-[#2f66c8]">+10</span>
              </div>
            </div>
          </div>

          {/* Community insights */}
          <div className="rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#0F172A]">Community Insights</h3>
            </div>
            <p className="mb-3 text-xs text-[#44516A]">
              <span className="font-semibold text-[#0F172A]">Trending this week:</span>{' '}
              Tech Internships
            </p>
            <p className="mb-3 text-xs text-[#8C97AD]">Most applied category</p>
            {/* Simple bar chart */}
            <div className="flex items-end gap-2 h-14">
              {[40, 65, 30, 80, 50, 70, 45].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-sm ${i === 3 ? 'bg-[#2f66c8]' : 'bg-[#EEF2F8]'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel  ─ */}
      <div className="w-80 shrink-0 space-y-4">

        {/* Upcoming deadlines */}
        <div className="rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Upcoming Deadlines</h3>
            <Link href="/applications" className="text-sm font-medium text-[#2f66c8] hover:underline">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {DEADLINES.map(({ label, days, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC] px-3 py-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF4FF]">
                  <Icon className="h-4 w-4 text-[#2f66c8]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[#0F172A]">{label}</p>
                  <p className={`text-[11px] ${days <= 2 ? 'font-semibold text-red-500' : 'text-[#8C97AD]'}`}>
                    Closes in {days} day{days !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile strength */}
        <div className="rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Profile Strength</h3>
            <button className="rounded-lg bg-[#2f66c8] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#2558b0]">
              Complete
            </button>
          </div>

          <div className="mb-4 flex justify-center">
            <CircularProgress percent={78} />
          </div>

          <ul className="space-y-2">
            {PROFILE_CHECKS.map(({ label, done }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-[#D9E1EF]" />
                )}
                <span className={done ? 'text-[#0F172A]' : 'text-[#8C97AD]'}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
