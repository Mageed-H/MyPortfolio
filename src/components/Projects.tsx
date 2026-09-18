import { useEffect, useRef, useState } from 'react'
import { FolderKanban, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const ease = [0.22, 1, 0.36, 1] as const

export default function Projects() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  /* Pin the section and drive horizontal scroll with vertical scroll (desktop) */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const cardWidth = 480
  const totalSlide = -(projects.length - 1) * cardWidth
  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, totalSlide])
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Helper to get localized project data
  const getLocalizedProject = (p: Project): Project => {
    const localized = t.projects.items[p.id as keyof typeof t.projects.items]
    if (!localized) return p
    return {
      ...p,
      title: localized.title,
      description: localized.description,
      architecture: [...localized.architecture],
      highlights: [...localized.highlights],
    }
  }

  /* On mobile: standard vertical layout for buttery-smooth native 60fps scrolling */
  if (isMobile) {
    return (
      <section id="projects" className="relative border-b border-white/10 px-6 py-20 overflow-hidden">
        {/* Ambient Ghost Watermark Typography */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 right-2 -z-10 select-none font-display text-[11rem] font-black leading-none text-white/[0.018] tracking-tighter"
        >
          03
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-accent">
              <FolderKanban className="h-4 w-4" aria-hidden />
              <p className="text-sm font-medium tracking-[0.24em] uppercase">{t.projects.badge}</p>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
              {t.projects.heading}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {t.projects.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {projects.map((rawProject, i) => {
              const project = getLocalizedProject(rawProject)
              return (
                <div key={project.id} className="w-full">
                  <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.3em] text-cyan-500/50 uppercase">
                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </p>
                  <ProjectCard project={project} onSelect={() => setActiveProject(project)} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Deep-Dive Modal */}
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      </section>
    )
  }

  /* On desktop: cinematic horizontal scroll reel */
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative border-b border-white/10 overflow-hidden"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
        {/* Ambient Ghost Watermark Typography */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-12 -translate-y-1/2 -z-10 select-none font-display text-[22rem] lg:text-[28rem] font-black leading-none text-white/[0.018] tracking-tighter"
        >
          03
        </div>

        {/* Header */}
        <motion.div
          className="mx-auto mb-10 w-full max-w-6xl px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mb-3 flex items-center gap-2 text-accent">
            <FolderKanban className="h-4 w-4" aria-hidden />
            <p className="text-sm font-medium tracking-[0.24em] uppercase">{t.projects.badge}</p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {t.projects.heading}
              </h2>
              <p className="mt-2 text-muted">
                {t.projects.subtitle}
              </p>
            </div>
            <div className="hidden items-center gap-2 text-muted/50 md:flex">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase">{t.projects.scrollHint}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-5 h-px w-full bg-white/8 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              style={{ width: barWidth }}
            />
          </div>
        </motion.div>

        {/* Horizontal sliding track */}
        <div ref={trackRef} className="relative mx-auto w-full max-w-6xl px-6">
          <motion.div
            className="flex gap-6"
            style={{ x }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
          >
            {projects.map((rawProject, i) => {
              const project = getLocalizedProject(rawProject)
              return (
                <motion.div
                  key={project.id}
                  className="w-[min(80vw,460px)] flex-shrink-0"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease }}
                >
                  <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.3em] text-cyan-500/50 uppercase">
                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </p>
                  <ProjectCard project={project} onSelect={() => setActiveProject(project)} />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
