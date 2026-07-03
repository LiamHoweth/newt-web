import type { Metadata } from "next";
import QuoteForm from "@/components/quote/QuoteForm";
import { getSettings } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a free quote for trash can cleaning and exterior washing in Purcell, Norman & surrounding OK.",
};

export default async function QuotePage() {
  const settings = await getSettings();

  return (
    <>
      <section className="border-b border-brand-100 bg-white py-10">
        <div className="section-container max-w-2xl">
          <h1 className="text-2xl font-bold text-charcoal sm:text-3xl">
            Get a free quote
          </h1>
          <p className="mt-2 text-sm text-charcoal-muted">
            Submit the form below and we will respond within one business day.
            For same-day availability, call or text us at{" "}
            <a
              href={`tel:${settings.phone.replace(/\D/g, "")}`}
              className="font-medium text-brand-700 hover:underline"
            >
              {settings.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container max-w-2xl">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
