export type OpportunityType = 'job' | 'housing' | 'training' | 'funding' | 'community';
export type OpportunityStatus = 'open' | 'closed' | 'coming_soon';

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  status: OpportunityStatus;
  provider: string;
  location: string;
  province: string;
  description: string;
  tags: string[];
  deadline?: string;
  salary?: string;
  fundingAmount?: string;
  isSaved?: boolean;
  createdAt: string;
  slug: string;
}

export interface OpportunityFilters {
  type?: OpportunityType;
  province?: string;
  query?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedOpportunities {
  data: Opportunity[];
  total: number;
  page: number;
  totalPages: number;
}
