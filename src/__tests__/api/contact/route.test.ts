/**
 * @jest-environment @edge-runtime/jest-environment
 */
import { POST } from '@/app/api/contact/route'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}))

describe('/api/contact', () => {
  const mockSendMail = jest.fn()
  const mockCreateTransport = nodemailer.createTransport as jest.MockedFunction<typeof nodemailer.createTransport>

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.SMTP_HOST = 'smtp.gmail.com'
    process.env.SMTP_PORT = '587'
    process.env.SMTP_USER = 'test@example.com'
    process.env.SMTP_PASS = 'test-password'
    process.env.SMTP_FROM = 'test@example.com'

    mockCreateTransport.mockReturnValue({
      sendMail: mockSendMail,
    } as any)
  })

  it('should send email with valid data', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-id' })

    const body = JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      subject: 'Test Subject',
      message: 'Test message',
    })

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockSendMail).toHaveBeenCalledTimes(1)
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'info@skytexgeorgia.com',
        replyTo: 'john@example.com',
        subject: expect.stringContaining('Test Subject'),
      })
    )
  })

  it('should return 400 if name is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john@example.com',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('should return 400 if email is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('should return 400 if message is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('should handle optional fields', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-id' })

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining('-'),
      })
    )
  })

  it('should return 500 if email sending fails', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP Error'))

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toContain('Failed to send message')
  })

  it('should use default SMTP settings if env vars are missing', async () => {
    delete process.env.SMTP_HOST
    delete process.env.SMTP_PORT
    delete process.env.SMTP_FROM

    mockSendMail.mockResolvedValueOnce({ messageId: 'test-id' })

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'smtp.gmail.com',
        port: 587,
      })
    )
  })

  it('should include all form data in email', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-id' })

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        subject: 'Inquiry',
        message: 'Hello, I have a question.',
      }),
    })

    await POST(request)

    const emailCall = mockSendMail.mock.calls[0][0]
    expect(emailCall.html).toContain('John Doe')
    expect(emailCall.html).toContain('john@example.com')
    expect(emailCall.html).toContain('+1234567890')
    expect(emailCall.html).toContain('Inquiry')
    expect(emailCall.html).toContain('Hello, I have a question.')
    expect(emailCall.text).toContain('John Doe')
    expect(emailCall.text).toContain('john@example.com')
  })
})
