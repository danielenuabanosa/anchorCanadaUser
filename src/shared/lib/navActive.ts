/** Returns the URL hash without the leading `#`, or empty string when none. */
export function getRouteHash(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#/, '');
}

/**
 * Determines whether a nav link should appear active.
 * Dashboard hash links only highlight when their hash matches; `/dashboard` alone
 * highlights only the Dashboard item.
 */
export function isNavActive(pathname: string, href: string, hash = ''): boolean {
  if (href === '/login') return false;

  if (href === '/dashboard') {
    return pathname === '/dashboard' && hash === '';
  }

  if (href.startsWith('/dashboard#')) {
    const linkHash = href.slice('/dashboard#'.length);
    return pathname === '/dashboard' && hash === linkHash;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
