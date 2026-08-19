import type { StaticImageData } from 'next/image';

import briefcaseIcon from '@assets/icons/briefcase2.png';
import heartHandshakeIcon from '@assets/icons/heart-handshake.png';
import shieldIcon from '@assets/icons/shield.png';
import graduationIcon from '@assets/icons/graduation-cap.png';
import userGreenIcon from '@assets/icons/user-green.png';
import grantFundingIcon from '@assets/icons/grant-funding.png';
import userIcon from '@assets/icons/user.png';
import shieldCheckIcon from '@assets/icons/shield-check.png';
import bookOpenIcon from '@assets/icons/book-open.png';
import starIcon from '@assets/icons/star2.png';
import briefcaseCatIcon from '@assets/icons/briefcase.png';
import handCoinsIcon from '@assets/icons/hand-coins.png';
import boxIcon from '@assets/icons/box.png';
import loveIcon from '@assets/icons/love.png';
import planeIcon from '@assets/icons/plane.png';
import eyeIcon from '@assets/icons/eye.png';
import card2Img from '@assets/images/card2.png';
import card3Img from '@assets/images/card3.png';

import type { JourneyCardDef } from '../components/JourneySelectionCard';
import type { OptionCardDef } from '../components/ProviderOptionCard';

export const JOURNEY_CARDS: JourneyCardDef[] = [
  {
    id: 'publish',
    title: 'Publish Opportunities',
    body: 'Reach qualified audiences and grow your impact across Canada.',
    tags: [
      { label: 'Hiring', bg: '#FFF4E5', color: '#F17A16' },
      { label: 'Funding', bg: '#FFF4E5', color: '#F17A16' },
      { label: 'Programs', bg: '#FFF4E5', color: '#F17A16' },
      { label: 'Community', bg: '#FFF4E5', color: '#F17A16' },
    ],
    statIconSrc: shieldCheckIcon,
    statIconBg: 'bg-[#FFF4E5]',
    statBold: 'Trusted by organizations',
    statMuted: 'nationwide to create impact.',
    image: card2Img,
  },
  {
    id: 'explore',
    title: 'Explore First',
    body: 'Browse opportunities, stories, and resources before using the platform.',
    tags: [
      { label: 'Browse', bg: '#F5F0FC', color: '#6C34C7' },
      { label: 'Learn', bg: '#F5F0FC', color: '#6C34C7' },
      { label: 'Discover', bg: '#F5F0FC', color: '#6C34C7' },
    ],
    statIconSrc: eyeIcon,
    statIconBg: 'bg-[#F5F0FC]',
    statBold: 'Explore freely with no commitment.',
    statMuted: "Create an account when you're ready.",
    image: card3Img,
  },
];

