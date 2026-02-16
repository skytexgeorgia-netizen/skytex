import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/app/contact/ContactForm'

// Mock fetch
global.fetch = jest.fn()

// Mock useLanguage hook
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      contact: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message',
        send: 'Send',
        success: 'Message sent successfully!',
        error: 'An error occurred. Please try again.',
      },
    },
  }),
}))

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  it('should render all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('should show validation errors for required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)

    // HTML5 validation should prevent submission
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement

    expect(nameInput.validity.valid).toBe(false)
    expect(emailInput.validity.valid).toBe(false)
    expect(messageInput.validity.valid).toBe(false)
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '',
          subject: '',
          message: 'This is a test message',
        }),
      })
    })
  })

  it('should show success message on successful submission', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    })
  })

  it('should show error message on failed submission', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed' }),
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/error occurred/i)).toBeInTheDocument()
    })
  })

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ ok: true, json: async () => ({ success: true }) }), 100)
        )
    )

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('...')
  })

  it('should reset form after successful submission', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })
})
