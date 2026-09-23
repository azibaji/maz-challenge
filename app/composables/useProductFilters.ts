export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc'

export function useSortOptions() {
  const { t } = useI18n()
  return computed<{ value: SortOption; label: string }[]>(() => [
    { value: 'price-asc', label: t('filters.sortOptions.priceAsc') },
    { value: 'price-desc', label: t('filters.sortOptions.priceDesc') },
    { value: 'rating-desc', label: t('filters.sortOptions.ratingDesc') },
    { value: 'rating-asc', label: t('filters.sortOptions.ratingAsc') }
  ])
}

export function useProductFilters() {
  const search = useState<string>('filters-search', () => '')
  const categories = useState<string[]>('filters-categories', () => [])
  const sort = useState<SortOption>('filters-sort', () => 'default')

  const hasActiveFilters = computed(
    () => search.value.trim().length > 0 || categories.value.length > 0 || sort.value !== 'default'
  )

  function toggleCategory(category: string) {
    const idx = categories.value.indexOf(category)
    if (idx === -1) {
      categories.value = [...categories.value, category]
    } else {
      categories.value = categories.value.filter((c) => c !== category)
    }
  }

  function removeCategory(category: string) {
    categories.value = categories.value.filter((c) => c !== category)
  }

  function clearFilters() {
    search.value = ''
    categories.value = []
    sort.value = 'default'
  }

  return { search, categories, sort, hasActiveFilters, toggleCategory, removeCategory, clearFilters }
}

export function useMobileMenu() {
  const isOpen = useState<boolean>('mobile-menu-open', () => false)

  function open() {
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
  }
  function toggle() {
    isOpen.value = !isOpen.value
  }

  return { isOpen, open, close, toggle }
}
