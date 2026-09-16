import { useCallback, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type MagneticButtonProps = {
  children: ReactNode
  href: string
  strength?: number
  className?: string
}

/** Primary CTA that gently pulls toward the cursor on hover. */
export default function MagneticButton({
  children,
  href,
  strength = 0.35,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 })

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const offsetX = event.clientX - rect.left - rect.width / 2
      const offsetY = event.clientY - rect.top - rect.height / 2
      x.set(offsetX * strength)
      y.set(offsetY * strength)
    },
    [strength, x, y],
  )

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="interactive"
      className={className}
    >
      {children}
    </motion.a>
  )
}
