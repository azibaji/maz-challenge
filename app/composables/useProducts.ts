import type { Product } from '~/types/product'

const API_BASE = 'https://fakestoreapi.com'

export function useProducts() {
  return useFetch<Product[]>(`${API_BASE}/products`, {
    key: 'products',
    default: () => [],
  })
}
export function useCategories() {
  return useFetch<string[]>(`${API_BASE}/products/categories`, {
    key: 'categories',
    default: () => [],
  })
}
