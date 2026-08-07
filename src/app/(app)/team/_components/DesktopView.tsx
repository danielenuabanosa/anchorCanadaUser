'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Ellipsis, Plus } from 'lucide-react';
import { usePagination } from '@/lib/pagination';
import { cn } from '@/lib/utils';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { HubFilterBar } from '@/shared/components/hub/HubFilterBar';
import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import { ListPagination } from '@/shared/components/ui/ListPagination';
import { TableRowsSkeleton } from '@/shared/components/ui/PageSkeletons';
import { useProviderTeam } from '@/features/provider/hooks/useProviderTeam';
import { mapApiTeamMemberToRow } from '@/features/provider/lib/mapTeamData';
import { providerApi } from '@/features/provider/services/providerApi';
import {
  DEFAULT_TEAM_HUB_FILTERS,
  ROLE_STYLES,
  STATUS_STYLES,
  TEAM_DEPARTMENT_FILTER_OPTIONS,
  TEAM_ROLE_FILTER_OPTIONS,
  TEAM_STATUS_FILTER_OPTIONS,
  filterByTeamHubFilters,
  sortTeamMembers,
  type InvitePayload,
  type TeamHubFilters,
  type TeamMemberRow,
} from './teamManagementData';
import {
  ExportTeamMembersModal,
  MemberActionsMenu,
  TeamHubModalLayer,
  handleTeamMemberAction,
  type TeamHubModal,
} from './TeamHubModals';
import { TeamHubBottomSections } from './TeamHubSections';

export default function DesktopView() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<TeamHubFilters>(DEFAULT_TEAM_HUB_FILTERS);
  const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hubModal, setHubModal] = useState<TeamHubModal | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [menuMemberId, setMenuMemberId] = useState<string | null>(null);
  const router = useRouter();
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
            m.department.toLowerCase().includes(q) ||
            m.role.toLowerCase().includes(q)
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

  function setFilter<K extends keyof TeamHubFilters>(key: K, value: TeamHubFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === pageItems.length) setSelected(new Set());
    else setSelected(new Set(pageItems.map((r) => r.id)));
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

  return (
    <div className="flex flex-col gap-5">
      {error ? (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}

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
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[158px] animate-pulse rounded-[8px] border border-[#EEF2F8] bg-white" />
            ))
          : stats.map((stat) => <HubStatCard key={stat.label} {...stat} />)}
      </div>

      <HubFilterBar
        searchPlaceholder="Search team members..."
        searchValue={search}
        onSearchChange={setSearch}
        onClear={() => {
          setFilters(DEFAULT_TEAM_HUB_FILTERS);
          setSearch('');
        }}
        filterMenus={[
          {
            id: 'role',
            label: 'All Roles',
            value: filters.role,
            options: [...TEAM_ROLE_FILTER_OPTIONS],
            onChange: (value) => setFilter('role', value),
          },
          {
            id: 'status',
            label: 'All Statuses',
            value: filters.status,
            options: [...TEAM_STATUS_FILTER_OPTIONS],
            onChange: (value) => setFilter('status', value),
          },
          {
            id: 'department',
            label: 'All Departments',
            value: filters.department,
            options: [...TEAM_DEPARTMENT_FILTER_OPTIONS],
            onChange: (value) => setFilter('department', value),
          },
        ]}
      />

      <div className="overflow-visible rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-2.5">
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
                Export Team Members
              </button>
            ) : null}
          </div>
          <HubSortSelect value={sort} onChange={setSort} />
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
          {loading ? (
            <TableRowsSkeleton rows={5} />
          ) : pageItems.length === 0 ? (
            <p className="py-8 text-sm text-[#8C97AD]">No team members yet. Invite your first member.</p>
          ) : (
            pageItems.map((member) => (
              <div
                key={member.id}
                className={cn(
                  'grid grid-cols-1 gap-3 border-b border-[#EEF2F8] py-0 last:border-b-0 md:grid-cols-[40px_1.4fr_140px_140px_140px_140px_1fr_100px] md:items-center md:gap-2.5 md:py-0',
                  menuMemberId === member.id && 'relative z-50',
                )}
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
                  <Image
                    src={member.avatar}
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={typeof member.avatar === 'string'}
                    className="h-10 w-10 rounded-full object-cover"
                  />
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
                <div className="relative flex h-[60px] items-center">
                  <button
                    type="button"
                    onClick={() => setMenuMemberId(menuMemberId === member.id ? null : member.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white p-1.5 text-[#44516A]"
                  >
                    <Ellipsis className="h-[18px] w-[18px]" />
                  </button>
                  <MemberActionsMenu
                    open={menuMemberId === member.id}
                    member={member}
                    onClose={() => setMenuMemberId(null)}
                    onAction={(label) => handleAction(member, label)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <ListPagination
          page={page}
          pageSize={pageSize}
          total={total}
          noun="members"
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
        />
      </div>

      <TeamHubBottomSections />

      <TeamHubModalLayer
        modal={hubModal}
        onClose={() => setHubModal(null)}
        onSetModal={setHubModal}
        onInvite={handleInvite}
        onResend={async (member) => {
          await providerApi.resendTeamInvite(member.id);
          await refetch();
          return {
            email: member.email,
            name: member.name,
            role: member.role,
            department: member.department,
            avatar: member.avatar,
          };
        }}
        onCancelInvite={async (member) => {
          await providerApi.cancelTeamInvite(member.id);
          await refetch();
        }}
        onSaveRole={async (member, payload) => {
          await providerApi.updateTeamMember(member.id, {
            role: payload.role,
            title: payload.title,
            permissions: payload.permissions,
          });
          await refetch();
        }}
        onSuspend={async (member) => {
          await providerApi.suspendTeamMember(member.id);
          await refetch();
        }}
        onActivate={async (member) => {
          await providerApi.activateTeamMember(member.id);
          await refetch();
        }}
        onRemove={async (member) => {
          await providerApi.removeTeamMember(member.id);
          await refetch();
        }}
      />
      <ExportTeamMembersModal open={exportOpen} onClose={() => setExportOpen(false)} rows={filtered} />
    </div>
  );
}
