'use client';

import { useEffect, useState } from 'react';
import { getRouteHash } from '@/shared/lib/navActive';

export function useRouteHash() {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(getRouteHash());
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return hash;
}
