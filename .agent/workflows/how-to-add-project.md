---
description: How to add a new project to the website
---

# How to Add a New Project

This workflow guides you through adding a new project to the Fables Monster website.

## 1. Prepare Your Assets
- **Images**: You need at least one main image for the project.
- **Location**: Place your images in `public/images/your-project-slug/`.
- **Format**: WebP is recommended, but PNG/JPG works too.

## 2. Update the Data File
Open `src/data/projects.ts`.

Add a new object to the `projects` array. Here is a template:

```typescript
{
    id: "unique-id-here",
    slug: "url-friendly-slug", // This will be your URL: /projects/url-friendly-slug
    title: "Project Title",
    system: "Mothership 1E", // or "D&D 5E", etc.
    tagline: "Short catchy tagline for cards.",
    description: "Longer description for SEO and previews.",
    status: "in-development", // "released", "in-development", or "coming-soon"
    type: "Adventure", // "One-Shot", "Tool", etc.
    image: "/images/your-project/main-image.webp",
    imageAlt: "Description of image",
    tags: ["TAG1", "TAG2"],
    
    // Optional: Links
    platforms: {
        itch: "https://...",
        driveThru: "https://...",
        patreon: "https://...",
    },

    // Optional: Full Page Details
    fullDescription: `
    This is the main content of your page.
    You can use multiple lines here.
    
    It supports basic text formatting.
    `,
    
    features: [
        {
            title: "Feature 1",
            description: "Description of feature 1",
            icon: "🚀" // Emoji or icon
        },
        {
            title: "Feature 2",
            description: "Description of feature 2",
            icon: "💀"
        }
    ],
    
    gallery: [
        {
            src: "/images/your-project/screenshot1.webp",
            alt: "Screenshot 1"
        }
    ]
}
```

## 3. Verify
1. Run the development server: `npm run dev`
2. Go to `http://localhost:3000/projects/your-slug`
3. Check if all information displays correctly.

## 4. Commit
Commit your changes to `src/data/projects.ts` and your new images.
