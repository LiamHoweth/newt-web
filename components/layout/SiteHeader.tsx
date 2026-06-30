"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import type { SiteSettings } from "@/lib/types";

interface SiteHeaderProps {
  settings: SiteSettings;
}

export default function SiteHeader({ settings }: SiteHeaderProps) {
  const pathname = usePathname();
  const overlay = pathname === "/";

  return <Header settings={settings} overlay={overlay} />;
}
