import apiClient from '@/lib/api';
import type { AuthResponse, LoginDto, RegisterDto } from '../types';

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', dto);
    return data;
  },

  async register(dto: Omit<RegisterDto, 'confirmPassword'>): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', dto);
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async me(): Promise<AuthResponse['user']> {
    const { data } = await apiClient.get<AuthResponse['user']>('/auth/me');
    return data;
  },
};
