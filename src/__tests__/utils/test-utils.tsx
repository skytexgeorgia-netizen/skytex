import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <LanguageProvider>{children}</LanguageProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
