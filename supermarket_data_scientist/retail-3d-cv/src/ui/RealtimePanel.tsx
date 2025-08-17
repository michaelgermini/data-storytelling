import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'

type SalePoint = { t: number; value: number }

function useMockRealtime(seriesLength = 40) {
  const [data, setData] = useState<SalePoint[]>(() => {
    const now = Date.now()
    return d3.range(seriesLength).map((i) => ({ t: now - (seriesLength - i) * 1000, value: 50 + Math.random() * 20 }))
  })
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1)
        next.push({ t: Date.now(), value: Math.max(10, Math.min(120, prev[prev.length - 1].value + (Math.random() - 0.5) * 12)) })
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return data
}

export function RealtimePanel() {
  const data = useMockRealtime()
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = d3.select(ref.current!)
    const width = 420
    const height = 160
    svg.attr('width', width).attr('height', height)
    svg.selectAll('*').remove()

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.t)) as [Date, Date])
      .range([30, width - 10])

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)! * 1.2])
      .nice()
      .range([height - 24, 10])

    const line = d3
      .line<SalePoint>()
      .x((d) => x(new Date(d.t)))
      .y((d) => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.6))

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#39c6ff')
      .attr('stroke-width', 2)
      .attr('d', line)

    svg
      .append('g')
      .attr('transform', `translate(0,${height - 24})`)
      .call(d3.axisBottom(x).ticks(4))
      .selectAll('text')
      .style('fill', '#a6b3c1')

    svg
      .append('g')
      .attr('transform', 'translate(30,0)')
      .call(d3.axisLeft(y).ticks(4))
      .selectAll('text')
      .style('fill', '#a6b3c1')

    svg
      .append('text')
      .attr('x', 30)
      .attr('y', 12)
      .attr('fill', '#e6f1ff')
      .attr('font-weight', 700)
      .text('Ventes en temps réel (mock)')
  }, [data])

  return (
    <div>
      <div style={{ marginBottom: 8, fontWeight: 700 }}>KPI Retail</div>
      <div className="kpi" style={{ marginBottom: 12 }}>
        <div className="card">
          <div>CA jour</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>€ {Math.round(d3.sum(data, (d) => d.value))}</div>
        </div>
        <div className="card">
          <div>Unités vendues</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{Math.round(d3.mean(data, (d) => d.value) ?? 0) * 5}</div>
        </div>
        <div className="card">
          <div>Satisfaction</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{Math.round(80 + (data[data.length - 1]?.value ?? 60) / 5)}%</div>
        </div>
        <div className="card">
          <div>Ruptures</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{Math.max(0, 10 - Math.round((data[data.length - 1]?.value ?? 40) / 12))}</div>
        </div>
      </div>
      <svg ref={ref} />
    </div>
  )
}


