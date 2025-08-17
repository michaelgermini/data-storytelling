import { useRef } from 'react'
import ThreeCanvas from '../components/ThreeCanvas'
import Ticker from '../components/Ticker'
import KPIPanel from '../components/KPIPanel'
import { exportElementToPDF } from '../components/PDFExport'

export default function Finance() {
  const containerRef = useRef<HTMLDivElement>(null)
  const kpis = [
    { label: 'Sharpe ratio', value: '1.8' },
    { label: 'Max drawdown', value: '-6.5%' },
    { label: 'Alpha (annualisé)', value: '+3.1%' },
  ]
  const ticker = [
    'Portefeuilles analysés: 320+',
    'Performance moyenne: +12.4% YoY',
    'Modèles prédictifs: LSTM/Prophet/XGBoost',
  ]
  return (
    <div className="page" ref={containerRef}>
      <div className="page-header">
        <h1>CV 3D – Finance / Bourse Suisse</h1>
        <div className="actions">
          <button onClick={() => containerRef.current && exportElementToPDF(containerRef.current, 'cv_finance.pdf')}>Export PDF</button>
        </div>
      </div>
      <ThreeCanvas>
        {/* Placeholder 3D scene (indices, map wireframe could be added) */}
      </ThreeCanvas>
      <div className="overlay">
        <Ticker items={ticker} />
        <div className="sections">
          <section>
            <h2>Compétences</h2>
            <p>ML financier, Python, API Bloomberg/Refinitiv, risk, backtesting</p>
          </section>
          <section>
            <h2>Projets</h2>
            <p>Prédictions SMI, volatilité implicite, allocation factorielle</p>
          </section>
        </div>
        <KPIPanel title="KPI" kpis={kpis} />
      </div>
    </div>
  )
}

