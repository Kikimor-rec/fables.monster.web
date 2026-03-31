import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  test('redirects root to localized path', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/(en|ru)/);
  });

  test('switches language from EN to RU', async ({ page }) => {
    await page.goto('/en');
    // Find and click Russian language link
    const ruLink = page.locator('a[hreflang="ru"]').first();
    await ruLink.click();
    await expect(page).toHaveURL(/\/ru/);
  });

  test('switches language from RU to EN', async ({ page }) => {
    await page.goto('/ru');
    const enLink = page.locator('a[hreflang="en"]').first();
    await enLink.click();
    await expect(page).toHaveURL(/\/en/);
  });

  test('preserves path when switching language', async ({ page }) => {
    await page.goto('/en/projects');
    const ruLink = page.locator('a[hreflang="ru"]').first();
    await ruLink.click();
    await expect(page).toHaveURL(/\/ru\/projects/);
  });
});
