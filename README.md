# Karachi Estate Property Advisor

Production website for **Karachi Estate Property Advisor**, a real estate agency in Shah Faisal Town, Karachi. Built with React 18, Vite 5, React Router 6, GSAP, Lenis and plain CSS.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Brand and contact settings

All business details live in **`src/config/siteConfig.js`**:

- Brand name, category, tagline and footer copy
- Official phone and WhatsApp number
- Full address, short address and Plus Code
- Verified Google rating
- Hero copy and SEO metadata

WhatsApp and Google Maps links are generated in **`src/lib/contact.js`**, so every call-to-action uses the same official number and map location.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home, hero search, featured listings, categories, reviews, CTA |
| `/properties` | Listings with keyword, location, type, purpose, bedroom and price filters |
| `/properties/:id` | Property detail with gallery, overview, amenities, map and WhatsApp enquiry |
| `/about` | About the agency and approach |
| `/services` | Six property services with WhatsApp enquiry links |
| `/contact` | Business details, Google Maps embed, directions and WhatsApp enquiry form |

## Content notes

- `src/data/properties.js` contains **sample listings** used to demonstrate the layout. They are labelled as samples in the interface and are not verified client inventory.
- Property and contact forms open WhatsApp with a pre-filled message. No form data is stored on the website.
- Reviews display only the verified Google rating supplied by the client. No testimonials, names or customer stories are invented.
- No email address, business hours, social profiles, team details or founding year are displayed because none were supplied.

## Structure

```
src/
  components/     shared UI, navigation and map embed
  config/         single source of truth for brand and contact details
  context/        favourites, app-ready and smooth-scroll providers
  data/           sample properties, services, categories and FAQs
  hooks/          reusable hooks
  lib/            GSAP setup, WhatsApp/Maps builders and formatting
  pages/          routed pages
  styles/         CSS variables, base, components and pages
public/
  logo.png        official client logo
  og-image.png    social sharing image
  site.webmanifest
  robots.txt
```

Photography is loaded from Unsplash for illustration.
