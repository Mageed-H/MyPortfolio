import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Points,
} from 'three'
import { useDocumentTheme } from '../hooks/useDocumentTheme'
import { scrollProgress } from '../lib/scrollProgress'

const PARTICLE_COUNT = 800

function CyberParticles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<Points>(null)

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Scatter in a wide sphere around the camera
      const radius = 3.5 + Math.random() * 8.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3]     = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
    }

    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.018
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={isDark ? '#06b6d4' : '#0284c7'}
        size={0.03}
        transparent
        opacity={isDark ? 0.6 : 0.35}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

// Second layer — subtle emerald/blue accent particles
function AccentParticles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<Points>(null)

  const geometry = useMemo(() => {
    const COUNT = 300
    const geo = new BufferGeometry()
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    const emerald = new Color(isDark ? '#10b981' : '#059669')
    const blue = new Color(isDark ? '#38bdf8' : '#3b82f6')

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const radius = 2.0 + Math.random() * 10.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3]     = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      const pick = Math.random() > 0.5 ? emerald : blue
      colors[i3]     = pick.r
      colors[i3 + 1] = pick.g
      colors[i3 + 2] = pick.b
    }

    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
    return geo
  }, [isDark])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y -= delta * 0.009
    pointsRef.current.rotation.x += delta * 0.004
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.022}
        transparent
        opacity={isDark ? 0.45 : 0.2}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

export default function ScrollObject() {
  const isDark = useDocumentTheme()

  useFrame(() => {
    const scrollTop = window.scrollY
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const offset = scrollHeight > 0 ? scrollTop / scrollHeight : 0
    scrollProgress.set(offset)
  })

  return (
    <group>
      <CyberParticles isDark={isDark} />
      <AccentParticles isDark={isDark} />
    </group>
  )
}
