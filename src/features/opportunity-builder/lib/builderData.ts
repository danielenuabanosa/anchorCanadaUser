import type { StaticImageData } from 'next/image';

import briefcaseIcon from '@assets/icons/briefcase2.png';

import briefcaseCatIcon from '@assets/icons/briefcase.png';

import globeIcon from '@assets/icons/compass.png';

import heartIcon from '@assets/icons/heart-handshake.png';

import handCoinsIcon from '@assets/icons/hand-coins.png';

import graduationIcon from '@assets/icons/graduation-cap.png';

import boxIcon from '@assets/icons/box.png';

import starIcon from '@assets/icons/star2.png';

import loveIcon from '@assets/icons/love.png';

import bookOpenIcon from '@assets/icons/book-open.png';

import internalHero from '@assets/images/opp-type-hero-internal.png';
import expressHero from '@assets/images/express.png';

import externalHero from '@assets/images/opp-type-hero-external.png';
import grantBg from '@assets/images/grant.png';
import startBg from '@assets/images/start.png';
import researchBg from '@assets/images/research.png';
import youthBg from '@assets/images/youth.png';
import eventBg from '@assets/images/event.png';
import scratchBg from '@assets/images/create-from-scratch.png';



export const BUILDER_STEPS = [

  'OPPORTUNITY TYPE',

  'CATEGORY',

  'REQUIREMENTS',

  'DETAILS',

  'CONFIG',

  'REVIEW & PUBLISH',

] as const;

export const BUILDER_STEP_LABELS = [
  'Opportunity Type',
  'Category',
  'Requirements',
  'Details',
  'Config',
  'Review & Publish',
] as const;

export type BuilderStepIndex = 0 | 1 | 2 | 3 | 4 | 5;



export const BUILDER_STEP_ROUTES: Record<BuilderStepIndex, string> = {

  0: '/opportunities/create/type',

  1: '/opportunities/create/category',

  2: '/opportunities/create/requirements',

  3: '/opportunities/create/details',

  4: '/opportunities/create/workflow',

  5: '/opportunities/create/review',

};



export const BUILDER_PAGE_COPY = {

  type: {

    title: 'How Would Applicants Engage With This',

    titleAccent: 'Opportunity?',

    subtitle:

      'Choose the application flow that best matches your opportunity. This selection determines how submissions will be collected and managed.',

  },

  category: {

    title: 'What Type Of Opportunity Are You',

    titleAccent: 'Creating?',

    subtitleLines: [

      'Select the category that best describes your opportunity.',

      "We'll recommend application requirements and workflows based on your selection.",

    ],

  },

  template: {

    title: 'Choose a Starting',

    titleAccent: 'Template',

    subtitleLines: [

      'Select a template to accelerate your setup. Templates include recommended requirements,',

      'workflows, and best-practice configurations that you can customize later.',

    ],

  },

  requirements: {

    title: 'Opportunity',

    titleAccent: 'Requirements',

    subtitle:

      'Select what applicants must submit. Choose document requirements and how applications will be collected.',

  },

  details: {

    title: 'Opportunity',

    titleAccent: 'Details',

    subtitle: 'Configure the information applicants will use before applying.',

  },

  workflow: {

    title: 'Opportunity',

    titleAccent: 'Configuration',

    mobileTitle: 'Opportunity Configuration',

    subtitle: 'Configure this opportunity based on the category selected.',

    subtitleLines: [

      'Configure this opportunity based on the category selected.',

    ],

  },

  review: {

    title: 'Review &',

    titleAccent: 'Publish',

    subtitle: 'Review your opportunity configuration before publishing.',

  },

  internalWorkflow: {
    title: 'Internal Workflow',
    titleAccent: 'Builder',
    subtitle:
      'Configure how applications move through your review process. Build a custom workflow, define review stages, assign reviewers and control applicant visibility throughout the process.',
  },

  externalWorkflow: {
    title: 'External Workflow',
    titleAccent: 'Builder',
    subtitle:
      'Configure how applicants are redirected to an external application platform. Manage redirects, applicant guidance, tracking settings, and support information before users leave Anchor Canada.',
  },

  expressWorkflow: {
    title: 'Express Interest Workflow',
    titleAccent: 'Builder',
    subtitle:
      'Configure how users express interest, how candidates are reviewed, and how invitations are managed before applications begin.',
  },

} as const;



export interface OpportunityTypeDef {

  id: 'internal' | 'external' | 'express-interest';

  title: string;

  description: string;

  tags: { label: string; bg: string; color: string }[];

  checklist: string[];

  sampleRequirement: string;

  footerText: string;

  icon: StaticImageData;

  iconBg: string;

  heroImage: StaticImageData;

  accentColor: string;

}



