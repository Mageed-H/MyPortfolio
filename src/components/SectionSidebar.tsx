import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'home',     label: 'Hero',     num: '01' },
  { id: 'tech',     label: 'Tech',     num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'contact',  label: 'Contact',  num: '04' },
] as const

/**
 * Fixed vertical sidebar (xl+ only) showing the active section.
 * Uses a scroll listener + getBoundingClientRect for robust detection
 * that works even with sticky/tall sections like the horizontal scroll reel.
 */
export default function SectionSidebar() {
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const detect = () => {
      if (window.innerWidth < 1280) return
      const vh = window.innerHeight
      let best: string = SECTIONS[0].id
      let bestScore = -Infinity

      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()

        /* How much of the element is visible in the viewport */
        const visibleTop    = Math.max(rect.top, 0)
        const visibleBottom = Math.min(rect.bottom, vh)
        const visible       = Math.max(0, visibleBottom - visibleTop)

        /* Score: visible area minus distance of rect.top from viewport center */
        const distFromCenter = Math.abs(rect.top + rect.height / 2 - vh / 2)
        const score          = visible - distFromCenter * 0.1

        if (score > bestScore) { bestScore = score; best = id }
      })

      setActive(best)
    }

    detect()
    window.addEventListener('scroll', detect, { passive: true })
    window.addEventListener('resize', detect, { passive: true })
    return () => {
      window.removeEventListener('scroll', detect)
      window.removeEventListener('resize', detect)
    }
  }, [])

  const current = SECTIONS.find(s => s.id === active)!

  return (
    <div className="pointer-events-none fixed left-5 top-1/2 z-20 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-start xl:gap-4">

      {/* Vertical guide line */}
      <div className="absolute left-[4px] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

      {SECTIONS.map(({ id, label, num }) => {
        const isActive = id === active
        return (
          <a
            key={id}
            href={`#${id}`}
            data-cursor="interactive"
            className="pointer-events-auto relative flex items-center gap-3 group"
            aria-label={`Go to ${label} section`}
          >
            {/* Indicator dot */}
            <motion.span
              className="relative z-10 block rounded-full border"
              animate={{
                width:           isActive ? 10 : 6,
                height:          isActive ? 10 : 6,
                borderColor:     isActive ? 'rgb(6,182,212)' : 'rgba(100,116,139,0.35)',
                backgroundColor: isActive ? 'rgb(6,182,212)' : 'transparent',
                boxShadow:       isActive ? '0 0 10px rgba(6,182,212,0.7)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            />

            {/* Label */}
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.span
                  key="active"
                  className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-400"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <span className="text-cyan-600/45">{num}</span>
                  {label}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  className="font-mono text-[9px] tracking-[0.2em] uppercase
                    text-slate-500/0 group-hover:text-slate-400/55 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {num}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        )
      })}

      {/* Rotated section name */}
      <div className="pointer-events-none absolute -right-5 top-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            className="font-mono text-[9px] font-semibold tracking-[0.35em] uppercase
              text-cyan-500/18 dark:text-cyan-400/15"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            [ {current.num} — {current.label.toUpperCase()} ]
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
