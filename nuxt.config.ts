export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: 'https://fakestoreapi.com',
    },
  },

  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'rtl', file: 'en.ts' },
      { code: 'fa', language: 'fa-IR', name: 'فارسی', dir: 'rtl', file: 'fa.ts' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },
})
