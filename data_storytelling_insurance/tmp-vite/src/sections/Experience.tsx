import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function RiskField() {
  const size = 20
  const grid: number[][] = []
  for (let y = 0; y < size; y++) {
    const row: number[] = []
    for (let x = 0; x < size; x++) {
      const dx = x - size / 2
      const dy = y - size / 2
      const r = Math.sqrt(dx * dx + dy * dy)
      const v = Math.max(0, 1 - r / (size / 2)) + 0.15 * Math.sin(x * 0.7) * Math.cos(y * 0.5)
      row.push(v)
    }
    grid.push(row)
  }

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {grid.map((row, y) => row.map((v, x) => {
        const color = v > 0.75 ? '#c33939' : v > 0.5 ? '#c9a227' : '#3aa66b'
        const h = v * 0.6
        return (
          <mesh key={`${x}-${y}`} position={[x * 0.22 - 2.2, y * 0.22 - 2.2, h / 2]}>
            <boxGeometry args={[0.2, 0.2, h]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      }))}
    </group>
  )
}

export function Experience() {
  return (
    <div className="panel" style={{ margin: 16 }}>
      <div className="panel-title">Carte 3D de risques – Expérience secteur</div>
      <div className="panel-body" style={{ height: 440 }}>
        <Canvas camera={{ position: [0, 2.2, 3.6] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <RiskField />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}

export default Experience


