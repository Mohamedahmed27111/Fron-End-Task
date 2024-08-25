// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css:['~/assets/styles/main.css'],

  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon" ,  '@primevue/nuxt-module' , '@pinia/nuxt'],
  app: {
    head: {
      title: 'Markups',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
  
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false
        }
    }
}
}
})