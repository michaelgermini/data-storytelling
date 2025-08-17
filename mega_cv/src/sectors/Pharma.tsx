import { useMemo, useRef, useState } from 'react'
import ThreeCanvas from '../components/ThreeCanvas'
import DNA from '../components/DNA'
import Ticker from '../components/Ticker'
import KPIPanel from '../components/KPIPanel'
import StoryController from '../components/StoryController'
import { exportElementToPDF } from '../components/PDFExport'

export default function Pharma() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<'mol'|'map'|'kpi'>('mol')

  const kpis = useMemo(() => ([
    { label: 'Succès essais', value: '↑ +12% YoY' },
    { label: 'Insights AI/min', value: '≈ 180' },
    { label: 'Essais analysés (EMR/RWE)', value: '1,250+' },
    { label: 'Adaptatifs – amélioration', value: 'Z% cible' },
    { label: 'Traçabilité blockchain', value: '99.9%' },
    { label: 'Supply chain efficacy', value: '+18%' },
  ]), [])

  const tickerItems = [
    'X essais cliniques analysés (EMR/RWE)',
    'Y minutes insights AI/min',
    'Z% amélioration essais adaptatifs',
  ]

  return (
    <div className="page" ref={containerRef}>
      <div className="page-header">
        <h1>CV 3D – Big Pharma & Biotech</h1>
        <div className="actions">
          <button onClick={() => setStep('mol')}>Molécule</button>
          <button onClick={() => setStep('map')}>Réseau mondial</button>
          <button onClick={() => setStep('kpi')}>KPI</button>
          <button onClick={() => containerRef.current && exportElementToPDF(containerRef.current, 'cv_pharma.pdf')}>Export PDF</button>
        </div>
      </div>
      <ThreeCanvas>
        <DNA />
      </ThreeCanvas>

      <div className="overlay">
        <Ticker items={tickerItems} />
        <div className="sections">
          <section>
            <h2>Compétences</h2>
            <p>IA, RWE, supply chain, médecine personnalisée, blockchain</p>
          </section>
          <section>
            <h2>Projets</h2>
            <p>Études adaptatives, RWE, simulations temps réel, optimisation supply chain</p>
          </section>
        </div>
        <KPIPanel title="KPI" kpis={kpis} />
      </div>

      <StoryController
        steps={[
          { id: 'mol' },
          { id: 'map' },
          { id: 'kpi' },
        ]}
        currentStepId={step}
      />
    </div>
  )
}

