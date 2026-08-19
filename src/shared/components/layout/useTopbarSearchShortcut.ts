'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Focus the desktop topbar search input on ⌘/Ctrl+K (matches user panel). */
export function useTopbarSearchShortcut(fallbackPath = '/opportunities') {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          'header form input[aria-label^="Search"]',
        );
        if (input) {
          input.focus();
          input.select();
        } else {
          router.push(fallbackPath);
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router, fallbackPath]);
}
