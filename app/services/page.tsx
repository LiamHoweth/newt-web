import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/services/ServiceCard";
import QuoteCTA from "@/components/shared/QuoteCTA";
import { SERVICE_DETAILS } from "@/lib/services-data";
import { HERO_BACKDROP } from "@/lib/stock-images";
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
      <section className="relative overflow-hidden border-b border-brand-200">
        <div className="absolute inset-0">
          <Image
            src={HERO_BACKDROP.src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/80 to-brand-800/70" />
        </div>
        <div className="section-container relative py-14 sm:py-16">
          <h1 className="text-2xl font-bold text-white sm:text-4xl">Services</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-200 sm:text-base">
            Trash cans, siding, driveways, sidewalks, porches, fences — you say
            it, we spray it. Call {settings.phone} or PM for a free quote.
          </p>
          <Link href="/quote" className="btn-primary mt-6 inline-flex px-6 py-3">
            Get a free quote
          </Link>
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
