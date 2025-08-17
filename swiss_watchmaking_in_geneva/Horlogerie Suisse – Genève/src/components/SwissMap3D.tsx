import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

type Pin = { label: string; position: [number, number, number] };

const pins: Pin[] = [
	{ label: 'Genève', position: [-0.8, -0.2, 0.05] },
	{ label: 'Vallée de Joux', position: [-0.4, 0.1, 0.05] },
	{ label: 'Neuchâtel', position: [0.2, 0.25, 0.05] },
	{ label: 'Bienne', position: [0.35, 0.15, 0.05] },
];

const MapPlane: React.FC = () => {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]}>
			<planeGeometry args={[3.2, 2.2, 1, 1]} />
			<meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.9} />
		</mesh>
	);
};

const PinDot: React.FC<Pin> = ({ label, position }) => {
	return (
		<group position={position}>
			<mesh>
				<sphereGeometry args={[0.035, 16, 16]} />
				<meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.35} />
			</mesh>
			<Html position={[0.06, 0.04, 0]} style={{ pointerEvents: 'none', color: '#e7e2d9', fontSize: 12 }}>
				{label}
			</Html>
		</group>
	);
};

export const SwissMap3D: React.FC = () => {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Canvas camera={{ position: [0, 1.8, 2.2], fov: 50 }}>
				<color attach="background" args={[0x0a0a0a]} />
				<ambientLight intensity={0.6} />
				<directionalLight position={[3, 3, 5]} intensity={1.1} />
				<MapPlane />
				{pins.map((p) => (
					<PinDot key={p.label} {...p} />
				))}
				<OrbitControls enableZoom={false} />
			</Canvas>
		</div>
	);
};


