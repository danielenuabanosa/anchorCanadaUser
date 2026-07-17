export type ConfigFieldKind =
  | 'checkbox-grid'
  | 'text'
  | 'textarea'
  | 'toggle'
  | 'select'
  | 'salary-range';

export interface CategoryConfigOption {
  id: string;
  label: string;
}

export type CategoryConfigVariant =
  | 'food'
  | 'employment'
  | 'grants'
  | 'mental'
  | 'education'
  | 'volunteer'
  | 'housing'
  | 'settlement'
  | 'default';

export interface CategoryConfigSchema {
  categoryGroupId: string;
  /** Primary multi-select — Employment Type, Service Type, or Programme Format */
  primaryGridLabel: string;
  primaryGridRequired: boolean;
  primaryOptions: CategoryConfigOption[];
  /** Grid columns for primary options (employment stays 2) */
  primaryGridCols?: 2 | 3;
  showSalary?: boolean;
  experienceLevels?: CategoryConfigOption[];
  showWorkAuthToggles?: boolean;
  industryOptions?: CategoryConfigOption[];
  dietaryLabel?: string;
  dietaryOptions?: CategoryConfigOption[];
  /** When false, language grid is hidden (e.g. Volunteer / Housing). */
  showLanguages?: boolean;
  languageLabel: string;
  languageOptions: CategoryConfigOption[];
  languageRequired?: boolean;
  schedulePlaceholder?: string;
  catchmentPlaceholder?: string;
  grantTypeOptions?: CategoryConfigOption[];
  fundingCoverOptions?: CategoryConfigOption[];
  deliveryFormatOptions?: CategoryConfigOption[];
  costOptions?: CategoryConfigOption[];
  timeCommitmentOptions?: CategoryConfigOption[];
  skillOptions?: CategoryConfigOption[];
  waitTimeOptions?: CategoryConfigOption[];
  bedroomOptions?: CategoryConfigOption[];
  accessibilityOptions?: CategoryConfigOption[];
  immigrationStatusOptions?: CategoryConfigOption[];
  variant: CategoryConfigVariant;
}

export interface OpportunityCategoryConfig {
  serviceTypes: string[];
  registrationRequired: boolean;
  scheduleHours: string;
  catchment: string;
  dietary: string[];
  languages: string[];
  salaryMin: string;
  salaryMax: string;
  salaryPeriod: string;
  salaryUndisclosed: boolean;
  experienceLevel: string;
  workAuthorizationRequired: boolean;
  visaSponsorshipAvailable: boolean;
  industries: string[];
  /** Grants */
  grantType: string;
  fundingCovers: string[];
  numberOfAwards: string;
  matchingRequired: boolean;
  matchingDetails: string;
  repaymentRequired: boolean;
  repaymentDetails: string;
  /** Mental health */
  deliveryFormats: string[];
  costType: string;
  sessionFee: string;
  confidential: boolean;
  referralRequired: boolean;
  crisisLineAvailable: boolean;
  crisisPhone: string;
  /** Education */
  duration: string;
  courseFee: string;
  credentialOffered: boolean;
  credentialDetails: string;
  prerequisites: string;
  accreditedInstitution: boolean;
  institutionName: string;
  /** Volunteer */
  timeCommitment: string;
  hoursPerWeek: string;
  minimumAge: string;
  backgroundCheckRequired: boolean;
  skillsNeeded: string[];
  volunteerPerks: string;
  /** Housing */
  monthlyRent: string;
  rentFree: boolean;
  unitsAvailable: string;
  estimatedWaitTime: string;
  bedrooms: string;
  accessibilityFeatures: string[];
  petsAllowed: boolean;
  familyFriendly: boolean;
  /** Settlement */
  eligibleImmigrationStatuses: string[];
  interpretationAvailable: boolean;
  referralDetails: string;
  /** Application process */
  requiresInterview: boolean;
}

