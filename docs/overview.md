# Project Overview

Fables Monster Studio website built with Next.js 15, TypeScript and Tailwind CSS.
The repository structure is organized as follows:

- **src/app** – Next.js app router pages with [lang] internationalization
- **src/components** – Reusable UI components
- **src/locales** – Translation files (en/ru) for each page
- **content/projects** – Markdown files for project pages
- **public/** – Static assets (images, music, logos)
- **public/content** – Editable JSON files for terminal text

## Key Pages

- **Lost Mark** (`/[lang]/lost-mark`) – Main product page with:
  - Interactive terminal and timer tools
  - Store buttons (Itch.io, DriveThruRPG, Roll20, Станция Ролевая)
  - Foundry VTT and Roll20 module sections (with Russian language support)
  - Atmospheric soundtrack player
  - Russian version includes all expansion content

- **Holiday Audit: KRAMP.EXE** (`/[lang]/holiday-audit-kramp`) – Christmas horror adventure:
  - Postcard-format one-shot for Mothership 1e
  - Interactive random tables (Violations, Announcements, Events, NPCs) with dice rolling
  - Festive synthwave soundtrack player with loop functionality
  - Sticky navigation for easy section access
  - Full Russian and English localization
  - Components in `src/components/kramp/`:
    - `KrampTerminalTables.tsx` – Interactive dice tables with dark terminal theme
    - `KrampAudioPlayer.tsx` – Audio player with loop modes
    - `KrampNavigation.tsx` – Fixed navigation that appears after hero section
    - `KrampSections.tsx` – Wrapper for soundtrack and tables sections

- **Projects** (`/[lang]/projects`) – Project listing from markdown files
- **404 Page** – Custom not-found page with radar scanner animation

## Internationalization

The site supports English (default) and Russian languages:
- Translations in `src/locales/[lang]/[page].json`
- Middleware handles language detection and redirects
- Use `getDictionary(lang, page)` to load translations

## Store Buttons

The `StoreButton` component supports:
- `itch` – Itch.io
- `drivethrurpg` – DriveThruRPG
- `patreon` – Patreon
- `roll20` – Roll20 Marketplace
- `boosty` – Boosty
- `vk` – VK

For Russian visitors, the main purchase option for Lost Mark is Станция Ролевая (rpgbook.ru).

