import type { JourneyOption, ProviderApplicationStep } from "./types";

export const PROVIDER_APPLICATION_STEPS: ProviderApplicationStep[] = [
  { id: "journey", label: "Journey" },
  { id: "type", label: "Type" },
  { id: "categories", label: "Categories" },
  { id: "organization", label: "Organization" },
  { id: "verification", label: "Verification" },
  { id: "team-setup", label: "Team Setup" },
  { id: "activation", label: "Activation" },
];

export const JOURNEY_OPTIONS: JourneyOption[] = [
  {
    id: "publish",
    title: "Publish Opportunities",
    description:
      "Reach qualified audiences and grow your impact across Canada.",
    imageSrc: "/assets/images/man_with_laptop.png",
    imageAlt: "Person publishing opportunities on a laptop",
    tags: ["Hiring", "Funding", "Programs", "Community"],
    footerHighlight: "Trusted by organizations",
    footerText: "nationwide to create impact.",
    theme: "publish",
  },
  {
    id: "explore",
    title: "Explore First",
    description:
      "Browse opportunities, stories, and resources before using the platform.",
    imageSrc: "/assets/images/lady_with_laptop.png",
    imageAlt: "Person exploring opportunities on a laptop",
    tags: ["Browse", "Learn", "Discover"],
    footerHighlight: "Explore freely with no commitment.",
    footerText: "Create an account when you're ready.",
    theme: "explore",
  },
];

export const ASSETS = {
  logo: "/assets/images/anchor_canada_logo.svg",
} as const;
