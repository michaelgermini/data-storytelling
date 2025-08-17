import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Stars } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import { gsap } from 'gsap'
import { exportAppToPdf } from '../utils/exportPdf'

function DnaHelix() {
	return (
		<group>
			{Array.from({ length: 100 }).map((_, i) => {
				const t = i / 10
				const x = Math.cos(t) * 1.2
				const y = i * 0.1 - 5
				const z = Math.sin(t) * 1.2
				return (
					<mesh key={i} position={[x, y, z]}>
						<sphereGeometry args={[0.06, 16, 16]} />
						<meshStandardMaterial color={i % 2 === 0 ? '#00d084' : '#5fd3ff'} emissiveIntensity={0.8} emissive="#00d084" />
					</mesh>
				)
			})}
		</group>
	)
}

export default function Home() {
	useEffect(() => {
		gsap.fromTo('.brand', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8 })
		gsap.fromTo('.ticker span', { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 })
		const btn = document.getElementById('export-pdf')
		if (btn) {
			btn.onclick = () => exportAppToPdf()
		}
	}, [])

	return (
		<div className="grid-2">
			<div className="panel">
				<h2 className="section-title">Animation 3D Molécule / ADN</h2>
				<div style={{ height: 420, borderRadius: 12, overflow: 'hidden' }}>
					<Suspense fallback={null}>
						<Canvas camera={{ position: [0, 1, 6], fov: 55 }}>
							<color attach="background" args={[0, 0, 0]} />
							<ambientLight intensity={0.4} />
							<directionalLight intensity={1.2} position={[5, 5, 5]} />
							<Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
								<DnaHelix />
							</Float>
							<Stars radius={30} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
							<OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
						</Canvas>
					</Suspense>
				</div>
			</div>
			<div className="panel">
				<h2 className="section-title">Carte 3D – Genève (sites pharma)</h2>
				<p>Placeholder: carte 3D simplifiée. Intégration future d'une géométrie extrudée de Genève et marqueurs des sites pharma.</p>
			</div>
		</div>
	)
}


