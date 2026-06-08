export interface DashboardStats {
  savedOpportunities: number;
  applicationsSubmitted: number;
  profileCompletion: number;
  newOpportunitiesThisWeek: number;
}

export interface ActivityItem {
  id: string;
  type: 'saved' | 'applied' | 'deadline' | 'new';
  title: string;
  description: string;
  createdAt: string;
  opportunityId?: string;
}
