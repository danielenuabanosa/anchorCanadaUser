'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/** Syncs hub topbar search events + `?q=` URL param into list filters. */
export function useOpportunityHubSearch() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const [eventQuery, setEventQuery] = useState('');

  useEffect(() => {
    function onSearch(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setEventQuery(typeof detail === 'string' ? detail : '');
    }

    window.addEventListener('opp-hub-search', onSearch);
    return () => window.removeEventListener('opp-hub-search', onSearch);
  }, []);

  // Prefer live topbar typing; fall back to URL (e.g. after navigation / refresh).
  return eventQuery || urlQuery;
}
