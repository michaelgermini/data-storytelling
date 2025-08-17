import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Skill = { name: string; value: number };

const skills: Skill[] = [
	{ name: 'BioStatistiques', value: 92 },
	{ name: 'ML biomédical', value: 88 },
	{ name: 'Supply chain pharma', value: 84 },
	{ name: 'Python', value: 95 },
	{ name: 'R', value: 82 },
	{ name: 'SQL', value: 87 },
	{ name: 'Power BI', value: 78 },
	{ name: 'Modélisation moléculaire', value: 80 },
];

function Radial({ name, value }: Skill): JSX.Element {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		const size = 220;
		const radius = size / 2 - 18;
		const svg = d3.select(ref.current);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${size} ${size}`);
		const g = svg.append('g').attr('transform', `translate(${size / 2},${size / 2})`);
		const background = d3.arc().cornerRadius(8).innerRadius(radius - 14).outerRadius(radius).startAngle(0).endAngle(2 * Math.PI);
		g.append('path').attr('d', background as any).attr('fill', 'rgba(255,255,255,0.08)');
		const foreground = d3.arc().cornerRadius(8).innerRadius(radius - 14).outerRadius(radius).startAngle(0).endAngle((value / 100) * 2 * Math.PI);
		g.append('path').attr('d', foreground as any).attr('fill', '#62ffcc');
		g.append('text').attr('text-anchor','middle').attr('dy','0.35em').attr('fill','#e8f1ff').style('font-weight','800').style('font-size','20px').text(`${value}%`);
		svg.append('text').attr('x', size / 2).attr('y', size - 8).attr('text-anchor','middle').attr('fill','#b8d4ff').style('font-size','12px').text(name);
	}, [name, value]);
	return <svg ref={ref} className="radial-skill" />;
}

export function SkillsPanel(): JSX.Element {
	return (
		<div className="cards">
			<div className="card">
				<h3>Compétences clés</h3>
				<p className="muted">Écran de laboratoire high‑tech avec jauges radiales.</p>
			</div>
			{skills.map((s) => (
				<div key={s.name} className="card" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
					<Radial name={s.name} value={s.value} />
				</div>
			))}
		</div>
	);
}


