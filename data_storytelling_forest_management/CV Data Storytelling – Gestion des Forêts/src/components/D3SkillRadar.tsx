import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

type Skill = { name: string; value: number }

type Props = {
	title?: string
	skills: Skill[]
}

export default function D3SkillRadar({ title = 'Compétences environnementales', skills }: Props) {
	const ref = useRef<SVGSVGElement | null>(null)

	useEffect(() => {
		const svg = d3.select(ref.current)
		svg.selectAll('*').remove()

		const width = 420
		const height = 320
		const margin = 36
		const radius = Math.min(width, height) / 2 - margin

		svg.attr('viewBox', `0 0 ${width} ${height}`)
		const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)

		const angle = d3.scalePoint<string>().domain(skills.map(s => s.name)).range([0, Math.PI * 2])
		const r = d3.scaleLinear().domain([0, 100]).range([0, radius])

		const levels = 4
		for (let i = 1; i <= levels; i++) {
			g.append('circle')
				.attr('r', (radius / levels) * i)
				.attr('fill', i % 2 === 0 ? '#f0f7f2' : 'white')
				.attr('stroke', '#8ecf9e')
				.attr('opacity', 0.7)
		}

		g.selectAll('.axis')
			.data(skills)
			.enter()
			.append('g')
			.attr('class', 'axis')
			.each(function (d) {
				const a = angle(d.name) ?? 0
				d3.select(this)
					.append('line')
					.attr('x1', 0)
					.attr('y1', 0)
					.attr('x2', Math.cos(a - Math.PI / 2) * radius)
					.attr('y2', Math.sin(a - Math.PI / 2) * radius)
					.attr('stroke', '#8ecf9e')
					.attr('stroke-dasharray', '2,2')
					.attr('opacity', 0.8)
			})

		g.selectAll('.label')
			.data(skills)
			.enter()
			.append('text')
			.attr('class', 'label')
			.attr('x', d => Math.cos((angle(d.name) ?? 0) - Math.PI / 2) * (radius + 10))
			.attr('y', d => Math.sin((angle(d.name) ?? 0) - Math.PI / 2) * (radius + 10))
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.style('font-size', 12)
			.style('fill', '#1d5b2b')
			.text(d => d.name)

		const line = d3.lineRadial<Skill>()
			.angle(d => (angle(d.name) ?? 0))
			.radius(d => r(d.value))
			.curve(d3.curveCardinalClosed)

		g.append('path')
			.datum(skills)
			.attr('d', line as any)
			.attr('fill', '#2f8f46')
			.attr('opacity', 0.2)
			.attr('stroke', '#2f8f46')
			.attr('stroke-width', 2)

		g.selectAll('.dot')
			.data(skills)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('cx', d => Math.cos((angle(d.name) ?? 0) - Math.PI / 2) * r(d.value))
			.attr('cy', d => Math.sin((angle(d.name) ?? 0) - Math.PI / 2) * r(d.value))
			.attr('r', 3)
			.attr('fill', '#2f8f46')
			.attr('stroke', 'white')
	}, [skills])

	return (
		<div style={{ border: '1px solid var(--forest-100)', borderRadius: 12, padding: 12, background: 'white' }}>
			{title && <h3 style={{ margin: '4px 0 8px' }}>{title}</h3>}
			<svg ref={ref} width="100%" height="320" />
		</div>
	)
}


