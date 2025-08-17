import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { create } from 'zustand'
import { StoreScene } from '../view3d/StoreScene'
import { GuidedStory } from '../view3d/GuidedStory'
import { RealtimePanel } from './RealtimePanel'

type UiState = {
  playing: boolean
  setPlaying: (v: boolean) => void
}

const useUi = create<UiState>((set) => ({
  playing: false,
  setPlaying: (v) => set({ playing: v }),
}))

export function App() {
  const playing = useUi((s) => s.playing)
  const setPlaying = useUi((s) => s.setPlaying)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [14, 10, 16], fov: 45 }} shadows>
        <color attach="background" args={[0x0b0f14]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 12, 6]} castShadow intensity={1.1} />
        <Suspense fallback={<Html>Chargement…</Html>}>
          <StoreScene />
        </Suspense>
        <Stars radius={80} depth={40} count={5000} factor={4} fade />
        <OrbitControls enableDamping dampingFactor={0.08} />
        {playing && <GuidedStory onEnd={() => setPlaying(false)} />}
      </Canvas>

      <div className="hud">
        <div className="topbar">
          <div style={{ fontWeight: 800 }}>Retail 3D – Portfolio interactif</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={() => setPlaying(!playing)}>
              {playing ? 'Stop' : 'Lecture'}
            </button>
          </div>
        </div>
        <div className="panel">
          <RealtimePanel />
        </div>
      </div>
    </div>
  )
}


