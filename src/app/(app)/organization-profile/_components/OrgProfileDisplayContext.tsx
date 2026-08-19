'use client';

import { createContext, useContext, type ElementType, type ReactNode } from 'react';
import {
  Building2,
  Eye,
  FileCheck,
  FileText,
  GraduationCap,
  Users,
} from 'lucide-react';
import type { VerificationStatus } from './orgProfileData';

export type OrgProfileDisplay = {
  name: string;
  type: string;
  verified: boolean;
  verificationStatus: string;
  completion: number;
  memberSince: string;
  orgSize: string;
  regNumber: string;
  industry: string;
  organizationSize: string;
  yearEstablished: string;
  categories: Array<{ label: string; icon: ElementType }>;
  about: string;
  mission: string;
  vision: string;
  focusAreas: string[];
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  logoUrl: string | null;
  socials: Array<{ id: string; label: string; color: string; url?: string }>;
};

export type OrgProfileStat = {
  label: string;
  value: string | number;
  change?: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
};

export type VerificationChecklistItem = {
  id: string;
  title: string;
  description: string;
  status: VerificationStatus;
  action: string;
  documentId?: string | null;
  fileUrl?: string | null;
};

const SOCIAL_META: Record<string, { label: string; color: string }> = {
  linkedin: { label: 'LinkedIn', color: 'bg-[#0A66C2]' },
  facebook: { label: 'Facebook', color: 'bg-[#1877F2]' },
  twitter: { label: 'X', color: 'bg-[#0F172A]' },
  instagram: {
    label: 'Instagram',
    color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  },
};

const emptyDisplay: OrgProfileDisplay = {
  name: '',
  type: '',
  verified: false,
  verificationStatus: 'unverified',
  completion: 0,
  memberSince: '—',
  orgSize: '',
  regNumber: '',
  industry: '',
  organizationSize: '',
  yearEstablished: '',
  categories: [],
  about: '',
  mission: '',
  vision: '',
  focusAreas: [],
  website: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  country: 'Canada',
  logoUrl: null,
  socials: [],
};

const emptyStats: OrgProfileStat[] = [
  {
    label: 'Active Opportunities',
    value: 0,
    change: '0%',
    icon: FileCheck,
    iconBg: 'bg-[#FFF3E3]',
    iconColor: 'text-[#C2410C]',
  },
  {
    label: 'Total Applications',
    value: 0,
    change: '0%',
    icon: FileText,
    iconBg: 'bg-[#EFE8FD]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    label: 'Team Members',
    value: 0,
    change: '0%',
    icon: Users,
    iconBg: 'bg-[#EDF9F1]',
    iconColor: 'text-[#15803D]',
  },
  {
    label: 'Profile Views',
    value: 0,
    change: '0%',
    icon: Eye,
    iconBg: 'bg-[#ECF2FE]',
    iconColor: 'text-[#2F66C8]',
  },
];

type Ctx = {
  profile: OrgProfileDisplay;
  stats: OrgProfileStat[];
};

const OrgProfileDisplayContext = createContext<Ctx>({
  profile: emptyDisplay,
  stats: emptyStats,
});

export function OrgProfileDisplayProvider({
  profile,
  stats,
  children,
}: {
  profile: OrgProfileDisplay;
  stats: OrgProfileStat[];
  children: ReactNode;
}) {
  return (
    <OrgProfileDisplayContext.Provider value={{ profile, stats }}>
      {children}
    </OrgProfileDisplayContext.Provider>
  );
}

export function useOrgProfileDisplay() {
  return useContext(OrgProfileDisplayContext);
}

function formatCount(value: number) {
  return value >= 1000 ? value.toLocaleString('en-CA') : value;
}

