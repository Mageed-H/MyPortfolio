import { motion, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import MagneticButton from './MagneticButton'
import TextReveal from './TextReveal'

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
]

function TerminalWindow() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= TYPING_LINES.length) {
      const resetTimeout = setTimeout(() => {
        setLineIndex(0)
        setCharIndex(0)
      }, 4000)
      return () => clearTimeout(resetTimeout)
    }

    const currentText = TYPING_LINES[lineIndex].text
    if (charIndex < currentText.length) {
      const typingTimeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1)
      }, 45)
      return () => clearTimeout(typingTimeout)
    }

    const nextLineTimeout = setTimeout(() => {
      setLineIndex((prev) => prev + 1)
      setCharIndex(0)
    }, 700)
    return () => clearTimeout(nextLineTimeout)
  }, [lineIndex, charIndex])

  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-cyan-500/30 bg-black/40 p-5 font-mono text-sm backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.2)] select-none flex flex-col justify-between dark:border-cyan-500/30 dark:bg-black/40 dark:shadow-[0_0_40px_rgba(6,182,212,0.2)]">
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-2">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
          <span className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
          <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
        </div>
        <span className="text-[11px] tracking-wider font-bold uppercase text-cyan-600 dark:text-cyan-300">
          majeed@workstation:~
        </span>
        <div className="w-10" />
      </div>

      {/* Terminal Output */}
      <div className="flex-1 space-y-3 pt-2 text-slate-800 dark:text-slate-100">
        <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
          Antigravity OS v2.4 (x86_64-workstation)
        </div>

        {TYPING_LINES.slice(0, lineIndex).map((line, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-sm">
            <span className="font-extrabold text-cyan-500 dark:text-cyan-400">$</span>
            <span className={`font-bold ${line.color}`}>
              {line.text}
            </span>
          </div>
        ))}

        {lineIndex < TYPING_LINES.length && (
          <div className="flex items-center gap-2.5 text-sm">
            <span className="font-extrabold text-cyan-500 dark:text-cyan-400">$</span>
            <span className={`font-bold ${TYPING_LINES[lineIndex].color}`}>
              {TYPING_LINES[lineIndex].text.slice(0, charIndex)}
            </span>
            <span className="inline-block h-4 w-2.5 animate-pulse bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </div>
        )}

        {lineIndex >= TYPING_LINES.length && (
          <div className="flex items-center gap-2.5 pt-1 text-sm">
            <span className="font-extrabold text-emerald-500 dark:text-emerald-400">✓</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-300">
              All systems operational. Ready for action.
            </span>
            <span className="inline-block h-4 w-2.5 animate-pulse bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          </div>
        )}
      </div>

      {/* System Status Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-cyan-900/20 pt-2.5 text-[11px] font-bold text-cyan-600/80 dark:text-cyan-300/90">
        <span>STATUS: ACTIVE</span>
        <span>CPU: 12% | GPU: 28%</span>
        <span>LATENCY: 12ms</span>
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
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-28 lg:grid-cols-2 lg:gap-8">
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
            from Flutter clients to FastAPI services, data stores, and ML-backed
            features.
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
              className="inline-flex items-center justify-center rounded-md border border-white/50 bg-white/40 px-5 py-2.5 text-sm font-medium text-ink shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl transition dark:border-white/10 dark:bg-black/30 dark:shadow-[0_0_40px_rgba(6,182,212,0.12)]"
            >
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Glassmorphism Terminal */}
        <motion.div
          className="pointer-events-none hidden lg:flex lg:justify-end"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TerminalWindow />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#tech"
        data-cursor="interactive"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        Explore
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  )
}
