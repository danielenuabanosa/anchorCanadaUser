import graduationIcon from '@assets/icons/graduation-cap.png';
import flashIcon from '@assets/icons/flash.png';
import briefcaseIcon from '@assets/icons/briefcase.png';

export const PREVIEW_BADGES = [
  { label: 'STUDENT', bg: '#F0EBFF', text: '#7C3AED', icon: graduationIcon },
  { label: 'NEWCOMER', bg: '#EEF3FF', text: '#2F66C8', icon: flashIcon },
  { label: 'ENTREPRENEUR', bg: '#E6F7EF', text: '#059669', icon: briefcaseIcon },
] as const;

export const FOCUS_CHIPS = [
  { label: 'Finding Employment', bg: '#EEF3FF', text: '#2F66C8' },
  { label: 'Accessing Funding', bg: '#E6F7EF', text: '#059669' },
  { label: 'Support my community', bg: '#F0EBFF', text: '#7C3AED' },
] as const;

export const DEFAULT_PROFILE = {
  displayName: 'Jacob Sullivan',
  pronounLabel: 'He / Him',
  location: 'Toronto, Ontario, Canada',
} as const;