export function mapApiStatsToCards(stats?: {
  activeOpportunities?: { value?: number; change?: string };
  totalApplications?: { value?: number; change?: string };
  teamMembers?: { value?: number; change?: string };
  profileViews?: { value?: number; change?: string };
} | null): OrgProfileStat[] {
  if (!stats) return emptyStats.map((s) => ({ ...s }));
  return [
    {
      ...emptyStats[0],
      value: formatCount(Number(stats.activeOpportunities?.value ?? 0)),
      change: stats.activeOpportunities?.change ?? '0%',
    },
    {
      ...emptyStats[1],
      value: formatCount(Number(stats.totalApplications?.value ?? 0)),
      change: stats.totalApplications?.change ?? '0%',
    },
    {
      ...emptyStats[2],
      value: formatCount(Number(stats.teamMembers?.value ?? 0)),
      change: stats.teamMembers?.change ?? '0%',
    },
    {
      ...emptyStats[3],
      value: formatCount(Number(stats.profileViews?.value ?? 0)),
      change: stats.profileViews?.change ?? '0%',
    },
  ];
}

export function mapApiOrgToDisplay(api: {
  organizationName?: string;
  organizationType?: string;
  verificationStatus?: string;
  createdAt?: string;
  completion?: number;
  logoUrl?: string | null;
  profile?: Record<string, unknown>;
  onboardingData?: Record<string, unknown>;
} | null): OrgProfileDisplay {
  if (!api) return { ...emptyDisplay };

  const p = api.profile ?? {};
  const od = api.onboardingData ?? {};
  const name = String(api.organizationName || p.name || '');
  const type = String(api.organizationType || p.type || '');
  const industry = String(p.industry || od.industry || '');
  const focusAreas = Array.isArray(p.focusAreas)
    ? p.focusAreas.map(String)
    : Array.isArray(od.focusAreas)
      ? od.focusAreas.map(String)
      : [];
  const memberSince = api.createdAt
    ? new Date(api.createdAt).toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';
  const orgSize = String(p.organizationSize || p.orgSize || '');
  const city = String(p.city || '');
  const province = String(p.province || '');
  const postalCode = String(p.postalCode || '');
  const country = String(p.country || 'Canada');
  const street = String(p.address || '');
  const addressParts = [street, city, province, postalCode, country].filter(Boolean);
  const socialRaw =
    p.social && typeof p.social === 'object'
      ? (p.social as Record<string, unknown>)
      : od.social && typeof od.social === 'object'
        ? (od.social as Record<string, unknown>)
        : {};

  const socials = Object.entries(SOCIAL_META)
    .map(([id, meta]) => {
      const url = typeof socialRaw[id] === 'string' ? String(socialRaw[id]).trim() : '';
      if (!url) return null;
      return { id, label: meta.label, color: meta.color, url };
    })
    .filter(Boolean) as OrgProfileDisplay['socials'];

  const about = String(p.about || p.description || od.about || od.description || '');
  const mission = String(p.mission || od.mission || '');
  const vision = String(p.vision || od.vision || '');
  const logoUrl =
    (typeof api.logoUrl === 'string' && api.logoUrl) ||
    (typeof p.logoUrl === 'string' && p.logoUrl) ||
    null;

  return {
    name,
    type,
    verified: api.verificationStatus === 'verified',
    verificationStatus: String(api.verificationStatus || 'unverified'),
    completion: typeof api.completion === 'number' ? api.completion : 0,
    memberSince,
    orgSize,
    regNumber: String(p.regNumber || od.regNumber || od.registrationNumber || ''),
    industry,
    organizationSize: orgSize,
    yearEstablished: String(p.yearEstablished || ''),
    categories: [
      ...(industry ? [{ label: industry, icon: Building2 }] : []),
      ...(focusAreas[0] ? [{ label: focusAreas[0], icon: GraduationCap }] : []),
    ],
    about,
    mission,
    vision,
    focusAreas,
    website: String(p.website || ''),
    email: String(p.email || ''),
    phone: String(p.phone || ''),
    address: addressParts.join(', '),
    city,
    province,
    postalCode,
    country,
    logoUrl,
    socials,
  };
}

export { emptyDisplay as DEFAULT_ORG_DISPLAY, emptyStats as DEFAULT_ORG_STATS };
