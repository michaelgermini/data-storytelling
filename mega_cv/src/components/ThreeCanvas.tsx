import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, PropsWithChildren } from 'react'

type ThreeCanvasProps = PropsWithChildren<{
  enableControls?: boolean
  background?: string
}>

export default function ThreeCanvas({ children, enableControls = true, background = '#0b1020' }: ThreeCanvasProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ background }}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        {enableControls && <OrbitControls enableDamping makeDefault />}
      </Canvas>
    </div>
  )
}

