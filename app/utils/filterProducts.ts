import type { SortOption } from '~/composables/useProductFilters'
import type { Product } from '~/types/product'

export interface ProductFilterCriteria {
  search: string
  categories: string[]
  sort: SortOption
}

export function filterAndSortProducts(products: Product[], criteria: ProductFilterCriteria): Product[] {
  let list = products

  if (criteria.categories.length > 0) {
    list = list.filter(p => criteria.categories.includes(p.category))
  }

  const query = criteria.search.trim().toLowerCase()
  if (query) {
    list = list.filter(p => p.title.toLowerCase().includes(query))
  }

  list = [...list]
  switch (criteria.sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list.sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      list.sort((a, b) => b.rating.rate - a.rating.rate)
      break
    case 'rating-asc':
      list.sort((a, b) => a.rating.rate - b.rating.rate)
      break
  }

  return list
}
