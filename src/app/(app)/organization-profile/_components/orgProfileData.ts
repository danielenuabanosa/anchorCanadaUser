import {
  BadgeInfo,
  BadgePercent,
  Building,
  Building2,
  Eye,
  FileBadge,
  FileCheck,
  FileImage,
  FileText,
  FolderClosed,
  Globe,
  GraduationCap,
  IdCard,
  MapPin,
  Palette,
  Phone,
  Target,
  User,
  UserStar,
  Users,
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

export type EditProfileSection =
  | 'basic'
  | 'contact'
  | 'location'
  | 'branding'
  | 'story'
  | 'focus';

export type VerificationStatus = 'submitted' | 'under_review' | 'verified' | 'not_submitted';

export const ORG_PROFILE_STATS = [
  {
    label: 'Active Opportunities',
    value: 12,
    change: '3%',
    icon: FileCheck,
    iconBg: 'bg-[#FFF3E3]',
    iconColor: 'text-[#C2410C]',
  },
  {
    label: 'Total Applications',
    value: '1,284',
    change: '18.5%',
    icon: FileText,
    iconBg: 'bg-[#EFE8FD]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    label: 'Team Members',
    value: 24,
    change: '2%',
    icon: Users,
    iconBg: 'bg-[#EDF9F1]',
    iconColor: 'text-[#15803D]',
  },
  {
    label: 'Profile Views',
    value: '2,342',
    change: '24.6%',
    icon: Eye,
    iconBg: 'bg-[#ECF2FE]',
    iconColor: 'text-[#2F66C8]',
  },
] as const;

export const ORG_PROFILE = {
  name: 'Maple Future Foundation',
  type: 'Non-profit Organization',
  verified: true,
  completion: 92,
  memberSince: 'Jun 18, 2024',
  orgSize: '11 - 20',
  regNumber: 'NF-2024-55678',
  industry: 'Education',
  organizationSize: '11 - 50 employees',
  yearEstablished: '2018',
  categories: [
    { label: 'Education', icon: Building2 },
    { label: 'Youth Development', icon: GraduationCap },
  ],
  about:
    'Maple Future Foundation is dedicated to empowering youth across Canada through education, skills development, and leadership opportunities.',
  mission: 'To create equal access to education and skill-building programs for Canadian youth.',
  vision: 'A future where young Canadians have the opportunity to learn, grow and lead.',
  focusAreas: ['Education', 'Youth Development', 'Skill Development', 'Community Support'],
  website: 'www.maplefuture.ca',
  email: 'info@maplefuture.ca',
  phone: '+1 (416) 555-7890',
  address: '123 Education Way, Suite 200 Toronto, Ontario M5B 1A1, Canada',
  city: 'Toronto',
  province: 'Ontario',
  postalCode: 'M5B 1A1',
  country: 'Canada',
  tagline: 'Empowering Canadian youth through education',
  primaryColor: '#2F66C8',
  socials: [
    { id: 'linkedin', label: 'LinkedIn', color: 'bg-[#0A66C2]' },
    { id: 'facebook', label: 'Facebook', color: 'bg-[#1877F2]' },
    { id: 'twitter', label: 'X', color: 'bg-[#0F172A]' },
    {
      id: 'instagram',
      label: 'Instagram',
      color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    },
  ],
} as const;

export const ORG_DETAIL_ROWS = [
  { label: 'Member Since', value: ORG_PROFILE.memberSince, icon: UserStar },
  { label: 'Org. Size', value: ORG_PROFILE.orgSize, icon: Building },
  { label: 'Reg. Number', value: ORG_PROFILE.regNumber, icon: FileBadge },
] as const;

export const ORG_ABOUT_SECTIONS = [
  { id: 'about', title: 'About Organization', content: ORG_PROFILE.about },
  { id: 'mission', title: 'Mission', content: ORG_PROFILE.mission },
  { id: 'vision', title: 'Vision', content: ORG_PROFILE.vision },
] as const;

export const EDIT_PROFILE_SECTIONS: {
  id: EditProfileSection;
  label: string;
  icon: ElementType;
}[] = [
  { id: 'basic', label: 'Basic Information', icon: BadgeInfo },
  { id: 'contact', label: 'Contact Information', icon: Phone },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'story', label: 'Organization Story', icon: Building2 },
  { id: 'focus', label: 'Focus Areas', icon: Target },
];

export const ORG_ACTION_ITEMS = [
  { id: 'edit', label: 'Edit Profile' },
  { id: 'verification', label: 'Manage Verification' },
  { id: 'branding', label: 'Update Branding' },
  { id: 'download', label: 'Download Profile' },
  { id: 'share', label: 'Share Public Link' },
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

export const VERIFICATION_ITEMS = [
  {
    id: 'business-registration',
    title: 'Business Registration',
    description: 'Certificate of Incorporation',
    status: 'submitted' as VerificationStatus,
    action: 'View',
    icon: FileBadge,
  },
  {
    id: 'government-id',
    title: 'Government ID',
    description: 'Valid Government-issued ID',
    status: 'under_review' as VerificationStatus,
    action: 'View',
    icon: IdCard,
  },
  {
    id: 'organization-logo',
    title: 'Organization Logo',
    description: 'High resolution Logo',
    status: 'verified' as VerificationStatus,
    action: 'Update',
    icon: FileImage,
  },
  {
    id: 'website',
    title: 'Website',
    description: 'Official organization website',
    status: 'verified' as VerificationStatus,
    action: 'Update',
    icon: Globe,
  },
  {
    id: 'tax-certificate',
    title: 'Tax Certificate',
    description: 'Tax exempt certificate',
    status: 'not_submitted' as VerificationStatus,
    action: 'Upload',
    icon: BadgePercent,
  },
  {
    id: 'supporting-documents',
    title: 'Supporting Documents',
    description: 'Additional documents (if any)',
    status: 'not_submitted' as VerificationStatus,
    action: 'Upload',
    icon: FolderClosed,
  },
] as const;

export const VERIFICATION_COMPLETED = 3;
export const VERIFICATION_TOTAL = VERIFICATION_ITEMS.length;

export const UPLOADED_FILES = [
  { id: 'screenshot', name: 'screenshot.png', size: '1.2 MB', valid: true },
  { id: 'error-log', name: 'error-log.txt', size: '16 KB', valid: true },
] as const;

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
