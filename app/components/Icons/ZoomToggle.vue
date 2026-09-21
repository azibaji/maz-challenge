<script setup lang="ts">
defineProps<{
  zoomed?: boolean
}>()
</script>

<template>
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="8.5"
      cy="8.5"
      r="5.5"
      stroke="currentColor"
      stroke-width="1.6"
    />
    <path
      d="M17 17L13 13"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <path
      v-if="!zoomed"
      d="M8.5 6.2V10.8M6.2 8.5H10.8"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <path
      v-else
      d="M6.2 8.5H10.8"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
  </svg>
</template>
