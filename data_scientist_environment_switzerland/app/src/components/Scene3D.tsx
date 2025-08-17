import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'

function CameraRig() {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const { cameraTarget, cameraPosition } = useAppStore()
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline({ defaults: { duration: 1.4, ease: 'power3.inOut' } })
    tl.to(camera.position, { x: cameraPosition[0], y: cameraPosition[1], z: cameraPosition[2] }, 0)
    tl.to(target, { x: cameraTarget[0], y: cameraTarget[1], z: cameraTarget[2] }, 0)
    tlRef.current = tl
  }, [cameraPosition, cameraTarget])

  useFrame(() => {
    camera.lookAt(target)
  })

  return null
}

function SwitzerlandPlaceholder() {
  const group = useRef<THREE.Group>(null)
  const { setSelectedRegion } = useAppStore()

  const cityColor = new THREE.Color('#2F6C86')

  const handleClick = (id: 'geneva' | 'zurich' | 'lausanne' | 'basel') => () => setSelectedRegion(id)

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Simplified swiss plate */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}
        castShadow receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial color="#e8f2ee" />
      </mesh>

      {/* Alps ridge - stylized */}
      <Float speed={1.2} rotationIntensity={0.02} floatIntensity={0.1}>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#b7c9d1" roughness={0.9} metalness={0.05} />
        </mesh>
      </Float>

      {/* Cities as clickable pins */}
      <ClickablePin position={[-1.2, 0.05, -0.6]} label="Genève" onClick={handleClick('geneva')} color={cityColor} />
      <ClickablePin position={[0.9, 0.05, 0.2]} label="Zurich" onClick={handleClick('zurich')} color={cityColor} />
      <ClickablePin position={[-0.2, 0.05, -0.1]} label="Lausanne" onClick={handleClick('lausanne')} color={cityColor} />
      <ClickablePin position={[1.1, 0.05, -0.9]} label="Bâle" onClick={handleClick('basel')} color={cityColor} />

      {/* Ground plate */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[3.4, 3.4, 0.1, 64]} />
        <meshStandardMaterial color="#d7efe4" />
      </mesh>

      <ContactShadows position={[0, -0.25, 0]} opacity={0.3} scale={8} blur={2} far={2.5} />
    </group>
  )
}

function ClickablePin({ position, label, onClick, color }: { position: [number, number, number], label: string, onClick: () => void, color: THREE.ColorRepresentation }) {
  const ref = useRef<THREE.Mesh>(null)
  const hoverRef = useRef(false)

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(performance.now() / 700 + position[0]) * 0.01
    ref.current.rotation.y += dt * 0.4
  })

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={onClick}
        onPointerOver={() => (hoverRef.current = true)}
        onPointerOut={() => (hoverRef.current = false)}
        castShadow>
        <coneGeometry args={[0.06, 0.18, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
      </mesh>
      <Html distanceFactor={10} position={[0, 0.18, 0]}>
        <div style={{
          background: 'rgba(10, 31, 23, 0.85)', color: 'white', padding: '4px 8px', borderRadius: 6,
          fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>{label}</div>
      </Html>
    </group>
  )
}

function PollutionParticles() {
  const { activeLayers } = useAppStore()
  const ref = useRef<THREE.Points>(null)
  const count = 800
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 2.4
      arr[i * 3 + 1] = Math.random() * 1.2 + 0.1
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2.0
    }
    return arr
  }, [])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.05
  })

  if (!activeLayers.pollution) return null
  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#2b2b2b" transparent opacity={0.45} sizeAttenuation />
    </points>
  )
}

export function Scene3D() {
  const { selectedRegion } = useAppStore()

  return (
    <Canvas shadows camera={{ position: [0, 2.5, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />

      <Environment preset="city" />
      <SwitzerlandPlaceholder />
      <PollutionParticles />

      <OrbitControls enableDamping dampingFactor={0.1} minDistance={2.5} maxDistance={10} />
      <CameraRig />

      {selectedRegion && (
        <Html position={[0, 1.2, 0]}>
          <div style={{ background: 'rgba(255,255,255,0.9)', padding: 12, borderRadius: 8, minWidth: 260 }}>
            <strong>Region: {selectedRegion}</strong>
            <div>Cliquer sur le bouton lecture pour le scénario guidé.</div>
          </div>
        </Html>
      )}
    </Canvas>
  )
}



