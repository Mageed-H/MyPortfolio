import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import MagneticButton from './MagneticButton'

import { glassPanel } from '../lib/glass'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease, delay },
  }),
}

const TYPING_LINES = [
  { text: "const developer = 'Abd Al-Majeed';",            color: 'text-cyan-400 dark:text-cyan-300'     },
  { text: "const stack = ['Flutter', 'Python', 'FastAPI'];", color: 'text-blue-500 dark:text-sky-300'      },
  { text: 'await system.init();',                           color: 'text-emerald-500 dark:text-emerald-400'},
  { text: '// Building the future, one commit at a time.', color: 'text-slate-400 dark:text-slate-500'   },
] as const

const STATS = [
  { value: '3+', label: 'Years of Experience' },
  { value: '15+', label: 'Projects Shipped'   },
  { value: '5+', label: 'Technologies'        },
] as const

/* Floating decorative code fragments (behind the main card) */
const CODE_FRAGMENTS = [
  { text: '<Flutter />', top: '12%', left: '55%', delay: 0.5, rotate: -8 },
  { text: 'def predict():', top: '30%', left: '68%', delay: 0.9, rotate: 5 },
  { text: '@app.get("/")', top: '65%', left: '52%', delay: 1.3, rotate: -4 },
  { text: 'git commit -m', top: '78%', left: '70%', delay: 1.7, rotate: 6 },
] as const

