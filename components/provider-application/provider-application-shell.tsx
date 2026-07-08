import type { ProviderApplicationStepId } from "@/lib/provider-application/types";

import { ProviderApplicationHeader } from "./provider-application-header";
import { ProviderApplicationInfoBar } from "./provider-application-info-bar";
import { ProviderApplicationProgress } from "./provider-application-progress";

interface ProviderApplicationShellProps {
  currentStepId: ProviderApplicationStepId;
  children: React.ReactNode;
}

export function ProviderApplicationShell({
  currentStepId,
  children,
}: ProviderApplicationShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <ProviderApplicationHeader />
      <ProviderApplicationProgress currentStepId={currentStepId} />
      <main className="flex flex-1 flex-col">{children}</main>
      <ProviderApplicationInfoBar />
    </div>
  );
}
