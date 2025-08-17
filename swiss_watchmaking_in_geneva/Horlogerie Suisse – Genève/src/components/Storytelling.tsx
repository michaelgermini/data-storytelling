import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Storytelling: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });
			tl
			.from('.story-step', { y: 20, opacity: 0, stagger: 0.15 })
			.to('.story-progress', { width: '100%', duration: 1.2 }, 0.1);
		});
		return () => ctx.revert();
	}, []);

	return (
		<div ref={containerRef}>
			<div style={{ position: 'relative', marginBottom: 8, height: 4, background: '#242424', borderRadius: 4 }}>
				<div className="story-progress" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 0, background: '#c9a227', borderRadius: 4 }} />
			</div>
			<div className="story-step">Conception → modélisation du mouvement</div>
			<div className="story-step">Prototypage → réglages de précision</div>
			<div className="story-step">Production → optimisation de flux</div>
			<div className="story-step">Contrôle qualité → vision par ordinateur</div>
			<div className="story-step">Distribution → suivi KPI en temps réel</div>
		</div>
	);
};


