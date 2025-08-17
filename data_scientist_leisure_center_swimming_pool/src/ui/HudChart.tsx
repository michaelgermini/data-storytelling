import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
	values: number[];
}

export const HudChart: React.FC<Props> = ({ values }) => {
	const ref = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		if (!ref.current) return;
		const svg = d3.select(ref.current);
		svg.selectAll('*').remove();

		const width = 380;
		const height = 160;
		const margin = { top: 8, right: 8, bottom: 20, left: 28 };
		const innerW = width - margin.left - margin.right;
		const innerH = height - margin.top - margin.bottom;

		const x = d3.scaleBand().domain(values.map((_, i) => String(i))).range([0, innerW]).padding(0.2);
		const y = d3.scaleLinear().domain([0, d3.max(values) ?? 1]).nice().range([innerH, 0]);

		const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

		g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x).tickValues([])).selectAll('path,line').attr('stroke', '#3b4a63');
		g.append('g').call(d3.axisLeft(y).ticks(4)).selectAll('path,line').attr('stroke', '#3b4a63');
		g.selectAll('text').attr('fill', '#c5d3e8');

		g.selectAll('rect')
			.data(values)
			.enter()
			.append('rect')
			.attr('x', (_, i) => x(String(i))!)
			.attr('y', (d) => y(d))
			.attr('width', x.bandwidth())
			.attr('height', (d) => innerH - y(d))
			.attr('fill', '#56cfe1');
	}, [values]);

	return <svg ref={ref} className="chart" viewBox="0 0 380 160" />;
};



