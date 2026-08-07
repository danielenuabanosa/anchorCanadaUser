'use client';

import { useCallback, useEffect, useState } from 'react';
import { providerApi } from '@/features/provider/services/providerApi';
import {
  mapApiApplicationToDetail,
  type ApiApplicationDetail,
} from '@/features/provider/lib/mapApplicationDetail';
import {
  getApplicationDetail,
  type ApplicationDetail,
} from '@/app/(app)/applications/[id]/_components/applicationDetailData';
import { isStaticMode } from '@/lib/staticMode';

export function useApplicationDetail(applicationId: string) {
  const [data, setData] = useState<ApplicationDetail | null>(() =>
    isStaticMode() ? getApplicationDetail(applicationId) : null,
  );
  const [loading, setLoading] = useState(!isStaticMode());
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (isStaticMode()) {
      setData(getApplicationDetail(applicationId));
      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const raw = (await providerApi.getApplication(applicationId)) as ApiApplicationDetail | null;
      if (!raw) {
        setData(null);
        setError('Application not found.');
        return;
      }
      setData(mapApiApplicationToDetail(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load application.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, refetch: load, setData };
}
