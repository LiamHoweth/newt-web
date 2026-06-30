import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import InstagramButton from "@/components/shared/InstagramButton";
import { INSTAGRAM_PROFILE_URL, INSTAGRAM_USERNAME, isPlaceholderEmail } from "@/lib/instagram";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();
  const showEmail = !isPlaceholderEmail(settings.email);

  return (
    <footer className="border-t border-gray-200 bg-white py-10 text-sm text-charcoal-muted mobile-page-bottom md:pb-10">
      <div className="section-container">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-charcoal">{settings.businessName}</p>
            <p className="mt-1">{settings.tagline}</p>
            <p className="mt-2 text-xs leading-relaxed">
              Serving {settings.serviceArea}
            </p>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block break-all font-medium text-brand-700 hover:underline"
            >
              @{INSTAGRAM_USERNAME}
            </a>
          </div>

          <div>
            <p className="font-medium text-charcoal">Pages</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/services" className="inline-flex min-h-[44px] items-center hover:text-charcoal sm:min-h-0">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/quote" className="inline-flex min-h-[44px] items-center hover:text-charcoal sm:min-h-0">
                  Get a quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-flex min-h-[44px] items-center hover:text-charcoal sm:min-h-0">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-charcoal">Contact</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href={`tel:${settings.phone.replace(/\D/g, "")}`}
                  className="inline-flex min-h-[44px] items-center font-medium text-brand-700 hover:underline sm:min-h-0 sm:font-normal sm:text-charcoal-muted"
                >
                  {settings.phone}
                </a>
              </li>
              {showEmail && (
                <li className="break-all">
                  <a href={`mailto:${settings.email}`} className="hover:text-charcoal">
                    {settings.email}
                  </a>
                </li>
              )}
              <li>{settings.hours}</li>
              <li className="pt-2">
                <InstagramButton variant="link" label="Message on Instagram" />
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          &copy; {year} {settings.businessName}
        </p>
      </div>
    </footer>
  );
}
