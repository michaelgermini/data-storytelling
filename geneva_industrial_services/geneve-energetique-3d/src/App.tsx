function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0e13', color: '#e6edf3' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottom: '1px solid #1f2a35' }}>
        <strong>Genève Énergétique 3D</strong>
        <nav style={{ display: 'flex', gap: 12 }}>
          <button>Carte</button>
          <button>Story</button>
          <button>CV</button>
        </nav>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 360px' }}>
        <section style={{ height: 'calc(100vh - 58px)', display: 'grid', placeItems: 'center' }}>
          <div style={{ opacity: 0.8, textAlign: 'center', maxWidth: 720, padding: 24 }}>
            Scaffold prêt. Couches 3D et données mock seront ajoutées ensuite.
          </div>
        </section>
        <aside style={{ borderLeft: '1px solid #1f2a35', height: 'calc(100vh - 58px)', padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Portfolio CV</h2>
          <ul>
            <li>Compétences</li>
            <li>Expériences</li>
            <li>Projets</li>
            <li>Liens</li>
          </ul>
        </aside>
      </main>
    </div>
  )
}

export default App
