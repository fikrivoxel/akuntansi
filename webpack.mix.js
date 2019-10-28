const path = require('path')
const mix = require('laravel-mix')

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'assets/')
    }
  }
}).js(
  'assets/js/app.js',
  '.tmp/public/js'
).sass(
  'assets/styles/app.scss',
  '.tmp/public/styles'
).copy([
    'assets/images/**/*.jpg',
    'assets/images/**/*.png',
    'assets/images/**/*.ico'
  ], '.tmp/public/images'
).setPublicPath('.tmp/public')
