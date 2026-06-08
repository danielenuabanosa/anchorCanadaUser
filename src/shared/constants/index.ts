export const APP_NAME = 'Anchor Canada';
export const APP_URL  = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
export const API_URL  = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export const OPPORTUNITY_TYPES = [
  { value: 'job',       label: 'Jobs',            emoji: '💼' },
  { value: 'housing',   label: 'Housing',          emoji: '🏠' },
  { value: 'training',  label: 'Training',         emoji: '📚' },
  { value: 'funding',   label: 'Funding',          emoji: '💰' },
  { value: 'community', label: 'Community Support', emoji: '🤝' },
] as const;

export const CANADIAN_PROVINCES = [
  { value: 'AB', label: 'Alberta'                  },
  { value: 'BC', label: 'British Columbia'         },
  { value: 'MB', label: 'Manitoba'                 },
  { value: 'NB', label: 'New Brunswick'            },
  { value: 'NL', label: 'Newfoundland & Labrador'  },
  { value: 'NT', label: 'Northwest Territories'    },
  { value: 'NS', label: 'Nova Scotia'              },
  { value: 'NU', label: 'Nunavut'                  },
  { value: 'ON', label: 'Ontario'                  },
  { value: 'PE', label: 'Prince Edward Island'     },
  { value: 'QC', label: 'Quebec'                   },
  { value: 'SK', label: 'Saskatchewan'             },
  { value: 'YT', label: 'Yukon'                    },
] as const;

export const USER_ROLES = [
  { value: 'individual', label: 'Individual',  description: 'I\'m looking for opportunities' },
  { value: 'business',   label: 'Business',    description: 'I\'m a provider or employer'    },
  { value: 'expert',     label: 'Expert',      description: 'I\'m a consultant or advisor'   },
] as const;
