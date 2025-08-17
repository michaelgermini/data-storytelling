import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportElementToPDF(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, { useCORS: true, backgroundColor: '#ffffff', scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  pdf.save(filename)
}

