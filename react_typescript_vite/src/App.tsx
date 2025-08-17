import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Ticker from './components/Ticker'
import Home from './sections/Home'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Performance from './sections/Performance'
import BankingExperience from './sections/BankingExperience'
import Contact from './sections/Contact'
import './App.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onExport = async () => {
      const root = document.getElementById('app-root')
      if (!root) return
      const canvas = await html2canvas(root, { scale: 2, backgroundColor: '#0b1220' })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('CV-Data-Scientist-Geneve.pdf')
    }
    const handler = () => { void onExport() }
    window.addEventListener('export-pdf', handler as EventListener)
    return () => window.removeEventListener('export-pdf', handler as EventListener)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const pitch = params.get('pitch') === 'true'
    if (!pitch) return
    const sequence = ['/', '/skills', '/projects', '/performance', '/banking', '/contact']
    let index = 0
    const go = () => {
      navigate(sequence[index] + '?pitch=true')
      index = (index + 1) % sequence.length
    }
    go()
    const id = setInterval(go, 4200)
    return () => clearInterval(id)
  }, [location.search, navigate])

  const startPitch = () => {
    navigate('/?pitch=true')
  }

  return (
    <div id="app-root">
      <Sidebar />
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1>CV Data Scientist – Genève</h1>
          <span style={{ color: 'var(--color-silver-400)', fontFamily: 'Roboto Mono' }}>Style Banque & Investisseurs</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={startPitch}>Mode Investor Pitch</button>
          <a href="/" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('export-pdf')) }}>Export PDF</a>
        </div>
      </header>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/banking" element={<BankingExperience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <div className="app-ticker">
        <Ticker />
      </div>
    </div>
  )
}

export default App
