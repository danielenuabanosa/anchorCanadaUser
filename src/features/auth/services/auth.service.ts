import apiClient from '@/lib/api';
import { getApiErrorMessage, getStoredToken } from '@/lib/apiError';
import { isStaticMode } from '@/lib/staticMode';
import {
  establishOnboardingSession,
  GUEST_PROVIDER_TOKEN,
  isOfflineProviderSession,
} from '@/lib/providerSession';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponse, LoginDto, RegisterResult } from '../types';

function staticAuthResponse(email: string, name?: string): AuthResponse {
  const user = useAuthStore.getState().user;
  return {
    user: {
      id: user?.id ?? 'guest-provider-001',
      name: name ?? user?.name ?? 'Guest Provider',
      email,
      role: 'provider',
      avatarUrl: user?.avatarUrl,
    },
    token: GUEST_PROVIDER_TOKEN,
  };
}

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    if (isStaticMode()) {
      const response = staticAuthResponse(dto.email);
      useAuthStore.getState().setAuth(response.user, response.token);
      return response;
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
      const response = staticAuthResponse(dto.email, dto.name);
      useAuthStore.getState().setAuth(response.user, response.token);
      return response;
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
