# IMENA EVENT PRODUCTION: Website

The official website of **IMENA EVENT PRODUCTION**, an event planning, event management and audio-visual production company based in Kigali, Rwanda.

*Plan It. Produce It. Experience It.*

---

## Pages

| Page | URL | Contents |
|---|---|---|
| Home | `/` | Hero, About intro, Services overview, Events We Cover, Why Choose Us, Our Work preview, call to action |
| About Us | `/about` | Who We Are, Why Choose Us, Our Process |
| Services | `/services` | The 8 services (each linkable as `/services#<slug>`), Our Process |
| Events | `/events` | Events We Cover, and who we work with (private / corporate / community) |
| Our Work | `/our-work` | Filterable photo & video gallery with lightbox and video playback |
| Contact Us | `/contact` | Event inquiry form, phone, email, WhatsApp, Instagram, TikTok |

Old URLs redirect permanently: `/gallery` → `/our-work`, `/services/<anything>` → `/services`.

Also included: a floating WhatsApp button, a sticky responsive header with a mobile menu, SEO metadata and Open Graph, `sitemap.xml`, `robots.txt`, LocalBusiness structured data, a favicon/app icon generated from the logo, keyboard accessibility, and reduced-motion support.

## Technology

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Lucide icons · `next/image` (AVIF/WebP) · self-hosted Outfit font.

## Project structure

```
app/                     Pages, layout, icon.png/apple-icon.png, sitemap, robots
  api/quote/route.ts     Receives event inquiries (see "Inquiry form")
components/
  layout/                Navbar, Footer, Logo
  home/                  Hero, AboutIntro, ServicesOverview, EventsSection, WhyChooseUs, Process, WorkPreview
  services/              ServiceCard, ServicesGrid
  events/                EventsGrid
  gallery/               Gallery, GalleryCard, Lightbox (photos + videos)
  forms/                 InquiryForm, FormField
  shared/                PageHeader, CallToAction, ContactDetails, SocialLinks, WhatsAppButton
  ui/                    Button, Container, SectionTitle, SocialIcon, Waveform
config/site.ts           ← Company name, contact details, social links, logo paths
data/                    ← services, events, highlights (why us + process), gallery, navigation
lib/                     Helpers (contact links, SEO, inquiry validation)
public/images/brand/     Logo files generated from the original
public/images/gallery/   Our Work photos
public/videos/           Our Work videos and their poster frames
```

## Running locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (run before deploying)
npm start          # serve the production build
npm run typecheck  # TypeScript check
```

## Editing content

- **Company details:** `config/site.ts`. Phone, WhatsApp, email, location, tagline, and service highlights.
  - Set `contact.whatsapp` to `""` to hide all WhatsApp buttons if the number is not on WhatsApp.
  - **Instagram / TikTok:** replace `[INSTAGRAM_URL]` and `[TIKTOK_URL]` with the full profile URLs. Until then the icons show but are not linked.
- **Services:** `data/services.ts`. Each service can have an optional `image`; services without one show an icon panel.
  - **Temporary photos:** cards 01 (Event Planning & Management), 06 (Videography) and 07 (Live Streaming) use licensed placeholder photos from Wikimedia Commons (CC BY-SA 4.0), not IMENA events: `public/images/services/service-event-planning.jpg`, `service-videography.jpg`, `service-live-streaming.jpg`. The licence requires the small credit shown on each image.
  - **To replace one with your own photo:** save it over the same filename (landscape, ideally 1600×1000 px, 16:10), update its `alt` text in `data/services.ts`, and delete its `credit` line. The credit then disappears automatically.
- **Events We Cover:** `data/events.ts`.
- **Why Choose Us / Our Process:** `data/highlights.ts`.

## Adding photos and videos to "Our Work"

1. **Photo:** save it in `public/images/gallery/` (JPG, about 1600–2400 px on the long side).
   **Video:** save the `.mp4` in `public/videos/` (short and compressed, ideally under ~10 MB) plus a still frame `.jpg` as the poster.
2. Add an entry to `data/gallery.ts`:

```ts
{
  id: "wedding-kigali-2026",
  type: "image",                      // or "video"
  src: "/images/gallery/wedding-kigali-2026.jpg",   // or "/videos/....mp4"
  poster: "/videos/....jpg",          // videos only
  alt: "Describe what is in the photo",
  caption: "Wedding reception: sound and lighting",
  category: "weddings",               // corporate | conferences | weddings | concerts | roadshows | live-productions
  orientation: "landscape",           // optional: landscape | portrait | square
},
```

The first five entries also appear on the home page. Categories with no media yet show a "coming soon" state. Only add real IMENA work, and only name clients with their permission. Larger videos are better hosted on YouTube/Vimeo or a media CDN.

## Inquiry form

The form posts to `app/api/quote/route.ts`, which validates the data, checks basic spam protection (honeypot + minimum fill time), and then delivers it using **server-side** environment variables:

| Option | Variables |
|---|---|
| Email via [Resend](https://resend.com) | `RESEND_API_KEY` (required), `INQUIRY_TO_EMAIL` (optional, defaults to the site email), `INQUIRY_FROM_EMAIL` (leave empty unless you verified your own domain in Resend) |

**Quickest setup:** create a free Resend account using **imenaeventproductionltd@gmail.com**, create an API key, and set only `RESEND_API_KEY`. Without a verified domain, Resend can only deliver to the address the account was created with, so the account must belong to the inbox that receives inquiries. If delivery fails, the reason is printed in the server log (`[inquiry] Resend rejected the email …`).

All form fields are optional; a visitor only has to leave an email address or a phone number.
| Webhook / form service (Formspree, Make, Zapier…) | `INQUIRY_WEBHOOK_URL` |

**Until one of these is configured, inquiries are not delivered.** The form tells visitors so and offers one-tap "Send by email" / "Send on WhatsApp" buttons pre-filled with their details. After configuring, submit a test inquiry and confirm it arrives.

See `.env.example`. Put local values in `.env.local` (git-ignored) and production values in Vercel → Settings → Environment Variables.

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel (Next.js is detected automatically).
2. Add environment variables: `NEXT_PUBLIC_SITE_URL` (your domain) and the inquiry delivery variables above.
3. Deploy, then add your domain under **Settings → Domains**.