export const ORG_TYPES: OptionCardDef[] = [
  {
    id: 'employers',
    title: 'Employers',
    desc: 'Hire talent, interns and professionals',
    tags: [
      { label: 'Jobs', bg: '#EFF4FF', color: '#2F66C8' },
      { label: 'Internships', bg: '#EFF4FF', color: '#2F66C8' },
      { label: 'Recruitment', bg: '#EFF4FF', color: '#2F66C8' },
    ],
    icon: briefcaseIcon,
    iconBg: '#EFF4FF',
    footerIcon: userIcon,
    footerIconBg: '#EFF4FF',
    footerText: 'Trusted by hiring teams nationwide',
  },
  {
    id: 'nonprofit',
    title: 'Non-profit Organization',
    desc: 'Create programs, grants and community initiatives.',
    tags: [
      { label: 'Funding', bg: '#EBE5FC', color: '#6821CD' },
      { label: 'Programs', bg: '#EBE5FC', color: '#6821CD' },
      { label: 'Community', bg: '#EBE5FC', color: '#6821CD' },
    ],
    icon: heartHandshakeIcon,
    iconBg: '#EBE5FC',
    footerIcon: userIcon,
    footerIconBg: '#EBE5FC',
    footerText: 'Supporting impact-driven communities',
  },
  {
    id: 'government',
    title: 'Government Body',
    desc: 'Deliver public opportunities and civic opportunities',
    tags: [
      { label: 'Public Programs', bg: '#DCF0EA', color: '#1A975F' },
      { label: 'Grants', bg: '#DCF0EA', color: '#1A975F' },
      { label: 'Services', bg: '#DCF0EA', color: '#1A975F' },
    ],
    icon: shieldIcon,
    iconBg: '#DCF0EA',
    footerIcon: shieldCheckIcon,
    footerIconBg: '#DCF0EA',
    footerText: 'Servicing communities across Canada',
  },
  {
    id: 'school',
    title: 'School/ Institutions',
    desc: 'Support students through academic and career opportunities.',
    tags: [
      { label: 'Education', bg: '#FEEADE', color: '#EB3819' },
      { label: 'Training', bg: '#FEEADE', color: '#EB3819' },
      { label: 'Scholarships', bg: '#FEEADE', color: '#EB3819' },
    ],
    icon: graduationIcon,
    iconBg: '#FEEADE',
    footerIcon: bookOpenIcon,
    footerIconBg: '#FEEADE',
    footerText: 'Empowering student success',
  },
  {
    id: 'community',
    title: 'Community Organization',
    desc: 'Connect people with local programs and resources.',
    tags: [
      { label: 'Outreach', bg: '#DCF4F2', color: '#09A39A' },
      { label: 'Support', bg: '#DCF4F2', color: '#09A39A' },
      { label: 'Events', bg: '#DCF4F2', color: '#09A39A' },
    ],
    icon: userGreenIcon,
    iconBg: '#DCF4F2',
    footerIcon: userGreenIcon,
    footerIconBg: '#DCF4F2',
    footerText: 'Strengthening local communities',
  },
  {
    id: 'funding',
    title: 'Funding Organization',
    desc: 'Offer grants, sponsorships and financial support opportunities.',
    tags: [
      { label: 'Funding', bg: '#FFF3E0', color: '#F99710' },
      { label: 'Grants', bg: '#FFF3E0', color: '#F99710' },
      { label: 'Sponsorships', bg: '#FFF3E0', color: '#F99710' },
    ],
    icon: grantFundingIcon,
    iconBg: '#FFF3E0',
    footerIcon: starIcon,
    footerIconBg: '#FFF3E0',
    footerText: 'Supporting innovation and growth',
  },
];

const ONBOARDING_ICON_BY_KEY: Record<string, StaticImageData> = {
  briefcase: briefcaseCatIcon,
  box: boxIcon,
  'hand-coins': handCoinsIcon,
  love: loveIcon,
  'book-open': bookOpenIcon,
  'heart-handshake': heartHandshakeIcon,
  star: starIcon,
  'graduation-cap': graduationIcon,
  shield: shieldIcon,
  plane: planeIcon,
};

/** Map API categories → provider onboarding option cards. */
export function mapCategoriesToOnboardingOptions(
  categories: Array<{
    slug: string;
    title: string;
    description?: string;
    icon?: string;
    iconBg?: string;
    tagBg?: string;
    tagColor?: string;
    color?: string;
    status?: string;
    tags?: Array<{ label: string }>;
  }>,
): OptionCardDef[] {
  return categories
    .filter((c) => !c.status || c.status === 'Active')
    .map((c) => {
      const tagBg = c.tagBg || c.color || '#EFF4FF';
      const tagColor = c.tagColor || '#2F66C8';
      return {
        id: c.slug,
        title: c.title,
        desc: c.description || '',
        tags: (c.tags ?? []).map((t) => ({ label: t.label, bg: tagBg, color: tagColor })),
        icon: (c.icon && ONBOARDING_ICON_BY_KEY[c.icon]) || briefcaseCatIcon,
        iconBg: c.iconBg || c.color || '#EFF4FF',
      };
    });
}

export type OrgTypeId = (typeof ORG_TYPES)[number]['id'];
export type CategoryId = string;
export type JourneyId = JourneyCardDef['id'];
