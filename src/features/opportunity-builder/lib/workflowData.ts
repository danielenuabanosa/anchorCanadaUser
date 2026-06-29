import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Calendar,
  CircleCheckBig,
  ExternalLink,
  FileSearch,
  FileText,
  ListTodo,
  Send,
  Users,
} from 'lucide-react';
import type { WorkflowType } from '@/store/opportunityBuilderStore';

export const WORKFLOW_SUB_ROUTES: Record<WorkflowType, string> = {
  internal: '/opportunities/create/workflow/internal',
  external: '/opportunities/create/workflow/external',
  'express-interest': '/opportunities/create/workflow/express-interest',
};

export interface WorkflowJourneyStep {
  label: string;
  icon: LucideIcon;
}

export interface WorkflowModelDef {
  id: WorkflowType;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  journeyStepBg: string;
  tagBg: string;
  tagColor: string;
  accentColor: string;
  journey: WorkflowJourneyStep[];
  bestFor: string[];
}

export const WORKFLOW_MODELS: WorkflowModelDef[] = [
  {
    id: 'internal',
    title: 'Internal Workflow',
    description: 'Applications are submitted and managed directly inside Anchor Canada.',
    icon: Building2,
    iconBg: '#EAF1FE',
    journeyStepBg: '#E3EDFE',
    tagBg: '#E5ECFE',
    tagColor: '#1C31D5',
    accentColor: '#2F66C8',
    journey: [
      { label: 'Submit Application', icon: FileText },
      { label: 'Review', icon: FileText },
      { label: 'Shortlist', icon: Users },
      { label: 'Interview', icon: Calendar },
      { label: 'Decision', icon: CircleCheckBig },
    ],
    bestFor: ['Grants', 'Scholarship', 'Jobs', 'Programs'],
  },
  {
    id: 'external',
    title: 'External Workflow',
    description: 'Redirect applicants to a third-party application system outside Anchor.',
    icon: ExternalLink,
    iconBg: '#F6F0FF',
    journeyStepBg: '#F6F0FF',
    tagBg: '#F6F0FF',
    tagColor: '#422EC0',
    accentColor: '#6821CD',
    journey: [
      { label: 'View Opportunity', icon: FileText },
      { label: 'Apply Externally', icon: ExternalLink },
      { label: 'Complete Application', icon: Calendar },
      { label: 'Self Track Progress', icon: ListTodo },
    ],
    bestFor: ['Government Programs', 'University Portals', 'Corporate Careers'],
  },
  {
    id: 'express-interest',
    title: 'Express Interest Workflow',
    description: 'Collect expressions of interest before formal application or selection begins.',
    icon: Users,
    iconBg: '#E9F5F1',
    journeyStepBg: '#E9F5F1',
    tagBg: '#E9F5F1',
    tagColor: '#1A7945',
    accentColor: '#15803D',
    journey: [
      { label: 'Express Interest', icon: FileText },
      { label: 'Provider Review', icon: FileSearch },
      { label: 'Contact Applicant', icon: Send },
      { label: 'Invitation / Next Step', icon: Send },
    ],
    bestFor: ['Mentorship Programs', 'Community Programs', 'Volunteer Opportunities'],
  },
];

export const WORKFLOW_COMPARISON = {
  features: [
    'Applicant Tracking',
    'Status Update',
    'Application Forms',
    'Custom Workflow',
    'Team Collaboration',
  ],
  values: {
    internal: [
      'Full Tracking',
      'Real-time Updates',
      'Custom Forms',
      'Fully Customizable',
      'Full Collaboration',
    ],
    external: ['Not Available', 'Not Available', 'Not Available', 'Not Available', 'Not Available'],
    'express-interest': [
      'Partial Tracking',
      'Manual Updates',
      'Optional Forms',
      'Limited Customization',
      'Basic Collaboration',
    ],
  },
} as const;

export const WORKFLOW_RECOMMENDATION = {
  templateName: 'Community Youth Leadership Grant',
  workflow: 'internal' as WorkflowType,
  reason:
    'This opportunity requires document submission, review stages, and applicants tracking.',
};

export type ApplicantVisibility = 'visible' | 'hidden' | 'invite-only';

export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  statusLabel: string;
  stageType: string;
  assignedReviewer: string;
  backupReviewer: string;
  applicantVisibility: ApplicantVisibility;
  notifyApplicant: boolean;
  notifyReviewer: boolean;
  notifyAdmins: boolean;
  customNotification: boolean;
  requireManualApproval: boolean;
  allowReviewerAdvance: boolean;
  autoAdvanceDays: number | null;
  skipIfNotApplicable: boolean;
  actions: string[];
}

