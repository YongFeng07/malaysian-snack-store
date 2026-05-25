# RASA.CLUB Malaysian Snack Store

Premium mobile-first snack ordering app for Instagram/TikTok bio traffic. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, shadcn-style UI primitives, Zustand, React Hook Form, Zod, and Supabase.

## Features

- Customer landing page, product catalog, product detail, cart drawer, checkout, WhatsApp order generation, auth screens, account area, order history empty states.
- Admin dashboard with analytics cards, revenue chart, recent orders, best sellers, products, orders, customers, and coupons.
- Supabase PostgreSQL schema with relationships, indexes, RLS policies, seed data, storage-ready image helper, and auth profile design.
- Payment integration-ready endpoints for ToyyibPay and Stripe.
- Dark mode, toast notifications, SEO metadata, OpenGraph, PWA manifest, loading states, mobile bottom navigation, and responsive premium UI.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The app runs with demo catalog data when Supabase env vars are placeholders, so it is immediately previewable. To go live, copy `.env.example` to `.env.local` and fill real keys.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql`.
3. Run `supabase/migrations/002_seed_data.sql`.
4. Create a public storage bucket named `product-images`.
5. Enable Google OAuth in Supabase Auth if using Google login.
6. Add an admin profile by setting `profiles.role = 'admin'`.

## Environment Variables

See `.env.example` for Supabase, Stripe, ToyyibPay, WhatsApp, TikTok pixel, and app URL configuration.

## Deployment

Deploy to Vercel, add the environment variables, connect the Supabase project, and set the production site URL in Supabase Auth redirect URLs.

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
```
