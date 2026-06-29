import type { AuthUser } from '@/features/auth/types';
import { useAuthStore } from '@/store/authStore';
import { useProviderOnboardingStore } from '@/store/onboardingStore';

export const LOCAL_PROVIDER_TOKEN = 'local-provider-session';
export const GUEST_PROVIDER_TOKEN = 'guest-token-provider-2026';

export function isOfflineProviderSession(token: string | null | undefined): boolean {
  if (!token) return false;
  return token === LOCAL_PROVIDER_TOKEN || token === GUEST_PROVIDER_TOKEN;
}

/** Lets providers enter the dashboard after onboarding without a backend account yet. */
export function establishOnboardingSession() {
  const onboarding = useProviderOnboardingStore.getState();
  const user: AuthUser = {
    id: 'local-provider',
    name: onboarding.organizationName.trim() || 'Your Organization',
    email: onboarding.organizationEmail.trim() || 'provider@anchorcanada.local',
    role: 'provider',
  };
  useAuthStore.getState().setAuth(user, LOCAL_PROVIDER_TOKEN);
}
