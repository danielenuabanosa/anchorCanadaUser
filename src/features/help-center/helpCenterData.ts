import {
  BellDot,
  BookOpenText,
  ChartLine,
  FileText,
  FileUser,
  Headset,
  MessageCircleQuestionMark,
  Search,
  ShieldUser,
  Video,
} from 'lucide-react';
import type { HelpCenterTab } from '@/store/helpCenterStore';

export const COMMAND_CENTER_ITEMS: { id: HelpCenterTab; label: string; icon: typeof Search }[] = [
  { id: 'search', label: 'Search Help', icon: Search },
  { id: 'faq', label: 'FAQ', icon: MessageCircleQuestionMark },
  { id: 'documentation', label: 'Documentation', icon: FileText },
  { id: 'video', label: 'Video Tutorial', icon: Video },
  { id: 'contact', label: 'Contact Support', icon: Headset },
];

export interface HelpArticle {
  id: string;
  title: string;
  description: string;
  icon: typeof BookOpenText;
}

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'publish',
    title: 'How to publish opportunities',
    description: 'Learn how to create and publish opportunities.',
    icon: BookOpenText,
  },
  {
    id: 'applicants',
    title: 'Managing applicants',
    description: 'Review, shortlist and manage applications.',
    icon: FileUser,
  },
  {
    id: 'reviewers',
    title: 'Assigning reviewers',
    description: 'How to assign and manage application reviewers.',
    icon: BellDot,
  },
  {
    id: 'verification',
    title: 'Organization verification',
    description: 'Steps to verify your organization on Anchor Canada',
    icon: ShieldUser,
  },
  {
    id: 'analytics',
    title: 'Analytics guide',
    description: 'Understand your analytics and reports.',
    icon: ChartLine,
  },
];

export interface HelpFaq {
  id: string;
  question: string;
  answer: string;
}

export const HELP_FAQS: HelpFaq[] = [
  {
    id: 'publish-opportunity',
    question: 'How to create and publish an opportunity',
    answer:
      'Use Start Opportunity Builder from the top bar or Opportunities page. Complete each step and publish from the review screen.',
  },
  {
    id: 'review-applications',
    question: 'Managing and reviewing applications',
    answer:
      'Open Application Management to review, shortlist, and update the status of applicants for any opportunity.',
  },
  {
    id: 'assign-reviewers',
    question: 'How to assign reviewers to applications',
    answer:
      'Select applicants in Application Management and use Assign Reviewer from the row actions menu or bulk toolbar.',
  },
  {
    id: 'analytics-reports',
    question: 'Understanding analytics and reports',
    answer:
      'The Analytics page shows applicant demographics, opportunity performance, and exportable reports for your organization.',
  },
  {
    id: 'verification-process',
    question: 'Organization verification process',
    answer:
      'Verification confirms your nonprofit or business identity so opportunities appear with a trusted badge. Submit your documents from Organization Profile.',
  },
  {
    id: 'billing-subscription',
    question: 'Billing and subscription questions',
    answer: 'Manage your plan, invoices, and payment methods from Settings > Billing.',
  },
];

export const REPORT_CATEGORY_OPTIONS = ['Opportunity', 'Applications', 'Team', 'Billing', 'Account', 'Other'] as const;

export const REPORT_PRIORITY_OPTIONS = [
  { label: 'Low', color: '#22C55E' },
  { label: 'Medium', color: '#F59E0B' },
  { label: 'High', color: '#EF4444' },
] as const;

export interface ReportAttachment {
  id: string;
  name: string;
  size: string;
}

export const DEFAULT_REPORT_ATTACHMENTS: ReportAttachment[] = [
  { id: 'screenshot', name: 'screenshot.png', size: '1.2 MB' },
  { id: 'error-log', name: 'error-log.txt', size: '16 MB' },
];

export const REPORT_SUBMITTER = {
  name: 'Sarah Johnson',
  email: 'sarah.j@maplefuture.ca',
  referenceId: '#HD-2087',
};
