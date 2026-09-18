import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Locale } from '../data/translations'

type LanguageContextValue = {
  locale: Locale
  isRTL: boolean
  t: typeof translations.en
  toggleLocale: () => void
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getPreferredLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('portfolio-locale')
  if (stored === 'en' || stored === 'ar') return stored
  return 'en'
}

function applyLocaleToDOM(locale: Locale) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  if (locale === 'ar') {
    document.documentElement.classList.add('font-arabic')
  } else {
    document.documentElement.classList.remove('font-arabic')
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initial = getPreferredLocale()
    applyLocaleToDOM(initial)
    return initial
  })

  useEffect(() => {
    applyLocaleToDOM(locale)
    localStorage.setItem('portfolio-locale', locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(
    () => setLocaleState((curr) => (curr === 'en' ? 'ar' : 'en')),
    []
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      isRTL: locale === 'ar',
      t: translations[locale] as typeof translations.en,
      toggleLocale,
      setLocale,
    }),
    [locale, toggleLocale, setLocale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
