import { test, expect } from '@playwright/test';

test.describe('404 Page', () => {
  test('shows 404 page for invalid routes', async ({ page }) => {
    await page.goto('/en/this-page-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  });

  test('displays 404 content', async ({ page }) => {
    await page.goto('/en/nonexistent-page');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  });
});
