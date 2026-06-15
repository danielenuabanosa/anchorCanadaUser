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
  Internship: 'bg-[#FFF7ED] text-[#C2410C]',
  Grant:      'bg-[#D1FAE5] text-[#15803D]',
  Job:        'bg-[#EFF4FF] text-[#2F66C8]',
  Volunteer:  'bg-[#FCE7F3] text-[#BE185D]',
  Housing:    'bg-[#FFF7ED] text-[#C2410C]',
  Training:   'bg-[#FDF4FF] text-[#9333EA]',
};

function CompanyLogo({ item }: { item: OpportunityItem }) {
  const [imgError, setImgError] = useState(false);
  if (item.logoImg && !imgError) {
    return (
      <img
        src={item.logoImg}
        alt={item.company}
        className="h-12 w-12 shrink-0 rounded-xl border border-[#EEF2F8] bg-white object-contain p-1"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
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
  const [query, setQuery] = useState('');

  const toggleBookmark = (id: string) => {
    setSavedBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const urgentClose = (days: number) => days <= 7;

  return (
    <div className="flex min-h-0 flex-col pb-24">
      {/* Search hero */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C97AD]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs, grants, support…"
          className="anchor-field w-full pl-10 pr-12"
        />
        <button
          onClick={() => setFilterOpen(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#44516A]"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Category tabs */}
      <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
        {CATEGORIES.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
              activeCategory === key
                ? 'bg-[#2F66C8] text-white'
                : 'border border-[#D9E1EF] bg-white text-[#44516A]'
            }`}
          >
            {label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeCategory === key ? 'bg-white/20 text-white' : 'bg-[#F8FAFC] text-[#8C97AD]'
              }`}
            >
              {count.toLocaleString()}
            </span>
          </button>
        ))}
      </div>

      {/* Results header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-[#44516A]">
          <span className="font-medium text-[#0F172A]">1,248</span> opportunities found
        </p>
        <button className="flex items-center gap-1 rounded-md border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-xs font-medium text-[#0F172A]">
          Most Relevant
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {MOCK_OPPORTUNITIES.map((opp) => (
          <div key={opp.id} className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className={`rounded px-2 py-1 text-xs font-semibold ${CATEGORY_BADGE[opp.category]}`}>
                {opp.category}
              </span>
              <button
                onClick={() => toggleBookmark(opp.id)}
                className="text-[#8C97AD] transition-colors hover:text-[#2F66C8]"
                aria-label="Bookmark"
              >
                <Bookmark className={`h-4 w-4 ${savedBookmarks.has(opp.id) ? 'fill-[#2F66C8] text-[#2F66C8]' : ''}`} />
              </button>
            </div>

            <div className="flex items-start gap-3">
              <CompanyLogo item={opp} />
              <div className="min-w-0 flex-1">
                <Link href={`/opportunities/${opp.id}`}>
                  <h3 className="mb-0.5 text-sm font-medium text-[#0F172A] transition-colors hover:text-[#2F66C8]">
                    {opp.title}
                  </h3>
                </Link>
                <div className="mb-1 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs text-[#44516A]">
                  <span className="font-medium">{opp.company}</span>
                  {opp.verified && <CheckCircle2 className="h-3 w-3 shrink-0 text-[#2F66C8]" />}
                </div>
                <p className="mb-2 text-xs text-[#8C97AD]">
                  {opp.workMode} • {opp.location}
                  {opp.salary && ` • ${opp.salary}`}
                </p>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {opp.isNew && (
                    <span className="rounded bg-[#EFF4FF] px-2 py-0.5 text-[10px] font-bold uppercase text-[#2F66C8]">
                      NEW
                    </span>
                  )}
                  {opp.isFeatured && (
                    <span className="rounded bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-bold uppercase text-[#B45309]">
                      ✦ FEATURED
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[11px] text-[#8C97AD]">
                Posted {opp.postedDaysAgo}d ago •{' '}
                <span className={urgentClose(opp.closesInDays) ? 'font-medium text-[#B91C1C]' : ''}>
                  Closes in {opp.closesInDays} days
                </span>
              </p>
              <Link
                href={
                  opp.category === 'Volunteer' || opp.isFeatured
                    ? `/opportunities/${opp.id}`
                    : `/opportunities/${opp.id}/apply`
                }
              >
                <button
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    opp.category === 'Volunteer' || opp.isFeatured
                      ? 'border border-[#D9E1EF] bg-white text-[#0F172A]'
                      : 'bg-[#2F66C8] text-white'
                  }`}
                >
                  {opp.category === 'Volunteer' || opp.isFeatured ? 'View Details' : 'Apply Now'}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky filter bar */}
      <div className="fixed bottom-[68px] left-0 right-0 z-30 flex gap-3 px-4 md:hidden">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#2F66C8] py-3 text-sm font-medium text-white shadow-lg"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          <span className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#2F66C8]">
            3
          </span>
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#D9E1EF] bg-white py-3 text-sm font-medium text-[#44516A] shadow-lg">
          <Bookmark className="h-4 w-4" />
          Save Search
        </button>
      </div>

      {/* Filter sheet */}
      {filterOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-medium text-[#0F172A]">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="text-[#8C97AD]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="anchor-label mb-2 text-xs text-[#44516A]">Category</label>
                <select className="anchor-select">
                  <option>All Categories</option>
                  <option>Jobs</option>
                  <option>Grants</option>
                  <option>Housing</option>
                  <option>Training</option>
                  <option>Volunteer</option>
                </select>
              </div>

              <div>
                <label className="anchor-label mb-2 text-xs text-[#44516A]">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
                  <select className="anchor-select anchor-field--icon-left">
                    <option>Ontario, Canada</option>
                    <option>British Columbia</option>
                    <option>Alberta</option>
                    <option>Quebec</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="anchor-label mb-2 text-xs text-[#44516A]">Job Type</label>
                <div className="space-y-2.5">
                  {['Full-time', 'Part-time', 'Internship', 'Contract', 'Volunteer'].map((t) => (
                    <label key={t} className="flex cursor-pointer items-center gap-3">
                      <input type="checkbox" className="h-[18px] w-[18px] rounded border-[#D9E1EF] text-[#2F66C8] focus:ring-[#2F66C8]" />
                      <span className="text-sm text-[#44516A]">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#D9E1EF] py-3 text-sm font-medium text-[#44516A]"
                onClick={() => setFilterOpen(false)}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                className="flex-[2] rounded-md bg-[#2F66C8] py-3 text-sm font-medium text-white"
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
