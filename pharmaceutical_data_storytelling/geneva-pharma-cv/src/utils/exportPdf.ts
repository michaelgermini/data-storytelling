import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportAppToPdf() {
	const root = document.querySelector('.main') as HTMLElement
	if (!root) return
	const canvas = await html2canvas(root, { scale: 2, useCORS: true, backgroundColor: '#071a2b' })
	const imgData = canvas.toDataURL('image/png')
	const pdf = new jsPDF('p', 'mm', 'a4')
	const pageWidth = pdf.internal.pageSize.getWidth()
	const pageHeight = pdf.internal.pageSize.getHeight()
	const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
	const imgW = canvas.width * ratio
	const imgH = canvas.height * ratio
	pdf.addImage(imgData, 'PNG', (pageWidth - imgW)/2, 10, imgW, imgH)
	pdf.save('cv-pharma-geneve.pdf')
}



