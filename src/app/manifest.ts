import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fables Monster Studio',
    short_name: 'Fables Monster',
    description: 'Independent tabletop RPG content creation studio specializing in horror, sci-fi, and supernatural adventures.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#7a0000',
    icons: [
      {
        src: '/logos/fm-logo-gorizntal-w.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}