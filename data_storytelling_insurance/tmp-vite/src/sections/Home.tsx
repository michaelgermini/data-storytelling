import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type HomeProps = { mode?: 'default' | 'profile' }

function Network() {
  const group = useRef<THREE.Group>(null)
  const nodes = 120
  const positions = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < nodes; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      const r = 2.4
      arr.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    }
    return Float32Array.from(arr)
  }, [])

  useEffect(() => {
    let raf = 0
    const animate = () => {
      if (group.current) group.current.rotation.y += 0.0015
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#c9a227" sizeAttenuation transparent opacity={0.95} />
      </points>
      {/* sparse connections */}
      {Array.from({ length: 80 }).map((_, i) => {
        const a = Math.floor(Math.random() * (positions.length / 3)) * 3
        const b = Math.floor(Math.random() * (positions.length / 3)) * 3
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(Float32Array.from([
          positions[a], positions[a + 1], positions[a + 2],
          positions[b], positions[b + 1], positions[b + 2]
        ]), 3))
        return (
          <line key={i}>
            <primitive attach="geometry" object={geo} />
            <lineBasicMaterial color="#2c5d8a" transparent opacity={0.35} />
          </line>
        )
      })}
    </group>
  )
}

export function Home({ mode = 'default' }: HomeProps) {
  return (
    <div className="hero">
      <div className="panel">
        <div className="panel-title">Centre de contrôle – Assurance</div>
        <div className="panel-body" style={{ height: 420 }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Network />
            <OrbitControls enablePan={false} />
          </Canvas>
        </div>
      </div>
      <div className="panel">
        <div className="panel-body">
          <h1>Data Scientist – Analyse de Risques & Assurance</h1>
          <div>Genève, Suisse</div>
          <ul>
            <li>Plateforme actuarielle immersive: risques, KPI, storytelling</li>
            <li>ML appliqué aux sinistres, fraude, scoring client</li>
            <li>Visualisation avancée avec D3.js & Three.js</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home


