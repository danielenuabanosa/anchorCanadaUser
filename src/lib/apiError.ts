import axios from 'axios';

const STORAGE_KEY = 'anchor_provider_auth';
export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Cannot reach the API server. Check that the backend is running and that NEXT_PUBLIC_API_URL matches its port (e.g. http://localhost:4000/api).';
    }
    const data = error.response?.data as { error?: string } | undefined;
    return data?.error ?? error.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const { state } = JSON.parse(raw) as { state?: { token?: string } };
    return state?.token ?? null;
  } catch {
    return null;
  }
}

export function clearStoredAuth() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
