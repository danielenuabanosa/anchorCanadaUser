'use client';

import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { providerApi } from '@/features/provider/services/providerApi';
import { getApiErrorMessage, getStoredToken } from '@/lib/apiError';
import { isStaticMode } from '@/lib/staticMode';
import { establishOnboardingSession, isOfflineProviderSession } from '@/lib/providerSession';
import { useAuthStore } from '@/store/authStore';

const ROLE_MAP: Record<string, string> = {
  Admin: 'administrator',
  Editor: 'manager',
  Viewer: 'coordinator',
  Recruiter: 'reviewer',
  'Program Coordinator': 'coordinator',
  Administrator: 'administrator',
  Manager: 'manager',
  Reviewer: 'reviewer',
  Interviewer: 'interviewer',
  Coordinator: 'coordinator',
};

function mapInviteRole(role: string): string {
  return ROLE_MAP[role] ?? 'reviewer';
}

function hasRealSession(): boolean {
  const storeToken = useAuthStore.getState().token;
  if (storeToken && !isOfflineProviderSession(storeToken)) return true;
  return Boolean(getStoredToken());
}

export async function completeProviderOnboarding() {
  if (isStaticMode()) return;

  const payload = useProviderOnboardingStore.getState().toPayload();

  try {
    await providerApi.saveOnboarding(payload, {
      markComplete: true,
      submitVerification: true,
      step: 'activation',
    });

    try {
      await providerApi.submitOrganizationVerification({
        verificationType:
          typeof payload.verificationType === 'string'
            ? payload.verificationType
            : undefined,
      });
    } catch {
      // Already pending from saveOnboarding — non-fatal
    }

    const teamMembers = Array.isArray(payload.teamMembers)
      ? (payload.teamMembers as Array<{
          email?: string;
          fullName?: string;
          role?: string;
        }>)
      : [];

    for (const member of teamMembers) {
      const email = member.email?.trim();
      if (!email || !email.includes('@')) continue;
      try {
        await providerApi.inviteTeamMember({
          email,
          name: member.fullName?.trim() || email.split('@')[0],
          role: mapInviteRole(member.role ?? 'Viewer'),
        });
      } catch (inviteErr) {
        console.warn('Team invite failed during onboarding:', inviteErr);
      }
    }
  } catch (err) {
    throw new Error(getApiErrorMessage(err, 'Could not save onboarding to the server.'));
  }
}

/** Saves onboarding when signed in with a real account; otherwise requires login. */
export async function finishActivation(): Promise<void> {
  if (isStaticMode()) {
    establishOnboardingSession();
    return;
  }

  if (hasRealSession()) {
    await completeProviderOnboarding();
    return;
  }

  throw new Error(
    'Sign in or create your provider account before opening the dashboard.',
  );
}

/** Persist a draft of onboarding progress without marking complete or flipping verification. */
export async function saveOnboardingDraft(step?: string): Promise<void> {
  if (isStaticMode()) return;
  if (!hasRealSession()) return;

  const payload = useProviderOnboardingStore.getState().toPayload();
  await providerApi.saveOnboardingDraft(payload, step);
}

/** Load server onboarding state into the local store (when authenticated). */
export async function hydrateOnboardingFromApi(): Promise<void> {
  if (isStaticMode() || !hasRealSession()) return;
  try {
    const result = await providerApi.getOnboarding();
    if (result?.data && typeof result.data === 'object') {
      useProviderOnboardingStore.getState().hydrateFromApi(result.data as Record<string, unknown>);
    }
  } catch (err) {
    console.warn('Could not hydrate onboarding from API:', err);
  }
}
