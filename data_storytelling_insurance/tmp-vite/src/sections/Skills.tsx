import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

type Skill = { name: string, value: number }

const skills: Skill[] = [
  { name: 'Machine Learning', value: 92 },
  { name: 'Actuariat', value: 78 },
  { name: 'Modélisation de risques', value: 88 },
  { name: 'Python', value: 95 },
  { name: 'R', value: 70 },
  { name: 'SQL', value: 90 },
  { name: 'Power BI', value: 82 },
  { name: 'NLP', value: 86 },
  { name: 'Visualisation', value: 92 },
]

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const root = d3.select(ref.current)
    root.selectAll('*').remove()
    const width = ref.current.clientWidth
    const card = 160
    const cols = Math.max(2, Math.floor(width / card))

    const container = root
      .append('div')
      .style('display', 'grid')
      .style('grid-template-columns', `repeat(${cols}, 1fr)`) 
      .style('gap', '16px')

    const arc = d3.arc().innerRadius(44).outerRadius(62)
    const tau = 2 * Math.PI

    const panels = container.selectAll('div.panel')
      .data(skills)
      .enter()
      .append('div')
      .attr('class', 'panel')

    panels.append('div').attr('class', 'panel-title').text(d => d.name)

    const bodies = panels.append('div').attr('class', 'panel-body')

    const svgs = bodies.append('svg').attr('width', 160).attr('height', 140)
    const g = svgs.append('g').attr('transform', 'translate(80,70)')

    g.append('path')
      .attr('d', arc({ startAngle: 0, endAngle: tau }))
      .attr('fill', 'rgba(168,178,191,0.15)')

    const fg = g.append('path')
      .attr('fill', 'url(#goldGradient)')

    const defs = svgs.append('defs')
    const grad = defs.append('linearGradient')
      .attr('id', 'goldGradient')
      .attr('x1', '0%').attr('x2', '100%')
    grad.append('stop').attr('offset', '0%').attr('stop-color', '#c9a227')
    grad.append('stop').attr('offset', '100%').attr('stop-color', '#f1d37c')

    const label = g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '20px')
      .style('font-weight', '700')

    panels.each(function(d) {
      const sel = d3.select(this)
      const value = d.value
      const target = (value / 100) * tau
      const path = sel.select('path:nth-of-type(2)')
      const txt = sel.select('text')
      path.transition().duration(1200).ease(d3.easeCubicOut)
        .attrTween('d', () => t => (arc({ startAngle: 0, endAngle: t * target }) as string))
      txt.transition().duration(1200).tween('text', () => {
        const i = d3.interpolateNumber(0, value)
        return t => { (txt as any).text(Math.round(i(t)) + '%') }
      })
    })
  }, [])

  return (
    <div className="panel" style={{ margin: 16 }}>
      <div className="panel-title">Compétences techniques</div>
      <div className="panel-body">
        <div ref={ref} />
      </div>
    </div>
  )
}

export default Skills


