import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import {
  clearStoredAuth,
  getStoredRefreshToken,
  getStoredToken,
} from '@/lib/apiError';
import { isOfflineProviderSession } from '@/lib/providerSession';
import { isStaticMode } from '@/lib/staticMode';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getStoredRefreshToken() ?? useAuthStore.getState().refreshToken;
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post<{
      user: unknown;
      token: string;
      refreshToken?: string;
    }>(`${BASE_URL}/auth/refresh`, { refreshToken }, { timeout: 15_000 });

    const user = useAuthStore.getState().user;
    if (user && data.token) {
      useAuthStore.getState().setAuth(user, data.token, data.refreshToken ?? refreshToken);
      return data.token;
    }
    return data.token ?? null;
  } catch {
    return null;
  }
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Prefer live store token; never attach offline/demo placeholders to the API.
  const storeToken = useAuthStore.getState().token;
  const token =
    storeToken && !isOfflineProviderSession(storeToken)
      ? storeToken
      : getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Let the browser set multipart boundary. Default application/json breaks FormData uploads.
  if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
    const headers = config.headers as {
      delete?: (name: string) => void;
      set?: (name: string, value: unknown) => void;
      [key: string]: unknown;
    };
    if (typeof headers.delete === 'function') {
      headers.delete('Content-Type');
      headers.delete('content-type');
    } else if (typeof headers.set === 'function') {
      headers.set('Content-Type', undefined);
    } else {
      delete headers['Content-Type'];
      delete headers['content-type'];
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetriableConfig | undefined;

    if (status === 401 && original && !original._retry) {
      const url = original.url ?? '';
      const isAuthEndpoint =
        url.includes('/auth/login') ||
        url.includes('/auth/register') ||
        url.includes('/auth/refresh') ||
        url.includes('/auth/forgot-password') ||
        url.includes('/auth/verify-otp');

      if (isStaticMode()) {
        return Promise.reject(error);
      }

      const token = useAuthStore.getState().token ?? getStoredToken();
      if (isOfflineProviderSession(token)) {
        useAuthStore.getState().clearAuth();
        clearStoredAuth();
        if (typeof window !== 'undefined' && !url.includes('/auth/me')) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      if (!isAuthEndpoint && !url.includes('/auth/me')) {
        original._retry = true;
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const nextToken = await refreshPromise;
        if (nextToken) {
          original.headers.Authorization = `Bearer ${nextToken}`;
          return apiClient(original);
        }

        useAuthStore.getState().clearAuth();
        clearStoredAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