export const LANGUAGE_OPTIONS: CategoryConfigOption[] = [
  { id: 'english', label: 'English' },
  { id: 'french', label: 'French' },
  { id: 'spanish', label: 'Spanish' },
  { id: 'punjabi', label: 'Punjabi' },
  { id: 'tagalog', label: 'Tagalog' },
  { id: 'arabic', label: 'Arabic' },
  { id: 'hindi', label: 'Hindi' },
  { id: 'mandarin', label: 'Mandarin' },
  { id: 'cantonese', label: 'Cantonese' },
  { id: 'portuguese', label: 'Portuguese' },
  { id: 'other', label: 'Other' },
];

export const SALARY_PERIOD_OPTIONS = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually' },
] as const;

export const EXPERIENCE_LEVEL_OPTIONS: CategoryConfigOption[] = [
  { id: 'entry', label: 'Entry Level (0 -2 yrs)' },
  { id: 'mid', label: 'Mid Level (2 -5 yrs)' },
  { id: 'senior', label: 'Senior Level (2 yrs +)' },
];

export const INDUSTRY_OPTIONS: CategoryConfigOption[] = [
  { id: 'technology', label: 'Technology' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'finance', label: 'Finance' },
  { id: 'education', label: 'Education' },
  { id: 'retail', label: 'Retail' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'construction', label: 'Construction' },
  { id: 'non-profit', label: 'Non-profit' },
  { id: 'government', label: 'Government' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'other', label: 'Other' },
];

export const GRANT_TYPE_OPTIONS: CategoryConfigOption[] = [
  { id: 'individual', label: 'Individual grant' },
  { id: 'business', label: 'Business grant' },
  { id: 'community-project', label: 'Community project grant' },
  { id: 'research', label: 'Research grant' },
  { id: 'scholarship', label: 'Scholarship' },
  { id: 'emergency-fund', label: 'Emergency fund' },
];

export const FUNDING_COVER_OPTIONS: CategoryConfigOption[] = [
  { id: 'tuition', label: 'Tuition' },
  { id: 'living-expenses', label: 'Living expenses' },
  { id: 'business-startup', label: 'Business startup costs' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'research', label: 'Research costs' },
  { id: 'travel', label: 'Travel' },
  { id: 'community-project', label: 'Community project costs' },
  { id: 'other', label: 'Other' },
];

export const DELIVERY_FORMAT_OPTIONS: CategoryConfigOption[] = [
  { id: 'one-on-one', label: 'One-on-one' },
  { id: 'group', label: 'Group' },
  { id: 'drop-in', label: 'Drop-in' },
  { id: 'virtual', label: 'Virtual / online' },
  { id: 'phone', label: 'Phone' },
];

/** Mental health cost menu */
export const COST_OPTIONS: CategoryConfigOption[] = [
  { id: 'free', label: 'Free' },
  { id: 'sliding-scale', label: 'Sliding scale (income-based)' },
  { id: 'fixed-fee', label: 'Fixed fee' },
];

/** Education & Training cost menu (Figma 870:17015) */
export const EDUCATION_COST_OPTIONS: CategoryConfigOption[] = [
  { id: 'free', label: 'Free' },
  { id: 'government-subsidized', label: 'Government subsidized' },
  { id: 'income-based', label: 'Income-based' },
  { id: 'fixed-fee', label: 'Fixed fee' },
];

/** Settlement Services cost menu (Figma 870:18898) */
export const SETTLEMENT_COST_OPTIONS: CategoryConfigOption[] = [
  { id: 'free', label: 'Free' },
  { id: 'government-funded', label: 'Government funded (free to client)' },
  { id: 'sliding-scale', label: 'Sliding scale' },
  { id: 'fixed-fee', label: 'Fixed fee' },
];

/** Volunteer time commitment (Figma 870:17649) */
export const TIME_COMMITMENT_OPTIONS: CategoryConfigOption[] = [
  { id: 'one-off', label: 'One-off event' },
  { id: 'weekly', label: 'Weekly (ongoing)' },
  { id: 'monthly', label: 'Monthly (ongoing)' },
  { id: 'flexible', label: 'Flexible schedule' },
];

export const VOLUNTEER_SKILL_OPTIONS: CategoryConfigOption[] = [
  { id: 'communication', label: 'Communication' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'event-planning', label: 'Event planning' },
  { id: 'computer-skills', label: 'Computer skills' },
  { id: 'first-aid', label: 'First aid' },
  { id: 'driving', label: 'Driving' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'construction', label: 'Construction' },
  { id: 'childcare', label: 'Childcare' },
  { id: 'language-skills', label: 'Language skills' },
];

