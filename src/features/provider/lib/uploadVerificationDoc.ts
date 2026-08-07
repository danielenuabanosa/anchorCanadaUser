'use client';

import { providerApi } from '@/features/provider/services/providerApi';
import { getStoredToken } from '@/lib/apiError';
import { isOfflineProviderSession } from '@/lib/providerSession';
import { isStaticMode } from '@/lib/staticMode';
import {
  clearUploadState,
  simulateFileUpload,
  type UploadState,
} from '@/shared/lib/simulateFileUpload';

const DOC_TYPE_MAP: Record<string, string> = {
  registrationCertificate: 'business_registration',
  proofOfOrganization: 'proof_of_organization',
  authorizedRepId: 'government_id',
  supportingDocuments: 'supporting',
};

export async function uploadVerificationDoc(
  docId: string,
  file: File,
  onUpdate: (state: UploadState) => void,
): Promise<void> {
  const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
  onUpdate({ fileName: file.name, progress: 10, previewUrl });

  const token = getStoredToken();
  const canUpload =
    !isStaticMode() && Boolean(token) && !isOfflineProviderSession(token ?? '');

  if (!canUpload) {
    simulateFileUpload(file, onUpdate);
    return;
  }

  try {
    onUpdate({ fileName: file.name, progress: 40, previewUrl });
    await providerApi.uploadOrganizationDocument(file, DOC_TYPE_MAP[docId] ?? docId);
    onUpdate({ fileName: file.name, progress: 100, previewUrl });
  } catch (err) {
    console.error('Verification document upload failed:', err);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    onUpdate(clearUploadState());
    throw err;
  }
}
