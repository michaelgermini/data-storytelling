import { useRef } from 'react'
import ThreeCanvas from '../components/ThreeCanvas'
import Ticker from '../components/Ticker'
import KPIPanel from '../components/KPIPanel'
import { exportElementToPDF } from '../components/PDFExport'

export default function Government() {
  const containerRef = useRef<HTMLDivElement>(null)
  const kpis = [
    { label: 'Projets open data', value: '24' },
    { label: 'Indicateurs sociaux', value: '80+' },
    { label: 'Impact citoyen', value: '↑ élevé' },
  ]
  const ticker = [
    'Open data', 'Dashboards publics', 'Storytelling visuel',
  ]
  return (
    <div className="page" ref={containerRef}>
      <div className="page-header">
        <h1>CV 3D – Gouvernance & Données Publiques</h1>
        <div className="actions">
          <button onClick={() => containerRef.current && exportElementToPDF(containerRef.current, 'cv_government.pdf')}>Export PDF</button>
        </div>
      </div>
      <ThreeCanvas>
        {/* Switzerland cantons mesh could be added */}
      </ThreeCanvas>
      <div className="overlay">
        <Ticker items={ticker} />
        <div className="sections">
          <section>
            <h2>Sections</h2>
            <p>Données socio-économiques, mobilité, durabilité, résultats politiques</p>
          </section>
        </div>
        <KPIPanel title="KPI" kpis={kpis} />
      </div>
    </div>
  )
}

