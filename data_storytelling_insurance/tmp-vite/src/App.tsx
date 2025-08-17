import { NavLink, Route, Routes } from 'react-router-dom'
import { Home } from './sections/Home'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Kpi } from './sections/Kpi'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="dot" />
          Data Scientist – Analyse de Risques & Assurance · Genève
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
          <NavLink to="/profil" className={({ isActive }) => isActive ? 'active' : ''}>Profil</NavLink>
          <NavLink to="/competences" className={({ isActive }) => isActive ? 'active' : ''}>Compétences</NavLink>
          <NavLink to="/projets" className={({ isActive }) => isActive ? 'active' : ''}>Projets</NavLink>
          <NavLink to="/kpi" className={({ isActive }) => isActive ? 'active' : ''}>KPI & Résultats</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>Expérience</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Home mode="profile" />} />
          <Route path="/competences" element={<Skills />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/kpi" element={<Kpi />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="ticker">
        <span><b>9+</b> années d’expérience</span>
        <span><b>500M+</b> lignes de données traitées</span>
        <span><b>18%</b> réduction sinistres</span>
        <span><b>+6 pts</b> satisfaction client</span>
      </footer>
    </div>
  )
}
