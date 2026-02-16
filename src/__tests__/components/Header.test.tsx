import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock useLanguage hook
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    setLanguage: jest.fn(),
    t: {
      nav: {
        home: 'Home',
        about: 'About Us',
        partners: 'Our Partners',
        portfolio: 'Portfolio',
        contact: 'Contact',
      },
    },
  }),
}))

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Header', () => {
  it('should render the logo', () => {
    render(<Header />)
    expect(screen.getByText(/skytex/i)).toBeInTheDocument()
    expect(screen.getByText(/georgia/i)).toBeInTheDocument()
  })

  it('should render all navigation links', () => {
    render(<Header />)
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /our partners/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('should render language switcher', () => {
    render(<Header />)
    
    const enButton = screen.getByText('EN')
    const trButton = screen.getByText('TR')
    
    expect(enButton).toBeInTheDocument()
    expect(trButton).toBeInTheDocument()
    expect(enButton.closest('button')).toBeInTheDocument()
    expect(trButton.closest('button')).toBeInTheDocument()
  })

  it('should render mobile menu button', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('should have correct hrefs for navigation links', () => {
    render(<Header />)
    
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /about us/i })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: /our partners/i })).toHaveAttribute('href', '/partners')
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '/portfolio')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact')
  })
})
