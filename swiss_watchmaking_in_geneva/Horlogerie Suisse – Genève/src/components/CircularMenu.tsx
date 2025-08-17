import React from 'react';

export type CircleItem<K extends string> = { key: K; label: string; icon?: string };

type Props<K extends string> = {
	items: CircleItem<K>[];
	active: K;
	onChange: (key: K) => void;
};

export function CircularMenu<K extends string>({ items, active, onChange }: Props<K>) {
	const radius = 96;
	const size = radius * 2 + 80;
	return (
		<div style={{ position: 'relative', width: size, height: size, margin: '8px 0 20px' }}>
			<div style={{
				position: 'absolute', left: '50%', top: '50%', width: radius * 2, height: radius * 2,
				transform: 'translate(-50%, -50%)', borderRadius: '50%',
				border: '1px solid rgba(255,255,255,0.14)',
				background: 'radial-gradient(circle at center, rgba(201,162,39,0.12), rgba(24,24,24,0.4))',
			}} />
			{items.map((it, i) => {
				const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
				const x = Math.cos(angle) * radius;
				const y = Math.sin(angle) * radius;
				const isActive = active === it.key;
				return (
					<button
						key={it.key}
						onClick={() => onChange(it.key)}
						style={{
							position: 'absolute', left: '50%', top: '50%', transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
							background: isActive ? 'rgba(201,162,39,0.16)' : 'transparent',
							border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(255,255,255,0.14)'}`,
							color: isActive ? 'var(--gold)' : '#fff',
							padding: '8px 12px', borderRadius: 12, cursor: 'pointer'
						}}
					>
						{it.icon ? `${it.icon} ` : ''}{it.label}
					</button>
				);
			})}
		</div>
	);
}


