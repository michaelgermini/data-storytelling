import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PdfExportButton() {
	const handleExport = async () => {
		const app = document.querySelector('.app');
		if (!app) return;
		const canvas = await html2canvas(app, { scale: 2, backgroundColor: '#ffffff' });
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF('p', 'mm', 'a4');
		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();
		const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
		const imgWidth = canvas.width * ratio;
		const imgHeight = canvas.height * ratio;
		pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
		pdf.save('CV-Data-Scientist-Sante.pdf');
	};

	return (
		<button className="btn" onClick={handleExport}>Exporter en PDF</button>
	);
}

