import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import InstagramButton from "@/components/shared/InstagramButton";
import { HERO_BACKDROP } from "@/lib/stock-images";

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  return (
    <section className="relative -mt-[4.25rem] min-h-[72vh] overflow-hidden border-b border-brand-900/20 pt-[4.25rem] sm:min-h-[80vh] lg:min-h-[85vh]">
      {/* Full-bleed backdrop */}
      <div className="absolute inset-0">
        <Image
          src={HERO_BACKDROP.src}
          alt={HERO_BACKDROP.alt}
          fill
          className="object-cover object-[center_30%] sm:object-center"
          sizes="100vw"
          priority
          quality={90}
        />
        {/* Dark scrim for legibility — stronger on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35 sm:from-black/60 sm:via-black/35 sm:to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
      </div>

      <div className="section-container relative z-10 flex min-h-[calc(72vh-4.25rem)] flex-col justify-center py-10 pb-14 sm:min-h-[calc(80vh-4.25rem)] sm:py-16 sm:pb-16 lg:min-h-[calc(85vh-4.25rem)] lg:py-24">
        <div className="max-w-2xl">
          <p className="inline-block max-w-full rounded-full bg-black/40 px-3 py-1.5 text-[0.6875rem] font-medium leading-snug text-white ring-1 ring-white/20 backdrop-blur-sm xs:px-3.5 xs:text-xs">
            {settings.announcement}
          </p>

          <h1 className="mt-4 text-[1.5rem] font-bold leading-[1.2] tracking-tight text-white xs:mt-5 xs:text-[1.625rem] sm:text-4xl sm:leading-[1.15] lg:text-[3rem]">
            Elite cleaning and exterior washing
            <span className="mt-1.5 block text-[0.85em] font-semibold text-gray-200 sm:mt-2 sm:text-[0.75em]">
              Purcell, Edmond &amp; surrounding areas
            </span>
          </h1>

          <p className="mt-3 text-base font-medium text-gray-200 sm:mt-4 sm:text-lg">
            {settings.tagline}
          </p>

          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-gray-200 sm:mt-4 sm:text-base">
            Siding, driveways, porches, fences, and trash can cleaning and
            sanitization.
          </p>
          <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-gray-300 sm:text-base">
            Same-day available in {settings.serviceArea}.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {["Guaranteed clean", "Same-day available", "Free quotes"].map(
              (badge) => (
                <li
                  key={badge}
                  className="rounded-full bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm"
                >
                  {badge}
                </li>
              )
            )}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/quote"
              className="touch-target inline-flex w-full items-center justify-center rounded-md bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-900/30 transition-colors hover:bg-brand-500 active:bg-brand-700 sm:w-auto sm:px-7 sm:py-3"
            >
              Get a free quote
            </Link>
            <InstagramButton
              variant="secondary"
              label="DM on Instagram"
              className="w-full border-white/30 bg-white/10 px-4 text-sm text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto sm:text-base"
            />
            <a
              href={`tel:${settings.phone.replace(/\D/g, "")}`}
              className="touch-target inline-flex w-full items-center justify-center rounded-md border border-white/30 bg-transparent px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:hidden"
            >
              Call {settings.phone}
            </a>
            <a
              href={`tel:${settings.phone.replace(/\D/g, "")}`}
              className="hidden text-sm font-semibold text-gray-200 hover:text-white sm:inline-flex"
            >
              Or call {settings.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
