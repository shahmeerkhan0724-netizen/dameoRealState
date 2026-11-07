# YourBrand Estates — Real Estate Demo

A premium, fictional multi-page real-estate showcase built with React 18, Vite, React Router v6, GSAP, Lenis and plain CSS.

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

## Rebranding

All brand-specific content lives in **`src/config/siteConfig.js`** — brand name, tagline, contact details, social links, currency, WhatsApp number, hero copy and stats. Update that file to rebrand the entire site.

## Structure

```
src/
  components/     shared UI and navigation
  config/         single source of truth for brand settings
  context/        favourites, app-ready and smooth-scroll providers
  data/           properties, services, team, testimonials, FAQs
  hooks/          small reusable hooks
  lib/            GSAP setup, formatting, split text and helpers
  pages/          routed pages
  styles/         CSS variables, base, components and pages
```

All names, properties, people and locations are fictional placeholders for demonstration purposes. Photography is loaded from Unsplash.
