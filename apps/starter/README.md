# PCG Starter

The canonical starting point for every new PCG / Sirak Studios client website.

**Stack:** Next.js 15 · Tailwind v4 · `@pcg/ui` · TypeScript strict · Vercel

---

## Quickstart

```bash
# From pcg-component-library root
cp -r apps/starter ../my-new-site
cd ../my-new-site
cp .env.example .env.local
pnpm install
pnpm dev        # http://localhost:3200
```

## Setup checklist

Work through these 5 steps in order:

- [ ] **Step 1** — `src/app/globals.css` — uncomment the brand theme (or write a custom one)
- [ ] **Step 2** — `src/app/layout.tsx` — set fonts to match the brand
- [ ] **Step 3** — `src/app/layout.tsx` — update title, description, OG metadata
- [ ] **Step 4** — `src/lib/constants.ts` — fill in `SITE_NAME`, nav links, contact info, social handles
- [ ] **Step 5** — `src/app/page.tsx` — replace placeholder copy with real client content

## Adding pages

Every new page goes in `src/app/`. Create a folder and a `page.tsx`:

```
src/app/
├── services/page.tsx
├── about/page.tsx
└── contact/page.tsx
```

## Adding components

Use `@pcg/ui` first. Only create project-specific components when `@pcg/ui` doesn't have what you need:

```tsx
// Prefer this
import { HeroSection, ServicesGrid } from "@pcg/ui";

// Only when @pcg/ui doesn't cover it
import { MyCustomSection } from "@/components/sections/MyCustomSection";
```

## Deployment

See [the Deployment guide](https://localhost:3100/docs/guides/deployment).

TL;DR: Connect to Vercel → set env vars from `.env.example` → push to main.
