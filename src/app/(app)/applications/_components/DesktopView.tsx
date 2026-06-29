'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Ellipsis,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { useProviderApplications } from '@/features/provider/hooks/useProviderHubData';
import {
  APPLICANTS,
  APPLICATION_STATS,
  APPLICATION_TABS,
  FILTER_LABELS,
  OPPORTUNITY_TYPE_STYLES,
  STATUS_STYLES,
  filterApplicants,
  type ApplicationTab,
} from './applicationsHubData';
import {
  AssignReviewerModal,
  ExportApplicationsModal,
  RowActionsMenu,
} from './ApplicationHubModals';

const PAGE_SIZE = 10;

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [menuRowId, setMenuRowId] = useState<string | null>(null);
  const router = useRouter();
  const { rows: apiApplicants, loading, error } = useProviderApplications();

  const applicants = apiApplicants.length > 0 ? apiApplicants : APPLICANTS;

  const filtered = useMemo(() => {
    const byTab = filterApplicants(applicants, activeTab);
    if (!search.trim()) return byTab;
    const q = search.toLowerCase();
    return byTab.filter(
      (a) =>
        a.applicant.toLowerCase().includes(q) ||
        a.opportunity.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q),
    );
  }, [activeTab, search, applicants]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === pageRows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(pageRows.map((r) => r.id)));
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Application Management</h1>
          <p className="text-base text-[#44516A]">
            Review, evaluate and manage applicants across all opportunities.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExportOpen(true)}
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-3 text-base font-medium text-[#0F172A]"
        >
          <Download className="h-[18px] w-[18px]" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-6">
        {APPLICATION_STATS.map((stat) => (
          <HubStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search applicants..."
              className="h-[42px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-10 pr-3 text-sm text-[#0F172A] outline-none focus:border-[#2F66C8]"
            />
          </div>
          {FILTER_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-3 py-2 text-sm text-[#44516A]"
            >
              {label}
              <ChevronDown className="h-4 w-4" />
            </button>
          ))}
          <button type="button" className="ml-auto text-sm font-medium text-[#2F66C8] hover:underline">
            Clear Filters
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex gap-2.5 overflow-x-auto border-b border-[#EEF2F8] px-2.5">
          {APPLICATION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setPage(1);
              }}
              className={cn(
                'shrink-0 px-2.5 py-3.5 text-sm',
                activeTab === tab.id
                  ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                  : 'text-[#0F172A]',
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-3">
          <p className="text-sm text-[#44516A]">{selected.size} selected</p>
          <div className="flex items-center gap-3">
            {selected.size > 0 ? (
              <button
                type="button"
                onClick={() => setAssignOpen(true)}
                className="text-sm font-medium text-[#2F66C8] hover:underline"
              >
                Assign Reviewer
              </button>
            ) : null}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm text-[#44516A]"
            >
              Sort by: Newest Applied
              <ChevronDown className="h-4 w-4" />
            </button>
            {loading ? <p className="text-sm text-[#8C97AD]">Loading applications…</p> : null}
          </div>
        </div>

        <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[40px_1.2fr_1.2fr_140px_120px_140px_60px] md:gap-2.5">
          <div className="flex items-center py-3.5">
            <input
              type="checkbox"
              checked={pageRows.length > 0 && selected.size === pageRows.length}
              onChange={toggleAll}
              className="h-4 w-4 rounded border-[#D9E1EF] text-[#2F66C8]"
            />
          </div>
          {['Applicant', 'Opportunity', 'Date Applied', 'Status', 'Reviewer', 'Actions'].map((col) => (
            <p key={col} className="py-3.5 text-sm font-medium text-[#0F172A]">
              {col}
            </p>
          ))}
        </div>

        <div className="divide-y divide-[#EEF2F8] px-5">
          {pageRows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 gap-3 py-4 md:grid-cols-[40px_1.2fr_1.2fr_140px_120px_140px_60px] md:items-center md:gap-2.5"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                  className="h-4 w-4 rounded border-[#D9E1EF] text-[#2F66C8]"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image src={row.avatar} alt="" width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-[#0F172A]">{row.applicant}</p>
                  <p className="truncate text-sm text-[#8C97AD]">{row.location}</p>
                </div>
              </div>
              <div className="min-w-0">
                <p className="truncate text-base text-[#44516A]">{row.opportunity}</p>
                <span
                  className={cn(
                    'mt-1 inline-flex rounded-[4px] px-1.5 py-0.5 text-xs font-medium',
                    OPPORTUNITY_TYPE_STYLES[row.opportunityType],
                  )}
                >
                  {row.opportunityType}
                </span>
              </div>
              <div>
                <p className="text-base text-[#44516A]">{row.appliedAt}</p>
                {row.appliedTime ? <p className="text-sm text-[#8C97AD]">{row.appliedTime}</p> : null}
              </div>
              <span
                className={cn(
                  'inline-flex w-fit rounded-[6px] px-1.5 py-0.5 text-sm font-medium',
                  STATUS_STYLES[row.status],
                )}
              >
                {row.status}
              </span>
              <div className="flex items-center gap-2">
                {row.reviewerAvatar ? (
                  <Image
                    src={row.reviewerAvatar}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : null}
                <p className="truncate text-sm text-[#44516A]">{row.reviewer ?? '—'}</p>
              </div>
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMenuRowId(menuRowId === row.id ? null : row.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] text-[#44516A] hover:bg-[#F8FAFC]"
                >
                  <Ellipsis className="h-[18px] w-[18px]" />
                </button>
                <RowActionsMenu
                  open={menuRowId === row.id}
                  onClose={() => setMenuRowId(null)}
                  onView={() => {
                    setMenuRowId(null);
                    router.push(`/applications/${row.id}`);
                  }}
                  onAssignReviewer={() => {
                    setMenuRowId(null);
                    setSelected(new Set([row.id]));
                    setAssignOpen(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F8] px-5 py-4">
          <p className="text-sm text-[#44516A]">
            Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of{' '}
            {filtered.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].filter((n) => n <= totalPages).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  'flex h-8 min-w-8 items-center justify-center rounded-[6px] px-2 text-sm',
                  page === n ? 'bg-[#2F66C8] text-white' : 'border border-[#EEF2F8] text-[#44516A]',
                )}
              >
                {n}
              </button>
            ))}
            {totalPages > 4 ? <span className="text-sm text-[#8C97AD]">…</span> : null}
            {totalPages > 3 ? (
              <button
                type="button"
                onClick={() => setPage(totalPages)}
                className={cn(
                  'flex h-8 min-w-8 items-center justify-center rounded-[6px] px-2 text-sm',
                  page === totalPages ? 'bg-[#2F66C8] text-white' : 'border border-[#EEF2F8] text-[#44516A]',
                )}
              >
                {totalPages}
              </button>
            ) : null}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#44516A]">
            Rows per page
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-[6px] border border-[#D9E1EF] px-2 py-1"
            >
              {PAGE_SIZE}
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ExportApplicationsModal open={exportOpen} onClose={() => setExportOpen(false)} />
      <AssignReviewerModal open={assignOpen} onClose={() => setAssignOpen(false)} />
    </div>
  );
}
