export type ProviderDirectoryItem = {
  id: string;
  name: string;
  type: string;
  location: string;
  province: string;
  verified: boolean;
  description: string;
  opportunities: number;
  followers: string;
  logoKey: null;
  logoUrl?: string | null;
  initials: string;
  hiringNow: boolean;
  code: string;
  verificationStatus?: string;
};

export type ProviderListParams = {
  query?: string;
  industry?: string;
  province?: string;
  orgType?: string;
  verifiedOnly?: boolean;
  hiringNow?: boolean;
  sort?: 'relevant' | 'name-asc' | 'opportunities';
};

export type ProviderFacets = {
  industries: Array<{ label: string; count: number }>;
  provinces: Array<{ label: string; count: number }>;
  orgTypes: Array<{ label: string; count: number }>;
};
