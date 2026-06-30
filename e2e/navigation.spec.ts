import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('exposes focused primary routes in the header', async ({ page }) => {
    await page.goto('/en');

    await expect(page.locator('header a[href="/en/projects"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/vtt"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/about"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/contact"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/en/timer"]')).toHaveCount(0);
  });

  test('navigates to projects page', async ({ page }) => {
    await page.goto('/en');
    await page.goto('/en/projects');
    await expect(page).toHaveURL(/\/en\/projects/);
  });

  test('navigates to VTT services page', async ({ page }) => {
    await page.goto('/en');
    await page.goto('/en/vtt');
    await expect(page).toHaveURL(/\/en\/vtt/);
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/en');
    await page.goto('/en/about');
    await expect(page).toHaveURL(/\/en\/about/);
  });

  test('navigates to contact page', async ({ page }) => {
    await page.goto('/en');
    await page.goto('/en/contact');
    await expect(page).toHaveURL(/\/en\/contact/);
  });

  test('timer remains reachable from footer tools', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('footer a[href="/en/timer"]').first()).toBeVisible();
  });

  test('skip to content link is accessible', async ({ page }) => {
    await page.goto('/en');
    const skipLink = page.getByText('Skip to content');
    await expect(skipLink).toBeAttached();
  });
});
