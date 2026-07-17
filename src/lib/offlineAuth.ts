import type { AuthUser } from '@/features/auth/types';
import { resolveDevLoginEmail } from '@/lib/staticMode';
import {
  GUEST_PROVIDER_TOKEN,
  isOfflineProviderSession,
  LOCAL_PROVIDER_TOKEN,
} from '@/lib/providerSession';
import { useAuthStore } from '@/store/authStore';

export const DEFAULT_OFFLINE_PROVIDER: AuthUser = {
  id: 'guest-provider-001',
  name: 'Guest Provider',
  email: 'guest@provider.anchorcanada.ca',
  role: 'provider',
};

export type OfflineSessionOptions = {
  email?: string;
  name?: string;
  /** Prefer a local onboarding session token when restoring from registration. */
  token?: typeof GUEST_PROVIDER_TOKEN | typeof LOCAL_PROVIDER_TOKEN;
};

function buildOfflineUser(options: OfflineSessionOptions = {}): AuthUser {
  const email = resolveDevLoginEmail(
    options.email?.trim() || DEFAULT_OFFLINE_PROVIDER.email,
  );
  const name =
    options.name?.trim() ||
    email.split('@')[0] ||
    DEFAULT_OFFLINE_PROVIDER.name;

  return {
    id: `provider-${email.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
    name,
    email,
    role: 'provider',
  };
}

/** Create / replace the in-memory auth session used while APIs are unavailable. */
export function establishOfflineSession(
  options: OfflineSessionOptions = {},
): { user: AuthUser; token: string } {
  const user = buildOfflineUser(options);
  const token = options.token ?? GUEST_PROVIDER_TOKEN;
  useAuthStore.getState().setAuth(user, token);
  return { user, token };
}

/**
 * Ensures a usable offline session exists.
 * Repairs half-hydrated persist state (token without user, or vice versa).
 * Returns whether a session is now active.
 */
export function ensureOfflineSession(
  options: OfflineSessionOptions = {},
): boolean {
  const { user, token, isAuthenticated } = useAuthStore.getState();

  if (isAuthenticated && user && isOfflineProviderSession(token)) {
    return true;
  }

  if (isAuthenticated && user && token) {
    return true;
  }

  establishOfflineSession({
    email: options.email ?? user?.email,
    name: options.name ?? user?.name,
    token: options.token,
  });

  return true;
}

export function createOfflineAuthResponse(email: string, name?: string) {
  return establishOfflineSession({ email, name });
}
