import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

type RadialSkillProps = {
	label: string
	value: number // 0..1
}

export default function RadialSkill({ label, value }: RadialSkillProps) {
	const ref = useRef<SVGSVGElement | null>(null)

	useEffect(() => {
		const svg = d3.select(ref.current)
		const size = 160
		const radius = size / 2 - 14
		svg.attr('viewBox', `0 0 ${size} ${size}`)

		svg.selectAll('*').remove()

		const g = svg.append('g').attr('transform', `translate(${size / 2}, ${size / 2})`)

		g.append('circle')
			.attr('r', radius)
			.attr('fill', 'none')
			.attr('stroke', 'rgba(150,179,200,0.25)')
			.attr('stroke-width', 8)

		const arc = d3.arc().innerRadius(radius - 8).outerRadius(radius).startAngle(0).endAngle(value * 2 * Math.PI)

		g.append('path')
			.attr('d', arc as any)
			.attr('fill', 'url(#grad)')

		const defs = svg.append('defs')
		const grad = defs.append('linearGradient').attr('id', 'grad') as any
		grad.attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%')
		grad.append('stop').attr('offset', '0%').attr('stop-color', '#00d084')
		grad.append('stop').attr('offset', '100%').attr('stop-color', '#5fd3ff')

		svg
			.append('text')
			.attr('x', size / 2)
			.attr('y', size / 2 + 6)
			.attr('text-anchor', 'middle')
			.attr('fill', '#e6f0f7')
			.attr('font-size', 16)
			.text(`${label} ${Math.round(value * 100)}%`)
	}, [label, value])

	return <svg ref={ref} style={{ width: '100%', height: 180 }} />
}



