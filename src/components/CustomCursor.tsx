import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Premium cyber cursor with a trailing glow ring. */
export default function CustomCursor() {
  const [enabled, setEnabled]   = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible]   = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 480, damping: 34, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 480, damping: 34, mass: 0.3 })

  // Slower trail ring
  const rx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target as HTMLElement | null
      setHovering(Boolean(t?.closest('a, button, [data-cursor="interactive"], [role="button"], input, textarea, select')))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Outer slow ring — glow on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full border"
        style={{
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width:   hovering ? 48 : 32,
          height:  hovering ? 48 : 32,
          opacity: visible  ?  1 :  0,
          borderColor: hovering
            ? 'rgba(6,182,212,0.9)'
            : 'rgba(6,182,212,0.45)',
          boxShadow: hovering
            ? '0 0 16px rgba(6,182,212,0.6), inset 0 0 8px rgba(6,182,212,0.2)'
            : '0 0 6px rgba(6,182,212,0.25)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      />

      {/* Inner fast dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:           hovering ? 6 : 6,
          height:          hovering ? 6 : 6,
          opacity:         visible ? 1 : 0,
          backgroundColor: hovering ? '#22d3ee' : '#fff',
          boxShadow:       hovering ? '0 0 12px #22d3ee' : '0 0 4px rgba(255,255,255,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  )
}
