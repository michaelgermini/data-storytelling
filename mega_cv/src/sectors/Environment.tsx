import { useRef } from 'react'
import ThreeCanvas from '../components/ThreeCanvas'
import Ticker from '../components/Ticker'
import KPIPanel from '../components/KPIPanel'
import { exportElementToPDF } from '../components/PDFExport'

export default function Environment() {
  const containerRef = useRef<HTMLDivElement>(null)
  const kpis = [
    { label: 'Qualité air', value: 'AQI 42' },
    { label: 'Émissions CO₂', value: '-18% YoY' },
    { label: 'Énergie renouvelable', value: '62%' },
  ]
  const ticker = [
    'Émissions analysées', 'Projets verts', 'Indicateurs énergie'
  ]
  return (
    <div className="page" ref={containerRef}>
      <div className="page-header">
        <h1>CV 3D – Environnement & Énergie</h1>
        <div className="actions">
          <button onClick={() => containerRef.current && exportElementToPDF(containerRef.current, 'cv_environment.pdf')}>Export PDF</button>
        </div>
      </div>
      <ThreeCanvas>
        {/* 3D city + climate layers could be added */}
      </ThreeCanvas>
      <div className="overlay">
        <Ticker items={ticker} />
        <div className="sections">
          <section>
            <h2>Sections</h2>
            <p>Qualité air, énergie renouvelable, modélisation et KPI durabilité</p>
          </section>
        </div>
        <KPIPanel title="KPI" kpis={kpis} />
      </div>
    </div>
  )
}

