export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "scheduled"
  | "won"
  | "lost";

export type PreferredTiming =
  | "same-day"
  | "this-week"
  | "flexible"
  | "specific-date";

export interface Lead {
  id: string;
  createdAt: string;
  status: LeadStatus;
  name: string;
  phone: string;
  email: string | null;
  services: string[];
  addressOrZip: string;
  preferredTiming: PreferredTiming;
  specificDate?: string | null;
  trashCanCount: number | null;
  notes: string | null;
  photoUrls: string[];
  consentToContact: boolean;
  source: "website";
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  instagramUrl: string;
  serviceArea: string;
  hours: string;
  announcement: string;
  showPricing: boolean;
  services: ServiceDefinition[];
}

export interface ServiceDefinition {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  shortDescription: string;
}

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "scheduled",
  "won",
  "lost",
];

export const PREFERRED_TIMING_OPTIONS: {
  value: PreferredTiming;
  label: string;
}[] = [
  { value: "same-day", label: "Same-day" },
  { value: "this-week", label: "This week" },
  { value: "flexible", label: "Flexible" },
  { value: "specific-date", label: "Specific date" },
];

export const DEFAULT_SERVICES: ServiceDefinition[] = [
  {
    id: "trash-cans",
    name: "Trash Can Cleaning",
    slug: "trash-can-cleaning",
    enabled: true,
    shortDescription: "Deep clean and sanitize dirty, smelly cans.",
  },
  {
    id: "siding",
    name: "Siding Cleaning",
    slug: "siding-cleaning",
    enabled: true,
    shortDescription: "Wash dirt and buildup off your siding.",
  },
  {
    id: "driveways",
    name: "Driveway Cleaning",
    slug: "driveway-cleaning",
    enabled: true,
    shortDescription: "Pressure wash driveways and concrete.",
  },
  {
    id: "sidewalks",
    name: "Sidewalk Cleaning",
    slug: "sidewalk-cleaning",
    enabled: true,
    shortDescription: "Clean walkways, paths, and steps.",
  },
  {
    id: "porches",
    name: "Porch Cleaning",
    slug: "porch-cleaning",
    enabled: true,
    shortDescription: "Porches, steps, and entry areas.",
  },
  {
    id: "fences",
    name: "Fence Cleaning",
    slug: "fence-cleaning",
    enabled: true,
    shortDescription: "Wash grime and weather stains off fences.",
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  businessName: "All4One Exterior Solutions",
  tagline: "You say it, we spray it.",
  phone: "(859) 753-4859",
  email: "",
  instagramUrl: "https://www.instagram.com/all4one.exteriorsolutions/",
  serviceArea: "Purcell, Edmond & surrounding areas",
  hours: "Mon–Sat — call or DM for same-day availability",
  announcement: "Same-day trash can & exterior cleaning available.",
  showPricing: false,
  services: DEFAULT_SERVICES,
};

export interface QuoteFormData {
  name: string;
  phone: string;
  email?: string;
  services: string[];
  addressOrZip: string;
  preferredTiming: PreferredTiming;
  specificDate?: string;
  trashCanCount?: number;
  notes?: string;
  consentToContact: boolean;
}
