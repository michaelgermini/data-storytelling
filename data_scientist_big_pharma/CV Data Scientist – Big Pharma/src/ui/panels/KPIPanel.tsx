import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function MultiSeriesChart(): JSX.Element {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		const width = ref.current.clientWidth || 800;
		const height = 220;
		const svg = d3.select(ref.current);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${width} ${height}`);
		const years = d3.range(2018, 2025);
		const series = [
			{ name: 'Taux de succès cliniques', color: '#62ffcc', values: years.map((y,i)=> 0.42 + 0.03*Math.sin(i*1.1)) },
			{ name: 'Temps de développement moyen', color: '#b8d4ff', values: years.map((y,i)=> 6.2 - 0.2*i + 0.2*Math.cos(i)) },
		];
		const x = d3.scalePoint(years, [48, width - 16]);
		const yLeft = d3.scaleLinear([0.3, 0.6], [height - 32, 16]);
		const yRight = d3.scaleLinear([3, 7], [height - 32, 16]);
		const g = svg.append('g');
		const line = d3.line<number>().x((_,i)=> (x(years[i])||0)).y((d)=> yLeft(d));
		g.append('path').attr('d', line(series[0].values) as any).attr('stroke', series[0].color).attr('fill','none').attr('stroke-width',3);
		const line2 = d3.line<number>().x((_,i)=> (x(years[i])||0)).y((d)=> yRight(d));
		g.append('path').attr('d', line2(series[1].values) as any).attr('stroke', series[1].color).attr('fill','none').attr('stroke-width',3).attr('opacity',0.8);
		g.selectAll('text.year').data(years).enter().append('text').attr('class','year').attr('x', d=> x(d) || 0).attr('y', height - 8).attr('text-anchor','middle').attr('fill','#9fb4d4').text(d=> d);
		g.append('text').attr('x', 8).attr('y', 16).attr('fill','#62ffcc').text(series[0].name);
		g.append('text').attr('x', 8).attr('y', 34).attr('fill','#b8d4ff').text(series[1].name);
	}, []);
	return <svg ref={ref} style={{ width:'100%', height:220 }} />;
}

function WorldCoverage(): JSX.Element {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		const width = ref.current.clientWidth || 800;
		const height = 260;
		const svg = d3.select(ref.current);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${width} ${height}`);
		const centers = [
			{ name:'Genève', x: width*0.52, y: height*0.45 },
			{ name:'Boston', x: width*0.28, y: height*0.40 },
			{ name:'Bâle', x: width*0.54, y: height*0.42 },
			{ name:'Londres', x: width*0.49, y: height*0.38 },
			{ name:'Singapour', x: width*0.78, y: height*0.56 },
			{ name:'Tokyo', x: width*0.86, y: height*0.44 },
			{ name:'São Paulo', x: width*0.36, y: height*0.70 },
		];
		const g = svg.append('g');
		g.append('rect').attr('x',0).attr('y',0).attr('width',width).attr('height',height).attr('fill','rgba(255,255,255,0.02)').attr('stroke','rgba(255,255,255,0.06)');
		g.selectAll('circle.hub').data(centers).enter().append('circle').attr('class','hub').attr('cx', d=> d.x).attr('cy', d=> d.y).attr('r', 6).attr('fill', d=> d.name==='Genève'? '#62ffcc':'#0ea5e9').attr('stroke','#62ffcc');
		g.selectAll('text.lbl').data(centers).enter().append('text').attr('x', d=> d.x + 8).attr('y', d=> d.y - 8).attr('fill','#b8d4ff').style('font-size','12px').text(d=> d.name);
		const hub = centers.find(c=> c.name==='Genève')!;
		centers.filter(c=> c!==hub).forEach(c => {
			g.append('path').attr('d', `M${hub.x},${hub.y} C ${hub.x},${(hub.y+c.y)/2-40} ${c.x},${(hub.y+c.y)/2+40} ${c.x},${c.y}`)
				.attr('stroke','#62ffcc').attr('stroke-width',1.5).attr('opacity',0.5).attr('fill','none');
		});
	}, []);
	return <svg ref={ref} className="world-map" style={{ width:'100%' }} />;
}

function PieChart(): JSX.Element {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		const size = 220;
		const svg = d3.select(ref.current);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${size} ${size}`);
		const g = svg.append('g').attr('transform',`translate(${size/2},${size/2})`);
		const data = [
			{ name:'Rendement production', value: 48, color:'#62ffcc' },
			{ name:'Qualité', value: 32, color:'#0ea5e9' },
			{ name:'Maintenance', value: 20, color:'#b8d4ff' },
		];
		const arc = d3.arc<any>().innerRadius(56).outerRadius(96).cornerRadius(8);
		const pie = d3.pie<any>().value((d)=> d.value).padAngle(0.02);
		g.selectAll('path').data(pie(data) as any).enter().append('path').attr('d', arc).attr('fill',(d:any)=> d.data.color).attr('opacity',0.9);
		g.append('text').attr('text-anchor','middle').attr('dy','.35em').attr('fill','#e8f1ff').style('font-weight','800').text('Production');
	}, []);
	return <svg ref={ref} style={{ width:'100%', height:220 }} />;
}

export function KPIPanel(): JSX.Element {
	return (
		<div className="kpi-grid">
			<div className="card wide">
				<h3>Taux de succès & Temps de développement</h3>
				<MultiSeriesChart />
			</div>
			<div className="card">
				<h3>Couverture géographique</h3>
				<WorldCoverage />
			</div>
			<div className="card">
				<h3>Rendement production</h3>
				<PieChart />
			</div>
		</div>
	);
}


