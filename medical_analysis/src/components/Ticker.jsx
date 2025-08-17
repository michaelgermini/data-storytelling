import React, { useEffect, useRef } from 'react';

export default function Ticker({ items }) {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let idx = 0;
		const id = setInterval(() => {
			idx = (idx + 1) % items.length;
			el.style.transform = `translateY(-${idx * 2.2}rem)`;
		}, 2500);
		return () => clearInterval(id);
	}, [items]);

	return (
		<div className="ticker">
			<div className="ticker-track" ref={ref}>
				{items.map((it) => (
					<div key={it.label} className="ticker-item">
						<span className="value">{it.value}{it.suffix || ''}</span>
						<span className="label">{it.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

