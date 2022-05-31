const nextTranslate = require('next-translate')
// const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([
  [withBundleAnalyzer],
  {
    ...nextTranslate(),
  },
])
