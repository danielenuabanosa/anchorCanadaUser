export const PROVIDER_PERMISSIONS = {
  OPP_CREATE: 'Opportunities:Create Opportunities',
  OPP_EDIT: 'Opportunities:Edit Opportunities',
  OPP_DELETE: 'Opportunities:Delete Opportunities',
  OPP_PUBLISH: 'Opportunities:Publish Opportunities',
  OPP_ARCHIVE: 'Opportunities:Archive Opportunities',
  OPP_ANALYTICS: 'Opportunities:View Opportunity Analytics',
  APP_REVIEW: 'Applications:Review Applications',
  APP_SHORTLIST: 'Applications:Shortlist Applications',
  APP_INTERVIEW: 'Applications:Schedule Interviews',
  APP_ACCEPT: 'Applications:Accept Applications',
  APP_REJECT: 'Applications:Reject Applications',
  APP_EXPORT: 'Applications:Export Applications',
  ORG_TEAM: 'Organization:Manage Team Members',
  ORG_ANALYTICS: 'Organization:View Analytics',
  ORG_PROFILE: 'Organization:Manage Organization Profile',
  ORG_SETTINGS: 'Organization:Manage Settings',
  ORG_BILLING: 'Organization:Manage Billings',
} as const;

export function isElevatedProviderRole(role?: string | null) {
  const value = String(role ?? '').toLowerCase();
  return value === 'administrator' || value === 'manager' || value === 'owner';
}

export function memberCan(
  input: {
    isOwner?: boolean;
    role?: string | null;
    permissions?: string[] | null;
    status?: string | null;
  },
  permission: string,
) {
  if (input.status && input.status !== 'active' && input.status !== undefined) return false;
  if (input.isOwner || isElevatedProviderRole(input.role)) return true;
  const keys = Array.isArray(input.permissions) ? input.permissions : [];
  if (keys.length === 0) return false;
  return keys.includes(permission);
}

export const ROUTE_PERMISSIONS: Array<{ prefix: string; permission: string }> = [
  { prefix: '/opportunities', permission: PROVIDER_PERMISSIONS.OPP_CREATE },
  { prefix: '/applications', permission: PROVIDER_PERMISSIONS.APP_REVIEW },
  { prefix: '/analytics', permission: PROVIDER_PERMISSIONS.ORG_ANALYTICS },
  { prefix: '/team', permission: PROVIDER_PERMISSIONS.ORG_TEAM },
  { prefix: '/organization-profile', permission: PROVIDER_PERMISSIONS.ORG_PROFILE },
  { prefix: '/settings', permission: PROVIDER_PERMISSIONS.ORG_SETTINGS },
];

export function permissionForPath(pathname: string): string | null {
  const match = ROUTE_PERMISSIONS.find((row) => pathname === row.prefix || pathname.startsWith(`${row.prefix}/`));
  return match?.permission ?? null;
}
