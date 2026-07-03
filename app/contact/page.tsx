import type { Metadata } from "next";
import Link from "next/link";
import QuoteCTA from "@/components/shared/QuoteCTA";
import InstagramButton from "@/components/shared/InstagramButton";
import { getSettings } from "@/lib/storage";
import { INSTAGRAM_PROFILE_URL, INSTAGRAM_USERNAME, isPlaceholderEmail } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, message on Instagram, or request a quote for trash can and exterior cleaning in Purcell & Norman, OK.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const showEmail = !isPlaceholderEmail(settings.email);

  return (
    <>
      <section className="border-b border-brand-100 bg-white py-10">
        <div className="section-container">
          <h1 className="text-2xl font-bold text-charcoal sm:text-3xl">Contact</h1>
          <p className="mt-2 max-w-lg text-sm text-charcoal-muted">
            Call, DM on Instagram, or use the quote form. Same-day trash can
            and exterior cleaning in {settings.serviceArea}.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container max-w-lg">
          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-medium text-charcoal">Phone</dt>
              <dd className="mt-0.5">
                <a
                  href={`tel:${settings.phone.replace(/\D/g, "")}`}
                  className="text-lg font-semibold text-brand-700 hover:underline"
                >
                  {settings.phone}
                </a>
              </dd>
            </div>
            {showEmail && (
              <div>
                <dt className="font-medium text-charcoal">Email</dt>
                <dd className="mt-0.5">
                  <a href={`mailto:${settings.email}`} className="text-brand-700 hover:underline">
                    {settings.email}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="font-medium text-charcoal">Service area</dt>
              <dd className="mt-0.5 text-charcoal-muted">{settings.serviceArea}</dd>
            </div>
            <div>
              <dt className="font-medium text-charcoal">Hours</dt>
              <dd className="mt-0.5 text-charcoal-muted">{settings.hours}</dd>
            </div>
            <div>
              <dt className="font-medium text-charcoal">Instagram</dt>
              <dd className="mt-0.5 space-y-2">
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-brand-700 hover:underline"
                >
                  @{INSTAGRAM_USERNAME}
                </a>
                <InstagramButton className="w-full sm:w-auto" />
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-brand-100 pt-8">
            <a
              href={`tel:${settings.phone.replace(/\D/g, "")}`}
              className="btn-primary"
            >
              Call {settings.phone}
            </a>
            <Link href="/quote" className="btn-secondary">
              Get a free quote
            </Link>
          </div>
        </div>
      </section>

      <QuoteCTA phone={settings.phone} />
    </>
  );
}
