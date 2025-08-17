import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportPanelToPdf(filename = 'Geneva-Risk-CV.pdf') {
  const node = document.querySelector('.panel')
  if (!node) return
  const canvas = await html2canvas(node, { backgroundColor: '#0b1220', useCORS: true, scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth
  const imgHeight = canvas.height * (imgWidth / canvas.width)
  pdf.addImage(imgData, 'PNG', 0, (pageHeight - imgHeight)/2, imgWidth, imgHeight)
  pdf.save(filename)
}


