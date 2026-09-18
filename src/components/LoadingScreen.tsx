import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────
   Boot sequence lines shown one-by-one
   ───────────────────────────────────────────────────── */
const BOOT_LINES = [
  { text: 'Initializing Antigravity OS v2.4...',    delay: 0    },
  { text: 'Loading kernel modules...',              delay: 520  },
  { text: 'Mounting secure filesystem... OK',       delay: 1050 },
  { text: 'Establishing encrypted connection...',   delay: 1520 },
  { text: 'Compiling portfolio assets...',          delay: 2000 },
  { text: 'System check passed. All clear.',        delay: 2500 },
] as const

const BAR_STEPS = [10, 25, 45, 65, 82, 100] as const

/* Spinner frames */
const SPIN = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [linesDone, setLinesDone] = useState(0)
  const [progress,  setProgress ] = useState(0)
  const [spin,      setSpin     ] = useState(0)
  const [exiting,   setExiting  ] = useState(false)

  /* Reveal lines on their delays */
  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setLinesDone(i + 1)
        setProgress(BAR_STEPS[i])
      }, line.delay)
    )
    /* After last line, brief pause → exit */
    const done = setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, 700)
    }, 3200)
    return () => { timers.forEach(clearTimeout); clearTimeout(done) }
  }, [onDone])

  /* Spinner tick */
  useEffect(() => {
    const id = setInterval(() => setSpin(s => (s + 1) % SPIN.length), 80)
    return () => clearInterval(id)
  }, [])

  const bar = Math.round(progress / 10)
  const barFilled = '█'.repeat(bar)
  const barEmpty  = '░'.repeat(10 - bar)

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030608] overflow-hidden"
      animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(6,182,212,0.4) 2px,rgba(6,182,212,0.4) 3px)' }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)' }}
      />
      {/* Corner brackets */}
      {(['tl','tr','bl','br'] as const).map(c => (
        <div key={c} aria-hidden className={`pointer-events-none absolute ${
          c === 'tl' ? 'top-6 left-6  border-t-2 border-l-2 rounded-tl-sm' :
          c === 'tr' ? 'top-6 right-6 border-t-2 border-r-2 rounded-tr-sm' :
          c === 'bl' ? 'bottom-6 left-6  border-b-2 border-l-2 rounded-bl-sm' :
                       'bottom-6 right-6 border-b-2 border-r-2 rounded-br-sm'
        } h-8 w-8 border-cyan-500/40`} />
      ))}

      {/* Main terminal box */}
      <div className="relative z-10 w-full max-w-xl px-6">
        {/* Logo / title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500   shadow-[0_0_8px_#f43f5e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500  shadow-[0_0_8px_#f59e0b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-cyan-400/50 uppercase font-semibold">
            portfolio.exe
          </span>
        </div>

        {/* Boot lines */}
        <div className="space-y-1.5 font-mono text-sm">
          {BOOT_LINES.slice(0, linesDone).map((line, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1,  x: 0   }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <span className={`text-xs font-bold shrink-0 ${
                i === linesDone - 1
                  ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]'
                  : 'text-cyan-600/50'
              }`}>
                {i === linesDone - 1 ? SPIN[spin] : '✓'}
              </span>
              <span className={`${
                i === linesDone - 1
                  ? 'text-slate-200'
                  : 'text-slate-500'
              } transition-colors duration-500`}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 space-y-2">
          <div className="flex justify-between font-mono text-[11px] text-cyan-500/60">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
          <div className="font-mono text-sm text-cyan-400 tracking-wider
            drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
            [{barFilled}{barEmpty}]
          </div>
          {/* Thin progress line */}
          <div className="h-px w-full bg-white/5 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full
                shadow-[0_0_10px_rgba(6,182,212,0.6)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Bottom status */}
        <div className="mt-6 flex items-center justify-between font-mono text-[10px]
          text-cyan-600/40 tracking-[0.18em] uppercase">
          <span>Secure Connection</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500
              animate-pulse shadow-[0_0_6px_#10b981]" />
            AES-256 Encrypted
          </span>
        </div>
      </div>
    </motion.div>
  )
}
