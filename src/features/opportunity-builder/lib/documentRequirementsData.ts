export type DocumentInputKind = 'File Upload' | 'Link' | 'Text Input';

export type ApplicationMode = 'express-interest' | 'full-application';

export interface DocumentRequirement {
  id: string;
  title: string;
  description: string;
  inputKind: DocumentInputKind;
  enabled: boolean;
  required: boolean;
  isCustom?: boolean;
}

export interface RequirementsApplicationConfig {
  applicationMode: ApplicationMode;
  leaveMessage: string;
  estimatedTime: string;
  googleFormLink: string;
}

export const ESTIMATED_TIME_OPTIONS = [
  '5 minutes',
  '10 minutes',
  '15 minutes',
  '20 minutes',
  '30 minutes',
  '45 minutes',
  '1 hour',
] as const;

export const DOCUMENT_TYPE_OPTIONS = [
  'File Upload',
  'Link',
  'Text Input',
] as const satisfies readonly DocumentInputKind[];

export const DEFAULT_DOCUMENT_REQUIREMENTS: DocumentRequirement[] = [
  {
    id: 'cv-resume',
    title: 'CV / Resume',
    description: 'Upload a current résumé that highlights your education and experience.',
    inputKind: 'File Upload',
    enabled: true,
    required: true,
  },
  {
    id: 'cover-letter',
    title: 'Cover letter',
    description: 'Share a brief cover letter explaining your interest and fit.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
  {
    id: 'proof-identity',
    title: 'Proof of identity',
    description: 'Passport, PR card, or other government-issued identification.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
  {
    id: 'proof-immigration',
    title: 'Proof of immigration status',
    description: 'Provide documentation confirming your immigration status in Canada.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
  {
    id: 'transcript',
    title: 'Transcript / academic record',
    description: 'Upload your most recent academic transcript or credentials.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
  {
    id: 'reference-letter',
    title: 'Reference letter',
    description: 'Include a signed reference letter from a supervisor or mentor.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
  {
    id: 'portfolio',
    title: 'Portfolio / work samples',
    description: 'Share a link to relevant work samples or a digital portfolio.',
    inputKind: 'Link',
    enabled: false,
    required: false,
  },
  {
    id: 'proof-enrolment',
    title: 'Proof of enrolment',
    description: 'Confirm current enrolment at a recognized institution.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
  {
    id: 'personal-statement',
    title: 'Supporting statement / personal statement',
    description: 'Write a short statement describing your goals and motivation.',
    inputKind: 'Text Input',
    enabled: false,
    required: false,
  },
  {
    id: 'financial-statement',
    title: 'Financial statement',
    description: 'Upload documents that demonstrate financial need or budgeting.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
  {
    id: 'business-plan',
    title: 'Business plan',
    description: 'Provide a structured overview of your venture or project plan.',
    inputKind: 'File Upload',
    enabled: false,
    required: false,
  },
];

export const DEFAULT_APPLICATION_CONFIG: RequirementsApplicationConfig = {
  applicationMode: 'express-interest',
  leaveMessage: '',
  estimatedTime: '15 minutes',
  googleFormLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc...',
};

export function documentToRequirementField(doc: DocumentRequirement) {
  return {
    id: doc.id,
    typeId: doc.isCustom ? 'file-upload' : doc.id,
    title: doc.title,
    description: doc.description,
    required: doc.required,
    category: (doc.inputKind === 'Link'
      ? 'links'
      : doc.inputKind === 'Text Input'
        ? 'questions'
        : 'documents') as 'documents' | 'links' | 'questions' | 'media' | 'custom',
  };
}
