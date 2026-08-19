'use client';

import { useAuthStore } from '@/store/authStore';
import { memberCan } from '@/features/provider/lib/permissions';

export function useProviderAccess() {
  const membership = useAuthStore((s) => s.user?.provider?.membership);

  function can(permission: string) {
    if (!membership) return true;
    return memberCan(
      {
        isOwner: membership.isOwner,
        role: membership.role,
        permissions: membership.permissions,
        status: membership.status,
      },
      permission,
    );
  }

  return {
    can,
    isOwner: Boolean(membership?.isOwner),
    role: membership?.role ?? 'administrator',
    permissions: membership?.permissions ?? [],
  };
}
