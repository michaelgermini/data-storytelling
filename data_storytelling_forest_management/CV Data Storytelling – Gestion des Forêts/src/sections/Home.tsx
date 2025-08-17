import ForestScene from '@three/ForestScene'

export default function Home() {
	return (
		<div>
			<h1 style={{ margin: '8px 0 12px' }}>Gestion des Forêts & Data Storytelling</h1>
			<p style={{ maxWidth: 800, marginBottom: 16 }}>
				Approche durable, basée sur la donnée et la protection des écosystèmes. Visualisations immersives pour valoriser les actions de restauration, de suivi carbone et de biodiversité.
			</p>
			<ForestScene />
		</div>
	)
}


