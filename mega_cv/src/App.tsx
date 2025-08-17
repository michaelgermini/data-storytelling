import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Pharma from './sectors/Pharma'
import Finance from './sectors/Finance'
import Insurance from './sectors/Insurance'
import Government from './sectors/Government'
import Environment from './sectors/Environment'
import Luxury from './sectors/Luxury'

function App() {
  return (
    <div className="app-root">
      <nav className="top-nav">
        <NavLink to="/pharma">Big Pharma & Biotech</NavLink>
        <NavLink to="/finance">Banque & Finance</NavLink>
        <NavLink to="/insurance">Assurance</NavLink>
        <NavLink to="/government">Gouvernement</NavLink>
        <NavLink to="/environment">Environnement</NavLink>
        <NavLink to="/luxury">Horlogerie & Luxe</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Pharma />} />
        <Route path="/pharma" element={<Pharma />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/government" element={<Government />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/luxury" element={<Luxury />} />
      </Routes>
    </div>
  )
}

export default App
