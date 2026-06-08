import type { ReactNode } from 'react';

export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface PaginationMeta {
  page:       number;
  limit:      number;
  total:      number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data:  T[];
  meta:  PaginationMeta;
}
