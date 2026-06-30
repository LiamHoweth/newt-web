import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

interface ServicesOverviewProps {
  settings: SiteSettings;
}

export default function ServicesOverview({ settings }: ServicesOverviewProps) {
  const enabled = settings.services.filter((s) => s.enabled);

  return (
    <section className="py-14 sm:py-16">
      <div className="section-container">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">
            What we clean
          </h2>
          <p className="mt-2 text-charcoal-muted">
            Trash cans are our specialty — plus full exterior cleaning. Free
            quotes by call, form, or Instagram DM.
          </p>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {enabled.map((service) => (
            <div key={service.id} className="bg-white p-5 sm:p-6">
              <h3 className="font-semibold text-charcoal">{service.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-muted">
                {service.shortDescription}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-6 inline-block text-sm font-semibold text-brand-700 hover:underline"
        >
          All service details →
        </Link>
      </div>
    </section>
  );
}
