import { useMemo } from 'react'

const Ticker = () => {
  const items = useMemo(() => [
    { label: "Années d'expérience", value: '8' },
    { label: 'Projets réussis', value: '32' },
    { label: 'Volume de données traitées', value: '2.4 Mrd lignes' },
    { label: 'Économies réalisées', value: '3.2 M€' },
    { label: 'Précision modèle crédit', value: '94.2%' },
    { label: 'Réduction risque fraude', value: '37%' },
  ], [])

  return (
    <div className="ticker-root">
      <div className="ticker-track mono">
        {items.concat(items).map((it, idx) => (
          <span key={idx} style={{ marginRight: 28 }}>
            <span style={{ color: 'var(--color-silver-200)' }}>{it.label}:</span>
            <span style={{ color: 'var(--color-gold-600)', marginLeft: 8 }}>{it.value}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Ticker


