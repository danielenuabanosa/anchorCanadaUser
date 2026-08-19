'use client';

import { create } from 'zustand';
import { providerApi } from '@/features/provider/services/providerApi';
import { useAuthStore } from '@/store/authStore';

interface OrgBrandingState {
  logoUrl: string | null;
  organizationName: string;
  registrationNumber: string;
  verificationStatus: string;
  profileComplete: number;
  adminNote: string;
  loaded: boolean;
  load: () => Promise<void>;
  setLogoUrl: (url: string | null) => void;
}

export const useOrgBrandingStore = create<OrgBrandingState>((set) => ({
  logoUrl: null,
  organizationName: '',
  registrationNumber: '',
  verificationStatus: '',
  profileComplete: 0,
  adminNote: '',
  loaded: false,
  setLogoUrl: (logoUrl) => set({ logoUrl }),
  load: async () => {
    const auth = useAuthStore.getState();
    set({
      logoUrl: auth.user?.provider?.logoUrl ?? null,
      organizationName: auth.user?.provider?.organizationName || auth.user?.name || '',
      registrationNumber: auth.user?.provider?.registrationNumber || '',
      verificationStatus: auth.user?.provider?.verificationStatus || '',
    });
    try {
      const org = (await providerApi.getOrganization()) as {
        logoUrl?: string | null;
        organizationName?: string;
        verificationStatus?: string;
        completion?: number;
        profile?: { name?: string; logoUrl?: string | null; regNumber?: string };
        onboardingData?: { registrationNumber?: string; adminNote?: string };
      } | null;
      if (!org) {
        set({ loaded: true });
        return;
      }
      set({
        logoUrl: org.logoUrl || org.profile?.logoUrl || null,
        organizationName: org.organizationName || org.profile?.name || '',
        registrationNumber:
          org.profile?.regNumber || org.onboardingData?.registrationNumber || '',
        verificationStatus: org.verificationStatus || '',
        profileComplete: typeof org.completion === 'number' ? org.completion : 0,
        adminNote:
          typeof org.onboardingData?.adminNote === 'string' ? org.onboardingData.adminNote : '',
        loaded: true,
      });
    } catch {
      set({ loaded: true });
    }
  },
}));
