import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { soundManager } from '../lib/sound'

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage()

  const handleToggle = () => {
    soundManager.playClick()
    toggleLocale()
  }

  return (
    <button
      type="button"
      data-cursor="interactive"
      onClick={handleToggle}
      onMouseEnter={() => soundManager.playHover()}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'التحويل إلى الإنجليزية'}
      className="group relative flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
    >
      <Languages className="h-3.5 w-3.5 text-cyan-400/80 transition group-hover:text-cyan-300" />
      <span className="font-semibold tracking-wider text-muted group-hover:text-ink transition-colors">
        {locale === 'en' ? 'عربي' : 'EN'}
      </span>
    </button>
  )
}
