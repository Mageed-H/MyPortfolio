import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  IcosahedronGeometry,
  LineSegments,
  MathUtils,
  Points,
  TorusGeometry,
  OctahedronGeometry,
  EdgesGeometry,
} from 'three'
import { useDocumentTheme } from '../hooks/useDocumentTheme'
import { scrollProgress } from '../lib/scrollProgress'

const PARTICLE_COUNT = 800
const ACCENT_COUNT   = 300

/* ─── Seeded deterministic random ─── */
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
      const i3    = i * 3
      const r     = 3.5 + rng() * 8.0
      const theta = rng() * Math.PI * 2
      const phi   = Math.acos(2 * rng() - 1)
      pos[i3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)
    }
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3))
    return geo
  }, [])

  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.018 })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={isDark ? '#06b6d4' : '#0284c7'}
        size={0.03} transparent
        opacity={isDark ? 0.65 : 0.38}
        sizeAttenuation depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ─── Accent particles ─── */
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
        vertexColors size={0.022} transparent
        opacity={isDark ? 0.45 : 0.22}
        sizeAttenuation depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ─── Constellation lines ─── */
function ConstellationLines({ isDark }: { isDark: boolean }) {
  const ref = useRef<LineSegments>(null)

  const geometry = useMemo(() => {
    const rng   = seededRng(99)
    const nodes: [number, number, number][] = []
    for (let i = 0; i < 60; i++) {
      const r = 2.5 + rng() * 5.5
      const theta = rng() * Math.PI * 2
      const phi   = Math.acos(2 * rng() - 1)
      nodes.push([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)])
    }
    const lines: number[] = []
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const [x1,y1,z1] = nodes[i]; const [x2,y2,z2] = nodes[j]
        if (Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2) < 3.2)
          lines.push(x1,y1,z1,x2,y2,z2)
      }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(new Float32Array(lines), 3))
    return geo
  }, [])

  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.018 })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={isDark ? '#06b6d4' : '#0284c7'}
        transparent opacity={isDark ? 0.08 : 0.05}
        depthWrite={false} blending={AdditiveBlending}
      />
    </lineSegments>
  )
}

/* ─── Large wireframe icosahedron (slow spin, subtle) ─── */
function FloatingIcosahedron({ isDark }: { isDark: boolean }) {
  const ref = useRef<LineSegments>(null)

  const edges = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(3.2, 1)), [])

  useFrame((state, dt) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x += dt * 0.055
    ref.current.rotation.y += dt * 0.035
    ref.current.rotation.z += dt * 0.02
    // Gentle breathe scale
    const breathe = 1 + Math.sin(t * 0.4) * 0.025
    ref.current.scale.setScalar(breathe)
  })

  return (
    <lineSegments ref={ref} geometry={edges} position={[2.2, 0.3, -1.5]}>
      <lineBasicMaterial
        color={isDark ? '#06b6d4' : '#0284c7'}
        transparent
        opacity={isDark ? 0.18 : 0.12}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </lineSegments>
  )
}

/* ─── Torus ring (hero right side accent) ─── */
function FloatingTorus({ isDark }: { isDark: boolean }) {
  const ref = useRef<LineSegments>(null)

  const edges = useMemo(() => new EdgesGeometry(new TorusGeometry(1.6, 0.28, 8, 36)), [])

  useFrame((state, dt) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, Math.sin(t * 0.18) * 0.4 + 0.8, 0.02)
    ref.current.rotation.y += dt * 0.08
    ref.current.position.y = Math.sin(t * 0.22) * 0.25
  })

  return (
    <lineSegments ref={ref} geometry={edges} position={[3.4, 0.0, 0.5]}>
      <lineBasicMaterial
        color={isDark ? '#22d3ee' : '#0284c7'}
        transparent
        opacity={isDark ? 0.22 : 0.14}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </lineSegments>
  )
}

/* ─── Small scattered octahedrons ─── */
const OCT_CONFIGS: { pos: [number,number,number]; speed: number; phase: number }[] = [
  { pos: [-3.5,  1.8,  0.8], speed: 0.6, phase: 0.0 },
  { pos: [ 4.0, -1.5, -1.2], speed: 0.4, phase: 1.2 },
  { pos: [-1.8, -2.5,  1.5], speed: 0.5, phase: 2.4 },
  { pos: [ 1.2,  3.0, -2.0], speed: 0.7, phase: 0.8 },
]

function FloatingOctahedrons({ isDark }: { isDark: boolean }) {
  const refs = useRef<(LineSegments | null)[]>([])
  const edges = useMemo(() => new EdgesGeometry(new OctahedronGeometry(0.28, 0)), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const cfg = OCT_CONFIGS[i]
      mesh.rotation.x = t * cfg.speed * 0.7
      mesh.rotation.y = t * cfg.speed
      mesh.position.y = cfg.pos[1] + Math.sin(t * 0.35 + cfg.phase) * 0.3
    })
  })

  return (
    <>
      {OCT_CONFIGS.map((cfg, i) => (
        <lineSegments
          key={i}
          ref={el => { refs.current[i] = el }}
          geometry={edges}
          position={cfg.pos}
        >
          <lineBasicMaterial
            color={isDark ? '#10b981' : '#059669'}
            transparent
            opacity={isDark ? 0.35 : 0.2}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </lineSegments>
      ))}
    </>
  )
}

/* ─── Outer slow-spinning ring (decorative halo) ─── */
function OuterHaloRing({ isDark }: { isDark: boolean }) {
  const ref = useRef<LineSegments>(null)
  const edges = useMemo(() => new EdgesGeometry(new TorusGeometry(5.5, 0.04, 4, 80)), [])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * 0.008
    ref.current.rotation.y += dt * 0.012
  })

  return (
    <lineSegments ref={ref} geometry={edges} position={[0, 0, -2]}>
      <lineBasicMaterial
        color={isDark ? '#06b6d4' : '#0284c7'}
        transparent
        opacity={isDark ? 0.06 : 0.04}
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
      {/* Depth layers: farthest → nearest */}
      <OuterHaloRing      isDark={isDark} />
      <ConstellationLines isDark={isDark} />
      <CyberParticles     isDark={isDark} />
      <AccentParticles    isDark={isDark} />
      {/* 3D Geometry accents */}
      <FloatingIcosahedron isDark={isDark} />
      <FloatingTorus       isDark={isDark} />
      <FloatingOctahedrons isDark={isDark} />
    </group>
  )
}
