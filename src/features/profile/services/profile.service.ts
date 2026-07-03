import apiClient from '@/lib/api';
import { isStaticMode } from '@/lib/staticMode';
import { buildMockProviderProfile } from '@/lib/mockData';
import { useAuthStore } from '@/store/authStore';
import type { UserProfile, UpdateProfileDto } from '../types';

export const profileService = {
  async get(): Promise<UserProfile> {
    if (isStaticMode()) {
      const user = useAuthStore.getState().user;
      return buildMockProviderProfile({
        name: user?.name ?? 'Guest Provider',
        email: user?.email ?? 'provider@anchorcanada.local',
        avatarUrl: user?.avatarUrl,
      });
    }

    const { data } = await apiClient.get<UserProfile>('/profile');
    return data;
  },

  async update(dto: UpdateProfileDto): Promise<UserProfile> {
    if (isStaticMode()) {
      const current = await profileService.get();
      return { ...current, ...dto };
    }

    const { data } = await apiClient.patch<UserProfile>('/profile', dto);
    return data;
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    if (isStaticMode()) {
      return { avatarUrl: URL.createObjectURL(file) };
    }

    const form = new FormData();
    form.append('avatar', file);
    const { data } = await apiClient.post<{ avatarUrl: string }>('/profile/avatar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
