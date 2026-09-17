import { motion, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import MagneticButton from './MagneticButton'
import TextReveal from './TextReveal'
import { glassPanel } from '../lib/glass'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  }),
}

const TYPING_LINES = [
  { text: "const developer = 'Abd Al-Majeed';", color: 'text-cyan-400 dark:text-cyan-300' },
  { text: "const stack = ['Flutter', 'Python', 'FastAPI'];", color: 'text-blue-500 dark:text-sky-300' },
  { text: 'system.init();', color: 'text-emerald-500 dark:text-emerald-400' },
] as const

function TerminalWindow() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (done) {
      timerRef.current = setTimeout(() => {
        setLineIndex(0)
        setCharIndex(0)
        setDone(false)
      }, 3500)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }

    if (lineIndex >= TYPING_LINES.length) {
      setDone(true)
      return
    }

    const currentText = TYPING_LINES[lineIndex].text
    if (charIndex < currentText.length) {
      timerRef.current = setTimeout(() => setCharIndex(c => c + 1), 15)
    } else {
      timerRef.current = setTimeout(() => {
        setLineIndex(l => l + 1)
        setCharIndex(0)
      }, 100)
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [lineIndex, charIndex, done])

  return (
    <div
      className="
        w-full max-w-[520px] h-[280px]
        rounded-2xl border border-cyan-500/40
        bg-black/50 dark:bg-black/60
        p-5 font-mono text-sm
        shadow-[0_0_60px_rgba(6,182,212,0.18),inset_0_1px_0_rgba(255,255,255,0.06)]
        backdrop-blur-2xl select-none
        flex flex-col
      "
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.4) 2px, rgba(6,182,212,0.4) 3px)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e80]" />
          <span className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b80]" />
          <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b98180]" />
        </div>
        <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-cyan-600 dark:text-cyan-400/70">
          majeed@workstation ~ zsh
        </span>
        <div className="w-12" />
      </div>

      {/* Output area — fixed height to prevent layout shift */}
      <div className="flex-1 overflow-hidden space-y-2.5 text-slate-700 dark:text-slate-200">
        <p className="text-[11px] font-medium text-cyan-600/70 dark:text-cyan-500/60">
          Antigravity OS v2.4 (x86_64)
        </p>

        {/* Completed lines */}
        {TYPING_LINES.slice(0, lineIndex).map((line, idx) => (
          <div key={idx} className="flex items-center gap-2 text-[13px] leading-none">
            <span className="text-cyan-500 dark:text-cyan-400 font-bold shrink-0">›</span>
            <span className={`font-semibold ${line.color}`}>{line.text}</span>
          </div>
        ))}

        {/* Active typing line */}
        {!done && lineIndex < TYPING_LINES.length && (
          <div className="flex items-center gap-2 text-[13px] leading-none">
            <span className="text-cyan-500 dark:text-cyan-400 font-bold shrink-0">›</span>
            <span className={`font-semibold ${TYPING_LINES[lineIndex].color}`}>
              {TYPING_LINES[lineIndex].text.slice(0, charIndex)}
            </span>
            <span className="inline-block w-[7px] h-[14px] bg-cyan-400 dark:bg-cyan-300 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          </div>
        )}

        {/* Done state */}
        {done && (
          <div className="flex items-center gap-2 text-[13px] leading-none">
            <span className="text-emerald-500 font-bold shrink-0">✓</span>
            <span className="font-semibold text-emerald-500 dark:text-emerald-400">
              All systems operational.
            </span>
            <span className="inline-block w-[7px] h-[14px] bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-cyan-900/30 dark:border-cyan-500/10 pt-2.5 flex justify-between text-[10px] font-mono font-medium text-cyan-600/60 dark:text-cyan-400/40 tracking-widest">
        <span>STATUS: ACTIVE</span>
        <span>CPU 12%  GPU 28%</span>
        <span>12ms</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col border-b border-slate-900/10 dark:border-white/10"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-28 lg:grid-cols-2 lg:gap-12">

        {/* Left – Typography & CTA */}
        <div className="max-w-xl">
          <motion.p
            className="mb-4 text-sm font-medium tracking-[0.28em] text-accent uppercase"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
          >
            Software Engineer
          </motion.p>

          <h1 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <TextReveal text="Cross-platform & Backend Development" delay={0.12} mode="word" />
          </h1>

          <motion.p
            className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            I design and ship resilient products across mobile, desktop, and APIs —
            from Flutter clients to FastAPI services, data stores, and ML-backed features.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.58}
          >
            <MagneticButton
              href="#projects"
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.28)] transition hover:bg-accent-dim dark:text-slate-950 dark:shadow-[0_0_28px_rgba(6,182,212,0.28)]"
            >
              View projects
            </MagneticButton>
            <MagneticButton
              href="#contact"
              strength={0.25}
              className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-ink ${glassPanel}`}
            >
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right – Glassmorphic Terminal */}
        <motion.div
          className="pointer-events-none hidden lg:flex lg:justify-end"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TerminalWindow />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#tech"
        data-cursor="interactive"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Explore
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  )
}
