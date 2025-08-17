import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const radialData = [
  { name: 'Python', value: 92 },
  { name: 'R', value: 75 },
  { name: 'SQL', value: 88 },
  { name: 'Spark', value: 70 },
  { name: 'Power BI', value: 78 },
  { name: 'ML', value: 90 },
  { name: 'NLP', value: 82 },
  { name: 'Storytelling', value: 86 },
]

const RadialChart = () => {
  const ref = useRef<SVGSVGElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const width = 320
    const height = 320
    const innerRadius = 50
    const outerRadius = Math.min(width, height) / 2 - 10

    const svg = d3.select(el)
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)

    const angle = d3.scaleBand()
      .domain(radialData.map(d => d.name))
      .range([0, 2 * Math.PI])
      .align(0)
    const radius = d3.scaleLinear().domain([0, 100]).range([innerRadius, outerRadius])

    const arc = d3.arc<{ name: string; value: number }>()
      .innerRadius(innerRadius)
      .outerRadius((d: { value: number }) => radius(d.value))
      .startAngle((d: { name: string }) => angle(d.name)!)
      .endAngle((d: { name: string }) => angle(d.name)! + angle.bandwidth())
      .padAngle(0.02)
      .padRadius(innerRadius)

    svg.append('g')
      .selectAll('path')
      .data(radialData)
      .join('path')
      .attr('fill', (_d: unknown, i: number) => i % 2 === 0 ? '#d1b15f' : '#9fb0ce')
      .attr('d', arc as any)
      .append('title')
      .text(d => `${d.name}: ${d.value}%`)

    svg.append('g')
      .selectAll('g')
      .data(radialData)
      .join('g')
      .attr('text-anchor', 'middle')
      .attr('transform', (d: { name: string }) => `rotate(${((angle(d.name)! + angle.bandwidth() / 2) * 180 / Math.PI - 90)}) translate(${innerRadius - 10},0)`)
      .append('text')
      .attr('transform', (d: { name: string }) => (angle(d.name)! + angle.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? 'rotate(180)' : null)
      .attr('dy', '0.35em')
      .attr('fill', '#dfe6f1')
      .style('font', '10px Roboto Mono')
      .text((d: { name: string }) => d.name)

    return () => { svg.selectAll('*').remove() }
  }, [])
  return <svg ref={ref} width={320} height={320} />
}

const Bars = () => {
  const ref = useRef<SVGSVGElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const data = radialData
    const width = 460
    const height = 320
    const margin = { top: 20, right: 20, bottom: 28, left: 80 }

    const svg = d3.select(el).attr('viewBox', `0 0 ${width} ${height}`)
    const x = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right])
    const y = d3.scaleBand<string>().domain(data.map(d => d.name)).range([margin.top, height - margin.bottom]).padding(0.2)

    svg.append('g').selectAll('rect').data(data).join('rect')
      .attr('x', margin.left)
      .attr('y', (d: { name: string }) => y(d.name)!)
      .attr('height', y.bandwidth())
      .attr('width', 0)
      .attr('fill', '#c8a85a')
      .transition().duration(900).attr('width', d => x(d.value) - margin.left)

    const axisBottom = d3.axisBottom(x).ticks(5).tickFormat((domainValue: d3.NumberValue, _i: number) => `${Number(domainValue)}%`).tickSize(-height + margin.top + margin.bottom)
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(axisBottom as any)
      .selectAll('text').style('fill', '#b7c2d8')
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text').style('fill', '#dfe6f1')

    return () => { svg.selectAll('*').remove() }
  }, [])
  return <svg ref={ref} width={460} height={320} />
}

const Skills = () => {
  return (
    <section className="section">
      <div className="section-grid">
        <div className="panel glass-panel" style={{ gridColumn: 'span 5' }}>
          <h2>Compétences – Radial</h2>
          <RadialChart />
        </div>
        <div className="panel glass-panel" style={{ gridColumn: 'span 7' }}>
          <h2>Compétences – Barres</h2>
          <Bars />
        </div>
      </div>
    </section>
  )
}

export default Skills


