import briefcaseIcon from '@assets/icons/briefcase.png';
import shieldCheckIcon from '@assets/icons/shield-check.png';
import grantIcon from '@assets/icons/grant-funding.png';

export const PREVIEW_BADGES = [
  { label: 'NON-PROFIT', bg: '#E6F7EF', text: '#059669', icon: shieldCheckIcon },
  { label: 'PROVIDER', bg: '#EEF3FF', text: '#2F66C8', icon: briefcaseIcon },
  { label: 'VERIFIED', bg: '#F0EBFF', text: '#7C3AED', icon: grantIcon },
] as const;

export const FOCUS_CHIPS = [
  { label: 'Jobs & Internships', bg: '#EEF3FF', text: '#2F66C8' },
  { label: 'Grants & Funding', bg: '#E6F7EF', text: '#059669' },
  { label: 'Training Programs', bg: '#F0EBFF', text: '#7C3AED' },
] as const;

export const DEFAULT_PROFILE = {
  displayName: 'University of Toronto',
  pronounLabel: 'Educational Institution',
  location: 'Toronto, Ontario, Canada',
} as const;
