import { useRef } from 'react'
import ThreeCanvas from '../components/ThreeCanvas'
import Ticker from '../components/Ticker'
import KPIPanel from '../components/KPIPanel'
import { exportElementToPDF } from '../components/PDFExport'

export default function Luxury() {
  const containerRef = useRef<HTMLDivElement>(null)
  const kpis = [
    { label: 'Volumes', value: '↑ 14%' },
    { label: 'Parts marché', value: '8.2%' },
    { label: 'Digitalisation supply chain', value: 'Mature' },
  ]
  const ticker = [
    'Volumes', 'Parts marché', 'Digitalisation supply chain'
  ]
  return (
    <div className="page" ref={containerRef}>
      <div className="page-header">
        <h1>CV 3D – Horlogerie & Luxe</h1>
        <div className="actions">
          <button onClick={() => containerRef.current && exportElementToPDF(containerRef.current, 'cv_luxury.pdf')}>Export PDF</button>
        </div>
      </div>
      <ThreeCanvas>
        {/* 3D watch model placeholder */}
      </ThreeCanvas>
      <div className="overlay">
        <Ticker items={ticker} />
        <div className="sections">
          <section>
            <h2>Compétences</h2>
            <p>Supply chain, tendances marchés, storytelling luxe</p>
          </section>
          <section>
            <h2>Projets</h2>
            <p>Cartographie sites, optimisation production, dashboard ventes</p>
          </section>
        </div>
        <KPIPanel title="KPI" kpis={kpis} />
      </div>
    </div>
  )
}