/** Housing estimated wait time (Figma 870:18264) */
export const WAIT_TIME_OPTIONS: CategoryConfigOption[] = [
  { id: 'immediate', label: 'Immediate (under 1 month)' },
  { id: '1-3-months', label: '1–3 months' },
  { id: '3-6-months', label: '3–6 months' },
  { id: '6-12-months', label: '6–12 months' },
  { id: 'over-1-year', label: 'Over 1 year' },
];

/** Housing bedrooms (Figma 870:18297) */
export const BEDROOM_OPTIONS: CategoryConfigOption[] = [
  { id: 'bachelor', label: 'Bachelor / studio' },
  { id: '1-bedroom', label: '1 bedroom' },
  { id: '2-bedrooms', label: '2 bedrooms' },
  { id: '3-bedrooms', label: '3 bedrooms' },
  { id: '4-plus', label: '4+ bedrooms' },
  { id: 'shared', label: 'Shared accommodation' },
];

export const ACCESSIBILITY_OPTIONS: CategoryConfigOption[] = [
  { id: 'wheelchair', label: 'Wheelchair accessible' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'ground-floor', label: 'Ground floor' },
  { id: 'visual-hearing', label: 'Visual / hearing aids' },
  { id: 'no-stairs', label: 'No stairs' },
];

export const SETTLEMENT_IMMIGRATION_OPTIONS: CategoryConfigOption[] = [
  { id: 'permanent-resident', label: 'Permanent resident' },
  { id: 'refugee', label: 'Refugee / protected person' },
  { id: 'convention-refugee', label: 'Convention refugee' },
  { id: 'study-permit', label: 'Study permit holder' },
  { id: 'work-permit', label: 'Work permit holder' },
  { id: 'visitor', label: 'Visitor / tourist' },
  { id: 'citizen', label: 'Canadian citizen' },
  { id: 'all-welcome', label: 'All are welcome' },
];

export const FOOD_NUTRITION_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'food-nutrition',
  variant: 'food',
  primaryGridLabel: 'Service Type',
  primaryGridRequired: true,
  primaryGridCols: 3,
  primaryOptions: [
    { id: 'food-bank', label: 'Food Bank' },
    { id: 'community-kitchen', label: 'Community Kitchen' },
    { id: 'hot-meals', label: 'Hot Meals Programme' },
    { id: 'grocery-support', label: 'Grocery Support' },
    { id: 'food-delivery', label: 'Food Delivery' },
    { id: 'school-meals', label: 'School Meals' },
    { id: 'mobile-food', label: 'Mobile Food Service' },
    { id: 'baby-supplies', label: 'Baby / Infant Supplies' },
  ],
  dietaryLabel: 'Dietary Accommodations',
  dietaryOptions: [
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-free' },
    { id: 'nut-free', label: 'Nut-free' },
    { id: 'culturally-specific', label: 'Culturally specific' },
  ],
  languageLabel: 'Language Served',
  languageOptions: LANGUAGE_OPTIONS,
  schedulePlaceholder: 'e.g. Mon–Fri 10am–2pm...',
  catchmentPlaceholder: 'e.g. North York residents only...',
};

export const EMPLOYMENT_SKILLS_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'employment-skills',
  variant: 'employment',
  primaryGridLabel: 'Employment Type',
  primaryGridRequired: true,
  primaryGridCols: 2,
  primaryOptions: [
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'internship', label: 'Internship' },
    { id: 'apprenticeship', label: 'Apprenticeship' },
    { id: 'casual', label: 'Casual / Seasonal' },
  ],
  showSalary: true,
  experienceLevels: EXPERIENCE_LEVEL_OPTIONS,
  showWorkAuthToggles: true,
  industryOptions: INDUSTRY_OPTIONS,
  languageLabel: 'Language Requirements',
  languageOptions: LANGUAGE_OPTIONS,
};

