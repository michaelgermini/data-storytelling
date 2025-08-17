import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BlinkingTicker = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const id = setInterval(() => {
      el.style.opacity = el.style.opacity === '0.5' ? '1' : '0.5'
    }, 500)
    return () => clearInterval(id)
  }, [])
  return <div ref={ref} className="mono" style={{ color: '#f76161' }}>ALERT: Spread CDS +12 bps</div>
}

const LiveCurve = () => {
  const ref = useRef<SVGSVGElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const width = 520, height = 180, margin = { top: 10, right: 10, bottom: 20, left: 30 }
    const svg = d3.select(el).attr('viewBox', `0 0 ${width} ${height}`)
    const x = d3.scaleLinear().domain([0, 60]).range([margin.left, width - margin.right])
    const y = d3.scaleLinear().domain([95, 105]).range([height - margin.bottom, margin.top])
    let t = 0
    const line = d3.line<{ x: number; y: number }>()
      .x((d: { x: number }) => x(d.x))
      .y((d: { y: number }) => y(d.y))
      .curve(d3.curveMonotoneX)
    const path = svg.append('path').attr('fill', 'none').attr('stroke', '#2fd37b').attr('stroke-width', 2)
    const axisX = svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
    const axisY = svg.append('g').attr('transform', `translate(${margin.left},0)`)    
    const data: Array<{ x: number, y: number }> = []
    const tick = () => {
      t++
      data.push({ x: t, y: 100 + Math.sin(t / 6) * 3 + (Math.random() - 0.5) * 1.5 })
      if (data.length > 60) data.shift()
      x.domain([Math.max(0, t - 60), t])
      path.datum(data).attr('d', line as any)
      axisX.call(d3.axisBottom(x).ticks(5))
      axisY.call(d3.axisLeft(y).ticks(4))
    }
    const id = setInterval(tick, 300)
    return () => { clearInterval(id); svg.selectAll('*').remove() }
  }, [])
  return <svg ref={ref} width={520} height={180} />
}

const BankingExperience = () => {
  return (
    <section className="section">
      <div className="section-grid">
        <div className="panel glass-panel" style={{ gridColumn: 'span 7' }}>
          <h2>Écran de trading – Courbes en direct</h2>
          <LiveCurve />
          <BlinkingTicker />
        </div>
        <div className="panel glass-panel" style={{ gridColumn: 'span 5' }}>
          <h2>Réalisations bancaires</h2>
          <ul>
            <li>Réduction du risque crédit: <span className="mono" style={{ color: 'var(--color-green-500)' }}>-18%</span></li>
            <li>Optimisation des délais KYC: <span className="mono" style={{ color: 'var(--color-gold-600)' }}>-32%</span></li>
            <li>Automatisation reporting réglementaire: <span className="mono">500+ heures/an</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default BankingExperience


