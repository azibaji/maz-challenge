<template>
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    :style="{ color: colorMap[props.color] }"
  >
    <circle
      cx="9"
      cy="9"
      r="6.5"
      stroke="currentColor"
      stroke-width="1.6"
    />
    <path
      d="M17 17L13.5 13.5"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
type IconColor = 'muted' | 'text' | 'accent' | 'accent-dark'

const props = withDefaults(defineProps<{
  color?: IconColor
}>(), {
  color: 'muted',
})

const colorMap: Record<IconColor, string> = {
  'muted': 'var(--color-text-muted)',
  'text': 'var(--color-text)',
  'accent': 'var(--color-accent)',
  'accent-dark': 'var(--color-accent-dark)',
}
</script>
