'use client';

import { useEffect, useState } from 'react';
import { providerApi } from '@/features/provider/services/providerApi';
import {
  mapApiApplicationToRow,
  mapApiOpportunityToRow,
  type ApiProviderApplication,
  type ApiProviderOpportunity,
} from '@/features/provider/lib/mapHubData';
import type { ApplicantRow } from '@/app/(app)/applications/_components/applicationsHubData';
import type { OpportunityRow } from '@/app/(app)/opportunities/_components/opportunitiesHubData';

export function useProviderOpportunities() {
  const [rows, setRows] = useState<OpportunityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = (await providerApi.listOpportunities()) as ApiProviderOpportunity[];
        if (cancelled) return;
        setRows(data.map(mapApiOpportunityToRow));
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Could not load opportunities.');
        setRows([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { rows, setRows, loading, error };
}

export function useProviderApplications() {
  const [rows, setRows] = useState<ApplicantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = (await providerApi.listApplications()) as ApiProviderApplication[];
        if (cancelled) return;
        setRows(data.map(mapApiApplicationToRow));
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Could not load applications.');
        setRows([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { rows, loading, error };
}
