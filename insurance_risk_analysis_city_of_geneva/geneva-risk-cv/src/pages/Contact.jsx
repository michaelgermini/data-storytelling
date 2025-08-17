import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export default function Contact() {
  const exportPdf = async () => {
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
    pdf.save('Geneva-Risk-CV.pdf')
  }

  return (
    <div className="panel">
      <div className="panel-left glass" style={{padding:16}}>
        <h3 className="section-title">Contact</h3>
        <div className="section-sub">Discutons assurance, risques urbains, et Genève.</div>
        <div className="glass" style={{padding:16, lineHeight:1.8}}>
          <div><strong>Email</strong>: mika@example.com</div>
          <div><strong>Téléphone</strong>: +41 79 000 00 00</div>
          <div><strong>LinkedIn</strong>: <a href="#">linkedin.com/in/mika</a></div>
        </div>
      </div>
      <div className="panel-right glass" style={{padding:16}}>
        <h3 className="section-title">Export PDF Genève</h3>
        <div className="section-sub">Génération d’un PDF premium incluant carte de risques, KPI et graphiques</div>
        <button className="btn" onClick={exportPdf}>Exporter PDF</button>
      </div>
    </div>
  )
}


