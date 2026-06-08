import type { OpportunityType } from '@/features/opportunities/types';

export interface Category {
  id: string;
  slug: string;
  type: OpportunityType;
  title: string;
  description: string;
  icon: string;
  opportunityCount: number;
  color: string;
}
