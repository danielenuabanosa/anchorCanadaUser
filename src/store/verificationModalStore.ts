'use client';

import { create } from 'zustand';
import { useOrgBrandingStore } from '@/store/orgBrandingStore';
import { useAuthStore } from '@/store/authStore';

export type VerificationModalVariant = 'incomplete' | 'submitted' | 'attention';

interface VerificationModalState {
  isOpen: boolean;
  variant: VerificationModalVariant;
  adminNote: string;
  generation: number;
  open: (variant?: VerificationModalVariant, adminNote?: string) => void;
  close: () => void;
}

export const useVerificationModalStore = create<VerificationModalState>((set) => ({
  isOpen: false,
  variant: 'incomplete',
  adminNote: '',
  generation: 0,
  open: (variant = 'incomplete', adminNote = '') =>
    set((state) => ({
      isOpen: true,
      variant,
      adminNote: adminNote ?? '',
      generation: state.generation + 1,
    })),
  close: () => set({ isOpen: false }),
}));

export function isProviderOrgVerified(status?: string | null) {
  return String(status ?? '').toLowerCase() === 'verified';
}

export function promptUnverifiedProvider(status?: {
  verificationStatus?: string | null;
  profileComplete?: number;
  adminNote?: string | null;
  remainingCount?: number;
}) {
  const branding = useOrgBrandingStore.getState();
  const authStatus = useAuthStore.getState().user?.provider?.verificationStatus;
  const verificationStatus = status?.verificationStatus || branding.verificationStatus || authStatus;
  if (isProviderOrgVerified(verificationStatus)) return;

  const note = (status?.adminNote ?? branding.adminNote ?? '').trim();
  const complete =
    typeof status?.profileComplete === 'number' ? status.profileComplete : branding.profileComplete;
  const open = useVerificationModalStore.getState().open;

  if (note) {
    open('attention', note);
    return;
  }
  if (complete >= 100) return;
  if (typeof status?.remainingCount === 'number' && status.remainingCount > 0) {
    open('incomplete');
    return;
  }
  open('incomplete');
}
