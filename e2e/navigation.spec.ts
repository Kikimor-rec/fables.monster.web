import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates to projects page', async ({ page }) => {
    await page.goto('/en');
    await page.click('a[href="/en/projects"]');
    await expect(page).toHaveURL(/\/en\/projects/);
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/en');
    await page.click('a[href="/en/about"]');
    await expect(page).toHaveURL(/\/en\/about/);
  });

  test('navigates to contact page', async ({ page }) => {
    await page.goto('/en');
    await page.click('a[href="/en/contact"]');
    await expect(page).toHaveURL(/\/en\/contact/);
  });

  test('skip to content link is accessible', async ({ page }) => {
    await page.goto('/en');
    const skipLink = page.getByText('Skip to content');
    await expect(skipLink).toBeAttached();
  });
});
