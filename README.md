# Fables Monster Studio

Independent tabletop RPG content creation studio website built with Next.js, TypeScript, and Tailwind CSS.

## About

Fables Monster Studio is a team of enthusiasts dedicated to creating immersive tabletop RPG adventures and digital experiences. Our flagship project "The Lost Mark" is a Sci-Fi horror adventure for Mothership RPG.

## Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS 4.0
- **Mothership Aesthetic**: Dark theme inspired by Mothership RPG
- **Responsive Design**: Mobile-first approach with adaptive navigation
- **Performance Optimized**: WebP images, optimized fonts, and efficient loading
- **SEO Ready**: Proper metadata and OpenGraph tags

## Projects

- **The Lost Mark** - Sci-Fi horror adventure for Mothership RPG
- **Cemetery of Broken Ships** - Space exploration and survival
- **Hellish Bureaucracy** - Satirical bureaucratic horror

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Configure the following variables for sending email notifications from the
contact form:

```bash
SMTP_HOST=your.smtp.host
SMTP_PORT=587
SMTP_USER=your-user
SMTP_PASSWORD=your-password
SMTP_TO=recipient@example.com
```

Create a `.env.local` file in the project root during development and define the
variables above. The Next.js server will automatically load them when running
`npm run dev` or `npm start`.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Images**: Next.js Image optimization with WebP
- **Fonts**: Geist and Geist Mono
- **Deployment**: Vercel

## Documentation

Additional guides are available in the [docs](docs/) folder:
- [Project Overview](docs/overview.md)
- [Development Setup](docs/development.md)
- [Style Guide](docs/style-guide.md)
- [Updating Content](docs/updating-content.md)

## Team

- **Stepan Kulikov** - Creative Director & Lead Designer
- **Tatiana Bond** - Story Writer & Narrative Designer
- **Zlata Ignatova** - Artist & Visual Designer
- **Stanislav DariDai** - Game Designer & Developer
- **Allecks** - Technical Lead & Web Developer

## Deploy

The site is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Contact

- Website: [fables.monster](https://fables.monster)
- Email: contact@fables.monster
- Discord: Join our community server

---

© 2025 Fables Monster Studio. All rights reserved.
