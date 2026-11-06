import { ArrowRight } from "lucide-react";
import { Gallery } from "@/components/gallery/Gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function WorkPreview() {
  return (
    <section aria-labelledby="work-title" className="border-t border-edge bg-night-900 py-20 sm:py-28">
      <Container>
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            id="work-title"
            eyebrow="Our Work"
            title="Events We've Helped Bring to Life"
            intro="A look at our production work: sound, lighting, LED screens and event setups."
          />
          <ButtonLink href="/our-work" variant="outline" className="self-start sm:self-auto">
            View all work <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
        <Gallery showFilters={false} limit={5} />
      </Container>
    </section>
  );
}
