import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Cpu, CheckCircle2, Layers } from 'lucide-react'
import type { Project } from '../data/projects'
import { glassCard, glassChip } from '../lib/glass'
import { soundManager } from '../lib/sound'

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!project) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick()
        onClose()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            soundManager.playClick()
            onClose()
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className={`relative z-10 my-auto w-full max-w-2xl overflow-hidden rounded-3xl p-6 sm:p-8 ${glassCard} border border-cyan-500/25 shadow-[0_0_80px_rgba(6,182,212,0.18)]`}
          role="dialog"
          aria-modal="true"
        >
          {/* Ambient inner corner brackets */}
          <div className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-cyan-500/40" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-cyan-400">
                <Cpu className="h-4 w-4" />
                <span className="font-mono text-xs font-semibold tracking-[0.24em] uppercase">
                  Architecture Deep-Dive
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {project.title}
              </h3>
            </div>

            <button
              type="button"
              data-cursor="interactive"
              onClick={() => {
                soundManager.playClick()
                onClose()
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-ink"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="mt-6 space-y-6 text-sm">
            {/* Description */}
            <p className="leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>

            {/* Architecture Pipeline Flow */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400/90 uppercase tracking-wider">
                <Layers className="h-3.5 w-3.5" />
                <span>System Architecture Flow</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {project.architecture.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-cyan-500/15 bg-cyan-500/5 px-3.5 py-2 text-cyan-200/90"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-400">
                      0{idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Highlights */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400/90 uppercase tracking-wider">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Engineering Highlights</span>
              </div>
              <ul className="space-y-2 text-xs text-muted">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <p className="mb-2 font-mono text-xs text-muted uppercase tracking-wider">
                Technology Stack:
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono font-medium text-cyan-300 border border-cyan-500/25 bg-cyan-500/10 ${glassChip}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              STATUS: PRODUCTION_READY
            </span>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="interactive"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono font-semibold text-ink transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Source Code
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}

              <button
                type="button"
                data-cursor="interactive"
                onClick={() => {
                  soundManager.playClick()
                  onClose()
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-mono font-semibold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] transition hover:bg-cyan-400"
              >
                Close View [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
