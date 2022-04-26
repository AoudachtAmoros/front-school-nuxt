export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front-school',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  io: {
    sockets: [
        { // At least one entry is required
          name: 'chat',
          /*  url: 'http://localhost:7000', */
          url: '192.168.43.236:7000',
          // default: true,
          // vuex: { /* see section below */ },
          // namespaces: { /* see section below */ }
        }
    ]
  },
  server:{
      host: "0.0.0.0",
      port : 3000
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'nuxt-socket-io',
    "vue-toastification/nuxt",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
