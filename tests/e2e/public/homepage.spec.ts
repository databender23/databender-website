import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Databender/)
  })

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    // Check services link
    const servicesLink = page.locator('a[href="/services"]').first()
    await expect(servicesLink).toBeVisible()

    // Check contact link
    const contactLink = page.locator('a[href="/contact"]').first()
    await expect(contactLink).toBeVisible()
  })

  test('should display CTA buttons', async ({ page }) => {
    const ctaButtons = page.locator('a:has-text("Schedule"), a:has-text("Assessment")')
    await expect(ctaButtons.first()).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Page should still be functional
    await expect(page.locator('body')).toBeVisible()

    // No horizontal scroll
    const body = page.locator('body')
    const bodyBox = await body.boundingBox()
    expect(bodyBox?.width).toBeLessThanOrEqual(375)
  })
})
