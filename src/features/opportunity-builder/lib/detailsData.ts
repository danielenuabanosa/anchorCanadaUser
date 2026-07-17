export interface OpportunityDetails {
  title: string;
  summary: string;
  description: string;
  coverImage: string;
  opensDate: string;
  deadlineDate: string;
  programStartDate: string;
  programEndDate: string;
  rollingAdmissions: boolean;
  opportunityType: string;
  fundingAmount: string;
  mode: string;
  nationwide: boolean;
  country: string;
  province: string;
  city: string;
  fullAddress: string;
  contactEmail: string;
  phone: string;
  supportUrl: string;
  ageMin: string;
  ageMax: string;
  educationLevel: string;
  incomeRequirement: string;
  citizenship: string;
  residency: string;
  immigrationStatuses: string;
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
  opensDate: '2026-08-01',
  deadlineDate: '2026-09-30',
  programStartDate: '2026-10-15',
  programEndDate: '2027-03-31',
  rollingAdmissions: false,
  opportunityType: 'grants',
  fundingAmount: '10000',
  mode: 'remote',
  nationwide: false,
  country: 'Canada',
  province: 'ON',
  city: 'Toronto',
  fullAddress: '',
  contactEmail: 'youth@maplefuture.ca',
  phone: '+1 (416) 555-0199',
  supportUrl: 'https://maplefuture.ca/support',
  ageMin: '18',
  ageMax: '30',
  educationLevel: 'none',
  incomeRequirement: 'none',
  citizenship: '',
  residency: 'Ontario, Alberta, British Columbia',
  immigrationStatuses: 'permanent-resident',
  visibility: 'public',
  featured: true,
  allowBookmarking: true,
  allowSharing: true,
};

export const OPPORTUNITY_TYPE_OPTIONS = [
  { value: 'grants', label: 'Grant' },
  { value: 'jobs', label: 'Job' },
  { value: 'programs', label: 'Program' },
  { value: 'scholarships', label: 'Scholarship' },
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
  { value: 'none', label: 'No requirement' },
  { value: 'high-school', label: 'High school / GED' },
  { value: 'college', label: 'College diploma' },
  { value: 'bachelors', label: "Bachelor's degree" },
  { value: 'masters', label: "Master's degree or higher" },
];

export const INCOME_REQUIREMENT_OPTIONS = [
  { value: 'none', label: 'No requirement' },
  { value: 'low-income', label: 'Low income (below LICO)' },
  { value: 'moderate-income', label: 'Moderate income' },
  { value: 'any-income', label: 'Any income' },
];

export const IMMIGRATION_STATUS_OPTIONS = [
  { value: 'permanent-resident', label: 'Permanent resident' },
  { value: 'refugee', label: 'Refugee / protected person' },
  { value: 'study-permit', label: 'Study permit' },
  { value: 'work-permit', label: 'Work permit' },
  { value: 'citizen', label: 'Canadian citizen' },
  { value: 'all-welcome', label: 'All welcome' },
];

export const PROVINCE_OPTIONS = [
  { value: 'AB', label: 'AB' },
  { value: 'BC', label: 'BC' },
  { value: 'MB', label: 'MB' },
  { value: 'NB', label: 'NB' },
  { value: 'NL', label: 'NL' },
  { value: 'NS', label: 'NS' },
  { value: 'NT', label: 'NT' },
  { value: 'NU', label: 'NU' },
  { value: 'ON', label: 'ON' },
  { value: 'PE', label: 'PE' },
  { value: 'QC', label: 'QC' },
  { value: 'SK', label: 'SK' },
  { value: 'YT', label: 'YT' },
];

export const COUNTRY_OPTIONS = ['Canada', 'United States'];
export const CITY_OPTIONS = ['Toronto', 'Vancouver', 'Calgary', 'Montreal', 'Ottawa'];

export const SUMMARY_MAX_LENGTH = 250;

export function detailsToRecord(details: OpportunityDetails): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of Object.entries(details)) {
    record[key] = typeof value === 'boolean' ? String(value) : String(value ?? '');
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
    rollingAdmissions:
      record.rollingAdmissions != null
        ? record.rollingAdmissions === 'true'
        : DEFAULT_DETAILS.rollingAdmissions,
    opportunityType: record.opportunityType ?? DEFAULT_DETAILS.opportunityType,
    fundingAmount: record.fundingAmount ?? DEFAULT_DETAILS.fundingAmount,
    mode: record.mode ?? DEFAULT_DETAILS.mode,
    nationwide:
      record.nationwide != null ? record.nationwide === 'true' : DEFAULT_DETAILS.nationwide,
    country: record.country ?? DEFAULT_DETAILS.country,
    province: record.province ?? DEFAULT_DETAILS.province,
    city: record.city ?? DEFAULT_DETAILS.city,
    fullAddress: record.fullAddress ?? '',
    contactEmail: record.contactEmail ?? DEFAULT_DETAILS.contactEmail,
    phone: record.phone ?? DEFAULT_DETAILS.phone,
    supportUrl: record.supportUrl ?? DEFAULT_DETAILS.supportUrl,
    ageMin: record.ageMin ?? DEFAULT_DETAILS.ageMin,
    ageMax: record.ageMax ?? DEFAULT_DETAILS.ageMax,
    educationLevel: record.educationLevel ?? DEFAULT_DETAILS.educationLevel,
    incomeRequirement: record.incomeRequirement ?? DEFAULT_DETAILS.incomeRequirement,
    citizenship: record.citizenship ?? DEFAULT_DETAILS.citizenship,
    residency: record.residency ?? DEFAULT_DETAILS.residency,
    immigrationStatuses: record.immigrationStatuses ?? DEFAULT_DETAILS.immigrationStatuses,
    visibility: record.visibility ?? DEFAULT_DETAILS.visibility,
    featured: record.featured != null ? record.featured === 'true' : DEFAULT_DETAILS.featured,
    allowBookmarking:
      record.allowBookmarking != null
        ? record.allowBookmarking !== 'false'
        : DEFAULT_DETAILS.allowBookmarking,
    allowSharing:
      record.allowSharing != null
        ? record.allowSharing !== 'false'
        : DEFAULT_DETAILS.allowSharing,
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
  if (details.nationwide) return 'Canada (Nationwide)';
  const provinceName =
    {
      AB: 'Alberta',
      BC: 'British Columbia',
      MB: 'Manitoba',
      NB: 'New Brunswick',
      NL: 'Newfoundland and Labrador',
      NS: 'Nova Scotia',
      NT: 'Northwest Territories',
      NU: 'Nunavut',
      ON: 'Ontario',
      PE: 'Prince Edward Island',
      QC: 'Quebec',
      SK: 'Saskatchewan',
      YT: 'Yukon',
    }[details.province] ?? details.province;
  return [details.city, provinceName, details.country].filter(Boolean).join(', ');
}

export function getModeLabel(mode: string): string {
  return MODE_OPTIONS.find((o) => o.value === mode)?.label ?? mode;
}

export function getOpportunityTypeLabel(type: string): string {
  return OPPORTUNITY_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;
}

export function parseCsvList(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

export function toggleCsvValue(value: string, id: string): string {
  const list = parseCsvList(value);
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  return next.join(',');
}
