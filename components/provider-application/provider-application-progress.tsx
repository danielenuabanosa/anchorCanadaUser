import { cn } from "@/lib/utils";
import { PROVIDER_APPLICATION_STEPS } from "@/lib/provider-application/constants";
import type { ProviderApplicationStepId } from "@/lib/provider-application/types";

interface ProviderApplicationProgressProps {
  currentStepId: ProviderApplicationStepId;
}

export function ProviderApplicationProgress({
  currentStepId,
}: ProviderApplicationProgressProps) {
  const currentStepIndex = PROVIDER_APPLICATION_STEPS.findIndex(
    (step) => step.id === currentStepId,
  );

  return (
    <div
      className="border-b border-border bg-background"
      aria-label="Application progress"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="hidden gap-3 pt-5 pb-4 md:grid md:grid-cols-7">
          {PROVIDER_APPLICATION_STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col gap-2">
                <span
                  className={cn(
                    "text-center text-[10px] font-medium tracking-[0.14em] uppercase",
                    isActive || isCompleted
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
                <div
                  className={cn(
                    "rounded-full transition-colors",
                    isActive ? "h-1.5 bg-primary" : "h-1 bg-step-inactive",
                    isCompleted && "bg-primary/60",
                  )}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>

        <div className="flex gap-1.5 py-4 md:hidden">
          {PROVIDER_APPLICATION_STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div
                key={step.id}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  isActive || isCompleted ? "bg-primary" : "bg-step-inactive",
                  isCompleted && !isActive && "bg-primary/60",
                )}
                aria-hidden
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
