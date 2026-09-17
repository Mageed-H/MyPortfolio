import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const darkOrbs = [
  {
    className: 'left-[-14%] top-[-10%] h-[50vmax] w-[50vmax] bg-[radial-gradient(circle,rgba(6,80,120,0.60)_0%,transparent_65%)]',
    duration: 28, x: [0, 80, -40, 0], y: [0, 60, 120, 0],
  },
  {
    className: 'right-[-20%] top-[6%] h-[52vmax] w-[52vmax] bg-[radial-gradient(circle,rgba(6,120,140,0.50)_0%,transparent_68%)]',
    duration: 34, x: [0, -90, 30, 0], y: [0, 100, 40, 0],
  },
  {
    className: 'bottom-[-22%] left-[16%] h-[44vmax] w-[44vmax] bg-[radial-gradient(circle,rgba(20,50,140,0.45)_0%,transparent_72%)]',
    duration: 40, x: [0, 60, -70, 0], y: [0, -80, -30, 0],
  },
  // Extra deep-purple accent orb for cinematic depth
  {
    className: 'right-[10%] bottom-[10%] h-[30vmax] w-[30vmax] bg-[radial-gradient(circle,rgba(80,20,120,0.30)_0%,transparent_70%)]',
    duration: 52, x: [0, -40, 60, 0], y: [0, 50, -40, 0],
  },
]

const lightOrbs = [
  {
    className: 'left-[-10%] top-[-6%] h-[44vmax] w-[44vmax] bg-[radial-gradient(circle,rgba(125,211,252,0.55)_0%,transparent_68%)]',
    duration: 30, x: [0, 70, -30, 0], y: [0, 50, 100, 0],
  },
  {
    className: 'right-[-14%] top-[12%] h-[48vmax] w-[48vmax] bg-[radial-gradient(circle,rgba(125,211,252,0.48)_0%,transparent_70%)]',
    duration: 36, x: [0, -80, 40, 0], y: [0, 90, 30, 0],
  },
  {
    className: 'bottom-[-18%] left-[22%] h-[38vmax] w-[38vmax] bg-[radial-gradient(circle,rgba(191,219,254,0.52)_0%,transparent_70%)]',
    duration: 42, x: [0, 50, -60, 0], y: [0, -70, -20, 0],
  },
]

export default function AnimatedBackground() {
  const { isDark } = useTheme()
  const orbs = isDark ? darkOrbs : lightOrbs

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#e8eef7] transition-colors duration-500 dark:bg-[#030608]"
    >
      {/* Base radial gradient centre */}
      <div className="
        absolute inset-0
        bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.88)_0%,#e8eef7_70%)]
        dark:bg-[radial-gradient(ellipse_at_50%_40%,rgba(8,14,28,0.95)_0%,#030608_70%)]
      " />

      {/* Moving orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={`${isDark ? 'd' : 'l'}-${i}`}
          className={`absolute rounded-full blur-3xl will-change-transform ${orb.className}`}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Global vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)' }}
      />
    </div>
  )
}
