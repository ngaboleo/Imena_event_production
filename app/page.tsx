import type { Metadata } from "next";
import { AboutIntro } from "@/components/home/AboutIntro";
import { EventsSection } from "@/components/home/EventsSection";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { WorkPreview } from "@/components/home/WorkPreview";
import { CallToAction } from "@/components/shared/CallToAction";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesOverview />
      <EventsSection />
      <WhyChooseUs />
      <WorkPreview />
      <CallToAction />
    </>
  );
}
