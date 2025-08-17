import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function KpiImpact() {
  const heatRef = useRef<SVGSVGElement | null>(null)
  const histRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    // Heatmap quartiers x NO2
    if (!heatRef.current) return
    const quartiers = ['Centre', 'Plainpalais', 'Eaux-Vives', 'Servette', 'Acacias']
    const heures = d3.range(24)
    const data = quartiers.flatMap(q => heures.map(h => ({ q, h, v: 10 + (Math.random()*40) })))
    const width = 580, height = 280, margin = { top: 20, right: 10, bottom: 40, left: 80 }
    const svg = d3.select(heatRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%').attr('height', '100%')
    svg.selectAll('*').remove()

    const x = d3.scaleBand().domain(heures.map(String)).range([margin.left, width - margin.right]).padding(0.05)
    const y = d3.scaleBand().domain(quartiers).range([margin.top, height - margin.bottom]).padding(0.05)
    const c = d3.scaleSequential(d3.interpolateTurbo).domain([10, 50])

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', d => x(String(d.h))!)
      .attr('y', d => y(d.q)!)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => c(d.v))
      .attr('opacity', 0.9)

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x)).attr('color', 'var(--text-1)')
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y)).attr('color', 'var(--text-1)')
  }, [])

  useEffect(() => {
    // Histogram jours air non sain
    if (!histRef.current) return
    const width = 580, height = 220, margin = { top: 10, right: 10, bottom: 30, left: 36 }
    const values = Array.from({ length: 365 }, () => Math.random() * 80)
    const svg = d3.select(histRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%').attr('height', '100%')
    svg.selectAll('*').remove()

    const x = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right])
    const bins = d3.bin().domain(x.domain() as [number, number]).thresholds(20)(values)
    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)!]).nice().range([height - margin.bottom, margin.top])

    svg.append('g').selectAll('rect')
      .data(bins).enter().append('rect')
      .attr('x', d => x(d.x0!))
      .attr('y', d => y(d.length))
      .attr('width', d => Math.max(0, x(d.x1!) - x(d.x0!) - 1))
      .attr('height', d => y(0) - y(d.length))
      .attr('fill', '#4aa3ff')

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x)).attr('color', 'var(--text-1)')
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y)).attr('color', 'var(--text-1)')
  }, [])

  return (
    <div className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <h2>KPI & Impact</h2>
        <p>PM2.5, NO₂ par quartier, jours air non sain, coûts estimés.</p>
        <svg ref={heatRef} />
      </div>
      <div>
        <h3>Jours "non sains" (distribution)</h3>
        <svg ref={histRef} />
      </div>
    </div>
  )
}



