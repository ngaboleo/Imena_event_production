# [COMPANY NAME] — Event Sound Website

A premium, responsive marketing and lead-generation website for an event-services business. It currently specialises in professional sound systems for weddings, corporate events, conferences, private parties and outdoor events.

The site is designed to grow. New services, gallery photos, equipment and reviews are added by editing data files, not by redesigning pages.

---

## Project overview

| Page | URL | What it does |
|---|---|---|
| Home | `/` | Hero, introduction, services, why choose us, packages, equipment, booking steps, reviews, gallery preview |
| Services | `/services` | All current services, equipment, packages, and planned future services |
| Service detail | `/services/[slug]` | One page per service, generated automatically from `data/services.ts` |
| Gallery | `/gallery` | Filterable photo gallery with a full-screen lightbox |
| About Us | `/about` | Company story, mission, vision, commitment to quality |
| Contact | `/contact` | Contact details, opening hours, social links and the quotation form |

Also included:

- A floating WhatsApp button on every page, with a pre-filled message.
- A quote form with validation and a success message. It offers to continue the conversation on WhatsApp.
- SEO: page titles, meta descriptions, Open Graph previews, `sitemap.xml`, `robots.txt` and LocalBusiness structured data.
- Accessibility: keyboard navigation, visible focus, a skip link, labelled form fields and reduced-motion support.

## Technology used

- **Next.js 16** (App Router) and **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide** icons
- **next/image** for responsive, lazy-loaded, AVIF/WebP images
- Self-hosted fonts via Fontsource (Cormorant Garamond and Outfit), so there are no external font requests

## Project structure

```
app/                     Pages (routes), layout, sitemap, robots, API
  api/quote/route.ts     Receives quotation requests
components/
  layout/                Navbar, Footer, Logo
  home/                  Home page sections (Hero, Intro, Testimonials…)
  services/              ServiceCard, EquipmentCard, PackagesSection…
  gallery/               Gallery, GalleryCard, Lightbox
  forms/                 QuoteForm, FormField
  shared/                CallToAction, PageHeader, WhatsAppButton, ContactDetails
  ui/                    Button, Container, SectionTitle, Waveform, icons
config/site.ts           ← Company name, phone, WhatsApp, email, address, socials
data/                    ← Services, gallery, equipment, testimonials, packages
lib/                     Helpers (WhatsApp links, SEO, form validation)
types/                   Shared TypeScript types
public/images/           ← Your photographs
```

## Installation

You need **Node.js 20.9 or newer**. Check your version with `node -v`; download it from https://nodejs.org if needed.

```bash
# in the project folder
npm install
```

## How to run locally

```bash
npm run dev
```

Then open http://localhost:3000.

Other commands:

```bash
npm run build      # production build (run this before deploying to check for errors)
npm start          # run the production build locally
npm run typecheck  # check TypeScript types
```

---

## How to change company information

Open **`config/site.ts`** and replace every value in `[SQUARE BRACKETS]`:

```ts
name: "Your Company Name",
contact: {
  phone: "+250 788 000 000",
  whatsapp: "+250 788 000 000",   // international format, with country code
  email: "bookings@yourcompany.com",
  address: "Your street, City",
  mapUrl: "https://maps.google.com/?q=...",   // optional
  hours: [ { days: "Monday – Friday", time: "8:00 – 18:00" }, ... ],
},
social: {
  instagram: "https://instagram.com/yourpage",
  ...
},
```

These details appear automatically in the navbar, footer, contact page, WhatsApp buttons and search-engine data.

- **WhatsApp:** once a real number is entered, every WhatsApp button opens a chat with you. Until then, the buttons open WhatsApp without a recipient, so they never break.
- **Default WhatsApp message:** change `whatsappMessage` in the same file.
- **Logo:** place your logo file in `public/images/` (SVG or PNG), then set `logo.src`, for example `"/images/logo.svg"`. If you have a white version for dark backgrounds, set it as `logo.lightSrc`. With no logo set, a text wordmark is shown.
- **Website address:** set `NEXT_PUBLIC_SITE_URL` in Vercel (see Deploying) so SEO links and social previews use your domain.

## How to replace images

Every sample image is labelled *"Sample image · replace /images/…"*, showing its exact path. To replace one, **save your photo with the same file name in the same folder**, overwriting the sample. No code changes are needed.

