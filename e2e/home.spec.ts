import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads the home page in English', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Fables Monster/i);
  });

  test('loads the home page in Russian', async ({ page }) => {
    await page.goto('/ru');
    await expect(page).toHaveTitle(/Fables Monster/i);
  });

  test('displays navigation', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('navigation', { name: /main/i })).toBeVisible();
  });

  test('displays project cards', async ({ page }) => {
    await page.goto('/en');
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    // Check that there are links to projects
    const projectLinks = page.locator('a[href*="/en/"]');
    await expect(projectLinks.first()).toBeVisible();
  });
});
