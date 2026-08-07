import type { HubStat } from '@/app/(app)/opportunities/_components/opportunitiesHubData';
import type { OpportunityRow } from '@/app/(app)/opportunities/_components/opportunitiesHubData';
import type {
  ApplicationStat,
  ApplicantRow,
  ApplicationTab,
} from '@/app/(app)/applications/_components/applicationsHubData';
import {
  BookOpenCheck,
  Briefcase,
  CalendarDays,
  FileText,
  LockKeyhole,
  Rocket,
  UserX,
  Users,
} from 'lucide-react';

export function buildOpportunityHubStats(rows: OpportunityRow[]): HubStat[] {
  const active = rows.filter((r) => r.status === 'Active').length;
  const draft = rows.filter((r) => r.status === 'Draft').length;
  const scheduled = rows.filter((r) => r.status === 'Scheduled').length;
  const closed = rows.filter((r) => r.status === 'Closed').length;
  const apps = rows.reduce((sum, r) => sum + (Number(r.applications) || 0), 0);

  return [
    {
      label: 'Total Opportunities',
      value: rows.length,
      subtext: 'Across all statuses',
      icon: Briefcase,
      iconBg: 'bg-[#EDF9F1]',
      iconColor: 'text-[#15803D]',
    },
    {
      label: 'Active',
      value: active,
      subtext: 'Live opportunities',
      icon: Rocket,
      iconBg: 'bg-[#EFF4FF]',
      iconColor: 'text-[#2F66C8]',
    },
    {
      label: 'Drafts',
      value: draft,
      subtext: 'Not yet submitted',
      icon: FileText,
      iconBg: 'bg-[#FFF3E3]',
      iconColor: 'text-[#D97706]',
    },
    {
      label: 'Pending Review',
      value: scheduled,
      subtext: 'Awaiting admin',
      icon: BookOpenCheck,
      iconBg: 'bg-[#EFE8FD]',
      iconColor: 'text-[#7C3AED]',
    },
    {
      label: 'Closed',
      value: closed,
      subtext: 'No longer accepting',
      icon: LockKeyhole,
      iconBg: 'bg-[#FEE8E9]',
      iconColor: 'text-[#DB2777]',
    },
  ];
}

export function buildOpportunityTabCounts(rows: OpportunityRow[]) {
  return {
    all: rows.length,
    internal: rows.filter((r) => r.tab === 'internal').length,
    external: rows.filter((r) => r.tab === 'external').length,
    'express-interest': rows.filter((r) => r.tab === 'express-interest').length,
    draft: rows.filter((r) => r.tab === 'draft').length,
    closed: rows.filter((r) => r.tab === 'closed').length,
  };
}

export function buildApplicationHubStats(rows: ApplicantRow[]): ApplicationStat[] {
  const underReview = rows.filter((r) => r.status === 'Under Review').length;
  const shortlisted = rows.filter((r) => r.status === 'Shortlisted').length;
  const interview = rows.filter((r) => r.status === 'Interview').length;
  const accepted = rows.filter((r) => r.status === 'Accepted').length;
  const rejected = rows.filter((r) => r.status === 'Rejected').length;

  return [
    {
      label: 'Total Applications',
      value: rows.length,
      subtext: 'All applicants',
      icon: Rocket,
      iconBg: 'bg-[#EDF9F1]',
      iconColor: 'text-[#15803D]',
    },
    {
      label: 'Under Review',
      value: underReview,
      subtext: 'Awaiting decision',
      icon: BookOpenCheck,
      iconBg: 'bg-[#FFF3E3]',
      iconColor: 'text-[#D97706]',
    },
    {
      label: 'Shortlisted',
      value: shortlisted,
      subtext: 'Moving forward',
      icon: CalendarDays,
      iconBg: 'bg-[#EFE8FD]',
      iconColor: 'text-[#7C3AED]',
    },
    {
      label: 'Interview',
      value: interview,
      subtext: 'In progress',
      icon: LockKeyhole,
      iconBg: 'bg-[#FEE8E9]',
      iconColor: 'text-[#DB2777]',
    },
    {
      label: 'Accepted',
      value: accepted,
      subtext: 'Offers sent',
      icon: Users,
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#15803D]',
    },
    {
      label: 'Rejected',
      value: rejected,
      subtext: 'Closed out',
      icon: UserX,
      iconBg: 'bg-[#FEE2E2]',
      iconColor: 'text-[#B91C1C]',
    },
  ];
}

export function buildApplicationTabCounts(rows: ApplicantRow[]): Record<ApplicationTab | 'all', number> {
  return {
    all: rows.length,
    'under-review': rows.filter((r) => r.tab === 'under-review').length,
    shortlisted: rows.filter((r) => r.tab === 'shortlisted').length,
    interview: rows.filter((r) => r.tab === 'interview').length,
    accepted: rows.filter((r) => r.tab === 'accepted').length,
    rejected: rows.filter((r) => r.tab === 'rejected').length,
  };
}
