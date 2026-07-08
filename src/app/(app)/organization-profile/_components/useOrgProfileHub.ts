'use client';

import { useState } from 'react';
import type { EditProfileSection, OrgProfileModal } from './orgProfileData';
import { ORG_PROFILE, UPLOADED_FILES } from './orgProfileData';

export function useOrgProfileHub() {
  const [modal, setModal] = useState<OrgProfileModal>(null);
  const [previousModal, setPreviousModal] = useState<OrgProfileModal>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [editSection, setEditSection] = useState<EditProfileSection>('basic');
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState(() => UPLOADED_FILES.map((f) => f.id) as string[]);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: ORG_PROFILE.name as string,
    regNumber: ORG_PROFILE.regNumber as string,
    type: ORG_PROFILE.type as string,
    industry: ORG_PROFILE.industry as string,
    organizationSize: ORG_PROFILE.organizationSize as string,
    yearEstablished: ORG_PROFILE.yearEstablished as string,
    email: ORG_PROFILE.email as string,
    phone: ORG_PROFILE.phone as string,
    website: ORG_PROFILE.website as string,
    address: ORG_PROFILE.address as string,
    city: ORG_PROFILE.city as string,
    province: ORG_PROFILE.province as string,
    postalCode: ORG_PROFILE.postalCode as string,
    country: ORG_PROFILE.country as string,
    tagline: ORG_PROFILE.tagline as string,
    primaryColor: ORG_PROFILE.primaryColor as string,
    about: ORG_PROFILE.about as string,
    mission: ORG_PROFILE.mission as string,
    vision: ORG_PROFILE.vision as string,
    focusAreas: [...ORG_PROFILE.focusAreas] as string[],
  });

  function openModal(next: OrgProfileModal) {
    setActionOpen(false);
    setModal(next);
  }

  function closeModal() {
    setModal(null);
    setUploadTargetId(null);
    setDeleteTargetId(null);
    setPreviousModal(null);
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

  function confirmDeleteFile() {
    if (deleteTargetId) setUploadedFiles((prev) => prev.filter((id) => id !== deleteTargetId));
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
      case 'branding':
        setEditSection('branding');
        openModal('edit');
        break;
      case 'download':
        break;
      case 'share':
        break;
      default:
        break;
    }
  }

  function openUpload(targetId: string) {
    setUploadTargetId(targetId);
    setModal('upload');
  }

  return {
    modal,
    actionOpen,
    editSection,
    uploadTargetId,
    uploadedFiles,
    deleteTargetId,
    form,
    setActionOpen,
    setEditSection,
    setForm,
    openModal,
    closeModal,
    handleAction,
    openUpload,
    requestDeleteFile,
    cancelDeleteFile,
    confirmDeleteFile,
  };
}

export type OrgProfileHub = ReturnType<typeof useOrgProfileHub>;
