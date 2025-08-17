import { useFrame } from '@react-three/fiber'
import { Center, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

type ShelfProps = {
  position: [number, number, number]
  color: string
  name: string
  onSelect?: (name: string) => void
}

function Shelf({ position, color, name, onSelect }: ShelfProps) {
  const ref = useRef<THREE.Mesh>(null)
  const emissive = useMemo(() => new THREE.Color(color).multiplyScalar(0.6), [color])
  return (
    <mesh ref={ref} position={position} castShadow receiveShadow onClick={() => onSelect?.(name)}>
      <boxGeometry args={[3.6, 1.2, 1.0]} />
      <meshStandardMaterial color={color} emissive={emissive} roughness={0.5} metalness={0.05} />
    </mesh>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 30]} />
      <meshStandardMaterial color="#0e141b" />
    </mesh>
  )
}

function CustomerFlow() {
  const group = useRef<THREE.Group>(null)
  const points = useMemo(() => {
    const p: THREE.Vector3[] = []
    for (let i = 0; i < 400; i++) {
      p.push(new THREE.Vector3((Math.random() - 0.5) * 18, 0.2 + Math.random() * 1.5, (Math.random() - 0.5) * 12))
    }
    return p
  }, [])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current?.children.forEach((m, i) => {
      const phase = (i % 20) / 20
      m.position.x += Math.sin(t * 0.4 + phase) * 0.01
      m.position.z += Math.cos(t * 0.35 + phase) * 0.01
    })
  })
  return (
    <group ref={group}>
      {points.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#39c6ff" emissive="#0a84ff" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  )
}

export function StoreScene() {
  const handleSelect = (name: string) => {
    // Hook: could trigger a side panel content change
    console.log('Section sélectionnée:', name)
  }
  return (
    <group>
      <Floor />
      <Center top>
        <Float floatIntensity={1.2}>
          <group position={[0, 0.6, 0]}>
            <Shelf name="Frais" position={[-6, 0.6, 0]} color="#2ec4b6" onSelect={handleSelect} />
            <Shelf name="Épicerie" position={[-2, 0.6, 0]} color="#e71d36" onSelect={handleSelect} />
            <Shelf name="Boissons" position={[2, 0.6, 0]} color="#ff9f1c" onSelect={handleSelect} />
            <Shelf name="Hygiène" position={[6, 0.6, 0]} color="#7b61ff" onSelect={handleSelect} />
          </group>
        </Float>
      </Center>
      <CustomerFlow />
    </group>
  )
}


