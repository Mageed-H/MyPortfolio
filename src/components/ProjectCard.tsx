import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import { glassCard, glassChip } from '../lib/glass'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{
        scale: 1.03,
        transition: { type: 'spring', stiffness: 320, damping: 22 },
      }}
      data-cursor="interactive"
      className={`group flex h-full flex-col rounded-2xl p-6 sm:p-7 ${glassCard}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {project.title}
        </h3>
        <span
          className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition group-hover:text-accent ${glassChip}`}
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted sm:text-base">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className={`rounded-md px-2.5 py-1 text-xs font-medium text-ink/90 ${glassChip}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}
