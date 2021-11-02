export default {

  // loading: {
  //   color: 'blue',
  //   height: '5px'
  // },

  loading: '~/components/global/Loader.vue',

  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#3B8070',
    background: 'white'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Caută firme și profesioniști pentru proiectul tău',
    htmlAttrs: {
      lang: 'ro'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { hid: 'fontawesome', src: 'https://use.fontawesome.com/468b2e542c.js', defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/flaticon.css',
    '@/assets/css/style.css',
    '@/assets/css/responsive.css',
    '@/assets/css/fancybox.css',
    // '@/assets/css/owl-carousel.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: 'plugins/owl.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    // 'nuxt-svg-loader',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},


}
