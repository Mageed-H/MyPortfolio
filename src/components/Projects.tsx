import { FolderKanban } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

const ease = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-[100svh] border-b border-slate-900/10 py-20 dark:border-white/10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mb-3 flex items-center gap-2 text-accent">
            <FolderKanban className="h-4 w-4" aria-hidden />
            <p className="text-sm font-medium tracking-[0.24em] uppercase">Projects</p>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-4 text-muted">
            A couple of builds that show how I connect product UX with solid backend and
            data foundations.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
