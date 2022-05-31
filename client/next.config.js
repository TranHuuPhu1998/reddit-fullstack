const nextTranslate = require('next-translate')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  }),
)
module.exports = nextTranslate(config)

// https://github.com/shadowwalker/next-pwa/tree/master/examples/next-i18next
