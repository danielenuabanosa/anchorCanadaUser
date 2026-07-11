import { ProviderApplicationShell } from '@/components/provider-application/provider-application-shell';
import { JourneyStep } from '@/components/provider-application/journey/journey-step';

export default function OnboardingJourneyPage() {
  return (
    <ProviderApplicationShell currentStepId="journey">
      <JourneyStep />
    </ProviderApplicationShell>
  );
}
