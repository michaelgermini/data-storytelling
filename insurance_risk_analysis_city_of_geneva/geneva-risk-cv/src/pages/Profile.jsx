export default function Profile() {
  return (
    <div className="panel">
      <div className="panel-left glass" style={{padding:16, overflow:'auto'}}>
        <h3 className="section-title">Profil</h3>
        <div className="section-sub">Data Scientist — Assurance & Analyse de Risques — Genève</div>
        <div className="glass" style={{padding:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div>
            <div style={{fontWeight:700}}>À propos</div>
            <div style={{color:'var(--silver)'}}>
              Spécialiste en modélisation de risques pour l’assurance et la réassurance, avec un focus urbain sur la Ville de Genève.
              Expertise en actuariat, machine learning, géo-analytique, et storytelling décisionnel.
            </div>
          </div>
          <div>
            <div style={{fontWeight:700}}>Compétences clés</div>
            <ul style={{color:'var(--silver)', lineHeight:1.8}}>
              <li>Modèles fréquence/gravité, GLM, GBM, réseaux</li>
              <li>Python, SQL, D3/Power BI, MLOps</li>
              <li>Analyse spatiale: D3-Geo, QGIS, TopoJSON</li>
            </ul>
          </div>
          <div>
            <div style={{fontWeight:700}}>Formation</div>
            <div style={{color:'var(--silver)'}}>MSc Data Science, Cert. Actuariat (modules), cours risques climatiques</div>
          </div>
          <div>
            <div style={{fontWeight:700}}>Contact rapide</div>
            <div style={{color:'var(--silver)'}}>mika@example.com • +41 79 000 00 00</div>
          </div>
        </div>
      </div>
      <div className="panel-right glass" style={{padding:16}}>
        <h3 className="section-title">Indicateurs personnels</h3>
        <div className="kpi-grid">
          <div className="kpi-card glass"><div className="kpi-value">8+</div><div className="kpi-label">années d’expérience</div></div>
          <div className="kpi-card glass"><div className="kpi-value">25M+</div><div className="kpi-label">CHF données traitées</div></div>
          <div className="kpi-card glass"><div className="kpi-value">-18%</div><div className="kpi-label">réduction des risques</div></div>
          <div className="kpi-card glass"><div className="kpi-value">12</div><div className="kpi-label">projets Genève</div></div>
        </div>
      </div>
    </div>
  )
}


