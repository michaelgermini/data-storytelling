import RadialSkill from '../charts/RadialSkill'

const skills = [
	{ label: 'ML biomédical', value: 0.9 },
	{ label: 'BioStatistiques', value: 0.85 },
	{ label: 'Python', value: 0.95 },
	{ label: 'R', value: 0.8 },
	{ label: 'SQL', value: 0.9 },
	{ label: 'Power BI', value: 0.75 },
	{ label: 'NLP médical', value: 0.8 },
	{ label: 'Modélisation moléculaire', value: 0.7 },
]

export default function Skills() {
	return (
		<div className="panel">
			<h2 className="section-title">Compétences</h2>
			<div className="grid-3">
				{skills.map((s) => (
					<div key={s.label} className="panel" style={{ background: 'rgba(13,43,70,0.4)' }}>
						<RadialSkill label={s.label} value={s.value} />
					</div>
				))}
			</div>
		</div>
	)
}



