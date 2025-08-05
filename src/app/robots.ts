import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/timer/', '/admin/'],
    },
    sitemap: 'https://fables.monster/sitemap.xml',
  }
}
