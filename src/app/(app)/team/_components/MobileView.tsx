'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, UserPlus } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { MobileHubStatGrid } from '@/app/(app)/opportunities/_components/MobileHubStatGrid';
import { MOBILE_TEAM_STATS, TEAM_MEMBERS, type TeamMemberRow } from './teamManagementData';
import {
  ExportTeamMembersModal,
  TeamHubModalLayer,
  handleTeamMemberAction,
  type TeamHubModal,
} from './TeamHubModals';
import { TeamFilterModal } from './TeamFilterModal';
import { RecentTeamActivityPanel, TeamPerformancePanel } from './TeamHubSections';
import { MobileTeamMemberCard } from './MobileTeamMemberCard';

export default function MobileView() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hubModal, setHubModal] = useState<TeamHubModal | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return TEAM_MEMBERS;
    const q = search.toLowerCase();
    return TEAM_MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q),
    );
  }, [search]);

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((m) => m.id)));
  }

  function handleAction(member: TeamMemberRow, label: string) {
    handleTeamMemberAction(member, label, setHubModal);
  }

  return (
    <div className="flex flex-col pb-4">
      <MobileHubPageHero
        title="Providers Team"
        subtitle="Manage your organization's members, roles and permissions"
        action={
          <button
            type="button"
            onClick={() => setHubModal({ type: 'invite' })}
            className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-base font-medium text-[#2F66C8]"
          >
            <UserPlus className="h-[18px] w-[18px]" strokeWidth={1.75} />
            Invite Team Member
          </button>
        }
      />

      <section className="py-5">
        <MobileHubStatGrid stats={MOBILE_TEAM_STATS} />
      </section>

      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#8C97AD]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team members..."
            className="h-[45px] w-full rounded-[6px] border border-[#EEF2F8] bg-white pl-10 pr-3 text-sm outline-none placeholder:text-[#8C97AD]"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="inline-flex h-[45px] shrink-0 items-center justify-center gap-2 rounded-[6px] bg-[#F8FAFC] px-3 text-sm font-medium text-[#2F66C8]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-[10px] border border-[#EEF2F8] px-5 py-2.5">
        <div className="flex items-center gap-3.5">
          <input
            type="checkbox"
            checked={filtered.length > 0 && selected.size === filtered.length}
            onChange={toggleAll}
            className="h-[18px] w-[18px] rounded border-[#D9E1EF] bg-[#EEF2F8] text-[#2F66C8]"
          />
          <p className="text-sm text-[#8C97AD]">{selected.size} selected</p>
          {selected.size > 0 ? (
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="text-sm font-medium text-[#2F66C8]"
            >
              Export
            </button>
          ) : null}
        </div>
        <button
          type="button"
          className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#EEF2F8] bg-white px-3 text-sm text-[#0F172A]"
        >
          Sort by: Newest Applied
          <ChevronDown className="h-3.5 w-3.5 text-[#44516A]" />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {filtered.map((member) => (
          <MobileTeamMemberCard key={member.id} member={member} onAction={handleAction} />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <RecentTeamActivityPanel />
        <TeamPerformancePanel />
      </div>

      <TeamHubModalLayer modal={hubModal} onClose={() => setHubModal(null)} onSetModal={setHubModal} />
      <TeamFilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
      <ExportTeamMembersModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
