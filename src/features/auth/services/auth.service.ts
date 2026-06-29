import apiClient from '@/lib/api';
import { getApiErrorMessage, getStoredToken } from '@/lib/apiError';
import type { AuthResponse, LoginDto, RegisterResult } from '../types';

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', dto);
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Login failed.'));
    }
  },

  async register(dto: {
    name: string;
    email: string;
    password: string;
    role: 'provider';
  }): Promise<RegisterResult> {
    try {
      const { data } = await apiClient.post<RegisterResult>('/auth/register', dto);
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Registration failed.'));
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Clearing local auth state is enough for the client.
    }
  },

  async me(): Promise<AuthResponse['user'] | null> {
    const session = await authService.getSession();
    return session?.user ?? null;
  },

  async getSession(): Promise<AuthResponse | null> {
    if (!getStoredToken()) return null;

    try {
      const { data } = await apiClient.get<AuthResponse>('/auth/me');
      return data;
    } catch {
      return null;
    }
  },

  async verifyEmailOtp(email: string, token: string): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/verify-otp', { email, token });
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Verification failed.'));
    }
  },

  async resendSignupOtp(email: string): Promise<void> {
    try {
      await apiClient.post('/auth/resend-otp', { email });
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Could not resend code.'));
    }
  },
};
