import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const data = Array.from({ length: 12 }, (_v, i) => ({ month: i + 1, pm25: 8 + Math.random() * 20 }))

export default function Projects() {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const width = 560, height = 260, margin = { top: 10, right: 16, bottom: 24, left: 36 }
    const svg = d3.select(ref.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
    svg.selectAll('*').remove()

    const x = d3.scaleLinear().domain([1, 12]).range([margin.left, width - margin.right])
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.pm25)!]).nice().range([height - margin.bottom, margin.top])

    const line = d3.line<{ month: number; pm25: number }>()
      .x(d => x(d.month))
      .y(d => y(d.pm25))
      .curve(d3.curveMonotoneX)

    svg.append('path')
      .datum(data)
      .attr('d', line as any)
      .attr('fill', 'none')
      .attr('stroke', '#ff8a3d')
      .attr('stroke-width', 2)

    const axis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
      g.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(12).tickFormat(d => `${d}` as any)).attr('color', 'var(--text-1)')
      g.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y)).attr('color', 'var(--text-1)')
    }

    svg.append('g').call(axis)
  }, [])

  return (
    <div className="section">
      <h2>Projets Pollution</h2>
      <p>Timeline de la qualité de l’air (PM2.5) simulée. Ajout de cas d’étude: smog, risques santé, cartographie urbaine.</p>
      <svg ref={ref} />
    </div>
  )
}



