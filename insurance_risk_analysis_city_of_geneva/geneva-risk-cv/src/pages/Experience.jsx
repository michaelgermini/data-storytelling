import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useState } from 'react'

function RiskParticles({ filter }) {
  const points = useMemo(() => {
    const arr = []
    for (let i=0;i<1500;i++) {
      arr.push({
        x: (Math.random()-0.5)*6,
        y: Math.random()*1.4+0.05,
        z: (Math.random()-0.5)*4,
        r: Math.random()
      })
    }
    return arr
  }, [])
  const colorFor = (r) => r>0.75? '#ff5f6d' : r>0.45? '#f6c343' : '#2fbf71'
  const filtered = points.filter(p => {
    if (filter==='santé') return p.r>0.5
    if (filter==='auto') return p.x>0
    if (filter==='habitation') return p.x<0
    return true
  })
  return (
    <group>
      {filtered.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color={colorFor(p.r)} emissive={colorFor(p.r)} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export default function Experience() {
  const [filter, setFilter] = useState('tous')
  return (
    <div className="panel">
      <div className="panel-left glass">
        <Canvas camera={{ position:[2.8, 1.8, 3], fov:50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3,4,2]} intensity={0.6} />
          <RiskParticles filter={filter} />
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI/2.2} />
        </Canvas>
        <div className="top-right-controls">
          <div className="btn" onClick={()=>setFilter('santé')}>Santé</div>
          <div className="btn" onClick={()=>setFilter('auto')}>Auto</div>
          <div className="btn" onClick={()=>setFilter('habitation')}>Habitation</div>
          <div className="btn" onClick={()=>setFilter('tous')}>Tous</div>
        </div>
      </div>
      <div className="panel-right glass" style={{padding:16}}>
        <h3 className="section-title">Expérience secteur</h3>
        <div className="section-sub">Simulation en direct: la carte 3D s’illumine selon les zones à risque</div>
        <ul style={{color:'var(--silver)', lineHeight:1.8}}>
          <li>Assurance Habitation & Auto — Tarification, prévention, indemnisation</li>
          <li>Santé — Analyse coûts/qualité, détection anomalies</li>
          <li>Réassurance — Modèles de fréquence/gravité, agrégation des risques</li>
        </ul>
      </div>
    </div>
  )
}


