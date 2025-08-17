import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function KpiDashboard() {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		el.innerHTML = '';

		const data = [
			{ label: 'Précision diagnostic', value: 0.93 },
			{ label: 'Temps traitement (min)', value: 12 },
			{ label: 'Réduction erreurs', value: 0.27 },
			{ label: 'Impact coût', value: -0.18 }
		];

		const width = 820;
		const height = 300;
		const margin = { top: 30, right: 20, bottom: 50, left: 60 };
		const svg = d3.select(el)
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		const x = d3.scaleBand().domain(data.map(d => d.label)).range([margin.left, width - margin.right]).padding(0.3);
		const y = d3.scaleLinear().domain([d3.min(data, d => d.value) < 0 ? d3.min(data, d => d.value) : 0, d3.max(data, d => d.value)]).nice().range([height - margin.bottom, margin.top]);

		svg.append('g')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x))
			.selectAll('text')
			.style('font-size', '12px')
			.style('font-family', 'Open Sans, Lato, sans-serif');

		const yAxis = d3.axisLeft(y).ticks(6);
		const domain = y.domain();
		const isPercentScale = Math.max(Math.abs(domain[0]), Math.abs(domain[1])) <= 1;
		if (isPercentScale) {
			const fmt = d3.format('.0%');
			yAxis.tickFormat(fmt);
		}
		svg.append('g')
			.attr('transform', `translate(${margin.left},0)`)
			.call(yAxis)
			.selectAll('text')
			.style('font-size', '12px')
			.style('font-family', 'Open Sans, Lato, sans-serif');

		svg.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', d => x(d.label))
			.attr('y', y(0))
			.attr('width', x.bandwidth())
			.attr('height', 0)
			.attr('fill', d => d.value >= 0 ? '#2aa6ff' : '#e85c5c')
			.transition()
			.duration(1000)
			.attr('y', d => Math.min(y(d.value), y(0)))
			.attr('height', d => Math.abs(y(d.value) - y(0)));

		return () => { el.innerHTML = ''; };
	}, []);

	return <div className="kpi-dashboard" ref={ref} />;
}

