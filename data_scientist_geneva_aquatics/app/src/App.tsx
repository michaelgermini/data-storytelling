import React, { useEffect, useState } from 'react'
import './index.css'
import { MapScene } from './components/MapScene'
import { loadGeojson } from './lib/loadData'

function Header() {
  return (
    <header className="header" role="banner">
      <div>
        <strong>Genève Aquatique 3D</strong>
        <span style={{ opacity: 0.7, marginLeft: 8 }}>Portfolio – Data Scientist · Environnement & Hydrologie</span>
      </div>
      <nav aria-label="Liens">
        <a href="#" aria-label="GitHub" style={{ color: 'var(--accent-2)', marginRight: 12 }}>GitHub</a>
        <a href="#" aria-label="LinkedIn" style={{ color: 'var(--accent)' }}>LinkedIn</a>
      </nav>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar" role="complementary">
      <h3 style={{ marginTop: 0 }}>Profil</h3>
      <ul>
        <li>Genève, CH</li>
        <li>Hydrologie, qualité, risques</li>
        <li>Python, R, SQL, ML</li>
      </ul>
      <h3>Compétences</h3>
      <ul>
        <li>Three.js / Deck.gl / Mapbox</li>
        <li>D3.js, GSAP, accessibilité</li>
        <li>QGIS, PostGIS, turf.js</li>
      </ul>
      <h3>Tabs</h3>
      <div role="tablist" aria-label="Sections CV">
        <button role="tab" aria-selected="true">Projets</button>
        <button role="tab" aria-selected="false">Publications</button>
        <button role="tab" aria-selected="false">Contact</button>
      </div>
    </aside>
  )
}

function Legend() {
  return (
    <div className="legend" aria-live="polite">
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Légende</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ width: 14, height: 4, background: 'var(--accent-2)', display: 'inline-block' }} />
        <span>Débit (largeur)</span>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
        <span style={{ width: 14, height: 14, background: 'var(--alert)', borderRadius: 2, display: 'inline-block' }} />
        <span>Turbidité (couleur)</span>
      </div>
    </div>
  )
}

export default function App() {
  const [rivers, setRivers] = useState<any | null>(null)
  const [stations, setStations] = useState<any | null>(null)

  useEffect(() => {
    loadGeojson('/data/rivers.geojson').then(setRivers).catch(() => setRivers(null))
    loadGeojson('/data/stations.geojson').then(setStations).catch(() => setStations(null))
  }, [])

  return (
    <div className="app-shell">
      <Header />
      <Sidebar />
      <main className="main">
        <div className="map-container" role="application" aria-label="Carte 3D Genève">
          <MapScene rivers={rivers ?? undefined} stations={stations ?? undefined} />
        </div>
        <Legend />
      </main>
    </div>
  )
}
