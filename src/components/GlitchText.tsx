import { useEffect, useRef, useState } from 'react'

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&~'

interface Props {
  text: string
  className?: string
  /** How often to trigger a glitch cycle (ms). Default 5000 */
  interval?: number
  /** How many iterations of scramble before resolving. Default 12 */
  iterations?: number
}

/**
 * Renders text that periodically glitches — characters scramble then
 * resolve back to the original, letter by letter (right to left reveal).
 * Pure JS, no canvas, negligible performance cost.
 */
export default function GlitchText({
  text,
  className = '',
  interval   = 5500,
  iterations = 14,
}: Props) {
  const [display, setDisplay] = useState(text)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const rafRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let iteration   = 0
    let charPointer = 0   // how many chars are "resolved" from the start

    const scramble = () => {
      const resolved  = text.slice(0, charPointer)
      const scrambled = text.slice(charPointer).split('').map(() =>
        GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      ).join('')
      setDisplay(resolved + scrambled)

      iteration++
      if (iteration % Math.ceil(iterations / text.length) === 0) {
        charPointer = Math.min(charPointer + 1, text.length)
      }

      if (charPointer >= text.length) {
        setDisplay(text)
        clearInterval(timerRef.current!)
        timerRef.current = null
      }
    }

    const trigger = () => {
      if (timerRef.current) return   // already running
      iteration   = 0
      charPointer = 0
      timerRef.current = setInterval(scramble, 42)
    }

    /* First trigger after a short delay so it doesn't fire immediately */
    rafRef.current = setTimeout(trigger, 1800)
    /* Repeat on interval */
    const cycle = setInterval(trigger, interval)

    return () => {
      clearTimeout(rafRef.current!)
      clearInterval(cycle)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [text, interval, iterations])

  return (
    <span
      className={className}
      aria-label={text}
      /* Render each char so we can style "glitching" chars differently */
    >
      {display.split('').map((char, i) => {
        const isResolved = char === text[i]
        return (
          <span
            key={i}
            className={
              isResolved
                ? undefined
                : 'text-cyan-400 dark:text-cyan-300 opacity-80'
            }
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}