export const GRANTS_BURSARIES_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'grants-bursaries',
  variant: 'grants',
  primaryGridLabel: 'Grant / Bursary Type',
  primaryGridRequired: true,
  primaryOptions: [],
  grantTypeOptions: GRANT_TYPE_OPTIONS,
  fundingCoverOptions: FUNDING_COVER_OPTIONS,
  languageLabel: 'Language Served',
  languageOptions: LANGUAGE_OPTIONS,
};

export const MENTAL_HEALTH_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'mental-health',
  variant: 'mental',
  primaryGridLabel: 'Service Type',
  primaryGridRequired: true,
  primaryGridCols: 3,
  primaryOptions: [
    { id: 'individual-counselling', label: 'Individual counselling' },
    { id: 'group-therapy', label: 'Group therapy' },
    { id: 'crisis-support', label: 'Crisis support' },
    { id: 'peer-support', label: 'Peer support' },
    { id: 'workshops', label: 'Workshops / psychoeducation' },
    { id: 'addiction-support', label: 'Addiction support' },
    { id: 'grief-support', label: 'Grief support' },
    { id: 'youth-mental-health', label: 'Youth mental health' },
    { id: 'culturally-specific', label: 'Culturally specific services' },
  ],
  deliveryFormatOptions: DELIVERY_FORMAT_OPTIONS,
  costOptions: COST_OPTIONS,
  languageLabel: 'Language Offered',
  languageOptions: LANGUAGE_OPTIONS,
  languageRequired: true,
};

export const EDUCATION_TRAINING_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'education-training',
  variant: 'education',
  primaryGridLabel: 'Programme Format',
  primaryGridRequired: true,
  primaryGridCols: 3,
  primaryOptions: [
    { id: 'certificate', label: 'Certificate programme' },
    { id: 'diploma', label: 'Diploma' },
    { id: 'degree', label: 'Degree' },
    { id: 'short-course', label: 'Short course (under 3 months)' },
    { id: 'workshop', label: 'Workshop (one session)' },
    { id: 'bootcamp', label: 'Bootcamp' },
    { id: 'apprenticeship', label: 'Apprenticeship' },
    { id: 'linc-esl', label: 'LINC / ESL' },
    { id: 'literacy', label: 'Literacy programme' },
    { id: 'digital-skills', label: 'Digital skills training' },
  ],
  costOptions: EDUCATION_COST_OPTIONS,
  showLanguages: true,
  languageLabel: 'Language of Instruction',
  languageOptions: LANGUAGE_OPTIONS,
  languageRequired: true,
};

export const VOLUNTEER_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'volunteer',
  variant: 'volunteer',
  primaryGridLabel: 'Volunteer Type',
  primaryGridRequired: true,
  primaryGridCols: 3,
  primaryOptions: [
    { id: 'community-service', label: 'Community service' },
    { id: 'event-volunteer', label: 'Event volunteer' },
    { id: 'administrative', label: 'Administrative support' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'fundraising', label: 'Fundraising' },
    { id: 'environmental', label: 'Environmental cleanup' },
    { id: 'youth-programme', label: 'Youth programme' },
    { id: 'crisis-support', label: 'Crisis support' },
    { id: 'food-distribution', label: 'Food distribution' },
    { id: 'tech-skills', label: 'Tech / skills-based volunteering' },
  ],
  timeCommitmentOptions: TIME_COMMITMENT_OPTIONS,
  skillOptions: VOLUNTEER_SKILL_OPTIONS,
  showLanguages: false,
  languageLabel: 'Language Served',
  languageOptions: LANGUAGE_OPTIONS,
};

export const HOUSING_SHELTER_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'housing-shelter',
  variant: 'housing',
  primaryGridLabel: 'Housing Type',
  primaryGridRequired: true,
  primaryGridCols: 3,
  primaryOptions: [
    { id: 'emergency-shelter', label: 'Emergency shelter' },
    { id: 'transitional', label: 'Transitional housing' },
    { id: 'subsidized', label: 'Subsidized housing' },
    { id: 'supportive', label: 'Supportive housing' },
    { id: 'rent-supplement', label: 'Rent supplement / assistance' },
    { id: 'affordable-rental', label: 'Affordable rental' },
    { id: 'youth-housing', label: 'Youth housing' },
    { id: 'family-housing', label: 'Family housing' },
    { id: 'womens-shelter', label: "Women's shelter" },
    { id: 'senior-housing', label: 'Senior housing' },
  ],
  waitTimeOptions: WAIT_TIME_OPTIONS,
  bedroomOptions: BEDROOM_OPTIONS,
  accessibilityOptions: ACCESSIBILITY_OPTIONS,
  showLanguages: false,
  languageLabel: 'Language Served',
  languageOptions: LANGUAGE_OPTIONS,
};

