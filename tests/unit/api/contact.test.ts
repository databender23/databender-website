/**
 * Contact API Route Tests
 * Tests the POST /api/contact endpoint
 * @jest-environment node
 */

import { NextRequest } from 'next/server'

// Mock dependencies before importing the route
jest.mock('@/lib/leads/lead-service', () => ({
  createLead: jest.fn().mockResolvedValue({ leadId: 'test-lead-123' }),
  enrichLeadWithAnalytics: jest.fn().mockResolvedValue({}),
}))

jest.mock('@/lib/notifications/slack', () => ({
  sendLeadNotification: jest.fn().mockResolvedValue(true),
  sendSlackAlert: jest.fn().mockResolvedValue(true),
}))

// Mock rate limiting and turnstile to always allow in tests
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn().mockResolvedValue({ success: true, remaining: 10 }),
  getClientIp: jest.fn().mockReturnValue('127.0.0.1'),
}))

jest.mock('@/lib/turnstile', () => ({
  verifyTurnstile: jest.fn().mockResolvedValue({ success: true, skipped: true }),
  getTurnstileToken: jest.fn().mockReturnValue(undefined),
}))

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const createRequest = (body: object) => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  const validContactData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Test Company',
    message: 'Hello, I would like to learn more about your services.',
  }

  describe('Successful submissions', () => {
    it('should return 200 for valid contact form submission', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const request = createRequest(validContactData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should accept optional phone number', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const request = createRequest({
        ...validContactData,
        phone: '555-123-4567',
      })
      const response = await POST(request)

      expect(response.status).toBe(200)
    })

    it('should accept visitor tracking data', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const request = createRequest({
        ...validContactData,
        visitorId: 'visitor-123',
        sessionId: 'session-456',
        sourcePage: '/contact',
      })
      const response = await POST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Validation errors', () => {
    it('should return 400 for missing firstName', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const { firstName, ...dataWithoutFirstName } = validContactData
      const request = createRequest(dataWithoutFirstName)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should return 400 for missing email', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const { email, ...dataWithoutEmail } = validContactData
      const request = createRequest(dataWithoutEmail)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should return 400 for invalid email format', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const request = createRequest({
        ...validContactData,
        email: 'not-a-valid-email',
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should return 400 for missing company', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const { company, ...dataWithoutCompany } = validContactData
      const request = createRequest(dataWithoutCompany)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should return 400 for missing message', async () => {
      const { POST } = await import('@/app/api/contact/route')
      const { message, ...dataWithoutMessage } = validContactData
      const request = createRequest(dataWithoutMessage)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })
})
