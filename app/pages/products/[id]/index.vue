<template>
  <div class="page container">
    <BreadCrumb :items="breadcrumbItems" />

    <div
      v-if="pending"
      class="detail detail--skeleton"
    >
      <div class="detail__hero">
        <div
          class="skeleton-line"
          style="width: 30%; height: 14px"
        />
        <div
          class="skeleton-line"
          style="width: 70%; height: 30px; margin-top: 10px"
        />
        <div
          class="skeleton-image"
          style="margin-top: 20px"
        />
      </div>
      <div class="skeleton-info">
        <div
          class="skeleton-line"
          style="width: 100%; height: 48px"
        />
        <div
          class="skeleton-line"
          style="width: 100%; height: 48px"
        />
        <div
          class="skeleton-line"
          style="width: 100%; height: 48px"
        />
      </div>
    </div>

    <div
      v-else-if="error || !product"
      class="state-message"
    >
      <p>We couldn't find that product.</p>
      <NuxtLink
        to="/"
        class="link-btn"
      >Return to product list</NuxtLink>
    </div>

    <div
      v-else
      class="detail"
    >
      <div class="detail__hero">
        <h1 class="detail__title">
          {{ product.title }}
        </h1>

        <div
          ref="imageWrapRef"
          class="detail__image"
          :class="{ 'detail__image--zoomed': isZoomed, 'detail__image--dragging': isDragging }"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @pointerleave="onPointerUp"
        >
          <img
            :src="product.image"
            :alt="product.title"
            :style="isZoomed ? { transform: `translate(${panX}px, ${panY}px) scale(${ZOOM_SCALE})` } : undefined"
          >
          <button
            type="button"
            class="detail__zoom"
            :aria-label="isZoomed ? 'Zoom out' : 'Zoom in'"
            :aria-pressed="isZoomed"
            @pointerdown.stop
            @click="toggleZoom"
          >
            <ZoomToggle :zoomed="isZoomed" />
          </button>
        </div>
      </div>

      <div class="specs">
        <h2 class="specs__heading">
          Specifications
        </h2>
        <dl class="specs__list">
          <div class="specs__row">
            <dt class="specs__label">Price</dt>
            <dd class="specs__value">${{ product.price.toFixed(2) }}</dd>
          </div>
          <div class="specs__row">
            <dt class="specs__label">Description</dt>
            <dd class="specs__value">{{ product.description }}</dd>
          </div>
          <div class="specs__row">
            <dt class="specs__label">Category</dt>
            <dd class="specs__value">{{ product.category }}</dd>
          </div>
          <div class="specs__row">
            <dt class="specs__label">Rating</dt>
            <dd class="specs__value">{{ product.rating.rate }}</dd>
          </div>
          <div class="specs__row">
            <dt class="specs__label">Reviews</dt>
            <dd class="specs__value">{{ product.rating.count }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ZoomToggle } from '~/components/Icons'
import { useProduct } from '~/composables/useProducts'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { data: product, pending, error } = useProduct(id.value)

const breadcrumbItems = computed(() => [
  { label: 'All Products', to: '/' },
  ...(product.value ? [{ label: product.value.category }] : []),
])

const ZOOM_SCALE = 2

const imageWrapRef = ref<HTMLElement | null>(null)
const isZoomed = ref(false)
const isDragging = ref(false)
const panX = ref(0)
const panY = ref(0)
let dragOrigin = { x: 0, y: 0 }
let panOrigin = { x: 0, y: 0 }

function clampPan() {
  const el = imageWrapRef.value
  if (!el) return
  const { width, height } = el.getBoundingClientRect()
  const maxX = (width * (ZOOM_SCALE - 1)) / 2
  const maxY = (height * (ZOOM_SCALE - 1)) / 2
  panX.value = Math.min(maxX, Math.max(-maxX, panX.value))
  panY.value = Math.min(maxY, Math.max(-maxY, panY.value))
}

function toggleZoom() {
  isZoomed.value = !isZoomed.value
  if (!isZoomed.value) {
    panX.value = 0
    panY.value = 0
  }
}

function onPointerDown(e: PointerEvent) {
  if (!isZoomed.value) return
  isDragging.value = true
  dragOrigin = { x: e.clientX, y: e.clientY }
  panOrigin = { x: panX.value, y: panY.value }
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  panX.value = panOrigin.x + (e.clientX - dragOrigin.x)
  panY.value = panOrigin.y + (e.clientY - dragOrigin.y)
  clampPan()
}

function onPointerUp() {
  isDragging.value = false
}

useHead(() => ({
  title: product.value ? `${product.value.title} — FakeStore` : 'Product — FakeStore',
}))
</script>

<style scoped>
.page {
  padding-block: 24px 60px;
  max-width: 888px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail__hero {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.detail__title {
  margin: 6px 0 0;
  font-size: 24px;
  line-height: 1.3;
}

.detail__image {
  position: relative;
  margin-top: 20px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg);
  aspect-ratio: 16 / 10;
}

.detail__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail__image:not(.detail__image--zoomed) img {
  cursor: zoom-in;
}

.detail__zoom {
  position: absolute;
  top: 14px;
  right: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 999px;
  background: rgba(10, 10, 20, 0.55);
  color: #fff;
  cursor: pointer;
}

.detail__zoom:hover {
  background: rgba(10, 10, 20, 0.75);
}

.detail__zoom svg {
  width: 18px;
  height: 18px;
}

.detail__image--zoomed {
  cursor: grab;
  touch-action: none;
}

.detail__image--zoomed img {
  transition: transform 0.15s ease-out;
}

.detail__image--dragging {
  cursor: grabbing;
}

.detail__image--dragging img {
  transition: none;
}

.specs {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 20px;
}

.specs__heading {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
}

.specs__list {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.specs__row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
}

.specs__value, .specs__label {
  background: #F5F7FA;
  padding: 14px 16px;
}

.specs__label {
  margin: 0;
  font-size:14px;
  font-weight: 500;
  color: #57728E;
  border-radius: 4px 16px 16px 4px;
}

.specs__value {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #30445B;
  border-radius: 16px 4px 4px 16px;
}

.state-message {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.link-btn {
  color: var(--color-accent-dark);
  font-weight: 600;
  text-decoration: underline;
}

.detail--skeleton {
  gap: 20px;
}

.detail--skeleton .skeleton-image {
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-md);
  background: linear-gradient(100deg, #eeecf1 30%, #f6f5f8 50%, #eeecf1 70%);
  background-size: 200% 100%;
  animation: shimmer 1.3s ease-in-out infinite;
}

.skeleton-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  border-radius: 6px;
  background: linear-gradient(100deg, #eeecf1 30%, #f6f5f8 50%, #eeecf1 70%);
  background-size: 200% 100%;
  animation: shimmer 1.3s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 120% 0;
  }
  100% {
    background-position: -20% 0;
  }
}

@media (max-width: 480px) {
  .specs__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
