import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'

export type Theme = 'dark'

type ThemeContextValue = {
  theme: Theme
  isDark: true
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/* Always dark — apply class immediately */
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark')
  document.documentElement.style.colorScheme = 'dark'
  localStorage.setItem('portfolio-theme', 'dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useMemo<ThemeContextValue>(
    () => ({ theme: 'dark', isDark: true }),
    []
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
