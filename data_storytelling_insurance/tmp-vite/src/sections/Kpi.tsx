import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export function Kpi() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const root = d3.select(ref.current)
    root.selectAll('*').remove()

    // KPIs
    const kpis = [
      { label: 'Taux de sinistres', value: 4.2, suffix: '%', color: '#c9a227' },
      { label: 'Fraude détectée', value: 2.1, suffix: '%', color: '#8cc9a2' },
      { label: 'Économies', value: 3.1, suffix: 'M CHF', color: '#c9a227' },
      { label: 'Satisfaction client', value: 86, suffix: '%', color: '#7fa8ff' },
    ]

    const grid = root.append('div').attr('class', 'kpi-grid')
    const cards = grid.selectAll('div.kpi').data(kpis).enter().append('div').attr('class', 'kpi')
    cards.append('div').attr('class', 'label').text(d => d.label)
    cards.append('div').attr('class', 'value').style('color', d => d.color).text(d => `${d.value} ${d.suffix}`)

    // small charts
    const w = 180, h = 70
    const svg = cards.append('svg').attr('width', w).attr('height', h)

    svg.each(function(_, i) {
      const s = d3.select(this)
      const x = d3.scaleLinear().domain([0, 19]).range([8, w - 8])
      const y = d3.scaleLinear().domain([0, 100]).range([h - 12, 12])
      const data = d3.range(20).map(t => 60 + 20 * Math.sin((t + i * 2) / 2))
      const line = d3.line<number>().x((_, t) => x(t)).y(d => y(d)).curve(d3.curveMonotoneX)
      s.append('path').attr('d', line(data)!).attr('fill', 'none').attr('stroke', i % 2 ? '#7fa8ff' : '#c9a227').attr('opacity', 0.8)
    })
  }, [])

  return (
    <div className="panel" style={{ margin: 16 }}>
      <div className="panel-title">KPI & Résultats</div>
      <div className="panel-body">
        <div ref={ref} />
      </div>
    </div>
  )
}

export default Kpi