export const SETTLEMENT_SERVICES_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'settlement-services',
  variant: 'settlement',
  primaryGridLabel: 'Service Type',
  primaryGridRequired: true,
  primaryGridCols: 3,
  primaryOptions: [
    { id: 'newcomer-orientation', label: 'Newcomer orientation' },
    { id: 'legal-aid', label: 'Legal aid / immigration advice' },
    { id: 'credential-recognition', label: 'Credential recognition' },
    { id: 'interpretation', label: 'Interpretation / translation' },
    { id: 'employment-settlement', label: 'Employment settlement' },
    { id: 'cultural-integration', label: 'Cultural integration' },
    { id: 'family-reunification', label: 'Family reunification support' },
    { id: 'refugee-settlement', label: 'Refugee settlement' },
    { id: 'language-assessment', label: 'Language assessment' },
  ],
  immigrationStatusOptions: SETTLEMENT_IMMIGRATION_OPTIONS,
  costOptions: SETTLEMENT_COST_OPTIONS,
  showLanguages: true,
  languageLabel: 'Language Offered',
  languageOptions: LANGUAGE_OPTIONS,
  languageRequired: true,
};

const DEFAULT_CONFIG: CategoryConfigSchema = {
  categoryGroupId: 'default',
  variant: 'default',
  primaryGridLabel: 'Service Type',
  primaryGridRequired: true,
  primaryGridCols: 3,
  primaryOptions: [
    { id: 'general', label: 'General Service' },
    { id: 'program', label: 'Program Delivery' },
    { id: 'support', label: 'Client Support' },
  ],
  showLanguages: true,
  languageLabel: 'Language Served',
  languageOptions: LANGUAGE_OPTIONS,
  schedulePlaceholder: 'e.g. Mon–Fri 9am–5pm...',
  catchmentPlaceholder: 'e.g. City / region served...',
};

const SCHEMA_BY_GROUP: Record<string, CategoryConfigSchema> = {
  'food-nutrition': FOOD_NUTRITION_CONFIG,
  'employment-skills': EMPLOYMENT_SKILLS_CONFIG,
  'grants-bursaries': GRANTS_BURSARIES_CONFIG,
  'mental-health': MENTAL_HEALTH_CONFIG,
  'education-training': EDUCATION_TRAINING_CONFIG,
  volunteer: VOLUNTEER_CONFIG,
  'housing-shelter': HOUSING_SHELTER_CONFIG,
  'settlement-services': SETTLEMENT_SERVICES_CONFIG,
};

export function getCategoryConfigSchema(categoryGroupId: string | null): CategoryConfigSchema {
  if (!categoryGroupId) return DEFAULT_CONFIG;
  return SCHEMA_BY_GROUP[categoryGroupId] ?? DEFAULT_CONFIG;
}

export function isCategoryConfigComplete(
  schema: CategoryConfigSchema,
  config: OpportunityCategoryConfig,
): boolean {
  switch (schema.variant) {
    case 'employment':
      return config.serviceTypes.length > 0 && Boolean(config.experienceLevel);
    case 'food':
    case 'default':
      return config.serviceTypes.length > 0 && Boolean(config.scheduleHours.trim());
    case 'grants':
      return Boolean(config.grantType) && config.fundingCovers.length > 0;
    case 'mental':
      return (
        config.serviceTypes.length > 0 &&
        config.deliveryFormats.length > 0 &&
        Boolean(config.costType) &&
        config.languages.length > 0
      );
    case 'education':
      return (
        config.serviceTypes.length > 0 &&
        Boolean(config.duration.trim()) &&
        Boolean(config.costType) &&
        config.languages.length > 0
      );
    case 'volunteer':
      return config.serviceTypes.length > 0 && Boolean(config.timeCommitment);
    case 'housing':
      return config.serviceTypes.length > 0;
    case 'settlement':
      return (
        config.serviceTypes.length > 0 &&
        config.eligibleImmigrationStatuses.length > 0 &&
        Boolean(config.costType) &&
        config.languages.length > 0
      );
    default:
      return config.serviceTypes.length > 0;
  }
}

