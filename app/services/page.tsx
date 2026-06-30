import type { Metadata } from "next";
import ServiceCard from "@/components/services/ServiceCard";
import QuoteCTA from "@/components/shared/QuoteCTA";
import { SERVICE_DETAILS } from "@/lib/services-data";
import { getSettings } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Trash can cleaning, siding wash, driveways, sidewalks, porches, and fences in Purcell, Norman & surrounding OK.",
};

export default async function ServicesPage() {
  const settings = await getSettings();

  return (
    <>
      <section className="border-b border-gray-200 py-10">
        <div className="section-container">
          <h1 className="text-2xl font-bold text-charcoal sm:text-3xl">
            Services
          </h1>
          <p className="mt-2 max-w-lg text-sm text-charcoal-muted">
            Trash cans, siding, driveways, sidewalks, porches, fences — you say
            it, we spray it. Call {settings.phone} or PM for a free quote.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICE_DETAILS.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA
        title="Not sure what you need?"
        description="Call us or fill out the quote form — we'll figure out what you need."
        phone={settings.phone}
      />
    </>
  );
}
