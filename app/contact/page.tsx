import { Suspense } from "react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { isOnlineDeliveryConfigured } from "@/lib/delivery";
import { ContactDetails } from "@/components/shared/ContactDetails";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Plan your next event with IMENA EVENT PRODUCTION. Call +250 783 229 795, email us, or send an event inquiry for sound, lighting, LED screens, videography and live streaming in Kigali, Rwanda.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's Plan Your Next Event"
        intro={
          <>
            <p className="font-medium text-white">Have an upcoming event?</p>
            <p>Tell us about your event, and our team will help you develop the right production solution.</p>
          </>
        }
        image={{ src: "/images/services/Corporate event.jpg", alt: "" }}
        imagePosition="50% 60%"
      />
      <section className="pb-16 sm:pb-24">
        <Container className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div id="quote" className="scroll-mt-28 lg:col-span-7">
            <Suspense fallback={<div className="h-[70rem] rounded-panel border border-edge bg-night-800" />}>
              <InquiryForm online={isOnlineDeliveryConfigured()} />
            </Suspense>
          </div>
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <ContactDetails />
          </div>
        </Container>
      </section>
    </>
  );
}
