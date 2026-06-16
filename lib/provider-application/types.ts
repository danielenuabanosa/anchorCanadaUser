export type ProviderApplicationStepId =
  | "journey"
  | "type"
  | "categories"
  | "organization"
  | "verification"
  | "team-setup"
  | "activation";

export type JourneyOptionId = "publish" | "explore";

export type JourneyTheme = "publish" | "explore";

export interface ProviderApplicationStep {
  id: ProviderApplicationStepId;
  label: string;
}

export interface JourneyOption {
  id: JourneyOptionId;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
  footerHighlight: string;
  footerText: string;
  theme: JourneyTheme;
}
