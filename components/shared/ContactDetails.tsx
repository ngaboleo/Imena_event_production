import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig, type SocialNetworkKey } from "@/config/site";
import { emailUrl, hasWhatsApp, phoneUrl, socialUrl, whatsappUrl } from "@/lib/contact";

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-4 first:pt-0">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-electric-600/15 text-electric-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-fog">{label}</p>
        <div className="mt-0.5 text-white">{children}</div>
      </div>
    </div>
  );
}

function SocialRow({ network }: { network: SocialNetworkKey }) {
  const { label, handle } = siteConfig.social[network];
  const url = socialUrl(network);
  return (
    <Row icon={<SocialIcon network={network} className="size-5" />} label={label}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-electric-300">
          {handle}
        </a>
      ) : (
        handle
      )}
    </Row>
  );
}

export function ContactDetails() {
  const { contact } = siteConfig;
  return (
    <div className="rounded-panel border border-edge bg-night-800 p-6 sm:p-9">
      <h2 className="text-2xl sm:text-3xl">Contact information</h2>
      <p className="mt-2 text-fog">Call, email or message us. We&apos;re happy to talk through your event.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <a href={phoneUrl()} className={buttonClasses("primary", "md", "w-full")}>
          <Phone className="size-4" /> Call us
        </a>
        {hasWhatsApp ? (
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "md", "w-full")}>
            <SocialIcon network="whatsapp" className="size-4" /> WhatsApp
          </a>
        ) : (
          <a href={emailUrl("Event inquiry")} className={buttonClasses("outline", "md", "w-full")}>
            <Mail className="size-4" /> Email us
          </a>
        )}
      </div>

      <div className="mt-8 divide-y divide-edge">
        <Row icon={<Building2 className="size-5" />} label="Company">
          {siteConfig.name}
        </Row>
        <Row icon={<MapPin className="size-5" />} label="Location">
          {contact.location}
        </Row>
        <Row icon={<Phone className="size-5" />} label="Phone">
          <a href={phoneUrl()} className="hover:text-electric-300">
            {contact.phone}
          </a>
        </Row>
        <Row icon={<Mail className="size-5" />} label="Email">
          <a href={emailUrl("Event inquiry")} className="break-all hover:text-electric-300">
            {contact.email}
          </a>
        </Row>
        <SocialRow network="instagram" />
        <SocialRow network="tiktok" />
      </div>

      <div className="mt-4 border-t border-edge pt-6">
        <p className="text-sm text-fog">Services</p>
        <p className="mt-1 text-white">{siteConfig.serviceHighlights.join(" • ")}</p>
        <p className="mt-6 text-xl font-semibold text-electric-300">Let&apos;s Make Your Event Happen.</p>
      </div>
    </div>
  );
}
