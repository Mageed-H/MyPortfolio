import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineSegments,
  Points,
} from 'three'
import { useDocumentTheme } from '../hooks/useDocumentTheme'
import { scrollProgress } from '../lib/scrollProgress'

const PARTICLE_COUNT = 800
const ACCENT_COUNT   = 300

/* ─── Seeded deterministic random (no re-randomisation on re-render) ─── */
function seededRng(seed: number) {
  let s = seed
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

/* ─── Main cyan particles ─── */
function CyberParticles({ isDark }: { isDark: boolean }) {
  const ref = useRef<Points>(null)

  const geometry = useMemo(() => {
    const rng = seededRng(42)
    const geo = new BufferGeometry()
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3     = i * 3
      const r      = 3.5 + rng() * 8.0
      const theta  = rng() * Math.PI * 2
      const phi    = Math.acos(2 * rng() - 1)
      pos[i3]      = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1]  = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2]  = r * Math.cos(phi)
    }
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3))
    return geo
  }, [])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.018
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={isDark ? '#06b6d4' : '#0284c7'}
        size={0.03}
        transparent
        opacity={isDark ? 0.65 : 0.38}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ─── Accent particles (emerald + blue, counter-rotate) ─── */
function AccentParticles({ isDark }: { isDark: boolean }) {
  const ref = useRef<Points>(null)

  const geometry = useMemo(() => {
    const rng     = seededRng(137)
    const geo     = new BufferGeometry()
    const pos     = new Float32Array(ACCENT_COUNT * 3)
    const col     = new Float32Array(ACCENT_COUNT * 3)
    const emerald = new Color(isDark ? '#10b981' : '#059669')
    const blue    = new Color(isDark ? '#38bdf8' : '#3b82f6')

    for (let i = 0; i < ACCENT_COUNT; i++) {
      const i3    = i * 3
      const r     = 2.0 + rng() * 10.0
      const theta = rng() * Math.PI * 2
      const phi   = Math.acos(2 * rng() - 1)
      pos[i3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)
      const c     = rng() > 0.5 ? emerald : blue
      col[i3]     = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b
    }
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3))
    geo.setAttribute('color',    new Float32BufferAttribute(col, 3))
    return geo
  }, [isDark])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y -= dt * 0.009
    ref.current.rotation.x += dt * 0.004
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.022}
        transparent
        opacity={isDark ? 0.45 : 0.22}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ─── Sparse connection lines between nearby nodes ─── */
function ConstellationLines({ isDark }: { isDark: boolean }) {
  const ref = useRef<LineSegments>(null)

  const geometry = useMemo(() => {
    const rng   = seededRng(99)
    const nodes: [number, number, number][] = []
    const NODE_COUNT = 60
    for (let i = 0; i < NODE_COUNT; i++) {
      const r     = 2.5 + rng() * 5.5
      const theta = rng() * Math.PI * 2
      const phi   = Math.acos(2 * rng() - 1)
      nodes.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ])
    }

    const lines: number[] = []
    const MAX_DIST = 3.2
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [x1, y1, z1] = nodes[i]
        const [x2, y2, z2] = nodes[j]
        const d = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2)
        if (d < MAX_DIST) lines.push(x1, y1, z1, x2, y2, z2)
      }
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(new Float32Array(lines), 3))
    return geo
  }, [])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.018
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={isDark ? '#06b6d4' : '#0284c7'}
        transparent
        opacity={isDark ? 0.08 : 0.05}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </lineSegments>
  )
}

/* ─── Root export ─── */
export default function ScrollObject() {
  const isDark = useDocumentTheme()

  useFrame(() => {
    const scrollTop    = window.scrollY
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.set(scrollHeight > 0 ? scrollTop / scrollHeight : 0)
  })

  return (
    <group>
      <ConstellationLines isDark={isDark} />
      <CyberParticles     isDark={isDark} />
      <AccentParticles    isDark={isDark} />
    </group>
  )
}
