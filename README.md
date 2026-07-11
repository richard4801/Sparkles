# Sparklyn 2.0

Premium educational-resource marketplace for Nigerian students, researchers and
lecturers. This repo is the redesign described in the product brief: turning a
text-heavy document repository into a clean, conversion-focused SaaS experience.

## Status: Phase 1 (homepage + design system)

The build is phased so each slice is shippable on its own.

| Phase | Scope | State |
|-------|-------|-------|
| **1** | Design system + full homepage (11 sections), responsive, a11y, SEO | ✅ done |
| 2 | Marketplace grid, resource detail page, search experience | planned |
| 3 | Auth flows + user dashboard | planned |
| 4 | Laravel 12 API, Postgres, Sanctum, Paystack/Flutterwave, admin | planned |
| 5 | AI-readiness (semantic search, recommendations) | planned |

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **shadcn-style UI primitives** (Radix + CVA), customised to the brand
- **Motion** (`motion/react`) for restrained micro-interactions
- **Phosphor Icons** (single outline family)

## Design system

Tokens live in `src/app/globals.css`.

- **Type:** Plus Jakarta Sans (display), Inter (body), self-hosted via `next/font/local`
- **Primary:** `#6C4CF5` (purple) · **Accent:** blue, used sparingly
- **Ground:** `#FAFAFD` soft white · **Cards:** white with tinted soft shadows
- **Radii:** 16-20px · **Motion:** fade-in, hover elevation, counters, all reduced-motion aware

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
src/
  app/                 layout (fonts, SEO metadata), page (homepage), globals.css
  components/
    ui/                Button, Badge, Card, Input, Accordion
    layout/            Navbar (mega menu + mobile drawer), Footer, Logo
    sections/          Hero, Stats, Categories, Trending, RecentlyAdded,
                       Universities, Testimonials, Faq, Newsletter
    motion/            Reveal (scroll reveal), Counter (count-up)
    resource-card.tsx  marketplace product card
  lib/data.ts          mock data (API-ready shapes)
  types/index.ts       domain types
  fonts/               self-hosted variable woff2 files
```

The data layer in `src/lib/data.ts` matches the domain types in
`src/types/index.ts`, so a real REST API can replace the mock module without
touching components.

## Asset TODOs before launch

- **Hero illustration:** the brief's 3D render (stacked books, graduation cap,
  rolled diploma, plant) is not yet produced. `src/components/sections/hero-visual.tsx`
  builds the lavender gradient, abstract layered shapes and floating accents, and
  slots a placeholder image. Drop the final transparent PNG/WebP in its place.
- **Imagery:** thumbnails and avatars use `picsum.photos` / `pravatar.cc`
  placeholders. Swap for the real asset CDN (Cloudflare R2 / S3) in Phase 4.
- **University marks:** monogram fallbacks stand in for official crests.
