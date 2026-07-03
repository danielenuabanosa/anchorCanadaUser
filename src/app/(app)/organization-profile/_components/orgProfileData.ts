import {
  Building2,
  Eye,
  FileBadge,
  FileCheck,
  FileText,
  GraduationCap,
  UserStar,
  Users,
} from 'lucide-react';

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
  socials: [
    { id: 'linkedin', label: 'LinkedIn', color: 'bg-[#0A66C2]' },
    { id: 'facebook', label: 'Facebook', color: 'bg-[#1877F2]' },
    { id: 'twitter', label: 'X', color: 'bg-[#0F172A]' },
    { id: 'instagram', label: 'Instagram', color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  ],
} as const;

export const ORG_DETAIL_ROWS = [
  { label: 'Member Since', value: ORG_PROFILE.memberSince, icon: UserStar },
  { label: 'Org. Size', value: ORG_PROFILE.orgSize, icon: Building2 },
  { label: 'Reg. Number', value: ORG_PROFILE.regNumber, icon: FileBadge },
] as const;
