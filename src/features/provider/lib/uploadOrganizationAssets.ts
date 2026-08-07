'use client';

import { providerApi } from '@/features/provider/services/providerApi';
import { getStoredToken } from '@/lib/apiError';
import { isOfflineProviderSession } from '@/lib/providerSession';
import { isStaticMode } from '@/lib/staticMode';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import {
  clearUploadState,
  simulateFileUpload,
  type UploadState,
} from '@/shared/lib/simulateFileUpload';

function canUploadToApi(): boolean {
  const token = getStoredToken();
  return !isStaticMode() && Boolean(token) && !isOfflineProviderSession(token ?? '');
}

export async function uploadOrganizationLogoFile(
  file: File,
  onUpdate: (state: UploadState) => void,
): Promise<string | null> {
  const previewUrl = URL.createObjectURL(file);
  onUpdate({ fileName: file.name, progress: 20, previewUrl });

  if (!canUploadToApi()) {
    return new Promise((resolve) => {
      simulateFileUpload(file, (state) => {
        onUpdate(state);
        if (state.progress === 100) resolve(previewUrl);
      });
    });
  }

  try {
    onUpdate({ fileName: file.name, progress: 55, previewUrl });
    const result = await providerApi.uploadOrganizationLogo(file);
    const url = result.logoUrl ?? result.profile?.logoUrl ?? previewUrl;
    useProviderOnboardingStore.getState().setOnboardingData({ logoUrl: url });
    onUpdate({ fileName: file.name, progress: 100, previewUrl: url });
    return url;
  } catch (err) {
    console.error('Logo upload failed:', err);
    onUpdate(clearUploadState());
    throw err;
  }
}

export async function uploadOrganizationCoverFile(
  file: File,
  onUpdate: (state: UploadState) => void,
): Promise<string | null> {
  const previewUrl = URL.createObjectURL(file);
  onUpdate({ fileName: file.name, progress: 20, previewUrl });

  if (!canUploadToApi()) {
    return new Promise((resolve) => {
      simulateFileUpload(file, (state) => {
        onUpdate(state);
        if (state.progress === 100) resolve(previewUrl);
      });
    });
  }

  try {
    onUpdate({ fileName: file.name, progress: 55, previewUrl });
    const result = await providerApi.uploadOrganizationCover(file);
    const url = result.coverUrl ?? result.profile?.coverUrl ?? previewUrl;
    useProviderOnboardingStore.getState().setOnboardingData({ coverUrl: url });
    onUpdate({ fileName: file.name, progress: 100, previewUrl: url });
    return url;
  } catch (err) {
    console.error('Cover upload failed:', err);
    onUpdate(clearUploadState());
    throw err;
  }
}