| Folder | Used for | Recommended size |
|---|---|---|
| `public/images/hero/hero.jpg` | Home page background | 2400 × 1500, landscape |
| `public/images/services/` | Service cards and service pages | 1600 × 1200 |
| `public/images/equipment/` | Equipment cards | 1000 × 1250, portrait |
| `public/images/gallery/` | Gallery | 1600 px on the long side |
| `public/images/about/story.jpg` | About page | 1200 × 1500, portrait |
| `public/images/og-image.jpg` | Preview when the site is shared on WhatsApp or Facebook | exactly 1200 × 630 |
| `public/images/testimonials/` | Optional customer photos | 200 × 200, square |

Tips:

- Use JPG for photos and keep each file under about 1 MB. Next.js automatically creates smaller, faster versions for each device.
- Real photos of your own setups, events and team build more trust than stock photos.
- If you change a file name, also update its path in the matching `data/` file.
- Update the `alt` text in the data files to describe what's in each photo. This matters for accessibility and SEO.

## How to add a new service

Open **`data/services.ts`**, copy an existing service object and edit it:

```ts
{
  slug: "lighting",                       // becomes /services/lighting
  title: "Event Lighting",
  footerLabel: "Lighting",                // optional shorter name
  shortDescription: "One sentence shown on the service card.",
  description: "A longer paragraph shown on the service page.",
  icon: Lightbulb,                        // any icon from https://lucide.dev (import it at the top)
  status: "available",
  category: "lighting",
  image: { src: "/images/services/lighting.jpg", alt: "Lighting at a reception" },
  features: ["What's included…", "…"],
  idealFor: ["Weddings", "Concerts"],
  quoteEventType: "Wedding",              // optional: pre-selects the form's event type
},
```

The service then appears automatically on the home page, the services page, the footer (the first five services) and the sitemap, and it gets its own page.

**Future services:** the file already lists planned services (event planning, decoration, lighting, DJ, tents, chairs and tables, photography, stage setup, entertainment, catering) with `status: "planned"`. They appear only in the *"Where we're heading"* section, marked as not yet available. When you launch one:

1. Change its status to `"available"`.
2. Fill in its `description`, `image` and `features`.

**Equipment** works the same way in `data/equipment.ts`. Only list brands or specifications you actually own.

## How to add gallery photographs

1. Save your photo in `public/images/gallery/`, for example `garden-wedding-june.jpg`.
2. Add an entry at the **top** of the list in **`data/gallery.ts`**:

```ts
{
  id: "garden-wedding-june",              // any unique id
  image: { src: "/images/gallery/garden-wedding-june.jpg", alt: "Speakers set up for a garden wedding ceremony" },
  title: "Garden wedding ceremony",
  category: "weddings",                   // weddings | corporate | private | outdoor
  location: "Venue name, City",
  date: "2026-06-20",                     // optional
  orientation: "portrait",                // optional, for tall photos
},
```

The first six entries also appear on the home page. Delete the sample entries once you have your own photos.

**Testimonials:** in `data/testimonials.ts`, replace the placeholder reviews with real ones (with the customer's permission) and set `isPlaceholder: false`. This removes the "Sample review" note.

**Packages:** edit `data/packages.ts`. No prices are shown by design.

## Receiving quotation requests

The form sends requests to `app/api/quote/route.ts`. That route validates each request and records it in the server logs (in Vercel: **Project → Logs**).

To receive requests **by email**, connect an email service in that file. Instructions are in the comments; [Resend](https://resend.com) is a simple option. Customers who tick *"contact me through WhatsApp"* are also offered a button that sends you their event details on WhatsApp.

## Deploying to Vercel

1. Push the project to a GitHub repository:
   ```bash
   git init && git add . && git commit -m "Initial website"
   ```
   Then create a repository on GitHub and push to it.
2. Go to https://vercel.com, sign in with GitHub, and click **Add New → Project**.
3. Import your repository. Vercel detects Next.js automatically, so there is no configuration to change.
4. Under **Environment Variables**, add:
   `NEXT_PUBLIC_SITE_URL` = `https://www.your-domain.com`
5. Click **Deploy**.
6. To use your own domain, go to **Settings → Domains**, add it, and follow the DNS instructions.

After this, every change you push to GitHub is published automatically.

---

## Ready for future growth

The architecture keeps content, configuration and presentation separate, so the following can be added later without rebuilding the site:

- **Online booking, availability and an event calendar:** new routes under `app/booking/`, using the existing `QuoteRequest` type as a starting point.
- **Admin dashboard, inquiry and quotation management, and CRM:** save the requests from `app/api/quote/route.ts` to a database (for example Postgres or Supabase), then add a protected `app/admin/` area.
- **Customer accounts and payments:** add an auth provider and a payment integration (for example Stripe or a mobile-money provider).
- **Equipment inventory, scheduling and invoices:** extend `data/equipment.ts` into database tables.
- **More event services:** switch planned services to available in `data/services.ts`, as described above.
