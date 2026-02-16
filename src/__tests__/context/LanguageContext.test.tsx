import { render, screen, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import { useState, useEffect } from 'react'

// Test component that uses the context
function TestComponent() {
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div>Loading...</div>

  return (
    <div>
      <div data-testid="language">{language}</div>
      <div data-testid="home-title">{t.home.title}</div>
      <button onClick={() => setLanguage('tr')}>Set Turkish</button>
      <button onClick={() => setLanguage('en')}>Set English</button>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should default to English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('language')).toHaveTextContent('en')
    expect(screen.getByTestId('home-title')).toHaveTextContent('Skytex Georgia')
  })

  it('should switch to Turkish', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    const turkishButton = screen.getByText('Set Turkish')
    
    await act(async () => {
      turkishButton.click()
    })

    expect(screen.getByTestId('language')).toHaveTextContent('tr')
    expect(screen.getByTestId('home-title')).toHaveTextContent('Skytex Georgia')
  })

  it('should persist language to localStorage', async () => {
    const { getItem, setItem } = window.localStorage as any
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    const turkishButton = screen.getByText('Set Turkish')
    
    await act(async () => {
      turkishButton.click()
    })

    expect(setItem).toHaveBeenCalledWith('skytex-lang', 'tr')
  })

  it('should load language from localStorage on mount', () => {
    const { getItem } = window.localStorage as any
    getItem.mockReturnValue('tr')

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(getItem).toHaveBeenCalledWith('skytex-lang')
  })

  it('should provide translations for current language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('home-title')).toHaveTextContent('Skytex Georgia')
  })
})

describe('useLanguage hook', () => {
  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useLanguage must be used within a LanguageProvider')

    consoleError.mockRestore()
  })
})
