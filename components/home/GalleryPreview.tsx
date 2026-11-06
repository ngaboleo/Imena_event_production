import { Gallery } from "@/components/gallery/Gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function GalleryPreview() {
  return (
    <section aria-labelledby="gallery-title" className="pt-20 sm:pt-28">
      <Container>
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            id="gallery-title"
            title="Events we've supported"
            intro="A look at the weddings, company events and celebrations we've provided sound for."
          />
          <ButtonLink href="/gallery" variant="outline" className="self-start sm:self-auto">
            View gallery
          </ButtonLink>
        </div>
        <Gallery showFilters={false} limit={6} />
      </Container>
    </section>
  );
}
