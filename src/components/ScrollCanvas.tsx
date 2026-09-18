import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ScrollObject from './ScrollObject'

/** Fixed 3D background canvas. */
export default function ScrollCanvas() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 7], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          {/* Subtle ambient — just enough for emissive meshes to look right */}
          <ambientLight intensity={0.15} />
          <ScrollObject />
        </Suspense>
      </Canvas>
    </div>
  )
}
