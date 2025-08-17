import React, { useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Line, Sparkles, Stars } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { gsap } from 'gsap';
import { SkillsPanel } from './panels/SkillsPanel';
import { ProjectsPanel } from './panels/ProjectsPanel';
import { KPIPanel } from './panels/KPIPanel';
import { ExperiencePanel } from './panels/ExperiencePanel';
import { exportCorporatePDF } from '../utils/exportPDF';

type Section = 'profil' | 'competences' | 'projets' | 'kpis' | 'experience' | 'contact';

const navItems: { key: Section; label: string }[] = [
	{ key: 'profil', label: 'Profil' },
	{ key: 'competences', label: 'Compétences' },
	{ key: 'projets', label: 'Projets Big Pharma' },
	{ key: 'kpis', label: 'KPI & Résultats' },
	{ key: 'experience', label: 'Expérience internationale' },
	{ key: 'contact', label: 'Contact' },
];

function DNARibbon(): JSX.Element {
	const groupRef = useRef<Group>(null);
	const points = useMemo(() => {
		const temp: Vector3[] = [];
		for (let i = 0; i < 1000; i++) {
			const t = i / 50;
			const x = Math.sin(t) * 1.2;
			const y = (i - 500) / 90;
			const z = Math.cos(t) * 1.2;
			temp.push(new Vector3(x, y, z));
		}
		return temp;
	}, []);

	return (
		<group ref={groupRef} position={[0, 0.4, 0]}>
			<Line points={points} color="#62ffcc" lineWidth={1.5} transparent opacity={0.85} />
			<Sparkles count={200} size={2} speed={0.3} color="#62ffcc" scale={[6, 2, 6]} />
		</group>
	);
}

function Globe(): JSX.Element {
	// Simple glowing sphere as placeholder for 3D world; can be replaced with textured globe later
	return (
		<mesh position={[0, -0.6, 0]}>
			<sphereGeometry args={[1.2, 64, 64]} />
			<meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.4} roughness={0.4} metalness={0.2} />
		</mesh>
	);
}

function Ticker(): JSX.Element {
	const data = [
		{ label: "Années d'expérience en data pharma", value: 8 },
		{ label: 'Essais cliniques analysés', value: 47 },
		{ label: 'Réduction du délai mise sur marché', value: '23%' },
	];
	return (
		<div className="ticker">
			{data.map((d, i) => (
				<div key={i} className="tick">{d.value} — {d.label}</div>
			))}
		</div>
	);
}

function StoryKeynote({ onNavigate }: { onNavigate: (s: Section) => void }): JSX.Element {
	const tl = useRef<gsap.core.Timeline | null>(null);
	const startStory = () => {
		if (tl.current) {
			tl.current.kill();
		}
		tl.current = gsap.timeline();
		tl.current
			.call(() => onNavigate('profil'))
			.to({}, { duration: 1.2 })
			.call(() => onNavigate('competences'))
			.to({}, { duration: 1.2 })
			.call(() => onNavigate('projets'))
			.to({}, { duration: 1.2 })
			.call(() => onNavigate('kpis'))
			.to({}, { duration: 1.2 })
			.call(() => onNavigate('experience'));
	};
	return (
		<button onClick={startStory} title="Mode Big Pharma Storytelling">Storytelling</button>
	);
}

export function App(): JSX.Element {
	const [section, setSection] = useState<Section>('profil');

	return (
		<div className="app">
			<div className="topbar">
				<div className="brand">R&D Pharma Control Center — Genève</div>
				<nav className="nav">
					{navItems.map((n) => (
						<button key={n.key} className={section === n.key ? 'active' : ''} onClick={() => setSection(n.key)}>
							{n.label}
						</button>
					))}
				</nav>
			</div>

			<div className="content">
				<div className="canvas-wrap">
					<Canvas camera={{ position: [2.6, 1.6, 3.2], fov: 50 }}>
						<ambientLight intensity={0.6} />
						<directionalLight position={[3, 5, 2]} intensity={1.1} />
						<DNARibbon />
						<Globe />
						<Stars radius={60} depth={50} count={1200} factor={4} fade speed={0.6} />
						<OrbitControls enablePan={false} enableZoom={false} />
						<Html position={[0, 1.8, 0]} center>
							<Ticker />
						</Html>
					</Canvas>
				</div>

				<div className="overlay-panels">
					{section === 'profil' && (
						<div className="cards">
							<div className="card">
								<h3>Profil</h3>
								<p className="muted">Data Scientist spécialisé Big Pharma, intégrant biostatistiques, IA clinique, chaîne d'approvisionnement, et visualisation scientifique.</p>
							</div>
							<div className="card">
								<h3>Mission</h3>
								<p className="muted">Accélérer l'innovation de Genève au monde en optimisant la découverte, les essais, la production et la distribution.</p>
							</div>
							<div className="card">
								<h3>Contact rapide</h3>
								<p className="muted">genève • disponible pour leadership data R&D et opérations globales</p>
							</div>
						</div>
					)}

					{section === 'competences' && <SkillsPanel />}
					{section === 'projets' && <ProjectsPanel />}
					{section === 'kpis' && <KPIPanel />}
					{section === 'experience' && <ExperiencePanel />}
					{section === 'contact' && (
						<div className="cards">
							<div className="card">
								<h3>Contact</h3>
								<p className="muted">Email: firstname.lastname@pharma.com • LinkedIn: /in/datascientist-gva</p>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="footer">
				<div className="legend">
					<span className="dot" style={{ background:'#62ffcc' }}></span> Biotech
					<span className="dot" style={{ background:'#b8d4ff' }}></span> Clinique
					<span className="dot" style={{ background:'#c9d1e2' }}></span> Opérations
				</div>
				<div style={{ display:'flex', gap:12 }}>
					<StoryKeynote onNavigate={setSection} />
					<button onClick={exportCorporatePDF} title="Export PDF corporate">Exporter PDF</button>
				</div>
			</div>
		</div>
	);
}


