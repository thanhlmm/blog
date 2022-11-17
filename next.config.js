const { i18n } = require('./next-i18next.config');

module.exports = {
  async rewrites() {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
      {
        source: "/rss",
        destination: "/api/rss",
      },
    ];
  },
  i18n,
  images: {
    domains: ['pbs.twimg.com']
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}