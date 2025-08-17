import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const LineChart = () => {
  const ref = useRef<SVGSVGElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const n = 36
    const data = Array.from({ length: n }, (_, i) => ({ x: i, y: 85 + 10 * Math.sin(i / 5) + Math.random() * 5 }))
    const width = 520, height = 260, margin = { top: 10, right: 20, bottom: 20, left: 36 }
    const svg = d3.select(el).attr('viewBox', `0 0 ${width} ${height}`)
    const x = d3.scaleLinear().domain([0, n - 1]).range([margin.left, width - margin.right])
    const y = d3.scaleLinear().domain([70, 105]).range([height - margin.bottom, margin.top])
    const line = d3.line<{ x: number; y: number }>()
      .x((d: { x: number }) => x(d.x))
      .y((d: { y: number }) => y(d.y))
      .curve(d3.curveMonotoneX)
    svg.append('path').datum(data).attr('fill', 'none').attr('stroke', '#2fd37b').attr('stroke-width', 2).attr('d', line as any)
    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(6))
      .selectAll('text').style('fill', '#b7c2d8')
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5))
      .selectAll('text').style('fill', '#b7c2d8')
    return () => { svg.selectAll('*').remove() }
  }, [])
  return <svg ref={ref} width={520} height={260} />
}

const Heatmap = () => {
  const ref = useRef<SVGSVGElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rows = 8, cols = 12
    const width = 520, height = 260, margin = { top: 10, right: 10, bottom: 10, left: 10 }
    const cellW = (width - margin.left - margin.right) / cols
    const cellH = (height - margin.top - margin.bottom) / rows
    const data: Array<{ r: number; c: number; v: number }> = Array.from({ length: rows * cols }, (_, i) => ({ r: Math.floor(i / cols), c: i % cols, v: Math.random() }))
    const color = d3.scaleSequential(d3.interpolateTurbo).domain([0, 1])
    const svg = d3.select(el).attr('viewBox', `0 0 ${width} ${height}`)
    svg.append('g').selectAll('rect').data(data).join('rect')
      .attr('x', (d: { c: number }) => margin.left + d.c * cellW)
      .attr('y', (d: { r: number }) => margin.top + d.r * cellH)
      .attr('width', cellW - 2)
      .attr('height', cellH - 2)
      .attr('fill', (d: { v: number }) => color(d.v) as string)
    return () => { svg.selectAll('*').remove() }
  }, [])
  return <svg ref={ref} width={520} height={260} />
}

const Performance = () => {
  return (
    <section className="section">
      <div className="section-grid">
        <div className="panel glass-panel" style={{ gridColumn: 'span 6' }}>
          <h2>KPI – Précision des modèles (%)</h2>
          <LineChart />
        </div>
        <div className="panel glass-panel" style={{ gridColumn: 'span 6' }}>
          <h2>Heatmap – Charge et performance</h2>
          <Heatmap />
        </div>
        <div className="panel glass-panel" style={{ gridColumn: 'span 12' }}>
          <h2>Scatter – Volume vs Temps de traitement</h2>
          <p>Graphique interactif à enrichir: relation volume de données (Go) et latence (s).</p>
        </div>
      </div>
    </section>
  )
}

export default Performance


