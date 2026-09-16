import { Canvas } from '@react-three/fiber'
import { Scroll, ScrollControls } from '@react-three/drei'
import { Suspense } from 'react'
import ScrollObject from './ScrollObject'
import PageContent from './PageContent'

/** Full-viewport fixed canvas with scroll-linked 3D background. */
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
          <ambientLight intensity={0.6} />
          <ScrollControls pages={4} damping={0.18} maxSpeed={0.35}>
            <ScrollObject />
            <Scroll html style={{ width: '100%' }}>
              <PageContent />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
