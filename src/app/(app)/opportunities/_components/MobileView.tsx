'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, ChevronDown, Bookmark, CheckCircle2,
  SlidersHorizontal, X, MapPin, RotateCcw,
} from 'lucide-react';

type Category = 'all' | 'jobs' | 'grants' | 'housing' | 'training' | 'volunteer';

interface OpportunityItem {
  id: string;
  category: 'Internship' | 'Grant' | 'Job' | 'Volunteer' | 'Housing' | 'Training';
  title: string;
  company: string;
  verified: boolean;
  workMode: string;
  location: string;
  salary?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  postedDaysAgo: number;
  closesInDays: number;
  logoLetter: string;
  logoColor: string;
  logoImg?: string;
}

const CATEGORIES: { key: Category; label: string; count: number }[] = [
  { key: 'all',       label: 'All',       count: 1248 },
  { key: 'jobs',      label: 'Jobs',      count: 432  },
  { key: 'grants',    label: 'Grants',    count: 213  },
  { key: 'housing',   label: 'Housing',   count: 156  },
  { key: 'training',  label: 'Training',  count: 189  },
  { key: 'volunteer', label: 'Volunteer', count: 98   },
];

const MOCK_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: '1',
    category: 'Internship',
    title: 'UX Design Intern',
    company: 'Google',
    verified: true,
    workMode: 'Hybrid',
    location: 'Toronto, ON',
    salary: '$20 / hr',
    isNew: true,
    postedDaysAgo: 10,
    closesInDays: 12,
    logoLetter: 'G',
    logoColor: '#4285F4',
    logoImg: 'https://www.figma.com/api/mcp/asset/6c7719e0-e7b8-4abf-9b1f-5cc4aaedee81',
  },
  {
    id: '2',
    category: 'Grant',
    title: 'Youth Innovation Grant',
    company: 'RBC Foundation',
    verified: true,
    workMode: 'Remote',
    location: 'Canada-wide',
    salary: 'Up to $5,000',
    isNew: true,
    postedDaysAgo: 10,
    closesInDays: 5,
    logoLetter: 'R',
    logoColor: '#005DAA',
  },
  {
    id: '3',
    category: 'Volunteer',
    title: 'Community Support Volunteer',
    company: 'Canadian Red Cross',
    verified: true,
    workMode: 'On-site',
    location: 'Vancouver, BC',
    postedDaysAgo: 10,
    closesInDays: 18,
    logoLetter: 'C',
    logoColor: '#EE1C25',
  },
  {
    id: '4',
    category: 'Job',
    title: 'Program Coordinator',
    company: 'Canadian Red Cross',
    verified: true,
    workMode: 'On-site',
    location: 'Ottawa, ON',
    salary: '$55 – 65K',
    isFeatured: true,
    postedDaysAgo: 10,
    closesInDays: 73,
    logoLetter: 'A',
    logoColor: '#FF9900',
  },
];

const CATEGORY_BADGE: Record<string, string> = {
  Internship: 'bg-[#eff4ff] text-[#2f66c8]',
  Grant:      'bg-[#d1fae5] text-[#15803d]',
  Job:        'bg-[#f4f1fe] text-[#7c3aed]',
  Volunteer:  'bg-[#d1fae5] text-[#15803d]',
  Housing:    'bg-[#fff7ed] text-[#c2410c]',
  Training:   'bg-[#fdf4ff] text-[#9333ea]',
};

