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





import type { OptionCardDef } from '@/features/onboarding/components/ProviderOptionCard';



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



export const BUILDER_CATEGORY_GROUPS: CategoryGroupDef[] = [

  {
    id: 'employment-skills',
    title: 'Employment & Skills',
    icon: briefcaseCatIcon,
    iconBg: '#EFF4FF',
    tagBg: '#EFF4FF',
    tagColor: '#2F66C8',
    subcategories: [
      { id: 'employment-job', label: 'Job' },
      { id: 'employment-training', label: 'Training' },
      { id: 'employment-internships', label: 'Internships' },
      { id: 'employment-counselling', label: 'Counselling' },
      { id: 'employment-resume', label: 'Resume Workshop' },
    ],
  },
  {
    id: 'food-nutrition',
    title: 'Food & Nutrition',
    icon: boxIcon,
    iconBg: '#E3F6E9',
    tagBg: '#E3F6E9',
    tagColor: '#158435',
    subcategories: [
      { id: 'food-bank', label: 'Food Bank' },
      { id: 'food-community', label: 'Community' },
      { id: 'food-delivery', label: 'Food Delivery' },
      { id: 'food-school-meals', label: 'School Meals' },
    ],
  },
  {
    id: 'grants-bursaries',
    title: 'Grants & Bursaries',
    icon: handCoinsIcon,
    iconBg: '#ECE4FD',
    tagBg: '#ECE4FD',
    tagColor: '#4213C6',
    subcategories: [
      { id: 'grants-innovation', label: 'Innovation Grant' },
      { id: 'grants-bursary', label: 'Student Bursary' },
      { id: 'grants-startup', label: 'Startup Grant' },
      { id: 'grants-financial-aid', label: 'Financial Aid' },
    ],
  },
  {
    id: 'mental-health',
    title: 'Mental Health & Wellness',
    icon: loveIcon,
    iconBg: '#FEEED9',
    tagBg: '#FEEED9',
    tagColor: '#EE7116',
    subcategories: [
      { id: 'mental-counselling', label: 'Counselling' },
      { id: 'mental-support-group', label: 'Support Group' },
      { id: 'mental-workshops', label: 'Workshops' },
      { id: 'mental-addiction', label: 'Addiction Support' },
    ],
  },
  {
    id: 'education-training',
    title: 'Education & Training',
    icon: bookOpenIcon,
    iconBg: '#ECE4FD',
    tagBg: '#ECE4FD',
    tagColor: '#4213C6',
    subcategories: [
      { id: 'edu-linc', label: 'LINC/ESL' },
      { id: 'edu-tutoring', label: 'Tutoring' },
      { id: 'edu-literacy', label: 'Literacy Program' },
      { id: 'edu-digital', label: 'Digital Skills' },
    ],
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    icon: heartIcon,
    iconBg: '#FDE8EB',
    tagBg: '#FDE8EB',
    tagColor: '#DE1735',
    subcategories: [
      { id: 'volunteer-cleanup', label: 'Env Cleanup' },
      { id: 'volunteer-hospitals', label: 'Hospitals' },
      { id: 'volunteer-animal', label: 'Animal Shelter' },
      { id: 'volunteer-mentoring', label: 'Youth Mentoring' },
    ],
  },
  {
    id: 'housing-shelter',
    title: 'Housing & Shelter',
    icon: starIcon,
    iconBg: '#DBF5F6',
    tagBg: '#DBF5F6',
    tagColor: '#087C74',
    subcategories: [
      { id: 'housing-shelter', label: 'Shelter' },
      { id: 'housing-rent', label: 'Rent Supplement' },
      { id: 'housing-repair', label: 'Home Repair' },
      { id: 'housing-youth', label: 'Youth Housing' },
    ],
  },
  {
    id: 'settlement-services',
    title: 'Settlement Services',
    icon: graduationIcon,
    iconBg: '#FEF5DD',
    tagBg: '#FEF5DD',
    tagColor: '#D48A01',
    subcategories: [
      { id: 'settlement-orientation', label: 'Orientation' },
      { id: 'settlement-legal', label: 'Legal Aid' },
      { id: 'settlement-immigration', label: 'Immigration' },
      { id: 'settlement-cred', label: 'Cred Recognition' },
    ],
  },

];



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



