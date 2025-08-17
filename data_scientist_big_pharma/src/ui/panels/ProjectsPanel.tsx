import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type CaseStudy = { title: string; description: string };

const studies: CaseStudy[] = [
	{ title: 'Analyse multi-centres des essais cliniques', description: "Harmonisation des données, modèles mixtes, visualisation patient-centric" },
	{ title: 'Optimisation de la production vaccins', description: "Planification multi-sites, jumeaux numériques, OEE" },
	{ title: 'Prédiction des effets secondaires', description: "Apprentissage profond, signaux RWE, explicabilité" },
];

function Timeline3D(): JSX.Element {
	const ref = useRef<SVGSVGElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		const width = ref.current.clientWidth || 800;
		const height = 220;
		const svg = d3.select(ref.current);
		svg.selectAll('*').remove();
		svg.attr('viewBox', `0 0 ${width} ${height}`);
		const phases = ['Découverte','Essais','Régulation','Production','Distribution'];
		const x = d3.scalePoint(phases, [40, width - 40]).padding(0.5);
		const group = svg.append('g');
		group.append('path').attr('d', d3.line<number>().x((_,i)=> (x(phases[i])||0)).y((d,i)=> 60 + Math.sin(i)*10)([0,1,2,3,4]) as any).attr('stroke','#62ffcc').attr('fill','none').attr('stroke-width',3).attr('opacity',0.6);
		phases.forEach((p,i)=>{
			const cx = x(p) || 0;
			group.append('circle').attr('cx',cx).attr('cy',120).attr('r',10).attr('fill','#0ea5e9').attr('stroke','#62ffcc');
			group.append('text').attr('x',cx).attr('y',160).attr('text-anchor','middle').attr('fill','#b8d4ff').text(p);
		});
	}, []);
	return <svg className="timeline" ref={ref} />;
}

export function ProjectsPanel(): JSX.Element {
	return (
		<div className="cards">
			<div className="card">
				<h3>Études de cas Big Pharma</h3>
				<p className="muted">Focus sur projets à impact global.</p>
			</div>
			{studies.map((s)=> (
				<div key={s.title} className="card">
					<h3>{s.title}</h3>
					<p className="muted">{s.description}</p>
				</div>
			))}
			<div className="card wide">
				<div className="vis-title">
					<h3>Timeline 3D de l'innovation</h3>
				</div>
				<Timeline3D />
			</div>
		</div>
	);
}


