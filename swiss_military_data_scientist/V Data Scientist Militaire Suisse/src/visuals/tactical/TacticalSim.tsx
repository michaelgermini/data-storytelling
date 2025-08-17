import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface TacticalSimProps {
  active: boolean;
}

export const TacticalSim: React.FC<TacticalSimProps> = ({ active }) => {
  const count = 4000;
  const geom = useMemo(() => new THREE.BufferGeometry(), []);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const colors = useMemo(() => new Float32Array(count * 3), [count]);
  const pointsRef = useRef<THREE.Points>(null);

  useMemo(() => {
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx + 0] = (Math.random() - 0.5) * 2.4;
      positions[idx + 1] = Math.random() * 0.6 + 0.05;
      positions[idx + 2] = (Math.random() - 0.5) * 1.6;
      colors[idx + 0] = 0.0;
      colors[idx + 1] = 1.0;
      colors[idx + 2] = 0.7;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, [geom, positions, colors, count]);

  const mat = useMemo(() => new THREE.PointsMaterial({ size: 0.02, vertexColors: true, transparent: true }), []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const arr = geom.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const baseY = positions[idx + 1];
      arr.array[idx + 1] = baseY + Math.sin(i * 0.13 + t * 2.1) * 0.03;
    }
    arr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = active ? 0.9 : 0.0;
    pointsRef.current.visible = active;
  });

  return <points ref={pointsRef} geometry={geom} material={mat} />;
};


