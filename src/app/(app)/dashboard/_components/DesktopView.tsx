'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';
import {
  ChevronRight, Bookmark, Award, Briefcase,
  Check, Circle, ArrowRight, Clock, Zap, Info,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import type { StaticImageData } from 'next/image';
import ac1 from '@assets/images/w1.png';
import ac2 from '@assets/images/w1.png';
import ac3 from '@assets/images/w1.png';
import ac4 from '@assets/images/w1.png';
import sidebarBgImg from '@assets/images/sidebar_bg.png';

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

const APP_STATS = [
  { label: 'Submitted',    value: 6,  dotColor: 'bg-[#2F66C8]',   barColor: 'bg-[#2F66C8]' },
  { label: 'Under Review', value: 2,  dotColor: 'bg-amber-400',   barColor: 'bg-amber-400' },
  { label: 'Shortlisted',  value: 1,  dotColor: 'bg-[#0F172A]',   barColor: 'bg-[#0F172A]' },
  { label: 'Accepted',     value: 0,  dotColor: 'bg-[#D9E1EF]',   barColor: 'bg-[#EEF2F8]' },
] as const;

const OPPORTUNITIES: OpportunityCard[] = [
  {
    id: '1',
    badge: 'Internship',
    badgeBg: 'bg-[#EBF1FE]',
    badgeText: 'text-[#0C25FC]',
    title: 'UX Design Intern',
    company: 'Shopify',
    location: 'Toronto, ON • Hybrid',
    closesIn: 'Closes in 12 days',
    logo: ac1,
  },
  {
    id: '2',
    badge: 'Grant',
    badgeBg: 'bg-[#D1FAE5]',
    badgeText: 'text-[#15803D]',
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
    badgeBg: 'bg-[#F4F1FE]',
    badgeText: 'text-[#7C3AED]',
    title: 'Marketing Coordina...',
    company: 'Technova Solutions',
    location: 'Vancouver, BC • On-site',
    closesIn: 'Closes in 16 days',
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
] as const;

const SAVED_LOGOS = [ac1, ac2, ac3, ac4];

function OpportunityCardItem({ card }: { card: OpportunityCard }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex w-[248px] shrink-0 flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-semibold ${card.badgeBg} ${card.badgeText}`}>
            {card.badge}
          </span>
          <p className="mt-3.5 truncate text-base font-medium text-[#0F172A]">{card.title}</p>
        </div>
        <div className="h-10 w-10 shrink-0 overflow-hidden">
          <Image src={card.logo} alt={card.company} width={40} height={40} className="h-full w-full object-contain" />
        </div>
      </div>
      <p className="mb-1.5 text-sm text-[#44516A]">{card.company}</p>
      <p className="mb-4 text-sm text-[#44516A]">{card.location}</p>
      <p className={`mb-5 flex items-center gap-1.5 text-xs ${card.closesUrgent ? 'font-medium text-[#B91C1C]' : 'text-[#8C97AD]'}`}>
        <Clock className="h-3.5 w-3.5 shrink-0" />
        {card.closesIn}
      </p>
      <div className="mt-auto flex items-center gap-3">
        <button
          onClick={() => setSaved((v) => !v)}
          className="text-[#8C97AD] transition-colors hover:text-[#2F66C8]"
          aria-label="Bookmark"
        >
          <Bookmark className={`h-[18px] w-[18px] ${saved ? 'fill-[#2F66C8] text-[#2F66C8]' : ''}`} />
        </button>
        <Link
          href={`/opportunities/${card.id}`}
          className="flex-1 rounded-md border border-[#2F66C8] py-2 text-center text-sm font-medium text-[#2F66C8] transition hover:bg-[#EFF4FF]"
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
    <div className="relative flex h-[100px] w-[100px] items-center justify-center shrink-0">
      <svg className="-rotate-90" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#EEF2F8" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#22C55E"
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-[#0F172A]">{percent}%</span>
    </div>
  );
}

export default function DashboardDesktopView() {
  const { user } = useAuthStore();
  const [cardOffset, setCardOffset] = useState(0);
  const firstName = user?.name?.split(' ')[0] ?? 'Jacob';
  const maxOffset = Math.max(0, OPPORTUNITIES.length - 3);

  return (
    <div className="flex min-h-0 gap-5">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        {/* Greeting */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h1 className="font-serif text-[48px] leading-[56px] text-[#0F172A]">Good Morning,</h1>
              <span className="font-serif text-[60px] italic leading-[56px] text-[#2F66C8]">
                {firstName} 👋
              </span>
            </div>
            <p className="mt-1 text-base text-[#44516A]">
              <Link href="/opportunities" className="font-normal text-[#2F66C8] hover:underline">
                12 new opportunities
              </Link>{' '}
              match your goals today.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2.5 rounded-md bg-[#2F66C8] px-6 py-4 text-base text-white transition hover:bg-[#2558B0]"
          >
            Explore Opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Application Overview */}
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#0F172A]">Application Overview</h3>
            <Link href="/applications" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline">
              View All <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
          <div className="mb-5 flex items-center gap-px">
            {APP_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`h-1.5 flex-1 ${i === 0 ? 'rounded-l-full' : ''} ${i === APP_STATS.length - 1 ? 'rounded-r-full' : ''} ${s.value > 0 ? s.barColor : 'bg-[#EEF2F8]'}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {APP_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${s.value > 0 ? s.dotColor : 'bg-[#D9E1EF]'}`} />
                <span className="text-2xl font-bold text-[#0F172A]">{s.value}</span>
                <span className="text-center text-xs text-[#8C97AD]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities For You */}
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#0F172A]">Opportunities For You</h3>
            <Link href="/opportunities" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline">
              View All <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
          <div className="relative flex items-center gap-2">
            <div className="flex flex-1 gap-2.5 overflow-hidden">
              {OPPORTUNITIES.slice(cardOffset, cardOffset + 3).map((card) => (
                <OpportunityCardItem key={card.id} card={card} />
              ))}
            </div>
            <button
              onClick={() => setCardOffset(Math.min(maxOffset, cardOffset + 1))}
              disabled={cardOffset >= maxOffset}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9E1EF] bg-white text-[#44516A] shadow-sm transition hover:bg-[#F8FAFC] disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Saved + Community */}
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#0F172A]">Saved Opportunities</h3>
              <Link href="/saved" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline">
                View All <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
            <div className="mb-4 flex items-end gap-2">
              <span className="font-serif text-[48px] leading-none text-[#0F172A]">14</span>
              <span className="mb-1 text-sm text-[#44516A]">Opportunities saved</span>
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              {SAVED_LOGOS.map((logo, i) => (
                <div key={i} className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <Image src={logo} alt="" width={32} height={32} className="h-full w-full object-contain" />
                </div>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#EFF4FF] shadow-sm">
                <span className="text-[10px] font-semibold text-[#2F66C8]">+10</span>
              </div>
            </div>
            <p className="text-xs text-[#8C97AD]">Your next opportunity is just a click away.</p>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#0F172A]">Community Insights</h3>
              <Link href="/opportunities" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline">
                Explore All <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-[10px] bg-[#F4F1FE] p-5">
              <span className="mb-2 inline-flex rounded bg-[#EDE9FE] px-2 py-1 text-[10px] font-semibold text-[#7C3AED]">
                Trending this week
              </span>
              <p className="font-serif text-[28px] leading-tight text-[#0F172A]">Tech Internships</p>
              <p className="mb-4 text-sm text-[#44516A]">Most applied category</p>
              <div className="flex h-14 items-end gap-1">
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
      </div>

      {/* Right panel */}
      <div className="hidden w-[368px] shrink-0 space-y-5 xl:block">
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#0F172A]">Upcoming Deadlines</h3>
            <Link href="/applications" className="flex items-center gap-3 text-sm font-medium text-[#2F66C8] hover:underline">
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

        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-[#0F172A]">Profile Strength</h3>
              <Info className="h-4 w-4 text-[#8C97AD]" />
            </div>
            <Link
              href="/profile"
              className="rounded-md border border-[#D9E1EF] px-4 py-2 text-sm font-medium text-[#2F66C8] transition hover:bg-[#F8FAFC]"
            >
              Complete
            </Link>
          </div>
          <div className="mb-5 flex items-center gap-5">
            <CircularProgress percent={78} />
            <span className="inline-flex items-center gap-1.5 rounded bg-[#D1FAE5] px-1.5 py-1 text-xs text-[#15803D]">
              <Zap className="h-3 w-3" />
              Strong
            </span>
          </div>
          <ul className="space-y-4">
            {PROFILE_CHECKS.map(({ label, done }) => (
              <li key={label} className="flex items-center gap-5">
                {done ? (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-[#22C55E]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <Circle className="h-6 w-6 shrink-0 text-[#D9E1EF]" />
                )}
                <span className={`text-base ${done ? 'text-[#0F172A]' : 'text-[#8C97AD]'}`}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
