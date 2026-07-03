import type { SiteSettings } from "@/lib/types";

interface LocalBusinessJsonLdProps {
  settings: SiteSettings;
  siteUrl: string;
}

export default function LocalBusinessJsonLd({
  settings,
  siteUrl,
}: LocalBusinessJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.businessName,
    description:
      "Trash can cleaning and exterior washing in Purcell, Norman, and surrounding Oklahoma areas. Siding, driveways, porches, fences, and more.",
    url: siteUrl,
    telephone: settings.phone,
    ...(settings.email ? { email: settings.email } : {}),
    slogan: settings.tagline,
    areaServed: settings.serviceArea,
    openingHours: settings.hours,
    sameAs: [settings.instagramUrl],
    image: `${siteUrl}/branding/logo-mark.png`,
    priceRange: "$$",
    serviceType: settings.services
      .filter((s) => s.enabled)
      .map((s) => s.name),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
