import Link from "next/link";
import { Phone } from "lucide-react";
import Logo from "@/components/shared/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import InstagramButton from "@/components/shared/InstagramButton";
import type { SiteSettings } from "@/lib/types";

interface HeaderProps {
  settings: SiteSettings;
  overlay?: boolean;
}

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ settings, overlay = false }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        overlay
          ? "border-white/10 bg-brand-900/45 backdrop-blur-md"
          : "border-brand-100/80 bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="section-container relative flex h-[4.25rem] items-center justify-between gap-3">
        <Logo variant={overlay ? "light" : "default"} />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                overlay
                  ? "text-gray-200 hover:text-white"
                  : "text-charcoal-muted hover:text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <MobileMenu overlay={overlay} />

          <a
            href={`tel:${settings.phone.replace(/\D/g, "")}`}
            className={`touch-target hidden items-center gap-1.5 text-sm md:inline-flex ${
              overlay
                ? "text-gray-200 hover:text-white"
                : "text-charcoal-muted hover:text-brand-700"
            }`}
            aria-label={`Call ${settings.phone}`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="hidden lg:inline">{settings.phone}</span>
            <span className="lg:hidden">Call</span>
          </a>

          <InstagramButton
            variant={overlay ? "ghost" : "link"}
            label="Instagram"
            className={`hidden px-2 lg:inline-flex ${
              overlay ? "border-white/30 text-gray-200 hover:text-white" : ""
            }`}
          />

          <Link
            href="/quote"
            className={`touch-target hidden whitespace-nowrap md:inline-flex ${
              overlay ? "btn-primary" : "btn-primary"
            }`}
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
