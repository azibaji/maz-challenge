<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import { Close } from '~/components/Icons'
import FilterPanel from './Panel.vue'

const { isOpen, close } = useMobileMenu()
const { data: categories } = useCategories()
const { data: products } = useProducts()
const { hasActiveFilters, clearFilters } = useProductFilters()

const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const p of products.value ?? []) {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }
  return counts
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(isOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    window.addEventListener('keydown', onKeydown)
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="isOpen"
        class="drawer-backdrop"
        @click="close"
      />
    </Transition>
    <Transition name="drawer-slide">
      <aside
        v-if="isOpen"
        class="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div class="drawer__header">
          <span class="drawer__title">Filters</span>
          <button
            type="button"
            class="drawer__close"
            aria-label="Close filters"
            @click="close"
          >
            <Close />
          </button>
        </div>
        <div class="drawer__body">
          <FilterPanel
            :categories="categories ?? []"
            :category-counts="categoryCounts"
          />
        </div>
        <div class="drawer__footer">
          <button
            v-if="hasActiveFilters"
            type="button"
            class="drawer__clear"
            @click="clearFilters"
          >
            Clear all
          </button>
          <button
            type="button"
            class="drawer__apply"
            @click="close"
          >
            Show results
          </button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 20, 0.45);
  z-index: 60;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 85vw);
  background: var(--color-bg);
  z-index: 61;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-pop);
}

.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  flex-shrink: 0;
}

.drawer__title {
  font-size: 16px;
  font-weight: 700;
}

.drawer__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: none;
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
  flex-shrink: 0;
}

.drawer__close svg {
  width: 16px;
  height: 16px;
}

.drawer__close:hover {
  color: var(--color-accent-dark);
}

.drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.drawer__footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  flex-shrink: 0;
}

.drawer__clear {
  height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
}

.drawer__clear:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-dark);
}

.drawer__apply {
  flex: 1;
  height: 44px;
  border-radius: 999px;
  border: none;
  background: var(--color-accent);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.drawer__apply:hover {
  background: var(--color-accent-dark);
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.2s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.25s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

@media (min-width: 1024px) {
  .drawer-backdrop,
  .drawer {
    display: none;
  }
}
</style>
