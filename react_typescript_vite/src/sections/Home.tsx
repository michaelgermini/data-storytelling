import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Buildings = () => {
  const group = useRef<THREE.Group>(null)
  useEffect(() => {
    if (!group.current) return
    group.current.children.forEach((mesh, i) => {
      mesh.position.y = Math.sin(i) * 0.1
    })
  }, [])
  const boxes = Array.from({ length: 16 })
  return (
    <group ref={group}>
      {boxes.map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 4, 0.5, Math.cos(i) * 4]}>
          <boxGeometry args={[0.5 + (i % 3) * 0.2, 1 + (i % 5) * 0.4, 0.5]} />
          <meshStandardMaterial color={i % 3 === 0 ? '#c8a85a' : '#9fb0ce'} metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0f1a2f" />
      </mesh>
    </group>
  )
}

const GenevaMarker = () => (
  <mesh position={[0, 1.2, 0]}>
    <coneGeometry args={[0.15, 0.5, 16]} />
    <meshStandardMaterial color="#d1b15f" />
  </mesh>
)

const Home = () => {
  return (
    <section className="section">
      <div className="section-grid">
        <div className="panel glass-panel" style={{ gridColumn: 'span 8', minHeight: 420 }}>
          <h2>Genève – Salle de contrôle d'investissements</h2>
          <Canvas camera={{ position: [4, 3, 7], fov: 48 }} style={{ height: 360, borderRadius: 12 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <Stars radius={40} depth={50} count={2000} factor={4} fade speed={1} />
            <Buildings />
            <GenevaMarker />
            <OrbitControls enablePan={false} />
          </Canvas>
        </div>
        <div className="panel glass-panel" style={{ gridColumn: 'span 4' }}>
          <h2>Profil</h2>
          <p>
            Data Scientist orienté finance, spécialisé en gestion du risque, détection de fraude et analytics
            clients premium. Goût prononcé pour le storytelling data et la création de tableaux de bord à fort
            impact décisionnel.
          </p>
          <ul>
            <li><span className="mono">MSc</span> Data Science</li>
            <li>8+ ans d'expérience</li>
            <li>Banque d'investissement, gestion de fortune</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Home


