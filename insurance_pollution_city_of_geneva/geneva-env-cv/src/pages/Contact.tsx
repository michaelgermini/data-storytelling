import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [busy, setBusy] = useState(false)

  const exportPdf = async () => {
    if (!ref.current || busy) return
    setBusy(true)
    try {
      const canvas = await html2canvas(ref.current, { backgroundColor: '#101a28', scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
      const w = canvas.width * ratio
      const h = canvas.height * ratio
      const x = (pageWidth - w) / 2
      const y = (pageHeight - h) / 2
      pdf.addImage(imgData, 'PNG', x, y, w, h)
      pdf.save('rapport-environnement-geneve.pdf')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="section">
      <h2>Contact & Export</h2>
      <p>Email: mika@example.com · LinkedIn: linkedin.com/in/mika · Genève</p>
      <div ref={ref} style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
        <h3>Rapport environnemental (aperçu)</h3>
        <ul>
          <li>KPI clés: PM2.5, NO₂, jours non sains</li>
          <li>Cartes et zones à risque</li>
          <li>Impact assurantiel estimé</li>
        </ul>
      </div>
      <button onClick={exportPdf} disabled={busy}>{busy ? 'Export…' : 'Exporter en PDF'}</button>
    </div>
  )
}



