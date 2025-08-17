import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `terminal-item ${isActive ? 'active' : ''}`
  return (
    <aside className="sidebar-root">
      <div className="sidebar-brand">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong style={{ fontFamily: 'Roboto Mono' }}>Quant CV</strong>
          <span style={{ color: 'var(--color-silver-400)' }}>Banque · Genève</span>
        </div>
        <span className="mono" style={{ color: 'var(--color-gold-600)' }}>DS</span>
      </div>
      <nav className="terminal-menu">
        <NavLink to="/" className={navLinkClass}>Profil</NavLink>
        <NavLink to="/skills" className={navLinkClass}>Compétences techniques</NavLink>
        <NavLink to="/projects" className={navLinkClass}>Projets Data</NavLink>
        <NavLink to="/performance" className={navLinkClass}>Performances</NavLink>
        <NavLink to="/banking" className={navLinkClass}>Expérience bancaire</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar


