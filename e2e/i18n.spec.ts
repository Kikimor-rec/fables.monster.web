import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  test('redirects root to localized path', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/(en|ru)/);
  });

  test('language switch links are present on EN page', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('header a[hreflang="ru"]').first()).toHaveAttribute('href', '/ru');
  });

  test('language switch links are present on RU page', async ({ page }) => {
    await page.goto('/ru');
    await expect(page.locator('header a[hreflang="en"]').first()).toHaveAttribute('href', '/en');
  });

  test('localized routes are available for matching paths', async ({ page }) => {
    await page.goto('/en/projects');
    await expect(page).toHaveURL(/\/en\/projects/);
    await page.goto('/ru/projects');
    await expect(page).toHaveURL(/\/ru\/projects/);
  });
});
