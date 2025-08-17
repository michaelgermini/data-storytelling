import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'

type HomeProps = {
  mode?: 'profil'
}

function CityPlaceholder() {
  const grid = useMemo(() => new THREE.GridHelper(200, 20, '#4aa3ff', '#1d3350'), [])
  return <primitive object={grid} />
}

function PollutionLayer() {
  return (
    <mesh>
      <sphereGeometry args={[80, 32, 32]} />
      <meshBasicMaterial color="#ff8a3d" transparent opacity={0.05} />
    </mesh>
  )
}

export default function Home(_props: HomeProps) {
  return (
    <div className="section" style={{ height: '100%', padding: 0 }}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[60, 60, 60]} fov={45} />
          <ambientLight intensity={0.6} />
          <directionalLight castShadow position={[40, 60, 20]} intensity={1.2} />
          <Environment preset="city" />
          <CityPlaceholder />
          <PollutionLayer />
          <OrbitControls enableDamping />
        </Suspense>
      </Canvas>
    </div>
  )
}



