import React, { useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ThreeDna from './components/ThreeDna.jsx';
import Ticker from './components/Ticker.jsx';
import EcgMonitor from './components/EcgMonitor.jsx';
import DoughnutSkill from './components/charts/DoughnutSkill.jsx';
import KpiDashboard from './components/charts/KpiDashboard.jsx';
import Timeline3D from './components/Timeline3D.jsx';
import PdfExportButton from './components/PdfExportButton.jsx';

gsap.registerPlugin(ScrollToPlugin);

const sections = [
	{ id: 'home', label: 'Accueil' },
	{ id: 'profil', label: 'Profil' },
	{ id: 'skills', label: 'Compétences' },
	{ id: 'projects', label: 'Projets santé' },
	{ id: 'kpi', label: 'Résultats & KPI' },
	{ id: 'experience', label: 'Expérience médicale' },
	{ id: 'contact', label: 'Contact' }
];

export default function App() {
	const tourTimelineRef = useRef(null);

	const handleStartTour = () => {
		const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
		sections.forEach((s, idx) => {
			tl.to(window, { duration: 1.1, scrollTo: `#${s.id}` });
			if (idx < sections.length - 1) tl.to({}, { duration: 0.4 });
		});
		tourTimelineRef.current = tl;
	};

	const skills = useMemo(() => ([
		{ label: 'IA médicale', value: 90 },
		{ label: 'Machine Learning', value: 88 },
		{ label: 'BioStatistiques', value: 85 },
		{ label: 'Python', value: 92 },
		{ label: 'R', value: 75 },
		{ label: 'SQL', value: 82 },
		{ label: 'NLP médical', value: 80 },
		{ label: 'Power BI', value: 78 },
		{ label: 'Data Storytelling', value: 89 }
	]), []);

	return (
		<div className="app">
			<nav className="navbar">
				<div className="brand">Data Scientist – Santé & Innovation <span className="city">Genève</span></div>
				<ul className="menu">
					{sections.map((s) => (
						<li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
					))}
				</ul>
				<div className="actions">
					<button className="btn" onClick={handleStartTour}>Medical Data Storytelling</button>
					<PdfExportButton />
				</div>
			</nav>

			<section id="home" className="section hero">
				<div className="hero-left">
					<h1>Data Scientist – Santé & Innovation</h1>
					<p className="subtitle">Analyse médicale avancée, IA clinique et visualisation de données</p>
					<Ticker items={[
						{ label: 'Études cliniques analysées', value: 42 },
						{ label: 'Millions de lignes traitées', value: 18 },
						{ label: "Amélioration diagnostique", value: 23, suffix: '%' }
					]} />
					<EcgMonitor />
				</div>
				<div className="hero-right">
					<Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
						<ambientLight intensity={0.6} />
						<directionalLight position={[5, 5, 5]} intensity={1} />
						<ThreeDna />
						<OrbitControls enablePan={false} enableZoom={false} />
					</Canvas>
				</div>
			</section>

			<section id="profil" className="section">
				<h2>Profil</h2>
				<p>Data Scientist spécialisé en santé, expert en intégration de données cliniques, modélisation statistique et IA pour la prise de décision médicale.</p>
			</section>

			<section id="skills" className="section">
				<h2>Compétences techniques</h2>
				<div className="skills-grid">
					{skills.map((s) => (
						<DoughnutSkill key={s.label} label={s.label} value={s.value} />
					))}
				</div>
			</section>

			<section id="projects" className="section">
				<h2>Projets santé</h2>
				<Timeline3D />
			</section>

			<section id="kpi" className="section">
				<h2>Résultats & KPI</h2>
				<KpiDashboard />
			</section>

			<section id="experience" className="section lab">
				<h2>Expérience médicale</h2>
				<p>Simulation de centre de recherche avec flux biométriques en temps réel (données synthétiques).</p>
				<div className="lab-panels">
					<div className="panel">SpO2: 98%</div>
					<div className="panel">HR: 72 bpm</div>
					<div className="panel">Temp: 36.8°C</div>
				</div>
			</section>

			<section id="contact" className="section">
				<h2>Contact</h2>
				<p>Email: prenom.nom@exemple.ch</p>
				<p>LinkedIn: linkedin.com/in/medical-datascientist</p>
			</section>
		</div>
	);
}

