import type { Product } from '~/types/product'

function getApiBase() {
  return useRuntimeConfig().public.apiBase
}

export function getProducts() {
  return $fetch<Product[]>(`${getApiBase()}/products`)
}

export function getCategories() {
  return $fetch<string[]>(`${getApiBase()}/products/categories`)
}

export function getProduct(id: string | number) {
  return $fetch<Product>(`${getApiBase()}/products/${id}`)
}