export const REVIEWER_OPTIONS = [
  'Program Manager',
  'Review Panel Lead',
  'HR Coordinator',
  'Grant Administrator',
] as const;

export const STAGE_TYPE_OPTIONS = [
  'Review',
  'Interview',
  'Document Review',
  'Decision',
  'Screening',
] as const;

export const STATUS_LABEL_OPTIONS = [
  'Under Review',
  'Interview Scheduled',
  'Documents Pending',
  'Shortlisted',
  'Final Decision',
] as const;

export const STAGE_ACTIONS = [
  'Schedule Interview',
  'Request Documents',
  'Leave Notes',
  'Assign Reviewer',
] as const;

let stageIdCounter = 0;

function newStageId() {
  stageIdCounter += 1;
  return `stage-${Date.now()}-${stageIdCounter}`;
}

export function createDefaultStage(partial?: Partial<WorkflowStage>): WorkflowStage {
  return {
    id: partial?.id ?? newStageId(),
    name: partial?.name ?? 'New Stage',
    description: partial?.description ?? '',
    statusLabel: partial?.statusLabel ?? 'Under Review',
    stageType: partial?.stageType ?? 'Review',
    assignedReviewer: partial?.assignedReviewer ?? 'Program Manager',
    backupReviewer: partial?.backupReviewer ?? '',
    applicantVisibility: partial?.applicantVisibility ?? 'visible',
    notifyApplicant: partial?.notifyApplicant ?? true,
    notifyReviewer: partial?.notifyReviewer ?? true,
    notifyAdmins: partial?.notifyAdmins ?? true,
    customNotification: partial?.customNotification ?? false,
    requireManualApproval: partial?.requireManualApproval ?? true,
    allowReviewerAdvance: partial?.allowReviewerAdvance ?? true,
    autoAdvanceDays: partial?.autoAdvanceDays ?? null,
    skipIfNotApplicable: partial?.skipIfNotApplicable ?? false,
    actions: partial?.actions ?? ['Schedule Interview', 'Request Documents'],
  };
}

export const DEFAULT_INTERNAL_STAGES: WorkflowStage[] = [
  createDefaultStage({
    id: 'stage-1',
    name: 'Application Submitted',
    description: 'Initial application received and logged in the system.',
    statusLabel: 'Under Review',
    stageType: 'Screening',
    applicantVisibility: 'visible',
    actions: ['Leave Notes'],
  }),
  createDefaultStage({
    id: 'stage-2',
    name: 'Eligibility Review',
    description: 'Verify applicant meets basic eligibility requirements.',
    statusLabel: 'Under Review',
    stageType: 'Review',
    applicantVisibility: 'visible',
  }),
  createDefaultStage({
    id: 'stage-3',
    name: 'Document Review',
    description: 'Review submitted documents and supporting materials.',
    statusLabel: 'Documents Pending',
    stageType: 'Document Review',
    applicantVisibility: 'visible',
    actions: ['Request Documents', 'Leave Notes'],
  }),
  createDefaultStage({
    id: 'stage-4',
    name: 'Shortlisted',
    description: 'Applicant has been shortlisted for further evaluation.',
    statusLabel: 'Shortlisted',
    stageType: 'Review',
    applicantVisibility: 'visible',
  }),
  createDefaultStage({
    id: 'stage-5',
    name: 'Interview',
    description: 'Candidate evaluation and screening through interviews with the review panel.',
    statusLabel: 'Interview Scheduled',
    stageType: 'Interview',
    applicantVisibility: 'visible',
    actions: ['Schedule Interview', 'Request Documents', 'Leave Notes', 'Assign Reviewer'],
  }),
];

export type RedirectType = 'confirmation-modal' | 'immediate' | 'preparation-page';
export type OpenApplicationIn = 'new-tab' | 'same-tab';

export interface ExternalWorkflowConfig {
  applicationUrl: string;
  destinationName: string;
  platform: string;
  openIn: OpenApplicationIn;
  redirectType: RedirectType;
  supportEmail: string;
  supportPhone: string;
  supportWebsite: string;
  prepMessage: string;
  beforeRedirect: {
    opportunitySummary: boolean;
    eligibilityReminder: boolean;
    deadlineReminder: boolean;
    requiredDocumentsReminder: boolean;
  };
  tracking: {
    trackViews: boolean;
    trackApplyClicks: boolean;
    trackConversions: boolean;
    trackTrafficSources: boolean;
    trackDeviceTypes: boolean;
  };
}

