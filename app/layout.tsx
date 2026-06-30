import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { getSettings } from "@/lib/storage";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#166534",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Trash Can & Exterior Cleaning | Purcell & Norman, OK | All4One Exterior Solutions",
    template: "%s | All4One Exterior Solutions",
  },
  description:
    "Trash can cleaning, siding wash, driveways, porches & fences in Purcell, Norman & surrounding OK. Same-day available. Free quotes — call or message on Instagram.",
  keywords: [
    "trash can cleaning Norman OK",
    "trash can cleaning Purcell OK",
    "pressure washing Norman",
    "exterior cleaning Oklahoma",
    "siding cleaning Norman OK",
  ],
  icons: {
    icon: "/branding/logo.svg",
    apple: "/branding/logo.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "All4One",
  },
  openGraph: {
    title: "All4One Exterior Solutions | Purcell & Norman, OK",
    description:
      "You say it, we spray it. Trash can deep cleans, siding, driveways & more. Same-day available.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/gallery/siding-before-after.jpg",
        width: 640,
        height: 480,
        alt: "Before and after siding cleaning by All4One Exterior Solutions",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" className={dmSans.variable}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-charcoal antialiased">
        <LocalBusinessJsonLd settings={settings} siteUrl={siteUrl} />
        <Header settings={settings} />
        <MobileNav settings={settings} />
        <main className="mobile-page-bottom flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
