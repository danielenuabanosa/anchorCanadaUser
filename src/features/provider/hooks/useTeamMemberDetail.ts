'use client';

import { useCallback, useEffect, useState } from 'react';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import type { TeamMemberStatus } from '@/app/(app)/team/_components/teamManagementData';
import {
  getAdjacentMemberIds as getMockAdjacent,
  getTeamMemberDetail as getMockDetail,
  type TeamMemberDetail,
} from '@/app/(app)/team/[id]/_components/teamMemberDetailData';

type ApiMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  title?: string;
  department?: string;
  status: TeamMemberStatus | string;
  lastActive?: string;
  permissions?: string;
  createdAt?: string;
  avatarUrl?: string | null;
};

function asStatus(status: string): TeamMemberStatus {
  if (status === 'Active' || status === 'Pending Invite' || status === 'Suspended') return status;
  if (status === 'active') return 'Active';
  if (status === 'pending') return 'Pending Invite';
  if (status === 'suspended') return 'Suspended';
  return 'Active';
}

function mapApiMember(api: ApiMember): TeamMemberDetail {
  const joined = api.createdAt
    ? `Joined ${new Date(api.createdAt).toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`
    : 'Joined recently';

  return {
    id: api.id,
    name: api.name,
    email: api.email,
    role: api.role,
    title: api.title || api.role,
    department: api.department || '—',
    status: asStatus(String(api.status)),
    lastActive: api.lastActive || '—',
    permissions: api.permissions || 'Role-based access',
    avatar: api.avatarUrl || '',
    phone: '—',
    location: '—',
    joined,
    about: `${api.name} contributes as ${api.role} on the provider team.`,
    permissionLevel: api.permissions || 'Role-based access',
    departmentShort: api.department || 'Operations',
    localTime: '—',
    reportingTo: { name: 'Organization Owner', title: 'Owner', avatar: '' },
    stats: {
      applicationsReviewed: 0,
      interviewsConducted: 0,
      avgReviewTime: '—',
    },
    activity: [
      { label: 'Last active', date: api.lastActive || 'Recently' },
      { label: 'Joined organization', date: joined.replace(/^Joined\s/, '') },
    ],
  };
}

export function useTeamMemberDetail(memberId: string) {
  const [data, setData] = useState<TeamMemberDetail>(() => getMockDetail(memberId));
  const [prev, setPrev] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isStaticMode());
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (isStaticMode()) {
      setData(getMockDetail(memberId));
      const adj = getMockAdjacent(memberId);
      setPrev(adj.prev);
      setNext(adj.next);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const [member, team] = await Promise.all([
        providerApi.getTeamMember(memberId) as Promise<ApiMember>,
        providerApi.getTeam() as Promise<{ members?: ApiMember[] }>,
      ]);
      const roster = (team.members ?? []).map((m) => m.id);
      setData(mapApiMember(member));
      const idx = roster.indexOf(memberId);
      setPrev(idx > 0 ? roster[idx - 1]! : null);
      setNext(idx >= 0 && idx < roster.length - 1 ? roster[idx + 1]! : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load team member.');
      setData(getMockDetail(memberId));
      const adj = getMockAdjacent(memberId);
      setPrev(adj.prev);
      setNext(adj.next);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, prev, next, loading, error, refetch: load };
}
