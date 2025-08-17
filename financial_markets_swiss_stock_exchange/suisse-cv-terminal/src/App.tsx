import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as d3 from 'd3'
import gsap from 'gsap'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './App.css'

type TickerItem = { label: string; value: string; delta?: number }

function Ticker({ items }: { items: TickerItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const totalWidth = el.scrollWidth
    const duration = Math.max(20, totalWidth / 80)
    const tween = gsap.fromTo(el, { x: 0 }, { x: -totalWidth / 2, duration, repeat: -1, ease: 'linear' })
    return () => { tween.kill() }
  }, [items])
  return (
    <div className="ticker" role="marquee" aria-label="ticker">
      <div className="ticker-track" ref={trackRef}>
        {[...items, ...items].map((it, i) => (
          <span key={i} className="ticker-item">
            {it.label}: <strong>{it.value}</strong>{' '}
            {typeof it.delta === 'number' && (
              <span className={it.delta >= 0 ? 'up' : 'down'}>
                {it.delta >= 0 ? '▲' : '▼'} {Math.abs(it.delta).toFixed(2)}%
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

function SwissMap3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="canvas-wrap">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Simplified Switzerland silhouette as extruded sphere + marker for Geneva */}
      <group>
        <Sphere args={[2.1, 64, 64]}>
          <meshStandardMaterial color="#0c0f14" roughness={0.9} metalness={0.2} />
        </Sphere>
        {/* Geneva marker */}
        <mesh position={[1.1, -0.5, 2.0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.6} />
        </mesh>
      </group>
      <OrbitControls enableDamping dampingFactor={0.08} maxDistance={10} minDistance={3} />
    </Canvas>
  )
}

function RadialSkill({ label, value }: { label: string; value: number }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()
    const size = 120
    const thickness = 10
    const radius = size / 2 - thickness
    const g = svg.attr('viewBox', `0 0 ${size} ${size}`).append('g').attr('transform', `translate(${size / 2}, ${size / 2})`)
    const background = d3.arc().innerRadius(radius - thickness).outerRadius(radius).startAngle(0).endAngle(2 * Math.PI)
    g.append('path').attr('d', background as any).attr('fill', '#1b1f27')
    const arc = d3.arc().innerRadius(radius - thickness).outerRadius(radius).startAngle(-Math.PI / 2).endAngle(-Math.PI / 2 + (2 * Math.PI) * (value / 100))
    g.append('path').attr('d', arc as any).attr('fill', '#00ff88')
    g.append('text').attr('text-anchor', 'middle').attr('dy', '6').attr('fill', '#c9f9c7').style('font-size', '14px').text(`${value}%`)
  }, [value])
  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <svg ref={ref} width={140} height={140} />
      <div style={{ marginTop: 8, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

function CandlesMini() {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()
    const width = 600
    const height = 180
    const margin = { top: 10, right: 20, bottom: 20, left: 40 }
    const g = svg.attr('viewBox', `0 0 ${width} ${height}`).append('g').attr('transform', `translate(${margin.left},${margin.top})`)
    const innerW = width - margin.left - margin.right
    const innerH = height - margin.top - margin.bottom
    const dates = d3.range(100).map((d) => new Date(Date.now() - (100 - d) * 3600 * 1000))
    let price = 100
    const data = dates.map((date) => {
      const open = price
      const change = (Math.random() - 0.5) * 2
      const close = open + change
      const high = Math.max(open, close) + Math.random()
      const low = Math.min(open, close) - Math.random()
      price = close
      return { date, open, high, low, close }
    })
    const x = d3.scaleBand(d3.range(data.length) as any, [0, innerW]).padding(0.4)
    const y = d3.scaleLinear([d3.min(data, d => d.low)! - 1, d3.max(data, d => d.high)! + 1], [innerH, 0])
    g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x).tickValues([] as any)).selectAll('path,line').attr('stroke', '#20242c')
    g.append('g').call(d3.axisLeft(y).ticks(5)).selectAll('path,line').attr('stroke', '#20242c')
    const candle = g.append('g')
    candle.selectAll('g').data(data).join('g').each(function(d) {
      const group = d3.select(this)
      const color = d.close >= d.open ? '#00ff88' : '#ff5b5b'
      const cx = x((data as any).indexOf(d))! + x.bandwidth() / 2
      group.append('line').attr('x1', cx).attr('x2', cx).attr('y1', y(d.low)).attr('y2', y(d.high)).attr('stroke', color).attr('stroke-width', 1)
      group.append('rect').attr('x', cx - x.bandwidth() / 2).attr('width', x.bandwidth()).attr('y', y(Math.max(d.open, d.close))).attr('height', Math.max(1, Math.abs(y(d.open) - y(d.close)))).attr('fill', color)
    })
  }, [])
  return <svg ref={ref} style={{ width: '100%', height: 180 }} />
}

function TerminalMenu() {
  const sections = ['Profil', 'Compétences', 'Projets', 'KPI', 'Expérience', 'Contact']
  return (
    <div className="terminal-menu">
      {sections.map((s) => (
        <div key={s} className="menu-item">{s}</div>
      ))}
      <button className="story-btn" onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>Story</button>
    </div>
  )
}

function ExportPDFButton() {
  const onExport = async () => {
    const doc = new jsPDF('p', 'mm', 'a4')
    const target = document.getElementById('export-area')
    if (!target) return
    const canvas = await html2canvas(target, { backgroundColor: '#0a0a0a', scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const aspect = canvas.width / canvas.height
    const w = pageWidth
    const h = w / aspect
    doc.addImage(imgData, 'PNG', 0, 0, w, h)
    doc.save('CV_Terminal_Suisse.pdf')
  }
  return <button className="story-btn" style={{ right: 120 }} onClick={onExport}>Export PDF</button>
}

export default function App() {
  const tickerItems: TickerItem[] = useMemo(() => [
    { label: 'Expérience', value: 'X ans', delta: +0.2 },
    { label: 'Portefeuilles analysés', value: 'Y', delta: +0.8 },
    { label: 'Performance moyenne', value: 'Z%', delta: +0.1 },
    { label: 'Sharpe', value: '1.6', delta: +0.05 },
    { label: 'Drawdown max', value: '-8.2%', delta: -0.03 },
  ], [])

  return (
    <>
      <div className="grid-bg" />
      <TerminalMenu />
      <ExportPDFButton />
      <div className="canvas-wrap">
        <SwissMap3D />
      </div>
      <div className="content-panels" id="export-area">
        <section className="panel" id="profil">
          <h3 className="panel-title">Profil – Data Scientist, Genève</h3>
          <CandlesMini />
          <p>Terminal boursier suisse immersif présentant le parcours, les compétences et les performances.</p>
        </section>
        <section className="panel" id="competences">
          <h3 className="panel-title">Compétences techniques</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <RadialSkill label="Python" value={92} />
            <RadialSkill label="R" value={70} />
            <RadialSkill label="SQL" value={85} />
            <RadialSkill label="ML Financier" value={88} />
            <RadialSkill label="Analyse de risques" value={82} />
            <RadialSkill label="DataViz" value={80} />
            <RadialSkill label="Power BI" value={75} />
            <RadialSkill label="Bloomberg API" value={65} />
          </div>
        </section>
        <section className="panel" id="projets">
          <h3 className="panel-title">Projets financiers</h3>
          <ul>
            <li>Prédiction de cours SMI (actions suisses)</li>
            <li>Analyse de la volatilité et stress tests</li>
            <li>Optimisation de portefeuilles (Markowitz, Black-Litterman)</li>
          </ul>
        </section>
        <section className="panel" id="kpi">
          <h3 className="panel-title">KPI & Performances</h3>
          <ul>
            <li>Rendement moyen: 12.4%</li>
            <li>Sharpe ratio: 1.6</li>
            <li>Drawdown max: -8.2%</li>
            <li>Prédictions vs Réalité: corrélation 0.78</li>
          </ul>
        </section>
        <section className="panel" id="experience">
          <h3 className="panel-title">Expérience secteur (Suisse)</h3>
          <p>Cartographie 3D des secteurs: Finance, Pharma, Industrie, Énergie.</p>
        </section>
        <section className="panel" id="story">
          <h3 className="panel-title">Swiss Stock Market Storytelling</h3>
          <p>Mode caméra guidée à implémenter: parcours des graphiques et projets, narration des résultats.</p>
        </section>
      </div>
      <Ticker items={tickerItems} />
    </>
  )
}
