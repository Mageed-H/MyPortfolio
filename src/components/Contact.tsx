import { Code2, Mail, Network } from 'lucide-react'
import { glassChip } from '../lib/glass'

const links = [
  { href: 'mailto:hello@example.com', label: 'Email', icon: Mail },
  { href: 'https://github.com', label: 'GitHub', icon: Code2 },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Network },
]

export default function Contact() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative min-h-[80svh] py-16 sm:py-24 overflow-hidden">
      {/* Ambient Ghost Watermark Typography */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 right-6 lg:right-20 -z-10 select-none font-display text-[12rem] sm:text-[18rem] lg:text-[24rem] font-black leading-none text-white/[0.015] tracking-tighter"
      >
        04
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-medium tracking-[0.24em] text-accent uppercase">
            Contact
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Let&apos;s build something solid
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Open to collaborations, product roles, and backend / cross-platform
            engineering work.
          </p>
        </div>

        <nav aria-label="Contact links" className="flex flex-wrap gap-3">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              data-cursor="interactive"
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-ink transition hover:text-accent ${glassChip}`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-slate-900/10 px-6 pt-6 dark:border-white/10">
        <p className="text-xs text-muted">
          © {year} Software Engineer — Cross-platform & Backend
        </p>
      </div>
    </footer>
  )
}
