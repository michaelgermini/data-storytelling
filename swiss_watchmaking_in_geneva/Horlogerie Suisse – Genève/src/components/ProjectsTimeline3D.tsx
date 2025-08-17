import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

type Step = { label: string; color: string };

const STEPS: Step[] = [
	{ label: 'Conception', color: '#8c6c1f' },
	{ label: 'Prototypage', color: '#c9a227' },
	{ label: 'Production', color: '#d6d0c4' },
	{ label: 'Contrôle qualité', color: '#8c6c1f' },
	{ label: 'Distribution', color: '#c9a227' },
];

const Node: React.FC<{ idx: number; step: Step }> = ({ idx, step }) => {
	const x = useMemo(() => -1.2 + idx * 0.6, [idx]);
	return (
		<group position={[x, 0, 0]}>
			<mesh>
				<sphereGeometry args={[0.08, 24, 24]} />
				<meshStandardMaterial color={step.color} metalness={0.6} roughness={0.3} />
			</mesh>
			<Html position={[0, 0.18, 0]} style={{ color: '#e7e2d9', fontSize: 12 }}>
				{step.label}
			</Html>
		</group>
	);
};

const Edge: React.FC<{ from: number; to: number }> = ({ from, to }) => {
	const x1 = -1.2 + from * 0.6;
	const x2 = -1.2 + to * 0.6;
	const mid = (x1 + x2) / 2;
	return (
		<group>
			<mesh position={[mid, 0, 0]} rotation={[0, 0, 0]}>
				<boxGeometry args={[x2 - x1, 0.02, 0.02]} />
				<meshStandardMaterial color="#555" />
			</mesh>
		</group>
	);
};

export const ProjectsTimeline3D: React.FC = () => {
	return (
		<div style={{ width: '100%', height: 260 }}>
			<Canvas camera={{ position: [0, 0.8, 2.2], fov: 50 }}>
				<color attach="background" args={[0x0a0a0a]} />
				<ambientLight intensity={0.6} />
				<directionalLight position={[3, 3, 5]} intensity={1.1} />
				{STEPS.map((s, i) => (
					<Node key={s.label} idx={i} step={s} />
				))}
				{STEPS.slice(0, -1).map((_, i) => (
					<Edge key={i} from={i} to={i + 1} />
				))}
				<OrbitControls enableZoom={false} />
			</Canvas>
		</div>
	);
};


