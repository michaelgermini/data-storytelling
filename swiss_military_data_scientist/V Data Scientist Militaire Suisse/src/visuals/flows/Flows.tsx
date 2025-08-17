import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface FlowsProps {
  active: string[];
}

export const Flows: React.FC<FlowsProps> = ({ active }) => {
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: 0x46a0ff }), []);
  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.1, 0.12, -0.4),
    new THREE.Vector3(-0.2, 0.25, -0.1),
    new THREE.Vector3(0.6, 0.18, 0.1),
    new THREE.Vector3(1.2, 0.14, 0.3)
  ]), []);

  const points = useMemo(() => curve.getPoints(200), [curve]);
  useMemo(() => geometry.setFromPoints(points), [geometry, points]);

  const dashTex = useMemo(() => {
    const size = 128;
    const data = new Uint8Array(size * 4);
    for (let i = 0; i < size; i++) {
      const on = i % 32 < 16 ? 255 : 20;
      data[i*4+0] = 70; // r
      data[i*4+1] = 160; // g
      data[i*4+2] = 255; // b
      data[i*4+3] = on;
    }
    const tex = new THREE.DataTexture(data, size, 1, THREE.RGBAFormat);
    tex.needsUpdate = true;
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }, []);

  const tube = useMemo(() => new THREE.Mesh(
    new THREE.TubeGeometry(curve, 120, 0.01, 8, false),
    new THREE.MeshBasicMaterial({ map: dashTex, transparent: true, color: 0xffffff })
  ), [curve, dashTex]);

  useFrame(({ clock }) => {
    if (!('logistics' in {})) return; // keep referenced
    const t = clock.getElapsedTime();
    const mat = tube.material as THREE.MeshBasicMaterial;
    if (mat.map) {
      mat.map.offset.x = (t * 0.25) % 1;
    }
    tube.visible = active.includes('logistics');
  });

  return (
    <group>
      <primitive object={tube} />
      <line geometry={geometry} material={material} />
    </group>
  );
};


