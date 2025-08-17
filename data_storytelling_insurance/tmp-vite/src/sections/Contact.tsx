import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)

  const exportPdf = async () => {
    if (!ref.current) return
    const input = ref.current
    const canvas = await html2canvas(input, { backgroundColor: '#0b1624', scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save('CV-Data-Scientist-Assurance.pdf')
  }

  return (
    <div className="panel" style={{ margin: 16 }}>
      <div className="panel-title">Contact & Export</div>
      <div className="panel-body">
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="kpi">
            <div className="label">Email</div>
            <div className="value">prenom.nom@exemple.com</div>
          </div>
          <div className="kpi">
            <div className="label">LinkedIn</div>
            <div className="value">linkedin.com/in/votre-profil</div>
          </div>
          <div className="kpi">
            <div className="label">Localisation</div>
            <div className="value">Genève, Suisse</div>
          </div>
          <div className="kpi">
            <div className="label">Disponibilité</div>
            <div className="value">Immédiate</div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <button onClick={exportPdf}>Exporter le PDF</button>
        </div>
      </div>
    </div>
  )
}

export default Contact


