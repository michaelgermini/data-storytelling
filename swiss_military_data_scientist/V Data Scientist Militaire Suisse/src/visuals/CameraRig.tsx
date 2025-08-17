import React, { MutableRefObject, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useStoryStore } from '../store/storyStore';

type OrbitControlsImpl = any;

interface CameraRigProps {
	controlsRef: MutableRefObject<OrbitControlsImpl | null>;
}

export const CameraRig: React.FC<CameraRigProps> = ({ controlsRef }) => {
	const { camera } = useThree();
	const desiredPos = useRef(new THREE.Vector3());
	const desiredTarget = useRef(new THREE.Vector3());
	const cameraPosition = useStoryStore(s => s.cameraPosition);
	const cameraTarget = useStoryStore(s => s.cameraTarget);

	useFrame(() => {
		desiredPos.current.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
		desiredTarget.current.set(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
		camera.position.lerp(desiredPos.current, 0.06);
		if (controlsRef.current) {
			const target = (controlsRef.current as any).target as THREE.Vector3;
			target.lerp(desiredTarget.current, 0.08);
			(controlsRef.current as any).update();
		}
	});
	return null;
};


