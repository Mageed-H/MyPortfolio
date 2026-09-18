import { useEffect, useRef } from 'react'

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number   // 0–1, starts at 1 and decays
  size: number
  hue: number    // 180=cyan, 160=emerald, 200=blue
}

const COLORS = [
  { h: 186, s: 95, l: 58 },  // cyan
  { h: 199, s: 90, l: 60 },  // sky blue
  { h: 160, s: 85, l: 52 },  // emerald
] as const

/** Canvas-based cursor spark trail — ~60fps, pure 2D, zero deps. */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    /* Only for fine pointers (mouse) */
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /* Resize canvas to fill viewport */
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const sparks: Spark[] = []
    let mouseX = -999
    let mouseY = -999
    let lastX  = -999
    let lastY  = -999
    let raf    = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      /* Emit sparks proportional to cursor speed */
      const dx    = mouseX - lastX
      const dy    = mouseY - lastY
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 2) {
        const count = Math.min(Math.floor(speed * 0.35), 6)
        for (let i = 0; i < count; i++) {
          const col   = COLORS[Math.floor(Math.random() * COLORS.length)]
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI * 0.8
          const mag   = 0.5 + Math.random() * 1.8
          sparks.push({
            x:    mouseX + (Math.random() - 0.5) * 6,
            y:    mouseY + (Math.random() - 0.5) * 6,
            vx:   Math.cos(angle) * mag,
            vy:   Math.sin(angle) * mag - 0.4,   // slight upward drift
            life: 1,
            size: 1.2 + Math.random() * 2.2,
            hue:  col.h + (Math.random() - 0.5) * 12,
          })
        }
      }

      lastX = mouseX
      lastY = mouseY
    }

    const tick = () => {
      /* Fade out previous frame — gives comet-trail effect */
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x    += s.vx
        s.y    += s.vy
        s.vy   += 0.06           // gravity
        s.life -= 0.038          // decay

        if (s.life <= 0) { sparks.splice(i, 1); continue }

        const alpha = s.life * s.life   // quadratic fade
        const r     = s.size * s.life   // shrink as it fades

        /* Glow pass */
        ctx.beginPath()
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 3.5)
        grd.addColorStop(0, `hsla(${s.hue}, 95%, 65%, ${alpha * 0.5})`)
        grd.addColorStop(1, `hsla(${s.hue}, 95%, 65%, 0)`)
        ctx.fillStyle = grd
        ctx.arc(s.x, s.y, r * 3.5, 0, Math.PI * 2)
        ctx.fill()

        /* Solid core dot */
        ctx.beginPath()
        ctx.fillStyle = `hsla(${s.hue}, 95%, 80%, ${alpha})`
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
