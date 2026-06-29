import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { clearStoredAuth, getStoredToken } from '@/lib/apiError';
import { isOfflineProviderSession } from '@/lib/providerSession';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const url = error.config?.url ?? '';
      const isSessionCheck = url.includes('/auth/me');
      const token = getStoredToken();

      if (isOfflineProviderSession(token)) {
        return Promise.reject(error);
      }

      if (!isSessionCheck && typeof window !== 'undefined') {
        clearStoredAuth();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
