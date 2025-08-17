import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SceneRoot } from '../visuals/SceneRoot';
import { HUD } from '../visuals/HUD';
import { StoryControls } from '../visuals/StoryControls';
import { useRef } from 'react';
import { CameraRig } from '../visuals/CameraRig';
import { Popup } from '../visuals/Popup';

export const App: React.FC = () => {
  const controlsRef = useRef<any>(null);
  return (
    <div className="app-root">
      <Canvas camera={{ position: [4, 3, 5], fov: 55 }} shadows>
        <color attach="background" args={[0x0a0e16]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.1} castShadow />
        <SceneRoot />
        <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.1} />
        <CameraRig controlsRef={controlsRef} />
      </Canvas>
      <HUD />
      <Popup />
      <StoryControls />
    </div>
  );
};


