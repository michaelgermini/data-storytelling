import { useRef, useState } from 'react'
import ThreeCanvas from '../components/ThreeCanvas'
import Ticker from '../components/Ticker'
import KPIPanel from '../components/KPIPanel'
import { exportElementToPDF } from '../components/PDFExport'
import StoryController from '../components/StoryController'

export default function Insurance() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<'roadmap'|'kpi'>('roadmap')
  const ticker = [
    'Réduction underwriting: -35% temps',
    '% personnalisation: 92%',
    'Efficacité claims: +28%'
  ]
  const kpis = [
    { label: 'Temps sinistre', value: '-31%' },
    { label: 'Fraude détectée', value: '+21%' },
    { label: 'Performance ESG', value: 'AA' },
  ]
  return (
    <div className="page" ref={containerRef}>
      <div className="page-header">
        <h1>CV 3D – Assurance & Réassurance</h1>
        <div className="actions">
          <button onClick={() => setStep('roadmap')}>Story</button>
          <button onClick={() => setStep('kpi')}>KPI</button>
          <button onClick={() => containerRef.current && exportElementToPDF(containerRef.current, 'cv_insurance.pdf')}>Export PDF</button>
        </div>
      </div>
      <ThreeCanvas>
        {/* 3D map & data flows could be added */}
      </ThreeCanvas>
      <div className="overlay">
        <Ticker items={ticker} />
        <div className="sections">
          <section>
            <h2>Compétences</h2>
            <p>IA, usage-based, API-first, hybrid cloud, NLP, EBM, IA explicable</p>
          </section>
          <section>
            <h2>Projets</h2>
            <p>Underwriting GenAI, télématique, sinistres automatisés, risque climatique ESG</p>
          </section>
        </div>
        <KPIPanel title="KPI" kpis={kpis} />
      </div>
      <StoryController
        steps={[{ id: 'roadmap' }, { id: 'kpi' }]}
        currentStepId={step}
      />
    </div>
  )
}

