import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

function PulsingLights() {
  const group = useRef()
  useEffect(() => {
    if (!group.current) return
    const lights = group.current.children
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    Array.from(lights).forEach((l, i) => {
      tl.to(l, { intensity: 2.2, duration: 1.2, ease: 'sine.inOut' }, i * 0.2)
    })
    return () => tl.kill()
  }, [])
  return (
    <group ref={group}>
      <pointLight position={[1.5, 2.5, 0]} intensity={0.8} color={'#c5a45a'} />
      <pointLight position={[-1.2, 2.0, -0.8]} intensity={0.6} color={'#1f6feb'} />
      <pointLight position={[0.6, 1.8, 1.2]} intensity={0.6} color={'#2fbf71'} />
    </group>
  )
}

function GenevaStub() {
  // Simple blocky city stub representing Old Town, Eaux-Vives, Plainpalais, etc.
  const material = new THREE.MeshStandardMaterial({ color: '#1a2b46', metalness: 0.2, roughness: 0.8 })
  const districts = [
    { name: 'Old Town', position: [-1.2, 0.2, 0.4], size: [0.8, 0.4, 0.8] },
    { name: 'Eaux-Vives', position: [0.4, 0.2, 0.6], size: [0.9, 0.3, 0.5] },
    { name: 'Plainpalais', position: [-0.2, 0.2, -0.6], size: [1.0, 0.3, 0.7] },
    { name: 'Pâquis', position: [0.9, 0.2, -0.2], size: [0.6, 0.32, 0.6] }
  ]
  return (
    <group>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color={'#0b1220'} />
      </mesh>
      {districts.map((d, idx) => (
        <mesh key={idx} position={[...d.position]}> 
          <boxGeometry args={[...d.size]} />
          <primitive object={material.clone()} />
        </mesh>
      ))}
    </group>
  )
}

export default function Home() {
  return (
    <div className="panel">
      <div className="panel-left glass">
        <Canvas camera={{ position: [3, 2.5, 3.2], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <PulsingLights />
          <Suspense fallback={<Html>Chargement 3D…</Html>}>
            <GenevaStub />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} />
        </Canvas>
        <div className="top-right-controls">
          <div className="legend glass" style={{padding:'8px 10px'}}>
            <span className="dot dot-low"></span> Faible
            <span className="dot dot-med"></span> Moyen
            <span className="dot dot-high"></span> Elevé
          </div>
        </div>
      </div>
      <div className="panel-right glass">
        <h3 className="section-title">Centre de pilotage — Genève</h3>
        <div className="section-sub">Vue 3D de la ville avec points d'intérêt et intensité des risques</div>
        <div className="kpi-grid">
          <div className="kpi-card glass"><div className="kpi-value">3.2%</div><div className="kpi-label">Taux de sinistres global</div></div>
          <div className="kpi-card glass"><div className="kpi-value">12.4%</div><div className="kpi-label">Probabilité risque climatique</div></div>
          <div className="kpi-card glass"><div className="kpi-value">CHF 4.8k</div><div className="kpi-label">Coût moyen par sinistre</div></div>
          <div className="kpi-card glass"><div className="kpi-value">+9.1%</div><div className="kpi-label">Amélioration ROI projets</div></div>
        </div>
      </div>
    </div>
  )
}


