<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <FilterDrawer />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { FilterDrawer } from '~/components/Filter'
</script>

<style scoped>
.app-shell {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
