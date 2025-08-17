import React, { useEffect, useRef } from 'react';

export default function EcgMonitor() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		let x = 0;
		const w = canvas.width;
		const h = canvas.height;
		ctx.strokeStyle = '#2aa6ff';
		ctx.lineWidth = 2;
		function draw() {
			ctx.fillStyle = 'rgba(0,0,0,0.08)';
			ctx.fillRect(0, 0, w, h);
			ctx.beginPath();
			ctx.moveTo(0, h / 2);
			for (let i = 0; i < w; i++) {
				const t = (i + x) * 0.03;
				let y = h / 2 + Math.sin(t) * 6;
				if (i % 120 === 0) {
					y -= 18;
				}
				ctx.lineTo(i, y);
			}
			ctx.stroke();
			x = (x + 2) % 10000;
			requestAnimationFrame(draw);
		}
		draw();
	}, []);

	return (
		<canvas className="ecg" ref={canvasRef} width="420" height="80" />
	);
}

