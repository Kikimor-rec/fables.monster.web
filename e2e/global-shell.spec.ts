import { test, expect } from '@playwright/test';

const mojibakePattern = new RegExp(['\\u00d0', '\\u00d1', '\\u00c2', '\\u00c3', '\\u00e2\\u2020', '\\u00e2\\u20ac'].join('|'));

test.describe('Global shell', () => {
  test('desktop header and footer expose the focused site structure', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto('/en');

    await expect(page.locator('header a[href="/en/projects"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/vtt"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/about"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/contact"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/timer"]')).toHaveCount(0);

    await expect(page.locator('footer').getByText('FEATURED WORK')).toBeVisible();
    await expect(page.locator('footer').getByText('STUDIO / SERVICES')).toBeVisible();
    await expect(page.locator('footer').getByText('TOOLS / EXTRAS')).toBeVisible();
    await expect(page.locator('footer a[href="/en/timer"]').first()).toBeVisible();
  });

  test('mobile drawer presents primary links, case files, tools, and language switcher', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');

    await page.getByRole('button', { name: 'Open menu' }).click();
    const drawer = page.getByRole('dialog', { name: 'Main menu' });

    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'WORK' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'VTT SERVICES' })).toBeVisible();
    await expect(drawer.getByText('CASE FILES')).toBeVisible();
    await expect(drawer.getByText('TOOLS / EXTRAS')).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Chronometer' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'English' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Русский' })).toBeVisible();
  });

  test('russian navigation labels render without mojibake in the global shell', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ru');

    const header = page.locator('header');
    const footer = page.locator('footer');

    await expect(header.getByRole('link', { name: 'РАБОТЫ' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'VTT-СЕРВИСЫ' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'СТУДИЯ' })).toBeVisible();
    await expect(footer.getByText('ИЗБРАННЫЕ РАБОТЫ')).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Хронометр' })).toBeVisible();

    await expect(header).not.toContainText(mojibakePattern);
    await expect(footer).not.toContainText(mojibakePattern);
  });

  test('projects page has no mojibake in visible catalogue text', async ({ page }) => {
    await page.goto('/ru/projects');
    await expect(page.locator('main')).not.toContainText(mojibakePattern);
  });
});
