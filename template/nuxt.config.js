const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | {{ name }}',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      }
    ]
  },
  /*
  ** Load global CSS
  */
  css: ['@/assets/css/main.css'],
  /*
    ** Load Plugins
    */
   plugins: [
    { src: '~plugins/cq.js', ssr: false },
    { src: '~plugins/bowser.js', ssr: false }
  ],

  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** This option is given directly to the vue-router Router constructor
  */
  router: {
    base: '',
    linkActiveClass: 'is-active'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Extract CSS
    */
    extractCSS: true,
    vendor: ['cq-prolyfill', 'bowser'],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      /*
      ** Cleanup CSS with PurgeCSS
      */
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            whitelist: ['html', 'body']
          })
        )
      }
    }
  }
}
