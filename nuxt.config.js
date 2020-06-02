export default {
  env: {
    strapiBaseUri: process.env.API_URL || 'http://localhost:1337'
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },

      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Anton&family=Rubik:ital,wght@0,400;0,500;1,400&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  plugins: ['~/plugins/vue-agile'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/style-resources'
  ],
  apollo: {
    clientConfigs: {
      default: {
        // eslint-disable-next-line prettier/prettier
        httpEndpoint:
          process.env.BACKEND_URL || "http://localhost:1337/graphql"
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ['vue-agile']
  },
  server: {
    host: '0.0.0.0' // par défaut: localhost
  }
}
