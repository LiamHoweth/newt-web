import Link from "next/link";
import InstagramButton from "@/components/shared/InstagramButton";

interface QuoteCTAProps {
  title?: string;
  description?: string;
  phone?: string;
}

export default function QuoteCTA({
  title = "Ready to get started?",
  description = "Name, number, and what needs cleaned — we'll get back to you with a quote.",
  phone,
}: QuoteCTAProps) {
  return (
    <section className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 py-12 text-white sm:py-16">
      <div className="section-container max-w-2xl">
        <h2 className="text-xl font-bold tracking-tight xs:text-2xl sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
          {description}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/quote"
            className="touch-target inline-flex w-full items-center justify-center rounded-md bg-white px-5 py-3.5 text-base font-semibold text-brand-800 transition-colors hover:bg-brand-50 active:bg-brand-100 sm:w-auto sm:py-2.5 sm:text-sm"
          >
            Get a free quote
          </Link>
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="touch-target inline-flex w-full items-center justify-center rounded-md border border-brand-400/40 px-5 py-3.5 text-base font-semibold text-white transition-colors hover:border-brand-300/60 hover:bg-brand-600/30 active:bg-brand-600/40 sm:w-auto sm:py-2.5 sm:text-sm"
            >
              Call {phone}
            </a>
          )}
          <InstagramButton variant="ghost" className="w-full sm:w-auto" />
          <Link
            href="/services"
            className="touch-target inline-flex w-full items-center justify-center rounded-md border border-brand-400/40 px-5 py-3.5 text-base font-semibold text-white transition-colors hover:border-brand-300/60 hover:bg-brand-600/30 active:bg-brand-600/40 sm:w-auto sm:py-2.5 sm:text-sm"
          >
            See services
          </Link>
        </div>
      </div>
    </section>
  );
}
