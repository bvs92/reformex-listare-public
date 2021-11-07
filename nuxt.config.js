if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export default {

  // loading: {
  //   color: 'blue',
  //   height: '5px'
  // },


  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },


  loading: '~/components/global/Loader.vue',

  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#3B8070',
    background: 'white'
  },

  ssr: true,
  // target: 'static',

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
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
    // { src: '~/plugins/vue-burger-menu.js', ssr: false, mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  serverMiddleware: [
    { path: "/resources", handler: "~/server-middleware/rest.js" },
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxt/http',
    '@nuxtjs/dotenv',
    // 'nuxt-svg-loader',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true
    },

    // vendor: ['vue-burger-menu'],
  },





}
