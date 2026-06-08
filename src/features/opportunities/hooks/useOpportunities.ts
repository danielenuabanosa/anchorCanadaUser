'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { opportunityService } from '../services/opportunity.service';
import type { OpportunityFilters } from '../types';

export const OPPORTUNITY_KEYS = {
  all:    ['opportunities'] as const,
  lists:  () => [...OPPORTUNITY_KEYS.all, 'list'] as const,
  list:   (f: OpportunityFilters) => [...OPPORTUNITY_KEYS.lists(), f] as const,
  detail: (id: string) => [...OPPORTUNITY_KEYS.all, 'detail', id] as const,
};

export function useOpportunities(filters: OpportunityFilters = {}) {
  return useQuery({
    queryKey: OPPORTUNITY_KEYS.list(filters),
    queryFn:  () => opportunityService.list(filters),
  });
}

export function useOpportunity(id: string) {
  return useQuery({
    queryKey: OPPORTUNITY_KEYS.detail(id),
    queryFn:  () => opportunityService.getById(id),
    enabled:  !!id,
  });
}

export function useSaveOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isSaved }: { id: string; isSaved: boolean }) =>
      isSaved ? opportunityService.unsave(id) : opportunityService.save(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: OPPORTUNITY_KEYS.all });
    },
  });
}
