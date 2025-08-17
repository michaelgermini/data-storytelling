import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const PDFExportButton: React.FC<{ targetId: string }> = ({ targetId }) => {
	const [busy, setBusy] = useState(false);

	const handleExport = async () => {
		try {
			setBusy(true);
			const element = document.getElementById(targetId);
			if (!element) return;
			const canvas = await html2canvas(element, { backgroundColor: '#0a0a0a', scale: 2 });
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = pageWidth;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			// Page 1
			pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
			// Pages suivantes
			const totalPages = Math.ceil(imgHeight / pageHeight);
			for (let i = 1; i < totalPages; i += 1) {
				pdf.addPage();
				pdf.addImage(imgData, 'PNG', 0, -i * pageHeight, imgWidth, imgHeight, undefined, 'FAST');
			}
			pdf.save('CV-Horlogerie-Geneve.pdf');
		} finally {
			setBusy(false);
		}
	};

	return (
		<button className="pdf-btn" onClick={handleExport} disabled={busy}>
			{busy ? 'Export…' : 'Exporter PDF luxe'}
		</button>
	);
};


