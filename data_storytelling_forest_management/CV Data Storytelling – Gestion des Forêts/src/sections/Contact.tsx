import { useCallback } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Contact() {
	const exportPDF = useCallback(async () => {
		const node = document.body
		const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff' })
		const imgData = canvas.toDataURL('image/jpeg', 0.92)
		const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
		const pageWidth = pdf.internal.pageSize.getWidth()
		const ratio = pageWidth / canvas.width
		const height = canvas.height * ratio
		pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, height)
		pdf.save('CV-forets-data-storytelling.pdf')
	}, [])

	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>Contact</h2>
			<p>Basé en Suisse, disponible pour missions locales (Ville de Genève) et projets internationaux.</p>
			<div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
				<a href="mailto:contact@example.com" className="button" style={{ padding: '10px 14px', background: 'var(--forest-700)', color: 'white', borderRadius: 8 }}>Email</a>
				<button onClick={exportPDF} style={{ padding: '10px 14px', background: 'var(--water-500)', color: 'white', borderRadius: 8, border: 0 }}>Exporter en PDF</button>
			</div>
		</div>
	)
}


