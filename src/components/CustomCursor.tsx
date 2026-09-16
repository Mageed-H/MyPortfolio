import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Smooth custom cursor — disabled on coarse pointers / touch. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const raf = useRef(0)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 32, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 400, damping: 32, mass: 0.35 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)

      const target = event.target as HTMLElement | null
      const interactive = Boolean(
        target?.closest(
          'a, button, [data-cursor="interactive"], [role="button"], input, textarea, select',
        ),
      )
      setHovering(interactive)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf.current)
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: hovering ? 44 : 12,
          height: hovering ? 44 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      />
    </motion.div>
  )
}
