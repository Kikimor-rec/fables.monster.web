import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fables.monster'
  const languages = ['en', 'ru']
  
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/lost-mark', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/lost-mark/terminal', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/hellish-bureaucracy', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/old-world-neon', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/timer', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/holiday-audit-kramp', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const lang of languages) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route.path}`,
            ru: `${baseUrl}/ru${route.path}`,
          },
        },
      })
    }
  }

  return sitemapEntries
}
