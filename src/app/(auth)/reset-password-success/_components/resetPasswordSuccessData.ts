import type { StaticImageData } from 'next/image';

import briefcaseIcon from '@assets/icons/briefcase.png';
import handCoinsIcon from '@assets/icons/hand-coins.png';
import starIcon from '@assets/icons/star2.png';
import marketingThumb from '@assets/images/start.png';
import youthGrantThumb from '@assets/images/youth.png';

export const CHECKLIST_ITEMS = [
  'Password updated successfully',
  'Previous recovery link has expired',
  'Account protection is restored',
  'Personalized access is re-enabled',
] as const;

export const UPDATE_STATS = [
  { icon: briefcaseIcon, count: 3, label: 'Applications Submitted', iconBg: 'bg-[#dfe9fe]' },
  { icon: handCoinsIcon, count: 2, label: 'Listings Published', iconBg: 'bg-[#e3f4eb]' },
  { icon: starIcon, count: 1, label: 'Opportunity Saved', iconBg: 'bg-[#f0ebff]' },
] as const;

export interface OpportunityPreviewRow {
  id: string;
  title: string;
  subtitle: string;
  footnote: string;
  image: StaticImageData;
  badge?: string;
}

export const OPPORTUNITY_PREVIEW_ROWS: OpportunityPreviewRow[] = [
  {
    id: 'marketing-coordinator',
    title: 'Marketing Coordinator',
    subtitle: '20 Applicants • Toronto, ON',
    footnote: 'Posted 2 hours ago',
    image: marketingThumb,
  },
  {
    id: 'youth-grant',
    title: 'Youth Innovator Grant',
    subtitle: '15 Applicant • 16 Saved',
    footnote: 'Application closes in 12 days',
    image: youthGrantThumb,
    badge: 'NEW',
  },
];

export const FOOTER_ITEMS = [
  {
    label: 'Secure & Encrypted',
    desc: 'Your information is encrypted and kept safe.',
    icon: 'shield' as const,
  },
  {
    label: 'Proudly Canadian',
    desc: 'Built in Canada for people across the country.',
    icon: 'maple' as const,
  },
  {
    label: 'Here for You',
    desc: 'Our support team is always ready to help.',
    icon: 'heart' as const,
  },
] as const;
