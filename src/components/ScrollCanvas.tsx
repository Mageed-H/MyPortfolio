import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import ScrollObject from './ScrollObject'

/** Fixed 3D background canvas with mobile performance optimization. */
export default function ScrollCanvas() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="fixed inset-0 z-0 h-full w-full">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0.5, 7], fov: isMobile ? 54 : 48 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <ScrollObject isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}
