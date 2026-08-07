import axios from 'axios';
import { isOfflineProviderSession } from '@/lib/providerSession';

const STORAGE_KEY = 'anchor_provider_auth';

type PersistedAuth = {
  state?: {
    token?: string | null;
    refreshToken?: string | null;
  };
};

function readPersistedAuth(): PersistedAuth['state'] | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PersistedAuth;
    return parsed.state ?? null;
  } catch {
    return null;
  }
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Cannot reach the API server. Check that the backend is running and that NEXT_PUBLIC_API_URL matches its port (e.g. http://localhost:4000/api).';
    }
    if (error.response.status === 401) {
      const data = error.response.data as { error?: string } | undefined;
      return data?.error ?? 'Your session expired. Please sign in again.';
    }
    if (error.response.status === 503) {
      const data = error.response.data as { error?: string } | undefined;
      return (
        data?.error ??
        'Authentication service is temporarily unavailable. Check your connection and try again.'
      );
    }
    const data = error.response?.data as { error?: string } | undefined;
    return data?.error ?? error.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

/** Real JWT only — never returns offline/demo session tokens. */
export function getStoredToken(): string | null {
  const token = readPersistedAuth()?.token ?? null;
  if (!token || isOfflineProviderSession(token)) return null;
  return token;
}

export function getStoredRefreshToken(): string | null {
  return readPersistedAuth()?.refreshToken ?? null;
}

/** Raw token including offline placeholders (for session-mode checks). */
export function getRawStoredToken(): string | null {
  return readPersistedAuth()?.token ?? null;
}

export function clearStoredAuth() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
