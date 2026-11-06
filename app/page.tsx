import type { Metadata } from "next";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Intro } from "@/components/home/Intro";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { EquipmentSection } from "@/components/services/EquipmentSection";
import { PackagesSection } from "@/components/services/PackagesSection";
import { CallToAction } from "@/components/shared/CallToAction";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Professional Sound for Weddings & Events` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesSection />
      <WhyChooseUs />
      <PackagesSection />
      <EquipmentSection />
      <HowItWorks />
      <Testimonials />
      <GalleryPreview />
      <CallToAction />
    </>
  );
}
