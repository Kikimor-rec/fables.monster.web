/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://fables.monster',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/404',
    '/_error',
    '/lost-mark/terminal',
    // Exclude generic /projects/{slug} routes for projects with dedicated pages
    '/*/projects/career-twilight',
    '/*/projects/lost-mark',
    '/*/projects/expedition-418',
    '/*/projects/hellish-bureaucracy',
    '/*/projects/holiday-audit-kramp',
    '/*/projects/old-world-neon',
  ],
};

export default config;
