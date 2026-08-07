'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, UserPlus } from 'lucide-react';
import { usePagination } from '@/lib/pagination';
import { cn } from '@/lib/utils';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import { ApplicationCardsSkeletonMobile } from '@/shared/components/ui/PageSkeletons';
import { useProviderTeam } from '@/features/provider/hooks/useProviderTeam';
import { mapApiTeamMemberToRow } from '@/features/provider/lib/mapTeamData';
import { providerApi } from '@/features/provider/services/providerApi';
import {
  DEFAULT_TEAM_HUB_FILTERS,
  filterByTeamHubFilters,
  sortTeamMembers,
  type InvitePayload,
  type TeamHubFilters,
  type TeamMemberRow,
} from './teamManagementData';
import {
  ExportTeamMembersModal,
  TeamHubModalLayer,
  handleTeamMemberAction,
  type TeamHubModal,
} from './TeamHubModals';
import { TeamMobileFilterMenu } from './TeamMobileFilterMenu';
import { RecentTeamActivityPanel, TeamPerformancePanel } from './TeamHubSections';
import { MobileTeamMemberCard } from './MobileTeamMemberCard';

export default function MobileView() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<TeamHubFilters>(DEFAULT_TEAM_HUB_FILTERS);
  const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hubModal, setHubModal] = useState<TeamHubModal | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const { members, stats, loading, error, refetch } = useProviderTeam();

  const filtered = useMemo(() => {
    const byFilters = filterByTeamHubFilters(members, filters);
    const searched = !search.trim()
      ? byFilters
      : byFilters.filter((m) => {
          const q = search.toLowerCase();
          return (
            m.name.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q) ||
            m.department.toLowerCase().includes(q)
          );
        });
    return sortTeamMembers(searched, sort);
  }, [members, search, filters, sort]);

  const { page, pageSize, total, pageItems, goToPage, changePageSize, setPage } = usePagination(
    filtered,
    5,
  );

  useEffect(() => {
    setPage(1);
  }, [search, filters, sort, setPage]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');

  function toggleAll() {
    if (selected.size === pageItems.length) setSelected(new Set());
    else setSelected(new Set(pageItems.map((m) => m.id)));
  }

  function handleAction(member: TeamMemberRow, label: string) {
    handleTeamMemberAction(member, label, setHubModal, () => router.push(`/team/${member.id}`));
  }

  async function handleInvite(payload: InvitePayload & { notes?: string }) {
    const created = await providerApi.inviteTeamMember({
      email: payload.email,
      name: payload.name,
      role: payload.role,
      department: payload.department,
      notes: payload.notes,
    });
    await refetch();
    return {
      ...payload,
      ...(created && typeof created === 'object' ? mapApiTeamMemberToRow(created as never) : {}),
      email: payload.email,
      name: payload.name,
      role: payload.role,
      department: payload.department,
      avatar: payload.avatar,
    };
  }

  const modalHandlers = {
    onInvite: handleInvite,
    onResend: async (member: TeamMemberRow) => {
      await providerApi.resendTeamInvite(member.id);
      await refetch();
      return {
        email: member.email,
        name: member.name,
        role: member.role,
        department: member.department,
        avatar: member.avatar,
      };
    },
    onCancelInvite: async (member: TeamMemberRow) => {
      await providerApi.cancelTeamInvite(member.id);
      await refetch();
    },
    onSaveRole: async (
      member: TeamMemberRow,
      payload: { role: string; title?: string; permissions: string[] },
    ) => {
      await providerApi.updateTeamMember(member.id, {
        role: payload.role,
        title: payload.title,
        permissions: payload.permissions,
      });
      await refetch();
    },
    onSuspend: async (member: TeamMemberRow) => {
      await providerApi.suspendTeamMember(member.id);
      await refetch();
    },
    onActivate: async (member: TeamMemberRow) => {
      await providerApi.activateTeamMember(member.id);
      await refetch();
    },
    onRemove: async (member: TeamMemberRow) => {
      await providerApi.removeTeamMember(member.id);
      await refetch();
    },
  };

  return (
    <div className="flex flex-col pb-4">
      {error ? (
        <p className="mb-3 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}

      <MobileHubPageHero
        title="Providers Team"
        subtitle="Manage your organization's members, roles and permissions"
        action={
          <button
            type="button"
            onClick={() => setHubModal({ type: 'invite' })}
            className="inline-flex h-[45px] w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-base font-medium text-[#2F66C8]"
          >
            <UserPlus className="h-[18px] w-[18px]" strokeWidth={1.75} />
            Invite Team Member
          </button>
        }
      />

      <section className="py-5">
        {loading ? (
          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[158px] animate-pulse rounded-[8px] border border-[#EEF2F8] bg-white" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex h-[158px] flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4"
                >
                  <span className={cn('flex h-8 w-8 items-center justify-center rounded-2xl', stat.iconBg)}>
                    <Icon className={cn('h-4 w-4', stat.iconColor)} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs leading-none text-[#44516A]">{stat.label}</p>
                    <p className="mt-1.5 text-2xl font-bold leading-none text-[#0F172A]">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                    {stat.subtext ? (
                      <span className="mt-1.5 block text-[10px] leading-none text-[#8C97AD]">{stat.subtext}</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="relative flex items-center gap-2.5">
        <div className="anchor-search-field min-w-0 flex-1">
          <Search className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" aria-hidden />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team members..."
            className="no-anchor-field min-w-0 flex-1 bg-transparent font-sans text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen((open) => !open)}
          className={cn(
            'inline-flex h-[45px] shrink-0 items-center justify-center gap-2 rounded-[6px] px-3 text-sm font-medium',
            hasActiveFilters || filterOpen ? 'bg-[#EFF4FF] text-[#2F66C8]' : 'bg-[#F8FAFC] text-[#2F66C8]',
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
        <TeamMobileFilterMenu
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          value={filters}
          onChange={setFilters}
        />
      </div>

      <div className="mt-5 flex items-center justify-between rounded-[10px] border border-[#EEF2F8] px-5 py-2.5">
        <div className="flex items-center gap-3.5">
          <input
            type="checkbox"
            checked={pageItems.length > 0 && selected.size === pageItems.length}
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
        <HubSortSelect value={sort} onChange={setSort} className="shrink-0" />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {loading ? (
          <ApplicationCardsSkeletonMobile count={4} />
        ) : pageItems.length === 0 ? (
          <p className="text-sm text-[#8C97AD]">No team members yet. Invite your first member.</p>
        ) : (
          pageItems.map((member) => (
            <MobileTeamMemberCard key={member.id} member={member} onAction={handleAction} />
          ))
        )}
      </div>

      <ListPagination
        compact
        className="mt-5"
        page={page}
        pageSize={pageSize}
        total={total}
        noun="members"
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />

      <div className="mt-5 flex flex-col gap-5">
        <RecentTeamActivityPanel />
        <TeamPerformancePanel />
      </div>

      <TeamHubModalLayer
        modal={hubModal}
        onClose={() => setHubModal(null)}
        onSetModal={setHubModal}
        {...modalHandlers}
      />
      <ExportTeamMembersModal open={exportOpen} onClose={() => setExportOpen(false)} rows={filtered} />
    </div>
  );
}
