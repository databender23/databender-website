import { Page } from '@playwright/test'
import { testAdmin } from './test-data'

export async function loginAsAdmin(page: Page) {
  await page.goto('/admin/login')
  await page.fill('input[name="username"]', testAdmin.username)
  await page.fill('input[name="password"]', testAdmin.password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/admin\//)
}

export async function logout(page: Page) {
  // Click logout button or navigate to logout
  await page.goto('/api/admin/logout')
}