/** @deprecated Use BUILDER_CATEGORY_GROUPS for builder category step */

export const BUILDER_CATEGORIES = [

  { id: 'jobs', title: 'Jobs & Careers', desc: 'Employment, internships, and career pathways', tags: ['Hiring', 'Internships'] },

  { id: 'grants', title: 'Grants & Funding', desc: 'Financial support for projects and initiatives', tags: ['Funding', 'Scholarships'] },

  { id: 'programs', title: 'Programs & Training', desc: 'Skills development and educational programs', tags: ['Training', 'Education'] },

  { id: 'volunteer', title: 'Volunteer & Community', desc: 'Community service and volunteer roles', tags: ['Volunteer', 'Community'] },

  { id: 'mentorship', title: 'Mentorship', desc: 'Guidance and professional development', tags: ['Mentorship', 'Coaching'] },

  { id: 'events', title: 'Events & Workshops', desc: 'Conferences, workshops, and gatherings', tags: ['Events', 'Workshops'] },

  { id: 'membership', title: 'Memberships', desc: 'Cohort-based and membership programs', tags: ['Membership', 'Cohort'] },

  { id: 'research', title: 'Research & Innovation', desc: 'Research positions and innovation challenges', tags: ['Research', 'Innovation'] },

  { id: 'other', title: 'Other Opportunities', desc: 'Custom opportunity types', tags: ['Custom'] },

] as const;



const CATEGORY_TAG_COLORS: Record<string, { bg: string; color: string }> = {

  jobs: { bg: '#EFF4FF', color: '#2F66C8' },

  grants: { bg: '#FFF3E0', color: '#F99710' },

  programs: { bg: '#EBE5FC', color: '#6821CD' },

  volunteer: { bg: '#DCF0EA', color: '#1A975F' },

  mentorship: { bg: '#ECF1FD', color: '#0842E8' },

  events: { bg: '#FDF0F2', color: '#E32B60' },

  membership: { bg: '#FEEADE', color: '#EB3819' },

  research: { bg: '#EDF7F0', color: '#0F6C30' },

  other: { bg: '#DCF4F2', color: '#09A39A' },

};



const CATEGORY_ICONS: Record<string, { icon: StaticImageData; iconBg: string }> = {

  jobs: { icon: briefcaseCatIcon, iconBg: '#EFF4FF' },

  grants: { icon: handCoinsIcon, iconBg: '#FFF3E0' },

  programs: { icon: graduationIcon, iconBg: '#EBE5FC' },

  volunteer: { icon: heartIcon, iconBg: '#DCF0EA' },

  mentorship: { icon: starIcon, iconBg: '#ECF1FD' },

  events: { icon: boxIcon, iconBg: '#FDF0F2' },

  membership: { icon: bookOpenIcon, iconBg: '#FEEADE' },

  research: { icon: briefcaseIcon, iconBg: '#EDF7F0' },

  other: { icon: loveIcon, iconBg: '#DCF4F2' },

};



export const BUILDER_CATEGORY_CARDS: OptionCardDef[] = BUILDER_CATEGORIES.map((cat) => {

  const colors = CATEGORY_TAG_COLORS[cat.id] ?? CATEGORY_TAG_COLORS.other;

  const icons = CATEGORY_ICONS[cat.id] ?? CATEGORY_ICONS.other;

  return {

    id: cat.id,

    title: cat.title,

    desc: cat.desc,

    tags: cat.tags.map((label) => ({ label, ...colors })),

    icon: icons.icon,

    iconBg: icons.iconBg,

  };

});



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


