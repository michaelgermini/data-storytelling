import React from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

interface Props {
	onReady: (start: () => void) => void;
}

export const GuidedStory: React.FC<Props> = ({ onReady }) => {
	const { camera, gl } = useThree();

	React.useEffect(() => {
		const start = () => {
			const tl = gsap.timeline();
			ttl.to(camera.position, { x: 8, y: 6, z: 10, duration: 1.2, ease: 'power2.out' })
				.to(camera.position, { x: 2, y: 4, z: 8, duration: 1.4, ease: 'power2.inOut' })
				.to(camera.position, { x: 0, y: 3, z: 6, duration: 1.0, ease: 'power2.inOut' })
				.to(camera.position, { x: 5, y: 4, z: -2, duration: 1.2, ease: 'power2.inOut' })
				.to(camera.position, { x: 10, y: 7, z: 10, duration: 1.4, ease: 'power2.inOut' });
			tl.play(0);
		};
		onReady(start);
	}, [camera, gl, onReady]);

	return null;
};



