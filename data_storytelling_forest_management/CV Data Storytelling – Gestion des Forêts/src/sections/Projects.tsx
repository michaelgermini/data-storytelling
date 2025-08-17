import BeforeAfterSlider from '@components/BeforeAfterSlider'

const placeholderBefore = 'https://images.unsplash.com/photo-1508766206392-8bd5cf550d1b?q=80&w=1600&auto=format&fit=crop'
const placeholderAfter = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop'

export default function Projects() {
	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>Projets forestiers</h2>
			<p style={{ maxWidth: 800, marginBottom: 12 }}>
				Reboisement, lutte contre la déforestation, restauration d’habitats et suivi carbone — une frise 3D et des comparatifs avant/après.
			</p>
			<BeforeAfterSlider before={placeholderBefore} after={placeholderAfter} alt="Reboisement" />
		</div>
	)
}


