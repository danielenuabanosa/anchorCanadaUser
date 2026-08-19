'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { EditProfileSection, OrgProfileModal, UploadedFileItem } from './orgProfileData';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import { useOrgBrandingStore } from '@/store/orgBrandingStore';
import { promptUnverifiedProvider } from '@/store/verificationModalStore';
import { getRemainingProfileItems } from '@/features/provider/lib/remainingProfile';
import {
  DEFAULT_ORG_DISPLAY,
  DEFAULT_ORG_STATS,
  mapApiOrgToDisplay,
  mapApiStatsToCards,
  type OrgProfileDisplay,
  type OrgProfileStat,
  type VerificationChecklistItem,
} from './OrgProfileDisplayContext';

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

function emptyFormFromDisplay(display: OrgProfileDisplay) {
  const socialFromDisplay = {
    linkedin: display.socials.find((s) => s.id === 'linkedin')?.url || '',
    twitter: display.socials.find((s) => s.id === 'twitter')?.url || '',
    facebook: display.socials.find((s) => s.id === 'facebook')?.url || '',
    instagram: display.socials.find((s) => s.id === 'instagram')?.url || '',
  };
  return {
    name: display.name,
    regNumber: display.regNumber,
    type: display.type,
    industry: display.industry,
    organizationSize: display.organizationSize,
    yearEstablished: display.yearEstablished,
    email: display.email,
    phone: display.phone,
    website: display.website,
    address: display.address,
    city: display.city,
    province: display.province,
    postalCode: display.postalCode,
    country: display.country,
    about: display.about,
    mission: display.mission,
    vision: display.vision,
    focusAreas: [...display.focusAreas],
    social: socialFromDisplay,
  };
}

type OrgApiPayload = {
  organizationName?: string;
  organizationType?: string;
  verificationStatus?: string;
  createdAt?: string;
  completion?: number;
  logoUrl?: string | null;
  profile?: Record<string, unknown>;
  onboardingData?: Record<string, unknown>;
  documents?: Array<{ id: string; name: string; size?: string; docType?: string; fileUrl?: string | null }>;
  stats?: Parameters<typeof mapApiStatsToCards>[0];
  verification?: {
    items?: VerificationChecklistItem[];
    completed?: number;
    total?: number;
    overallStatus?: string;
  };
};

