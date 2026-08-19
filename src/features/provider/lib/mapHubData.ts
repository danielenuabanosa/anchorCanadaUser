import type { ApplicantRow, ApplicationStatus, ApplicationTab } from '@/app/(app)/applications/_components/applicationsHubData';
import type {
  OpportunityRow,
  OpportunityStatus,
  OpportunityTab,
  HealthStatus,
} from '@/app/(app)/opportunities/_components/opportunitiesHubData';

export type ApiProviderOpportunity = {
  id: string;
  title: string;
  opportunityType: 'internal' | 'external' | 'express-interest';
  category?: string | null;
  status: 'draft' | 'pending_review' | 'live' | 'closed' | 'rejected';
  location?: string | null;
  deadline?: string | null;
  createdAt: string;
  applicationCount?: number;
  savesCount?: number;
  viewsCount?: number;
  health?: string;
};

export type ApiProviderApplication = {
  id: string;
  opportunityTitle?: string;
  applicantName: string;
  applicantEmail: string;
  status: 'new' | 'under_review' | 'shortlisted' | 'interview' | 'rejected' | 'accepted' | 'withdrawn';
  createdAt: string;
  reviewerMemberId?: string | null;
  reviewer?: { id: string; name: string; email?: string } | null;
  opportunity?: {
    location?: string | null;
    province?: string | null;
    opportunityType?: 'internal' | 'external' | 'express-interest';
  };
};

function formatDate(value?: string | null) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function daysLeft(deadline?: string | null) {
  if (!deadline) return '-';
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Past due';
  if (diff === 0) return 'Today';
  return `${diff} days left`;
}

function mapOpportunityStatus(status: ApiProviderOpportunity['status']): OpportunityStatus {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'pending_review':
      return 'Scheduled';
    case 'live':
      return 'Active';
    case 'closed':
    case 'rejected':
      return 'Closed';
    default:
      return 'Draft';
  }
}

function mapApplicationStatus(status: ApiProviderApplication['status']): ApplicationStatus {
  switch (status) {
    case 'new':
    case 'under_review':
      return 'Under Review';
    case 'shortlisted':
      return 'Shortlisted';
    case 'interview':
      return 'Interview';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
    case 'withdrawn':
      return 'Rejected';
    default:
      return 'Under Review';
  }
}

function mapApplicationTab(status: ApiProviderApplication['status']): ApplicationTab {
  switch (status) {
    case 'new':
    case 'under_review':
      return 'under-review';
    case 'shortlisted':
      return 'shortlisted';
    case 'interview':
      return 'interview';
    case 'accepted':
      return 'accepted';
    case 'rejected':
    case 'withdrawn':
      return 'rejected';
    default:
      return 'all';
  }
}

/** Map API application status → hub row status + tab (for optimistic updates). */
export function applicationRowFieldsFromApiStatus(
  status: ApiProviderApplication['status'] | 'under_review' | 'shortlisted' | 'interview' | 'accepted' | 'rejected',
): { status: ApplicationStatus; tab: ApplicationTab } {
  const normalized = status === 'new' ? 'under_review' : status;
  return {
    status: mapApplicationStatus(normalized as ApiProviderApplication['status']),
    tab: mapApplicationTab(normalized as ApiProviderApplication['status']),
  };
}

function mapHealth(value?: string, applications = 0, status?: ApiProviderOpportunity['status']): HealthStatus {
  if (value === 'High Engagement' || value === 'Moderate Engagement' || value === 'Low Engagement' || value === '-') {
    return value;
  }
  if (applications >= 20) return 'High Engagement';
  if (applications >= 5) return 'Moderate Engagement';
  if (status === 'live') return 'Low Engagement';
  return '-';
}

export function mapApiOpportunityToRow(item: ApiProviderOpportunity): OpportunityRow {
  const uiStatus = mapOpportunityStatus(item.status);
  const tab: OpportunityTab =
    uiStatus === 'Draft'
      ? 'draft'
      : uiStatus === 'Closed'
        ? 'closed'
        : item.opportunityType;
  const applications = item.applicationCount ?? 0;

  return {
    id: item.id,
    name: item.title,
    category: item.category ?? 'General',
    type: item.opportunityType,
    status: uiStatus,
    applications,
    applicationsDisplay: applications,
    applicationsDelta: applications > 0 ? `${applications} total` : '-',
    views: item.viewsCount ?? 0,
    deadline: formatDate(item.deadline),
    daysLeft: daysLeft(item.deadline),
    health: mapHealth(item.health, applications, item.status),
    tab,
    postedDate: formatDate(item.createdAt),
  };
}

export function mapApiApplicationToRow(item: ApiProviderApplication): ApplicantRow {
  const created = item.createdAt ? new Date(item.createdAt) : null;
  const locationParts = [item.opportunity?.location, item.opportunity?.province].filter(Boolean);
  const typeMap = {
    internal: 'Internal',
    external: 'External',
    'express-interest': 'Express Interest',
  } as const;
  const opportunityType = item.opportunity?.opportunityType
    ? typeMap[item.opportunity.opportunityType]
    : 'Internal';

  return {
    id: item.id,
    applicant: item.applicantName,
    email: item.applicantEmail,
    location: locationParts.join(', ') || 'Canada',
    opportunity: item.opportunityTitle ?? 'Opportunity',
    opportunityType,
    status: mapApplicationStatus(item.status),
    appliedAt: formatDate(item.createdAt),
    appliedTime: created
      ? created.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })
      : undefined,
    reviewer: item.reviewer?.name || 'Unassigned',
    reviewerAvatar: undefined,
    avatar: '',
    tab: mapApplicationTab(item.status),
  };
}
