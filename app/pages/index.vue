<template>
  <div class="page container">
    <div class="page__head">
      <div>
        <h1 class="page__title">
          All Products
        </h1>
      </div>
    </div>

    <div class="layout">
      <aside class="sidebar">
        sidebar
      </aside>

      <div class="content">
        <div
          v-if="pending"
          class="grid"
        >
          <div
            v-for="n in 8"
            :key="n"
            class="skeleton-card"
          />
        </div>

        <div
          v-else-if="error"
          class="state-message"
        >
          <p>Something went wrong loading products. Please try again.</p>
        </div>

        <div
          v-else-if="filteredProducts.length === 0"
          class="state-message"
        >
          <p>No products match your filters.</p>
        </div>

        <template v-else>
          <div
            ref="gridEl"
            class="grid"
          >
            <ProductCard
              v-for="product in visibleProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <div
            v-if="hasMore"
            ref="sentinel"
            class="load-sentinel"
          >
            <div class="grid">
              <div
                v-for="n in columns"
                :key="n"
                class="skeleton-card"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { data: products, pending, error } = useProducts()

const filteredProducts = computed(() => {
  const list = products.value ?? []
  return list
})

const ROWS_PER_BATCH = 3
const columns = ref(3)
const rowsLoaded = ref(1)

const visibleCount = computed(() => columns.value * ROWS_PER_BATCH * rowsLoaded.value)
const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredProducts.value.length)

const gridEl = ref<HTMLElement | null>(null)
const sentinel = ref<HTMLElement | null>(null)

function updateColumns() {
  if (!gridEl.value) return
  const trackCount = getComputedStyle(gridEl.value).gridTemplateColumns.split(' ').filter(Boolean).length
  if (trackCount > 0) columns.value = trackCount
}

let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

function observeSentinel() {
  intersectionObserver?.disconnect()
  if (sentinel.value) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore.value) {
          rowsLoaded.value++
        }
      },
      { rootMargin: '200px' }
    )
    intersectionObserver.observe(sentinel.value)
  }
}

watch(sentinel, () => observeSentinel())

onMounted(() => {
  updateColumns()
  resizeObserver = new ResizeObserver(updateColumns)
  if (gridEl.value) resizeObserver.observe(gridEl.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
})

watch(filteredProducts, () => {
  rowsLoaded.value = 1
})
</script>

<style scoped>
.page {
  padding-block: 28px 60px;
}

.page__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.page__title {
  margin: 0 0 4px;
  font-size: 26px;
}

.page__subtitle {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14.5px;
}

.filters-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-weight: 700;
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
}

.filters-trigger svg {
  width: 17px;
  height: 17px;
}

.filters-trigger:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-dark);
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
}

.sidebar {
  display: none;
}

.sidebar__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
  position: sticky;
  top: calc(var(--header-height) + 20px);
}

.sidebar__title {
  margin: 0 0 18px;
  font-size: 16px;
  font-weight: 700;
}

.chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.chips__label {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 600;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 8px 0 14px;
  border-radius: 999px;
  border: none;
  background: var(--color-accent-soft);
  color: var(--color-accent-dark);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.chip svg {
  width: 14px;
  height: 14px;
}

.chip:hover {
  background: #f8c9dc;
}

.clear-link {
  border: none;
  background: none;
  padding: 0 4px;
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
}

.clear-link:hover {
  color: var(--color-accent-dark);
}

.results-meta {
  margin: 0 0 18px;
  font-size: 13.5px;
  color: var(--color-text-muted);
}

.link-btn {
  border: none;
  background: none;
  padding: 0;
  color: var(--color-accent-dark);
  font-weight: 600;
  font-size: inherit;
  cursor: pointer;
  text-decoration: underline;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}

.load-sentinel {
  margin-top: 18px;
}

.skeleton-card {
  height: 320px;
  border-radius: var(--radius-md);
  background: linear-gradient(100deg, #eeecf1 30%, #f6f5f8 50%, #eeecf1 70%);
  background-size: 200% 100%;
  animation: shimmer 1.3s ease-in-out infinite;
  border: 1px solid var(--color-border);
}

@keyframes shimmer {
  0% {
    background-position: 120% 0;
  }
  100% {
    background-position: -20% 0;
  }
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

@media (min-width: 1024px) {
  .filters-trigger {
    display: none;
  }

  .layout {
    grid-template-columns: 280px 1fr;
  }

  .sidebar {
    display: block;
  }
}

@media (max-width: 480px) {
  .page__head {
    flex-direction: column;
    align-items: stretch;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
}
</style>
