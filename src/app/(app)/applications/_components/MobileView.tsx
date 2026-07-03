'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Download, Search, SlidersHorizontal } from 'lucide-react';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { MobileHubStatGrid } from '@/app/(app)/opportunities/_components/MobileHubStatGrid';
import { MobileHubTabs } from '@/app/(app)/opportunities/_components/MobileHubTabs';
import { useOpportunityHubSearch } from '@/app/(app)/opportunities/_components/useOpportunityHubSearch';
import { useProviderApplications } from '@/features/provider/hooks/useProviderHubData';
import { MobileApplicantCard } from './MobileApplicantCard';
import {
  APPLICANTS,
  APPLICATION_TABS,
  MOBILE_APPLICATION_STATS,
  filterApplicants,
  type ApplicationTab,
} from './applicationsHubData';
import { AssignReviewerModal, ExportApplicationsModal } from './ApplicationHubModals';
import { ApplicationFilterModal } from './ApplicationFilterModal';

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>('all');
  const [exportOpen, setExportOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const { rows: apiApplicants, loading, error } = useProviderApplications();
  const applicants = apiApplicants.length > 0 ? apiApplicants : APPLICANTS;
  const query = useOpportunityHubSearch();

  const filtered = useMemo(() => {
    const byTab = filterApplicants(applicants, activeTab);
    if (!query.trim()) return byTab;
    const q = query.toLowerCase();
    return byTab.filter(
      (a) =>
        a.applicant.toLowerCase().includes(q) ||
        a.opportunity.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q),
    );
  }, [activeTab, query, applicants]);

  return (
    <div className="flex flex-col pb-4">
      {error ? (
        <p className="mx-4 mb-3 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
      ) : null}
      {loading ? <p className="px-4 text-xs text-[#44516A]">Loading applications…</p> : null}
      <MobileHubPageHero
        title="Application Management"
        subtitle="Review, evaluate and manage applicants across all opportunities."
        action={
          <button
            type="button"
            onClick={() => setExportOpen(true)}
            className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-6 text-sm font-medium text-[#0F172A]"
          >
            <Download className="h-[18px] w-[18px]" strokeWidth={1.75} />
            Export Report
          </button>
        }
      />

      <section className="py-5">
        <MobileHubStatGrid stats={MOBILE_APPLICATION_STATS} />
      </section>

      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
          <input
            type="search"
            readOnly
            placeholder="Search applicants..."
            className="h-[45px] w-full rounded-[6px] border border-[#D9E1EF] bg-white pl-10 pr-3 text-sm outline-none placeholder:text-[#8C97AD]"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="inline-flex h-[45px] shrink-0 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-sm font-medium text-[#0F172A]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <section className="py-5">
        <MobileHubTabs tabs={APPLICATION_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </section>

      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-[#8C97AD]">0 selected</p>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm text-[#0F172A]"
        >
          Sort by: Newest Applied
          <ChevronDown className="h-4 w-4 text-[#44516A]" />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {filtered.map((row) => (
          <MobileApplicantCard key={row.id} row={row} onAssignReviewer={() => setAssignOpen(true)} />
        ))}
      </div>

      <ExportApplicationsModal open={exportOpen} onClose={() => setExportOpen(false)} />
      <AssignReviewerModal open={assignOpen} onClose={() => setAssignOpen(false)} />
      <ApplicationFilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
