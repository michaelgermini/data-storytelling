import React, { useMemo, useRef } from 'react';
import { MeshProps, ThreeElements } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

type ZoneId = 'piscine' | 'toboggan' | 'accueil' | 'activites';

interface ZoneSpec {
	id: ZoneId;
	label: string;
	position: [number, number, number];
	size: [number, number, number];
	color: string;
}

const ZONES: ZoneSpec[] = [
	{ id: 'accueil', label: 'Accueil', position: [-4, 0.5, 0], size: [3, 1, 3], color: '#4cc9f0' },
	{ id: 'piscine', label: 'Piscine principale', position: [0, 0.25, 0], size: [6, 0.5, 10], color: '#56cfe1' },
	{ id: 'toboggan', label: 'Toboggan', position: [5, 0.8, -2], size: [2, 1.5, 4], color: '#ff6d00' },
	{ id: 'activites', label: 'Salles d\'activités', position: [4, 0.8, 4], size: [4, 1.5, 4], color: '#b5179e' },
];

export const Scene: React.FC = () => {
	return (
		<group>
			<Ground />
			{ZONES.map((z) => (
				<Zone key={z.id} spec={z} />
			))}
			<VisitorFlow />
		</group>
	);
};

const Ground: React.FC = () => (
	<mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.001, 0]}>
		<planeGeometry args={[60, 60]} />
		<meshStandardMaterial color="#0b1220" />
	</mesh>
);

const Zone: React.FC<{ spec: ZoneSpec }> = ({ spec }) => {
	const ref = useRef<THREE.Mesh>(null);
	const color = new THREE.Color(spec.color);
	const emissive = color.clone().multiplyScalar(0.4);

	return (
		<group position={spec.position}>
			<mesh ref={ref} castShadow receiveShadow>
				<boxGeometry args={spec.size} />
				<meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.6} metalness={0.1} roughness={0.4} />
			</mesh>
			<Float floatIntensity={1} speed={1.5}>
				<Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
					<div style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: 6, fontSize: 12 }}>{spec.label}</div>
				</Html>
			</Float>
		</group>
	);
};

const VisitorFlow: React.FC = () => {
	const points = useMemo(() => {
		const arr: THREE.Vector3[] = [];
		for (let i = 0; i < 400; i++) {
			arr.push(new THREE.Vector3((Math.random() - 0.5) * 10, 0.1 + Math.random() * 0.3, (Math.random() - 0.5) * 8));
		}
		return arr;
	}, []);

	return (
		<group>
			{points.map((p, idx) => (
				<mesh key={idx} position={[p.x, p.y, p.z]}>
					<sphereGeometry args={[0.05, 12, 12]} />
					<meshStandardMaterial color="#a1ffb0" emissive="#6cff7a" emissiveIntensity={0.8} />
				</mesh>
			))}
		</group>
	);
};



