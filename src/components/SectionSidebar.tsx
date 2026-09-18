import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'home',     label: 'Hero',     num: '01' },
  { id: 'tech',     label: 'Tech',     num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'contact',  label: 'Contact',  num: '04' },
] as const

/**
 * Fixed vertical sidebar (desktop only) that shows the active section
 * label using IntersectionObserver — zero layout impact, pure CSS position.
 */
export default function SectionSidebar() {
  const [active, setActive] = useState<string>('home')
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    /* Clean up on unmount */
    return () => observersRef.current.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    observersRef.current.forEach(o => o.disconnect())
    observersRef.current = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observersRef.current.push(obs)
    })
  }, [])

  const current = SECTIONS.find(s => s.id === active)!

  return (
    /* Hidden below lg breakpoint */
    <div className="pointer-events-none fixed left-5 top-1/2 z-20 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-start xl:gap-5">

      {/* Vertical line */}
      <div className="absolute left-2.5 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/25 to-transparent" />

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
            {/* Dot */}
            <motion.span
              className="relative z-10 block rounded-full border"
              animate={{
                width:       isActive ? 10 : 6,
                height:      isActive ? 10 : 6,
                borderColor: isActive ? 'rgb(6,182,212)' : 'rgba(100,116,139,0.4)',
                backgroundColor: isActive ? 'rgb(6,182,212)' : 'transparent',
                boxShadow: isActive ? '0 0 10px rgba(6,182,212,0.7)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            />

            {/* Label — only show for active, fade others on hover */}
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.span
                  key="active"
                  className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-400 dark:text-cyan-300"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-cyan-600/50 dark:text-cyan-500/40">{num}</span>
                  {label}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  className="font-mono text-[9px] tracking-[0.2em] uppercase text-slate-500/0 group-hover:text-slate-400/60 transition-colors duration-200"
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

      {/* Active section large vertical text */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 -translate-x-full rotate-180 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            className="font-mono text-[9px] font-semibold tracking-[0.35em] uppercase text-cyan-500/20 dark:text-cyan-400/15"
            style={{ writingMode: 'vertical-rl' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{ opacity: 0, y: -10  }}
            transition={{ duration: 0.35 }}
          >
            [ {current.num} — {current.label.toUpperCase()} ]
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
