import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

type Skill = { label: string; value: number; color: string }

const skills: Skill[] = [
  { label: 'Machine Learning', value: 0.9, color: '#4aa3ff' },
  { label: 'Modélisation climat', value: 0.85, color: '#38c172' },
  { label: 'Analyse spatiale', value: 0.88, color: '#ff8a3d' },
  { label: 'Python', value: 0.92, color: '#4aa3ff' },
  { label: 'SQL', value: 0.86, color: '#38c172' },
  { label: 'Power BI', value: 0.8, color: '#ff8a3d' },
  { label: 'Visualisation 3D', value: 0.82, color: '#4aa3ff' },
]

export default function Skills() {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const size = 320
    const inner = size / 2 - 20
    const svg = d3.select(ref.current)
      .attr('viewBox', `0 0 ${size} ${size}`)
      .attr('width', '100%')
      .attr('height', '100%')
    svg.selectAll('*').remove()

    const g = svg.append('g').attr('transform', `translate(${size/2}, ${size/2})`)

    const angle = d3.scaleLinear().domain([0, skills.length]).range([0, Math.PI * 2])
    const radius = d3.scaleLinear().domain([0, 1]).range([0, inner])

    // axes
    g.selectAll('.axis')
      .data(skills)
      .enter()
      .append('line')
      .attr('class', 'axis')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (_d, i) => Math.cos(angle(i) - Math.PI/2) * inner)
      .attr('y2', (_d, i) => Math.sin(angle(i) - Math.PI/2) * inner)
      .attr('stroke', 'rgba(255,255,255,0.15)')

    // radial polygon
    const line = d3.lineRadial<number>()
      .angle((_d, i) => angle(i))
      .radius((d) => radius(d))
      .curve(d3.curveCatmullRomClosed.alpha(0.7))

    g.append('path')
      .datum(skills.map(s => s.value))
      .attr('d', line as any)
      .attr('fill', 'rgba(74,163,255,0.2)')
      .attr('stroke', '#4aa3ff')
      .attr('stroke-width', 2)

    // labels
    g.selectAll('.label')
      .data(skills)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (_d, i) => Math.cos(angle(i) - Math.PI/2) * (inner + 8))
      .attr('y', (_d, i) => Math.sin(angle(i) - Math.PI/2) * (inner + 8))
      .attr('fill', 'var(--text-1)')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .text(d => d.label)
  }, [])

  return (
    <div className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <h2>Compétences</h2>
        <p>Graphique radial style tableau de contrôle météo/climat.</p>
      </div>
      <svg ref={ref} />
    </div>
  )
}



