<template>
  <div class="panel">
    <div class="panel__card">
      <section class="panel__section">
        <span class="panel__label">{{ t('filters.searchAndFilter') }}</span>
        <form
          class="search-field"
          @submit.prevent="applySearch"
        >
          <label class="search-field__input-wrap">
            <SearchIcon color="accent" />
            <span class="visually-hidden">{{ t('filters.searchAriaLabel') }}</span>
            <input
              v-model="searchDraft"
              type="search"
              :placeholder="t('filters.searchPlaceholder')"
              @search="applySearch"
            >
          </label>
          <button
            type="submit"
            class="search-field__submit"
          >
            {{ t('filters.search') }}
          </button>
        </form>
      </section>
    </div>
    <div class="panel__card">
      <section class="panel__section">
        <button
          type="button"
          class="panel__header"
          :aria-expanded="sortOpen"
          @click="sortOpen = !sortOpen"
        >
          <span class="panel__label">{{ t('filters.sortBy') }}</span>
          <ChevronDown
            class="panel__chevron"
            :class="{ 'panel__chevron--open': sortOpen }"
          />
        </button>
        <div
          v-show="sortOpen"
          class="option-list"
          role="radiogroup"
          :aria-label="t('filters.sortAriaLabel')"
        >
          <label
            v-for="opt in sortOptions"
            :key="opt.value"
            class="option-row"
          >
            <input
              v-model="sort"
              type="radio"
              name="sort"
              :value="opt.value"
            >
            <span>{{ opt.label }}</span>
          </label>
        </div>
      </section>
    </div>
    <div class="panel__card">
      <section class="panel__section">
        <button
          type="button"
          class="panel__header"
          :aria-expanded="categoryOpen"
          @click="categoryOpen = !categoryOpen"
        >
          <span class="panel__label">{{ t('filters.category') }}</span>
          <ChevronDown
            class="panel__chevron"
            :class="{ 'panel__chevron--open': categoryOpen }"
          />
        </button>
        <div
          v-show="categoryOpen"
          class="option-list"
        >
          <label
            v-for="c in categories"
            :key="c"
            class="option-row"
          >
            <input
              type="checkbox"
              :checked="activeCategories.includes(c)"
              @change="toggleCategory(c)"
            >
            <p class="option-row__text">
              <span>{{ categoryLabel(c) }}</span>
              <span class="option-row__count">{{ categoryCounts?.[c] ?? 0 }}</span>
            </p>
          </label>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSortOptions } from '~/composables/useProductFilters'
import { ChevronDown, SearchIcon } from '../Icons'

const { t } = useI18n()

defineProps<{
  categories: string[]
  categoryCounts?: Record<string, number>
}>()

const { search, categories: activeCategories, sort, toggleCategory, clearFilters, hasActiveFilters }
  = useProductFilters()
const sortOptions = useSortOptions()

const searchDraft = ref(search.value)

watch(search, (value) => {
  searchDraft.value = value
})

function applySearch() {
  search.value = searchDraft.value
}

const sortOpen = ref(true)
const categoryOpen = ref(true)
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.panel__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  top: calc(var(--header-height) + 20px);
}
.panel__section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel__label {
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-label);
  margin-bottom: 16px;
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: inherit;
  font: inherit;
}

.panel__chevron {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: transform 0.15s ease;
}

.panel__chevron--open {
  transform: rotate(180deg);
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-field__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.search-field__input-wrap svg {
  position: absolute;
  right: 14px;
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.search-field__input-wrap::after {
  content: '';
  position: absolute;
  right: 38px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 20px;
  background: var(--color-border);
  pointer-events: none;
}

.search-field__input-wrap input {
  width: 100%;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  padding: 0 50px 0 16px;
  font-size: 13px;
  color: var(--color-text);
}

.search-field__input-wrap input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.search-field__submit {
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid var(--color-accent);
  background: var(--color-accent);
  color: var(--color-surface);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  display: block;
}

.search-field__submit:hover {
  background: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
}

.option-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: var(--color-text-muted);
}

.option-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 4px;
  font-size: 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.option-row:hover {
  background: var(--color-bg);
}

.option-row:has(input:checked) {
  color: var(--color-text);
}

.option-row input[type='radio'],
.option-row input[type='checkbox'] {
  accent-color: var(--color-accent);
  width: 17px;
  height: 17px;
  flex-shrink: 0;
}

.option-row__text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: 0;
  min-width: 0;
  font-size: 12px;
  font-weight: 500;
}

.option-row__count {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-badge);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-surface);
  flex-shrink: 0;
}

.option-row:has(input:checked) .option-row__count {
  border-color: var(--color-accent);
  background: var(--color-accent);
}
</style>