function labelsForIds(options: CategoryConfigOption[] | undefined, ids: string[]): string {
  if (!options?.length || ids.length === 0) return '—';
  const matched = ids
    .map((id) => options.find((o) => o.id === id)?.label)
    .filter((label): label is string => Boolean(label));
  return matched.length > 0 ? matched.join(', ') : '—';
}

function labelForId(options: CategoryConfigOption[] | undefined, id: string): string {
  if (!id) return '—';
  return options?.find((o) => o.id === id)?.label ?? id;
}

function onOff(value: boolean): string {
  return value ? 'On' : 'Off';
}

export function getConfigStatusLabel(
  schema: CategoryConfigSchema,
  config: OpportunityCategoryConfig,
): string {
  return isCategoryConfigComplete(schema, config) ? 'Configuration complete' : 'Not configured';
}

export function getConfigSummaryLines(
  schema: CategoryConfigSchema,
  config: OpportunityCategoryConfig,
): { label: string; value: string }[] {
  const languagesValue =
    config.languages.length > 0 ? `${config.languages.length} selected` : '—';

  switch (schema.variant) {
    case 'employment': {
      const lines: { label: string; value: string }[] = [
        {
          label: 'Employment types',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Experience level',
          value: labelForId(schema.experienceLevels ?? EXPERIENCE_LEVEL_OPTIONS, config.experienceLevel),
        },
      ];
      if (!config.salaryUndisclosed && (config.salaryMin || config.salaryMax)) {
        const period =
          SALARY_PERIOD_OPTIONS.find((p) => p.value === config.salaryPeriod)?.label ??
          config.salaryPeriod;
        lines.push({
          label: 'Salary range',
          value: `$${config.salaryMin || '—'} – $${config.salaryMax || '—'} / ${period || '—'}`,
        });
      } else if (config.salaryUndisclosed) {
        lines.push({ label: 'Salary range', value: 'Undisclosed' });
      } else {
        lines.push({ label: 'Salary range', value: '—' });
      }
      lines.push({ label: 'Languages', value: languagesValue });
      return lines;
    }
    case 'food':
    case 'default':
      return [
        {
          label: 'Service types',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Schedule',
          value: config.scheduleHours.trim() || '—',
        },
        { label: 'Languages', value: languagesValue },
      ];
    case 'grants': {
      const min = config.salaryMin?.trim();
      const max = config.salaryMax?.trim();
      const fundingAmount =
        min || max ? `${min || '—'} – ${max || '—'}` : '—';
      return [
        {
          label: 'Grant type',
          value: labelForId(schema.grantTypeOptions ?? GRANT_TYPE_OPTIONS, config.grantType),
        },
        {
          label: 'Funding covers',
          value: labelsForIds(schema.fundingCoverOptions ?? FUNDING_COVER_OPTIONS, config.fundingCovers),
        },
        { label: 'Funding amount', value: fundingAmount },
        {
          label: 'Matching / Repayment',
          value: `Matching ${onOff(config.matchingRequired)} · Repayment ${onOff(config.repaymentRequired)}`,
        },
      ];
    }
    case 'mental':
      return [
        {
          label: 'Service types',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Delivery formats',
          value: labelsForIds(
            schema.deliveryFormatOptions ?? DELIVERY_FORMAT_OPTIONS,
            config.deliveryFormats,
          ),
        },
        {
          label: 'Cost',
          value: labelForId(schema.costOptions ?? COST_OPTIONS, config.costType),
        },
        { label: 'Languages', value: languagesValue },
        {
          label: 'Confidential / Referral / Crisis',
          value: `Confidential ${onOff(config.confidential)} · Referral ${onOff(config.referralRequired)} · Crisis ${onOff(config.crisisLineAvailable)}`,
        },
      ];
    case 'education':
      return [
        {
          label: 'Programme formats',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Duration',
          value: config.duration.trim() || '—',
        },
        {
          label: 'Cost',
          value: labelForId(schema.costOptions ?? EDUCATION_COST_OPTIONS, config.costType),
        },
        { label: 'Languages', value: languagesValue },
      ];
    case 'volunteer':
      return [
        {
          label: 'Volunteer types',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Time commitment',
          value: labelForId(schema.timeCommitmentOptions ?? TIME_COMMITMENT_OPTIONS, config.timeCommitment),
        },
        {
          label: 'Background check',
          value: onOff(config.backgroundCheckRequired),
        },
        {
          label: 'Skills needed',
          value: labelsForIds(schema.skillOptions ?? VOLUNTEER_SKILL_OPTIONS, config.skillsNeeded),
        },
      ];
    case 'housing':
      return [
        {
          label: 'Housing types',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Wait time',
          value: labelForId(schema.waitTimeOptions ?? WAIT_TIME_OPTIONS, config.estimatedWaitTime),
        },
        {
          label: 'Bedrooms',
          value: labelForId(schema.bedroomOptions ?? BEDROOM_OPTIONS, config.bedrooms),
        },
        {
          label: 'Rent',
          value: config.rentFree
            ? 'Rent free'
            : config.monthlyRent.trim()
              ? config.monthlyRent
              : '—',
        },
      ];
    case 'settlement':
      return [
        {
          label: 'Service types',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Immigration status',
          value: labelsForIds(
            schema.immigrationStatusOptions ?? SETTLEMENT_IMMIGRATION_OPTIONS,
            config.eligibleImmigrationStatuses,
          ),
        },
        {
          label: 'Cost',
          value: labelForId(schema.costOptions ?? SETTLEMENT_COST_OPTIONS, config.costType),
        },
        { label: 'Languages', value: languagesValue },
      ];
    default:
      return [
        {
          label: 'Service types',
          value: labelsForIds(schema.primaryOptions, config.serviceTypes),
        },
        {
          label: 'Schedule',
          value: config.scheduleHours.trim() || '—',
        },
        { label: 'Languages', value: languagesValue },
      ];
  }
}

