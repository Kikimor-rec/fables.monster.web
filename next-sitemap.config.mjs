/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://fables.monster',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/_error', '/lost-mark/terminal'],
};

export default config;
