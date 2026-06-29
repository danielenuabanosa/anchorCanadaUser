import avatar1 from '@assets/images/profile-avatar.png';
import type { ApplicantRow, ApplicationStatus, ApplicationTab } from '@/app/(app)/applications/_components/applicationsHubData';
import type {
  OpportunityRow,
  OpportunityStatus,
  OpportunityTab,
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
};

export type ApiProviderApplication = {
  id: string;
  opportunityTitle?: string;
  applicantName: string;
  applicantEmail: string;
  status: 'new' | 'under_review' | 'shortlisted' | 'rejected' | 'accepted';
  createdAt: string;
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
  return `${diff} days`;
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
    case 'accepted':
      return 'Accepted';
    case 'rejected':
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
    case 'accepted':
      return 'accepted';
    case 'rejected':
      return 'rejected';
    default:
      return 'all';
  }
}

export function mapApiOpportunityToRow(item: ApiProviderOpportunity): OpportunityRow {
  const uiStatus = mapOpportunityStatus(item.status);
  const tab: OpportunityTab =
    uiStatus === 'Draft'
      ? 'draft'
      : uiStatus === 'Closed'
        ? 'closed'
        : item.opportunityType;

  return {
    id: item.id,
    name: item.title,
    category: item.category ?? 'General',
    type: item.opportunityType,
    status: uiStatus,
    applications: 0,
    applicationsDisplay: 0,
    applicationsDelta: '-',
    views: 0,
    deadline: formatDate(item.deadline),
    daysLeft: daysLeft(item.deadline),
    health: '-',
    tab,
  };
}

export function mapApiApplicationToRow(item: ApiProviderApplication): ApplicantRow {
  const created = item.createdAt ? new Date(item.createdAt) : null;
  return {
    id: item.id,
    applicant: item.applicantName,
    email: item.applicantEmail,
    location: 'Canada',
    opportunity: item.opportunityTitle ?? 'Opportunity',
    opportunityType: 'Internal',
    status: mapApplicationStatus(item.status),
    appliedAt: formatDate(item.createdAt),
    appliedTime: created
      ? created.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })
      : undefined,
    reviewer: 'Unassigned',
    reviewerAvatar: avatar1,
    avatar: avatar1,
    tab: mapApplicationTab(item.status),
  };
}
