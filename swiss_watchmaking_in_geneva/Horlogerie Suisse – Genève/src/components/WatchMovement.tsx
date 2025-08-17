import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type GearProps = {
	teeth?: number;
	innerRadius?: number;
	outerRadius?: number;
	thickness?: number;
	color?: string;
	rotationSpeed?: number;
};

const Gear: React.FC<GearProps> = ({
	teeth = 16,
	innerRadius = 0.4,
	outerRadius = 0.6,
	thickness = 0.12,
	color = '#c9a227',
	rotationSpeed = 0.4,
}) => {
	const groupRef = useRef<THREE.Group>(null);

	const teethPositions = useMemo(() => {
		const arr: { angle: number }[] = [];
		for (let i = 0; i < teeth; i += 1) {
			arr.push({ angle: (i / teeth) * Math.PI * 2 });
		}
		return arr;
	}, [teeth]);

	useFrame((_, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.z -= rotationSpeed * delta;
		}
	});

	return (
		<group ref={groupRef}>
			{/* Couronne principale */}
			<mesh>
				<ringGeometry args={[innerRadius, outerRadius, 64]} />
				<meshStandardMaterial color={color} metalness={0.8} roughness={0.25} />
			</mesh>
			{/* Disque central */}
			<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -thickness / 2]}>
				<cylinderGeometry args={[innerRadius * 0.6, innerRadius * 0.6, thickness, 48]} />
				<meshStandardMaterial color="#d6d0c4" metalness={0.7} roughness={0.35} />
			</mesh>
			{/* Dents */}
			{teethPositions.map(({ angle }, idx) => (
				<mesh key={idx} position={[Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius, 0]} rotation={[0, 0, angle]}>
					<boxGeometry args={[outerRadius * 0.18, thickness, outerRadius * 0.05]} />
					<meshStandardMaterial color={color} metalness={0.85} roughness={0.2} />
				</mesh>
			))}
		</group>
	);
};

const BalanceWheel: React.FC = () => {
	const ref = useRef<THREE.Mesh>(null);
	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (ref.current) ref.current.rotation.z = Math.sin(t * 4) * 0.3;
	});
	return (
		<mesh ref={ref}>
			<torusGeometry args={[0.45, 0.04, 24, 64]} />
			<meshStandardMaterial color="#c0c4c9" metalness={0.8} roughness={0.25} />
		</mesh>
	);
};

export const WatchMovement: React.FC = () => {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Canvas camera={{ position: [0, -2.2, 2.2], fov: 50 }}>
				<color attach="background" args={[0x0a0a0a]} />
				<ambientLight intensity={0.6} />
				<directionalLight position={[3, 3, 5]} intensity={1.1} />

				<group position={[0, 0, 0]}>
					<group position={[-0.9, 0, 0]}>
						<Gear teeth={22} innerRadius={0.35} outerRadius={0.55} thickness={0.12} color="#c9a227" rotationSpeed={0.6} />
					</group>
					<group position={[0.6, 0.1, 0]}>
						<Gear teeth={28} innerRadius={0.28} outerRadius={0.5} thickness={0.12} color="#d6d0c4" rotationSpeed={-0.45} />
					</group>
					<group position={[0.1, -0.6, 0]}>
						<Gear teeth={18} innerRadius={0.25} outerRadius={0.42} thickness={0.12} color="#8c6c1f" rotationSpeed={0.75} />
					</group>
					<group position={[0.2, 0.55, 0]}>
						<BalanceWheel />
					</group>
				</group>

				<OrbitControls enableZoom={false} />
			</Canvas>
		</div>
	);
};


