"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

interface MobileNavProps {
  settings: SiteSettings;
}

/** Sticky call + quote bar for phones. Hidden on md+ where header CTAs suffice. */
export default function MobileNav({ settings }: MobileNavProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.06)] md:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <a
        href={`tel:${settings.phone.replace(/\D/g, "")}`}
        className="touch-target flex items-center justify-center gap-2 border-r border-gray-200 text-base font-semibold text-charcoal active:bg-gray-50"
      >
        <Phone className="h-5 w-5 shrink-0" aria-hidden />
        Call
      </a>
      <Link
        href="/quote"
        className="touch-target flex items-center justify-center bg-brand-700 text-base font-semibold text-white active:bg-brand-800"
      >
        Get a quote
      </Link>
    </div>
  );
}
