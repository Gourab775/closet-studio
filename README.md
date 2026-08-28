# CLOSET Studio

Premium fashion commerce workspace with cinematic product showcases, curated collections, and streamlined cart and checkout operations.

**Live Demo:** https://gourab775.github.io/closet-e-commerce

**Category:** E-Commerce / Fashion & Retail
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Anime.js · Base UI
**Language:** TypeScript

## Overview

CLOSET Studio is a full-stack fashion e-commerce platform built for minimalist luxury retail. It combines scroll-driven product reveals, a grayscale-to-color visual system, and a complete shopping flow from catalog browsing to checkout. With architectural typography and a refined motion language, it delivers a professional, immersive storefront experience across all devices.

## Features

- **Cinematic Homepage** — Scroll-triggered reveals with parallax and clip-path animations for editorial product storytelling.
- **Curated Collections** — 18 products across 3 collections (Studio Collection, Tailored Studio, Essentials) with filtering and collection overview pages.
- **Product Detail Pages** — Color and size selection, material and care information, and related product recommendations.
- **Cart & Checkout** — Context-based cart management with quantity controls, order summary with dynamic shipping, and multi-step shipping and payment forms.
- **Responsive Minimalist Design** — Mobile, tablet, and desktop optimized with a grayscale-to-color image transition system and clean architectural lines.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS 4, tw-animate-css, PostCSS |
| Animation | Anime.js, CSS Keyframes |
| UI Primitives | Base UI, shadcn/ui (Base Nova), class-variance-authority, clsx, tailwind-merge |
| Icons | lucide-react |
| State | React Context (cart-context) |
| Deployment | Vercel |

## Project Structure

```
closet-e-commerce/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage — cinematic scroll reveals
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles and theme (minimalist palette)
│   │   ├── about/                # About page
│   │   ├── store/                # Product catalog
│   │   ├── products/[handle]/    # Product detail pages
│   │   ├── cart/                 # Shopping cart
│   │   ├── checkout/             # Checkout flow (shipping + payment)
│   │   ├── collections/          # Collections overview
│   │   ├── contact/              # Contact page
│   │   └── order-confirmation/   # Order confirmation
│   ├── components/
│   │   ├── navbar.tsx            # Navigation
│   │   ├── footer.tsx            # Footer
│   │   ├── scroll-to-top.tsx     # Scroll helper
│   │   └── ui/                   # Reusable UI primitives
│   └── lib/
│       ├── cart-context.tsx      # Cart state management
│       ├── products.ts           # Product data
│       └── utils.ts              # Utility helpers (cn, etc.)
├── public/                       # Static assets
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / bun

### Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the storefront.

### Environment Variables

No required environment variables for the base storefront. For deployments that integrate platform services, use:

| Variable | Required | Description |
|----------|----------|-------------|
| `SERVICE_API_KEY` | Optional | Platform service API key when integrating service features. |
| `SERVICE_BASE_URL` | Optional | Gateway base URL. |
| `SERVICE_MODEL` | Optional | Model identifier. |

> Alias: `SERVICE_*` is the canonical naming. `SERVICE_API_KEY`, `SERVICE_BASE_URL`, and `SERVICE_MODEL` are aliases for `AI_GATEWAY_API_KEY`, `AI_GATEWAY_BASE_URL`, and `AI_GATEWAY_MODEL` for backward compatibility. Prefer `SERVICE_*` for new deployments.

### Build

```bash
npm run build
npm start
```

## Deployment

**Vercel (recommended for Next.js):**
- Import the repository, framework preset Next.js, build command `npm run build`, output `.next`.

**Netlify:**
- Build command `npm run build`, publish directory `.next` (or use Netlify Next.js plugin).

**GitHub Pages (static export):**
- Set `output: 'export'` in `next.config.ts` for static catalog, run `npm run build`, publish `out/` via GitHub Actions. For cart/checkout with server actions, prefer Vercel/Netlify.

## Customization

- **Branding:** Update `src/app/globals.css` for color tokens, typography, and spacing.
- **Products:** Edit `src/lib/products.ts` to manage product data, collections, and variants.
- **Cart Logic:** Customize `src/lib/cart-context.tsx` and cart pages under `src/app/cart/` and `src/app/checkout/`.
- **Collections:** Modify `src/app/collections/` and `src/app/store/` for new collections or filtering logic.
- **Navigation:** Update `src/components/navbar.tsx` and `src/components/footer.tsx` for links and site structure.

## License

MIT
