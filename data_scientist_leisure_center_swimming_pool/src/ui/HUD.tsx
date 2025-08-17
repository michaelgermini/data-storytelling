import React from 'react';
import { HudChart } from './HudChart';

export const HUD: React.FC = () => {
	const [values, setValues] = React.useState<number[]>([3, 6, 4, 7, 5, 8, 6, 9]);

	React.useEffect(() => {
		const id = setInterval(() => {
			setValues((v) => v.map((x) => Math.max(1, Math.min(10, x + (Math.random() - 0.5) * 2))));
		}, 1500);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="hud">
			<div style={{ fontSize: 12, opacity: 0.9 }}>Occupation des bassins (mock)</div>
			<HudChart values={values} />
		</div>
	);
};



