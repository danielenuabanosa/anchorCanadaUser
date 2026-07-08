'use client';

import { HelpCenterModal } from './HelpCenterModal';
import { ReportIssueModal } from './ReportIssueModal';
import { IssueSubmittedModal } from './IssueSubmittedModal';

export function HelpCenterRoot() {
  return (
    <>
      <HelpCenterModal />
      <ReportIssueModal />
      <IssueSubmittedModal />
    </>
  );
}
