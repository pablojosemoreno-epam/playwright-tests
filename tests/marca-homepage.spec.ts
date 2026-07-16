import { test, expect } from '@playwright/test';

test.describe('Marca homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/marca\.com/);
    await expect(page).toHaveTitle(/MARCA|Marca/i);

    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toBeVisible();
  });
});
