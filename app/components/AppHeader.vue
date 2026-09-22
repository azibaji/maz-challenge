<template>
  <header class="header">
    <div class="header__inner container">
      <nav
        class="header__nav"
        aria-label="Main"
      >
        <NuxtLink
          to="/"
          class="header__link"
          :class="{ 'header__link--active': isActive('/') }"
        >
          <Grid />
          Product List
          <span
            v-if="isActive('/')"
            class="header__dot"
          />
        </NuxtLink>
        <a
          href="#"
          class="header__link"
        >
          <Book />
          Get Consultation
        </a>
        <a
          href="#"
          class="header__link"
        >
          <Question />
          FAQ
        </a>
        <a
          href="#"
          class="header__link"
        >
          <Phone />
          Contact Us
        </a>
      </nav>

      <a
        href="#"
        class="header__cta"
      >
        <Phone />
        <span>Call Us</span>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Book, Grid, Phone, Question } from '~/components/Icons'

const route = useRoute()

function isActive(path: string) {
  return route.path === path
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  height: var(--header-height);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;
}

.header__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.header__link svg {
  width: 17px;
  height: 17px;
}

.header__link:hover,
.header__link--active {
  color: var(--color-text);
}

.header__dot {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
}

.header__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
  flex-shrink: 0;
}

.header__cta svg {
  width: 15px;
  height: 15px;
}

.header__cta:hover {
  background: var(--color-accent-dark);
}

@media (max-width: 860px) {
  .header__nav {
    display: none;
  }

  .header__cta {
    width: 38px;
    padding: 0;
    justify-content: center;
  }

  .header__cta span {
    display: none;
  }
}
</style>
