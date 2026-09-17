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
  { text: "const developer = 'Abd Al-Majeed';",       color: 'text-cyan-400 dark:text-cyan-300' },
  { text: "const stack = ['Flutter', 'Python', 'FastAPI'];", color: 'text-blue-500 dark:text-sky-300' },
  { text: 'system.init();',                           color: 'text-emerald-500 dark:text-emerald-400' },
] as const

/* ─────────────────────────────────────────────
   Glassmorphic Terminal — fixed height, no shift
   ───────────────────────────────────────────── */
function TerminalWindow() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone]           = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)

    if (done) {
      timer.current = setTimeout(() => { setLineIndex(0); setCharIndex(0); setDone(false) }, 3500)
      return () => { if (timer.current) clearTimeout(timer.current) }
    }

    if (lineIndex >= TYPING_LINES.length) { setDone(true); return }

    const text = TYPING_LINES[lineIndex].text
    if (charIndex < text.length) {
      timer.current = setTimeout(() => setCharIndex(c => c + 1), 15)
    } else {
      timer.current = setTimeout(() => { setLineIndex(l => l + 1); setCharIndex(0) }, 100)
    }
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [lineIndex, charIndex, done])

  return (
    /* Animated gradient border via conic-gradient trick */
    <div className="relative w-full max-w-[520px]">
      {/* Glow halo behind the card */}
      <div className="
        absolute -inset-3 rounded-3xl
        bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.18)_0%,transparent_70%)]
        blur-2xl pointer-events-none
      " />

      <div className="
        relative w-full h-[280px]
        rounded-2xl
        border border-cyan-500/30 dark:border-cyan-400/25
        bg-black/55 dark:bg-slate-950/70
        shadow-[0_0_0_1px_rgba(6,182,212,0.07),0_0_60px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]
        backdrop-blur-2xl
        p-5 font-mono text-sm
        flex flex-col
        select-none overflow-hidden
      ">
        {/* CRT scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-[0.025]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(6,182,212,0.5) 2px,rgba(6,182,212,0.5) 3px)' }}
        />

        {/* Dot-grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(rgba(6,182,212,0.7) 1px,transparent 1px)', backgroundSize: '20px 20px' }}
        />

        {/* Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-cyan-500/15 pb-3 mb-3 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500   shadow-[0_0_8px_#f43f5e90]" />
            <span className="h-3 w-3 rounded-full bg-amber-500  shadow-[0_0_8px_#f59e0b90]" />
            <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b98190]" />
          </div>
          <span className="text-[10px] tracking-[0.18em] font-semibold uppercase text-cyan-500/50 dark:text-cyan-400/40">
            majeed@workstation ~ zsh
          </span>
          <div className="w-12" />
        </div>

        {/* Output */}
        <div className="relative z-20 flex-1 overflow-hidden space-y-2 text-slate-600 dark:text-slate-300">
          <p className="text-[10px] font-medium text-cyan-600/60 dark:text-cyan-500/50 tracking-wider">
            Antigravity OS v2.4 · x86_64 · connected
          </p>

          {TYPING_LINES.slice(0, lineIndex).map((line, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[12.5px] leading-snug">
              <span className="mt-px text-cyan-500 dark:text-cyan-400 font-bold shrink-0 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">›</span>
              <span className={`font-semibold ${line.color} drop-shadow-[0_0_8px_currentColor]`}>{line.text}</span>
            </div>
          ))}

          {!done && lineIndex < TYPING_LINES.length && (
            <div className="flex items-start gap-2 text-[12.5px] leading-snug">
              <span className="mt-px text-cyan-500 dark:text-cyan-400 font-bold shrink-0 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">›</span>
              <span className={`font-semibold ${TYPING_LINES[lineIndex].color}`}>
                {TYPING_LINES[lineIndex].text.slice(0, charIndex)}
              </span>
              <span className="inline-block w-[6px] h-[13px] bg-cyan-400 dark:bg-cyan-300 animate-pulse shadow-[0_0_10px_#22d3ee]" />
            </div>
          )}

          {done && (
            <div className="flex items-start gap-2 text-[12.5px] leading-snug">
              <span className="mt-px text-emerald-500 font-bold shrink-0 drop-shadow-[0_0_6px_rgba(16,185,129,0.9)]">✓</span>
              <span className="font-semibold text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]">
                All systems operational. Ready.
              </span>
              <span className="inline-block w-[6px] h-[13px] bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="
          relative z-20 flex-shrink-0
          border-t border-cyan-900/20 dark:border-cyan-500/10
          pt-2.5 flex justify-between
          text-[9px] font-mono font-medium
          text-cyan-600/40 dark:text-cyan-400/30
          tracking-[0.15em] uppercase
        ">
          <span>Status: Active</span>
          <span>CPU 12% · GPU 28%</span>
          <span>Lat 12ms</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col border-b border-slate-900/10 dark:border-white/10"
    >
      {/* Subtle noise grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.018] dark:opacity-[0.028]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '180px 180px' }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-28 lg:grid-cols-2 lg:gap-12">

        {/* LEFT — Typography & CTA */}
        <div className="max-w-xl">
          <motion.p
            className="mb-4 flex items-center gap-2 text-sm font-medium tracking-[0.28em] text-accent uppercase"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
          >
            {/* Blinking dot */}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_currentColor]" />
            Software Engineer
          </motion.p>

          <h1 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <TextReveal text="Cross-platform & Backend Development" delay={0.12} mode="word" />
          </h1>

          {/* Thin cyan underline accent */}
          <motion.div
            className="mt-4 h-px w-24 bg-gradient-to-r from-accent via-cyan-400 to-transparent dark:from-cyan-400 dark:via-cyan-300"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          />

          <motion.p
            className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.48}
          >
            I design and ship resilient products across mobile, desktop, and APIs —
            from Flutter clients to FastAPI services, data stores, and ML-backed features.
          </motion.p>

          {/* Skill badges */}
          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.55}
          >
            {['Flutter', 'Python', 'FastAPI', 'ML'].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-[11px] font-semibold tracking-wider text-accent uppercase dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.62}
          >
            <MagneticButton
              href="#projects"
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.32)] transition hover:bg-accent-dim dark:text-slate-950 dark:shadow-[0_0_28px_rgba(6,182,212,0.32)]"
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

        {/* RIGHT — Terminal */}
        <motion.div
          className="pointer-events-none hidden lg:flex lg:justify-end"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.38, ease }}
        >
          <motion.div
            animate={{ y: [-7, 7, -7] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TerminalWindow />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#tech"
        data-cursor="interactive"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] tracking-[0.25em] text-muted/70 uppercase transition hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        Explore
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  )
}
