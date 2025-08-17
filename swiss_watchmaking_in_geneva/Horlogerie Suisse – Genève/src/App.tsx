import React, { useMemo, useState } from 'react';
import { WatchMovement } from './components/WatchMovement';
import { SwissMap3D } from './components/SwissMap3D';
import { KPIDashboard } from './components/KPIDashboard';
import { Storytelling } from './components/Storytelling';
import { PDFExportButton } from './components/PDFExportButton';
import { CircularMenu } from './components/CircularMenu';
import { SkillsRadials } from './components/SkillsRadials';
import { ProjectsTimeline3D } from './components/ProjectsTimeline3D';

type SectionKey = 'profil' | 'competences' | 'projets' | 'kpi' | 'experience' | 'contact';

const sections: { key: SectionKey; label: string }[] = [
	{ key: 'profil', label: 'Profil' },
	{ key: 'competences', label: 'Compétences' },
	{ key: 'projets', label: 'Projets horlogers' },
	{ key: 'kpi', label: 'KPI & Résultats' },
	{ key: 'experience', label: 'Expérience secteur' },
	{ key: 'contact', label: 'Contact' },
];

export const App: React.FC = () => {
	const [active, setActive] = useState<SectionKey>('profil');

	const ticker = useMemo(() => ({
		years: 8,
		projects: 27,
		precisionGainPct: 18,
	}), []);

	return (
		<div id="export-root">
			<div className="container">
				<section className="hero">
					<div className="card" style={{ height: 420 }}>
						<WatchMovement />
					</div>
					<div>
						<h1 className="title">Atelier Horloger de Données</h1>
						<p className="subtitle">CV immersif — Genève, Suisse</p>
						<div>
							<span className="badge">Data Science Industrielle</span>
							<span className="badge">Optimisation de production</span>
							<span className="badge">Vision par ordinateur</span>
						</div>
						<div className="ticker">
							<div className="ticker-item"><strong>{ticker.years}</strong> ans d'expérience</div>
							<div className="ticker-item"><strong>{ticker.projects}</strong> projets d'optimisation</div>
							<div className="ticker-item"><strong>+{ticker.precisionGainPct}%</strong> gain de précision</div>
						</div>
					<div className="menu">
						{sections.map(s => (
							<button key={s.key} className={active === s.key ? 'active' : ''} onClick={() => setActive(s.key)}>{s.label}</button>
						))}
					</div>
					<CircularMenu items={sections} active={active} onChange={setActive} />
						<PDFExportButton targetId="export-root" />
					</div>
				</section>

				{active === 'profil' && (
					<section className="section grid-2">
						<div className="card" style={{ height: 420 }}>
							<SwissMap3D />
						</div>
						<div className="card" style={{ padding: 20 }}>
							<h2>Profil</h2>
							<p>Data Scientist spécialisé en horlogerie de luxe, je conçois des modèles et des tableaux de bord pour piloter la précision, le rendement et la qualité de production.</p>
							<ul>
								<li>Analyse des flux d’assemblage et temps de cycle</li>
								<li>Détection de défauts via vision par ordinateur</li>
								<li>Prévision de la demande et planification</li>
							</ul>
						</div>
					</section>
				)}

				{active === 'competences' && (
					<section className="section card" style={{ padding: 20 }}>
						<h2>Compétences — radiales D3</h2>
						<SkillsRadials />
					</section>
				)}

				{active === 'projets' && (
					<section className="section card" style={{ padding: 20 }}>
						<h2>Projets horlogers</h2>
						<ProjectsTimeline3D />
					</section>
				)}

				{active === 'kpi' && (
					<section className="section card" style={{ padding: 20 }}>
						<h2>KPI & Résultats</h2>
						<KPIDashboard />
					</section>
				)}

				{active === 'experience' && (
					<section className="section card" style={{ padding: 20 }}>
						<h2>Expérience secteur</h2>
						<p>Points: Genève, Vallée de Joux, Neuchâtel, Bienne (voir carte 3D).</p>
						<Storytelling />
					</section>
				)}

				{active === 'contact' && (
					<section className="section card" style={{ padding: 20 }}>
						<h2>Contact</h2>
						<p>Email: nom.prenom@exemple.com · LinkedIn: /in/nom-prenom</p>
					</section>
				)}
			</div>
		</div>
	);
};


