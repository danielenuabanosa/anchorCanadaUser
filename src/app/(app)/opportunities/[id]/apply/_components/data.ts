export const OPP = {
  id: '1',
  title: 'UX Design Intern',
  company: 'Shopify',
  verified: true,
  location: 'Toronto, ON • Hybrid',
  locationFull: 'Toronto, Ontario, Canada',
  pay: '$20 / hr',
  type: 'Internship',
  closesInDays: 12,
  closesDate: 'May 21, 2026',
  applyDate: 'May 30, 2026',
  applyTime: '10:30 AM',
  logoInitial: 'S',
  logoColor: 'bg-green-500',
  externalUrl: 'https://careers.shopify.com',
  matchPct: 94,
};

export const ENTRY_CHECKLIST = [
  { label: 'Resume', ready: true, required: true },
  { label: 'Cover Letter', ready: true, required: true },
  { label: 'Portfolio', ready: true, required: true },
  { label: '2 Applications Questions', ready: true, required: true },
  { label: 'Availability Information', ready: true, required: true },
] as const;

export const EXTERNAL_NEEDS = [
  { label: 'Resume', required: true },
  { label: 'Cover Letter', required: true },
  { label: 'Portfolio', required: true },
  { label: 'References', required: true },
] as const;

export const INTERNAL_QUESTIONS = [
  {
    id: 'q1',
    label: 'Why are you interested in this internship?',
    placeholder: 'Share what draws you to this role and organization...',
    defaultValue:
      'I am passionate about creating user-centered designs that solve real-world problems. This internship aligns with my goal to grow my skills in UX research and design.',
  },
  {
    id: 'q2',
    label: 'Years of experience in UX Design?',
    placeholder: 'e.g. 1–2 years',
    defaultValue: '1 - 2 years',
  },
  {
    id: 'q3',
    label: 'Have you worked remotely before?',
    placeholder: 'Yes or No',
    defaultValue: 'Yes',
  },
] as const;

export const INTERNAL_NEXT_STEPS = [
  'Your application has been received',
  'The provider will review your application',
  'You will be notified of any updates',
  'Track your application in My Applications',
] as const;

export const EXTERNAL_PROGRESS = [
  { label: 'Verified', status: 'complete' as const },
  { label: 'Visited Provider Website', status: 'complete' as const },
  { label: 'Applied (Self Reported)', status: 'complete' as const },
  { label: 'Closed', status: 'future' as const },
] as const;

export const EXPRESS_TIMELINE = [
  {
    title: 'Interest Submitted',
    status: 'complete' as const,
    date: 'May 30, 2026  •  10:30 AM',
    description: 'Your interest has been received',
  },
  {
    title: 'Profile Under Review',
    status: 'pending' as const,
    description: 'The provider is reviewing your profile',
  },
  {
    title: 'Provider May Contact You',
    status: 'pending' as const,
    description: "If there's a good match",
  },
  {
    title: 'Matched',
    status: 'future' as const,
    description: 'Next steps will be shared with you',
  },
  {
    title: 'Closed',
    status: 'future' as const,
    description: 'Opportunity is no longer active',
  },
] as const;

export const PROFILE = {
  initials: 'JS',
  name: 'John Sullivan',
  email: 'johnsullivan@gmail.com',
  role: 'UX Designer',
  location: 'Toronto, ON',
  about:
    'UX designer with 2 years of experience creating user-centered digital experiences. Passionate about accessibility and inclusive design.',
  skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility', 'Design Systems'],
};

export const DEFAULT_FILES: Record<string, string> = {
  resume: 'Resume_John_Sullivan.pdf',
  cover: 'CoverLetter_John.pdf',
  portfolio: 'Portfolio_John_Sullivan.pdf',
  caseStudy: 'UX_Case_Study.pdf',
};
