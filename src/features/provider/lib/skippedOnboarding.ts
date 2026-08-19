export type SkippedOnboardingItem = {
  id: string;
  label: string;
  group: 'profile' | 'documents';
};

type OnboardingSnapshot = {
  journey?: unknown;
  organizationType?: unknown;
  categories?: unknown;
  organizationName?: unknown;
  organizationEmail?: unknown;
  organizationPhone?: unknown;
  organizationWebsite?: unknown;
  organizationDescription?: unknown;
  organizationSize?: unknown;
  organizationProvince?: unknown;
  logoUrl?: unknown;
  coverUrl?: unknown;
  verificationType?: unknown;
};

type VerificationDocument = {
  docType?: string;
  fileUrl?: string | null;
  name?: string;
};

function filled(value: unknown) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return Boolean(value);
}

function hasDocument(documents: VerificationDocument[], types: string[]) {
  return documents.some((doc) => {
    const type = String(doc.docType ?? '').toLowerCase();
    return types.includes(type) && Boolean(doc.fileUrl || doc.name);
  });
}

const PROFILE_CHECKS: Array<{ id: string; label: string; isFilled: (data: OnboardingSnapshot) => boolean }> = [
  { id: 'journey', label: 'Provider journey', isFilled: (d) => filled(d.journey) },
  { id: 'organizationType', label: 'Organization type', isFilled: (d) => filled(d.organizationType) },
  { id: 'categories', label: 'Focus categories', isFilled: (d) => filled(d.categories) },
  { id: 'organizationName', label: 'Organization name', isFilled: (d) => filled(d.organizationName) },
  { id: 'organizationEmail', label: 'Organization email', isFilled: (d) => filled(d.organizationEmail) },
  { id: 'organizationWebsite', label: 'Website', isFilled: (d) => filled(d.organizationWebsite) },
  { id: 'organizationPhone', label: 'Phone number', isFilled: (d) => filled(d.organizationPhone) },
  { id: 'organizationDescription', label: 'Organization description', isFilled: (d) => filled(d.organizationDescription) },
  { id: 'organizationSize', label: 'Organization size', isFilled: (d) => filled(d.organizationSize) },
  { id: 'organizationProvince', label: 'Operating region', isFilled: (d) => filled(d.organizationProvince) },
  { id: 'logoUrl', label: 'Organization logo', isFilled: (d) => filled(d.logoUrl) },
  { id: 'coverUrl', label: 'Cover image', isFilled: (d) => filled(d.coverUrl) },
];

const DOCUMENT_CHECKS: Array<{ id: string; label: string; types: string[] }> = [
  {
    id: 'registrationCertificate',
    label: 'Registration certificate',
    types: ['business_registration', 'business-registration', 'registrationcertificate', 'registration'],
  },
  {
    id: 'proofOfOrganization',
    label: 'Proof of organization',
    types: ['proof_of_organization', 'proof-of-organization', 'proofoforganization'],
  },
  {
    id: 'authorizedRepId',
    label: 'Authorized representative ID',
    types: ['government_id', 'government-id', 'authorizedrepid', 'id'],
  },
];

export function getSkippedOnboardingItems(
  data: OnboardingSnapshot,
  documents: VerificationDocument[] = [],
): SkippedOnboardingItem[] {
  const skipped: SkippedOnboardingItem[] = [];

  for (const check of PROFILE_CHECKS) {
    if (!check.isFilled(data)) {
      skipped.push({ id: check.id, label: check.label, group: 'profile' });
    }
  }

  if (!filled(data.verificationType)) {
    skipped.push({ id: 'verificationType', label: 'Verification type', group: 'documents' });
  }

  for (const check of DOCUMENT_CHECKS) {
    if (!hasDocument(documents, check.types)) {
      skipped.push({ id: check.id, label: check.label, group: 'documents' });
    }
  }

  return skipped;
}
