'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { providerApi } from '@/features/provider/services/providerApi';
import { useAuthStore } from '@/store/authStore';
import { isStaticMode } from '@/lib/staticMode';

export const PROVIDER_MESSAGE_KEYS = {
  all: ['provider', 'messages'] as const,
  unread: () => [...PROVIDER_MESSAGE_KEYS.all, 'unread'] as const,
};

export const PROVIDER_NOTIFICATION_KEYS = {
  all: ['provider', 'notifications'] as const,
  unread: () => [...PROVIDER_NOTIFICATION_KEYS.all, 'unread'] as const,
};

export function useProviderUnreadMessageCount() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PROVIDER_MESSAGE_KEYS.unread(),
    queryFn: () => providerApi.unreadMessageCount(),
    enabled: isAuthenticated && !isStaticMode(),
    refetchInterval: 60_000,
    staleTime: 30_000,
    initialData: 0,
  });
}

export function useProviderUnreadNotificationCount() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PROVIDER_NOTIFICATION_KEYS.unread(),
    queryFn: () => providerApi.unreadNotificationCount(),
    enabled: isAuthenticated && !isStaticMode(),
    refetchInterval: 60_000,
    staleTime: 30_000,
    initialData: 0,
  });
}

export function useMarkProviderMessageThreadRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (applicationId: string) => providerApi.markApplicationMessagesRead(applicationId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: PROVIDER_MESSAGE_KEYS.all });
    },
  });
}
