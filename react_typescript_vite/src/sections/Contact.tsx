const Contact = () => {
  return (
    <section className="section">
      <div className="section-grid">
        <div className="panel glass-panel" style={{ gridColumn: 'span 6' }}>
          <h2>Contact</h2>
          <p>
            Disponible à Genève. Ouvert aux équipes Data/Quant, Risk, Compliance, et Wealth Management.
          </p>
          <p className="mono">email.pro@exemple.com · +41 00 000 00 00</p>
        </div>
        <div className="panel glass-panel" style={{ gridColumn: 'span 6' }}>
          <h2>Informations</h2>
          <ul>
            <li>Langues: FR/EN/DE</li>
            <li>Nationalité: UE · Mobilité Suisse</li>
            <li>Disponibilité: 1 mois</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contact


