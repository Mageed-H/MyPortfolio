import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const darkOrbs = [
  {
    className:
      'left-[-12%] top-[-8%] h-[42vmax] w-[42vmax] bg-[radial-gradient(circle,rgba(20,80,120,0.55)_0%,transparent_68%)]',
    duration: 28,
    x: [0, 80, -40, 0],
    y: [0, 60, 120, 0],
  },
  {
    className:
      'right-[-18%] top-[8%] h-[48vmax] w-[48vmax] bg-[radial-gradient(circle,rgba(6,120,140,0.45)_0%,transparent_70%)]',
    duration: 34,
    x: [0, -90, 30, 0],
    y: [0, 100, 40, 0],
  },
  {
    className:
      'bottom-[-20%] left-[18%] h-[40vmax] w-[40vmax] bg-[radial-gradient(circle,rgba(30,60,140,0.4)_0%,transparent_72%)]',
    duration: 40,
    x: [0, 60, -70, 0],
    y: [0, -80, -30, 0],
  },
]

const lightOrbs = [
  {
    className:
      'left-[-10%] top-[-6%] h-[40vmax] w-[40vmax] bg-[radial-gradient(circle,rgba(125,211,252,0.55)_0%,transparent_70%)]',
    duration: 30,
    x: [0, 70, -30, 0],
    y: [0, 50, 100, 0],
  },
  {
    className:
      'right-[-14%] top-[12%] h-[44vmax] w-[44vmax] bg-[radial-gradient(circle,rgba(125,211,252,0.5)_0%,transparent_72%)]',
    duration: 36,
    x: [0, -80, 40, 0],
    y: [0, 90, 30, 0],
  },
  {
    className:
      'bottom-[-18%] left-[22%] h-[36vmax] w-[36vmax] bg-[radial-gradient(circle,rgba(191,219,254,0.55)_0%,transparent_70%)]',
    duration: 42,
    x: [0, 50, -60, 0],
    y: [0, -70, -20, 0],
  },
]

export default function AnimatedBackground() {
  const { isDark } = useTheme()
  const orbs = isDark ? darkOrbs : lightOrbs

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#e8eef7] transition-colors duration-500 dark:bg-[#05070c]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,#e8eef7_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(8,12,22)_0%,#05070c_70%)]" />

      {orbs.map((orb, index) => (
        <motion.div
          key={`${isDark ? 'd' : 'l'}-${index}`}
          className={`absolute rounded-full blur-3xl will-change-transform ${orb.className}`}
          animate={{ x: orb.x, y: orb.y }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
