import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

function LineChart() {
	const ref = useRef<SVGSVGElement | null>(null)
	useEffect(() => {
		const svg = d3.select(ref.current)
		const w = 520, h = 220, m = { t: 16, r: 16, b: 24, l: 36 }
		svg.attr('viewBox', `0 0 ${w} ${h}`)
		svg.selectAll('*').remove()
		const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`)
		const data = d3.range(16).map((i) => ({ x: i, y: 40 + 30 * Math.sin(i / 2) + i }))
		const x = d3.scaleLinear().domain(d3.extent(data, d => d.x) as [number, number]).range([0, w - m.l - m.r])
		const y = d3.scaleLinear().domain([0, d3.max(data, d => d.y)!]).nice().range([h - m.t - m.b, 0])
		const line = d3.line<{x:number,y:number}>().x(d => x(d.x)).y(d => y(d.y)).curve(d3.curveMonotoneX)
		g.append('path').datum(data).attr('d', line as any).attr('fill', 'none').attr('stroke', '#00d084').attr('stroke-width', 2)
		g.append('g').attr('transform', `translate(0,${h - m.t - m.b})`).call(d3.axisBottom(x).ticks(6) as any).attr('color', '#96b3c8')
		g.append('g').call(d3.axisLeft(y).ticks(5) as any).attr('color', '#96b3c8')
	}, [])
	return <svg ref={ref} style={{ width: '100%', height: 240 }} />
}

function Donut({ value }: { value: number }) {
	const ref = useRef<SVGSVGElement | null>(null)
	useEffect(() => {
		const svg = d3.select(ref.current)
		const size = 220, r = 90
		svg.attr('viewBox', `0 0 ${size} ${size}`).selectAll('*').remove()
		const g = svg.append('g').attr('transform', `translate(${size/2},${size/2})`)
		const arc = d3.arc().innerRadius(60).outerRadius(r)
		const pie = d3.pie<number>().value(d => d).sort(null)
		const data = pie([value, 1 - value])
		g.selectAll('path').data(data).enter().append('path')
			.attr('d', arc as any)
			.attr('fill', (_d, i) => i === 0 ? '#00d084' : 'rgba(150,179,200,0.2)')
		svg.append('text').attr('x', size/2).attr('y', size/2 + 6).attr('text-anchor', 'middle').attr('fill', '#e6f0f7').text(`${Math.round(value*100)}%`)
	}, [value])
	return <svg ref={ref} style={{ width: '100%', height: 240 }} />
}

export default function Kpis() {
	return (
		<div className="grid-2">
			<div className="panel">
				<h2 className="section-title">Taux de succès des essais</h2>
				<LineChart />
			</div>
			<div className="panel">
				<h2 className="section-title">Efficacité globale</h2>
				<Donut value={0.78} />
			</div>
			<div className="panel">
				<h2 className="section-title">Couverture géographique</h2>
				<p>Placeholder: carte interactive D3 pour la couverture.</p>
			</div>
			<div className="panel">
				<h2 className="section-title">Économies R&D (est.)</h2>
				<p>Placeholder: bar chart D3.</p>
			</div>
		</div>
	)
}


