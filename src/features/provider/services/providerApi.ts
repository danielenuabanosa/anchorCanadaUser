import apiClient from '@/lib/api';
import { isStaticMode } from '@/lib/staticMode';
import {
  MOCK_API_PROVIDER_APPLICATIONS,
  MOCK_API_PROVIDER_OPPORTUNITIES,
} from '@/lib/mockData';

export interface PublishOpportunityPayload {
  title: string;
  description?: string;
  opportunityType: 'internal' | 'external' | 'express-interest';
  category?: string | null;
  template?: string | null;
  location?: string;
  province?: string;
  tags?: string[];
  builderPayload: Record<string, unknown>;
  publish?: boolean;
}

export type ProviderHubOverview = {
  stats: {
    total: number;
    live: number;
    draft: number;
    pendingReview: number;
    closed: number;
    applications: number;
    needingAttention: number;
  };
  recentActivity: Array<{
    id: string;
    name: string;
    action: string;
    time: string;
    status: string;
    opportunityId: string;
  }>;
  attentionAlerts?: Array<{
    id: string;
    opportunityId: string;
    title: string;
    opportunity: string;
    details: string[];
    actionLabel: string;
    action: string;
  }>;
};

export type ProviderDashboardResponse = {
  organizationName: string;
  dateRangeLabel: string;
  stats: {
    activeListings: { value: number; changePct: string };
    totalApplicants: { value: number; changePct: string };
    engagementRate: { value: string; changePct: string };
    activeMembers: { value: number; changePct: string };
  };
  organizationStatus: {
    verification: string;
    verificationStatus: string;
    profileComplete: number;
    memberSince: string;
  };
  performance: {
    metrics: {
      views: { value: string; change: string };
      saves: { value: string; change: string };
      applications: { value: string; change: string };
      conversionRate: { value: string; change: string };
    };
    chart: Array<{ label: string; views: number; saves: number; applications: number }>;
  };
  activeOpportunities: Array<{
    id: string;
    name: string;
    status: string;
    applications: number;
    postedDate: string;
    deadline: string;
  }>;
  recentApplications: Array<{
    id: string;
    applicant: string;
    appliedFor: string;
    status: string;
    timeLabel: string;
    avatarUrl?: string | null;
  }>;
  teamActivity: Array<{
    id: string;
    member: string;
    action: string;
    time: string;
    createdAt: string;
    kind: 'edit' | 'review' | 'publish' | 'shortlist' | 'invite';
  }>;
};

