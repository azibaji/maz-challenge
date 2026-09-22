import type { Product } from '~/types/product'
import { getCategories, getProduct, getProducts } from '~/services/products'

export function useProducts() {
  return useAsyncData<Product[]>('products', () => getProducts(), {
    default: () => []
  })
}

export function useCategories() {
  return useAsyncData<string[]>('categories', () => getCategories(), {
    default: () => []
  })
}

export function useProduct(id: string | number) {
  return useAsyncData<Product>(`product-${id}`, () => getProduct(id))
}
