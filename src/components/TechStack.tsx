import {
  BrainCircuit,
  Code2,
  Database,
  LayoutGrid,
  Server,
  Smartphone,
  Table2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { techStack } from '../data/tech'
import { glassCard, glassChip } from '../lib/glass'
import { soundManager } from '../lib/sound'
import SpotlightCard from './SpotlightCard'

const iconMap: Record<string, LucideIcon> = {
  Flutter: Smartphone,
  Dart: Code2,
  Python: Code2,
  FastAPI: Server,
  PostgreSQL: Database,
  SQLite: Table2,
  'Machine Learning': BrainCircuit,
}

const ease = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
}

export default function TechStack() {
  return (
    <section
      id="tech"
      className="relative min-h-[100svh] border-b border-slate-900/10 py-20 dark:border-white/10 sm:py-28 overflow-hidden"
    >
      {/* Ambient Ghost Watermark Typography */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 right-6 lg:right-20 -z-10 select-none font-display text-[12rem] sm:text-[18rem] lg:text-[24rem] font-black leading-none text-white/[0.015] tracking-tighter"
      >
        02
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mb-3 flex items-center gap-2 text-accent">
            <LayoutGrid className="h-4 w-4" aria-hidden />
            <p className="text-sm font-medium tracking-[0.24em] uppercase">Tech stack</p>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Tools I use to ship end-to-end
          </h2>
          <p className="mt-4 text-muted">
            A focused set of technologies spanning clients, APIs, persistence, and
            applied machine learning.
          </p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {techStack.map((tech) => {
            const Icon = iconMap[tech.name] ?? Code2
            return (
              <motion.li key={tech.name} variants={item}>
                <SpotlightCard
                  whileHover={{
                    scale: 1.04,
                    transition: { type: 'spring', stiffness: 360, damping: 22 },
                  }}
                  data-cursor="interactive"
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                  className={`group p-4 ${glassCard}`}
                >
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-accent transition-all duration-300 group-hover:text-cyan-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] ${glassChip}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink group-hover:text-cyan-300 transition-colors duration-200">
                    {tech.name}
                  </h3>
                  <p className="mt-1 text-xs tracking-wide text-muted uppercase">
                    {tech.category}
                  </p>
                </SpotlightCard>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
