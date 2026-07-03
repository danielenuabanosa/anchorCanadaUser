import {
  Rocket,
  BadgeCheck,
  FileText,
  Users,
  CreditCard,
  Shield,
  BookOpen,
  MessageCircle,
  Mail,
} from 'lucide-react';
import type { ElementType } from 'react';

export const HELP_CATEGORIES = [
  { id: 'start', title: 'Getting Started', desc: 'Learn the basics of the provider portal', icon: Rocket, color: 'bg-[#EFF4FF] text-[#2F66C8]' },
  { id: 'opp', title: 'Opportunities', desc: 'Create, publish and manage listings', icon: BadgeCheck, color: 'bg-[#ECFDF5] text-[#15803D]' },
  { id: 'apps', title: 'Applications', desc: 'Review and manage applicants', icon: FileText, color: 'bg-[#F4F1FE] text-[#7C3AED]' },
  { id: 'team', title: 'Team & Permissions', desc: 'Invite members and manage roles', icon: Users, color: 'bg-[#FFF7ED] text-[#C2410C]' },
  { id: 'billing', title: 'Billing', desc: 'Plans, invoices and payments', icon: CreditCard, color: 'bg-[#E0F2FE] text-[#0369A1]' },
  { id: 'security', title: 'Security', desc: 'Account safety and verification', icon: Shield, color: 'bg-[#FEE2E2] text-[#B91C1C]' },
];

export const HELP_FAQS: { q: string; a: string }[] = [
  {
    q: 'How do I publish an opportunity?',
    a: 'Use Start Opportunity Builder from the top bar or Opportunities page. Complete each step and publish from the review screen.',
  },
  {
    q: 'How can I assign reviewers to applications?',
    a: 'Open Application Management, select applicants, and use Assign Reviewer from the row actions menu or bulk toolbar.',
  },
  {
    q: 'How do I invite team members?',
    a: 'Go to Providers Team and click Invite Team Member. Enter their email and role to send an invitation.',
  },
  {
    q: 'What does organization verification include?',
    a: 'Verification confirms your nonprofit or business identity so opportunities appear with a trusted badge.',
  },
  {
    q: 'Can I export application data?',
    a: 'Yes. Use Export Report on the Application Management page to download a CSV of filtered applicants.',
  },
];

export const POPULAR_ARTICLES = [
  { title: 'Creating your first opportunity', icon: BookOpen },
  { title: 'Understanding application statuses', icon: FileText },
  { title: 'Managing team roles', icon: Users },
];
