import { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'

function Heatmap({ width=420, height=260 }) {
  const ref = useRef()
  const data = useMemo(() => d3.range(14).map(i => ({
    x: i, y: Math.floor(Math.random()*8), v: Math.random()
  })), [])
  useEffect(() => {
    const svg = d3.select(ref.current).attr('viewBox', `0 0 ${width} ${height}`)
    svg.selectAll('*').remove()
    const x = d3.scaleBand().domain(d3.range(14)).range([40, width-10]).padding(0.08)
    const y = d3.scaleBand().domain(d3.range(8)).range([20, height-30]).padding(0.08)
    const color = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 1])
    svg.append('g').selectAll('rect').data(data).join('rect')
      .attr('x', d => x(d.x)).attr('y', d => y(d.y))
      .attr('width', x.bandwidth()).attr('height', y.bandwidth())
      .attr('fill', d => color(d.v))
      .attr('opacity', 0.9)
    svg.append('g').attr('transform', `translate(0,${height-30})`).call(d3.axisBottom(x).tickValues([]))
    svg.append('g').attr('transform', `translate(40,0)`).call(d3.axisLeft(y).tickValues([]))
  }, [data, width, height])
  return <svg ref={ref} width={width} height={height} />
}

function Timeline3DStub() {
  return (
    <div className="glass" style={{height:200, display:'grid', placeItems:'center', color:'var(--muted)'}}>
      Timeline 3D des interventions & ROI (stub)
    </div>
  )
}

export default function Projects() {
  return (
    <div className="panel">
      <div className="panel-left glass" style={{padding:16, overflow:'auto'}}>
        <h3 className="section-title">Projets Genève</h3>
        <div className="section-sub">Études locales: sinistres par quartier, prédiction d’inondations (Arve), risques immobiliers</div>
        <div className="glass" style={{padding:12}}>
          <div className="section-title" style={{fontSize:14}}>Heatmap sinistres par quartier</div>
          <Heatmap />
        </div>
        <div style={{height:12}} />
        <Timeline3DStub />
      </div>
      <div className="panel-right glass">
        <h3 className="section-title">Détails</h3>
        <ul style={{color:'var(--silver)', lineHeight:1.8}}>
          <li>Arve flood risk: modèle XGBoost, AUC 0.87</li>
          <li>Habitation: scoring aléas immobiliers par îlots</li>
          <li>Auto: fréquence/gravité par axe de mobilité</li>
        </ul>
      </div>
    </div>
  )
}


