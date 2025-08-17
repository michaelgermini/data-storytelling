import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'

export function UiOverlay() {
  const {
    activeLayers,
    toggleLayer,
    selectedRegion,
    projectsByRegion,
    isStoryPlaying,
    setStoryPlaying,
    setCameraTarget,
    setCameraPosition,
  } = useAppStore()

  const projects = useMemo(() => selectedRegion ? projectsByRegion[selectedRegion] : [], [selectedRegion, projectsByRegion])

  const startStory = () => {
    setStoryPlaying(true)
    // Simple scripted camera tour over four cities
    const sequence: Array<{ pos: [number, number, number], target: [number, number, number], label: string }> = [
      { pos: [0, 2.5, 6], target: [0, 0, 0], label: 'Intro' },
      { pos: [-1.0, 1.4, -1.2], target: [-1.2, 0.1, -0.6], label: 'Genève' },
      { pos: [0.9, 1.6, 0.9], target: [0.9, 0.1, 0.2], label: 'Zurich' },
      { pos: [-0.4, 1.3, -0.1], target: [-0.2, 0.1, -0.1], label: 'Lausanne' },
      { pos: [1.1, 1.5, -0.5], target: [1.1, 0.1, -0.9], label: 'Bâle' },
    ]

    let step = 0
    const tick = () => {
      const s = sequence[step]
      setCameraPosition(s.pos)
      setCameraTarget(s.target)
      step = (step + 1) % sequence.length
      if (step !== 0) setTimeout(tick, 2500)
      else setStoryPlaying(false)
    }
    tick()
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: 12, pointerEvents: 'auto' }}>
        <div style={{ fontWeight: 700 }}>Suisse Durable 3D – Portfolio Data</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={startStory} disabled={isStoryPlaying}>
            Lecture
          </button>
        </div>
      </div>

      {/* Left layer toggles */}
      <div style={{ position: 'absolute', top: 64, left: 12, display: 'grid', gap: 8, pointerEvents: 'auto' }}>
        {Object.entries(activeLayers).map(([k, v]) => (
          <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: 6 }}>
            <input type="checkbox" checked={v} onChange={() => toggleLayer(k as any)} />
            {k}
          </label>
        ))}
      </div>

      {/* Right projects panel */}
      {selectedRegion && (
        <div style={{ position: 'absolute', right: 12, top: 64, width: 320, background: 'rgba(255,255,255,0.96)', borderRadius: 8, padding: 12, pointerEvents: 'auto', boxShadow: '0 6px 24px rgba(0,0,0,0.15)' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Projets – {selectedRegion}</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {projects.map((p, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: 10 }}>
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#374151' }}>{p.description}</div>
                <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.skills.map((s) => (
                    <span key={s} style={{ fontSize: 11, background: '#eef2ff', color: '#3730a3', padding: '2px 6px', borderRadius: 999 }}>{s}</span>
                  ))}
                </div>
                <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {p.kpis.map((k) => (
                    <div key={k.label} style={{ background: '#f9fafb', borderRadius: 6, padding: 6, fontSize: 12 }}>
                      <div style={{ color: '#6b7280' }}>{k.label}</div>
                      <div style={{ fontWeight: 700 }}>{k.value} {k.unit ?? ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



