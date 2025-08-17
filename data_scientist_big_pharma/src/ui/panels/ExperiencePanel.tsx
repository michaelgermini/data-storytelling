import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Country = { name: string; value: number };
const countries: Country[] = [
	{ name: 'Suisse', value: 1 },
	{ name: 'États‑Unis', value: 1 },
	{ name: 'Royaume‑Uni', value: 1 },
	{ name: 'Singapour', value: 1 },
	{ name: 'Japon', value: 1 },
	{ name: 'Brésil', value: 1 },
];

export function ExperiencePanel(): JSX.Element {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		const width = ref.current.clientWidth || 800;
		const height = 320;
		const svg = d3.select(ref.current);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${width} ${height}`);
		const x = d3.scaleBand(countries.map(c=> c.name), [40, width - 16]).padding(0.2);
		const y = d3.scaleLinear([0, 1], [height - 40, 20]);
		const g = svg.append('g');
		g.selectAll('rect.bar').data(countries).enter().append('rect').attr('class','bar')
			.attr('x', d=> x(d.name) || 0).attr('y', d=> y(d.value)).attr('width', x.bandwidth()).attr('height', d=> (height - 40) - y(d.value))
			.attr('fill','#0ea5e9').attr('opacity',0.85).attr('stroke','#62ffcc');
		g.selectAll('text.lbl').data(countries).enter().append('text').attr('x', d=> (x(d.name) || 0) + x.bandwidth()/2).attr('y', height - 10).attr('text-anchor','middle').attr('fill','#b8d4ff').text(d=> d.name);
		g.append('text').attr('x',8).attr('y',16).attr('fill','#e8f1ff').style('font-weight','800').text('Expérience internationale — pays surbrillance');
	}, []);
	return (
		<div className="cards">
			<div className="card">
				<h3>Carte 3D mondiale</h3>
				<p className="muted">Surbrillance des pays avec projets menés.</p>
				<svg ref={ref} style={{ width:'100%', height:320 }} />
			</div>
		</div>
	);
}