export function useOrgProfileHub() {
  const searchParams = useSearchParams();
  const [modal, setModal] = useState<OrgProfileModal>(null);
  const [previousModal, setPreviousModal] = useState<OrgProfileModal>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [editSection, setEditSection] = useState<EditProfileSection>('basic');
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [sessionUploads, setSessionUploads] = useState<UploadedFileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [profile, setProfile] = useState<OrgProfileDisplay>(DEFAULT_ORG_DISPLAY);
  const [stats, setStats] = useState<OrgProfileStat[]>(DEFAULT_ORG_STATS);
  const [verificationItems, setVerificationItems] = useState<VerificationChecklistItem[]>([]);
  const [verificationCompleted, setVerificationCompleted] = useState(0);
  const [verificationTotal, setVerificationTotal] = useState(0);
  const [loading, setLoading] = useState(!isStaticMode());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState(() => emptyFormFromDisplay(DEFAULT_ORG_DISPLAY));

  const applyOrgPayload = useCallback((org: OrgApiPayload | null) => {
    const display = mapApiOrgToDisplay(org);
    setProfile(display);
    setForm(emptyFormFromDisplay(display));
    setStats(mapApiStatsToCards(org?.stats));
    setVerificationItems(org?.verification?.items ?? []);
    setVerificationCompleted(org?.verification?.completed ?? 0);
    setVerificationTotal(org?.verification?.total ?? 0);
    setUploadedFiles(
      (org?.documents ?? []).map((d) => ({
        id: d.id,
        name: d.name,
        size: d.size ?? '—',
        docType: d.docType,
      })),
    );
  }, []);

  const load = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (isStaticMode()) {
        setProfile(DEFAULT_ORG_DISPLAY);
        setForm(emptyFormFromDisplay(DEFAULT_ORG_DISPLAY));
        setStats(DEFAULT_ORG_STATS);
        setVerificationItems([]);
        setLoading(false);
        return;
      }
      if (!opts?.silent) {
        setLoading(true);
        setError('');
      }
      try {
        const org = (await providerApi.getOrganization()) as OrgApiPayload | null;
        applyOrgPayload(org);
      } catch (err) {
        if (!opts?.silent) {
          setError(err instanceof Error ? err.message : 'Could not load organization profile.');
          applyOrgPayload(null);
        }
      } finally {
        if (!opts?.silent) setLoading(false);
      }
    },
    [applyOrgPayload],
  );

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const section = searchParams.get('section');
    if (!section) return;
    if (section === 'verification') {
      setActionOpen(false);
      setModal('verification');
      return;
    }
    const allowed: EditProfileSection[] = [
      'basic',
      'contact',
      'location',
      'about',
      'focus',
      'branding',
      'social',
    ];
    if (allowed.includes(section as EditProfileSection)) {
      setEditSection(section as EditProfileSection);
      setActionOpen(false);
      setModal('edit');
    }
  }, [searchParams]);

  function openModal(next: OrgProfileModal) {
    setActionOpen(false);
    setModal(next);
  }

  function closeModal() {
    setModal(null);
    setUploadTargetId(null);
    setDeleteTargetId(null);
    setPreviousModal(null);
    setSessionUploads([]);
    setUploading(false);
  }

  async function addUploadedFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setUploading(true);
    setError('');
    for (const file of list) {
      const optimisticId = `local-${file.name}-${Date.now()}`;
      const optimistic: UploadedFileItem = {
        id: optimisticId,
        name: file.name,
        size: formatSize(file.size),
        docType: uploadTargetId ?? undefined,
      };
      setSessionUploads((prev) => [...prev, optimistic]);

      try {
        if (uploadTargetId === 'organization-logo') {
          const result = await providerApi.uploadOrganizationLogo(file);
          if (result.logoUrl) {
            setProfile((prev) => ({ ...prev, logoUrl: result.logoUrl ?? prev.logoUrl }));
            useOrgBrandingStore.getState().setLogoUrl(result.logoUrl);
          }
          setSessionUploads((prev) =>
            prev.map((f) =>
              f.id === optimisticId
                ? { ...f, id: `logo-${Date.now()}`, name: file.name, size: formatSize(file.size) }
                : f,
            ),
          );
          await load({ silent: true });
          continue;
        }

        if (uploadTargetId === 'website') {
          // Website is a URL field, not a file — keep optimistic entry removed.
          setSessionUploads((prev) => prev.filter((f) => f.id !== optimisticId));
          continue;
        }

        const created = (await providerApi.uploadOrganizationDocument(
          file,
          uploadTargetId ?? 'other',
        )) as { id?: string; name?: string; size?: string; docType?: string };

        const saved: UploadedFileItem = {
          id: created.id ?? `${file.name}-${Date.now()}`,
          name: created.name ?? file.name,
          size: created.size ?? formatSize(file.size),
          docType: created.docType ?? uploadTargetId ?? undefined,
        };

        setSessionUploads((prev) => prev.map((f) => (f.id === optimisticId ? saved : f)));
        setUploadedFiles((prev) => {
          if (prev.some((f) => f.id === saved.id)) return prev;
          return [...prev, saved];
        });
      } catch (err) {
        setSessionUploads((prev) => prev.filter((f) => f.id !== optimisticId));
        const apiMessage =
          err && typeof err === 'object' && 'response' in err
            ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
            : undefined;
        setError(
          apiMessage ||
            (err instanceof Error ? err.message : 'Could not upload document. Please try again.'),
        );
      }
    }
    setUploading(false);
    await load({ silent: true });
  }

  function requestDeleteFile(fileId: string) {
    setPreviousModal(modal);
    setDeleteTargetId(fileId);
    setModal('confirmDelete');
  }

  function cancelDeleteFile() {
    setModal(previousModal ?? 'upload');
    setDeleteTargetId(null);
  }

  async function confirmDeleteFile() {
    if (deleteTargetId) {
      try {
        if (!isStaticMode() && !deleteTargetId.startsWith('local-')) {
          await providerApi.deleteOrganizationDocument(deleteTargetId);
        }
      } catch {
        /* keep local removal on failure for UX */
      }
      setUploadedFiles((prev) => prev.filter((f) => f.id !== deleteTargetId));
      setSessionUploads((prev) => prev.filter((f) => f.id !== deleteTargetId));
      await load({ silent: true });
    }
    setModal(previousModal ?? 'upload');
    setDeleteTargetId(null);
  }

  function handleAction(actionId: string) {
    setActionOpen(false);
    switch (actionId) {
      case 'edit':
        openModal('edit');
        break;
      case 'verification':
        openModal('verification');
        break;
      default:
        break;
    }
  }

  function openUpload(targetId: string) {
    setUploadTargetId(targetId);
    setError('');
    const item = verificationItems.find((v) => v.id === targetId);
    const existing =
      (item?.documentId
        ? uploadedFiles.find((f) => f.id === item.documentId)
        : undefined) ??
      uploadedFiles.find((f) => f.docType === targetId);
    if (existing) {
      setSessionUploads([existing]);
    } else if (item?.fileUrl) {
      setSessionUploads([
        {
          id: item.documentId ?? `existing-${targetId}`,
          name: item.title,
          size: 'Uploaded',
          docType: targetId,
        },
      ]);
    } else {
      setSessionUploads([]);
    }
    setModal('upload');
  }

  function openWebsiteEdit() {
    setEditSection('contact');
    setPreviousModal('verification');
    openModal('edit');
  }

  function finishUploadSession() {
    setSessionUploads([]);
    setUploadTargetId(null);
    openModal('verification');
    void load({ silent: true });
  }

  async function uploadProfileLogo(file: File) {
    setUploading(true);
    setError('');
    try {
      const result = await providerApi.uploadOrganizationLogo(file);
      if (result.logoUrl) {
        setProfile((prev) => ({ ...prev, logoUrl: result.logoUrl ?? prev.logoUrl }));
        useOrgBrandingStore.getState().setLogoUrl(result.logoUrl);
      }
      await load({ silent: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not upload logo.');
    } finally {
      setUploading(false);
    }
  }

  async function saveProfile() {
    setSaving(true);
    setError('');
    try {
      const updated = (await providerApi.updateOrganization({
        organizationName: form.name,
        organizationType: form.type,
        profile: {
          name: form.name,
          regNumber: form.regNumber,
          type: form.type,
          industry: form.industry,
          organizationSize: form.organizationSize,
          yearEstablished: form.yearEstablished,
          email: form.email,
          phone: form.phone,
          website: form.website,
          address: form.address,
          city: form.city,
          province: form.province,
          postalCode: form.postalCode,
          country: form.country,
          about: form.about,
          mission: form.mission,
          vision: form.vision,
          focusAreas: form.focusAreas,
          social: form.social,
        },
      })) as OrgApiPayload;
      applyOrgPayload(updated);
      await useOrgBrandingStore.getState().load();
      if (previousModal) {
        const next = previousModal;
        setPreviousModal(null);
        openModal(next);
      } else {
        closeModal();
      }
      const remaining = getRemainingProfileItems(updated as Parameters<typeof getRemainingProfileItems>[0]);
      const completion =
        typeof updated.completion === 'number'
          ? updated.completion
          : useOrgBrandingStore.getState().profileComplete;
      window.setTimeout(() => {
        if (completion >= 100 || remaining.length === 0) return;
        promptUnverifiedProvider({
          verificationStatus: updated.verificationStatus,
          profileComplete: completion,
          remainingCount: remaining.length,
        });
      }, 250);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  }

  async function submitVerification() {
    setSaving(true);
    setError('');
    try {
      const updated = (await providerApi.submitOrganizationVerification({
        documentIds: uploadedFiles.map((f) => f.id),
      })) as OrgApiPayload;
      applyOrgPayload(updated);
      openModal('submitted');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit verification.');
    } finally {
      setSaving(false);
    }
  }

  return {
    modal,
    actionOpen,
    editSection,
    uploadTargetId,
    uploadedFiles,
    sessionUploads,
    uploading,
    deleteTargetId,
    form,
    profile,
    stats,
    verificationItems,
    verificationCompleted,
    verificationTotal,
    loading,
    saving,
    error,
    setActionOpen,
    setEditSection,
    setForm,
    openModal,
    closeModal,
    handleAction,
    openUpload,
    openWebsiteEdit,
    addUploadedFiles,
    finishUploadSession,
    requestDeleteFile,
    cancelDeleteFile,
    confirmDeleteFile,
    saveProfile,
    uploadProfileLogo,
    submitVerification,
    refetch: load,
  };
}

export type OrgProfileHub = ReturnType<typeof useOrgProfileHub>;
