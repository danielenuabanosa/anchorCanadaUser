'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TeamRoleId } from '@/features/onboarding/lib/teamData';

export type ProviderJourney = 'publish' | 'explore';

export interface TeamMember {
  id: string;
  fullName?: string;
  email: string;
  role: TeamRoleId | 'Editor';
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
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
  organizationSize: string;
  social: SocialLinks;
  logoUrl: string | null;
  coverUrl: string | null;
  verificationType: string | null;
  verificationEmail: string | null;
  verificationPhone: string | null;
  teamMembers: TeamMember[];
  setOnboardingData: (
    data: Partial<
      Omit<ProviderOnboardingState, 'setOnboardingData' | 'reset' | 'toPayload'>
    >,
  ) => void;
  toPayload: () => Record<string, unknown>;
  hydrateFromApi: (data: Record<string, unknown>) => void;
  reset: () => void;
}

const emptySocial: SocialLinks = {
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: '',
};

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
  organizationSize: '',
  social: { ...emptySocial },
  logoUrl: null as string | null,
  coverUrl: null as string | null,
  verificationType: null as string | null,
  verificationEmail: null as string | null,
  verificationPhone: null as string | null,
  teamMembers: [] as TeamMember[],
};

function pickString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export const useProviderOnboardingStore = create<ProviderOnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setOnboardingData: (data) =>
        set((state) => ({
          ...state,
          ...data,
          social: data.social ? { ...state.social, ...data.social } : state.social,
        })),
      toPayload: () => {
        const state = get();
        return {
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
          organizationSize: state.organizationSize,
          social: state.social,
          logoUrl: state.logoUrl,
          coverUrl: state.coverUrl,
          verificationType: state.verificationType,
          verificationEmail: state.verificationEmail ?? state.organizationEmail,
          verificationPhone: state.verificationPhone ?? state.organizationPhone,
          teamMembers: state.teamMembers,
        };
      },
      hydrateFromApi: (data) => {
        const social =
          data.social && typeof data.social === 'object'
            ? { ...emptySocial, ...(data.social as SocialLinks) }
            : emptySocial;
        set({
          journey:
            data.journey === 'publish' || data.journey === 'explore'
              ? data.journey
              : get().journey,
          organizationType: pickString(data.organizationType) || get().organizationType,
          categories: Array.isArray(data.categories)
            ? data.categories.map(String)
            : get().categories,
          organizationName: pickString(data.organizationName, get().organizationName),
          organizationEmail: pickString(data.organizationEmail, get().organizationEmail),
          organizationPhone: pickString(data.organizationPhone, get().organizationPhone),
          organizationWebsite: pickString(data.organizationWebsite, get().organizationWebsite),
          organizationAddress: pickString(data.organizationAddress, get().organizationAddress),
          organizationCity: pickString(data.organizationCity, get().organizationCity),
          organizationProvince: pickString(
            data.organizationProvince,
            get().organizationProvince,
          ),
          organizationDescription: pickString(
            data.organizationDescription,
            get().organizationDescription,
          ),
          organizationSize: pickString(data.organizationSize, get().organizationSize),
          social,
          logoUrl:
            typeof data.logoUrl === 'string' ? data.logoUrl : get().logoUrl,
          coverUrl:
            typeof data.coverUrl === 'string' ? data.coverUrl : get().coverUrl,
          verificationType: pickString(data.verificationType) || get().verificationType,
          verificationEmail:
            pickString(data.verificationEmail) || get().verificationEmail,
          verificationPhone:
            pickString(data.verificationPhone) || get().verificationPhone,
          teamMembers: Array.isArray(data.teamMembers)
            ? (data.teamMembers as TeamMember[])
            : get().teamMembers,
        });
      },
      reset: () => set({ ...initialState, social: { ...emptySocial } }),
    }),
    {
      name: 'anchor_provider_onboarding',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
