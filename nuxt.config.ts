// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/ui',
    "@nuxtjs/cloudinary",
    'nuxt-auth-utils',
    'nuxt-tiptap-editor',
  ],
})