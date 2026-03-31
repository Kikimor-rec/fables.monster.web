import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('displays contact form', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('form')).toBeVisible();
  });

  test('form has required fields', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('submit button is present', async ({ page }) => {
    await page.goto('/en/contact');
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });
});
