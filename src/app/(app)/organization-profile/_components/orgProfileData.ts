import {
  BadgeInfo,
  BadgePercent,
  FileBadge,
  FileImage,
  FolderClosed,
  Globe,
  IdCard,
  MapPin,
  Phone,
  Target,
} from 'lucide-react';
import type { ElementType } from 'react';

export type OrgProfileModal =
  | 'edit'
  | 'verification'
  | 'upload'
  | 'confirmSubmit'
  | 'submitted'
  | 'verified'
  | 'inProgress'
  | 'documentsRequired'
  | 'notApproved'
  | 'completeProfile'
  | 'completeVerification'
  | 'certificate'
  | 'confirmDelete'
  | null;

export type EditProfileSection = 'basic' | 'contact' | 'location' | 'focus' | 'about';

export type VerificationStatus = 'submitted' | 'under_review' | 'verified' | 'not_submitted';

export const EDIT_PROFILE_SECTIONS: {
  id: EditProfileSection;
  label: string;
  icon: ElementType;
}[] = [
  { id: 'basic', label: 'Basic Information', icon: BadgeInfo },
  { id: 'contact', label: 'Contact Information', icon: Phone },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'about', label: 'About & Mission', icon: Target },
  { id: 'focus', label: 'Focus Areas', icon: Target },
];

export const ORG_ACTION_ITEMS = [
  { id: 'edit', label: 'Edit Profile' },
  { id: 'verification', label: 'Manage Verification' },
] as const;

export const VERIFICATION_STATUS_STYLES: Record<
  VerificationStatus,
  { label: string; badge: string; iconBg: string }
> = {
  submitted: {
    label: 'Submitted',
    badge: 'bg-[#EFF4FF] text-[#2F66C8]',
    iconBg: 'bg-[#ECFDF5]',
  },
  under_review: {
    label: 'Under Review',
    badge: 'bg-[#FFFBEB] text-[#B45309]',
    iconBg: 'bg-[#FFFBEB]',
  },
  verified: {
    label: 'Verified',
    badge: 'bg-[#ECFDF5] text-[#15803D]',
    iconBg: 'bg-[#ECFDF5]',
  },
  not_submitted: {
    label: 'Not Submitted',
    badge: 'bg-[#FEF2F2] text-[#B91C1C]',
    iconBg: 'bg-[#FEF2F2]',
  },
};

/** Checklist template metadata (status/content comes from API). */
export const VERIFICATION_ITEM_ICONS: Record<string, ElementType> = {
  'business-registration': FileBadge,
  'government-id': IdCard,
  'organization-logo': FileImage,
  website: Globe,
  'tax-certificate': BadgePercent,
  'supporting-documents': FolderClosed,
};

export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  docType?: string;
}

export const ORG_TYPE_OPTIONS = [
  'Non-profit Organization',
  'For-profit Organization',
  'Government Agency',
  'Educational Institution',
] as const;

export const INDUSTRY_OPTIONS = ['Education', 'Healthcare', 'Technology', 'Community Services'] as const;

export const ORG_SIZE_OPTIONS = [
  '1 - 10 employees',
  '11 - 50 employees',
  '51 - 200 employees',
  '200+ employees',
] as const;

export const FOCUS_AREA_OPTIONS = [
  'Education',
  'Youth Development',
  'Skill Development',
  'Community Support',
  'Healthcare',
  'Environment',
] as const;
