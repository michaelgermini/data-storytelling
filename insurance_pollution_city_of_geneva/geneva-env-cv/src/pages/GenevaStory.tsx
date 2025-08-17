import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GenevaStory() {
  const cameraRef = useRef<any>(null)

  useEffect(() => {
    if (!cameraRef.current) return
    const tl = gsap.timeline({ repeat: 0 })
    tl.to(cameraRef.current.position, { x: 80, y: 60, z: 40, duration: 2 })
      .to(cameraRef.current.position, { x: 20, y: 30, z: 100, duration: 2 })
      .to(cameraRef.current.position, { x: -40, y: 50, z: 60, duration: 2 })
  }, [])

  return (
    <div className="section" style={{ height: '100%', padding: 0 }}>
      <Canvas>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[30, 40, 80]} />
        <ambientLight intensity={0.6} />
        <mesh>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#4aa3ff" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}



