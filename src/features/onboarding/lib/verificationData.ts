import type { StaticImageData } from 'next/image';

import briefcaseIcon from '@assets/icons/briefcase2.png';
import heartHandshakeIcon from '@assets/icons/heart-handshake.png';
import shieldIcon from '@assets/icons/shield.png';
import graduationIcon from '@assets/icons/graduation-cap.png';
import eyeIcon from '@assets/icons/eye.png';
import userIcon from '@assets/icons/user.png';
import shieldCheckIcon from '@assets/icons/shield-check.png';
import boxIcon from '@assets/icons/box.png';
import sendIcon from '@assets/icons/send.png';

export const VERIFICATION_SUBTITLE = [
  'Verification helps build trust with applicants, communities, and partners across the African ecosystem.',
  'Verified providers receive increased visibility and credibility.',
] as const;

export const VERIFICATION_INFO_MESSAGE = 'Your progress is automatically saved.';

export type VerificationTypeId = 'business' | 'nonprofit' | 'government' | 'educational';

export interface VerificationTypeOption {
  id: VerificationTypeId;
  title: string;
  description: string;
  icon: StaticImageData;
  iconBg: string;
}

export const VERIFICATION_TYPES: VerificationTypeOption[] = [
  {
    id: 'business',
    title: 'Business Registration',
    description: 'For registered businesses and companies.',
    icon: briefcaseIcon,
    iconBg: '#EFF4FF',
  },
  {
    id: 'nonprofit',
    title: 'Nonprofit Verification',
    description: 'For nonprofits and community organizations.',
    icon: heartHandshakeIcon,
    iconBg: '#F7EAFE',
  },
  {
    id: 'government',
    title: 'Government Verification',
    description: 'For public institutions and agencies.',
    icon: shieldIcon,
    iconBg: '#E3F5E5',
  },
  {
    id: 'educational',
    title: 'Educational Institution',
    description: 'For schools, colleges, and universities.',
    icon: graduationIcon,
    iconBg: '#FEF3E5',
  },
];

export type VerificationDocumentId =
  | 'registrationCertificate'
  | 'proofOfOrganization'
  | 'authorizedRepId'
  | 'supportingDocuments';

export interface VerificationDocumentField {
  id: VerificationDocumentId;
  title: string;
  description: string;
  required: boolean;
}

export const VERIFICATION_DOCUMENTS: VerificationDocumentField[] = [
  {
    id: 'registrationCertificate',
    title: 'Registration Certificate',
    description: 'Official business registration or incorporation certificate',
    required: false,
  },
  {
    id: 'proofOfOrganization',
    title: 'Proof of Organization',
    description: 'Proof of address, bylaws, or organizational letter',
    required: false,
  },
  {
    id: 'authorizedRepId',
    title: 'Authorized Representative ID',
    description: 'Government-issued ID of the authorized representative',
    required: false,
  },
  {
    id: 'supportingDocuments',
    title: 'Supporting Documents',
    description: 'Any additional documents that support your verification.',
    required: false,
  },
];

export const WHY_VERIFIED_BENEFITS = [
  { icon: eyeIcon, label: 'Higher visibility across the platform' },
  { icon: userIcon, label: 'Increased applicant trust' },
  { icon: shieldCheckIcon, label: 'Verified provider badge' },
  { icon: boxIcon, label: 'Access to advanced provider tools' },
  { icon: sendIcon, label: 'Improved opportunity reach' },
] as const;
