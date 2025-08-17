import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

type TreeProps = {
	position: [number, number, number]
	scale?: number
}

function LowPolyTree({ position, scale = 1 }: TreeProps) {
	const geometries = useMemo(() => {
		const trunk = new THREE.CylinderGeometry(0.1 * scale, 0.15 * scale, 1 * scale, 6)
		const foliage = new THREE.ConeGeometry(0.6 * scale, 1.2 * scale, 8)
		foliage.translate(0, 1, 0)
		return { trunk, foliage }
	}, [scale])

	return (
		<group position={position}>
			<mesh geometry={geometries.trunk}>
				<meshStandardMaterial color="#795548" roughness={0.9} />
			</mesh>
			<mesh geometry={geometries.foliage}>
				<meshStandardMaterial color="#2f8f46" roughness={0.8} />
			</mesh>
		</group>
	)
}

export default function ForestScene() {
	const trees = useMemo(() => {
		const positions: [number, number, number][] = []
		for (let i = 0; i < 120; i++) {
			positions.push([
				( Math.random() - 0.5 ) * 10,
				0,
				( Math.random() - 0.5 ) * 10
			])
		}
		return positions
	}, [])

	return (
		<div style={{ height: 420, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--forest-100)' }}>
			<Canvas camera={{ position: [3, 3, 6], fov: 45 }}>
				<ambientLight intensity={0.6} />
				<directionalLight position={[3, 5, 2]} intensity={0.8} />
				<Suspense fallback={null}>
					{trees.map((p, i) => (
						<LowPolyTree key={i} position={p} scale={0.8 + Math.random() * 0.6} />
					))}
				</Suspense>
				<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
					<circleGeometry args={[9, 32]} />
					<meshStandardMaterial color="#e6f4ea" />
				</mesh>
				<OrbitControls enablePan={false} />
			</Canvas>
		</div>
	)
}


