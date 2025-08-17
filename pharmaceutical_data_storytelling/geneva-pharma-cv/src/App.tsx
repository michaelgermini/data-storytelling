import { NavLink, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))
const Skills = lazy(() => import('./pages/Skills'))
const Projects = lazy(() => import('./pages/Projects'))
const Kpis = lazy(() => import('./pages/Kpis'))
const Experience = lazy(() => import('./pages/Experience'))
const Contact = lazy(() => import('./pages/Contact'))

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">GENEVA PHARMA DATA</div>
        <nav className="nav">
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/profil">Profil</NavLink>
          <NavLink to="/competences">Compétences</NavLink>
          <NavLink to="/projets">Projets pharmaceutiques</NavLink>
          <NavLink to="/kpi">KPI & Résultats</NavLink>
          <NavLink to="/experience">Expérience secteur</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </aside>
      <header className="header">
        <div className="ticker">
          <span>8 ans en analyse pharma</span>
          <span>120 essais cliniques analysés</span>
          <span>+18% efficacité moyenne</span>
        </div>
        <button id="export-pdf">Exporter PDF</button>
      </header>
      <main className="main">
        <Suspense fallback={<div>Chargement...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/competences" element={<Skills />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/kpi" element={<Kpis />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
