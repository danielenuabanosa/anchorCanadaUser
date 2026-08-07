'use client';

import { useCallback, useEffect, useState } from 'react';
import { registeredProvidersService } from '../services/registeredProviders.service';
import type {
  ProviderDirectoryItem,
  ProviderFacets,
  ProviderListParams,
} from '../types';

export function useRegisteredProviders(params: ProviderListParams = {}) {
  const [providers, setProviders] = useState<ProviderDirectoryItem[]>([]);
  const [facets, setFacets] = useState<ProviderFacets>({
    industries: [],
    provinces: [],
    orgTypes: [],
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryKey = JSON.stringify(params);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await registeredProvidersService.list(params);
      setProviders(result.providers);
      setFacets(result.facets);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load providers');
      setProviders([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- params serialized via queryKey
  }, [queryKey]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { providers, facets, total, loading, error, reload };
}
