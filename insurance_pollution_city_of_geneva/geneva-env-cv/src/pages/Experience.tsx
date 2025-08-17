import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'

function Hotspot({ position, intensity }: { position: [number, number, number]; intensity: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[Math.max(0.5, intensity * 2), 16, 16]} />
      <meshStandardMaterial color="#ff8a3d" emissive="#ff8a3d" emissiveIntensity={0.5 + intensity} transparent opacity={0.8} />
    </mesh>
  )
}

export default function Experience() {
  const [before, setBefore] = useState(true)
  return (
    <div className="section" style={{ height: '100%', padding: 0 }}>
      <div style={{ display: 'flex', gap: 12, padding: 12 }}>
        <button onClick={() => setBefore(true)}>Avant</button>
        <button onClick={() => setBefore(false)}>Après</button>
      </div>
      <Canvas>
        <ambientLight intensity={0.6} />
        <OrbitControls />
        <Hotspot position={[-5, 0, 0]} intensity={before ? 1 : 0.3} />
        <Hotspot position={[5, 0, 0]} intensity={before ? 0.8 : 0.2} />
        <Hotspot position={[0, 0, 5]} intensity={before ? 0.6 : 0.1} />
      </Canvas>
    </div>
  )
}



