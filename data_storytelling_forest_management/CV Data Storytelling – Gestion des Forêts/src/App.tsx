import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Outlet } from 'react-router-dom'
import Home from './sections/Home'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import KPIs from './sections/KPIs'
import MapStory from './sections/MapStory'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import styles from './styles/App.module.css'

export default function App() {
	useEffect(() => {
		gsap.from(`.${styles.header}`, { opacity: 0, y: -20, duration: 0.8 })
	}, [])

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<nav className={styles.nav}>
					<a href="#home">Accueil</a>
					<a href="#skills">Compétences</a>
					<a href="#projects">Projets</a>
					<a href="#kpis">KPI</a>
					<a href="#map">Carte</a>
					<a href="#experience">Expérience</a>
					<a href="#contact">Contact</a>
				</nav>
			</header>
			<main className={styles.main}>
				<section id="home"><Home /></section>
				<section id="skills"><Skills /></section>
				<section id="projects"><Projects /></section>
				<section id="kpis"><KPIs /></section>
				<section id="map"><MapStory /></section>
				<section id="experience"><Experience /></section>
				<section id="contact"><Contact /></section>
				<Outlet />
			</main>
		</div>
	)
}


