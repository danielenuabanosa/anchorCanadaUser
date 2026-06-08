import apiClient from '@/lib/api';
import type { UserProfile, UpdateProfileDto } from '../types';

export const profileService = {
  async get(): Promise<UserProfile> {
    const { data } = await apiClient.get<UserProfile>('/profile');
    return data;
  },

  async update(dto: UpdateProfileDto): Promise<UserProfile> {
    const { data } = await apiClient.patch<UserProfile>('/profile', dto);
    return data;
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const form = new FormData();
    form.append('avatar', file);
    const { data } = await apiClient.post<{ avatarUrl: string }>('/profile/avatar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
