# Maz Challenge — Product Catalog

A product catalog built with Nuxt 4 and Vue 3, backed by the [Fake Store API](https://fakestoreapi.com). It lists products with search, category filtering, and sorting, and includes a product detail page with a zoomable/pannable image.

## Features

- **Product listing** — grid of products with infinite scroll (loads more rows as you scroll)
- **Filtering & sorting** — search by title, filter by category (desktop sidebar / mobile drawer), sort by price or rating
- **Active filter chips** — applied filters are shown as removable chips, with a "clear all" action
- **Product detail page** — full specs (price, description, category, rating) with a click-to-zoom, drag-to-pan product image
- **Loading & error states** — skeleton placeholders while data loads, friendly messages on failure or empty results
- **Internationalization** — UI copy in English and Farsi (see [Internationalization](#internationalization) below)

## Tech Stack

- [Nuxt 4](https://nuxt.com/) / [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- TypeScript
- [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/) (English / Farsi)
- ESLint (`@nuxt/eslint`, stylistic rules)

## Project Structure

```
app/
├── components/       # UI components (ProductCard, AppHeader/Footer, BreadCrumb, Filter/, Icons/)
├── composables/       # useProducts, useProductFilters, useCategoryCounts
├── services/          # API calls to the Fake Store API
├── types/              # Shared TypeScript types (Product, ProductRating)
├── utils/              # Filtering/sorting helpers, category helpers
└── pages/              # index.vue (catalog), products/[id]/index.vue (detail)

i18n/
└── locales/            # en.ts, fa.ts — UI copy per locale
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server at `http://localhost:3000`:

```bash
npm run dev
```

## Other Scripts

```bash
npm run build      # Production build
npm run generate    # Static site generation
npm run preview      # Preview the production build locally
```

## Configuration

The Fake Store API base URL is set via `runtimeConfig.public.apiBase` in [nuxt.config.ts](nuxt.config.ts) (defaults to `https://fakestoreapi.com`).

## Internationalization

UI copy lives in [i18n/locales/en.ts](i18n/locales/en.ts) and [i18n/locales/fa.ts](i18n/locales/fa.ts), wired up via `@nuxtjs/i18n` (config in [nuxt.config.ts](nuxt.config.ts)). Components read strings with `useI18n().t(...)` instead of hardcoding text.

- **Default locale**: set via `i18n.defaultLocale` in `nuxt.config.ts` (currently `en`).
- **No language switcher yet** — to preview the other locale, change `defaultLocale`, or override it per-request via the `i18n_redirected` cookie / `?lang=` query param.
- **Layout direction is RTL for both locales** (`dir: 'rtl'` on every locale entry) — this was a deliberate scope decision, not per-locale mirroring. The existing icon set (e.g. `ChevronLeft` used as the "forward" affordance) was already built assuming RTL, so English currently renders RTL too rather than mixing directions per locale.
- **Farsi font**: `fa` is intended to render in **Yekan Bakh**, a paid, proprietary font (sold via [fontiran.com](https://fontiran.com/fonts/yekan-bakh)) — it is **not bundled** in this repo, since redistributing it without a license would be a copyright violation. The `@font-face` rules and `--font-fa` variable are already set up in [app/assets/css/main.css](app/assets/css/main.css); to activate them, add your own licensed files at:
  - `public/fonts/YekanBakh-Regular.woff2`
  - `public/fonts/YekanBakh-Bold.woff2`

  Until those files are added, `fa` falls back to `Tahoma, 'Segoe UI', sans-serif`.
