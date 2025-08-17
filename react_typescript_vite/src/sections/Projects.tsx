const projects = [
  { title: 'Analyse risque crédit', roi: 'ROI 5.4x', impact: 'Réduction du taux de défaut -18%', details: 'Modèles PD/LGD, segmentation clients' },
  { title: 'Détection fraude', roi: 'ROI 3.1x', impact: 'Réduction pertes -37%', details: 'Graph ML, règles temps réel' },
  { title: 'Scoring clients premium', roi: 'ROI 2.6x', impact: '+12% upsell', details: 'XGBoost, SHAP, dashboard RM' },
]

const Projects = () => {
  return (
    <section className="section">
      <div className="section-grid">
        <div className="panel glass-panel" style={{ gridColumn: 'span 7' }}>
          <h2>Pitch Investisseurs – Projets Data</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {projects.map((p) => (
              <div key={p.title} className="glass-panel" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{p.title}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{p.details}</div>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div className="mono" style={{ color: 'var(--color-gold-600)' }}>{p.roi}</div>
                  <div className="mono" style={{ color: 'var(--color-green-500)' }}>{p.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel glass-panel" style={{ gridColumn: 'span 5' }}>
          <h2>Timeline 3D – Aperçu</h2>
          <p>Animation de timeline 3D à intégrer (caméra se déplace entre jalons: T0 conception, T1 MVP, T2 prod).</p>
        </div>
      </div>
    </section>
  )
}

export default Projects


