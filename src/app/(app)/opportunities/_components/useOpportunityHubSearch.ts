'use client';

import { useEffect, useState } from 'react';

export function useOpportunityHubSearch() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    function onSearch(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setQuery(typeof detail === 'string' ? detail : '');
    }

    window.addEventListener('opp-hub-search', onSearch);
    return () => window.removeEventListener('opp-hub-search', onSearch);
  }, []);

  return query;
}
