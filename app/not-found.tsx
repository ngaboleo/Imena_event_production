import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/shared/PageHeader";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="Page not found"
      intro="The page you're looking for doesn't exist or has moved. Try our services or get in touch."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Go to home page
        </ButtonLink>
        <ButtonLink href="/services" variant="outline" size="lg">
          View our services
        </ButtonLink>
      </div>
    </PageHeader>
  );
}
