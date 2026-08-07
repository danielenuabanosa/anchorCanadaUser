export type ExploreMeta = {
  categories: Array<{ key: string; label: string; count: number }>;
  popularSearches: string[];
  provinces: Array<{ label: string; count: number }>;
  jobTypes: Array<{ label: string; count: number }>;
  eligibility: Array<{ label: string; count: number }>;
  deadlines: Array<{ label: string; value?: string; count: number }>;
  refine: {
    remoteCount: number;
    closingSoonCount: number;
    totalLive: number;
    matchHints: Array<{ id: string; label: string; description: string }>;
  };
};
