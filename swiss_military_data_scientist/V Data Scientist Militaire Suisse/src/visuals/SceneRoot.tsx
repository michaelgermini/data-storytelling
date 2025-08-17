import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStoryStore } from '../store/storyStore';
import { Flows } from './flows/Flows';
import { TacticalSim } from './tactical/TacticalSim';
import { BaseMarkers } from './markers/BaseMarkers';

const SwitzerlandShape: React.FC = () => {
  // Placeholder: stylized extruded plane approximating Switzerland outline.
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.8, -0.9);
    shape.bezierCurveTo(-1.5, -1.0, -0.8, -1.0, -0.4, -0.8);
    shape.bezierCurveTo(0.6, -0.6, 1.5, -0.7, 1.8, -0.2);
    shape.bezierCurveTo(1.9, 0.3, 1.4, 0.6, 0.9, 0.7);
    shape.bezierCurveTo(0.5, 0.9, -0.5, 1.0, -1.2, 0.7);
    shape.bezierCurveTo(-1.9, 0.5, -2.0, -0.2, -1.8, -0.9);
    const extrude = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false });
    extrude.rotateX(-Math.PI / 2);
    return extrude;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial color={0x1d2a3a} metalness={0.1} roughness={0.9} />
    </mesh>
  );
};

export const SceneRoot: React.FC = () => {
  const phase = useStoryStore(s => s.phase);
  const timeOfDay = useStoryStore(s => s.timeOfDay);

  useFrame(({ scene }) => {
    // Basic day/night tint
    const isNight = timeOfDay === 'night';
    (scene.background as THREE.Color).set(isNight ? 0x05070c : 0x0a0e16);
  });

  return (
    <group>
      <SwitzerlandShape />
      <BaseMarkers />
      <Flows active={phase !== 'intro' ? ['logistics'] : []} />
      <TacticalSim active={phase === 'tactics'} />
    </group>
  );
};


