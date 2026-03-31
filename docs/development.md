# Development Setup

## Prerequisites

- **Node.js** v22+ (tested on v22.11.0)
- **npm** (comes with Node.js)

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Environment Variables

Create `.env.local` in the project root:

```bash
# Contact form (SMTP)
SMTP_HOST=your.smtp.host
SMTP_PORT=587
SMTP_USER=your-user
SMTP_PASSWORD=your-password
SMTP_TO=recipient@example.com

# Newsletter (Listmonk)
LISTMONK_API_URL=https://your-listmonk.example.com
LISTMONK_API_USER=admin
LISTMONK_API_PASSWORD=your-password
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build (runs image optimization + sitemap) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run analyze` | Bundle analyzer |
| `npm run optimize-images` | Optimize images in public/ |

## Testing

### Unit & Integration Tests

Tests use **Vitest** with **happy-dom** and **React Testing Library**:

```bash
npm test              # single run
npm run test:watch    # watch mode
npm run test:coverage # with coverage
```

Test files are co-located with source code in `__tests__/` directories:

```text
src/
├── __tests__/           # middleware tests
├── components/__tests__/ # component tests
├── data/__tests__/      # data module tests
├── hooks/__tests__/     # hook tests
└── lib/__tests__/       # utility tests
```

### E2E Tests

E2E tests use **Playwright** and require a running dev server:

```bash
npx playwright install  # first time only
npm run test:e2e        # headless
npm run test:e2e:ui     # with UI
```

E2E test files are in `e2e/`:

- `home.spec.ts` — homepage
- `navigation.spec.ts` — navigation
- `i18n.spec.ts` — language switching
- `contact.spec.ts` — contact form
- `404.spec.ts` — not found page

## Build & Deploy

```bash
npm run build   # builds Next.js + generates sitemap
npm start       # serves production build locally
```

The `prebuild` script automatically optimizes images. The `postbuild` script generates `sitemap.xml` via next-sitemap.

Deployment target: **Vercel**.
