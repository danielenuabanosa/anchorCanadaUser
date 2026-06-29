export interface OpportunityDetails {
  title: string;
  summary: string;
  description: string;
  coverImage: string;
  opensDate: string;
  deadlineDate: string;
  programStartDate: string;
  programEndDate: string;
  opportunityType: string;
  fundingAmount: string;
  mode: string;
  country: string;
  province: string;
  city: string;
  ageMin: string;
  ageMax: string;
  educationLevel: string;
  citizenship: string;
  residency: string;
  visibility: string;
  featured: boolean;
  allowBookmarking: boolean;
  allowSharing: boolean;
}

export const DEFAULT_DETAILS: OpportunityDetails = {
  title: 'Community Youth Leadership Grant',
  summary:
    'Funding for youth-led community initiatives that build leadership skills and create lasting positive change in local neighborhoods.',
  description:
    'This grant supports youth-led projects that strengthen community leadership, civic engagement, and social impact. Applicants should demonstrate a clear plan, measurable outcomes, and community benefit.',
  coverImage: '',
  opensDate: '2026-05-01',
  deadlineDate: '2026-06-30',
  programStartDate: '2026-07-15',
  programEndDate: '2026-12-31',
  opportunityType: 'grants',
  fundingAmount: '10000',
  mode: 'remote',
  country: 'Canada',
  province: 'Ontario',
  city: 'Toronto',
  ageMin: '18',
  ageMax: '30',
  educationLevel: 'undergraduate',
  citizenship: 'canadian',
  residency: 'Ontario, Alberta, British Columbia',
  visibility: 'public',
  featured: true,
  allowBookmarking: true,
  allowSharing: true,
};

export const OPPORTUNITY_TYPE_OPTIONS = [
  { value: 'grants', label: 'Grants' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'programs', label: 'Programs' },
  { value: 'scholarships', label: 'Scholarships' },
  { value: 'volunteer', label: 'Volunteer' },
];

export const MODE_OPTIONS = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'in-person', label: 'In-person' },
];

export const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'invite-only', label: 'Invite Only' },
];

export const EDUCATION_LEVEL_OPTIONS = [
  { value: 'high-school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
];

export const CITIZENSHIP_OPTIONS = [
  { value: 'canadian', label: 'Canadian Citizens' },
  { value: 'permanent-resident', label: 'Permanent Residents' },
  { value: 'international', label: 'International Students' },
  { value: 'any', label: 'Any' },
];

export const COUNTRY_OPTIONS = ['Canada', 'United States'];
export const PROVINCE_OPTIONS = ['Ontario', 'Alberta', 'British Columbia', 'Quebec'];
export const CITY_OPTIONS = ['Toronto', 'Vancouver', 'Calgary', 'Montreal', 'Ottawa'];

export const SUMMARY_MAX_LENGTH = 250;

export function detailsToRecord(details: OpportunityDetails): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of Object.entries(details)) {
    record[key] = typeof value === 'boolean' ? String(value) : value;
  }
  return record;
}

export function recordToDetails(record: Record<string, string>): OpportunityDetails {
  return {
    title: record.title ?? DEFAULT_DETAILS.title,
    summary: record.summary ?? DEFAULT_DETAILS.summary,
    description: record.description ?? DEFAULT_DETAILS.description,
    coverImage: record.coverImage ?? '',
    opensDate: record.opensDate ?? DEFAULT_DETAILS.opensDate,
    deadlineDate: record.deadlineDate ?? DEFAULT_DETAILS.deadlineDate,
    programStartDate: record.programStartDate ?? DEFAULT_DETAILS.programStartDate,
    programEndDate: record.programEndDate ?? DEFAULT_DETAILS.programEndDate,
    opportunityType: record.opportunityType ?? DEFAULT_DETAILS.opportunityType,
    fundingAmount: record.fundingAmount ?? DEFAULT_DETAILS.fundingAmount,
    mode: record.mode ?? DEFAULT_DETAILS.mode,
    country: record.country ?? DEFAULT_DETAILS.country,
    province: record.province ?? DEFAULT_DETAILS.province,
    city: record.city ?? DEFAULT_DETAILS.city,
    ageMin: record.ageMin ?? DEFAULT_DETAILS.ageMin,
    ageMax: record.ageMax ?? DEFAULT_DETAILS.ageMax,
    educationLevel: record.educationLevel ?? DEFAULT_DETAILS.educationLevel,
    citizenship: record.citizenship ?? DEFAULT_DETAILS.citizenship,
    residency: record.residency ?? DEFAULT_DETAILS.residency,
    visibility: record.visibility ?? DEFAULT_DETAILS.visibility,
    featured: record.featured === 'true',
    allowBookmarking: record.allowBookmarking !== 'false',
    allowSharing: record.allowSharing !== 'false',
  };
}

export function formatFunding(amount: string): string {
  const num = Number(amount.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(num)) return amount;
  return num.toLocaleString('en-CA');
}

export function formatDeadline(dateStr: string): string {
  if (!dateStr) return '—';
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function getLocationLabel(details: OpportunityDetails): string {
  return [details.city, details.province, details.country].filter(Boolean).join(', ');
}

export function getModeLabel(mode: string): string {
  return MODE_OPTIONS.find((o) => o.value === mode)?.label ?? mode;
}

export function getOpportunityTypeLabel(type: string): string {
  return OPPORTUNITY_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;
}
