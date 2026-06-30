import Link from "next/link";
import { Phone } from "lucide-react";
import Logo from "@/components/shared/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import InstagramButton from "@/components/shared/InstagramButton";
import type { SiteSettings } from "@/lib/types";

interface HeaderProps {
  settings: SiteSettings;
}

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ settings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
      <div className="section-container relative flex h-[4.25rem] items-center justify-between gap-3">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal-muted transition-colors hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <MobileMenu />

          <a
            href={`tel:${settings.phone.replace(/\D/g, "")}`}
            className="touch-target hidden items-center gap-1.5 text-sm text-charcoal-muted hover:text-brand-700 md:inline-flex"
            aria-label={`Call ${settings.phone}`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="hidden lg:inline">{settings.phone}</span>
            <span className="lg:hidden">Call</span>
          </a>

          <InstagramButton
            variant="link"
            label="Instagram"
            className="hidden px-2 lg:inline-flex"
          />

          <Link
            href="/quote"
            className="btn-primary hidden whitespace-nowrap md:inline-flex"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
