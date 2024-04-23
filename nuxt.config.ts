// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.13/shaka-player.ui.min.js',
        },
      ],
      link: [
        {
          href: 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.13/controls.min.css',
          rel: 'stylesheet',
        },
      ],
    },
  },
});
