// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devServer: { port: 3001 },
  css: [
    '~/assets/_main.scss'
  ],
  nitro: {
    devProxy: {
      '/kql/': {
        target: 'http://localhost:8000/api/',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})