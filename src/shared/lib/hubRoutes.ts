/** Routes that use the opportunity-management hub shell (topbar, padding, background). */
export const PROVIDER_HUB_ROUTES = [
  '/opportunities',
  '/applications',
  '/categories',
  '/team',
  '/analytics',
  '/notifications',
  '/help',
  '/organization-profile',
] as const;

export function isProviderHubRoute(pathname: string): boolean {
  return PROVIDER_HUB_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function usesOpportunityManagementTopbar(pathname: string): boolean {
  if (pathname.startsWith('/opportunities/create')) return false;
  return isProviderHubRoute(pathname);
}

export function isHubListPage(pathname: string): boolean {
  return PROVIDER_HUB_ROUTES.includes(pathname as (typeof PROVIDER_HUB_ROUTES)[number]);
}
