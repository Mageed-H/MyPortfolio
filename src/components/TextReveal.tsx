import { motion } from 'framer-motion'

type TextRevealProps = {
  text: string
  className?: string
  delay?: number
  mode?: 'word' | 'char'
}

const ease = [0.22, 1, 0.36, 1] as const

/** Staggered word or character reveal for hero headlines. */
export default function TextReveal({
  text,
  className = '',
  delay = 0,
  mode = 'word',
}: TextRevealProps) {
  const units = mode === 'word' ? text.split(' ') : Array.from(text)

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {units.map((unit, index) => (
        <span key={`${unit}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.7,
              ease,
              delay: delay + index * (mode === 'word' ? 0.08 : 0.02),
            }}
          >
            {unit === ' ' ? '\u00A0' : unit}
            {mode === 'word' && index < units.length - 1 ? '\u00A0' : null}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
