'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, ChevronDown, Bookmark, CheckCircle2,
  Share2, RotateCcw, Shield, Calendar,
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
        className="h-[60px] w-[60px] shrink-0 rounded-xl border border-[#EEF2F8] bg-white object-contain p-1.5"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div
      className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white"
      style={{ backgroundColor: item.logoColor }}
    >
      {item.logoLetter}
    </div>
  );
}

function CategoryTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-[#2F66C8] text-white'
          : 'border border-[#D9E1EF] bg-white text-[#44516A] hover:border-[#2F66C8] hover:text-[#2F66C8]'
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 text-xs ${
          active ? 'bg-white/20 text-white' : 'bg-[#F8FAFC] text-[#8C97AD]'
        }`}
      >
        {count.toLocaleString()}
      </span>
    </button>
  );
}

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
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">
            Explore Opportunities
          </h1>
          <p className="text-base text-[#44516A]">
            Find jobs, grants, housing, training and more across Canada.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#44516A] transition hover:border-[#2F66C8] hover:text-[#2F66C8]">
            <Bookmark className="h-[18px] w-[18px]" />
            Save Search
          </button>
          <button className="flex items-center gap-2 rounded-md border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#44516A] transition hover:border-[#2F66C8] hover:text-[#2F66C8]">
            <Share2 className="h-[18px] w-[18px]" />
            Share
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-5 flex flex-wrap gap-2.5">
        {(Object.entries(CATEGORIES) as [Category, CategoryMeta][]).map(([key, meta]) => (
          <CategoryTab
            key={key}
            label={meta.label}
            count={meta.count}
            active={activeCategory === key}
            onClick={() => setActiveCategory(key)}
          />
        ))}
      </div>

      {/* 3-column layout */}
      <div className="flex items-start gap-5">
        {/* Filters sidebar */}
        <aside className="hidden w-[320px] shrink-0 lg:block">
          <div className="space-y-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-[#0F172A]">Filters</span>
              <button className="text-xs font-medium text-[#2F66C8] hover:underline">Clear all</button>
            </div>

            <div>
              <label className="anchor-label mb-2 text-xs text-[#44516A]">Keyword</label>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title, skill or organization..."
                  className="anchor-field pr-10"
                />
                <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C97AD]" />
              </div>
            </div>

            <div>
              <label className="anchor-label mb-2 text-xs text-[#44516A]">Category</label>
              <div className="relative">
                <select className="anchor-select">
                  <option>All Categories</option>
                  <option>Jobs</option>
                  <option>Grants</option>
                  <option>Housing</option>
                  <option>Training</option>
                  <option>Volunteer</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
              </div>
            </div>

            <div>
              <label className="anchor-label mb-2 text-xs text-[#44516A]">Location</label>
              <div className="relative mb-3">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
                <select className="anchor-select anchor-field--icon-left">
                  <option>Ontario, Canada</option>
                  <option>British Columbia</option>
                  <option>Alberta</option>
                  <option>Quebec</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
              </div>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="h-[18px] w-[18px] rounded border-[#D9E1EF] text-[#2F66C8] focus:ring-[#2F66C8]"
                />
                <span className="text-sm text-[#44516A]">Remote / Work from anywhere</span>
              </label>
            </div>

            <div>
              <label className="anchor-label mb-2 text-xs text-[#44516A]">Job Type</label>
              <div className="space-y-2.5">
                {[
                  { label: 'Full-time',  count: 312 },
                  { label: 'Part-time',  count: 178 },
                  { label: 'Internship', count: 246 },
                  { label: 'Contract',   count: 98  },
                  { label: 'Volunteer',  count: 64  },
                ].map((item) => (
                  <label key={item.label} className="group flex cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input type="checkbox" className="h-[18px] w-[18px] rounded border-[#D9E1EF] text-[#2F66C8] focus:ring-[#2F66C8]" />
                      <span className="text-sm text-[#44516A] group-hover:text-[#0F172A]">{item.label}</span>
                    </div>
                    <span className="text-sm text-[#8C97AD]">({item.count})</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="anchor-label mb-2 text-xs text-[#44516A]">Eligibility</label>
              <div className="relative">
                <select className="anchor-select">
                  <option>All Eligibility</option>
                  <option>Newcomers</option>
                  <option>Students</option>
                  <option>Youth (16-30)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
              </div>
            </div>

            <div>
              <label className="anchor-label mb-2 text-xs text-[#44516A]">Deadline</label>
              <div className="relative">
                <select className="anchor-select pr-16">
                  <option>Anytime</option>
                  <option>Next 7 days</option>
                  <option>Next 30 days</option>
                </select>
                <Calendar className="pointer-events-none absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
              </div>
            </div>

            <button className="w-full rounded-md bg-[#2F66C8] py-3 text-sm font-medium text-white transition hover:bg-[#2558B0]">
              Apply Filters
            </button>
            <button className="mx-auto flex items-center gap-1.5 text-sm text-[#44516A] transition hover:text-[#2F66C8]">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#44516A]">
              <span className="font-medium text-[#0F172A]">1,248</span> opportunities found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#44516A]">Sort by</span>
              <button className="flex items-center gap-1 rounded-md border border-[#D9E1EF] bg-white px-3 py-2 text-sm font-medium text-[#0F172A] hover:text-[#2F66C8]">
                Most Relevant
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_OPPORTUNITIES.map((opp) => (
              <div
                key={opp.id}
                className="rounded-[10px] border border-[#EEF2F8] bg-white p-5 transition-shadow hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]"
              >
                <div className="flex gap-4">
                  <CompanyLogo item={opp} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded px-2 py-1 text-xs font-semibold ${CATEGORY_BADGE[opp.category]}`}>
                          {opp.category}
                        </span>
                        {opp.isNew && (
                          <span className="rounded bg-[#EFF4FF] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2F66C8]">
                            NEW
                          </span>
                        )}
                        {opp.isFeatured && (
                          <span className="rounded bg-[#FEF3C7] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#B45309]">
                            ✦ FEATURED
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleBookmark(opp.id)}
                        className="shrink-0 text-[#8C97AD] transition-colors hover:text-[#2F66C8]"
                        aria-label="Bookmark"
                      >
                        <Bookmark className={`h-5 w-5 ${savedBookmarks.has(opp.id) ? 'fill-[#2F66C8] text-[#2F66C8]' : ''}`} />
                      </button>
                    </div>

                    <Link href={`/opportunities/${opp.id}`}>
                      <h3 className="mb-1 text-base font-medium text-[#0F172A] transition-colors hover:text-[#2F66C8]">
                        {opp.title}
                      </h3>
                    </Link>

                    <div className="mb-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-[#44516A]">
                      <span className="font-medium">{opp.company}</span>
                      {opp.verified && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2F66C8]" />}
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

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-[#8C97AD]">
                        Posted {opp.postedDaysAgo}d ago
                        <span className="mx-1.5 text-[#D9E1EF]">•</span>
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
                          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                            opp.category === 'Volunteer' || opp.isFeatured
                              ? 'border border-[#D9E1EF] bg-white text-[#0F172A] hover:border-[#2F66C8] hover:text-[#2F66C8]'
                              : 'bg-[#2F66C8] text-white hover:bg-[#2558B0]'
                          }`}
                        >
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
              className="flex items-center rounded-md border border-[#D9E1EF] bg-white px-3 py-1.5 text-sm text-[#44516A] transition hover:border-[#2F66C8] hover:text-[#2F66C8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                  currentPage === n
                    ? 'bg-[#2F66C8] text-white'
                    : 'border border-[#D9E1EF] bg-white text-[#44516A] hover:border-[#2F66C8] hover:text-[#2F66C8]'
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-sm text-[#8C97AD]">···</span>
            <button
              onClick={() => setCurrentPage(12)}
              className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                currentPage === 12
                  ? 'bg-[#2F66C8] text-white'
                  : 'border border-[#D9E1EF] bg-white text-[#44516A] hover:border-[#2F66C8] hover:text-[#2F66C8]'
              }`}
            >
              12
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 rounded-md border border-[#D9E1EF] bg-white px-3 py-1.5 text-sm text-[#44516A] transition hover:border-[#2F66C8] hover:text-[#2F66C8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="hidden w-[368px] shrink-0 space-y-4 xl:block">
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <h3 className="mb-4 text-base font-medium text-[#0F172A]">Popular Searches</h3>
            <ul className="space-y-3">
              {POPULAR_SEARCHES.map((term) => (
                <li key={term}>
                  <button className="flex w-full items-center gap-3 text-left text-sm text-[#44516A] transition hover:text-[#2F66C8]">
                    <Search className="h-5 w-5 shrink-0 text-[#8C97AD]" />
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-[#EFF4FF] p-5">
            <h3 className="mb-4 text-base font-medium text-[#0F172A]">Refine your results</h3>
            <div className="mb-4 flex flex-col items-center gap-3 py-4">
              {[65, 40, 80].map((w, i) => (
                <div key={i} className="relative h-1.5 w-[100px] rounded-full bg-[#D9E1EF]">
                  <div
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#2F66C8] bg-white"
                    style={{ left: `${w}%`, transform: 'translate(-50%, -50%)' }}
                  />
                  <div className="absolute left-0 top-0 h-full rounded-full bg-[#2F66C8]" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            <p className="mb-4 text-xs leading-relaxed text-[#44516A]">
              Use filters to find opportunities that match your goals and preferences.
            </p>
            <button className="w-full rounded-md border border-[#D9E1EF] bg-white py-2.5 text-xs font-medium text-[#0F172A] transition hover:border-[#2F66C8] hover:text-[#2F66C8]">
              Learn how filters work
            </button>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-[#EFF4FF] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#2F66C8]" />
              <span className="text-sm font-medium text-[#0F172A]">Tip</span>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-[#44516A]">
              Completing your profile can increase your match accuracy and recommendations.
            </p>
            <Link href="/profile" className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F66C8] hover:underline">
              Complete Profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
