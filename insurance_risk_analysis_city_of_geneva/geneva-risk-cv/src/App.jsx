import './App.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useHeaderActions } from './hooks/useHeaderActions'

const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))
const Skills = lazy(() => import('./pages/Skills'))
const Projects = lazy(() => import('./pages/Projects'))
const Kpis = lazy(() => import('./pages/Kpis'))
const Experience = lazy(() => import('./pages/Experience'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  useHeaderActions()
  return (
    <BrowserRouter>
      <div className="app app-shell">
        <aside className="side">
          <div className="menu">
            <div className="brand">
              <span className="brand-accent">GENEVA</span> RISK CV
            </div>
            <div className="menu-section">Navigation</div>
            <NavLink to="/" end className={({isActive}) => `menu-item ${isActive ? 'active' : ''}`}>Accueil</NavLink>
            <NavLink to="/profile" className={({isActive}) => `menu-item ${isActive ? 'active' : ''}`}>Profil</NavLink>
            <NavLink to="/skills" className={({isActive}) => `menu-item ${isActive ? 'active' : ''}`}>Compétences</NavLink>
            <NavLink to="/projects" className={({isActive}) => `menu-item ${isActive ? 'active' : ''}`}>Projets Genève</NavLink>
            <NavLink to="/kpis" className={({isActive}) => `menu-item ${isActive ? 'active' : ''}`}>KPI & Résultats</NavLink>
            <NavLink to="/experience" className={({isActive}) => `menu-item ${isActive ? 'active' : ''}`}>Expérience secteur</NavLink>
            <NavLink to="/contact" className={({isActive}) => `menu-item ${isActive ? 'active' : ''}`}>Contact</NavLink>
          </div>
        </aside>
        <header className="header">
          <div className="ticker">
            <div className="ticker-item"><span className="ticker-value">8+</span><span className="ticker-label">années d'expérience</span></div>
            <div className="ticker-item"><span className="ticker-value">25M+</span><span className="ticker-label">CHF de données analysées</span></div>
            <div className="ticker-item"><span className="ticker-value">-18%</span><span className="ticker-label">réduction des risques</span></div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <a className="btn" href="#" id="story-btn">Storytelling</a>
            <a className="btn" href="#" id="export-btn">Exporter PDF</a>
          </div>
        </header>
        <main className="main">
          <Suspense fallback={<div style={{padding:16}}>Chargement…</div>}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/skills" element={<Skills/>} />
              <Route path="/projects" element={<Projects/>} />
              <Route path="/kpis" element={<Kpis/>} />
              <Route path="/experience" element={<Experience/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
          </Suspense>
        </main>
        <footer className="footer">Ville de Genève — Assurance & Analyse de Risques</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
