# E-Commerce App

A fullstack Nike-inspired storefront built with Next.js App Router, TypeScript, Tailwind CSS, Better Auth, Neon PostgreSQL, Drizzle ORM, and Zustand.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Better Auth (email/password + optional OAuth)
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **State Management**: Zustand + localStorage persistence
- **Linting**: ESLint

## Current Features

### Storefront + Product Discovery

- Landing page with latest products from DB
- Server-rendered products listing with:
  - sorting
  - query-string synced filters
  - URL-driven state
- Product Details Page (PDP) with:
  - image gallery
  - color swatches
  - size picker
  - collapsible product sections
  - reviews and recommended products
- Collections page with category/gender tiles
- Contact page with realistic placeholder info

### Cart Experience (Local Storage)

- Mini cart drawer in navbar (desktop + mobile)
- "Add to Bag" from PDP wired to cart state
- Cart auto-opens on add with slide animation
- Cart CRUD operations:
  - increment quantity
  - decrement quantity
  - remove item
- Subtotal and checkout CTA in drawer
- Hydration-safe cart badge rendering

### Checkout + Orders (Demo Flow)

- Multi-step checkout flow:
  1. Information
  2. Shipping
  3. Payment
  4. Review
- Client-side validation for:
  - email format
  - phone digits (10-15)
  - required address fields + postal code format
  - card number (16 digits), expiry (MM/YY + future date), CVV (3-4)
- Local order placement flow with:
  - mock payment authorization
  - thank-you/order status page
  - persisted order data in localStorage
- Payment gateway abstraction in place for future Stripe integration

### Auth + Data

- Better Auth with API route integration
- Drizzle schema for auth, product catalog, cart, orders, and payments
- DB seed script for sample Nike-style catalog data

## Routes Overview

- `/` - home
- `/products` - products listing
- `/products/[id]` - product details
- `/collections` - collection tiles
- `/contact` - contact page
- `/checkout` - multi-step checkout
- `/checkout/thank-you/[orderId]` - order confirmation/status
- `/sign-in`, `/sign-up` - auth

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create `.env.local` from `.env.example` and fill values:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Optional OAuth
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Optional frontend auth base URL (recommended)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3) Push schema and seed data

```bash
npm run db:push
npm run db:seed
```

### 4) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- Checkout payment is currently a **local mock flow** for demo purposes.
- Cart and checkout/order state are persisted in **localStorage**.
- Stripe can be introduced later by replacing the mock gateway implementation behind `src/lib/payments/gateway.ts`.
