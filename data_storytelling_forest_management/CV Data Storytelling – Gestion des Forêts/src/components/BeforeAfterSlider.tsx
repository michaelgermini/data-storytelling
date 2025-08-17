import { useRef, useState } from 'react'

type Props = {
	before: string
	after: string
	alt?: string
}

export default function BeforeAfterSlider({ before, after, alt = 'Avant / Après' }: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [percent, setPercent] = useState(50)

	function onMove(clientX: number) {
		const rect = containerRef.current?.getBoundingClientRect()
		if (!rect) return
		const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
		setPercent((x / rect.width) * 100)
	}

	return (
		<div
			ref={containerRef}
			style={{ position: 'relative', height: 280, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--forest-100)', background: '#eee' }}
			onMouseMove={(e) => onMove(e.clientX)}
			onTouchMove={(e) => onMove(e.touches[0].clientX)}
		>
			<img src={before} alt={`${alt} – avant`} style={{ position: 'absolute', inset: 0, objectFit: 'cover', width: '100%', height: '100%' }} />
			<div style={{ position: 'absolute', inset: 0, width: `${percent}%`, overflow: 'hidden' }}>
				<img src={after} alt={`${alt} – après`} style={{ position: 'absolute', inset: 0, objectFit: 'cover', width: '100%', height: '100%' }} />
			</div>
			<div style={{ position: 'absolute', top: 0, bottom: 0, left: `${percent}%`, width: 2, background: 'white', transform: 'translateX(-1px)', boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }} />
			<button
				aria-label="Glisser pour comparer"
				style={{ position: 'absolute', top: '50%', left: `${percent}%`, transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: '50%', border: '2px solid white', background: 'var(--forest-500)', color: 'white', cursor: 'ew-resize' }}
				onMouseDown={(e) => onMove(e.clientX)}
				onTouchStart={(e) => onMove(e.touches[0].clientX)}
			>
				||
			</button>
		</div>
	)
}


