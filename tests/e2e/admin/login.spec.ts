import { test, expect } from '@playwright/test'

test.describe('Admin Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login')
  })

  test('should display login form', async ({ page }) => {
    await expect(page.locator('input[name="username"], input[type="text"]')).toBeVisible()
    await expect(page.locator('input[name="password"], input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.locator('input[name="username"], input[type="text"]').fill('wronguser')
    await page.locator('input[name="password"], input[type="password"]').fill('wrongpassword')
    await page.locator('button[type="submit"]').click()

    // Should show error message
    await expect(page.locator('text=/invalid|error|incorrect/i')).toBeVisible({ timeout: 5000 })
  })

  test('should redirect unauthenticated users from admin pages', async ({ page }) => {
    await page.goto('/admin/leads')

    // Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('should require both username and password', async ({ page }) => {
    // Try with only username
    await page.locator('input[name="username"], input[type="text"]').fill('admin')
    await page.locator('button[type="submit"]').click()

    // Should not redirect (still on login page)
    await expect(page).toHaveURL(/\/admin\/login/)
  })
})
