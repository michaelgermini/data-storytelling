import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Scene } from '../viz/Scene';
import { GuidedStory } from '../viz/GuidedStory';

import { HUD } from './HUD';

export const App: React.FC = () => {
	const storyRef = React.useRef<() => void | null>(null);

	return (
		<>
			<div className="overlay">
				<div>Loisirs 3D – Portfolio interactif</div>
				<button onClick={() => storyRef.current && storyRef.current()}>Lecture</button>
			</div>
			<Canvas camera={{ position: [10, 8, 10], fov: 45 }} shadows>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 10, 5]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
				<Environment preset="city" />
				<OrbitControls enableDamping makeDefault />
				<Scene />
				<GuidedStory onReady={(start) => (storyRef.current = start)} />
			</Canvas>
			<HUD />
		</>
	);
};


