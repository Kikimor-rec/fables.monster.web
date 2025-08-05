/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://fables.monster',
  generateRobotsTxt: false, // We have our own robots.ts
  exclude: ['/api/*', '/admin/*', '/timer/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    // Custom priority based on paths
    const priorities = {
      '/': 1.0,
      '/projects': 0.9,
      '/lost-mark': 0.9,
      '/holiday-audit-kramp': 0.9,
      '/about': 0.8,
      '/hellish-bureaucracy': 0.8,
      '/cemetery-of-broken-ships': 0.8,
      '/contact': 0.6,
    };

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorities[path] || 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