export const providerApi = {
  async getOnboarding() {
    if (isStaticMode()) {
      return {
        onboardingCompleted: false,
        verificationStatus: 'unverified',
        data: {},
        documents: [],
      };
    }
    const { data } = await apiClient.get('/provider/onboarding');
    return data as {
      onboardingCompleted: boolean;
      verificationStatus: string;
      step?: string | null;
      data: Record<string, unknown>;
      documents: unknown[];
    };
  },

  async saveOnboarding(
    _data: Record<string, unknown>,
    options: boolean | { markComplete?: boolean; submitVerification?: boolean; step?: string } = false,
  ) {
    if (isStaticMode()) return { ok: true };
    const opts =
      typeof options === 'boolean'
        ? { markComplete: options, submitVerification: options }
        : options;
    const { data: result } = await apiClient.post('/provider/onboarding', {
      data: _data,
      markComplete: opts.markComplete === true,
      submitVerification: opts.submitVerification === true,
      step: opts.step,
    });
    return result;
  },

  async saveOnboardingDraft(_data: Record<string, unknown>, step?: string) {
    if (isStaticMode()) return { ok: true };
    const { data: result } = await apiClient.patch('/provider/onboarding', {
      data: _data,
      step,
    });
    return result;
  },

  async getDashboard(period = '7d'): Promise<ProviderDashboardResponse> {
    if (isStaticMode()) {
      return {
        organizationName: 'Your organization',
        dateRangeLabel: 'Last 7 days',
        stats: {
          activeListings: { value: 0, changePct: '0%' },
          totalApplicants: { value: 0, changePct: '0%' },
          engagementRate: { value: '0%', changePct: '0%' },
          activeMembers: { value: 1, changePct: '0%' },
        },
        organizationStatus: {
          verification: 'Unverified',
          verificationStatus: 'unverified',
          profileComplete: 0,
          memberSince: '—',
        },
        performance: {
          metrics: {
            views: { value: '0', change: '0%' },
            saves: { value: '0', change: '0%' },
            applications: { value: '0', change: '0%' },
            conversionRate: { value: '0%', change: '0%' },
          },
          chart: [],
        },
        activeOpportunities: [],
        recentApplications: [],
        teamActivity: [],
      };
    }
    const { data } = await apiClient.get<ProviderDashboardResponse>('/provider/dashboard', {
      params: { period },
    });
    return data;
  },

  async getAnalytics(period = '30d') {
    if (isStaticMode()) return null;
    const { data } = await apiClient.get('/provider/analytics', { params: { period } });
    return data;
  },

  async publishOpportunity(payload: PublishOpportunityPayload) {
    if (isStaticMode()) {
      return {
        id: `opp-static-${Date.now()}`,
        title: payload.title,
        status: payload.publish === false ? 'draft' : 'published',
      };
    }

    const { data } = await apiClient.post('/provider/opportunities', {
      ...payload,
      publish: payload.publish ?? true,
    });
    return data;
  },

  async listOpportunities(params?: { status?: string; page?: number; limit?: number }) {
    if (isStaticMode()) return MOCK_API_PROVIDER_OPPORTUNITIES;

    const { data } = await apiClient.get<{ data: unknown[] }>('/provider/opportunities', {
      params,
    });
    return data.data;
  },

  async getOpportunitiesOverview(): Promise<ProviderHubOverview> {
    if (isStaticMode()) {
      return {
        stats: {
          total: MOCK_API_PROVIDER_OPPORTUNITIES.length,
          live: MOCK_API_PROVIDER_OPPORTUNITIES.filter((o) => o.status === 'live').length,
          draft: MOCK_API_PROVIDER_OPPORTUNITIES.filter((o) => o.status === 'draft').length,
          pendingReview: MOCK_API_PROVIDER_OPPORTUNITIES.filter((o) => o.status === 'pending_review')
            .length,
          closed: MOCK_API_PROVIDER_OPPORTUNITIES.filter(
            (o) => o.status === 'closed' || o.status === 'rejected',
          ).length,
          applications: MOCK_API_PROVIDER_APPLICATIONS.length,
          needingAttention: 0,
        },
        recentActivity: MOCK_API_PROVIDER_APPLICATIONS.slice(0, 5).map((a) => ({
          id: a.id,
          name: a.applicantName,
          action: `applied to ${a.opportunityTitle ?? 'an opportunity'}`,
          time: 'Recently',
          status: a.status,
          opportunityId: '',
        })),
      };
    }

    const { data } = await apiClient.get<ProviderHubOverview>('/provider/opportunities-overview');
    return data;
  },

  async getOpportunity(id: string, detail = false) {
    if (isStaticMode()) {
      return MOCK_API_PROVIDER_OPPORTUNITIES.find((o) => o.id === id) ?? null;
    }
    const { data } = await apiClient.get(`/provider/opportunities/${id}`, {
      params: detail ? { detail: '1' } : undefined,
    });
    return data;
  },

  async listOpportunityApplications(opportunityId: string) {
    if (isStaticMode()) {
      return MOCK_API_PROVIDER_APPLICATIONS.filter(
        (a) => (a as { opportunityId?: string }).opportunityId === opportunityId,
      );
    }
    const { data } = await apiClient.get<{ data: unknown[] }>(
      `/provider/opportunities/${opportunityId}/applications`,
    );
    return data.data;
  },

  async updateOpportunity(id: string, payload: Record<string, unknown>) {
    if (isStaticMode()) return { ok: true, id, ...payload };
    const { data } = await apiClient.patch(`/provider/opportunities/${id}`, payload);
    return data;
  },

  async closeOpportunity(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/opportunities/${id}/close`);
    return data;
  },

  async reopenOpportunity(id: string) {
    if (isStaticMode()) return { ok: true, status: 'draft' };
    const { data } = await apiClient.post(`/provider/opportunities/${id}/reopen`);
    return data;
  },

  async deleteOpportunity(id: string) {
    if (isStaticMode()) return { ok: true };
    await apiClient.delete(`/provider/opportunities/${id}`);
    return { ok: true };
  },

  async submitOpportunity(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/opportunities/${id}/submit`);
    return data;
  },

  async duplicateOpportunity(id: string) {
    if (isStaticMode()) {
      return { id: `opp-copy-${Date.now()}`, title: 'Copy', status: 'draft' };
    }
    const { data } = await apiClient.post(`/provider/opportunities/${id}/duplicate`);
    return data as { id: string; title: string; status: string };
  },

  async listApplications(params?: { status?: string; opportunityId?: string; page?: number; limit?: number }) {
    if (isStaticMode()) {
      if (params?.opportunityId) {
        return MOCK_API_PROVIDER_APPLICATIONS.filter(
          (a) => (a as { opportunityId?: string }).opportunityId === params.opportunityId,
        );
      }
      return MOCK_API_PROVIDER_APPLICATIONS;
    }

    const { data } = await apiClient.get<{ data: unknown[] }>('/provider/applications', {
      params,
    });
    return data.data;
  },

  async getApplicationsOverview() {
    if (isStaticMode()) {
      return {
        stats: {
          total: MOCK_API_PROVIDER_APPLICATIONS.length,
          new: 0,
          underReview: 0,
          shortlisted: 0,
          interview: 0,
          accepted: 0,
          rejected: 0,
          archived: 0,
          needingAttention: 0,
        },
        recentActivity: [],
      };
    }
    const { data } = await apiClient.get('/provider/applications-overview');
    return data as {
      stats: {
        total: number;
        new: number;
        underReview: number;
        shortlisted: number;
        interview: number;
        accepted: number;
        rejected: number;
        archived: number;
        needingAttention: number;
      };
      recentActivity: Array<{
        id: string;
        name: string;
        action: string;
        time: string;
        status: string;
        opportunityId: string;
      }>;
    };
  },

  async getApplication(id: string) {
    if (isStaticMode()) {
      return MOCK_API_PROVIDER_APPLICATIONS.find((a) => a.id === id) ?? null;
    }
    const { data } = await apiClient.get(`/provider/applications/${id}`);
    return data;
  },

  async getApplicationMessages(applicationId: string) {
    if (isStaticMode()) return [];
    const { data } = await apiClient.get<{ data: unknown[] }>(
      `/provider/applications/${applicationId}/messages`,
    );
    return data.data ?? [];
  },

  async sendApplicationMessage(applicationId: string, content: string) {
    if (isStaticMode()) {
      return {
        id: String(Date.now()),
        content,
        isMe: true,
        createdAt: new Date().toISOString(),
      };
    }
    const { data } = await apiClient.post<{ data: unknown }>(
      `/provider/applications/${applicationId}/messages`,
      { content },
    );
    return data.data;
  },

  async unreadMessageCount() {
    if (isStaticMode()) return 0;
    const { data } = await apiClient.get<{ unreadCount: number }>('/provider/messages/unread-count');
    return data.unreadCount ?? 0;
  },

  async getMessagesInbox() {
    if (isStaticMode()) return [];
    const { data } = await apiClient.get<{
      data: Array<{
        applicationId: string;
        applicantName: string;
        opportunityTitle: string;
        preview: string;
        lastMessageAt: string | null;
        unreadCount: number;
      }>;
    }>('/provider/messages/inbox');
    return data.data ?? [];
  },

  async markApplicationMessagesRead(applicationId: string) {
    if (isStaticMode()) return { marked: 0 };
    const { data } = await apiClient.post<{ marked: number }>(
      `/provider/applications/${applicationId}/messages/read`,
    );
    return data;
  },

  async unreadNotificationCount() {
    if (isStaticMode()) return 0;
    const { data } = await apiClient.get<{ unreadCount: number }>('/notifications/unread-count');
    return data.unreadCount ?? 0;
  },

  async updateApplicationStatus(
    id: string,
    payload: { status: string; stage?: string; providerNotes?: string; note?: string },
  ) {
    if (isStaticMode()) return { ok: true, id, ...payload };
    const { data } = await apiClient.patch(`/provider/applications/${id}`, payload);
    return data;
  },

  async getTeam() {
    if (isStaticMode()) {
      return {
        members: [],
        stats: {
          total: 0,
          active: 0,
          pending: 0,
          administrators: 0,
          reviewers: 0,
          interviewers: 0,
        },
      };
    }
    const { data } = await apiClient.get('/provider/team');
    return data;
  },

  async getTeamMember(id: string) {
    if (isStaticMode()) return null;
    const { data } = await apiClient.get(`/provider/team/${id}`);
    return data;
  },

  async inviteTeamMember(payload: {
    email: string;
    name?: string;
    role: string;
    department?: string;
    title?: string;
    notes?: string;
    permissions?: string[];
  }) {
    if (isStaticMode()) return { ok: true, ...payload };
    const { data } = await apiClient.post('/provider/team/invite', payload);
    return data;
  },

  async resendTeamInvite(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/team/${id}/resend`);
    return data;
  },

  async cancelTeamInvite(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/team/${id}/cancel-invite`);
    return data;
  },

  async updateTeamMember(
    id: string,
    payload: {
      role?: string;
      department?: string;
      title?: string;
      name?: string;
      permissions?: string[];
    },
  ) {
    if (isStaticMode()) return { ok: true, id, ...payload };
    const { data } = await apiClient.patch(`/provider/team/${id}`, payload);
    return data;
  },

  async suspendTeamMember(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/team/${id}/suspend`);
    return data;
  },

  async activateTeamMember(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/team/${id}/activate`);
    return data;
  },

  async removeTeamMember(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.delete(`/provider/team/${id}`);
    return data;
  },

  async pauseOpportunity(id: string) {
    if (isStaticMode()) return { ok: true, paused: true };
    const { data } = await apiClient.post(`/provider/opportunities/${id}/pause`);
    return data;
  },

  async unpauseOpportunity(id: string) {
    if (isStaticMode()) return { ok: true, paused: false };
    const { data } = await apiClient.post(`/provider/opportunities/${id}/unpause`);
    return data;
  },

  async assignReviewer(applicationId: string, reviewerMemberId: string) {
    if (isStaticMode()) return { ok: true, reviewerMemberId };
    const { data } = await apiClient.post(`/provider/applications/${applicationId}/assign-reviewer`, {
      reviewerMemberId,
    });
    return data;
  },

  /** Bulk assign — Assign Reviewer modal → Reviewer Assigned success (Modal 2) */
  async assignReviewers(applicationIds: string[], reviewerMemberId: string) {
    if (isStaticMode()) {
      return {
        assigned: applicationIds.length,
        reviewer: { id: reviewerMemberId, name: 'Reviewer', email: '' },
      };
    }
    const { data } = await apiClient.post('/provider/applications/assign-reviewer', {
      applicationIds,
      reviewerMemberId,
    });
    return data as {
      assigned: number;
      reviewer: { id: string; name: string; email: string } | null;
      applications?: unknown[];
    };
  },

  async listReviewers() {
    if (isStaticMode()) return [];
    const { data } = await apiClient.get<{
      data: Array<{ id: string; name: string; role: string; active: number; email?: string }>;
    }>('/provider/team/reviewers');
    return data.data ?? [];
  },

  async getTeamActivity(limit = 12) {
    if (isStaticMode()) return [];
    const { data } = await apiClient.get<{
      data: Array<{
        id: string;
        memberName: string;
        action: string;
        timeLabel: string;
        isNew?: boolean;
        applicationId?: string;
      }>;
    }>('/provider/team/activity', { params: { limit } });
    return data.data ?? [];
  },

  async getTeamPerformance(period = '30d') {
    if (isStaticMode()) return null;
    const { data } = await apiClient.get('/provider/team/performance', { params: { period } });
    return data as {
      period: string;
      dateRangeLabel: string;
      metrics: Array<{ id: string; label: string; value: string; trend: string }>;
      members: Array<{
        id: string;
        name: string;
        email: string;
        applicationsReviewed: number;
        avgReviewTime: string;
        interviewsConducted: number;
      }>;
    };
  },

  async scheduleInterview(
    applicationId: string,
    payload: {
      date: string;
      time: string;
      duration: number | string;
      interviewType: string;
      meetingLink?: string;
      notes?: string;
      mode?: 'schedule' | 'reschedule' | 'complete';
    },
  ) {
    if (isStaticMode()) return { ok: true, ...payload };
    const { data } = await apiClient.post(
      `/provider/applications/${applicationId}/schedule-interview`,
      payload,
    );
    return data;
  },

  async archiveApplication(applicationId: string, note?: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/applications/${applicationId}/archive`, { note });
    return data;
  },

  async unarchiveApplication(applicationId: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/provider/applications/${applicationId}/unarchive`);
    return data;
  },

  async requestDocuments(
    applicationId: string,
    payload?: { message?: string; documentTypes?: string[] },
  ) {
    if (isStaticMode()) return { ok: true, ...payload };
    const { data } = await apiClient.post(
      `/provider/applications/${applicationId}/request-documents`,
      payload ?? {},
    );
    return data;
  },

  async getTeamInvite(token: string) {
    if (isStaticMode()) {
      return {
        id: 'static',
        email: 'invitee@example.com',
        name: 'Invitee',
        role: 'Reviewer',
        organizationName: 'Demo Organization',
        expiresAt: null,
      };
    }
    const { data } = await apiClient.get(`/provider/team/invite/${encodeURIComponent(token)}`);
    return data as {
      id: string;
      email: string;
      name: string;
      role: string;
      organizationName: string;
      expiresAt: string | null;
    };
  },

  async acceptTeamInvite(token: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post('/provider/team/accept', { token });
    return data as {
      member: unknown;
      organizationName: string;
    };
  },

  async getOrganization() {
    if (isStaticMode()) return null;
    const { data } = await apiClient.get('/provider/organization');
    return data;
  },

  async getOrganizationStats() {
    if (isStaticMode()) {
      return {
        activeOpportunities: { value: 0, change: '0%' },
        totalApplications: { value: 0, change: '0%' },
        teamMembers: { value: 0, change: '0%' },
        profileViews: { value: 0, change: '0%' },
      };
    }
    const { data } = await apiClient.get('/provider/organization/stats');
    return data;
  },

  async getOrganizationVerification() {
    if (isStaticMode()) {
      return {
        verificationStatus: 'unverified',
        completion: 0,
        verification: { items: [], completed: 0, total: 0 },
        documents: [],
      };
    }
    const { data } = await apiClient.get('/provider/organization/verification');
    return data;
  },

  async updateOrganization(payload: Record<string, unknown>) {
    if (isStaticMode()) return { ok: true, ...payload };
    const { data } = await apiClient.patch('/provider/organization', payload);
    return data;
  },

  async submitOrganizationVerification(payload?: {
    verificationType?: string;
    documentIds?: string[];
  }) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post('/provider/organization/submit-verification', payload ?? {});
    return data;
  },

  async listOrganizationDocuments() {
    if (isStaticMode()) return [];
    const { data } = await apiClient.get<{ data: unknown[] }>('/provider/organization/documents');
    return data.data;
  },

  async addOrganizationDocument(payload: {
    name: string;
    docType?: string;
    fileUrl?: string;
    fileSize?: string;
  }) {
    if (isStaticMode()) return { ok: true, ...payload };
    const { data } = await apiClient.post('/provider/organization/documents', payload);
    return data;
  },

  async uploadOrganizationDocument(file: File, docType?: string) {
    if (isStaticMode()) {
      return {
        id: `doc-${Date.now()}`,
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        docType: docType ?? 'other',
      };
    }
    const form = new FormData();
    form.append('file', file);
    if (docType) form.append('docType', docType);
    const { data } = await apiClient.post('/provider/organization/documents/upload', form);
    return data as { id: string; name: string; size?: string; docType?: string; fileUrl?: string };
  },

  async uploadOrganizationLogo(file: File): Promise<{
    ok?: boolean;
    logoUrl?: string;
    profile?: { logoUrl?: string | null };
  }> {
    if (isStaticMode()) return { ok: true, logoUrl: URL.createObjectURL(file) };
    const form = new FormData();
    form.append('logo', file);
    const { data } = await apiClient.post('/provider/organization/logo', form);
    return data as { logoUrl?: string; profile?: { logoUrl?: string | null } };
  },

  async uploadOrganizationCover(file: File): Promise<{
    ok?: boolean;
    coverUrl?: string;
    profile?: { coverUrl?: string | null };
  }> {
    if (isStaticMode()) return { ok: true, coverUrl: URL.createObjectURL(file) };
    const form = new FormData();
    form.append('cover', file);
    const { data } = await apiClient.post('/provider/organization/cover', form);
    return data as { coverUrl?: string; profile?: { coverUrl?: string | null } };
  },

  async deleteOrganizationDocument(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.delete(`/provider/organization/documents/${id}`);
    return data;
  },

  async archiveOrganization() {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post('/provider/organization/archive');
    return data;
  },

  async deleteOrganization() {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post('/provider/organization/delete');
    return data;
  },

  async createSupportTicket(payload: {
    category: string;
    subject: string;
    description: string;
    priority?: 'low' | 'normal' | 'high';
    metadata?: Record<string, unknown>;
  }) {
    if (isStaticMode()) return { ok: true, ...payload };
    const { data } = await apiClient.post('/provider/support-tickets', payload);
    return data;
  },

  async listNotifications(params?: {
    category?: string;
    unreadOnly?: boolean;
    status?: string;
    dateRange?: string;
    sort?: string;
  }) {
    if (isStaticMode()) return { data: [], unreadCount: 0 };
    const { data } = await apiClient.get('/notifications', { params });
    return data;
  },

  async getNotificationSummary() {
    if (isStaticMode()) {
      return {
        cards: {
          unread: 0,
          teamAlerts: 0,
          opportunityAlerts: 0,
          applications: 0,
          systemAlerts: 0,
        },
        tabs: { all: 0, applications: 0, team: 0, opportunities: 0, system: 0, security: 0 },
        unreadCount: 0,
      };
    }
    const { data } = await apiClient.get('/notifications/summary');
    return data as {
      cards: {
        unread: number;
        teamAlerts: number;
        opportunityAlerts: number;
        applications: number;
        systemAlerts: number;
      };
      tabs: {
        all: number;
        applications: number;
        team: number;
        opportunities: number;
        system: number;
        security: number;
      };
      unreadCount: number;
    };
  },

  async getRecentNotifications() {
    if (isStaticMode()) return { data: [] };
    const { data } = await apiClient.get('/notifications/recent-activity');
    return data as {
      data: Array<{
        id: string;
        category: string;
        label: string;
        subtitle: string;
        time: string;
        createdAt?: string;
      }>;
    };
  },

  async markNotificationRead(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post(`/notifications/${id}/read`);
    return data;
  },

  async markAllNotificationsRead() {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post('/notifications/read-all');
    return data;
  },

  async deleteNotification(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.delete(`/notifications/${id}`);
    return data;
  },

  async deleteNotifications(ids: string[]) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.post('/notifications/delete-many', { ids });
    return data;
  },

  async getNotificationPreferences() {
    if (isStaticMode()) return { emailEnabled: true, pushEnabled: true, categories: {} };
    const { data } = await apiClient.get('/notifications/preferences');
    return data;
  },

  async updateNotificationPreferences(payload: {
    emailEnabled?: boolean;
    pushEnabled?: boolean;
    categories?: Record<string, unknown>;
  }) {
    if (isStaticMode()) return payload;
    const { data } = await apiClient.put('/notifications/preferences', payload);
    return data;
  },

  async changePassword(payload: { currentPassword: string; password: string }) {
    if (isStaticMode()) return { ok: true };
    await apiClient.post('/auth/reset-password', payload);
    return { ok: true };
  },

  async forgotPassword(email: string) {
    if (isStaticMode()) return { ok: true };
    await apiClient.post('/auth/forgot-password', { email });
    return { ok: true };
  },

  async completePasswordReset(payload: { email: string; token: string; password: string }) {
    if (isStaticMode()) return { ok: true };
    await apiClient.post('/auth/complete-password-reset', payload);
    return { ok: true };
  },

  async getMe() {
    if (isStaticMode()) return null;
    const { data } = await apiClient.get('/provider/me');
    return data;
  },

  async getSettings() {
    if (isStaticMode()) {
      return {
        organizationName: '',
        organizationEmail: '',
        timezone: 'America/Toronto',
        currency: 'CAD',
        language: 'en-CA',
        timeFormat: '12h' as const,
        dateFormat: 'DD MMM YYYY',
        weekStartsOn: 'monday' as const,
        website: '',
      };
    }
    const { data } = await apiClient.get('/provider/settings');
    return data;
  },

  async updateSettings(payload: Record<string, unknown>) {
    if (isStaticMode()) return payload;
    const { data } = await apiClient.patch('/provider/settings', payload);
    return data;
  },

  async listSessions() {
    if (isStaticMode()) return { data: [] };
    const { data } = await apiClient.get('/provider/sessions');
    return data as {
      data: Array<{
        id: string;
        device: string;
        location: string;
        ip: string | null;
        current: boolean;
        lastActiveAt: string;
        createdAt: string;
      }>;
    };
  },

  async revokeSession(id: string) {
    if (isStaticMode()) return { ok: true };
    const { data } = await apiClient.delete(`/provider/sessions/${id}`);
    return data;
  },
};