export const DEFAULT_CATEGORY_CONFIG: OpportunityCategoryConfig = {
  serviceTypes: [],
  registrationRequired: false,
  scheduleHours: '',
  catchment: '',
  dietary: [],
  languages: ['english'],
  salaryMin: '10,000',
  salaryMax: '10,000',
  salaryPeriod: 'hourly',
  salaryUndisclosed: false,
  experienceLevel: 'entry',
  workAuthorizationRequired: false,
  visaSponsorshipAvailable: false,
  industries: ['technology'],
  grantType: 'individual',
  fundingCovers: ['tuition'],
  numberOfAwards: '10',
  matchingRequired: true,
  matchingDetails: '',
  repaymentRequired: true,
  repaymentDetails: '',
  deliveryFormats: ['one-on-one'],
  costType: 'free',
  sessionFee: '10,000',
  confidential: false,
  referralRequired: false,
  crisisLineAvailable: true,
  crisisPhone: '+1 (416) 555-1234',
  duration: '',
  courseFee: '10,000',
  credentialOffered: true,
  credentialDetails: '',
  prerequisites: '',
  accreditedInstitution: true,
  institutionName: '',
  timeCommitment: 'one-off',
  hoursPerWeek: '',
  minimumAge: '',
  backgroundCheckRequired: false,
  skillsNeeded: ['communication'],
  volunteerPerks: '',
  monthlyRent: '',
  rentFree: false,
  unitsAvailable: '',
  estimatedWaitTime: 'immediate',
  bedrooms: 'bachelor',
  accessibilityFeatures: ['wheelchair'],
  petsAllowed: false,
  familyFriendly: false,
  eligibleImmigrationStatuses: ['permanent-resident'],
  interpretationAvailable: false,
  referralDetails: '',
  requiresInterview: true,
};
