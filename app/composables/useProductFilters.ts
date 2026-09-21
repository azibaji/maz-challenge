export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc'

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'rating-asc', label: 'Rating: Low to High' }
]

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
