# Testing Guide

## Stack

- **Vitest 4** — test runner (with `happy-dom` environment)
- **React Testing Library** — component testing
- **@testing-library/user-event** — user interaction simulation
- **Playwright** — E2E browser testing

## Configuration

- `vitest.config.mts` — Vitest configuration (happy-dom, path aliases, coverage)
- `vitest.setup.mts` — test setup (jest-dom matchers)
- `playwright.config.ts` — Playwright configuration (Chromium + Firefox)

## Running Tests

```bash
npm test              # run all unit tests once
npm run test:watch    # watch mode
npm run test:coverage # with v8 coverage report
npm run test:e2e      # run E2E tests (requires dev server)
npm run test:e2e:ui   # E2E tests with interactive UI
```

On Windows, restricted shells can block the esbuild worker used by Vitest and report `spawn EPERM`. If that happens, run the same command from a normal PowerShell session in the repository root; this is an environment issue, not necessarily a test failure.

## Test Structure

```text
src/
├── __tests__/middleware.test.ts
├── components/__tests__/
│   ├── ContactForm.test.tsx
│   ├── ErrorBoundary.test.tsx
│   └── Navigation.test.tsx
├── data/__tests__/
│   ├── projects.test.ts
│   └── team.test.ts
├── hooks/__tests__/
│   ├── useContent.test.ts
│   └── useTimer.test.ts
└── lib/__tests__/
    ├── constants.test.ts
    ├── content.test.ts
    ├── i18n-settings.test.ts
    ├── logger.test.ts
    └── metadata.test.ts

e2e/
├── home.spec.ts
├── navigation.spec.ts
├── i18n.spec.ts
├── contact.spec.ts
└── 404.spec.ts
```

## Writing Tests

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myModule';

describe('myFunction', () => {
  it('does something expected', () => {
    expect(myFunction('input')).toBe('output');
  });
});
```

### Component Tests

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '../MyComponent';

it('renders and handles interaction', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);

  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /submit/i }));
});
```

### Mocking

- Use `vi.mock('module')` for module-level mocks (hoisted to top)
- Use `vi.doMock('module')` with dynamic `import()` for per-test mocks
- For CJS modules used with `new` (like `Negotiator`), use regular `function` declarations — arrow functions cannot be constructors

### Known Issues

- **happy-dom** is used instead of jsdom due to ESM compatibility issues with `@csstools/css-calc` in Vitest 4 + Node 22
- Config uses `.mts` extension for ESM compatibility
- `src/lib/i18n.ts` imports `server-only` and cannot be directly tested — mock it or test via integration tests
- On Windows, Vitest may log `EPERM` warnings when terminating worker pools — these are harmless
