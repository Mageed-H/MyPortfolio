import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Global Laser Scroll Progress Line.
 * Runs along the top edge of the viewport with a glowing laser tip.
 * Driven via GPU transform (scaleX) — 60/120fps locked, zero layout reflow.
 */
export default function LaserScrollLine() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="pointer-events-none fixed top-0 inset-x-0 z-[60] h-[2px]">
      {/* Background track (subtle) */}
      <div className="absolute inset-0 bg-white/[0.04]" />

      {/* Laser progress bar */}
      <motion.div
        className="relative h-full w-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 shadow-[0_0_10px_rgba(6,182,212,0.7)] origin-left"
        style={{ scaleX }}
      >
        {/* Intense laser tip burning forward */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 h-2 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee,0_0_24px_#06b6d4]" />
      </motion.div>
    </div>
  )
}
