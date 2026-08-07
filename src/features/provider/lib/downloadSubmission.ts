import { providerApi } from '@/features/provider/services/providerApi';

/** Download applicant submission metadata + document links as JSON. */
export async function downloadApplicationSubmission(applicationId: string, applicantName?: string) {
  const app = (await providerApi.getApplication(applicationId)) as {
    id?: string;
    applicantName?: string;
    opportunityTitle?: string;
    status?: string;
    documents?: Array<{ name?: string; url?: string; fileUrl?: string; type?: string }>;
    payload?: Record<string, unknown>;
    createdAt?: string;
  } | null;

  if (!app) throw new Error('Application not found.');

  const payload = {
    applicationId: app.id ?? applicationId,
    applicant: app.applicantName ?? applicantName ?? 'Applicant',
    opportunity: app.opportunityTitle ?? '',
    status: app.status ?? '',
    appliedAt: app.createdAt ?? '',
    documents: (app.documents ?? []).map((d) => ({
      name: d.name ?? 'Document',
      type: d.type ?? '',
      url: d.url ?? d.fileUrl ?? '',
    })),
    answers: app.payload ?? {},
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `submission-${(payload.applicant || 'applicant').replace(/\s+/g, '-').toLowerCase()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  // Open any direct file URLs in new tabs for convenience
  for (const doc of payload.documents) {
    if (doc.url && /^https?:\/\//i.test(doc.url)) {
      window.open(doc.url, '_blank', 'noopener,noreferrer');
    }
  }
}
