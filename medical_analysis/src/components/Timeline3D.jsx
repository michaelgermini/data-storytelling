import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';

function Case({ position, title, result }) {
	return (
		<Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
			<mesh position={position}>
				<boxGeometry args={[1.1, 0.6, 0.2]} />
				<meshStandardMaterial color="#e6f7f5" />
				<Html center>
					<div className="case-card">
						<div className="title">{title}</div>
						<div className="result">{result}</div>
					</div>
				</Html>
			</mesh>
		</Float>
	);
}

export default function Timeline3D() {
	return (
		<div className="timeline3d">
			<Canvas camera={{ position: [0, 1.2, 5], fov: 55 }}>
				<ambientLight intensity={0.6} />
				<directionalLight position={[3, 5, 5]} intensity={1} />
				<gridHelper args={[12, 12, '#a5e6df', '#e6f7f5']} />
				<Case position={[-2, 0.5, 0]} title="Prédiction d’épidémie" result="AUC 0.92" />
				<Case position={[0, 0.2, 0]} title="Détection précoce cancer" result="Sensibilité 89%" />
				<Case position={[2, 0.8, 0]} title="Parcours patient" result="-22% délai" />
				<OrbitControls enableZoom={false} />
			</Canvas>
		</div>
	);
}

