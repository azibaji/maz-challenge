<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="card"
  >
    <div class="card__image">
      <img
        :src="product.image"
        :alt="product.title"
        loading="lazy"
      >
    </div>
    <div class="card__body">
      <span class="card__category">{{ product.category }}</span>
      <h3 class="card__title">{{ product.title }}</h3>
      <span class="card__cta">
        Show details
        <ChevronLeft :width="16" />
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { ChevronLeft } from '~/components/Icons'

defineProps<{
  product: Product
}>()
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  height: 100%;
}

.card:hover,
.card:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 14px 34px rgba(20, 16, 30, 0.12);
  border-color: #f2c6d6;
}

.card__image {
  aspect-ratio: 1 / 1;
  background: #fff;
  overflow: hidden;
  padding: 8px;
  height: 170px;
}

.card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.25s ease;
}

.card:hover .card__image img {
  transform: scale(1.04);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px 16px;
  flex: 1;
}

.card__category {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent-dark);
}

.card__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--color-text);
  display: -webkit-box;
  overflow: hidden;
  min-height: 2.7em;
}

.card__cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 40px;
  border-radius: 999px;
  border: 1.5px solid var(--color-border-muted);
  color: var(--color-accent-dark);
  font-size: 14px;
  font-weight: 600;
  transition: background 0.15s ease, color 0.15s ease;
  margin-right: 4px;
  margin-left: 4px;
}

.card__cta svg {
  margin-top: 3px;
}

.card:hover .card__cta {
  background: var(--color-accent);
  color: white;
}
.card:hover .card__cta svg {
  color: #fff;
}
</style>
