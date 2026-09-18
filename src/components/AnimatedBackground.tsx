import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const darkOrbs = [
  {
    className: 'left-[-14%] top-[-10%] h-[50vmax] w-[50vmax] bg-[radial-gradient(circle,rgba(6,80,120,0.45)_0%,transparent_65%)]',
    duration: 28, x: [0, 80, -40, 0], y: [0, 60, 120, 0],
  },
  {
    className: 'right-[-20%] top-[6%] h-[52vmax] w-[52vmax] bg-[radial-gradient(circle,rgba(6,120,140,0.40)_0%,transparent_68%)]',
    duration: 34, x: [0, -90, 30, 0], y: [0, 100, 40, 0],
  },
  {
    className: 'bottom-[-22%] left-[16%] h-[44vmax] w-[44vmax] bg-[radial-gradient(circle,rgba(20,50,140,0.35)_0%,transparent_72%)]',
    duration: 40, x: [0, 60, -70, 0], y: [0, -80, -30, 0],
  },
  {
    className: 'right-[10%] bottom-[10%] h-[30vmax] w-[30vmax] bg-[radial-gradient(circle,rgba(80,20,120,0.25)_0%,transparent_70%)]',
    duration: 52, x: [0, -40, 60, 0], y: [0, 50, -40, 0],
  },
]

export default function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030608]"
    >
      {/* Base radial gradient centre */}
      <div className="
        absolute inset-0
        bg-[radial-gradient(ellipse_at_50%_40%,rgba(8,14,28,0.95)_0%,#030608_70%)]
      " />

      {/* On mobile: static CSS gradients (ultra-fast, zero GPU composite cost, 60fps) */}
      {isMobile ? (
        <>
          <div className="absolute -top-[10%] -left-[10%] h-[50vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(6,80,120,0.35)_0%,transparent_70%)]" />
          <div className="absolute top-[35%] -right-[15%] h-[45vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(6,120,140,0.30)_0%,transparent_70%)]" />
          <div className="absolute -bottom-[10%] left-[10%] h-[40vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(20,50,140,0.25)_0%,transparent_70%)]" />
        </>
      ) : (
        /* On desktop: animated ambient orbs */
        darkOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full will-change-transform ${orb.className}`}
            animate={{ x: orb.x, y: orb.y }}
            transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))
      )}

      {/* Global vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)' }}
      />
    </div>
  )
}
