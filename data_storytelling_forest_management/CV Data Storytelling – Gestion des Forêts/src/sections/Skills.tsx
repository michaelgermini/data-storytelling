import D3SkillRadar from '@components/D3SkillRadar'

const defaultSkills = [
	{ name: 'Télédétection', value: 88 },
	{ name: 'SIG (GIS)', value: 84 },
	{ name: 'Biodiversité', value: 80 },
	{ name: 'Carbone', value: 86 },
	{ name: 'Data Viz', value: 90 },
	{ name: 'Terrain', value: 78 }
]

export default function Skills() {
	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>Compétences environnementales</h2>
			<p style={{ maxWidth: 800, marginBottom: 12 }}>
				De la collecte terrain et satellite à la modélisation des habitats, jusqu’au storytelling engageant pour les décideurs.
			</p>
			<D3SkillRadar skills={defaultSkills} />
		</div>
	)
}


