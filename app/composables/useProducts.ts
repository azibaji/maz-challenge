import type { Product } from '~/types/product'

const API_BASE = 'https://fakestoreapi.com'

export function useProducts() {
  return useFetch<Product[]>(`${API_BASE}/products`, {
    key: 'products',
    default: () => [],
  })
}