function CompanyLogo({ item }: { item: OpportunityItem }) {
  const [imgError, setImgError] = useState(false);
  if (item.logoImg && !imgError) {
    return (
      <img
        src={item.logoImg}
        alt={item.company}
        className="h-12 w-12 rounded-xl object-contain border border-[#EEF2F8] bg-white p-1 shrink-0"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div
      className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
      style={{ backgroundColor: item.logoColor }}
    >
      {item.logoLetter}
    </div>
  );
}

export default function OpportunitiesMobileView() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [savedBookmarks, setSavedBookmarks] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleBookmark = (id: string) => {
    setSavedBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const urgentClose = (days: number) => days <= 7;

  return (
    <div className="flex flex-col min-h-0 pb-20">

      {/* Category tabs */}
      <div className="mb-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
        {CATEGORIES.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === key
                ? 'bg-[#2f66c8] text-white'
                : 'bg-white text-[#44516A] border border-[#D9E1EF]'
            }`}
          >
            {label}
            {' '}
            <span className={`${activeCategory === key ? 'text-blue-200' : 'text-[#8C97AD]'}`}>
              {count.toLocaleString()}
            </span>
          </button>
        ))}
      </div>

      {/* Results header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-[#44516A]">
          <span className="font-semibold text-[#0F172A]">1,248</span> opportunities found
        </p>
        <button className="flex items-center gap-1 rounded-lg border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-xs font-medium text-[#0F172A]">
          Most Relevant
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Opportunity cards */}
      <div className="space-y-3">
        {MOCK_OPPORTUNITIES.map((opp) => (
          <div key={opp.id} className="rounded-xl border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
            {/* Category badge + bookmark */}
            <div className="mb-3 flex items-center justify-between">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_BADGE[opp.category]}`}>
                {opp.category}
              </span>
              <button
                onClick={() => toggleBookmark(opp.id)}
                className="text-[#8C97AD] hover:text-[#2f66c8] transition-colors"
                aria-label="Bookmark"
              >
                <Bookmark className={`h-4 w-4 ${savedBookmarks.has(opp.id) ? 'fill-[#2f66c8] text-[#2f66c8]' : ''}`} />
              </button>
            </div>

            {/* Logo + content */}
            <div className="flex items-start gap-3">
              <CompanyLogo item={opp} />
              <div className="flex-1 min-w-0">
                <Link href={`/opportunities/${opp.id}`}>
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-0.5 hover:text-[#2f66c8] transition-colors">
                    {opp.title}
                  </h3>
                </Link>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs text-[#44516A] mb-1">
                  <span className="font-medium">{opp.company}</span>
                  {opp.verified && <CheckCircle2 className="h-3 w-3 text-[#2f66c8] shrink-0" />}
                </div>
                <p className="text-xs text-[#8C97AD] mb-2">
                  {opp.workMode} • {opp.location}
                  {opp.salary && ` • ${opp.salary}`}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {opp.isNew && (
                    <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold text-[#16a34a] uppercase">
                      NEW
                    </span>
                  )}
                  {opp.isFeatured && (
                    <span className="rounded-full bg-[#fef3c7] px-2 py-0.5 text-[10px] font-bold text-[#b45309] uppercase">
                      ✦ FEATURED
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 mt-3">
              <p className="text-[11px] text-[#8C97AD]">
                Posted {opp.postedDaysAgo}d ago •{' '}
                <span className={urgentClose(opp.closesInDays) ? 'text-red-500 font-semibold' : ''}>
                  Closes in {opp.closesInDays} days
                </span>
              </p>
              <Link href={
                opp.category === 'Volunteer' || opp.isFeatured
                  ? `/opportunities/${opp.id}`
                  : `/opportunities/${opp.id}/apply`
              }>
                <button className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  opp.category === 'Volunteer' || opp.isFeatured
                    ? 'border border-[#D9E1EF] bg-white text-[#0F172A] hover:border-[#2f66c8] hover:text-[#2f66c8]'
                    : 'bg-[#2f66c8] text-white hover:bg-[#2558b0]'
                }`}>
                  {opp.category === 'Volunteer' || opp.isFeatured ? 'View Details' : 'Apply Now'}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom sticky filter bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex gap-3 border-t border-[#EEF2F8] bg-white px-4 py-3 shadow-[0_-2px_8px_0_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2f66c8] py-3 text-sm font-medium text-white"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          <span className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#2f66c8]">3</span>
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D9E1EF] bg-white py-3 text-sm font-medium text-[#44516A]">
          <Bookmark className="h-4 w-4" />
          Save Search
        </button>
      </div>

      {/* Filter Sheet */}
      {filterOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-5 max-h-[85vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#0F172A]">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="text-[#8C97AD]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Category</label>
                <select className="w-full appearance-none rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#2f66c8]">
                  <option>All Categories</option>
                  <option>Jobs</option>
                  <option>Grants</option>
                  <option>Housing</option>
                  <option>Training</option>
                  <option>Volunteer</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C97AD]" />
                  <select className="w-full appearance-none rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] py-2.5 pl-9 pr-8 text-sm text-[#0F172A] focus:outline-none focus:border-[#2f66c8]">
                    <option>Ontario, Canada</option>
                    <option>British Columbia</option>
                    <option>Alberta</option>
                    <option>Quebec</option>
                  </select>
                </div>
              </div>

              {/* Employment type */}
              <div>
                <label className="block text-xs font-semibold text-[#44516A] mb-2">Employment Type</label>
                <div className="space-y-2.5">
                  {['Full-time', 'Part-time', 'Internship', 'Contract', 'Volunteer'].map((t) => (
                    <label key={t} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#D9E1EF] text-[#2f66c8] focus:ring-[#2f66c8]" />
                      <span className="text-sm text-[#44516A]">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#D9E1EF] py-3 text-sm font-medium text-[#44516A]"
                onClick={() => setFilterOpen(false)}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                className="flex-[2] rounded-xl bg-[#2f66c8] py-3 text-sm font-medium text-white"
                onClick={() => setFilterOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
