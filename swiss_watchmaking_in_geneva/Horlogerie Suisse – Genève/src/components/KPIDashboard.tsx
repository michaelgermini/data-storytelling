import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

type LineDatum = { date: Date; value: number };

const useRendementData = (): LineDatum[] => {
	return useMemo(() => {
		const now = new Date();
		return d3.range(24).map((i) => ({
			date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (24 - i)),
			value: 70 + Math.sin(i / 2.8) * 10 + Math.random() * 4,
		}));
	}, []);
};

const Gauge: React.FC<{ value: number; min?: number; max?: number; label: string; color?: string }> = ({ value, min = 0, max = 100, label, color = '#c9a227' }) => {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		const width = 180;
		const height = 120;
		const inner = 52;
		const outer = 64;

		const svg = d3.select(ref.current!);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${width} ${height}`);

		const centerX = width / 2;
		const centerY = height - 10;

		const scale = d3.scaleLinear().domain([min, max]).range([-Math.PI, 0]);

		const arcBg = d3.arc().innerRadius(inner).outerRadius(outer).startAngle(-Math.PI).endAngle(0);
		const arcValue = d3.arc().innerRadius(inner).outerRadius(outer).startAngle(-Math.PI).endAngle(scale(value));

		const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);
		g.append('path').attr('d', arcBg as any).attr('fill', '#242424');
		g.append('path').attr('d', arcValue as any).attr('fill', color);
		g.append('text').attr('text-anchor', 'middle').attr('y', -8).attr('fill', '#e7e2d9').style('font-size', 18).text(`${Math.round(value)}%`);
		svg.append('text').attr('x', centerX).attr('y', 18).attr('text-anchor', 'middle').attr('fill', '#c0c4c9').style('font-size', 12).text(label);
	}, [value, min, max, label, color]);

	return <svg ref={ref} style={{ width: 180, height: 120 }} />;
};

const LineChart: React.FC<{ data: LineDatum[]; color?: string; label: string }> = ({ data, color = '#c9a227', label }) => {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		const width = 420;
		const height = 200;
		const margin = { top: 20, right: 20, bottom: 24, left: 32 };

		const svg = d3.select(ref.current!);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${width} ${height}`);

		const x = d3.scaleTime().domain(d3.extent(data, (d) => d.date) as [Date, Date]).range([margin.left, width - margin.right]);
		const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)! * 1.1]).nice().range([height - margin.bottom, margin.top]);

		svg
			.append('g')
			.attr('transform', `translate(0, ${height - margin.bottom})`)
			.call(d3.axisBottom(x).ticks(5).tickSizeOuter(0) as any)
			.selectAll('text')
			.attr('fill', '#c0c4c9');

		svg
			.append('g')
			.attr('transform', `translate(${margin.left}, 0)`)
			.call(d3.axisLeft(y).ticks(5).tickSizeOuter(0) as any)
			.selectAll('text')
			.attr('fill', '#c0c4c9');

		svg
			.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', color)
			.attr('stroke-width', 2)
			.attr('d', d3
				.line<LineDatum>()
				.x((d) => x(d.date))
				.y((d) => y(d.value)) as any);

		svg
			.append('text')
			.attr('x', width / 2)
			.attr('y', 16)
			.attr('text-anchor', 'middle')
			.attr('fill', '#e7e2d9')
			.style('font-size', 12)
			.text(label);
	}, [data, color, label]);

	return <svg ref={ref} style={{ width: '100%', maxWidth: 480, height: 200 }} />;
};

export const KPIDashboard: React.FC = () => {
	const rendement = useRendementData();
	const precision = 92;
	const defauts = 1.8;
	const tempsAssemblage = 48; // minutes

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
			<div>
				<LineChart data={rendement} label="Rendement ligne d'assemblage (%)" />
			</div>
			<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
				<Gauge value={precision} label={'Précision (sec/jour)'} color="#8c6c1f" />
				<Gauge value={100 - defauts} label={'Taux de défauts'} color="#c9a227" />
				<div className="card" style={{ padding: 12, minWidth: 160 }}>
					<h3 style={{ marginTop: 0 }}>Temps moyen</h3>
					<p style={{ margin: 0, color: '#c0c4c9' }}>{tempsAssemblage} min/assemblage</p>
				</div>
			</div>
		</div>
	);
};


