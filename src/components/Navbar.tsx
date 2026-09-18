import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { glassPanel } from '../lib/glass'
import { scrollProgress } from '../lib/scrollProgress'

const navLinks = [
  { href: '#home',     label: 'Home'     },
  { href: '#tech',     label: 'Tech'     },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [open,     setOpen    ] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return scrollProgress.subscribe((offset) => setScrolled(offset > 0.03))
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition ${
        scrolled
          ? `border-white/10 ${glassPanel}`
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          data-cursor="interactive"
          className="font-display text-sm font-bold tracking-[0.2em] uppercase
            bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent
            drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
        >
          &lt;Portfolio /&gt;
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="interactive"
              className="text-sm text-muted transition hover:text-accent font-mono tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            data-cursor="interactive"
            className={`inline-flex items-center justify-center rounded-md p-2 text-ink ${glassPanel}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className={`border-t border-white/10 px-6 py-4 md:hidden ${glassPanel}`}
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="interactive"
                  className="block py-1 text-sm text-muted hover:text-accent font-mono"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
