# Style Guidelines

## General

- Use **TypeScript** for all React components (strict mode enabled).
- Prefer functional components and hooks.
- Keep components small and focused; put shared UI in `src/components`.
- Write clear comments explaining complex logic.

## Styling

- Use **Tailwind CSS** utility classes for all styling.
- Avoid inline `style` attributes — use Tailwind classes instead (e.g. `className="aspect-video"` not `style={{ paddingBottom: '56.25%' }}`).
- Design system tokens are in `src/app/design-system.css`.
- Global styles are in `src/app/globals.css`.

## Accessibility

- Use semantic HTML elements (`nav`, `main`, `section`, `button`, etc.).
- All interactive elements must have accessible labels (`aria-label`, visible text, or `aria-labelledby`).
- Use `role="list"` / `role="listitem"` for navigation menus (not `menubar`/`menuitem` — those are for desktop application menus).
- Decorative icons should have `aria-hidden="true"`.
- Form inputs require associated `<label>` elements or `aria-label`.

## Testing

- Test files go in `__tests__/` directories next to the code they test.
- Name test files `*.test.ts` or `*.test.tsx`.
- Use `describe`/`it` blocks with clear test descriptions.
- Mock external dependencies (`vi.mock`) at the top of test files.
- For components that use `new` constructors in mocks, use regular functions (not arrow functions).
- Prefer `getByRole`, `getByLabelText`, `getByPlaceholderText` over `getByTestId` in component tests.

## Internationalization

- All user-facing strings must be in translation files (`src/locales/[lang]/[page].json`).
- Components receive translations via `dict` props.
- Provide sensible fallback defaults when `dict` is not passed.
