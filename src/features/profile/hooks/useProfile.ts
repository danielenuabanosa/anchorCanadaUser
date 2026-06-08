'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profile.service';
import { useAuthStore } from '@/store/authStore';
import type { UpdateProfileDto } from '../types';

export const PROFILE_KEYS = {
  me: ['profile', 'me'] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_KEYS.me,
    queryFn:  () => profileService.get(),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: (dto: UpdateProfileDto) => profileService.update(dto),
    onSuccess: (updated) => {
      qc.setQueryData(PROFILE_KEYS.me, updated);
      updateUser({ name: updated.name, avatarUrl: updated.avatarUrl });
    },
  });
}
