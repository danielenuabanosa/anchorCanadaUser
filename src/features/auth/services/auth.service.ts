import apiClient from '@/lib/api';
import { getApiErrorMessage, getRawStoredToken } from '@/lib/apiError';
import { createOfflineAuthResponse } from '@/lib/offlineAuth';
import { isStaticMode } from '@/lib/staticMode';
import {
  establishOnboardingSession,
  GUEST_PROVIDER_TOKEN,
  isOfflineProviderSession,
} from '@/lib/providerSession';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import type { AuthResponse, LoginDto, RegisterResult } from '../types';

function toAuthResponse(email: string, name?: string): AuthResponse {
  const { user, token } = createOfflineAuthResponse(email, name);
  return { user, token };
}

/** False when the auth API is down, missing, or otherwise not ready. */
function apiClientIsReachable(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return true;
  if (!error.response) return false;

  const status = error.response.status;
  return status !== 404 && status !== 501 && status < 500;
}

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    if (isStaticMode()) {
      return toAuthResponse(dto.email);
    }

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
    if (isStaticMode()) {
      return toAuthResponse(dto.email, dto.name);
    }

    try {
      const { data } = await apiClient.post<RegisterResult>('/auth/register', dto);
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Registration failed.'));
    }
  },

  async logout(): Promise<void> {
    if (isStaticMode()) return;

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
    const rawToken = getRawStoredToken();
    if (!rawToken) return null;

    if (isStaticMode() || isOfflineProviderSession(rawToken)) {
      const user = useAuthStore.getState().user;
      if (!user) return null;
      return { user, token: rawToken };
    }

    try {
      const { data } = await apiClient.get<AuthResponse>('/auth/me');
      return data;
    } catch {
      return null;
    }
  },

  async verifyEmailOtp(email: string, _token: string): Promise<AuthResponse> {
    if (isStaticMode()) {
      establishOnboardingSession();
      const user = useAuthStore.getState().user!;
      return { user, token: GUEST_PROVIDER_TOKEN };
    }

    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/verify-otp', { email, token: _token });
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Verification failed.'));
    }
  },

  async resendSignupOtp(_email: string): Promise<void> {
    if (isStaticMode()) return;

    try {
      await apiClient.post('/auth/resend-otp', { email: _email });
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Could not resend code.'));
    }
  },

  async forgotPassword(email: string): Promise<void> {
    if (isStaticMode()) return;
    try {
      await apiClient.post('/auth/forgot-password', { email });
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Could not send recovery email.'));
    }
  },
};
