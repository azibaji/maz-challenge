<script setup lang="ts">
import ChevronLeft from './Icons/ChevronLeft.vue'

export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()

const { t } = useI18n()
</script>

<template>
  <nav
    class="breadcrumb"
    :aria-label="t('breadcrumb.ariaLabel')"
  >
    <template
      v-for="(item, index) in items"
      :key="`${item.label}-${index}`"
    >
      <NuxtLink
        v-if="item.to"
        :to="item.to"
      >{{ item.label }}</NuxtLink>
      <span v-else>{{ item.label }}</span>
      <ChevronLeft v-if="index < items.length - 1" />
    </template>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.breadcrumb a {
  color: var(--color-text-muted);
}

.breadcrumb a:hover {
  color: var(--color-accent-dark);
}

.breadcrumb svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.breadcrumb span {
  color: var(--color-text);
  text-transform: capitalize;
}
</style>
