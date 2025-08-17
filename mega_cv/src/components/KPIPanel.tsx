type KPI = { label: string; value: string }

type KPIPanelProps = {
  title?: string
  kpis: KPI[]
}

export default function KPIPanel({ title = 'KPI', kpis }: KPIPanelProps) {
  return (
    <div className="kpi-panel">
      <div className="kpi-title">{title}</div>
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} className="kpi-item">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

