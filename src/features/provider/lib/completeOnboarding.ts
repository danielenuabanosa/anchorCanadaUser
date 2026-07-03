'use client';

import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { providerApi } from '@/features/provider/services/providerApi';
import { getApiErrorMessage, getStoredToken } from '@/lib/apiError';
import { isStaticMode } from '@/lib/staticMode';
import {
  establishOnboardingSession,
  isOfflineProviderSession,
} from '@/lib/providerSession';

export async function completeProviderOnboarding() {
  if (isStaticMode()) return;

  const state = useProviderOnboardingStore.getState();
  const payload = {
    journey: state.journey,
    organizationType: state.organizationType,
    categories: state.categories,
    organizationName: state.organizationName,
    organizationEmail: state.organizationEmail,
    organizationPhone: state.organizationPhone,
    organizationWebsite: state.organizationWebsite,
    organizationAddress: state.organizationAddress,
    organizationCity: state.organizationCity,
    organizationProvince: state.organizationProvince,
    organizationDescription: state.organizationDescription,
    verificationEmail: state.verificationEmail,
    verificationPhone: state.verificationPhone,
    teamMembers: state.teamMembers,
  };

  try {
    await providerApi.saveOnboarding(payload, true);
  } catch (err) {
    throw new Error(getApiErrorMessage(err, 'Could not save onboarding to the server.'));
  }
}

/** Saves onboarding when signed in with a real account; otherwise opens a local dashboard session. */
export async function finishActivation(): Promise<void> {
  if (isStaticMode()) {
    establishOnboardingSession();
    return;
  }

  const token = getStoredToken();

  if (token && !isOfflineProviderSession(token)) {
    await completeProviderOnboarding();
    return;
  }

  establishOnboardingSession();
}