export const OPPORTUNITY_TYPES: OpportunityTypeDef[] = [

  {

    id: 'internal',

    title: 'Internal Opportunity',

    description: 'Collect and manage applications directly within anchor.',

    tags: [

      { label: 'Jobs', bg: '#E5ECFE', color: '#1C31D5' },

      { label: 'Grants', bg: '#E5ECFE', color: '#1C31D5' },

      { label: 'Scholarships', bg: '#E5ECFE', color: '#1C31D5' },

      { label: 'Programs', bg: '#E5ECFE', color: '#1C31D5' },

      { label: 'Training', bg: '#E5ECFE', color: '#1C31D5' },

    ],

    checklist: [

      'Receive applications',

      'Review applicants',

      'Manage application stages',

      'Track progress and outcomes',

    ],

    sampleRequirement: 'Portfolio / Work Samples',

    footerText: 'Full Application Workflow',

    icon: briefcaseIcon,

    iconBg: '#EFF4FF',

    heroImage: internalHero,

    accentColor: '#2F66C8',

  },

  {

    id: 'external',

    title: 'External Opportunity',

    description: 'Redirect applicant to an external website or application portal.',

    tags: [

      { label: 'Government', bg: '#FDEDD9', color: '#AD5028' },

      { label: 'University', bg: '#FDEDD9', color: '#AD5028' },

      { label: 'Corporate', bg: '#FDEDD9', color: '#AD5028' },

      { label: 'Partner Portal', bg: '#FDEDD9', color: '#AD5028' },

    ],

    checklist: [

      'Maintain existing application systems',

      'Drive traffic to external portals',

      'Track click-through engagement',

      'Publish alongside internal opportunities',

    ],

    sampleRequirement: 'Portfolio / Work Samples',

    footerText: 'External Application Flow',

    icon: globeIcon,

    iconBg: '#FEF1E0',

    heroImage: externalHero,

    accentColor: '#F17A16',

  },

  {

    id: 'express-interest',

    title: 'Express Interest',

    description: 'Collect interest and contact information without requiring a full application.',

    tags: [

      { label: 'Volunteer', bg: '#EAE3FB', color: '#5432D1' },

      { label: 'Events', bg: '#EAE3FB', color: '#5432D1' },

      { label: 'Community', bg: '#EAE3FB', color: '#5432D1' },

      { label: 'Mentorship', bg: '#EAE3FB', color: '#5432D1' },

    ],

    checklist: [

      'Faster submission process',

      'Capture participant interest',

      'Collect contact information',

      'Follow up later with qualified applicants',

    ],

    sampleRequirement: 'Portfolio / Work Samples',

    footerText: 'Interest Application Flow',

    icon: heartIcon,

    iconBg: '#E6DFFB',

    heroImage: expressHero,

    accentColor: '#6821CD',

  },

];

/** Opportunity type cards shown in the builder Type step (Figma: Internal + External only). */
export const SELECTABLE_OPPORTUNITY_TYPES = OPPORTUNITY_TYPES.filter(
  (t): t is OpportunityTypeDef & { id: 'internal' | 'external' } =>
    t.id === 'internal' || t.id === 'external',
);



export interface CategoryGroupDef {

  id: string;

  title: string;

  icon: StaticImageData;

  iconBg: string;

  tagBg: string;

  tagColor: string;

  subcategories: { id: string; label: string }[];

}



const BUILDER_ICON_BY_KEY: Record<string, StaticImageData> = {
  briefcase: briefcaseCatIcon,
  box: boxIcon,
  'hand-coins': handCoinsIcon,
  love: loveIcon,
  'book-open': bookOpenIcon,
  'heart-handshake': heartIcon,
  star: starIcon,
  'graduation-cap': graduationIcon,
};

export function mapCategoriesToBuilderGroups(
  categories: Array<{
    slug: string;
    title: string;
    icon?: string;
    iconBg?: string;
    tagBg?: string;
    tagColor?: string;
    color?: string;
    status?: string;
    tags?: Array<{ id: string; label: string; slug: string }>;
  }>,
): CategoryGroupDef[] {
  return categories
    .filter((c) => !c.status || c.status === 'Active')
    .map((c) => {
      const icon = (c.icon && BUILDER_ICON_BY_KEY[c.icon]) || briefcaseCatIcon;

      return {
        id: c.slug,
        title: c.title,
        icon,
        iconBg: c.iconBg || c.color || '#EFF4FF',
        tagBg: c.tagBg || c.color || '#EFF4FF',
        tagColor: c.tagColor || '#2F66C8',
        subcategories: (c.tags ?? []).map((t) => ({
          id: t.slug || t.id,
          label: t.label,
        })),
      };
    });
}

export interface BuilderTemplateDef {

  id: string;

  title: string;

  description: string;

  heroImage: StaticImageData;

  features: string[];

  checkColor: string;

