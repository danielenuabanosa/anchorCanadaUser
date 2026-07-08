'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronLeft, ChevronRight, Ellipsis, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { HubFilterBar } from '@/shared/components/hub/HubFilterBar';
import {
  FILTER_LABELS,
  ROLE_STYLES,
  STATUS_STYLES,
  TEAM_MEMBERS,
  TEAM_STATS,
  TOTAL_MEMBER_COUNT,
  type TeamMemberRow,
} from './teamManagementData';
import {
  ExportTeamMembersModal,
  MemberActionsMenu,
  TeamHubModalLayer,
  handleTeamMemberAction,
  type TeamHubModal,
} from './TeamHubModals';
import { TeamFilterModal } from './TeamFilterModal';
import { TeamHubBottomSections } from './TeamHubSections';

const ROWS_PER_PAGE = 10;

function buildPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 'ellipsis', total];
  if (current >= total - 2) return [1, 'ellipsis', total - 2, total - 1, total];
  return [1, 'ellipsis', current, 'ellipsis', total];
}

export default function DesktopView() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [hubModal, setHubModal] = useState<TeamHubModal | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [menuMemberId, setMenuMemberId] = useState<string | null>(null);
  const [menuAnchorRect, setMenuAnchorRect] = useState<DOMRect | null>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!search.trim()) return TEAM_MEMBERS;
    const q = search.toLowerCase();
    return TEAM_MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(TOTAL_MEMBER_COUNT / ROWS_PER_PAGE));
  const pageRows = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
  const showingTo = Math.min(page * ROWS_PER_PAGE, TOTAL_MEMBER_COUNT);
  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === pageRows.length) setSelected(new Set());
    else setSelected(new Set(pageRows.map((r) => r.id)));
  }

  function handleAction(member: TeamMemberRow, label: string) {
    handleTeamMemberAction(member, label, setHubModal, () => router.push(`/team/${member.id}`));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Providers Team</h1>
          <p className="text-base text-[#44516A]">
            Manage your organization&apos;s members, roles and permissions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHubModal({ type: 'invite' })}
          className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#2F66C8] px-4 py-2.5 text-base font-medium text-white"
        >
          <Plus className="h-[18px] w-[18px]" />
          Invite Team Member
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-6">
        {TEAM_STATS.map((stat) => (
          <HubStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <HubFilterBar
        searchPlaceholder="Search team members..."
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        filters={[...FILTER_LABELS]}
        onFilterClick={() => setFilterOpen(true)}
        onClear={() => setSearch('')}
      />

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-2.5">
          <div className="flex items-center gap-3.5">
            <input
              type="checkbox"
              checked={pageRows.length > 0 && selected.size === pageRows.length}
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
                Export Team Members
              </button>
            ) : null}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-[#44516A]">Sort by:</span>
            <button
              type="button"
              className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#EEF2F8] bg-white px-3 text-sm text-[#0F172A]"
            >
              Newest Applied
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[40px_1.4fr_140px_140px_140px_140px_1fr_100px] md:gap-2.5">
          <div className="flex items-center py-3.5" aria-hidden>
            <span className="h-[18px] w-[18px]" />
          </div>
          {['Member', 'Role', 'Department', 'Status', 'Last Active', 'Permissions', 'Actions'].map((col) => (
            <p key={col} className="py-3.5 text-sm font-medium text-[#0F172A]">
              {col}
            </p>
          ))}
        </div>

        <div className="overflow-visible p-5">
          {pageRows.map((member) => (
            <div
              key={member.id}
              className="grid grid-cols-1 gap-3 border-b border-[#EEF2F8] py-0 last:border-b-0 md:grid-cols-[40px_1.4fr_140px_140px_140px_140px_1fr_100px] md:items-center md:gap-2.5 md:py-0"
            >
              <div className="flex h-[60px] items-center">
                <input
                  type="checkbox"
                  checked={selected.has(member.id)}
                  onChange={() => toggleRow(member.id)}
                  className="h-[18px] w-[18px] rounded border-[#D9E1EF] bg-[#EEF2F8] text-[#2F66C8]"
                />
              </div>
              <div className="flex h-[60px] items-center gap-2.5">
                <Image src={member.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm text-[#0F172A]">{member.name}</p>
                  <p className="truncate text-xs text-[#8C97AD]">{member.email}</p>
                </div>
              </div>
              <div className="flex h-[60px] items-center">
                <span className={cn('inline-flex rounded-[4px] px-1.5 py-0.5 text-sm font-medium', ROLE_STYLES[member.role])}>
                  {member.role}
                </span>
              </div>
              <p className="flex h-[60px] items-center text-sm text-[#44516A]">{member.department}</p>
              <div className="flex h-[60px] items-center">
                <span className={cn('inline-flex rounded-[4px] px-1.5 py-0.5 text-sm font-medium', STATUS_STYLES[member.status])}>
                  {member.status}
                </span>
              </div>
              <p className="flex h-[60px] items-center text-sm text-[#44516A]">{member.lastActive}</p>
              <p className="flex h-[60px] items-center truncate text-sm text-[#44516A]">{member.permissions}</p>
              <div className="relative z-10 flex h-[60px] items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMenuAnchorRect(rect);
                    setMenuMemberId(menuMemberId === member.id ? null : member.id);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white p-1.5 text-[#44516A]"
                >
                  <Ellipsis className="h-[18px] w-[18px]" />
                </button>
                <MemberActionsMenu
                  open={menuMemberId === member.id}
                  member={member}
                  anchorRect={menuMemberId === member.id ? menuAnchorRect : null}
                  onClose={() => {
                    setMenuMemberId(null);
                    setMenuAnchorRect(null);
                  }}
                  onAction={(label) => handleAction(member, label)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F8] px-5 py-4">
          <p className="text-sm text-[#44516A]">
            Showing {showingFrom} to {showingTo} of {TOTAL_MEMBER_COUNT} members
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-sm text-[#44516A]">Rows per page</span>
              <button
                type="button"
                className="inline-flex h-[34px] items-center gap-2 rounded-[6px] border border-[#EEF2F8] bg-white px-3 text-sm text-[#0F172A]"
              >
                {ROWS_PER_PAGE}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {buildPageNumbers(page, totalPages).map((n, idx) =>
                n === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className="flex h-12 min-w-12 items-center justify-center text-base text-[#44516A]">
                    •••
                  </span>
                ) : (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={cn(
                      'flex h-12 min-w-12 items-center justify-center rounded-[6px] px-6 text-base font-medium',
                      page === n ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] bg-white text-[#44516A]',
                    )}
                  >
                    {n}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <TeamHubBottomSections />

      <TeamHubModalLayer modal={hubModal} onClose={() => setHubModal(null)} onSetModal={setHubModal} />
      <TeamFilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
      <ExportTeamMembersModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
