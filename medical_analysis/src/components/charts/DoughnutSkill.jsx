import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function DoughnutSkill({ label, value }) {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		el.innerHTML = '';
		const width = 150;
		const height = 150;
		const radius = Math.min(width, height) / 2;
		const svg = d3.select(el)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${width / 2}, ${height / 2})`);

		const background = d3.arc().innerRadius(radius - 14).outerRadius(radius).startAngle(0).endAngle(2 * Math.PI);
		svg.append('path').attr('d', background).attr('fill', '#e6f7f5');

		const arc = d3.arc().innerRadius(radius - 14).outerRadius(radius);
		svg.append('path')
			.datum({ endAngle: 0 })
			.attr('fill', '#35bdb2')
			.transition()
			.duration(1200)
			.attrTween('d', () => {
				const i = d3.interpolate(0, (value / 100) * 2 * Math.PI);
				return (t) => arc({ startAngle: 0, endAngle: i(t) });
			});

		svg.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '0.3em')
			.attr('fill', '#0a1f2e')
			.style('font-family', 'Lato, Open Sans, sans-serif')
			.style('font-size', '18px')
			.text(`${value}%`);

		const labelText = d3.select(el)
			.append('div')
			.attr('class', 'skill-label')
			.text(label);

		return () => {
			el.innerHTML = '';
		};
	}, [label, value]);

	return <div className="skill" ref={ref} />;
}

