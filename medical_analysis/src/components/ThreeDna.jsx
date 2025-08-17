import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ThreeDna() {
	const points = useMemo(() => {
		const pts = [];
		const turns = 8;
		const height = 6;
		const radius = 0.7;
		const steps = 400;
		for (let i = 0; i < steps; i++) {
			const t = (i / steps) * Math.PI * 2 * turns;
			const y = (i / steps) * height - height / 2;
			pts.push(new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius));
		}
		return pts;
	}, []);

	useFrame((state) => {
		state.scene.rotation.y += 0.0015;
	});

	return (
		<group>
			<mesh>
				<tubeGeometry args={[new THREE.CatmullRomCurve3(points), 800, 0.06, 8, false]} />
				<meshStandardMaterial color="#35bdb2" metalness={0.2} roughness={0.25} />
			</mesh>
		</group>
	);
}

