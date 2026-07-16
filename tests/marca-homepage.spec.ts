import { test, expect } from '@playwright/test';

test.describe('Marca homepage', () => {
  test('should load the homepage and display the main headline', async ({ page }) => {
    await page.goto('https://www.marca.com', { waitUntil: 'domcontentloaded' });

    const acceptCookiesButton = page.getByRole('button', { name: /aceptar/i });
    if (await acceptCookiesButton.isVisible().catch(() => false)) {
      await acceptCookiesButton.click();
    }

    await expect(page).toHaveURL(/marca\.com/);
    await expect(page.locator('body')).toContainText(/marca/i);
    await expect(page.getByRole('link', { name: /marca/i }).first()).toBeVisible();
  });
});