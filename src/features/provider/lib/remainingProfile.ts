export type RemainingProfileItem = {
  id: string;
  label: string;
  hint: string;
  group: 'profile' | 'documents';
  href: string;
};

type OrgSnapshot = {
  organizationName?: string;
  organizationType?: string;
  logoUrl?: string | null;
  completion?: number;
  verificationStatus?: string;
  profile?: Record<string, unknown> | null;
  onboardingData?: Record<string, unknown> | null;
  verification?: { items?: Array<{ id?: string; status?: string; title?: string }> } | null;
  documents?: Array<{ docType?: string; fileUrl?: string | null; name?: string }> | null;
};

function str(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (Array.isArray(value) && value.length > 0) return 'yes';
  }
  return '';
}

function pick(profile: Record<string, unknown>, od: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = profile[key] ?? od[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (Array.isArray(value) && value.length > 0) return value.map(String).filter(Boolean).join(', ');
  }
  return '';
}

const REQUIRED_DOCS: Array<{ id: string; label: string; hint: string }> = [
  {
    id: 'business-registration',
    label: 'Registration certificate',
    hint: 'Upload your incorporation or registration certificate',
  },
  {
    id: 'proof-of-organization',
    label: 'Proof of organization',
    hint: 'Upload proof of address, bylaws, or an organizational letter',
  },
  {
    id: 'government-id',
    label: 'Authorized representative ID',
    hint: 'Upload a government-issued ID for the authorized representative',
  },
  {
    id: 'organization-logo',
    label: 'Organization logo',
    hint: 'Add a high-resolution logo for posts, cards, and your public profile',
  },
];

/** Remaining required items based on saved organization data (not onboarding mock/local state). */
export function getRemainingProfileItems(org: OrgSnapshot | null | undefined): RemainingProfileItem[] {
  if (!org) return [];

  const profile = (org.profile ?? {}) as Record<string, unknown>;
  const od = (org.onboardingData ?? {}) as Record<string, unknown>;
  const items: RemainingProfileItem[] = [];

  const checks: Array<{ id: string; label: string; hint: string; href: string; ok: boolean }> = [
    {
      id: 'name',
      label: 'Organization name',
      hint: 'This is how applicants will recognize you',
      href: '/organization-profile?section=basic',
      ok: Boolean(str(org.organizationName, pick(profile, od, 'name', 'organizationName'))),
    },
    {
      id: 'type',
      label: 'Organization type',
      hint: 'Non-profit, for-profit, government, or education',
      href: '/organization-profile?section=basic',
      ok: Boolean(str(org.organizationType, pick(profile, od, 'type', 'organizationType'))),
    },
    {
      id: 'size',
      label: 'Organization size',
      hint: 'Helps applicants understand your team scale',
      href: '/organization-profile?section=basic',
      ok: Boolean(pick(profile, od, 'organizationSize', 'orgSize', 'size')),
    },
    {
      id: 'email',
      label: 'Organization email',
      hint: 'Used for admin review and applicant contact',
      href: '/organization-profile?section=contact',
      ok: Boolean(pick(profile, od, 'email', 'organizationEmail', 'contactEmail')),
    },
    {
      id: 'phone',
      label: 'Phone number',
      hint: 'A reachable number for your organization',
      href: '/organization-profile?section=contact',
      ok: Boolean(pick(profile, od, 'phone', 'organizationPhone', 'contactPhone')),
    },
    {
      id: 'website',
      label: 'Website',
      hint: 'Add your public website or landing page',
      href: '/organization-profile?section=contact',
      ok: Boolean(pick(profile, od, 'website', 'organizationWebsite')),
    },
    {
      id: 'location',
      label: 'Location',
      hint: 'Street, city, or province so applicants know where you operate',
      href: '/organization-profile?section=location',
      ok: Boolean(
        pick(profile, od, 'address', 'city', 'province', 'organizationAddress', 'organizationCity', 'organizationProvince'),
      ),
    },
    {
      id: 'about',
      label: 'About the organization',
      hint: 'A short description of who you are and what you offer',
      href: '/organization-profile?section=about',
      ok: Boolean(pick(profile, od, 'about', 'description', 'organizationDescription')),
    },
    {
      id: 'focus',
      label: 'Focus areas',
      hint: 'Select at least one focus area',
      href: '/organization-profile?section=focus',
      ok: Boolean(pick(profile, od, 'focusAreas', 'categories')),
    },
    {
      id: 'logo',
      label: 'Organization logo',
      hint: 'Shown on posts, the providers directory, and your profile',
      href: '/organization-profile?section=branding',
      ok: Boolean(str(org.logoUrl, pick(profile, od, 'logoUrl'))),
    },
  ];

  for (const check of checks) {
    if (!check.ok) {
      items.push({
        id: check.id,
        label: check.label,
        hint: check.hint,
        group: 'profile',
        href: check.href,
      });
    }
  }

  const checklist = org.verification?.items ?? [];
  const uploadedDocs = org.documents ?? [];
  for (const doc of REQUIRED_DOCS) {
    const row = checklist.find((item) => item.id === doc.id);
    const submitted = row && row.status && row.status !== 'not_submitted';
    const uploaded = uploadedDocs.some(
      (item) =>
        item.docType === doc.id ||
        (doc.id === 'organization-logo' && ['logo', 'organization-logo'].includes(String(item.docType || ''))),
    );
    const logoOk = doc.id === 'organization-logo' && Boolean(str(org.logoUrl, pick(profile, od, 'logoUrl')));
    if (submitted || uploaded || logoOk) continue;
    items.push({
      id: doc.id,
      label: doc.label,
      hint: doc.hint,
      group: 'documents',
      href: '/organization-profile?section=verification',
    });
  }

  return items;
}
