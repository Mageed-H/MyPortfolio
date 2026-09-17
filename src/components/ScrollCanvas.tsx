import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ScrollObject from './ScrollObject'

/** Fixed 3D background canvas — subtle particle field only. */
export default function ScrollCanvas() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <ScrollObject />
        </Suspense>
      </Canvas>
    </div>
  )
}
