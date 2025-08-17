import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const skills = [
  { label: 'Modélisation de risques', value: 0.9 },
  { label: 'Actuariat', value: 0.85 },
  { label: 'Machine Learning', value: 0.88 },
  { label: 'Python', value: 0.92 },
  { label: 'SQL', value: 0.86 },
  { label: 'Power BI', value: 0.8 },
  { label: 'Analyse spatiale', value: 0.83 }
]

function RadialChart({ value, label }) {
  const ref = useRef()
  useEffect(() => {
    const size = 160
    const inner = 60
    const outer = 70
    const svg = d3.select(ref.current)
      .attr('viewBox', `0 0 ${size} ${size}`)
    svg.selectAll('*').remove()
    const g = svg.append('g').attr('transform', `translate(${size/2}, ${size/2})`)
    const arc = d3.arc().innerRadius(inner).outerRadius(outer)
    g.append('path').attr('d', arc({ startAngle: 0, endAngle: Math.PI*2 }))
      .attr('fill', 'rgba(255,255,255,0.08)')
    g.append('path').attr('d', arc({ startAngle: 0, endAngle: value * Math.PI*2 }))
      .attr('fill', '#c5a45a')
    g.append('text').text(`${Math.round(value*100)}%`).attr('text-anchor','middle').attr('dy','8').attr('fill','#e7ecf5').style('font-weight',800)
  }, [value])
  return (
    <div className="glass" style={{padding:12, display:'flex', flexDirection:'column', alignItems:'center'}}>
      <svg ref={ref} width={160} height={160} />
      <div style={{fontSize:12, color:'var(--muted)', textAlign:'center'}}>{label}</div>
    </div>
  )
}

export default function Skills() {
  return (
    <div className="panel">
      <div className="panel-left glass" style={{padding:16, overflow:'auto'}}>
        <h3 className="section-title">Compétences</h3>
        <div className="section-sub">Graphiques radiaux avec animations façon écran de contrôle</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
          {skills.map((s) => (
            <RadialChart key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
      <div className="panel-right glass">
        <h3 className="section-title">Highlights</h3>
        <ul style={{color:'var(--silver)', lineHeight:1.8}}>
          <li>Score prédictif sinistres habitation sur quartiers genevois</li>
          <li>Tarification auto data-driven, uplift ROI +11%</li>
          <li>Segmentation santé, détection anomalies remboursements</li>
        </ul>
      </div>
    </div>
  )
}


