'use client';

import { useCallback, useEffect, useState } from 'react';
import { providerApi } from '@/features/provider/services/providerApi';
import {
  buildTeamHubStats,
  mapApiTeamMemberToRow,
  type ApiTeamResponse,
} from '@/features/provider/lib/mapTeamData';
import {
  TEAM_MEMBERS,
  TEAM_STATS,
  type TeamMemberRow,
  type TeamStat,
} from '@/app/(app)/team/_components/teamManagementData';
import { isStaticMode } from '@/lib/staticMode';

export function useProviderTeam() {
  const [members, setMembers] = useState<TeamMemberRow[]>(() =>
    isStaticMode() ? TEAM_MEMBERS.map((row) => ({ ...row })) : [],
  );
  const [stats, setStats] = useState<TeamStat[]>(() =>
    isStaticMode() ? TEAM_STATS : [],
  );
  const [loading, setLoading] = useState(!isStaticMode());
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (isStaticMode()) {
      setMembers(TEAM_MEMBERS.map((row) => ({ ...row })));
      setStats(TEAM_STATS);
      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = (await providerApi.getTeam()) as ApiTeamResponse;
      setMembers((data.members ?? []).map(mapApiTeamMemberToRow));
      setStats(buildTeamHubStats(data.stats));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load team.');
      setMembers([]);
      setStats(buildTeamHubStats({
        total: 0,
        active: 0,
        pending: 0,
        administrators: 0,
        reviewers: 0,
        interviewers: 0,
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { members, setMembers, stats, loading, error, refetch: load };
}