  footerLabel: string;

  footerBg: string;

  footerColor: string;

}



export const BUILDER_TEMPLATES: BuilderTemplateDef[] = [

  {

    id: 'community-grant',

    title: 'Community Grant',

    description:

      'Funding opportunities designed for nonprofits, community projects, and local initiatives.',

    heroImage: grantBg,

    features: [

      'Organization Profile',

      'Project Proposal',

      'Budget Submission',

      'Supporting Documents',

      'Review Workflow',

    ],

    checkColor: '#1C31D5',

    footerLabel: 'Most Popular',

    footerBg: '#F0F2FF',

    footerColor: '#1C31D5',

  },

  {

    id: 'startup-grant',

    title: 'Startup Grant',

    description: 'For entrepreneurs, startups, and innovation-focused projects.',

    heroImage: startBg,

    features: [

      'Business Profile',

      'Pitch Deck',

      'Financial Plan',

      'Team Information',

      'Evaluation Framework',

    ],

    checkColor: '#208F36',

    footerLabel: 'Business Focused',

    footerBg: '#E3F6E9',

    footerColor: '#158435',

  },

  {

    id: 'research-grant',

    title: 'Research Grant',

    description: 'For academic research, scientific studies, and innovation projects.',

    heroImage: researchBg,

    features: [

      'Research Proposal',

      'Academic CV',

      'Ethics Approval',

      'Publication Plan',

      'Peer Review Workflow',

    ],

    checkColor: '#4213C6',

    footerLabel: 'Academic & Research',

    footerBg: '#ECE4FD',

    footerColor: '#4213C6',

  },

  {

    id: 'youth-development-grant',

    title: 'Youth Development Grant',

    description: 'Programs supporting youth education, leadership, and community engagement.',

    heroImage: youthBg,

    features: [

      'Program Overview',

      'Youth Impact Statement',

      'Partner Organizations',

      'Budget Breakdown',

      'Monitoring Plan',

    ],

    checkColor: '#EE7116',

    footerLabel: 'Youth Programs',

    footerBg: '#FEEED9',

    footerColor: '#EE7116',

  },

  {

    id: 'event-sponsorship',

    title: 'Event Sponsorship',

    description: 'Funding and support for events, conferences, and community programs.',

    heroImage: eventBg,

    features: [

      'Event Overview',

      'Sponsorship Tiers',

      'Marketing Plan',

      'Budget & ROI',

      'Event Timeline',

    ],

    checkColor: '#087C74',

    footerLabel: 'Events & Programs',

    footerBg: '#DBF5F6',

    footerColor: '#1D5770',

  },

  {

    id: 'scratch',

    title: 'Create From Scratch',

    description: 'Start with a blank opportunity and configure every section yourself.',

    heroImage: scratchBg,

    features: [

      'Full Customization',

      'No Preset Workflow',

      'Build Requirements Manually',

      'Custom Application Process',

    ],

    checkColor: '#5C607A',

    footerLabel: 'Advanced Option',

    footerBg: '#EEF2F8',

    footerColor: '#5C607A',

  },

];



export function getBuilderTemplate(id: string | null) {

  return BUILDER_TEMPLATES.find((t) => t.id === id) ?? null;

}



export const CREATE_OPTIONS = [
  { id: 'internal' as const, label: 'Create Internal Opportunity', href: '/opportunities/create/category' },
  { id: 'external' as const, label: 'Create External Opportunity', href: '/opportunities/create/category' },
  {
    id: 'express-interest' as const,
    label: 'Create Express Interest Opportunity',
    href: '/opportunities/create/category',
  },
] as const;



export function getCategoryRecommendation(opportunityType: string | null) {

  if (opportunityType === 'external') {

    return {

      title: 'Recommended Based On External Opportunity',

      descriptionLines: [

        "Since you're creating an external opportunity, the following categories support",

        'outbound application flows.',

      ],

      recommendedLabels: [
        'Employment & Skills',
        'Grants & Bursaries',
        'Education & Training',
        'Food & Nutrition',
      ],

    };

  }

  if (opportunityType === 'express-interest') {

    return {

      title: 'Recommended Based On Express Interest',

      descriptionLines: [

        "Since you're creating an express interest opportunity, the following categories support",

        'lightweight interest collection.',

      ],

      recommendedLabels: [
        'Volunteer',
        'Settlement Services',
        'Mental Health & Wellness',
        'Education & Training',
      ],

    };

  }

  return {

    title: 'Recommended Based On Internal Opportunity',

    descriptionLines: [

      "Since you're creating an internal Opportunity, the following categories support full opportunities workflows.",

    ],

    recommendedLabels: [
      'Volunteer',
      'Settlement Services',
      'Mental Health & Wellness',
      'Housing & Shelter',
    ],

  };

}