export const DEFAULT_EXTERNAL_CONFIG: ExternalWorkflowConfig = {
  applicationUrl: 'https://apply.university.ca/grants',
  destinationName: 'University Grant Portal',
  platform: 'University Website',
  openIn: 'new-tab',
  redirectType: 'confirmation-modal',
  supportEmail: 'support@university.ca',
  supportPhone: '+1 (416) 555-1234',
  supportWebsite: 'https://www.university.ca/support',
  prepMessage:
    'Before you leave Anchor Canada, please review the opportunity details and prepare any required documents for your external application.',
  beforeRedirect: {
    opportunitySummary: true,
    eligibilityReminder: true,
    deadlineReminder: true,
    requiredDocumentsReminder: true,
  },
  tracking: {
    trackViews: true,
    trackApplyClicks: true,
    trackConversions: true,
    trackTrafficSources: true,
    trackDeviceTypes: true,
  },
};

export const REDIRECT_TYPE_OPTIONS: { id: RedirectType; title: string; description: string }[] = [
  {
    id: 'confirmation-modal',
    title: 'Confirmation Modal',
    description: 'Show a confirmation modal before applicants leave Anchor.',
  },
  {
    id: 'immediate',
    title: 'Immediate Redirect',
    description: 'Redirect applicant directly to the external website.',
  },
  {
    id: 'preparation-page',
    title: 'Preparation Page',
    description: 'Show an information page with guidance before redirecting.',
  },
];

export const PLATFORM_OPTIONS = [
  'University Website',
  'Government Portal',
  'Corporate Careers Site',
  'Partner Application Portal',
] as const;

export type QuestionType = 'long-text' | 'short-text' | 'single-select' | 'file-upload';

export interface ExpressInterestQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
}

export type ReviewMethod = 'manual' | 'auto' | 'hybrid';
export type InvitationMethod = 'selected' | 'auto' | 'manual';

export interface ExpressInterestConfig {
  questions: ExpressInterestQuestion[];
  reviewMethod: ReviewMethod;
  invitationMethod: InvitationMethod;
  qualificationCriteria: string[];
  notificationsEnabled: string[];
  capacityLimit: number | null;
  visibility: 'public' | 'invite-only';
}

export const DEFAULT_EXPRESS_QUESTIONS: ExpressInterestQuestion[] = [
  {
    id: 'q-1',
    label: 'Why are you interested in this program?',
    type: 'long-text',
    required: true,
  },
  {
    id: 'q-2',
    label: 'Do you have prior experience in this area?',
    type: 'single-select',
    required: true,
  },
  {
    id: 'q-3',
    label: 'Upload your resume or portfolio',
    type: 'file-upload',
    required: true,
  },
];

export const DEFAULT_EXPRESS_CONFIG: ExpressInterestConfig = {
  questions: DEFAULT_EXPRESS_QUESTIONS,
  reviewMethod: 'manual',
  invitationMethod: 'selected',
  qualificationCriteria: [
    'Minimum age requirement',
    'Geographic eligibility',
    'Experience level',
    'Availability commitment',
    'Background check clearance',
  ],
  notificationsEnabled: [
    'New interest submission',
    'Qualification match alert',
    'Invitation sent confirmation',
    'Follow-up reminder',
  ],
  capacityLimit: null,
  visibility: 'public',
};

export const REVIEW_METHOD_OPTIONS: { id: ReviewMethod; title: string; description: string }[] = [
  {
    id: 'manual',
    title: 'Manual Review',
    description: 'Review all interest submissions manually.',
  },
  {
    id: 'auto',
    title: 'Auto Qualifications',
    description: 'Automatically qualify candidates based on rules.',
  },
  {
    id: 'hybrid',
    title: 'Hybrid Review',
    description: 'Auto qualify by rules, then manual review.',
  },
];

export const INVITATION_METHOD_OPTIONS: {
  id: InvitationMethod;
  title: string;
  description: string;
}[] = [
  {
    id: 'selected',
    title: 'Invite Selected Users',
    description: 'You choose who to invite.',
  },
  {
    id: 'auto',
    title: 'Auto Qualifications',
    description: 'Invite all candidates who meet criteria.',
  },
  {
    id: 'manual',
    title: 'Manual Invitation Only',
    description: "You'll send invitations outside the system.",
  },
];

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  'long-text': 'Long Text',
  'short-text': 'Short Text',
  'single-select': 'Single Select',
  'file-upload': 'File Upload',
};

export function getWorkflowLabel(type: WorkflowType | null): string {
  if (!type) return 'Not selected';
  return WORKFLOW_MODELS.find((m) => m.id === type)?.title ?? type;
}
