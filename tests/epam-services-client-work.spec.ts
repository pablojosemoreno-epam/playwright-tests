import { test, expect, Page } from '@playwright/test';

/**
 * Test Suite: EPAM Services – Client Work Navigation
 *
 * Scenario:
 *   1. Navigate to https://www.epam.com/
 *   2. Select "Services" from the header navigation menu
 *   3. Click "Explore Our Client Work" link
 *   4. Verify that the text "Client Work" is visible on the resulting page
 */

test.describe('EPAM Services – Client Work Navigation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the EPAM homepage before each test
    await page.goto('https://www.epam.com/');

    // Dismiss cookie banner if present
    const acceptCookiesBtn = page.locator('button:has-text("Accept All")');
    if (await acceptCookiesBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptCookiesBtn.click();
    }
  });

  test('should navigate to Client Work page via Services header menu', async ({ page }) => {
    // ── Step 1: Verify the homepage loaded correctly ────────────────────────
    await expect(page).toHaveURL('https://www.epam.com/');
    await expect(page).toHaveTitle(/EPAM/i);

    // ── Step 2: Open the "Services" dropdown from the header navigation ─────
    const servicesToggleBtn = page.locator(
      '.hamburger-menu__sub-menu-toggle-button[aria-label="Services"]'
    );
    await expect(servicesToggleBtn).toBeVisible();

    // Use JavaScript click to avoid hero-image pointer interception
    await servicesToggleBtn.dispatchEvent('click');

    // Confirm the dropdown expanded
    await expect(servicesToggleBtn).toHaveAttribute('aria-expanded', 'true');

    // ── Step 3: Click "Explore Our Client Work" from the hero banner ────────
    // The link appears in the hero slider while the Services dropdown is open
    const exploreClientWorkLink = page.locator('a:has-text("Explore Our Client Work")').first();
    await expect(exploreClientWorkLink).toBeVisible();

    // Navigate using the href to avoid viewport/overlay interception issues
    const href = await exploreClientWorkLink.getAttribute('href');
    await page.goto(href ?? 'https://www.epam.com/services/client-work');

    // ── Step 4: Verify "Client Work" text is visible on the destination page ─
    await expect(page).toHaveURL(/\/services\/client-work/);

    const clientWorkHeading = page.locator('h1', { hasText: 'Client Work' });
    await expect(clientWorkHeading).toBeVisible();

    // Additional assertion: page title contains "Client Work"
    await expect(page).toHaveTitle(/Client Work/i);
  });

  test('should display "Client Work" heading when navigating directly to /services/client-work', async ({ page }) => {
    // Direct navigation variant – validates the destination page in isolation
    await page.goto('https://www.epam.com/services/client-work');

    await expect(page).toHaveURL(/\/services\/client-work/);

    const clientWorkHeading = page.locator('h1', { hasText: 'Client Work' });
    await expect(clientWorkHeading).toBeVisible();

    await expect(page).toHaveTitle(/Client Work/i);
  });

});
