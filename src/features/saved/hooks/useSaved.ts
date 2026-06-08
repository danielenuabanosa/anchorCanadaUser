'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { savedService } from '../services/saved.service';

export const SAVED_KEYS = {
  all: ['saved'] as const,
};

export function useSaved() {
  return useQuery({
    queryKey: SAVED_KEYS.all,
    queryFn:  () => savedService.list(),
  });
}

export function useRemoveSaved() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => savedService.remove(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: SAVED_KEYS.all }),
  });
}
