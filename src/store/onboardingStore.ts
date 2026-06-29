'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ProviderJourney = 'publish' | 'explore';

export interface TeamMember {
  id: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

export interface ProviderOnboardingState {
  journey: ProviderJourney | null;
  organizationType: string | null;
  categories: string[];
  organizationName: string;
  organizationEmail: string;
  organizationPhone: string;
  organizationWebsite: string;
  organizationAddress: string;
  organizationCity: string;
  organizationProvince: string;
  organizationDescription: string;
  verificationEmail: string | null;
  verificationPhone: string | null;
  teamMembers: TeamMember[];
  setOnboardingData: (
    data: Partial<
      Pick<
        ProviderOnboardingState,
        | 'journey'
        | 'organizationType'
        | 'categories'
        | 'organizationName'
        | 'organizationEmail'
        | 'organizationPhone'
        | 'organizationWebsite'
        | 'organizationAddress'
        | 'organizationCity'
        | 'organizationProvince'
        | 'organizationDescription'
        | 'verificationEmail'
        | 'verificationPhone'
        | 'teamMembers'
      >
    >,
  ) => void;
  reset: () => void;
}

const initialState = {
  journey: null as ProviderJourney | null,
  organizationType: null as string | null,
  categories: [] as string[],
  organizationName: '',
  organizationEmail: '',
  organizationPhone: '',
  organizationWebsite: '',
  organizationAddress: '',
  organizationCity: '',
  organizationProvince: '',
  organizationDescription: '',
  verificationEmail: null as string | null,
  verificationPhone: null as string | null,
  teamMembers: [] as TeamMember[],
};

export const useProviderOnboardingStore = create<ProviderOnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setOnboardingData: (data) => set((state) => ({ ...state, ...data })),
      reset: () => set(initialState),
    }),
    {
      name: 'anchor_provider_onboarding',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
