# Maz Challenge — Product Catalog

A product catalog built with Nuxt 4 and Vue 3, backed by the [Fake Store API](https://fakestoreapi.com). It lists products with search, category filtering, and sorting, and includes a product detail page with a zoomable/pannable image.

## Features

- **Product listing** — grid of products with infinite scroll (loads more rows as you scroll)
- **Filtering & sorting** — search by title, filter by category (desktop sidebar / mobile drawer), sort by price or rating
- **Active filter chips** — applied filters are shown as removable chips, with a "clear all" action
- **Product detail page** — full specs (price, description, category, rating) with a click-to-zoom, drag-to-pan product image
- **Loading & error states** — skeleton placeholders while data loads, friendly messages on failure or empty results

## Tech Stack

- [Nuxt 4](https://nuxt.com/) / [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- TypeScript
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
