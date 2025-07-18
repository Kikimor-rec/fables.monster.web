import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fables.monster';
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/lost-mark`, lastModified: new Date() },
    { url: `${base}/cemetery-of-broken-ships`, lastModified: new Date() },
    { url: `${base}/hellish-bureaucracy`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
