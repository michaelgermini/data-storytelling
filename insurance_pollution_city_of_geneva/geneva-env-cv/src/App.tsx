import { NavLink, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './index.css'

const Home = lazy(() => import('./pages/Home'))
const Skills = lazy(() => import('./pages/Skills'))
const Projects = lazy(() => import('./pages/Projects'))
const KpiImpact = lazy(() => import('./pages/KpiImpact'))
const Experience = lazy(() => import('./pages/Experience'))
const Contact = lazy(() => import('./pages/Contact'))
const Profile = lazy(() => import('./pages/Profile'))
const GenevaStory = lazy(() => import('./pages/GenevaStory'))

function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <nav className="menu">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
          <NavLink to="/profil" className={({ isActive }) => isActive ? 'active' : ''}>Profil</NavLink>
          <NavLink to="/competences" className={({ isActive }) => isActive ? 'active' : ''}>Compétences</NavLink>
          <NavLink to="/projets" className={({ isActive }) => isActive ? 'active' : ''}>Projets Pollution</NavLink>
          <NavLink to="/kpi" className={({ isActive }) => isActive ? 'active' : ''}>KPI & Impact</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>Expérience secteur</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
          <NavLink to="/story" className={({ isActive }) => isActive ? 'active' : ''}>Storytelling</NavLink>
        </nav>
      </aside>
      <header className="header">
        <div className="ticker">
          <span>8+ années d’expérience</span>
          <span>25+ bases environnementales analysées</span>
          <span>12% réduction d’impact</span>
        </div>
      </header>
      <main className="main">
        <Suspense fallback={<div className="section">Chargement…</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profil', element: <Profile /> },
      { path: 'competences', element: <Skills /> },
      { path: 'projets', element: <Projects /> },
      { path: 'kpi', element: <KpiImpact /> },
      { path: 'experience', element: <Experience /> },
      { path: 'contact', element: <Contact /> },
      { path: 'story', element: <GenevaStory /> },
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
