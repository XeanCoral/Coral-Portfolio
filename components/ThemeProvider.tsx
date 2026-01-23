'use client'

import { ReactNode, useEffect, useState } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)

    // Apply theme to document
    const htmlElement = document.documentElement
    htmlElement.classList.remove('light', 'dark')
    htmlElement.classList.add(initialTheme)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)

      // Apply new theme to document
      const htmlElement = document.documentElement
      htmlElement.classList.remove('light', 'dark')
      htmlElement.classList.add(newTheme)

      return newTheme
    })
  }

  // Store toggleTheme in window for Navigation to access
  useEffect(() => {
    ;(window as any).toggleTheme = toggleTheme
  }, [])

  return <>{children}</>
}

export const useTheme = () => {
  return {
    toggle: () => {
      if (typeof window !== 'undefined' && (window as any).toggleTheme) {
        ;(window as any).toggleTheme()
      }
    },
  }
}
