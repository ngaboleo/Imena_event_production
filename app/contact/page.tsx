import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ContactDetails } from "@/components/shared/ContactDetails";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact & Request a Quote",
  description:
    "Request a quotation for wedding, corporate, conference, private or outdoor event sound. Contact us by phone, WhatsApp or email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        intro="Tell us about your event and we'll recommend the right sound setup and send you a quotation."
        image={{ src: "/images/services/ourservice.jpg", alt: "" }}
      />
      <section className="py-16 sm:py-24">
        <Container className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div id="quote" className="scroll-mt-28 lg:col-span-7">
            <Suspense fallback={<div className="h-[60rem] rounded-panel bg-white shadow-soft" />}>
              <QuoteForm />
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
