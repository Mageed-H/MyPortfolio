import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { glassPanel } from '../lib/glass'
import { scrollProgress } from '../lib/scrollProgress'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#tech', label: 'Tech' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return scrollProgress.subscribe((offset) => setScrolled(offset > 0.03))
  }, [])

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 border-b transition ${
        scrolled
          ? `pointer-events-auto border-slate-900/10 dark:border-white/10 ${glassPanel}`
          : 'border-transparent bg-transparent'
      }`}
    >
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between px-6 ${
          scrolled ? '' : 'pointer-events-auto'
        }`}
      >
        <a
          href="#home"
          data-cursor="interactive"
          className="font-display text-sm font-bold tracking-wide text-ink"
        >
          Portfolio
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="interactive"
              className="text-sm text-muted transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            data-cursor="interactive"
            className={`inline-flex items-center justify-center rounded-md p-2 text-ink ${glassPanel}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className={`pointer-events-auto border-t border-slate-900/10 px-6 py-4 dark:border-white/10 md:hidden ${glassPanel}`}
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="interactive"
                  className="block py-1 text-sm text-muted hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
