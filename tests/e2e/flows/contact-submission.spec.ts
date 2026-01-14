import { test, expect } from '@playwright/test'
import { testUser } from '../fixtures/test-data'

test.describe('Contact Form Submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('input[name="firstName"], input[placeholder*="First"]')).toBeVisible()
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible()
  })

  test('should submit form successfully with valid data', async ({ page }) => {
    // Fill the form
    await page.locator('input[name="firstName"], input[placeholder*="First"]').fill(testUser.firstName)
    await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill(testUser.lastName)
    await page.locator('input[name="email"], input[type="email"]').fill(testUser.email)
    await page.locator('input[name="company"], input[placeholder*="Company"]').fill(testUser.company)
    await page.locator('textarea[name="message"], textarea').fill(testUser.message)

    // Submit
    await page.locator('button[type="submit"]').click()

    // Wait for success indication
    await expect(page.locator('text=/thank|success|sent/i')).toBeVisible({ timeout: 10000 })
  })

  test('should show validation for required fields', async ({ page }) => {
    // Try to submit empty form
    await page.locator('button[type="submit"]').click()

    // Form should not navigate away (still on contact page)
    await expect(page).toHaveURL(/\/contact/)
  })

  test('should validate email format', async ({ page }) => {
    await page.locator('input[name="firstName"], input[placeholder*="First"]').fill(testUser.firstName)
    await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill(testUser.lastName)
    await page.locator('input[name="email"], input[type="email"]').fill('invalid-email')
    await page.locator('input[name="company"], input[placeholder*="Company"]').fill(testUser.company)
    await page.locator('textarea[name="message"], textarea').fill(testUser.message)

    await page.locator('button[type="submit"]').click()

    // Should show email validation error or not submit
    await expect(page).toHaveURL(/\/contact/)
  })

  test('should be accessible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Form should be visible and functional
    await expect(page.locator('form')).toBeVisible()

    // Input fields should be usable
    const firstNameInput = page.locator('input[name="firstName"], input[placeholder*="First"]')
    await expect(firstNameInput).toBeVisible()
    await firstNameInput.fill('Mobile Test')
  })
})
