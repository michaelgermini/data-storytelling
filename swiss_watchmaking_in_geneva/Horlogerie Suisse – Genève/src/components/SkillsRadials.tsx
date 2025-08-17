import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Skill = { label: string; value: number };

const SKILLS: Skill[] = [
	{ label: 'Analyse de production', value: 90 },
	{ label: 'Modélisation mécanique', value: 78 },
	{ label: 'ML industriel', value: 85 },
	{ label: 'Python', value: 92 },
	{ label: 'SQL', value: 88 },
	{ label: 'Power BI', value: 80 },
	{ label: 'Vision', value: 84 },
];

const Radial: React.FC<Skill> = ({ label, value }) => {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		const size = 140;
		const inner = 36;
		const outer = 56;
		const svg = d3.select(ref.current!);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${size} ${size}`);
		const cx = size / 2;
		const cy = size / 2;
		const bg = d3.arc().innerRadius(inner).outerRadius(outer).startAngle(0).endAngle(Math.PI * 2);
		const arc = d3.arc().innerRadius(inner).outerRadius(outer).startAngle(-Math.PI / 2).endAngle(-Math.PI / 2 + (Math.PI * 2 * value) / 100);
		const g = svg.append('g').attr('transform', `translate(${cx}, ${cy})`);
		g.append('path').attr('d', bg as any).attr('fill', '#242424');
		g.append('path').attr('d', arc as any).attr('fill', '#c9a227');
		svg.append('text').attr('x', cx).attr('y', cy + 6).attr('text-anchor', 'middle').attr('fill', '#e7e2d9').style('font-size', 18).text(`${value}%`);
		svg.append('text').attr('x', cx).attr('y', size - 10).attr('text-anchor', 'middle').attr('fill', '#c0c4c9').style('font-size', 12).text(label);
	}, [label, value]);
	return <svg ref={ref} style={{ width: 160, height: 160 }} />;
};

export const SkillsRadials: React.FC = () => {
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
			{SKILLS.map((s) => (
				<div key={s.label} className="card" style={{ padding: 8 }}>
					<Radial {...s} />
				</div>
			))}
		</div>
	);
};