/* ──────────────────────────────────────────────
   Glassmorphic Terminal
   ────────────────────────────────────────────── */
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
    <div className="relative w-full max-w-[520px]">
      {/* Outer glow halo */}
      <div className="
        absolute -inset-4 rounded-3xl pointer-events-none
        bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.22)_0%,transparent_68%)]
        blur-3xl
      " />

      {/* Animated gradient border via pseudo-border */}
      <div className="
        absolute -inset-[1px] rounded-2xl pointer-events-none
        bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-emerald-500/30
        dark:from-cyan-400/30 dark:via-sky-500/15 dark:to-emerald-400/25
      " />

      <div className="
        relative w-full h-[300px]
        rounded-2xl
        bg-black/60 dark:bg-[#030b14]/80
        shadow-[0_0_0_1px_rgba(6,182,212,0.06),0_0_80px_rgba(6,182,212,0.12),inset_0_1px_0_rgba(255,255,255,0.05)]
        backdrop-blur-3xl
        p-5 font-mono text-sm
        flex flex-col select-none overflow-hidden
      ">
        {/* CRT scanlines */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-[0.022]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(6,182,212,0.5) 2px,rgba(6,182,212,0.5) 3px)' }} />
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(rgba(6,182,212,0.6) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        {/* Corner brackets */}
        <div aria-hidden className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-sm" />
        <div aria-hidden className="pointer-events-none absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-sm" />
        <div aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-sm" />
        <div aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-cyan-500/30 rounded-br-sm" />

        {/* Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-cyan-500/12 pb-3 mb-3 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500   shadow-[0_0_10px_#f43f5e]" />
            <span className="h-3 w-3 rounded-full bg-amber-500  shadow-[0_0_10px_#f59e0b]" />
            <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
          </div>
          <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-cyan-500/45 dark:text-cyan-400/35">
            majeed@workstation ~ zsh
          </span>
          <div className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
            <span className="text-[9px] text-emerald-500/60 tracking-wider uppercase font-bold">Live</span>
          </div>
        </div>

        {/* Output */}
        <div className="relative z-20 flex-1 overflow-hidden space-y-2">
          <p className="text-[10px] font-medium text-cyan-600/55 dark:text-cyan-500/45 tracking-wider">
            ● Antigravity OS v2.4 · x86_64 · [secure shell]
          </p>

          {TYPING_LINES.slice(0, lineIndex).map((line, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[12px] leading-snug">
              <span className="mt-px text-cyan-500 dark:text-cyan-400 font-bold shrink-0
                drop-shadow-[0_0_6px_rgba(6,182,212,0.9)]">›</span>
              <span className={`font-semibold ${line.color}
                drop-shadow-[0_0_10px_currentColor]`}>{line.text}</span>
            </div>
          ))}

          {!done && lineIndex < TYPING_LINES.length && (
            <div className="flex items-start gap-2 text-[12px] leading-snug">
              <span className="mt-px text-cyan-500 dark:text-cyan-400 font-bold shrink-0
                drop-shadow-[0_0_6px_rgba(6,182,212,0.9)]">›</span>
              <span className={`font-semibold ${TYPING_LINES[lineIndex].color}`}>
                {TYPING_LINES[lineIndex].text.slice(0, charIndex)}
              </span>
              <span className="inline-block w-[5px] h-[13px] bg-cyan-400 dark:bg-cyan-300
                animate-pulse shadow-[0_0_12px_#22d3ee]" />
            </div>
          )}

          {done && (
            <div className="flex items-start gap-2 text-[12px] leading-snug">
              <span className="mt-px text-emerald-500 font-bold shrink-0
                drop-shadow-[0_0_6px_rgba(16,185,129,0.9)]">✓</span>
              <span className="font-semibold text-emerald-400
                drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]">
                System online. All services running.
              </span>
              <span className="inline-block w-[5px] h-[13px] bg-emerald-400
                animate-pulse shadow-[0_0_12px_#34d399]" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="
          relative z-20 flex-shrink-0 border-t border-cyan-900/15 dark:border-cyan-500/08
          pt-2.5 flex justify-between
          text-[9px] font-mono font-semibold
          text-cyan-600/35 dark:text-cyan-400/25
          tracking-[0.15em] uppercase
        ">
          <span>Status: Active</span>
          <span>CPU 12% · GPU 28%</span>
          <span>Latency 12ms</span>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Stat counter card
   ────────────────────────────────────────────── */
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0.5"
      variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay, ease }}
    >
      <span className="font-display text-2xl font-extrabold
        bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent
        drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]
        dark:from-cyan-300 dark:to-sky-400
        sm:text-3xl">
        {value}
      </span>
      <span className="text-[11px] text-muted tracking-wide text-center">{label}</span>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────── */
export default function Hero() {
  /* Tilt effect on the whole hero */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const tiltX = useSpring(rawX, { stiffness: 80, damping: 20 })
  const tiltY = useSpring(rawY, { stiffness: 80, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    rawX.set(((e.clientY - top) / height - 0.5) * 4)
    rawY.set(((e.clientX - left) / width - 0.5) * -4)
  }
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col border-b border-slate-900/10 dark:border-white/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Noise grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.018] dark:opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '180px 180px' }} />
      {/* Vignette */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.50) 100%)' }} />

      {/* Floating code fragments (desktop only) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden>
        {CODE_FRAGMENTS.map((f, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[11px] font-semibold
              text-cyan-600/20 dark:text-cyan-400/15
              select-none whitespace-nowrap"
            style={{ top: f.top, left: f.left, rotate: f.rotate }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ delay: f.delay, duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          >
            {f.text}
          </motion.div>
        ))}
      </div>

      {/* Diagonal grid lines accent */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.018] dark:opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-28 lg:grid-cols-2 lg:gap-14">

        {/* LEFT */}
        <div className="max-w-xl">
          <motion.p
            className="mb-5 flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-accent uppercase"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-accent/40 bg-accent/10">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_currentColor]" />
            </span>
            Software Engineer
          </motion.p>

          {/* Gradient heading */}
          <h1 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem]">
            <span className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900
              dark:from-white dark:via-slate-200 dark:to-cyan-200
              bg-clip-text text-transparent
              drop-shadow-[0_2px_24px_rgba(6,182,212,0.18)]
              dark:drop-shadow-[0_2px_28px_rgba(6,182,212,0.32)]">
              Cross-platform &amp; Backend Development
            </span>
          </h1>

          {/* Animated accent line */}
          <motion.div
            className="mt-4 h-[2px] w-28
              bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500
              dark:from-cyan-400 dark:via-sky-400 dark:to-emerald-400
              rounded-full shadow-[0_0_12px_rgba(6,182,212,0.5)]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          />

          <motion.p
            className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
          >
            I design and ship resilient products across mobile, desktop, and APIs —
            from Flutter clients to FastAPI services, data stores, and ML-backed features.
          </motion.p>

          {/* Skill badges */}
          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.52}
          >
            {['Flutter', 'Python', 'FastAPI', 'ML', 'REST'].map(badge => (
              <span key={badge} className="
                inline-flex items-center rounded-full px-3 py-0.5
                border border-accent/25 bg-accent/8
                text-[11px] font-bold tracking-widest text-accent uppercase
                dark:border-cyan-400/20 dark:bg-cyan-400/08 dark:text-cyan-300
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
              ">
                {badge}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.62}
          >
            <MagneticButton
              href="#projects"
              className="
                inline-flex items-center justify-center rounded-lg
                bg-gradient-to-r from-cyan-600 to-blue-600
                dark:from-cyan-500 dark:to-blue-500
                px-6 py-2.5 text-sm font-semibold text-white
                shadow-[0_0_32px_rgba(6,182,212,0.38),0_4px_12px_rgba(37,99,235,0.25)]
                hover:shadow-[0_0_48px_rgba(6,182,212,0.55),0_4px_20px_rgba(37,99,235,0.4)]
                transition-shadow duration-300
              "
            >
              View projects
            </MagneticButton>
            <MagneticButton
              href="#contact"
              strength={0.25}
              className={`inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium text-ink ${glassPanel} hover:border-cyan-400/40`}
            >
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-10 flex gap-8 border-t border-slate-900/08 dark:border-white/08 pt-6"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.75}
          >
            {STATS.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={0.78 + i * 0.12} />
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Terminal with tilt */}
        <motion.div
          className="pointer-events-none hidden lg:flex lg:justify-end"
          style={{ rotateX: tiltX, rotateY: tiltY, perspective: 1000 }}
          initial={{ opacity: 0, y: 44, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TerminalWindow />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#tech"
        data-cursor="interactive"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] tracking-[0.28em] text-muted/60 uppercase transition hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        Explore
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  )
}
