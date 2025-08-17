import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function LineChart() {
  const ref = useRef()
  useEffect(() => {
    const width = 420, height = 180
    const svg = d3.select(ref.current).attr('viewBox', `0 0 ${width} ${height}`)
    svg.selectAll('*').remove()
    const data = d3.range(24).map(i => ({ x: i, y: 0.6 + 0.2*Math.sin(i/3) + (Math.random()-0.5)*0.1 }))
    const x = d3.scaleLinear().domain([0, 23]).range([32, width-10])
    const y = d3.scaleLinear().domain([0.3, 1.05]).range([height-24, 10])
    const line = d3.line().x(d=>x(d.x)).y(d=>y(d.y)).curve(d3.curveMonotoneX)
    svg.append('path').datum(data).attr('d', line).attr('fill','none').attr('stroke','#1f6feb').attr('stroke-width',2)
    svg.append('g').attr('transform',`translate(0,${height-24})`).call(d3.axisBottom(x).ticks(6))
    svg.append('g').attr('transform',`translate(32,0)`).call(d3.axisLeft(y).ticks(4))
  }, [])
  return <svg ref={ref} width={420} height={180} />
}

function Histogram() {
  const ref = useRef()
  useEffect(() => {
    const width = 420, height = 180
    const svg = d3.select(ref.current).attr('viewBox', `0 0 ${width} ${height}`)
    svg.selectAll('*').remove()
    const data = d3.range(200).map(() => Math.abs(d3.randomNormal(0.5, 0.18)()))
    const x = d3.scaleLinear().domain([0, 1]).nice().range([32, width-10])
    const bins = d3.bin().domain(x.domain()).thresholds(20)(data)
    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)]).nice().range([height-24, 10])
    svg.append('g').selectAll('rect').data(bins).join('rect')
      .attr('x', d => x(d.x0) + 1)
      .attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 2))
      .attr('y', d => y(d.length))
      .attr('height', d => y(0) - y(d.length))
      .attr('fill', '#c5a45a')
    svg.append('g').attr('transform',`translate(0,${height-24})`).call(d3.axisBottom(x).ticks(6))
    svg.append('g').attr('transform',`translate(32,0)`).call(d3.axisLeft(y).ticks(4))
  }, [])
  return <svg ref={ref} width={420} height={180} />
}

export default function Kpis() {
  return (
    <div className="panel">
      <div className="panel-left glass" style={{padding:16}}>
        <h3 className="section-title">KPI & Résultats</h3>
        <div className="section-sub">Taux de sinistres, probabilité climat, coûts moyens</div>
        <div className="glass" style={{padding:12, marginBottom:12}}>
          <div className="section-title" style={{fontSize:14}}>Probabilité de risque climatique</div>
          <LineChart />
        </div>
        <div className="glass" style={{padding:12}}>
          <div className="section-title" style={{fontSize:14}}>Coûts moyens par type de sinistre</div>
          <Histogram />
        </div>
      </div>
      <div className="panel-right glass">
        <h3 className="section-title">Indicateurs</h3>
        <div className="kpi-grid">
          <div className="kpi-card glass"><div className="kpi-value">2.7%</div><div className="kpi-label">Taux sinistres Eaux-Vives</div></div>
          <div className="kpi-card glass"><div className="kpi-value">3.9%</div><div className="kpi-label">Taux sinistres Plainpalais</div></div>
          <div className="kpi-card glass"><div className="kpi-value">CHF 6.1k</div><div className="kpi-label">Coût moyen Habitation</div></div>
          <div className="kpi-card glass"><div className="kpi-value">CHF 2.2k</div><div className="kpi-label">Coût moyen Auto</div></div>
        </div>
      </div>
    </div>
  )
}


