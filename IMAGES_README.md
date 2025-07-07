# Fables Monster Studio Website

## Team

The website now includes information about the real team members:

- **Stepan Kulikov** - Writer & Game Designer
- **Tatiana Bond** - Layout Designer  
- **Zlata (jamakuci) Ignatova** - Artist
- **Stanislav DariDai** - Composer
- **Allecks** - Developer

## Images

### Lost Mark Images
The website uses WebP images for optimal performance and quality:

- `/public/images/lost-mark/lm_promo_1.webp` - Main promotional image used in:
  - Lost Mark page hero section (background)
  - Home page flagship project section
  - Projects page featured project section
  
- `/public/images/lost-mark/ship_lm.webp` - Ship illustration used in:
  - Lost Mark page about section

### Image Usage:

1. **Promotional image** (`lm_promo_1.webp`):
   - Used as background in hero section with 20% opacity
   - Used as cover image in project cards with 80% opacity
   - Optimized with Next.js Image component

2. **Ship image** (`ship_lm.webp`):
   - Used in the "About the Adventure" section
   - Maintains aspect ratio with responsive sizing

## Usage

The images are used in the Lost Mark page (`/src/app/lost-mark/page.tsx`) using Next.js Image component for optimal performance.

## Development

```bash
npm run dev
```

To view the website with the new team information and image placeholders.
