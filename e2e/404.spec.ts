import { test, expect } from '@playwright/test';

test.describe('404 Page', () => {
  test('shows 404 page for invalid routes', async ({ page }) => {
    const response = await page.goto('/en/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
  });

  test('displays 404 content', async ({ page }) => {
    await page.goto('/en/nonexistent-page');
    await expect(page.getByText('404')).toBeVisible();
  });
});
