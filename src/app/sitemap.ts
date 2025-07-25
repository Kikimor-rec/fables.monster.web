import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fables.monster';
  const lastModified = new Date();
  
  return [
    { 
      url: `${base}/`, 
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    { 
      url: `${base}/projects`, 
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    { 
      url: `${base}/lost-mark`, 
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    { 
      url: `${base}/cemetery-of-broken-ships`, 
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    { 
      url: `${base}/hellish-bureaucracy`, 
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    { 
      url: `${base}/about`, 
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    { 
      url: `${base}/contact`, 
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6
    },
  ];
}
