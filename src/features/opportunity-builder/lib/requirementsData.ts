import type { LucideIcon } from 'lucide-react';
import {
  getBuilderTemplate,
  type CategoryGroupDef,
} from '@/features/opportunity-builder/lib/builderData';
import {
  AlignLeft,
  BarChart3,
  Building2,
  Calendar,
  CheckSquare,
  ChevronDown,
  FileText,
  FolderOpen,
  GraduationCap,
  Image,
  Lightbulb,
  Link2,
  ListChecks,
  Mic,
  PenLine,
  Star,
  Type,
  Upload,
  Video,
} from 'lucide-react';

export type RequirementCategory = 'documents' | 'links' | 'questions' | 'media' | 'custom';

export interface RequirementField {
  id: string;
  typeId: string;
  title: string;
  description: string;
  helpText?: string;
  required: boolean;
  category: RequirementCategory;
  acceptedFormats?: string[];
}

export interface RequirementTypeDef {
  id: string;
  title: string;
  description: string;
  category: RequirementCategory;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface RequirementCategoryDef {
  id: RequirementCategory;
  title: string;
  color: string;
  bg: string;
}

export const REQUIREMENT_CATEGORIES: RequirementCategoryDef[] = [
  { id: 'documents', title: 'Documents', color: '#2F66C8', bg: '#EFF4FF' },
  { id: 'links', title: 'Links', color: '#22C55E', bg: '#F0FDF4' },
  { id: 'questions', title: 'Questions', color: '#8865F1', bg: '#F5F2FF' },
  { id: 'media', title: 'Media', color: '#F17A16', bg: '#FEF1E0' },
  { id: 'custom', title: 'Custom', color: '#6821CD', bg: '#E6DFFB' },
];

export const REQUIREMENT_TYPES: RequirementTypeDef[] = [
  { id: 'resume', title: 'Resume', description: 'Upload your resume or CV', category: 'documents', icon: FileText, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
  { id: 'cover-letter', title: 'Cover Letter', description: 'Upload a cover letter', category: 'documents', icon: PenLine, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
  { id: 'proposal', title: 'Proposal', description: 'Upload your detailed project proposal', category: 'documents', icon: GraduationCap, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'portfolio', title: 'Portfolio', description: 'Upload a portfolio of work samples', category: 'documents', icon: FolderOpen, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
  { id: 'transcript', title: 'Transcript', description: 'Upload academic transcripts', category: 'documents', icon: FileText, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
  { id: 'recommendation-letter', title: 'Recommendation Letter', description: 'Upload a letter of recommendation', category: 'documents', icon: FileText, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
  { id: 'budget-plan', title: 'Budget Plan', description: 'Upload your project budget and financial plan', category: 'documents', icon: BarChart3, iconBg: '#F0FDF4', iconColor: '#22C55E' },
  { id: 'supporting-documents', title: 'Supporting Documents', description: 'Upload additional supporting files', category: 'documents', icon: FolderOpen, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
  { id: 'website', title: 'Website', description: 'Provide your website link', category: 'links', icon: Link2, iconBg: '#F0FDF4', iconColor: '#22C55E' },
  { id: 'linkedin', title: 'LinkedIn Profile', description: 'Provide your LinkedIn profile URL', category: 'links', icon: Link2, iconBg: '#F0FDF4', iconColor: '#22C55E' },
  { id: 'portfolio-url', title: 'Portfolio URL', description: 'Provide a link to your portfolio', category: 'links', icon: Link2, iconBg: '#F0FDF4', iconColor: '#22C55E' },
  { id: 'social-media', title: 'Social Media Link', description: 'Provide a social media profile link', category: 'links', icon: Link2, iconBg: '#F0FDF4', iconColor: '#22C55E' },
  { id: 'short-text', title: 'Short Text', description: 'Single-line text response', category: 'questions', icon: Type, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'long-text', title: 'Long Text', description: 'Multi-line text response', category: 'questions', icon: AlignLeft, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'multiple-choice', title: 'Multiple Choice', description: 'Select one option from a list', category: 'questions', icon: ListChecks, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'checkbox', title: 'Checkbox (Multiple)', description: 'Select multiple options', category: 'questions', icon: CheckSquare, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'dropdown', title: 'Dropdown', description: 'Select from a dropdown menu', category: 'questions', icon: ChevronDown, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'rating', title: 'Rating Scale', description: 'Rate on a numeric scale', category: 'questions', icon: Star, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'date', title: 'Date', description: 'Select a date', category: 'questions', icon: Calendar, iconBg: '#F5F2FF', iconColor: '#8865F1' },
  { id: 'video', title: 'Video Submission', description: 'Upload or link a video', category: 'media', icon: Video, iconBg: '#FEF1E0', iconColor: '#F17A16' },
  { id: 'audio', title: 'Audio Submission', description: 'Upload an audio file', category: 'media', icon: Mic, iconBg: '#FEF1E0', iconColor: '#F17A16' },
  { id: 'image-upload', title: 'Image Upload', description: 'Upload an image file', category: 'media', icon: Image, iconBg: '#FEF1E0', iconColor: '#F17A16' },
  { id: 'file-upload', title: 'File Upload', description: 'Upload any file type', category: 'documents', icon: Upload, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
  { id: 'organization-profile', title: 'Organization Profile', description: 'Upload your organization profile document', category: 'documents', icon: Building2, iconBg: '#EFF4FF', iconColor: '#2F66C8' },
];

export const TEMPLATE_REQUIREMENTS: Record<string, string[]> = {
  scratch: [],
  'community-grant': ['organization-profile', 'proposal', 'budget-plan', 'supporting-documents'],
  'startup-grant': ['organization-profile', 'proposal', 'budget-plan', 'supporting-documents'],
  'research-grant': ['proposal', 'resume', 'recommendation-letter', 'supporting-documents'],
  'youth-development-grant': ['proposal', 'cover-letter', 'budget-plan', 'supporting-documents'],
  'event-sponsorship': ['proposal', 'budget-plan', 'website', 'supporting-documents'],
};

export const FILE_FORMAT_OPTIONS = ['PDF', 'DOCX', 'DOC', 'PNG', 'JPG'] as const;

export const REQUIREMENTS_TIPS = [
  {
    title: 'Keep it focused',
    body: 'Only ask for information you truly need to evaluate applicants. Shorter applications get more completions.',
  },
  {
    title: 'Use required vs optional wisely',
    body: 'Mark core documents as required and supplementary items as optional to reduce drop-off.',
  },
  {
    title: 'Reorder for clarity',
    body: 'Place the most important requirements first so applicants know what to prepare upfront.',
  },
];

export const ELIGIBILITY_SECTIONS = [
  { id: 'required-documents', title: 'Required Documents', description: 'Documents applicants must submit' },
  { id: 'eligibility-criteria', title: 'Eligibility Criteria', description: 'Qualifications applicants must meet' },
];

export function getRequirementType(typeId: string): RequirementTypeDef | undefined {
  return REQUIREMENT_TYPES.find((t) => t.id === typeId);
}

export function createRequirementFromType(typeId: string): RequirementField | null {
  const type = getRequirementType(typeId);
  if (!type) return null;
  return {
    id: `${typeId}-${Date.now()}`,
    typeId: type.id,
    title: type.title,
    description: type.description,
    required: true,
    category: type.category,
  };
}

export function getDefaultRequirementsForTemplate(templateId: string | null): RequirementField[] {
  const typeIds =
    TEMPLATE_REQUIREMENTS[templateId ?? 'scratch'] ?? TEMPLATE_REQUIREMENTS['community-grant'];
  return typeIds
    .map((id) => createRequirementFromType(id))
    .filter((r): r is RequirementField => r !== null);
}

export function getSelectionSummary(
  opportunityType: string | null,
  category: string | null,
  template: string | null,
  groups: CategoryGroupDef[] = [],
): string {
  const typeLabel =
    opportunityType === 'internal'
      ? 'Internal Opportunity'
      : opportunityType === 'external'
        ? 'External Opportunity'
        : opportunityType === 'express-interest'
          ? 'Express Interest'
          : 'Opportunity';

  const group = category
    ? groups.find(
        (g) => g.id === category || g.subcategories.some((s) => s.id === category),
      )
    : null;
  const categoryLabel = group?.title ?? category ?? 'Category';

  const templateDef = getBuilderTemplate(template);
  const templateLabel = templateDef ? `${templateDef.title} Template` : 'Community Grant Template';

  return `${typeLabel} • ${categoryLabel} • ${templateLabel}`;
}
