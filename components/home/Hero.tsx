import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import InstagramButton from "@/components/shared/InstagramButton";
import { HERO_IMAGE } from "@/lib/gallery-data";

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-gray-200">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-emerald-50/40" />
      <div
        className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-brand-100/50 blur-3xl"
        aria-hidden
      />

      <div className="section-container relative py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <p className="inline-block max-w-full rounded-full bg-white px-3 py-1.5 text-xs font-medium leading-snug text-brand-800 ring-1 ring-brand-200">
              {settings.announcement}
            </p>

            <h1 className="mt-4 text-[1.625rem] font-bold leading-[1.2] tracking-tight text-charcoal xs:mt-5 xs:text-[1.75rem] sm:text-4xl sm:leading-[1.15] lg:text-[3rem]">
              Trash can cleaning &amp; exterior wash — Purcell &amp; Norman, OK
            </h1>

            <p className="mt-3 text-base font-medium text-brand-800 sm:mt-4 sm:text-lg">
              {settings.tagline}
            </p>

            <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal-muted sm:mt-4 sm:text-base">
              Deep clean smelly, maggot-filled cans. Siding, driveways, porches,
              fences &amp; more. Same-day available in {settings.serviceArea}.
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {["Guaranteed clean", "Same-day available", "Free quotes"].map(
                (badge) => (
                  <li
                    key={badge}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-charcoal ring-1 ring-gray-200"
                  >
                    {badge}
                  </li>
                )
              )}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/quote"
                className="btn-primary w-full px-6 py-3.5 sm:w-auto sm:py-3"
              >
                Get a free quote
              </Link>
              <InstagramButton
                variant="secondary"
                className="w-full px-6 py-3.5 sm:w-auto sm:py-3"
              />
              <a
                href={`tel:${settings.phone.replace(/\D/g, "")}`}
                className="btn-secondary w-full px-6 py-3.5 sm:hidden"
              >
                Call {settings.phone}
              </a>
              <a
                href={`tel:${settings.phone.replace(/\D/g, "")}`}
                className="hidden text-sm font-semibold text-charcoal-muted hover:text-brand-800 sm:inline-flex"
              >
                Or call {settings.phone}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-soft ring-1 ring-black/5">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="border-t border-gray-100 bg-white px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  Recent work
                </p>
                <p className="mt-1 text-sm text-charcoal-muted">
                  {HERO_IMAGE.caption}
                </p>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-charcoal-muted lg:text-left">
              Photo from @all4one.exteriorsolutions on Instagram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
