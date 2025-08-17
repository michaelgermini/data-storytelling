import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportCorporatePDF(): Promise<void> {
	const element = document.body;
	const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#0a1b2b' });
	const imgData = canvas.toDataURL('image/png');
	const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
	pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
	pdf.save('CV-Data-Scientist-BigPharma.pdf');
}


