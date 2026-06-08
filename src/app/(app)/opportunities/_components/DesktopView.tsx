'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, ChevronDown, Bookmark, CheckCircle2,
  Share2, SlidersHorizontal, RotateCcw, Compass, Calendar,
  ArrowRight, ChevronLeft, ChevronRight,
} from 'lucide-react';

type Category = 'all' | 'jobs' | 'grants' | 'housing' | 'training' | 'volunteer';

interface CategoryMeta { label: string; count: number; }

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

/* ─── Mock data ──────────────────────────────────────────────────────────── */

const CATEGORIES: Record<Category, CategoryMeta> = {
  all:       { label: 'All',       count: 1248 },
  jobs:      { label: 'Jobs',      count: 432  },
  grants:    { label: 'Grants',    count: 213  },
  housing:   { label: 'Housing',   count: 156  },
  training:  { label: 'Training',  count: 189  },
  volunteer: { label: 'Volunteer', count: 98   },
};

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

const POPULAR_SEARCHES = [
  'UX Designer Toronto',
  'Remote Jobs in Canada',
  'Student Grants 2025',
  'Housing Support Ontario',
  'Tech Internships',
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
        className="h-[60px] w-[60px] rounded-xl object-contain border border-[#eef2f8] bg-white p-1.5 shrink-0"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div
      className="h-[60px] w-[60px] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0"
      style={{ backgroundColor: item.logoColor }}
    >
      {item.logoLetter}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function OpportunitiesDesktopView() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const toggleBookmark = (id: string) => {
    setSavedBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const urgentClose = (days: number) => days <= 7;

  return (
    <div className="min-h-0">

      {/* Page header */}
      <div className="mb-5">
        <h1 className="font-['Instrument_Serif'] text-[28px] font-normal text-[#0F172A] leading-tight">
          Explore Opportunities
        </h1>
        <p className="mt-1 text-sm text-[#44516A]">
          Find jobs, grants, housing, training and more across Canada.
        </p>
      </div>

      {/* Category tabs + action buttons */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(Object.entries(CATEGORIES) as [Category, CategoryMeta][]).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-[#2f66c8] text-white'
                  : 'bg-white text-[#44516A] border border-[#D9E1EF] hover:border-[#2f66c8] hover:text-[#2f66c8]'
              }`}
            >
              {meta.label}
              {' '}
              <span className={`text-xs ${activeCategory === key ? 'text-blue-200' : 'text-[#8C97AD]'}`}>
                {meta.count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#D9E1EF] bg-white px-3 py-1.5 text-sm font-medium text-[#44516A] hover:border-[#2f66c8] hover:text-[#2f66c8] transition-colors">
            <Bookmark className="h-4 w-4" />
            Save Search
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#D9E1EF] bg-white px-3 py-1.5 text-sm font-medium text-[#44516A] hover:border-[#2f66c8] hover:text-[#2f66c8] transition-colors">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {/* 3-column layout */}
      <div className="flex gap-5 items-start">

        {/* Left sidebar filters */}
        <aside className="hidden lg:block w-[250px] shrink-0">
          <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#0F172A]">Filters</span>
              <button className="text-xs text-[#2f66c8] font-medium hover:underline">Clear all</button>
            </div>

            {/* Keyword */}
            <div>
              <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Keyboard</label>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title, skill or organization..."
                  className="w-full rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] py-2 px-3 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#FFFFFF] focus:ring-1 focus:ring-[#FFFFFF]"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Category</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] py-2 px-3 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#FFFFFF] focus:ring-1 focus:ring-[#FFFFFF]">
                  <option>All Categories</option>
                  <option>Jobs</option>
                  <option>Grants</option>
                  <option>Housing</option>
                  <option>Training</option>
                  <option>Volunteer</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C97AD]" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Location</label>
              <div className="relative mb-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C97AD]" />
                <select className="w-full appearance-none rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] py-2 pl-9 pr-8 text-sm text-[#0F172A] focus:outline-none focus:border-[#2f66c8]">
                  <option>Ontario, Canada</option>
                  <option>British Columbia</option>
                  <option>Alberta</option>
                  <option>Quebec</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C97AD]" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-[#D9E1EF] text-[#2f66c8] focus:ring-[#2f66c8]"
                />
                <span className="text-sm text-[#44516A]">Remote / Work from anywhere</span>
              </label>
            </div>

            {/* Employment type */}
            <div>
              <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Location</label>
              <div className="space-y-2">
                {[
                  { label: 'Full-time',  count: 312 },
                  { label: 'Part-time',  count: 178 },
                  { label: 'Internship', count: 246 },
                  { label: 'Contract',   count: 98  },
                  { label: 'Volunteer',  count: 64  },
                ].map((item) => (
                  <label key={item.label} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#D9E1EF] text-[#2f66c8] focus:ring-[#2f66c8]" />
                      <span className="text-sm text-[#44516A] group-hover:text-[#0F172A]">{item.label}</span>
                    </div>
                    <span className="text-xs text-[#8C97AD]">({item.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div>
              <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Eligibility</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] px-3 py-2 pr-8 text-sm text-[#0F172A] focus:outline-none focus:border-[#2f66c8]">
                  <option>All Eligibility</option>
                  <option>Newcomers</option>
                  <option>Students</option>
                  <option>Youth (16-30)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C97AD]" />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-xs font-semibold text-[#44516A] mb-1.5">Deadline</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-[#D9E1EF] bg-[#F8FAFC] px-3 py-2 pr-8 text-sm text-[#0F172A] focus:outline-none focus:border-[#2f66c8]">
                  <option>Anytime</option>
                  <option>Next 7 days</option>
                  <option>Next 30 days</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C97AD]" />
                <Calendar className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C97AD]" />
              </div>
            </div>

            {/* Apply */}
            <button className="w-full rounded-xl bg-[#2f66c8] py-2.5 text-sm font-medium text-white hover:bg-[#2558b0] transition-colors">
              Apply Filters
            </button>
            <button className="flex items-center gap-1.5 mx-auto text-sm text-[#44516A] hover:text-[#2f66c8] transition-colors">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Center results */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Results header */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#44516A]">
              <span className="font-semibold text-[#0F172A]">1,248</span> opportunities found
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-[#44516A]">Sort by</span>
              <button className="flex items-center gap-1 text-sm font-medium text-[#0F172A] hover:text-[#2f66c8] rounded-lg border border-[#D9E1EF] bg-white px-2.5 py-1.5">
                Most Relevant
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {MOCK_OPPORTUNITIES.map((opp) => (
              <div key={opp.id} className="rounded-xl border border-[#D9E1EF] bg-white p-5 hover:shadow-md transition-shadow shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
                <div className="flex gap-4">
                  <CompanyLogo item={opp} />
                  <div className="flex-1 min-w-0">
                    {/* Badges + bookmark */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_BADGE[opp.category]}`}>
                          {opp.category}
                        </span>
                        {opp.isNew && (
                          <span className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-xs font-bold text-[#16a34a] uppercase tracking-wide">
                            NEW
                          </span>
                        )}
                        {opp.isFeatured && (
                          <span className="rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-xs font-bold text-[#b45309] uppercase tracking-wide">
                            ✦ FEATURED
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleBookmark(opp.id)}
                        className="text-[#8C97AD] hover:text-[#2f66c8] transition-colors shrink-0"
                        aria-label="Bookmark"
                      >
                        <Bookmark className={`h-5 w-5 ${savedBookmarks.has(opp.id) ? 'fill-[#2f66c8] text-[#2f66c8]' : ''}`} />
                      </button>
                    </div>

                    {/* Title */}
                    <Link href={`/opportunities/${opp.id}`}>
                      <h3 className="text-[15px] font-semibold text-[#0F172A] hover:text-[#2f66c8] transition-colors mb-1">
                        {opp.title}
                      </h3>
                    </Link>

                    {/* Company + details */}
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-[#44516A] mb-3">
                      <span className="font-medium">{opp.company}</span>
                      {opp.verified && <CheckCircle2 className="h-3.5 w-3.5 text-[#2f66c8] shrink-0" />}
                      <span className="text-[#D9E1EF]">•</span>
                      <span>{opp.workMode}</span>
                      <span className="text-[#D9E1EF]">•</span>
                      <span>{opp.location}</span>
                      {opp.salary && (
                        <>
                          <span className="text-[#D9E1EF]">•</span>
                          <span className="font-medium text-[#15803D]">{opp.salary}</span>
                        </>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-xs text-[#8C97AD]">
                        Posted {opp.postedDaysAgo}d ago
                        <span className="mx-1.5 text-[#D9E1EF]">•</span>
                        <span className={urgentClose(opp.closesInDays) ? 'text-red-500 font-semibold' : ''}>
                          Closes in {opp.closesInDays} days
                        </span>
                      </p>
                      <Link href={
                        opp.category === 'Volunteer' || opp.isFeatured
                          ? `/opportunities/${opp.id}`
                          : `/opportunities/${opp.id}/apply`
                      }>
                        <button className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                          opp.category === 'Volunteer' || opp.isFeatured
                            ? 'border border-[#D9E1EF] bg-white text-[#0F172A] hover:border-[#2f66c8] hover:text-[#2f66c8]'
                            : 'bg-[#2f66c8] text-white hover:bg-[#2558b0]'
                        }`}>
                          {opp.category === 'Volunteer' || opp.isFeatured ? 'View Details' : 'Apply Now'}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pt-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-[#44516A] border border-[#D9E1EF] bg-white hover:border-[#2f66c8] hover:text-[#2f66c8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`rounded-lg w-9 h-9 text-sm font-medium transition-colors ${
                  currentPage === n
                    ? 'bg-[#2f66c8] text-white'
                    : 'border border-[#D9E1EF] bg-white text-[#44516A] hover:border-[#2f66c8] hover:text-[#2f66c8]'
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-[#8C97AD] text-sm">···</span>
            <button
              onClick={() => setCurrentPage(12)}
              className={`rounded-lg w-9 h-9 text-sm font-medium transition-colors ${
                currentPage === 12
                  ? 'bg-[#2f66c8] text-white'
                  : 'border border-[#D9E1EF] bg-white text-[#44516A] hover:border-[#2f66c8] hover:text-[#2f66c8]'
              }`}
            >
              12
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-[#44516A] border border-[#D9E1EF] bg-white hover:border-[#2f66c8] hover:text-[#2f66c8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="hidden xl:block w-[240px] shrink-0 space-y-4">

          {/* Popular Searches */}
          <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
            <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">Popular Searches</h3>
            <ul className="space-y-2.5">
              {POPULAR_SEARCHES.map((term) => (
                <li key={term}>
                  <button className="flex items-center gap-2 text-sm text-[#44516A] hover:text-[#2f66c8] transition-colors w-full text-left">
                    <Search className="h-3.5 w-3.5 shrink-0 text-[#8C97AD]" />
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Refine card */}
          <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
            <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">Refine your results</h3>
            {/* Sliders illustration */}
            <div className="mb-4 flex flex-col gap-2 py-3">
              {[65, 40, 80].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-0.5 flex-1 bg-[#EEF2F8] rounded-full relative">
                    <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-[#2f66c8] bg-white" style={{ left: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mb-3 text-xs text-[#44516A] leading-relaxed">
              Use filters to find opportunities that match your goals and preferences.
            </p>
            <button className="w-full rounded-lg border border-[#D9E1EF] py-2 text-xs font-medium text-[#0F172A] hover:border-[#2f66c8] hover:text-[#2f66c8] transition-colors">
              Learn how filters work
            </button>
          </div>

          {/* Tip */}
          <div className="rounded-xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
            <div className="mb-2 flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#2f66c8]" />
              <span className="text-xs font-semibold text-[#0F172A]">Tip</span>
            </div>
            <p className="mb-3 text-xs text-[#44516A] leading-relaxed">
              Completing your profile can increase your match accuracy and recommendations.
            </p>
            <Link href="/profile" className="flex items-center gap-1 text-xs font-semibold text-[#2f66c8] hover:underline">
              Complete Profile <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
