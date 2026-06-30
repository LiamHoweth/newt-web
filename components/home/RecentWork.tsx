import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/gallery-data";
import InstagramButton from "@/components/shared/InstagramButton";
import { INSTAGRAM_PROFILE_URL, INSTAGRAM_USERNAME } from "@/lib/instagram";

export default function RecentWork() {
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-12 sm:py-16">
      <div className="section-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-charcoal">
              Recent work
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-muted sm:text-base">
              Real before/afters and job photos from our Instagram. Trash cans,
              siding, and more across Purcell &amp; Norman.
            </p>
          </div>
          <InstagramButton variant="link" label={`@${INSTAGRAM_USERNAME}`} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <a
              key={item.id}
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-soft transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-800 shadow-sm">
                  {item.service}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm leading-relaxed text-charcoal-muted">
                  {item.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <InstagramButton />
          <p className="text-sm text-charcoal-muted">
            Prefer DMs? Message us on Instagram for a fast quote.
          </p>
        </div>
      </div>
    </section>
  );
}
