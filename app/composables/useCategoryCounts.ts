import type { Ref } from 'vue'
import type { Product } from '~/types/product'

export function useCategoryCounts(products: Ref<Product[] | null | undefined>) {
  return computed(() => {
    const counts: Record<string, number> = {}
    for (const p of products.value ?? []) {
      counts[p.category] = (counts[p.category] ?? 0) + 1
    }
    return counts
  })
}
