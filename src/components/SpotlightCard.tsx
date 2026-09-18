import { useState, useRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

/**
 * Linear & Vercel-style interactive Spotlight Card.
 * Projects a soft radial glow that tracks the cursor inside the card
 * and dynamically illuminates the cyan border under the mouse.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(6, 182, 212, 0.14)',
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -200, y: -200 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      {...props}
    >
      {/* Spotlight background radial glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Dynamic illuminated border directly beneath cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
        style={{
          opacity,
          border: '1px solid rgba(34, 211, 238, 0.65)',
          boxShadow: '0 0 16px rgba(6, 182, 212, 0.25) inset',
          maskImage: `radial-gradient(260px circle at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(260px circle at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
        }}
        aria-hidden
      />

      {/* Card contents */}
      <div className="relative z-20 flex h-full w-full flex-col">
        {children}
      </div>
    </motion.div>
  )
}
