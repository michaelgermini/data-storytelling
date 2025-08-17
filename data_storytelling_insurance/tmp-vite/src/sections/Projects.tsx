import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useMemo } from 'react'

type Project = { title: string; roi: string; year: number }

const projects: Project[] = [
  { title: 'Prédiction sinistres auto', roi: '+12% combined ratio', year: 2021 },
  { title: 'Scoring client santé', roi: '-18% churn', year: 2022 },
  { title: 'Fraude habitation', roi: '+2.5M CHF économies', year: 2023 },
  { title: 'Tarification dynamique', roi: '+4 pts marge', year: 2024 }
]

function Milestone({ x, title, roi, year }: { x: number; title: string; roi: string; year: number }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#c9a227" emissive="#7b6520" emissiveIntensity={0.35} />
      </mesh>
      <Html position={[0, 0.3, 0]} center>
        <div style={{ background: 'rgba(10,34,64,0.75)', border: '1px solid rgba(168,178,191,0.2)', padding: 8, borderRadius: 8, minWidth: 200 }}>
          <div style={{ fontWeight: 700 }}>{year} · {title}</div>
          <div style={{ color: '#c9a227' }}>{roi}</div>
        </div>
      </Html>
    </group>
  )
}

export function Projects() {
  const positions = useMemo(() => projects.map((p, i) => ({ ...p, x: i * 1.8 - 2.7 })), [])
  return (
    <div className="panel" style={{ margin: 16 }}>
      <div className="panel-title">Projets assurance – Timeline 3D</div>
      <div className="panel-body" style={{ height: 440 }}>
        <Canvas camera={{ position: [0, 1.2, 4], fov: 55 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 5]} intensity={1.1} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.11, 0]}>
            <planeGeometry args={[8, 1]} />
            <meshStandardMaterial color="#1b2b44" />
          </mesh>
          {positions.map(p => (
            <Milestone key={p.title} x={p.x} title={p.title} roi={p.roi} year={p.year} />
          ))}
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}

export default Projects


