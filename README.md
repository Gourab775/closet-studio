# CLOSET Studio

A premium e-commerce platform for minimalist fashion, built with Next.js 16, React 19, and Tailwind CSS 4.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss)

## Overview

CLOSET Studio is a luxury fashion e-commerce experience featuring a cinematic scroll-based homepage, minimalist design system, and full shopping functionality including product browsing, cart management, and checkout flow.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (Base Nova style)
- **Animations:** Anime.js, CSS Keyframes
- **Icons:** Lucide React
- **State Management:** React Context (Cart)
- **Deployment:** Vercel

## Features

- **Cinematic Homepage** — Scroll-triggered product reveals with parallax effects and clip-path animations
- **Product Catalog** — 18 products across 3 curated collections with filtering
- **Product Detail Pages** — Color/size selection, related products, material and care information
- **Shopping Cart** — Add/remove items, quantity controls, order summary with dynamic shipping
- **Checkout Flow** — Multi-step shipping and payment forms
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Minimalist Aesthetic** — Grayscale-to-color image transitions, architectural typography, clean lines

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── cart/           # Shopping cart
│   ├── checkout/       # Checkout flow
│   ├── collections/    # Collections overview
│   ├── contact/        # Contact page
│   ├── order-confirmation/  # Order confirmation
│   ├── products/[handle]/   # Product detail pages
│   ├── store/          # Product catalog
│   ├── globals.css     # Global styles & theme
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── ui/             # Reusable UI components
│   ├── navbar.tsx      # Navigation
│   ├── footer.tsx      # Footer
│   └── scroll-to-top.tsx
└── lib/
    ├── cart-context.tsx # Cart state management
    ├── products.ts      # Product data
    └── utils.ts         # Utility functions
```

## Collections

| Collection | Description |
|------------|-------------|
| **Studio Collection** | Signature line with architectural silhouettes |
| **Tailored Studio** | Precision tailoring meets fluid fabrics |
| **Essentials** | Refined basics elevated in material and fit |

## License

This project is proprietary. All rights reserved.
