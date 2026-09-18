import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { glassCard, glassChip } from '../lib/glass'
import { soundManager } from '../lib/sound'
import SpotlightCard from './SpotlightCard'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <SpotlightCard
      whileHover={{
        scale: 1.025,
        transition: { type: 'spring', stiffness: 320, damping: 22 },
      }}
      data-cursor="interactive"
      onMouseEnter={() => soundManager.playHover()}
      onClick={() => soundManager.playClick()}
      className={`group h-full p-6 sm:p-7 ${glassCard}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl group-hover:text-cyan-300 transition-colors duration-200">
          {project.title}
        </h3>
        <span
          className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-300 group-hover:text-cyan-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] ${glassChip}`}
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted sm:text-base">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className={`rounded-md px-2.5 py-1 text-xs font-medium text-cyan-300/80 border border-cyan-500/20 bg-cyan-500/5 ${glassChip}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  )
}
