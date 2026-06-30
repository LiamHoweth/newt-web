import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesOverview from "@/components/home/ServicesOverview";
import RecentWork from "@/components/home/RecentWork";
import QuoteCTA from "@/components/shared/QuoteCTA";
import { getSettings } from "@/lib/storage";

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <Hero settings={settings} />
      <TrustStrip phone={settings.phone} />
      <ServicesOverview settings={settings} />
      <RecentWork />
      <QuoteCTA phone={settings.phone} />
    </>
  );
}
