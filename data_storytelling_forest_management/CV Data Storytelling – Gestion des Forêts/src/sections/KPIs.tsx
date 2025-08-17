import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function KpiCard({ label, value, unit }: { label: string; value: number; unit: string }) {
	const ref = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		if (!ref.current) return
		const num = { v: 0 }
		gsap.to(num, { v: value, duration: 1.2, ease: 'power2.out', onUpdate: () => {
			if (!ref.current) return
			ref.current.querySelector('strong')!.textContent = Math.round(num.v).toString()
		}})
	}, [value])
	return (
		<div ref={ref} style={{ border: '1px solid var(--forest-100)', borderRadius: 12, padding: 16, background: 'white' }}>
			<div style={{ color: 'var(--text-700)', fontSize: 12 }}>{label}</div>
			<div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
				<strong style={{ fontSize: 28, color: 'var(--forest-700)' }}>0</strong>
				<span style={{ color: 'var(--forest-500)' }}>{unit}</span>
			</div>
			<div style={{ height: 6, background: '#e6f4ea', borderRadius: 999, marginTop: 10 }}>
				<div style={{ width: `${Math.min(100, value)}%`, height: '100%', background: 'linear-gradient(90deg, #8ecf9e, #2f8f46)', borderRadius: 999 }} />
			</div>
		</div>
	)
}

export default function KPIs() {
	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>KPI environnementaux</h2>
			<p style={{ maxWidth: 800, marginBottom: 12 }}>
				Indicateurs clés de restauration, de carbone et de protection de la biodiversité.
			</p>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
				<KpiCard label="Hectares restaurés" value={3200} unit="ha" />
				<KpiCard label="CO₂ capturé" value={54000} unit="t" />
				<KpiCard label="Espèces protégées" value={128} unit="" />
				<KpiCard label="Réduction du risque d’incendie" value={42} unit="%" />
			</div>
		</div>
	)
}


