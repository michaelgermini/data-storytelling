import React, { useMemo } from 'react';
import * as THREE from 'three';
import { bases } from '../../data/bases';
import { useSelectionStore } from '../../store/selectionStore';

export const BaseMarkers: React.FC = () => {
  const select = useSelectionStore(s => s.select);
  const geo = useMemo(() => new THREE.SphereGeometry(0.06, 16, 16), []);
  return (
    <group>
      {bases.map((b) => (
        <mesh
          key={b.id}
          position={[b.position[0], b.position[1], b.position[2]]}
          geometry={geo}
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            select({
              id: b.id,
              name: b.name,
              type: 'base',
              canton: b.canton,
              summary: b.summary,
              metrics: b.metrics,
              skills: b.skills,
              experiences: b.experiences
            });
          }}
        >
          <meshStandardMaterial color={0x46a0ff} emissive={0x1a6fb8} emissiveIntensity={1.4} />
        </mesh>
      ))}
    </group>
  );
};


