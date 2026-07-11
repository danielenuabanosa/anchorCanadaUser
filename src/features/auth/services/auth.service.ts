import apiClient from '@/lib/api';
import { getApiErrorMessage, getStoredToken } from '@/lib/apiError';
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
      // While the backend is unavailable, fall back to an offline session
      // instead of trapping the user on the login screen.
      if (!apiClientIsReachable(error)) {
        return toAuthResponse(dto.email);
      }
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
      if (!apiClientIsReachable(error)) {
        return toAuthResponse(dto.email, dto.name);
      }
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
    const token = getStoredToken();
    if (!token) return null;

    if (isStaticMode() || isOfflineProviderSession(token)) {
      const user = useAuthStore.getState().user;
      if (!user) return null;
      return { user, token };
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
};
