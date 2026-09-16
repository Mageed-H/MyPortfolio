import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { BufferGeometry, Color, Float32BufferAttribute, MathUtils, Points, Group } from 'three'
import { useDocumentTheme } from '../hooks/useDocumentTheme'
import { scrollProgress } from '../lib/scrollProgress'

const PARTICLE_COUNT = 200
const NODE_COUNT = 30
const CONNECTION_DISTANCE = 2.8

function CyberParticles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<Points>(null)

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    const cyan = new Color(isDark ? '#06b6d4' : '#0284c7')
    const emerald = new Color(isDark ? '#10b981' : '#059669')
    const blue = new Color(isDark ? '#38bdf8' : '#3b82f6')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const radius = 1.5 + Math.random() * 5.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      const pick = [cyan, emerald, blue][Math.floor(Math.random() * 3)]
      colors[i3] = pick.r
      colors[i3 + 1] = pick.g
      colors[i3 + 2] = pick.b
    }

    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
    return geo
  }, [isDark])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.015
    pointsRef.current.rotation.x += delta * 0.005
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={isDark ? 0.03 : 0.022}
        vertexColors
        transparent
        opacity={isDark ? 0.7 : 0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function DataNodeNetwork({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null)

  const { nodePositions, nodeColors, lineGeometry } = useMemo(() => {
    const nodePositions: [number, number, number][] = []
    const nodeColors: string[] = []
    const edges: [number, number][] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      const radius = 2.0 + Math.random() * 4.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      nodePositions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ])

      nodeColors.push(
        isDark
          ? ['#06b6d4', '#10b981', '#38bdf8', '#22d3ee'][Math.floor(Math.random() * 4)]
          : ['#0284c7', '#059669', '#3b82f6', '#0ea5e9'][Math.floor(Math.random() * 4)],
      )
    }

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const [x1, y1, z1] = nodePositions[i]
        const [x2, y2, z2] = nodePositions[j]
        const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
        if (dist < CONNECTION_DISTANCE) {
          edges.push([i, j])
        }
      }
    }

    const linePoints: number[] = []
    for (const [i, j] of edges) {
      linePoints.push(...nodePositions[i], ...nodePositions[j])
    }
    const lineGeo = new BufferGeometry()
    lineGeo.setAttribute('position', new Float32BufferAttribute(linePoints, 3))

    return { nodePositions, nodeColors, lineGeometry: lineGeo }
  }, [isDark])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.02
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05
  })

  return (
    <group ref={groupRef}>
      {nodePositions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <icosahedronGeometry args={[0.04 + i * 0.001, 1]} />
          <meshStandardMaterial
            color={nodeColors[i]}
            emissive={nodeColors[i]}
            emissiveIntensity={isDark ? 2.5 : 1.2}
            transparent
            opacity={isDark ? 0.9 : 0.6}
          />
        </mesh>
      ))}

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={isDark ? '#06b6d4' : '#0284c7'}
          transparent
          opacity={isDark ? 0.12 : 0.08}
        />
      </lineSegments>
    </group>
  )
}

export default function ScrollObject() {
  const mainGroupRef = useRef<Group>(null)
  const scroll = useScroll()
  const { pointer, viewport } = useThree()
  const isDark = useDocumentTheme()

  useFrame((state, delta) => {
    const mainGroup = mainGroupRef.current
    if (!mainGroup) return

    const o = scroll.offset
    scrollProgress.set(o)

    const mouseX = (pointer.x * viewport.width) / 40
    const mouseY = (pointer.y * viewport.height) / 40

    mainGroup.position.x = MathUtils.damp(mainGroup.position.x, mouseX, 2, delta)
    mainGroup.position.y = MathUtils.damp(mainGroup.position.y, mouseY, 2, delta)

    const t = state.clock.getElapsedTime()
    mainGroup.rotation.y = MathUtils.damp(mainGroup.rotation.y, t * 0.01, 2, delta)
  })

  return (
    <group ref={mainGroupRef}>
      <CyberParticles isDark={isDark} />
      <DataNodeNetwork isDark={isDark} />
    </group>
  )
}
